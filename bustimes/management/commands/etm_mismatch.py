from django.core.management.base import BaseCommand
from django.core.cache import cache
from tracker.models import Vehicle
import requests
import os

DISCORD_WEBHOOK = os.getenv("ETMMISMATCH_WEBHOOK_URL")

CACHE_TIMEOUT = 60 * 60 * 12  # 12 hours


class Command(BaseCommand):
    help = "Detect operator route mismatches"

    def send_embed(self, embed):
        requests.post(
            DISCORD_WEBHOOK,
            json={"embeds": [embed]}
        )

    def handle(self, *args, **kwargs):

        mismatches = []

        vehicles = Vehicle.objects.select_related(
            "route",
            "operator",
        ).filter(tracking=True)

        for vehicle in vehicles:

            if not vehicle.route:
                continue

            vehicle_operator = vehicle.operator
            route_operator = vehicle.route.operator

            if vehicle_operator == route_operator:
                continue

            mismatches.append(vehicle)

            cache_key = f"mismatch-alert-{vehicle.id}"

            # Already alerted before
            if cache.get(cache_key):
                continue

            embed = {
                "title": "Operator Route Mismatch",
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
                        "name": "Route",
                        "value": str(vehicle.route),
                        "inline": True,
                    },
                    {
                        "name": "Route Operator",
                        "value": str(route_operator),
                        "inline": True,
                    },
                ],
            }

            self.send_embed(embed)

            # Mark as alerted
            cache.set(cache_key, True, timeout=CACHE_TIMEOUT)

            self.stdout.write(
                self.style.WARNING(
                    f"Alerted mismatch for {vehicle}"
                )
            )

        # SUMMARY EMBED

        if mismatches:

            summary_lines = []

            for vehicle in mismatches[:20]:
                summary_lines.append(
                    f"• {vehicle} → {vehicle.route}"
                )

            embed = {
                "title": "Mismatch Summary",
                "description": "\n".join(summary_lines),
                "color": 16753920,
                "footer": {
                    "text": f"{len(mismatches)} active mismatches"
                }
            }

            self.send_embed(embed)

        else:

            embed = {
                "title": "Mismatch Summary",
                "description": "No active mismatches detected.",
                "color": 65280,
            }

            self.send_embed(embed)