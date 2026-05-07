# bustimes/management/commands/etm_mismatch.py

from django.core.management.base import BaseCommand
from django.core.cache import cache
from vehicles.models import Vehicle
import requests
import os
import re
from django.utils import timezone

DISCORD_WEBHOOK = os.getenv("ETMMISMATCH_WEBHOOK_URL")
CACHE_TIMEOUT = 60 * 60 * 12  # 12 hours


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
        except Exception:
            pass

    # -----------------------------
    # CLEAN OPERATOR (IMPORTANT)
    # -----------------------------
    def normalise(self, value):
        if not value:
            return ""
        return re.sub(r"[^a-z0-9]", "", str(value).lower())

    # -----------------------------
    # GET TRACKED OPERATOR
    # -----------------------------
    def extract_tracked_operator(self, journey):

        trip = getattr(journey, "trip", None)
        if trip and getattr(trip, "operator", None):
            return trip.operator

        data = getattr(journey, "latest_journey_data", None)
        if isinstance(data, dict):
            return (
                data.get("operator")
                or data.get("op")
                or data.get("operator_name")
                or data.get("company")
            )

        return None

    # -----------------------------
    # MAIN
    # -----------------------------
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

            if not vehicle_operator or not tracked_operator:
                continue

            # -----------------------------
            # NORMALISE
            # -----------------------------
            vo = self.normalise(vehicle_operator)
            to = self.normalise(tracked_operator)

            # -----------------------------
            # 🚫 HARD TFLO EXCLUSION
            # -----------------------------
            if vo == "transportforlondon" or to == "transportforlondon":
                continue

            # -----------------------------
            # MATCH CHECK
            # -----------------------------
            if vo == to:
                continue

            mismatches.append(vehicle)

            cache_key = f"mismatch-{vehicle.id}"

            if not cache.get(cache_key):

                url = f"https://ukbuses.org/vehicles/{vehicle.slug}"
                trip = getattr(journey, "trip", None)

                embed = {
                    "title": "⚠️ Operator Mismatch Detected",
                    "url": url,
                    "color": 16711680,
                    "fields": [
                        {
                            "name": "🚍 Vehicle",
                            "value": f"[View Vehicle]({url})\n`{vehicle}`",
                            "inline": False,
                        },
                        {
                            "name": "🏢 Allocated Operator",
                            "value": str(vehicle_operator),
                            "inline": True,
                        },
                        {
                            "name": "📡 Tracked Operator",
                            "value": str(tracked_operator),
                            "inline": True,
                        },
                        {
                            "name": "🧭 Trip",
                            "value": str(trip) if trip else "Unknown",
                            "inline": False,
                        },
                    ],
                    "footer": {
                        "text": "RealBusTimes Operator Monitor"
                    },
                    "timestamp": timezone.now().isoformat(),
                }

                self.send_embed(embed)

                cache.set(cache_key, True, CACHE_TIMEOUT)

                self.stdout.write(
                    self.style.WARNING(
                        f"Mismatch: {vehicle} ({vehicle_operator} vs {tracked_operator})"
                    )
                )

        # -----------------------------
        # SUMMARY
        # -----------------------------
        if mismatches:
            embed = {
                "title": "📋 Mismatch Summary",
                "description": "\n".join(
                    f"• [{v}](https://ukbuses.org/vehicles/{v.slug})"
                    for v in mismatches[:25]
                ),
                "color": 16753920,
                "footer": {
                    "text": f"{len(mismatches)} mismatches found"
                },
            }
        else:
            embed = {
                "title": "✅ System Healthy",
                "description": "No mismatches detected.",
                "color": 65280,
            }

        self.send_embed(embed)

        self.stdout.write(
            self.style.SUCCESS(
                f"Done: {len(mismatches)} mismatches"
            )
        )
