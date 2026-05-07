# bustimes/management/commands/etm_mismatch.py

from django.core.management.base import BaseCommand
from django.core.cache import cache
from vehicles.models import Vehicle
import requests
import os

DISCORD_WEBHOOK = os.getenv("ETMMISMATCH_WEBHOOK_URL")
CACHE_TIMEOUT = 60 * 60 * 12


class Command(BaseCommand):
    help = "Detect vehicles operating on another operator's trips"

    def send_embed(self, embed):
        if not DISCORD_WEBHOOK:
            return

        try:
            requests.post(
                DISCORD_WEBHOOK,
                json={"embeds": [embed]},
                timeout=10,
            )
        except Exception as e:
            self.stdout.write(self.style.ERROR(str(e)))

    def handle(self, *args, **kwargs):

        mismatches = []

        vehicles = Vehicle.objects.select_related(
            "operator",
            "latest_journey",
        )

        for vehicle in vehicles:

            journey = vehicle.latest_journey
            if not journey:
                continue

            # ✅ correct path based on your Trip model
            trip = getattr(journey, "trip", None)

            if not trip:
                continue

            vehicle_operator = vehicle.operator
            trip_operator = getattr(trip, "operator", None)

            if not vehicle_operator or not trip_operator:
                continue

            # compare IDs (correct + safe)
            if vehicle_operator_id := getattr(vehicle_operator, "id", None) and \
               trip_operator_id := getattr(trip_operator, "id", None):

                if vehicle_operator_id == trip_operator_id:
                    continue

            mismatches.append(vehicle)

            cache_key = f"mismatch-{vehicle.id}"

            if not cache.get(cache_key):

                self.send_embed({
                    "title": "⚠️ Operator Mismatch",
                    "color": 16711680,
                    "fields": [
                        {"name": "Vehicle", "value": str(vehicle), "inline": True},
                        {"name": "Vehicle Operator", "value": str(vehicle_operator), "inline": True},
                        {"name": "Trip Operator", "value": str(trip_operator), "inline": True},
                        {"name": "Trip", "value": str(trip), "inline": True},
                    ],
                })

                cache.set(cache_key, True, CACHE_TIMEOUT)

        # summary
        self.send_embed({
            "title": "📋 Mismatch Summary",
            "description": f"{len(mismatches)} mismatches found",
            "color": 16753920 if mismatches else 65280,
        })

        self.stdout.write(
            self.style.SUCCESS(
                f"Done: {len(mismatches)} mismatches"
            )
        )