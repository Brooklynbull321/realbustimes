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
            self.stdout.write(
                self.style.ERROR(
                    "ETMMISMATCH_WEBHOOK_URL is not set"
                )
            )
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
                    f"Discord webhook failed: {e}"
                )
            )

    def handle(self, *args, **kwargs):

        mismatches = []

        vehicles = Vehicle.objects.select_related(
            "operator",
        ).all()

        self.stdout.write(
            self.style.SUCCESS(
                f"Scanning {vehicles.count()} vehicles..."
            )
        )

        for vehicle in vehicles:

            # Skip vehicles without live tracking data
            if not vehicle.latest_journey_data:
                continue

            data = vehicle.latest_journey_data

            # Extract tracking info
            tracked_operator = data.get("operator")
            tracked_route = data.get("line")

            if not tracked_operator:
                continue

            vehicle_operator = str(vehicle.operator)

            # Normalise comparison
            vehicle_operator_clean = vehicle_operator.strip().lower()
            tracked_operator_clean = tracked_operator.strip().lower()

            # Same operator
            if vehicle_operator_clean == tracked_operator_clean:
                continue

            mismatch = {
                "vehicle": vehicle,
                "route": tracked_route or "Unknown",
                "vehicle_operator": vehicle_operator,
                "tracked_operator": tracked_operator,
            }

            mismatches.append(mismatch)

            cache_key = f"mismatch-alert-{vehicle.id}"

            # Already alerted recently
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
                        "name": "Allocated Operator",
                        "value": vehicle_operator,
                        "inline": True,
                    },
                    {
                        "name": "Tracked Operator",
                        "value": tracked_operator,
                        "inline": True,
                    },
                    {
                        "name": "Route",
                        "value": str(tracked_route or "Unknown"),
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
                    f"Mismatch: {vehicle} "
                    f"({vehicle_operator} != {tracked_operator})"
                )
            )

        # Summary embed
        if mismatches:

            summary_lines = []

            for item in mismatches[:25]:

                summary_lines.append(
                    f"• {item['vehicle']} "
                    f"→ {item['route']} "
                    f"({item['tracked_operator']})"
                )

            embed = {
                "title": "📋 Mismatch Summary",
                "description": "\n".join(summary_lines),
                "color": 16753920,
                "footer": {
                    "text": (
                        f"{len(mismatches)} "
                        f"active mismatches detected"
                    )
                }
            }

        else:

            embed = {
                "title": "✅ Mismatch Summary",
                "description": (
                    "No active mismatches detected."
                ),
                "color": 65280,
            }

        self.send_embed(embed)

        self.stdout.write(
            self.style.SUCCESS(
                f"Finished scan. "
                f"{len(mismatches)} mismatches found."
            )
        )