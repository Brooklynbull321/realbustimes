from django.core.management.base import BaseCommand
from django.db import connection
from django.apps import apps


class Command(BaseCommand):
    help = "Fix all PostgreSQL sequences to match max primary key values"

    def handle(self, *args, **options):
        with connection.cursor() as cursor:
            for model in apps.get_models():
                table = model._meta.db_table
                pk = model._meta.pk

                # Only handle AutoField / BigAutoField
                if not pk.auto_created:
                    continue

                column = pk.column

                try:
                    # Get the sequence name
                    cursor.execute(
                        "SELECT pg_get_serial_sequence(%s, %s)",
                        [table, column],
                    )
                    result = cursor.fetchone()

                    if not result or not result[0]:
                        continue

                    sequence = result[0]

                    # Get max ID
                    cursor.execute(f'SELECT MAX("{column}") FROM "{table}"')
                    max_id = cursor.fetchone()[0] or 1

                    # Set sequence to max_id
                    cursor.execute(
                        f"SELECT setval(%s, %s, true)",
                        [sequence, max_id],
                    )

                    self.stdout.write(
                        self.style.SUCCESS(
                            f"✔ Fixed {table} → {sequence} set to {max_id}"
                        )
                    )

                except Exception as e:
                    self.stdout.write(
                        self.style.WARNING(
                            f"⚠ Skipped {table}: {e}"
                        )
                    )

        self.stdout.write(self.style.SUCCESS("Done fixing sequences."))