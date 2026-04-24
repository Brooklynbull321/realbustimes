import time
import hashlib
import requests

from django.core.management.base import BaseCommand
from django.conf import settings
from django.core.cache import cache


BODS_DATASETS_URL = "https://data.bus-data.dft.gov.uk/api/v1/dataset/"


class Command(BaseCommand):
    help = "Watch BODS timetable datasets for updates and send detailed webhook embeds"

    def add_arguments(self, parser):
        parser.add_argument(
            "--interval",
            type=int,
            default=60,
            help="Polling interval in seconds",
        )

    def handle(self, *args, **options):
        interval = options["interval"]

        webhook_url = getattr(settings, "WATCHBODS_WEBHOOK_URL", None)
        if not webhook_url:
            self.stderr.write("WATCHBODS_WEBHOOK_URL is not set")
            return

        self.stdout.write(self.style.SUCCESS("Starting BODS timetable watcher (embed mode)"))

        last_hash = cache.get("bods_last_hash")

        while True:
            try:
                response = requests.get(BODS_DATASETS_URL, timeout=20)
                response.raise_for_status()

                data = response.json()
                raw = response.text

                current_hash = hashlib.sha256(raw.encode()).hexdigest()

                if last_hash is None:
                    self.stdout.write("Initial snapshot stored")
                    cache.set("bods_last_hash", current_hash, None)
                    last_hash = current_hash

                elif current_hash != last_hash:
                    self.stdout.write(self.style.WARNING("BODS update detected"))

                    embed = self.build_embed(data)

                    payload = {
                        "embeds": [embed]
                    }

                    try:
                        r = requests.post(webhook_url, json=payload, timeout=10)
                        self.stdout.write(f"Webhook sent ({r.status_code})")
                    except Exception as e:
                        self.stderr.write(f"Webhook failed: {e}")

                    cache.set("bods_last_hash", current_hash, None)
                    last_hash = current_hash

                else:
                    self.stdout.write("No changes detected")

            except Exception as e:
                self.stderr.write(f"BODS check failed: {e}")

            time.sleep(interval)

    def build_embed(self, data):
        """
        Build a Discord-style embed showing dataset summary
        """

        results = data.get("results", [])

        latest = results[:5]  # top 5 datasets

        description_lines = []

        for item in latest:
            name = item.get("name", "Unknown dataset")
            org = item.get("operatorRef", "Unknown operator")
            modified = item.get("lastModifiedDate", "Unknown date")

            description_lines.append(
                f"• **{name}**\n  Operator: `{org}`\n  Updated: `{modified}`"
            )

        embed = {
            "title": "🚌 BODS Timetable Update Detected",
            "description": "\n\n".join(description_lines) or "No dataset details available",
            "color": 0x1E90FF,
            "footer": {
                "text": "BODS Watcher • Automatic Monitoring"
            },
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }

        return embed