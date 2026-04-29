from django.core.cache import cache
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from .models import OperatorUser


def trigger_update():
    if cache.get("local_lock_trigger_lock"):
        return

    cache.set("local_lock_trigger_lock", True, timeout=5)

    try:
        from .local_lock import build_local_lock_dashboard
        build_local_lock_dashboard()
    finally:
        cache.delete("local_lock_trigger_lock")


@receiver(post_save, sender=OperatorUser)
def saved(sender, instance, **kwargs):
    trigger_update()


@receiver(post_delete, sender=OperatorUser)
def deleted(sender, instance, **kwargs):
    trigger_update()