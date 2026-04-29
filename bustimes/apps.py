from django.apps import AppConfig


class BustimesConfig(AppConfig):
    name = "bustimes"

def ready(self):
    return  # disable signals temporarily