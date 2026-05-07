# bustimes/management/commands/etm_mismatch.py

from django.core.management.base import BaseCommand
from django.core.cache import cache
from vehicles.models import Vehicle
import requests
import os

DISCORD_WEBHOOK = os.getenv("ETMMISMATCH_WEBHOOK_URL")
CACHE_TIMEOUT = 60 * 60 * 12  # 12 hours


class Command(BaseCommand):
    help = "Detect vehicles operating on another operator's routes"

    def send_embed(self, embed):
        if not DISCORD_WEBHOOK:
            self.stdout.write(self.style.ERROR("Webhook not set"))
            return

        try:
            requests.post(
                DISCORD_WEBHOOK,
                json={"embeds": [embed]},
                timeout=10,
            )
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Webhook error: {e}"))

    def extract_tracked_operator(self, journey):
        """
        Try multiple possible structures safely.
        """

        # Case 1: direct field
        if hasattr(journey, "operator"):
            return journey.operator

        # Case 2: route relation
        if hasattr(journey, "route") and getattr(journey, "route"):
            route = journey.route
            if hasattr(route, "operator"):
                return route.operator

        # Case 3: trip relation
        if hasattr(journey, "trip") and getattr(journey, "trip"):
            trip = journey.trip
            if hasattr(trip, "route") and getattr(trip.route, "operator"):
                return trip.route.operator

        # Case 4: raw JSON/data field
        if hasattr(journey, "data") and isinstance(journey.data, dict):
            return journey.data.get("operator")

        return None

    def extract_route_label(self, journey):
        if hasattr(journey, "route"):
            return journey.route

        if hasattr(journey, "trip"):
            return getattr(journey.trip, "route", None)

        if hasattr(journey, "data") and isinstance(journey.data, dict):
            return journey.data.get("line") or journey.data.get("route")

        return "Unknown"

    def handle(self, *args, **kwargs):

        mismatches = []

        vehicles = Vehicle.objects.select_related(
            "operator",
            "latest_journey",
        )

        self.stdout.write(f"Scanning {vehicles.count()} vehicles...")

        for vehicle in vehicles:

            journey = vehicle.latest_journey
            if not journey:
                continue

            vehicle_operator = vehicle.operator
            tracked_operator = self.extract_tracked_operator(journey)
            route_label = self.extract_route_label(journey)

            # DEBUG OUTPUT (VERY IMPORTANT)
            self.stdout.write(
                f"{vehicle} | "
                f"vehicle_op={vehicle_operator} | "
                f"tracked_op={tracked_operator}"
            )

            if not vehicle_operator or not tracked_operator:
                continue

            # Normalize comparisons
            vo = str(vehicle_operator).strip().lower()
            to = str(tracked_operator).strip().lower()

            if vo == to:
                continue

            mismatches.append(vehicle)

            cache_key = f"mismatch-alert-{vehicle.id}"

            if cache.get(cache_key):
                continue

            embed = {
                "title": "⚠️ Operator Route Mismatch",
                "color": 16711680,
                "fields": [
                    {"name": "Vehicle", "value": str(vehicle), "inline": True},
                    {"name": "Vehicle Operator", "value": str(vehicle_operator), "inline": True},
                    {"name": "Tracked Operator", "value": str(tracked_operator), "inline": True},
                    {"name": "Route", "value": str(route_label), "inline": True},
                ],
            }

            self.send_embed(embed)

            cache.set(cache_key, True, CACHE_TIMEOUT)

        # SUMMARY
        if mismatches:

            embed = {
                "title": "📋 Mismatch Summary",
                "description": "\n".join(
                    f"• {v}" for v in mismatches[:25]
                ),
                "color": 16753920,
                "footer": {"text": f"{len(mismatches)} mismatches"},
            }

        else:

            embed = {
                "title": "✅ Mismatch Summary",
                "description": "No mismatches detected.",
                "color": 65280,
            }

        self.send_embed(embed)

        self.stdout.write(
            self.style.SUCCESS(
                f"Done. {len(mismatches)} mismatches found."
            )
        )