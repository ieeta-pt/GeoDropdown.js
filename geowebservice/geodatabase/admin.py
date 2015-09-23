from geodatabase.models import Geoname
from django.contrib import admin

class GeonameAdmin(admin.ModelAdmin):
    list_display = ('geonameid', 'asciiname', 'fcode', 'country', 'admin1', 'admin2', 'admin3', 'admin4')

admin.site.register(Geoname,GeonameAdmin)
