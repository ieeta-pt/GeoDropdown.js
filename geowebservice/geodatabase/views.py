# -*- coding: utf-8 -*-
# Copyright (C) 2015 Universidade de Aveiro, DETI/IEETA, Bioinformatics Group - http://bioinformatics.ua.pt/
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
# Create your views here.
import json
from django.http import HttpResponse
from geodatabase.models import Geoname,Countryinfo
from django.http import HttpResponseNotAllowed, HttpResponseBadRequest, HttpResponseNotFound, HttpResponse, HttpResponseForbidden

from geodatabase.services import * 

# TODO: a refactor on that method need to be done. 
# The business logic should not leave here!

"""This method handles with all request for all hierarchies. Thus, depending on the id,
it will analyse what type of location that it handles and then returns 
the proper locations according to the hierarchy.
"""
def detail(request, geonameid):
    
    # TODO: validate geonameid properly.
    
    solr = ServiceSolr()
    results = solr.geonameId(geonameid)
    
    # Check it, if no results in the geonames database, it returns an error 
    if (len(results)==0):
        return HttpResponseBadRequest()
        
    # Fetch one, and only one document 
    # d variable corresponding now to the geoNameId that is passed as parameter    
    d = results.docs[0]
    
    # Fetch the data to variables, only to facilitate the access and to become the code easy to read. 
    fcode = d['fcode_t']
    name = d['name_t']
    
    response_data = []

    if name == 'Earth':
        response_object = solr.search("fcode_t:CONT")
        response_data = buildJson(response_object.docs,response_data)

    elif fcode == 'CONT':
        if name == 'Europe':
            tmp = solr.search("continent_t:EU")
            response_data = buildJson(tmp.docs,response_data)
        
        elif name == 'Africa':
            
            tmp = solr.search("continent_t:AF")
            response_data = buildJson(tmp.docs,response_data)
        
        elif name == 'Oceania':
            tmp = solr.search("continent_t:OC")
            response_data = buildJson(tmp.docs,response_data)
        
        elif name == 'South America':
            tmp = solr.search("continent_t:SA")
            response_data = buildJson(tmp.docs,response_data)
        
        elif name == 'North America':
            tmp = solr.search("continent_t:NA")
            response_data = buildJson(tmp.docs,response_data)
        
        elif name == 'Asia':
            tmp = solr.search("continent_t:AS")
            response_data = buildJson(tmp.docs,response_data)

    elif fcode == 'PCLI':
        #response_object = Geoname.objects.filter(country=location[0].country,fcode='ADM1')
        response_object = solr.search("contry_t:"+country+" AND fcode_t:ADM1")
        response_data = buildJson(response_object,response_data)
    elif fcode == 'ADM1':
        response_object = solr.search("country_t:"+country+" AND admin1_t:"+admin1+" AND fcode_t:ADM2")
        #response_object = Geoname.objects.filter(country=location[0].country,admin1=location[0].admin1,fcode='ADM2')
        response_data=buildJson(response_object,response_data)
    elif fcode == 'ADM2':
        #response_object = Geoname.objects.filter(country=location[0].country,admin1=location[0].admin1,admin2=location[0].admin2,fcode='ADM3')
        response_object = solr.search("country_t:"+country+" AND admin1_t:"+admin1+" AND admin2_t:"+admin2+" AND fcode_t:ADM2")
        response_data = buildJson(response_object,response_data)
    elif fcode == 'ADM3':
        #response_object = Geoname.objects.filter(country=location[0].country,admin1=location[0].admin1,admin2=location[0].admin2,admin3=location[0].admin3,fcode='ADM4')
        response_object = solr.search("country_t:"+country+" AND admin1_t:"+admin1+" AND admin2_t:"+admin2+" AND admin3_t:"+admin3+" AND fcode_t:ADM2")
        
        response_data = buildJson(response_object,response_data)
    elif fcode == 'ADM4':
        #response_object = Geoname.objects.filter(country=location[0].country,admin1=location[0].admin1,admin2=location[0].admin2,admin3=location[0].admin3,admin4=location[0].admin4,fcode='ADM5')
        response_object = solr.search("country_t:"+country+" AND admin1_t:"+admin1+" AND admin2_t:"+admin2+" AND admin3_t:"+admin3+" AND admin4_t:"+admin4+" AND fcode_t:ADM2")
        
        response_data = buildJson(response_object,response_data)

    return HttpResponse(json.dumps(response_data),content_type="application/json")


""" Builds the answer with multiples geonames entries"""
def buildJson(response_object,response_data):
    for i in range(0,len(response_object)-1):
        response_data = response_data+addEntry(response_object[i],response_data)
    return response_data


"""
Handles a GeoName entry
"""
def addEntry(geoname,response_data):    
    response = {}    
    result = str(geoname).split('\t')
    response['geonameid'] = int(result[0])
    response['name'] = result[1]
    response['fcode'] = result[2]
    if len(result)>3:
        response['country'] = result[3]
    if len(result)>4 and result[4].isdigit():
        response['adm1'] = int(result[4])
    if len(result)>5 and result[5].isdigit():
        response['adm2'] = int(result[5])
    if len(result)>6 and result[6].isdigit():
        response['adm3'] = int(result[6])
    if len(result)>7 and result[7].isdigit():
        response['adm4'] = int(result[7])
    return [response]