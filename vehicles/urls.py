from django.contrib.auth.decorators import login_required
from django.urls import path
from django.views.generic.base import TemplateView

from . import views

urlpatterns = [
    path("groups/<parent>/vehicles", login_required(views.operator_vehicles), name="operator_vehicles"),
    path(
        "operators/<slug>/vehicles", login_required(views.operator_vehicles), name="operator_vehicles"
    ),
    path("operators/<slug>/map", login_required(views.operator_map), name="operator_map"),
    path("operators/<slug>/debug", login_required(views.operator_debug)),
    path("services/<slug>/vehicles", login_required(views.service_vehicles_history)),
    path("vehicles", login_required(views.vehicles)),
    path("vehicles.json", views.vehicles_json),
    path("vehicles/debug", login_required(views.debug)),
    path("vehicles/history", login_required(views.vehicle_edits)),
    path("vehicles/edits", login_required(views.vehicle_edits)),
    path(
        "vehicles/revisions/<int:revision_id>/<action>",
        login_required(views.vehicle_revision_action),
        name="vehicle_revision_action",
    ),
    path("vehicles/<int:pk>", login_required(views.VehicleDetailView.as_view())),
    path("vehicles/<slug>", login_required(views.VehicleDetailView.as_view()), name="vehicle_detail"),
    path("vehicles/<int:id>/edit", login_required(views.edit_vehicle)),
    path("vehicles/<slug>/edit", login_required(views.edit_vehicle), name="vehicle_edit"),
    path(
        "vehicles/<int:id>/debug",
        login_required(views.latest_journey_debug),
        name="latest_journey_debug",
    ),
    path("vehicles/<slug>/debug", login_required(views.latest_journey_debug)),
    path("journeys/<int:pk>", login_required(views.VehicleJourneyDetailView.as_view())),
    path("journeys/<int:pk>.json", login_required(views.journey_json)),
    path(
        "vehicles/<int:vehicle_id>/journeys/<int:pk>.json",
        login_required(views.journey_json),
        name="vehicle_journey",
    ),
    path(
        "services/<int:service_id>/journeys/<int:pk>.json",
        login_required(views.journey_json),
        name="service_journey",
    ),
    path("liveries.<int:version>.css", login_required(views.liveries_css)),
    path("rules", login_required(TemplateView.as_view(template_name="rules.html"))),
    path("map", login_required(TemplateView.as_view(template_name="map.html")), name="map"),
    path("maps", login_required(TemplateView.as_view(template_name="map.html"))),
    path("map/old", login_required(TemplateView.as_view(template_name="map_classic.html"))),
    path("siri/<uuid:uuid>", login_required(views.siri_post)),
    path("overland/<uuid:uuid>", login_required(views.overland)),
]
