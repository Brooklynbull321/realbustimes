import requests
from django.core.management.base import BaseCommand
from django.conf import settings

from accounts.models import OperatorUser
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = "Send formatted Local Lock Operators to Discord"

    def handle(self, *args, **options):
        webhook_url = getattr(settings, "LOCAL_LOCK_WEBHOOK_URL", None)

        if not webhook_url:
            self.stderr.write("LOCAL_LOCK_WEBHOOK_URL not set")
            return

        users = User.objects.all().order_by("id")

        embeds = []

        for user in users:
            relations = (
                OperatorUser.objects
                .filter(user=user)
                .select_related("operator")
            )

            if not relations.exists():
                continue

            staff_ops = []
            normal_ops = []

            for rel in relations:
                op = rel.operator

                name = getattr(op, "name", str(op))
                noc = getattr(op, "noc", "N/A")

                line = f"**{name}**  `|`  `{noc}`"

                if rel.staff:
                    staff_ops.append(f"⭐ {line}")
                else:
                    normal_ops.append(line)

            staff_ops.sort()
            normal_ops.sort()

            description = []

            description.append("## 🚏 Local Lock Operators\n")

            if staff_ops:
                description.append("### ⭐ Staff Operators")
                description.extend(staff_ops)
                description.append("")

            if normal_ops:
                description.append("### 🚌 Operators")
                description.extend(normal_ops)

            embeds.append({
                "title": f"👤 {user}",
                "color": 0x2ECC71,
                "description": "\n".join(description),
                "fields": [
                    {
                        "name": "📊 Summary",
                        "value": (
                            f"**Total:** `{len(relations)}`\n"
                            f"**Staff:** `{len(staff_ops)}`\n"
                            f"**Regular:** `{len(normal_ops)}`"
                        ),
                        "inline": False
                    }
                ],
                "footer": {
                    "text": f"User ID Order • ID: {user.id}"
                }
            })

        # chunk embeds safely
        chunk_size = 10

        for i in range(0, len(embeds), chunk_size):
            payload = {
                "username": "🚏 Local Lock Monitor",
                "embeds": embeds[i:i + chunk_size]
            }

            r = requests.post(webhook_url, json=payload)

            if r.status_code not in (200, 204):
                self.stderr.write(f"Webhook failed: {r.status_code} {r.text}")

        self.stdout.write(self.style.SUCCESS("Sent beautifully formatted embeds"))