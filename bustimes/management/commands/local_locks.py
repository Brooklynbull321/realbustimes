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

        embeds = []

        users = User.objects.all()

        for user in users:
            relations = (
                OperatorUser.objects
                .filter(user=user)
                .select_related("operator")
            )

            if not relations.exists():
                continue

            # Split staff vs non-staff
            staff_ops = []
            normal_ops = []

            for rel in relations:
                op = rel.operator

                name = getattr(op, "name", str(op))
                noc = getattr(op, "noc_code", "N/A")

                line = f"{name} | {noc}"

                if rel.staff:
                    staff_ops.append(f"⭐ {line}")
                else:
                    normal_ops.append(line)

            # Sort alphabetically
            staff_ops.sort()
            normal_ops.sort()

            final_lines = []

            if staff_ops:
                final_lines.append("STAFF OPERATORS")
                final_lines.extend(staff_ops)
                final_lines.append("")

            if normal_ops:
                final_lines.append("OPERATORS")
                final_lines.extend(normal_ops)

            embeds.append({
                "title": f"👤 {user}",
                "color": 0x2ECC71,
                "description": (
                    "Local Lock Operators:\n```"
                    + "\n".join(final_lines)
                    + "```"
                ),
                "footer": {
                    "text": f"Total Operators: {len(relations)} | Staff: {len(staff_ops)}"
                }
            })

        # Discord safety chunking
        chunk_size = 10

        for i in range(0, len(embeds), chunk_size):
            payload = {
                "username": "Local Lock Monitor",
                "embeds": embeds[i:i + chunk_size]
            }

            r = requests.post(webhook_url, json=payload)

            if r.status_code not in (200, 204):
                self.stderr.write(f"Webhook failed: {r.status_code} {r.text}")

        self.stdout.write(self.style.SUCCESS("Sent formatted operator embeds"))