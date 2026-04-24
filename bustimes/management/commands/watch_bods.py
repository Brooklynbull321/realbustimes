import os
import time
import signal
import hashlib
import requests
from datetime import datetime, timedelta

from django.core.management.base import BaseCommand
from django.core.cache import cache
from django.conf import settings


BODS_DATASETS_URL = "https://data.bus-data.dft.gov.uk/api/v1/dataset/"


DIGEST_INTERVAL_SECONDS = 3 * 60 * 60  # 3 hours


class Command(BaseCommand):
    help = "BODS watcher with real-time alerts + 3-hour digest"

    def handle(self, *args, **options):
        webhook_url = getattr(settings, "WATCHBODS_WEBHOOK_URL", None)
        api_key = os.environ.get("BODS_API_KEY")

        if not webhook_url:
            self.stderr.write("WATCHBODS_WEBHOOK_URL not set")
            return

        if not api_key:
            self.stderr.write("BODS_API_KEY not set")
            return

        self.stdout.write(self.style.SUCCESS("BODS watcher started (realtime + digest mode)"))

        session = requests.Session()
        session.headers.update({
            "Authorization": f"Token {api_key}",
            "Accept": "application/json",
        })

        last_hash = cache.get("bods_last_hash")
        change_buffer = cache.get("bods_change_buffer") or []

        last_digest_time = cache.get("bods_last_digest_time")
        if not last_digest_time:
            last_digest_time = time.time()
            cache.set("bods_last_digest_time", last_digest_time, None)

        running = True

        def shutdown(signum, frame):
            nonlocal running
            self.stdout.write("Shutting down...")
            running = False

        signal.signal(signal.SIGTERM, shutdown)
        signal.signal(signal.SIGINT, shutdown)

        while running:
            try:
                r = session.get(BODS_DATASETS_URL, timeout=20)
                r.raise_for_status()

                raw = r.content
                data = r.json()

                current_hash = hashlib.sha256(raw).hexdigest()

                # FIRST RUN
                if last_hash is None:
                    cache.set("bods_last_hash", current_hash, None)
                    last_hash = current_hash
                    self.stdout.write("Baseline stored")

                # CHANGE DETECTED
                elif current_hash != last_hash:
                    self.stdout.write(self.style.WARNING("Change detected"))

                    change_event = self.extract_changes(data)

                    # ---- REAL-TIME WEBHOOK ----
                    try:
                        requests.post(
                            webhook_url,
                            json={"embeds": [self.build_embed(change_event, realtime=True)]},
                            timeout=10
                        )
                    except Exception as e:
                        self.stderr.write(f"Realtime webhook failed: {e}")

                    # ---- BUFFER FOR DIGEST ----
                    change_buffer.append(change_event)
                    cache.set("bods_change_buffer", change_buffer, None)

                    cache.set("bods_last_hash", current_hash, None)
                    last_hash = current_hash

                # ---- DIGEST CHECK (every 3 hours) ----
                now = time.time()
                if now - last_digest_time >= DIGEST_INTERVAL_SECONDS:

                    if change_buffer:
                        self.stdout.write("Sending 3-hour digest")

                        try:
                            requests.post(
                                webhook_url,
                                json={"embeds": [self.build_digest_embed(change_buffer)]},
                                timeout=15
                            )
                        except Exception as e:
                            self.stderr.write(f"Digest webhook failed: {e}")

                        change_buffer = []
                        cache.set("bods_change_buffer", [], None)

                    last_digest_time = now
                    cache.set("bods_last_digest_time", last_digest_time, None)

                time.sleep(60)

            except requests.RequestException as e:
                self.stderr.write(f"BODS request error: {e}")
                time.sleep(60)

            except Exception as e:
                self.stderr.write(f"Unexpected error: {e}")
                time.sleep(60)

    # -----------------------------
    # CHANGE EXTRACTION
    # -----------------------------
    def extract_changes(self, data):
        results = data.get("results", [])

        # Keep lightweight snapshot per change event
        return [
            {
                "name": item.get("name"),
                "operator": item.get("operatorRef"),
                "updated": item.get("lastModifiedDate"),
            }
            for item in results[:5]
        ]

    # -----------------------------
    # REALTIME EMBED
    # -----------------------------
    def build_embed(self, change_event, realtime=False):
        lines = [
            f"• **{c['name']}**\n  Operator: `{c['operator']}`\n  Updated: `{c['updated']}`"
            for c in change_event
        ]

        return {
            "title": "🚌 Live BODS Update" if realtime else "🚌 BODS Update",
            "description": "\n\n".join(lines) or "No details",
            "color": 0xFF9900 if realtime else 0x1E90FF,
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }

    # -----------------------------
    # DIGEST EMBED
    # -----------------------------
    def build_digest_embed(self, buffer):
        summary_lines = []

        for i, change in enumerate(buffer[-20:], 1):
            for item in change:
                summary_lines.append(
                    f"{i}. {item['name']} ({item['operator']})"
                )

        return {
            "title": "📊 BODS 3-Hour Change Digest",
            "description": "\n".join(summary_lines) or "No changes in last 3 hours",
            "color": 0x00BFFF,
            "footer": {"text": "Automated Digest"},
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }