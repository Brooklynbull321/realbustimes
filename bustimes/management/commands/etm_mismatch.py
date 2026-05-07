# bustimes/management/commands/etm_mismatch.py

from django.core.management.base import BaseCommand
from django.core.cache import cache
from vehicles.models import Vehicle
import requests
import os

DISCORD_WEBHOOK = os.getenv("ETMMISMATCH_WEBHOOK_URL")

CACHE_TIMEOUT = 60 * 60 * 12


class Command(BaseCommand):
    help = "Detect vehicles operating on another operator's routes"

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

            self.stdout.write(
                self.style.ERROR(
                    f"Webhook failed: {e}"
                )
            )

    def handle(self, *args, **kwargs):

        mismatches = []

        vehicles = Vehicle.objects.select_related(
            "operator",
            "latest_journey",
        ).all()

        for vehicle in vehicles:

            journey = vehicle.latest_journey

            if not journey:
                continue

            # DEBUGGING
            # Uncomment this if needed:
            #
            # print(journey.__dict__)

            try:
                journey_operator = journey.operator
            except AttributeError:
                continue

            if not journey_operator:
                continue

            vehicle_operator = vehicle.operator

            if not vehicle_operator:
                continue

            # Compare actual DB IDs
            if vehicle_operator.id == journey_operator.id:
                continue

            mismatch = {
                "vehicle": vehicle,
                "vehicle_operator": vehicle_operator,
                "journey_operator": journey_operator,
            }

            mismatches.append(mismatch)

            cache_key = f"mismatch-alert-{vehicle.id}"

            if cache.get(cache_key):
                continue

            route = getattr(journey, "route", None)
            line = getattr(journey, "line", None)

            embed = {
                "title": "⚠️ Operator Route Mismatch",
                "color": 16711680,
                "fields": [
                    {
                        "name": "Vehicle",
                        "value": str(vehicle),
                        "inline": True,
                    },
                    {
                        "name": "Allocated Operator",
                        "value": str(vehicle_operator),
                        "inline": True,
                    },
                    {
                        "name": "Tracked Operator",
                        "value": str(journey_operator),
                        "inline": True,
                    },
                    {
                        "name": "Route",
                        "value": str(route or line or "Unknown"),
                        "inline": True,
                    },
                ],
            }

            self.send_embed(embed)

            cache.set(
                cache_key,
                True,
                timeout=CACHE_TIMEOUT,
            )

            self.stdout.write(
                self.style.WARNING(
                    f"Mismatch: {vehicle}"
                )
            )

        # Summary
        if mismatches:

            lines = []

            for item in mismatches[:25]:

                lines.append(
                    f"• {item['vehicle']} "
                    f"({item['journey_operator']})"
                )

            embed = {
                "title": "📋 Mismatch Summary",
                "description": "\n".join(lines),
                "color": 16753920,
                "footer": {
                    "text": (
                        f"{len(mismatches)} "
                        f"active mismatches"
                    )
                },
            }

        else:

            embed = {
                "title": "✅ Mismatch Summary",
                "description": "No active mismatches detected.",
                "color": 65280,
            }

        self.send_embed(embed)

        self.stdout.write(
            self.style.SUCCESS(
                f"Finished scan: "
                f"{len(mismatches)} mismatches"
            )
        )