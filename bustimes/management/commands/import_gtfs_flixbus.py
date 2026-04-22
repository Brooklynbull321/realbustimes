import logging
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import pandas as pd
import geopandas as gpd
import gtfs_kit
import shapely.ops as so
from django.conf import settings
from django.core.management.base import BaseCommand
from django.db import transaction
from django.db.models import Min
from django.utils.dateparse import parse_duration

from busstops.models import DataSource, Operator, Service, StopPoint
from ...download_utils import download_if_modified
from ...models import Route, StopTime, Trip
from .import_gtfs_ember import get_calendars

logger = logging.getLogger(__name__)


def routes_as_gdf(feed):
    trips = feed.get_trips(as_gdf=True)
    f = feed.routes[lambda x: x["route_id"].isin(trips["route_id"])]

    groupby_cols = ["route_id"]
    final_cols = f.columns.tolist() + ["geometry"]

    def merge_lines(group):
        geometries = [g for g in group["geometry"].tolist() if g is not None]
        return pd.Series({
            "geometry": so.linemerge(geometries) if geometries else None
        })

    return (
        trips.drop_duplicates(subset="shape_id")
        .filter(groupby_cols + ["geometry"])
        .groupby(groupby_cols)
        .apply(merge_lines, include_groups=False)
        .reset_index()
        .merge(f, how="right")
        .pipe(gpd.GeoDataFrame)
        .set_crs(trips.crs)
        .filter(f.columns.tolist() + ["geometry"])
    )


def get_stoppoint(stop, source):
    stoppoint = StopPoint(
        atco_code=stop.stop_id,
        naptan_code=stop.stop_code,
        common_name=stop.stop_name,
        active=True,
        source=source,
        latlong=f"POINT({stop.stop_lon} {stop.stop_lat})",
    )

    if len(stoppoint.common_name) > 48:
        if " (" in stoppoint.common_name and stoppoint.common_name.endswith(")"):
            stoppoint.common_name, stoppoint.indicator = stoppoint.common_name.split(" (", 1)
            stoppoint.indicator = stoppoint.indicator[:-1]

    return stoppoint


class Command(BaseCommand):
    def handle(self, *args, **options):
        print(">>> FlixBus import STARTED <<<")
        logger.warning("FlixBus import STARTED")

        operator = Operator.objects.get(name="FlixBus")
        source = DataSource.objects.get(name="FlixBus")

        path = settings.DATA_DIR / Path("flixbus_eu.zip")
        source.url = "https://gtfs.gis.flix.tech/gtfs_generic_eu.zip"

        modified, last_modified = download_if_modified(path, source)

        logger.warning(f"download_if_modified: {modified}, {last_modified}")

        if not modified:
            logger.warning("No update detected (continuing anyway)")
            print("⚠️ No update detected")

        feed = gtfs_kit.read_feed(path, dist_units="km")

        logger.warning(
            f"Feed loaded: routes={len(feed.routes)}, trips={len(feed.trips)}, stops={len(feed.stops)}"
        )

        # ---------------- ROUTE FILTER ----------------
        mask = (
            feed.routes.route_id.str.startswith("UK", na=False)
            | feed.routes.route_long_name.str.contains("London", na=False)
        )

        logger.warning(f"Route filter matched {mask.sum()} / {len(mask)}")

        filtered_routes = feed.routes[mask]

        if filtered_routes.empty:
            logger.error("Route filter removed all routes")
            return

        feed = feed.restrict_to_routes(filtered_routes.route_id)

        # ---------------- DATA PREP ----------------
        stops_data = {r.stop_id: r for r in feed.stops.itertuples()}

        stop_codes = {
            sc.code: sc.stop_id for sc in source.stopcode_set.all()
        }

        existing_services = {
            s.line_name: s for s in operator.service_set.all()
        }

        existing_routes = {
            r.code: r for r in source.route_set.all()
        }

        calendars = get_calendars(feed, source)

        if not calendars:
            logger.error("No calendars found")
            return

        tzinfo = ZoneInfo("Europe/London")

        utc_offsets = {
            c.start_date: datetime.strptime(f"{c.start_date} 12", "%Y%m%d %H")
            .replace(tzinfo=tzinfo)
            .utcoffset()
            for c in calendars.values()
        }

        # ---------------- GEOMETRY ----------------
        geometries = {}
        for row in routes_as_gdf(feed).itertuples():
            if row.geometry:
                geometries[row.route_id] = row.geometry.wkt

        logger.warning(f"Geometries built: {len(geometries)}")

        # ---------------- ROUTES ----------------
        routes = []

        for row in feed.routes.itertuples():
            line_name = row.route_id

            service = (
                existing_services.get(line_name)
                or existing_services.get(line_name.removeprefix("UK"))
                or Service()
            )

            route = existing_routes.get(row.route_id) or Route(code=row.route_id, source=source)

            route.service = service
            route.line_name = line_name

            service.line_name = line_name
            service.description = route.description = row.route_long_name
            service.current = True
            service.source = source
            service.region_id = "GB"
            service.geometry = geometries.get(row.route_id)

            service.save()
            service.operator.add(operator)
            route.save()

            routes.append(route)
            existing_routes[route.code] = route

        logger.warning(f"Routes processed: {len(routes)}")

        # ---------------- TRIPS (FIXED & SAFE) ----------------
        existing_trips = {
            t.vehicle_journey_code: t for t in operator.trip_set.all()
        }

        trips = {}

        for row in feed.trips.itertuples(index=False):
            trip_id = getattr(row, "trip_id", None)
            route_id = getattr(row, "route_id", None)
            service_id = getattr(row, "service_id", None)

            if not trip_id or not route_id or not service_id:
                logger.warning(f"Skipping bad trip row: {row}")
                continue

            direction = getattr(row, "direction_id", 0)
            try:
                direction = int(direction)
            except Exception:
                direction = 0

            trip = Trip(
                route=existing_routes.get(route_id),
                calendar=calendars.get(service_id),
                inbound=(direction == 1),
                vehicle_journey_code=trip_id,
                operator=operator,
            )

            if trip.vehicle_journey_code in existing_trips:
                trip.id = existing_trips[trip.vehicle_journey_code].id

            trips[trip.vehicle_journey_code] = trip

        logger.warning(f"Trips prepared: {len(trips)}")

        # ---------------- STOP TIMES ----------------
        stop_times = []
        missing_stops = {}

        for row in feed.stop_times.itertuples():
            trip = trips.get(row.trip_id)
            if not trip:
                continue

            offset = utc_offsets[trip.calendar.start_date]

            arrival = parse_duration(row.arrival_time) + offset
            departure = parse_duration(row.departure_time) + offset

            if not trip.start:
                trip.start = arrival
            trip.end = departure

            st = StopTime(
                arrival=arrival,
                departure=departure,
                sequence=row.stop_sequence,
                trip=trip,
            )

            st.timing_status = "PTP" if getattr(row, "timepoint", 0) == 1 else "OTH"

            if row.stop_id in stop_codes:
                st.stop_id = stop_codes[row.stop_id]
            else:
                stop = stops_data[row.stop_id]
                st.stop_id = row.stop_id

                if row.stop_id not in missing_stops:
                    missing_stops[row.stop_id] = get_stoppoint(stop, source)

            trip.destination_id = st.stop_id
            stop_times.append(st)

        logger.warning(f"StopTimes: {len(stop_times)}, missing stops: {len(missing_stops)}")

        # ---------------- SAVE ----------------
        with transaction.atomic():
            Trip.objects.bulk_create([t for t in trips.values() if not t.id])

            existing = [t for t in trips.values() if t.id]

            Trip.objects.bulk_update(
                existing,
                fields=[
                    "route",
                    "calendar",
                    "inbound",
                    "start",
                    "end",
                    "destination",
                    "block",
                    "vehicle_journey_code",
                ],
            )

            StopTime.objects.filter(trip__in=existing).delete()
            StopTime.objects.bulk_create(stop_times)

        print(">>> FlixBus import FINISHED <<<")
        logger.warning("FlixBus import FINISHED")