class Command(BaseCommand):
    def handle(self, *args, **options):
        print(">>> FlixBus import STARTED <<<")
        logger.warning("FlixBus import STARTED")

        operator = Operator.objects.get(name="FlixBus")
        source = DataSource.objects.get(name="FlixBus")

        path = settings.DATA_DIR / Path("flixbus_eu.zip")
        source.url = "https://gtfs.gis.flix.tech/gtfs_generic_eu.zip"

        modified, last_modified = download_if_modified(path, source)

        logger.warning(f"download_if_modified -> modified={modified}, last_modified={last_modified}")

        # ❗ DO NOT silently exit anymore
        if not modified:
            logger.warning("No update detected. Forcing continuation for debugging.")
            print("⚠️ No update detected (continuing anyway for debug)")
            # return   <-- intentionally disabled for debugging

        feed = gtfs_kit.read_feed(path, dist_units="km")

        logger.warning(f"Initial feed loaded: routes={len(feed.routes)}, trips={len(feed.trips)}, stops={len(feed.stops)}")

        # --- ROUTE FILTER ---
        mask = (
            feed.routes.route_id.str.startswith("UK", na=False)
            | feed.routes.route_long_name.str.contains("London", na=False)
        )

        logger.warning(f"Route filter matched {mask.sum()} / {len(mask)} routes")

        filtered_routes = feed.routes[mask]

        if filtered_routes.empty:
            logger.error("❌ Route filter removed ALL routes. Check UK/London filter logic.")
            return

        feed = feed.restrict_to_routes(filtered_routes.route_id)

        logger.warning(f"After restrict: routes={len(feed.routes)} trips={len(feed.trips)}")

        # --- STOPS ---
        stops_data = {row.stop_id: row for row in feed.stops.itertuples()}

        stop_codes = {
            sc.code: sc.stop_id for sc in source.stopcode_set.all()
        }

        missing_stops = {}

        existing_services = {
            s.line_name: s for s in operator.service_set.all()
        }

        existing_routes = {
            r.code: r for r in source.route_set.all()
        }

        routes = []
        calendars = get_calendars(feed, source)

        if not calendars:
            logger.error("❌ No calendars found. GTFS data may be invalid.")
            return

        tzinfo = ZoneInfo("Europe/London")

        utc_offsets = {
            c.start_date: datetime.strptime(f"{c.start_date} 12", "%Y%m%d %H")
            .replace(tzinfo=tzinfo)
            .utcoffset()
            for c in calendars.values()
        }

        # --- GEOMETRY ---
        geometries = {}
        for row in routes_as_gdf(feed).itertuples():
            if row.geometry:
                geometries[row.route_id] = row.geometry.wkt

        logger.warning(f"Built geometries for {len(geometries)} routes")

        # --- ROUTES ---
        for row in feed.routes.itertuples():
            line_name = row.route_id

            service = existing_services.get(line_name) or existing_services.get(line_name.removeprefix("UK")) or Service()

            route = existing_routes.get(row.route_id) or Route(code=row.route_id, source=source)

            route.service = service
            route.line_name = line_name

            service.line_name = line_name
            service.description = route.description = row.route_long_name
            service.current = True
            service.colour_id = operator.colour_id
            service.source = source
            service.geometry = geometries.get(row.route_id)
            service.region_id = "GB"

            service.save()
            service.operator.add(operator)
            route.save()

            routes.append(route)
            existing_routes[route.code] = route

        logger.warning(f"Processed routes: {len(routes)}")

        # --- TRIPS ---
        existing_trips = {
            t.vehicle_journey_code: t for t in operator.trip_set.all()
        }

        trips = {}

        for row in feed.trips.itertuples():
            trip = Trip(
                route=existing_routes[row.route_id],
                calendar=calendars[row.service_id],
                inbound=row.direction_id == 1,
                vehicle_journey_code=row.trip_id,
                operator=operator,
            )

            if trip.vehicle_journey_code in existing_trips:
                trip.id = existing_trips[trip.vehicle_journey_code].id

            trips[trip.vehicle_journey_code] = trip

        logger.warning(f"Trips prepared: {len(trips)}")

        # --- STOP TIMES ---
        stop_times = []

        for row in feed.stop_times.itertuples():
            trip = trips[row.trip_id]
            offset = utc_offsets[trip.calendar.start_date]

            arrival_time = parse_duration(row.arrival_time) + offset
            departure_time = parse_duration(row.departure_time) + offset

            if not trip.start:
                trip.start = arrival_time
            trip.end = departure_time

            stop_time = StopTime(
                arrival=arrival_time,
                departure=departure_time,
                sequence=row.stop_sequence,
                trip=trip,
            )

            stop_time.timing_status = "PTP" if getattr(row, "timepoint", 0) == 1 else "OTH"

            if row.stop_id in stop_codes:
                stop_time.stop_id = stop_codes[row.stop_id]
            else:
                stop = stops_data[row.stop_id]
                stop_time.stop_id = row.stop_id

                if row.stop_id not in missing_stops:
                    missing_stops[row.stop_id] = get_stoppoint(stop, source)

            trip.destination_id = stop_time.stop_id
            stop_times.append(stop_time)

        logger.warning(f"StopTimes built: {len(stop_times)}")
        logger.warning(f"Missing stops: {len(missing_stops)}")

        # --- SAVE MISSING STOPS ---
        if missing_stops:
            StopPoint.objects.bulk_create(
                missing_stops.values(),
                update_conflicts=True,
                update_fields=["common_name", "indicator", "naptan_code", "latlong"],
                unique_fields=["atco_code"],
            )

        # --- FORCE TIMING POINTS IF NEEDED ---
        if all(st.timing_status == "OTH" for st in stop_times):
            logger.warning("Forcing all stops to PTP")
            for st in stop_times:
                st.timing_status = "PTP"

        # --- DB WRITE ---
        with transaction.atomic():
            Trip.objects.bulk_create([t for t in trips.values() if not t.id])

            existing_trips = [t for t in trips.values() if t.id]

            Trip.objects.bulk_update(
                existing_trips,
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

            StopTime.objects.filter(trip__in=existing_trips).delete()
            StopTime.objects.bulk_create(stop_times)

        logger.warning("Database update complete")

        # --- FINAL CLEANUP ---
        print(">>> FlixBus import FINISHED <<<")
        logger.warning("FlixBus import FINISHED")