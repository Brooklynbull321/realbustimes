from django.apps import AppConfig


class BustimesConfig(AppConfig):
    name = "bustimes"

    def ready(self):
        import bustimes.signals