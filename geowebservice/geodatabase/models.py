# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#     * Rearrange models' order
#     * Make sure each model has one field with primary_key=True
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin.py sqlcustom [appname]'
# into your database.

from django.db import models



class Countryinfo(models.Model):
    iso_alpha2 = models.CharField(max_length=765, blank=True)
    iso_alpha3 = models.CharField(max_length=765, blank=True)
    iso_numeric = models.IntegerField(null=True, blank=True)
    fips_code = models.CharField(max_length=900, blank=True)
    name = models.CharField(max_length=6000, blank=True)
    capital = models.CharField(max_length=6000, blank=True)
    areainsqkm = models.FloatField(null=True, blank=True)
    population = models.IntegerField(null=True, blank=True)
    continent = models.CharField(max_length=765, blank=True)
    currency = models.CharField(max_length=765, blank=True)
    currencyName = models.CharField(max_length=765, db_column='currencyName', blank=True) 
    geonameId = models.IntegerField(primary_key=True,db_column='geonameId', blank=True) 
    class Meta:
        db_table = u'countryInfo'

    def __unicode__(self):
        return str(self.geonameId)+','+self.name+','+self.continent

class Geoname(models.Model):
    geonameid = models.IntegerField(primary_key=True,)
    name = models.CharField(max_length=600, blank=True)
    asciiname = models.CharField(max_length=600, blank=True)
    alternatenames = models.CharField(max_length=12000, blank=True)
    latitude = models.DecimalField(null=True, max_digits=12, decimal_places=7, blank=True)
    longitude = models.DecimalField(null=True, max_digits=12, decimal_places=7, blank=True)
    fclass = models.CharField(max_length=3, blank=True)
    fcode = models.CharField(max_length=30, blank=True)
    country = models.CharField(max_length=6, blank=True)
    cc2 = models.CharField(max_length=180, blank=True)
    admin1 = models.CharField(max_length=60, blank=True)
    admin2 = models.CharField(max_length=240, blank=True)
    admin3 = models.CharField(max_length=60, blank=True)
    admin4 = models.CharField(max_length=60, blank=True)
    
    class Meta:
        db_table = u'geoname'
    
    def __unicode__(self):
        selfName = str(self.geonameid)+'\t'+self.asciiname+'\t'+self.fcode
        if self.country:
            selfName += '\t'+str(self.country)
        if self.admin1:
            selfName += '\t'+str(self.admin1)
        if self.admin2:
            selfName += '\t'+str(self.admin2)
        if self.admin3:
            selfName += '\t'+str(self.admin3)
        if self.admin4:
            selfName += '\t'+str(self.admin4)
        return selfName