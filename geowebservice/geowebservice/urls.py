from django.conf.urls import patterns, url

urlpatterns = patterns(
    "",

    # get child locations by geonameid
    url(r'^geodatabase/(?P<geonameid>\d+)/$', 'geodatabase.views.detail'),

    # get coordinates by name and fcode
    url(r'^geodatabase/(?P<location>[a-zA-Z, ]+)/$', 'geodatabase.views.getCoordinates'),
)
