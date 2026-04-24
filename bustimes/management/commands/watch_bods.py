import os
import time
import hashlib
import requests

from django.core.management.base import BaseCommand
from django.conf import settings
from django.core.cache import cache


BODS_DATASETS_URL = "https://data.bus-data.dft.gov.uk/api/v1/dataset/"


class Command(BaseCommand):
    help = "Watch BODS timetable datasets and send Discord webhook updates"

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

        # Read API key from environment (source of truth)
        api_key = os.environ.get("BODS_API_KEY")

        if not webhook_url:
            self.stderr.write("WATCHBODS_WEBHOOK_URL is not set")
            return

        if not api_key:
            self.stderr.write("BODS_API_KEY is not set in environment")
            return

        self.stdout.write(self.style.SUCCESS("Starting BODS watcher..."))

        session = requests.Session()
        session.headers.update({
            "Authorization": f"Token {api_key}",
            "Accept": "application/json",
        })

        last_hash = cache.get("bods_last_hash")

        while True:
            try:
                response = session.get(BODS_DATASETS_URL, timeout=20)
                response.raise_for_status()

                raw = response.content
                data = response.json()

                current_hash = hashlib.sha256(raw).hexdigest()

                # First run snapshot
                if last_hash is None:
                    self.stdout.write("Initial snapshot stored")
                    cache.set("bods_last_hash", current_hash, None)
                    last_hash = current_hash

                # Change detected
                elif current_hash != last_hash:
                    self.stdout.write(self.style.WARNING("BODS update detected"))

                    embed = self.build_embed(data)

                    try:
                        r = requests.post(
                            webhook_url,
                            json={"embeds": [embed]},
                            timeout=10
                        )
                        self.stdout.write(f"Webhook sent ({r.status_code})")
                    except Exception as e:
                        self.stderr.write(f"Webhook failed: {e}")

                    cache.set("bods_last_hash", current_hash, None)
                    last_hash = current_hash

                else:
                    self.stdout.write("No changes detected")

            except requests.HTTPError as e:
                self.stderr.write(f"BODS HTTP error: {e}")

            except requests.RequestException as e:
                self.stderr.write(f"BODS request error: {e}")

            except Exception as e:
                self.stderr.write(f"Unexpected error: {e}")

            time.sleep(interval)

    def build_embed(self, data):
        """
        Create Discord embed showing top dataset updates
        """

        results = data.get("results", [])[:5]

        lines = []

        for item in results:
            name = item.get("name", "Unknown dataset")
            operator = item.get("operatorRef", "Unknown operator")
            modified = item.get("lastModifiedDate", "Unknown date")

            lines.append(
                f"• **{name}**\n"
                f"  Operator: `{operator}`\n"
                f"  Updated: `{modified}`"
            )

        return {
            "title": "🚌 BODS Timetable Update Detected",
            "description": "\n\n".join(lines) or "No dataset details available",
            "color": 0x1E90FF,
            "footer": {
                "text": "BODS Watcher • Automatic Monitoring"
            },
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }