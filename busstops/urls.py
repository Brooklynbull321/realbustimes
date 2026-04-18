from django.apps import apps
from django.contrib.sitemaps.views import index, sitemap
from django.contrib.auth.decorators import login_required
from django.urls import include, path, re_path
from django.views.decorators.cache import cache_control
from django.views.generic.base import RedirectView, TemplateView

from buses.utils import cdn_cache_control
from bustimes.urls import urlpatterns as bustimes_views
from disruptions.urls import urlpatterns as disruptions_urls
from fares import mytrip
from fares import views as fares_views
from fares.urls import urlpatterns as fares_urls
from vehicles.urls import urlpatterns as vehicles_urls
from vosa.urls import urlpatterns as vosa_urls

from . import views

sitemaps = {
    "operators": views.OperatorSitemap,
    "services": views.ServiceSitemap,
}

urlpatterns = [
    path("",login_required(views.index),name="index"),
    path("version", login_required(views.version)),
    path("contact", login_required(views.contact), name="contact"),
    path(
        "cookies",
        login_required(cdn_cache_control(1800)(TemplateView.as_view(template_name="cookies.html"))),
    ),
    path(
        "privacy",
        login_required(cdn_cache_control(1800)(TemplateView.as_view(template_name="cookies.html"))),
    ),
    path("503", login_required(TemplateView.as_view(template_name="503.html"))),
    path("data", login_required(TemplateView.as_view(template_name="data.html"))),
    path("status", login_required(views.status)),
    path("timetable-source-stats.json", login_required(views.timetable_source_stats)),
    path("stats.json", login_required(views.stats)),
    path("ads.txt", views.ads_txt),
    path("robots.txt", views.robots_txt),
    path("stops.json", views.stops_json),
    path(
        "regions/<pk>",
        login_required(cdn_cache_control(1800)(views.RegionDetailView.as_view())),
        name="region_detail",
    ),
    re_path(
        r"^(admin-)?areas/(?P<pk>\d+)",
        login_required(cdn_cache_control(1800)(views.AdminAreaDetailView.as_view())),
        name="adminarea_detail",
    ),
    path(
        "districts/<int:pk>",
        login_required(views.DistrictDetailView.as_view()),
        name="district_detail",
    ),
    re_path(
        r"^localities/(?P<pk>[ENen][Ss]?[0-9]+)",
        login_required(cdn_cache_control(1800)(views.LocalityDetailView.as_view())),
    ),
    path(
        "localities/<slug>",
        login_required(cdn_cache_control(1800)(views.LocalityDetailView.as_view())),
        name="locality_detail",
    ),
    path(
        "stops/<pk>",
        login_required(cdn_cache_control(30)(views.StopPointDetailView.as_view())),
        name="stoppoint_detail",
    ),
    path("stations/<pk>", login_required(views.StopAreaDetailView.as_view()), name="stoparea_detail"),
    path(
        "stops/<slug:atco_code>/departures",
        login_required(views.stop_departures),
    ),
    re_path(r"^operators/(?P<pk>[A-Z]+)$", login_required(views.OperatorDetailView.as_view())),
    path(
        "operators/<slug>",
        login_required(views.OperatorDetailView.as_view()),
        name="operator_detail",
    ),
    path("operators/<slug>/tickets", login_required(mytrip.operator_tickets), name="operator_tickets"),
    path("operators/<slug>/tickets/<uuid:id>", login_required(mytrip.operator_ticket)),
    path(
        "services/<int:service_id>.json",
        login_required(views.service_map_data),
        name="service_map_data",
    ),
    path(
        "services/<int:service_id>/timetable",
        login_required(views.service_timetable),
        name="service_timetable",
    ),
    path(
        "services/<int:service_id>/timetable.csv",
        login_required(views.service_timetable_csv),
    ),
    path(
        "services/<slug>",
        login_required(views.ServiceDetailView.as_view()),
        name="service_detail",
    ),
    path("services/<slug>/fares", login_required(fares_views.service_fares)),
    path("sitemap.xml", cache_control(max_age=3600)(index), {"sitemaps": sitemaps}),
    path(
        "sitemap-<section>.xml",
        cache_control(max_age=3600)(sitemap),
        {"sitemaps": sitemaps},
        name="django.contrib.sitemaps.views.sitemap",
    ),
    path("search", login_required(views.search), name="search"),
    path("journey", login_required(views.journey)),
    path(
        ".well-known/change-password",
        RedirectView.as_view(url="/accounts/password_change/"),
    ),
    path("fares/", include(fares_urls)),
]

urlpatterns += bustimes_views + disruptions_urls + vehicles_urls + vosa_urls


if apps.is_installed("debug_toolbar"):
    import debug_toolbar

    urlpatterns += [
        path("__debug__", include(debug_toolbar.urls)),
    ]
