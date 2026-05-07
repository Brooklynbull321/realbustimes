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
        try:
            requests.post(
                DISCORD_WEBHOOK,
                json={"embeds": [embed]},
                timeout=10,
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f"Discord webhook failed: {e}")
            )

    def handle(self, *args, **kwargs):

        mismatches = []

        vehicles = Vehicle.objects.select_related(
            "operator",
            "latest_journey",
        ).all()

        for vehicle in vehicles:

            # Skip vehicles without live journey data
            if not vehicle.latest_journey:
                continue

            journey = vehicle.latest_journey

            # Try getting route/operator from journey
            try:
                route = journey.route
            except AttributeError:
                continue

            if not route:
                continue

            try:
                route_operator = route.operator
            except AttributeError:
                continue

            vehicle_operator = vehicle.operator

            # Skip if data missing
            if not vehicle_operator or not route_operator:
                continue

            # Same operator = fine
            if vehicle_operator == route_operator:
                continue

            mismatches.append({
                "vehicle": vehicle,
                "route": route,
                "vehicle_operator": vehicle_operator,
                "route_operator": route_operator,
            })

            cache_key = f"mismatch-alert-{vehicle.id}"

            # Only alert once during cache period
            if cache.get(cache_key):
                continue

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
                        "name": "Vehicle Operator",
                        "value": str(vehicle_operator),
                        "inline": True,
                    },
                    {
                        "name": "Route",
                        "value": str(route),
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

            cache.set(
                cache_key,
                True,
                timeout=CACHE_TIMEOUT,
            )

            self.stdout.write(
                self.style.WARNING(
                    f"Mismatch detected: {vehicle}"
                )
            )

        # Summary embed
        if mismatches:

            summary_lines = []

            for item in mismatches[:25]:

                summary_lines.append(
                    f"• {item['vehicle']} → {item['route']}"
                )

            embed = {
                "title": "📋 Mismatch Summary",
                "description": "\n".join(summary_lines),
                "color": 16753920,
                "footer": {
                    "text": f"{len(mismatches)} active mismatches"
                }
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
                f"Finished scan. {len(mismatches)} mismatches found."
            )
        )