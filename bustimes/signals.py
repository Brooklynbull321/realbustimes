from django.core.cache import cache
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from .models import OperatorUser


def trigger_local_lock_update():
    """
    Debounced trigger to prevent spam updates
    when multiple OperatorUser changes happen quickly.
    """

    if cache.get("local_lock_update_lock"):
        return

    cache.set("local_lock_update_lock", True, timeout=5)

    try:
        from .local_lock import build_local_lock_dashboard
        build_local_lock_dashboard()
    finally:
        cache.delete("local_lock_update_lock")


# -------------------------
# CREATE / UPDATE
# -------------------------
@receiver(post_save, sender=OperatorUser)
def operatoruser_saved(sender, instance, created, **kwargs):
    trigger_local_lock_update()


# -------------------------
# DELETE
# -------------------------
@receiver(post_delete, sender=OperatorUser)
def operatoruser_deleted(sender, instance, **kwargs):
    trigger_local_lock_update()