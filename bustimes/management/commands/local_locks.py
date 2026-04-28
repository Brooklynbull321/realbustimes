import requests
from django.core.management.base import BaseCommand
from django.conf import settings

from accounts.models import OperatorUser


class Command(BaseCommand):
    help = "Send OperatorUser + operators list to Discord"

    def handle(self, *args, **options):
        webhook_url = getattr(settings, "LOCAL_LOCK_WEBHOOK_URL", None)

        if not webhook_url:
            self.stderr.write("LOCAL_LOCK_WEBHOOK_URL not set")
            return

        users = OperatorUser.objects.all()

        if not users.exists():
            self.stdout.write("No OperatorUsers found")
            return

        embeds = []

        for user in users:

            # THIS is your reverse relation from template:
            # object.operatoruser_set.all() equivalent would be on the parent model,
            # BUT here you're already inside OperatorUser, so you DON'T use it.

            operators = user.operators.all()  # keep only if this relation exists

            operator_list = "\n".join(
                f"• {op}"
                for op in operators
            ) or "None"

            embeds.append({
                "title": f"OperatorUser: {user.username}",
                "color": 0x1E90FF,
                "fields": [
                    {
                        "name": "OperatorUser Object",
                        "value": str(user),
                        "inline": False
                    },
                    {
                        "name": "Operators",
                        "value": operator_list,
                        "inline": False
                    }
                ]
            })

        chunk_size = 10

        for i in range(0, len(embeds), chunk_size):
            payload = {
                "username": "Operator Monitor",
                "embeds": embeds[i:i + chunk_size]
            }

            r = requests.post(webhook_url, json=payload)

            if r.status_code not in (200, 204):
                self.stderr.write(f"Webhook failed: {r.status_code} {r.text}")

        self.stdout.write(self.style.SUCCESS("Sent OperatorUser embeds"))