from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from vehicles.models import VehicleRevision

User = get_user_model()


class Command(BaseCommand):
    help = "Reassign vehicle edits from one user to another (safe mode)"

    def add_arguments(self, parser):
        parser.add_argument("from_user_id", type=int)
        parser.add_argument("to_user_id", type=int)

    def handle(self, *args, **options):
        from_user_id = options["from_user_id"]
        to_user_id = options["to_user_id"]

        # ✅ Check users exist
        try:
            from_user = User.objects.get(id=from_user_id)
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR(f"FROM user {from_user_id} does not exist"))
            return

        try:
            to_user = User.objects.get(id=to_user_id)
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR(f"TO user {to_user_id} does not exist"))
            return

        # ✅ Prevent same user
        if from_user_id == to_user_id:
            self.stdout.write(self.style.ERROR("Cannot reassign to the same user"))
            return

        self.stdout.write(f"Reassigning vehicle edits: {from_user} → {to_user}")

        # ✅ Count first (preview)
        count = VehicleRevision.objects.filter(user=from_user).count()

        if count == 0:
            self.stdout.write(self.style.WARNING("No vehicle revisions found for this user"))
            return

        self.stdout.write(f"{count} revisions will be reassigned")

        # ✅ Confirm
        confirm = input("Type 'yes' to continue: ")
        if confirm.lower() != "yes":
            self.stdout.write(self.style.WARNING("Aborted"))
            return

        # ✅ Perform update
        updated = VehicleRevision.objects.filter(user=from_user).update(user=to_user)

        self.stdout.write(self.style.SUCCESS(f"{updated} vehicle revisions reassigned successfully"))