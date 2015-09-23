# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#     * Rearrange models' order
#     * Make sure each model has one field with primary_key=True
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin.py sqlcustom [appname]'
# into your database.

from django.db import models

class AuthUser(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=90, unique=True)
    first_name = models.CharField(max_length=90)
    last_name = models.CharField(max_length=90)
    email = models.CharField(max_length=225)
    password = models.CharField(max_length=384)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    is_superuser = models.IntegerField()
    last_login = models.DateTimeField()
    date_joined = models.DateTimeField()
    
    class Meta:
        db_table = u'auth_user'

class Geoname(models.Model):
    geonameid = models.IntegerField(primary_key=True)
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
    population = models.IntegerField(null=True, blank=True)
    elevation = models.IntegerField(null=True, blank=True)
    gtopo30 = models.IntegerField(null=True, blank=True)
    timezone = models.CharField(max_length=120, blank=True)
    moddate = models.DateField(null=True, blank=True)
    
    class Meta:
        db_table = u'geoname'
    
    def __unicode__(self):
        selfName = 'geonameid:'+str(self.geonameid)+' name:'+self.name+' fcode:'+self.fcode
        if self.admin1:
            selfName += ' adm1:'+self.admin1
        if self.admin2:
            selfName += ' adm2:'+self.admin2
        if self.admin3:
            selfName += ' adm3:'+self.admin3
        if self.admin4:
            selfName += ' adm4:'+self.admin4
        return selfName