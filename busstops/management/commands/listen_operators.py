import time
import select
import logging
import requests
import psycopg2
from django.core.management.base import BaseCommand
from django.conf import settings
from django.db import connection
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Listens for operator changes and sends Discord webhooks."

    def handle(self, *args, **options):
        assert settings.NEW_OPERATOR_WEBHOOK_URL, "NEW_OPERATOR_WEBHOOK_URL is not set"

        session = requests.Session()

        conn = connection.connection
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)

        with conn.cursor() as cursor:
            cursor.execute("LISTEN new_operator;")

        logger.info("Listening for 'new_operator' notifications...")

        try:
            while True:
                # Wait for notifications (non-blocking with timeout)
                if select.select([conn], [], [], 5) == ([], [], []):
                    continue

                conn.poll()

                while conn.notifies:
                    notify = conn.notifies.pop(0)
                    noc = notify.payload

                    logger.info(f"Received notification for operator: {noc}")

                    row = self.fetch_operator(noc)
                    if not row:
                        logger.error(f"Operator {noc} not found")
                        continue

                    payload = self.build_payload(noc, row)

                    self.send_webhook(session, noc, payload)

        except KeyboardInterrupt:
            logger.info("Shutting down listener...")

        except Exception as e:
            logger.exception(f"Listener crashed: {e}")

    def fetch_operator(self, noc):
        """Fetch operator using Django DB connection (no new psycopg2 connection)."""
        try:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT name, vehicle_mode, url, twitter, address, phone, email
                    FROM busstops_operator
                    WHERE noc = %s
                    """,
                    [noc],
                )
                return cursor.fetchone()
        except Exception as e:
            logger.error(f"DB error fetching operator {noc}: {e}")
            return None

    def build_payload(self, noc, row):
        name, vehicle_mode, url, twitter, address, phone, email = row

        operator_url = f"https://ukbuses.org/operators/{noc}"

        fields = [
            {"name": "NOC", "value": noc, "inline": True},
            {"name": "Name", "value": name or "N/A", "inline": True},
            {"name": "Vehicle Mode", "value": vehicle_mode or "N/A", "inline": True},
            {"name": "URL", "value": url or "N/A", "inline": True},
            {"name": "Twitter", "value": twitter or "N/A", "inline": True},
            {"name": "Address", "value": address or "N/A", "inline": True},
            {"name": "Phone", "value": phone or "N/A", "inline": True},
            {"name": "Email", "value": email or "N/A", "inline": True},
        ]

        return {
            "title": "New or Updated Operator",
            "description": f"[View Operator]({operator_url})",
            "color": 0x0000FF,
            "fields": fields,
            "thumbnail": {
                "url": "https://assets.transportthing.uk/favicon.svg"
            },
            "footer": {
                "text": "TT Operator Tracker"
            },
        }

    def send_webhook(self, session, noc, embed):
        """Send Discord webhook with basic retry logic."""
        payload = {
            "username": "Operator Tracker",
            "embeds": [embed],
        }

        for attempt in range(3):
            try:
                response = session.post(
                    settings.NEW_OPERATOR_WEBHOOK_URL,
                    json=payload,
                    timeout=5,
                )
                response.raise_for_status()
                logger.info(f"Webhook sent for {noc}")
                return

            except requests.exceptions.RequestException as e:
                logger.warning(f"Webhook attempt {attempt+1} failed for {noc}: {e}")
                time.sleep(2 ** attempt)

        logger.error(f"Failed to send webhook for {noc} after retries")