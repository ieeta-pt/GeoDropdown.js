from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', '{{ project_name }}.views.home', name='home'),
    # url(r'^{{ project_name }}/', include('{{ project_name }}.foo.urls')),
    # url(r'^geodatabase/$', 'geodatabase.views.index'),

    # get child locations by geonameid
    url(r'^geodatabase/(?P<geonameid>\d+)/$', 'geodatabase.views.detail'),

    # get coordinates by name and fcode
    url(r'^geodatabase/(?P<location>[a-zA-Z, ]+)/$', 'geodatabase.views.getCoordinates'),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)