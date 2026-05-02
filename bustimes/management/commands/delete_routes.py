from django.core.management.base import BaseCommand
from bustimes.models import Route


class Command(BaseCommand):
    help = "Delete routes by operator NOC"

    def add_arguments(self, parser):
        parser.add_argument("noc", type=str)
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **options):
        noc = options["noc"]
        dry_run = options["dry_run"]

        qs = Route.objects.filter(service__operator__noc=noc)
        count = qs.count()

        self.stdout.write(f"Routes: {count}")

        if dry_run:
            self.stdout.write(self.style.WARNING("Dry run — nothing deleted"))
            return

        qs.delete()

        self.stdout.write(self.style.SUCCESS(
            f"Deleted {count} routes for operator {noc}"
        ))