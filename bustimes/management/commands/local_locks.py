import requests

from django.core.management.base import BaseCommand
from django.conf import settings

from accounts.models import OperatorUser
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = "Full Local Lock Dashboard (Users + Summary)"

    def handle(self, *args, **options):
        webhook_url = getattr(settings, "LOCAL_LOCK_WEBHOOK_URL", None)

        if not webhook_url:
            self.stderr.write("LOCAL_LOCK_WEBHOOK_URL not set")
            return

        users = User.objects.all().order_by("id")

        embeds = []

        # =========================
        # USER EMBEDS
        # =========================
        operator_frequency = {}

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

                operator_frequency[name] = operator_frequency.get(name, 0) + 1

                line = f"**{name}** | `{noc}`"

                if rel.staff:
                    staff_ops.append(f"⭐ {line}")
                else:
                    normal_ops.append(line)

            staff_ops.sort()
            normal_ops.sort()

            description = ["## 🚏 Local Lock Operators\n"]

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
                            f"Total: `{len(relations)}`\n"
                            f"Staff: `{len(staff_ops)}`\n"
                            f"Regular: `{len(normal_ops)}`"
                        )
                    }
                ]
            })

        # =========================
        # SUMMARY STATS
        # =========================
        user_lock_counts = []

        total_locked = 0
        users_with_locks = 0
        users_without_locks = 0

        for user in users:
            count = OperatorUser.objects.filter(user=user).count()

            if count > 0:
                users_with_locks += 1
                user_lock_counts.append((user, count))
                total_locked += count
            else:
                users_without_locks += 1

        user_lock_counts.sort(key=lambda x: x[1], reverse=True)

        top_user = user_lock_counts[0][0] if user_lock_counts else None
        top_count = user_lock_counts[0][1] if user_lock_counts else 0

        most_common_operator = "None"
        most_common_count = 0

        if operator_frequency:
            most_common_operator = max(operator_frequency, key=operator_frequency.get)
            most_common_count = operator_frequency[most_common_operator]

        avg = total_locked / len(user_lock_counts) if user_lock_counts else 0

        health_score = min(
            100,
            int((total_locked * 2) + (users_with_locks * 3))
        )

        summary_embed = {
            "title": "📊 Local Lock Summary Dashboard",
            "color": 0x3498DB,
            "fields": [
                {
                    "name": "🔒 Total Locked Operators",
                    "value": f"`{total_locked}`",
                    "inline": True
                },
                {
                    "name": "👥 Active Users",
                    "value": f"`{users_with_locks}`",
                    "inline": True
                },
                {
                    "name": "🚫 Inactive Users",
                    "value": f"`{users_without_locks}`",
                    "inline": True
                },
                {
                    "name": "👑 Top User",
                    "value": (
                        f"{top_user}\n`{top_count} locks`"
                        if top_user else "None"
                    ),
                    "inline": True
                },
                {
                    "name": "🔥 Most Common Operator",
                    "value": f"{most_common_operator}\n`{most_common_count} uses`",
                    "inline": True
                },
                {
                    "name": "📈 Avg per Active User",
                    "value": f"`{avg:.2f}`",
                    "inline": True
                },
                {
                    "name": "🧠 System Health Score",
                    "value": f"`{health_score}/100`",
                    "inline": True
                }
            ],
            "footer": {
                "text": "Live Local Lock Intelligence Dashboard"
            }
        }

        embeds.append(summary_embed)

        # =========================
        # DISCORD SENDING (chunk safe)
        # =========================
        chunk_size = 10

        for i in range(0, len(embeds), chunk_size):
            payload = {
                "username": "🚏 Local Lock Monitor",
                "embeds": embeds[i:i + chunk_size]
            }

            r = requests.post(webhook_url, json=payload)

            if r.status_code not in (200, 204):
                self.stderr.write(f"Webhook failed: {r.status_code} {r.text}")

        self.stdout.write(self.style.SUCCESS("Full dashboard sent"))