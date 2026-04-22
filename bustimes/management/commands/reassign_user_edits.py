from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from vehicles.models import Vehicle  # adjust if needed

User = get_user_model()


class Command(BaseCommand):
    help = "Reassign vehicle edits from one user to another"

    def add_arguments(self, parser):
        parser.add_argument("from_user_id", type=int)
        parser.add_argument("to_user_id", type=int)

    def handle(self, *args, **options):
        from_user = User.objects.get(id=options["from_user_id"])
        to_user = User.objects.get(id=options["to_user_id"])

        self.stdout.write(f"Reassigning vehicle edits: {from_user} → {to_user}")

        updated = Vehicle.objects.filter(created_by=from_user).update(created_by=to_user)

        self.stdout.write(self.style.SUCCESS(f"{updated} vehicle records updated"))