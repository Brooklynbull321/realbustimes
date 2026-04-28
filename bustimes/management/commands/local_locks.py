import hashlib
import requests

from django.core.management.base import BaseCommand
from django.conf import settings
from django.core.cache import cache
from django.db.models import Count

from accounts.models import OperatorUser
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = "Live Local Lock Dashboard (Users + Summary)"

    def handle(self, *args, **options):
        webhook_url = getattr(settings, "LOCAL_LOCK_WEBHOOK_URL", None)

        if not webhook_url:
            self.stderr.write("LOCAL_LOCK_WEBHOOK_URL not set")
            return

        users = User.objects.all().order_by("id")

        total_locked = 0
        user_lock_counts = []
        operator_frequency = {}

        # =========================
        # USER EMBEDS (LIVE UPDATE)
        # =========================
        for user in users:
            relations = (
                OperatorUser.objects
                .filter(user=user)
                .select_related("operator")
            )

            if not relations.exists():
                continue

            count = relations.count()
            total_locked += count

            user_lock_counts.append((user, count))

            # hash state for change detection
            state_string = "".join(
                f"{r.operator}-{r.staff}" for r in relations
            )

            current_hash = hashlib.sha256(state_string.encode()).hexdigest()

            hash_key = f"ll_hash_{user.id}"
            msg_key = f"ll_msg_{user.id}"

            old_hash = cache.get(hash_key)

            if old_hash == current_hash:
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

            embed = {
                "title": f"👤 {user}",
                "color": 0x2ECC71,
                "description": "\n".join(description),
                "fields": [
                    {
                        "name": "📊 Summary",
                        "value": (
                            f"Total: `{count}`\n"
                            f"Staff: `{len(staff_ops)}`\n"
                            f"Regular: `{len(normal_ops)}`"
                        )
                    }
                ]
            }

            msg_id = cache.get(msg_key)

            if msg_id:
                requests.patch(
                    f"{webhook_url}/messages/{msg_id}",
                    json=embed
                )
            else:
                r = requests.post(
                    webhook_url + "?wait=true",
                    json={"embeds": [embed]}
                )

                if r.status_code in (200, 204):
                    data = r.json()
                    cache.set(msg_key, data["id"], None)

            cache.set(hash_key, current_hash, None)

        # =========================
        # SUMMARY CALCULATION
        # =========================
        users_with_locks = 0
        users_without_locks = 0
        total_staff = 0

        for user, count in user_lock_counts:
            if count > 0:
                users_with_locks += 1
            else:
                users_without_locks += 1

        top_user = None
        top_count = 0

        if user_lock_counts:
            user_lock_counts.sort(key=lambda x: x[1], reverse=True)
            top_user, top_count = user_lock_counts[0]

        most_common_operator = "None"
        most_common_count = 0

        if operator_frequency:
            most_common_operator = max(
                operator_frequency,
                key=operator_frequency.get
            )
            most_common_count = operator_frequency[most_common_operator]

        avg = total_locked / len(user_lock_counts) if user_lock_counts else 0

        health_score = min(
            100,
            int((total_locked * 2) + (total_staff * 3))
        )

        # =========================
        # SUMMARY EMBED
        # =========================
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
                    "name": "📈 Avg per User",
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

        summary_key = "ll_summary_msg"
        summary_msg = cache.get(summary_key)

        if summary_msg:
            requests.patch(
                f"{webhook_url}/messages/{summary_msg}",
                json=summary_embed
            )
        else:
            r = requests.post(
                webhook_url + "?wait=true",
                json={"embeds": [summary_embed]}
            )

            if r.status_code in (200, 204):
                data = r.json()
                cache.set(summary_key, data["id"], None)

        self.stdout.write(self.style.SUCCESS("Dashboard synced"))