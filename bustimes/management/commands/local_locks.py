import requests
from django.core.management.base import BaseCommand
from django.conf import settings

from accounts.models import OperatorUser
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = "Send Users with OperatorUser relations to Discord"

    def handle(self, *args, **options):
        webhook_url = getattr(settings, "LOCAL_LOCK_WEBHOOK_URL", None)

        if not webhook_url:
            self.stderr.write("LOCAL_LOCK_WEBHOOK_URL not set")
            return

        users = User.objects.all()

        if not users.exists():
            self.stdout.write("No users found")
            return

        embeds = []

        for user in users:
            relations = OperatorUser.objects.filter(user=user)

            if not relations.exists():
                continue

            lines = []

            for rel in relations:
                lines.append(
                    f"• Operator: {rel.operator} | Staff: {rel.staff} | Obj: {rel}"
                )

            embeds.append({
                "title": f"User: {user}",
                "color": 0x1E90FF,
                "fields": [
                    {
                        "name": "OperatorUser Relations",
                        "value": "\n".join(lines)[:1024],  # Discord limit safety
                        "inline": False
                    }
                ]
            })

        chunk_size = 10

        for i in range(0, len(embeds), chunk_size):
            requests.post(
                webhook_url,
                json={
                    "username": "Operator Monitor",
                    "embeds": embeds[i:i + chunk_size]
                }
            )

        self.stdout.write(self.style.SUCCESS("Sent User → OperatorUser mappings"))