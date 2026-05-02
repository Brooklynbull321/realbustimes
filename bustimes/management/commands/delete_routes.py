from django.core.management.base import BaseCommand
from bustimes.models import Route, Trip, StopTime


class Command(BaseCommand):
    help = "Delete routes and related data by operator NOC"

    def add_arguments(self, parser):
        parser.add_argument("noc", type=str)
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **options):
        noc = options["noc"]
        dry_run = options["dry_run"]

        routes = Route.objects.filter(operator__noc=noc)
        trips = Trip.objects.filter(route__operator__noc=noc)
        stop_times = StopTime.objects.filter(trip__route__operator__noc=noc)

        self.stdout.write(f"Routes: {routes.count()}")
        self.stdout.write(f"Trips: {trips.count()}")
        self.stdout.write(f"StopTimes: {stop_times.count()}")

        if dry_run:
            self.stdout.write(self.style.WARNING("Dry run — nothing deleted"))
            return

        stop_times.delete()
        trips.delete()
        routes.delete()

        self.stdout.write(self.style.SUCCESS("Deleted routes, trips, and stop times"))