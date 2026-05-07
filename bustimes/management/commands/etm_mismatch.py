# bustimes/management/commands/etm_mismatch.py

from django.core.management.base import BaseCommand
from django.core.cache import cache
from vehicles.models import Vehicle
import requests
import os

DISCORD_WEBHOOK = os.getenv("ETMMISMATCH_WEBHOOK_URL")
CACHE_TIMEOUT = 60 * 60 * 12  # 12 hours


class Command(BaseCommand):
    help = "Detect vehicles operating on another operator's trips"

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

            # Trip is the correct source of operator in your schema
            trip = getattr(journey, "trip", None)
            if not trip:
                continue

            vehicle_operator = vehicle.operator
            trip_operator = getattr(trip, "operator", None)

            if not vehicle_operator or not trip_operator:
                continue

            vehicle_operator_id = getattr(vehicle_operator, "id", None)
            trip_operator_id = getattr(trip_operator, "id", None)

            if not vehicle_operator_id or not trip_operator_id:
                continue

            # ✅ correct comparison
            if vehicle_operator_id == trip_operator_id:
                continue

            mismatches.append(vehicle)

            cache_key = f"mismatch-{vehicle.id}"

            if not cache.get(cache_key):

                embed = {
                    "title": "⚠️ Operator Mismatch",
                    "color": 16711680,
                    "fields": [
                        {
                            "name": "Vehicle",
                            "value": str(vehicle),
                            "inline": True,
                        },
                        {
                            "name": "Vehicle Operator",
                            "value": str(vehicle_operator),
                            "inline": True,
                        },
                        {
                            "name": "Trip Operator",
                            "value": str(trip_operator),
                            "inline": True,
                        },
                        {
                            "name": "Trip",
                            "value": str(trip),
                            "inline": True,
                        },
                    ],
                }

                self.send_embed(embed)

                cache.set(cache_key, True, CACHE_TIMEOUT)

                self.stdout.write(
                    self.style.WARNING(
                        f"Mismatch: {vehicle}"
                    )
                )

        # SUMMARY EMBED
        if mismatches:

            embed = {
                "title": "📋 Mismatch Summary",
                "description": "\n".join(
                    f"• {v}" for v in mismatches[:25]
                ),
                "color": 16753920,
                "footer": {
                    "text": f"{len(mismatches)} mismatches found"
                },
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
                f"Done: {len(mismatches)} mismatches"
            )
        )
