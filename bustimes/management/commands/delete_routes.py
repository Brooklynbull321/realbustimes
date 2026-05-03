from django.core.management.base import BaseCommand
from busstops.models import Service


class Command(BaseCommand):
    help = "FULL delete all data for an operator NOC"

    def add_arguments(self, parser):
        parser.add_argument("noc", type=str)
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **options):
        noc = options["noc"]
        dry_run = options["dry_run"]

        qs = Service.objects.filter(operator__noc=noc)
        count = qs.count()

        self.stdout.write(f"Services (routes): {count}")

        if dry_run:
            self.stdout.write(self.style.WARNING("Dry run — nothing deleted"))
            return

        qs.delete()

        self.stdout.write(self.style.SUCCESS(
            f"FULL DELETE complete for operator {noc}"
        ))