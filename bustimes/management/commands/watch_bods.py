from django.core.management.base import BaseCommand
from django.conf import settings

import time
import requests
import logging


logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Watch BODS feed and send webhook notifications"

    def add_arguments(self, parser):
        parser.add_argument(
            "--interval",
            type=int,
            default=30,
            help="Polling interval in seconds",
        )

    def handle(self, *args, **options):
        interval = options["interval"]

        webhook_url = getattr(settings, "WATCHBODS_WEBHOOK_URL", None)

        if not webhook_url:
            self.stderr.write(
                self.style.ERROR(
                    "WATCHBODS_WEBHOOK_URL is not set in settings.py"
                )
            )
            return

        self.stdout.write(
            self.style.SUCCESS(
                f"Starting BODS watcher (polling every {interval}s)"
            )
        )

        try:
            while True:
                self.check_bods(webhook_url)
                time.sleep(interval)

        except KeyboardInterrupt:
            self.stdout.write(
                self.style.WARNING("Watcher stopped.")
            )

        except Exception as exc:
            logger.exception("Watcher crashed")
            self.stderr.write(
                self.style.ERROR(f"Error: {exc}")
            )

    def check_bods(self, webhook_url):
        """
        Replace this with your actual BODS monitoring logic.
        """

        self.stdout.write("Checking BODS feed...")

        # Example placeholder payload
        payload = {
            "message": "BODS watcher heartbeat",
            "status": "running",
        }

        try:
            response = requests.post(
                webhook_url,
                json=payload,
                timeout=10
            )

            if response.ok:
                self.stdout.write(
                    self.style.SUCCESS(
                        "Webhook notification sent"
                    )
                )
            else:
                self.stderr.write(
                    self.style.WARNING(
                        f"Webhook returned {response.status_code}"
                    )
                )

        except requests.RequestException as exc:
            self.stderr.write(
                self.style.ERROR(
                    f"Webhook request failed: {exc}"
                )
            )