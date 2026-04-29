import requests

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.cache import cache

from accounts.models import OperatorUser

User = get_user_model()


def build_local_lock_dashboard():
    webhook_url = settings.LOCAL_LOCK_WEBHOOK_URL

    # prevent concurrent runs
    if cache.get("local_lock_running"):
        return

    cache.set("local_lock_running", True, timeout=3)

    try:
        users = User.objects.all().order_by("id")

        embeds = []
        operator_frequency = {}

        total_locked = 0
        user_lock_counts = []

        # =========================
        # SNAPSHOT TRACKING (CHANGE DETECTION)
        # =========================
        last_snapshot = cache.get("local_lock_snapshot") or {}
        new_snapshot = {}
        changed_users = set()

        # =========================
        # USER EMBEDS
        # =========================
        for user in users:
            relations = (
                OperatorUser.objects
                .filter(user=user)
                .select_related("operator")
            )

            count = relations.count()
            new_snapshot[str(user.id)] = count

            if last_snapshot.get(str(user.id)) != count:
                changed_users.add(user.id)

            if not relations.exists():
                continue

            total_locked += count
            user_lock_counts.append((user, count))

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

            # only include changed users OR first run
            if changed_users or last_snapshot == {}:
                embeds.append({
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
                })

        cache.set("local_lock_snapshot", new_snapshot, None)

        # =========================
        # SUMMARY
        # =========================
        users_with_locks = len(user_lock_counts)
        users_without_locks = users.count() - users_with_locks

        user_lock_counts.sort(key=lambda x: x[1], reverse=True)

        top_user, top_count = (None, 0)
        if user_lock_counts:
            top_user, top_count = user_lock_counts[0]

        most_common_operator = "None"
        most_common_count = 0

        if operator_frequency:
            most_common_operator = max(operator_frequency, key=operator_frequency.get)
            most_common_count = operator_frequency[most_common_operator]

        avg = total_locked / users_with_locks if users_with_locks else 0

        health_score = min(
            100,
            int((total_locked * 2) + (users_with_locks * 3))
        )

        summary_embed = {
            "title": "📊 Local Lock Summary Dashboard",
            "color": 0x3498DB,
            "fields": [
                {"name": "🔒 Total Locked", "value": f"`{total_locked}`", "inline": True},
                {"name": "👥 Active Users", "value": f"`{users_with_locks}`", "inline": True},
                {"name": "🚫 Inactive Users", "value": f"`{users_without_locks}`", "inline": True},
                {"name": "👑 Top User", "value": f"{top_user}\n`{top_count}`", "inline": True},
                {"name": "🔥 Top Operator", "value": f"{most_common_operator}\n`{most_common_count}`", "inline": True},
                {"name": "📈 Avg/User", "value": f"`{avg:.2f}`", "inline": True},
                {"name": "🧠 Health", "value": f"`{health_score}/100`", "inline": True},
            ],
            "footer": {"text": "Live Local Lock System"}
        }

        embeds.append(summary_embed)

        # =========================
        # DISCORD SEND (SAFE)
        # =========================
        for i in range(0, len(embeds), 10):
            payload = {
                "username": "🚏 Local Lock Monitor",
                "embeds": embeds[i:i + 10]
            }

            try:
                requests.post(webhook_url, json=payload, timeout=10)
            except Exception:
                pass

    finally:
        cache.delete("local_lock_running")