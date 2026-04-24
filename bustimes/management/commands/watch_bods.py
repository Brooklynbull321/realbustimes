import requests
import json
import os
import time
from datetime import datetime

from buses.settings import WATCHBODS_WEBHOOK_URL

BODS_URL = "https://data.bus-data.dft.gov.uk/api/v1/dataset/"
CHECK_EVERY_SECONDS = 300
STATE_FILE = "last_state.json"


def send_discord(message):
    requests.post(
        WATCHBODS_WEBHOOK_URL,
        json={"content": message},
        timeout=15
    )


def load_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE, "r") as f:
            return json.load(f)

    return {"last_modified": None}


def save_state(last_modified):
    with open(STATE_FILE, "w") as f:
        json.dump(
            {"last_modified": last_modified},
            f
        )


def get_bods_update():
    r = requests.get(
        BODS_URL,
        timeout=30
    )

    r.raise_for_status()

    data = r.json()

    if "results" not in data:
        return None

    return max(
        item.get("modified", "")
        for item in data["results"]
    )


def main():
    state = load_state()

    while True:
        try:
            latest = get_bods_update()

            if latest:

                if not state["last_modified"]:
                    state["last_modified"] = latest
                    save_state(latest)
                    print("Initial state saved.")

                elif latest != state["last_modified"]:

                    send_discord(
                        f"🚌 BODS Updated!\n"
                        f"Old: {state['last_modified']}\n"
                        f"New: {latest}"
                    )

                    state["last_modified"] = latest
                    save_state(latest)

                else:
                    print(
                        f"{datetime.utcnow()} - No changes"
                    )

        except Exception as e:
            print(f"Error: {e}")

        time.sleep(CHECK_EVERY_SECONDS)


if __name__ == "__main__":
    main()