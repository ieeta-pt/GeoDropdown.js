from geodatabase.models import Geoname,Countryinfo
from django.contrib import admin

class GeonameAdmin(admin.ModelAdmin):
    list_display = ('geonameid', 'asciiname', 'fcode', 'country', 'admin1', 'admin2', 'admin3', 'admin4')

class CountryinfoAdmin(admin.ModelAdmin):
    list_display = ('name', 'continent', 'geonameId')

admin.site.register(Geoname,GeonameAdmin)
admin.site.register(Countryinfo,CountryinfoAdmin)
