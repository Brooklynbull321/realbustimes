from django.core.management.base import BaseCommand
from bustimes.models import Route, Trip, StopTime, Stop


class Command(BaseCommand):
    help = "Delete routes and related data by operator NOC"

    def add_arguments(self, parser):
        parser.add_argument("noc", type=str)
        parser.add_argument("--dry-run", action="store_true")
        parser.add_argument(
            "--delete-unused-stops",
            action="store_true",
            help="Also delete stops not used by any trips"
        )

    def handle(self, *args, **options):
        noc = options["noc"]
        dry_run = options["dry_run"]
        delete_unused_stops = options["delete_unused_stops"]

        routes = Route.objects.filter(operator__noc=noc)
        trips = Trip.objects.filter(route__operator__noc=noc)
        stop_times = StopTime.objects.filter(trip__route__operator__noc=noc)

        route_count = routes.count()
        trip_count = trips.count()
        stoptime_count = stop_times.count()

        self.stdout.write(f"Routes: {route_count}")
        self.stdout.write(f"Trips: {trip_count}")
        self.stdout.write(f"StopTimes: {stoptime_count}")

        if dry_run:
            self.stdout.write(self.style.WARNING("Dry run — nothing deleted"))
            return

        # Delete in correct order
        stop_times.delete()
        trips.delete()
        routes.delete()

        self.stdout.write(self.style.SUCCESS("Deleted routes, trips, and stop times"))

        # Optional: clean unused stops
        if delete_unused_stops:
            unused_stops = Stop.objects.filter(stoptime__isnull=True)
            count = unused_stops.count()

            unused_stops.delete()

            self.stdout.write(self.style.SUCCESS(
                f"Deleted {count} unused stops"
            ))