from django.db import connection
import time
import requests
from django.core.management.base import BaseCommand
from django.conf import settings
import logging

pingKaiOpCodes = ["BULI", "MDCL", "TBTN"] 
pingBeeOpCodes = ["BNVB", "BNSM", "BNDB", 'BNFM', 'BNGN', 'BNML'] 
pingBrookOpCodes = ["TNXB", "BNDB", "BNFM", "BNGN", 'BNML', 'BNSM', 'BNVB', 'VISB', 'BPTR', 'LNUD', 'MOVP', 'NWBT', 'NATX', 'BLPH', 'HWCO', 'ROST', 'KDTR', 'HRGT', 'YCST', 'FLYE', 'TPEN', 'TFLO', 'SCMY', 'TBTN', 'RSTY', 'PBLT', 'MCGL', 'FSCE', 'NWPT', 'EYMS', 'CBUS', 'TRDU', 'TFCN', 'MESC', 'MBLB', 'BLAC'] 

class Command(BaseCommand):
    def handle(self, *args, **options):
        assert settings.NEW_VEHICLE_WEBHOOK_URL, "NEW_VEHICLE_WEBHOOK_URL is not set"
        assert settings.TFL_VEHICLE_WEBHOOK_URL, "TFL_VEHICLE_WEBHOOK_URL is not set"

        session = requests.Session()
        logger = logging.getLogger(__name__)

        with connection.cursor() as cursor:
            cursor.execute("""
                CREATE OR REPLACE FUNCTION notify_new_vehicle()
                RETURNS trigger AS $$
                BEGIN
                    PERFORM pg_notify('new_vehicle', NEW.slug);
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;
            """)
            cursor.execute("""
                CREATE OR REPLACE TRIGGER notify_new_vehicle
                AFTER INSERT ON vehicles_vehicle
                FOR EACH ROW
                EXECUTE PROCEDURE notify_new_vehicle();
            """)

            cursor.execute("LISTEN new_vehicle")
            gen = cursor.connection.notifies()

            for notify in gen:
                slug = notify.payload

                ping_codes_brook_lower = [c.lower() for c in pingBrookOpCodes]
                ping_codes_bee_lower = [c.lower() for c in pingBeeOpCodes]
                ping_codes_kai_lower = [c.lower() for c in pingKaiOpCodes]
                # Call the API with the slug
                try:
                    api_response = session.get(f"https://ukbuses.org/api/vehicles/?slug={slug}", timeout=10)
                    api_response.raise_for_status()
                    api_data = api_response.json()
                    logger.info(f"API response: {api_data}")
                except Exception as e:
                    api_data = None
                    logger.error(f"Error calling API: {e}")

                pings = ""
                color = 3447003

                result = api_data['results'][0] if api_data and api_data.get('results') else {}
                code = result.get("operator", {}).get("id", "Unknown").lower()

                # Add mentions based on operator code
                if code in ping_codes_kai_lower:
                    pings = f"<@755846766653341756>{pings}"
                if code in ping_codes_brook_lower:
                    pings = f"<@281084640440090627>{pings}"

                if code in ping_codes_bee_lower:
                    pings = f"<@&1366514647938760724>{pings}"
                    color = 0xEECE5B

                if code.upper() == "TFLO":
                    pings = f"<@&1375833411943530536>{pings}"
                    color = 0xDC241F

                embed = {
                    "title": f"New Vehicle: {slug}",
                    "color": color,
                    "description": f"[View Vehicle](https://ukbuses.org/vehicles/{slug})",
                    "fields": [
                        {"name": "Fleet Code", "value": result.get("fleet_code") or "N/A", "inline": True},
                        {"name": "Reg", "value": result.get("reg") or "N/A", "inline": True},
                        {"name": "Operator", "value": str(result.get("operator", {}).get("name", "Unknown")), "inline": False},
                    ],
                }
                content = f"{pings}"
                embeds = [embed]

                URL = settings.TFL_VEHICLE_WEBHOOK_URL if code.upper() == "TFLO" else settings.NEW_VEHICLE_WEBHOOK_URL

                json_payload = {
                    "username": "New Vehicle",
                    "content": content,
                }
                if embeds:
                    json_payload["embeds"] = embeds

                try:
                    response = session.post(URL, json=json_payload, timeout=10)
                    response.raise_for_status()
                    logger.info(f"Webhook sent: {response.status_code} {response.text}")
                except Exception as e:
                    logger.error(f"Error sending webhook: {e}")

                time.sleep(5)
