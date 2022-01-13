from django.urls import re_path
from geodatabase import views

urlpatterns = [
    # get child locations by geonameid
    re_path(r"^geodatabase/(?P<geonameid>\d+)/$", views.detail),

    # get coordinates by name and fcode
    re_path(r"^geodatabase/(?P<location>[a-zA-Z, ]+)/$", views.getCoordinates),
]
