from django.core.cache import cache
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from bustimes.models import OperatorUser


def trigger_local_lock_update():
    # prevents spam firing
    if cache.get("local_lock_running"):
        return

    cache.set("local_lock_running", True, timeout=5)

    try:
        from bustimes.services.local_locks import build_local_lock_dashboard
        build_local_lock_dashboard()
    finally:
        cache.delete("local_lock_running")


@receiver(post_save, sender=OperatorUser)
def operatoruser_saved(sender, instance, **kwargs):
    trigger_local_lock_update()


@receiver(post_delete, sender=OperatorUser)
def operatoruser_deleted(sender, instance, **kwargs):
    trigger_local_lock_update()