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


import logging
logger = logging.getLogger()

logging.basicConfig(level=logging.DEBUG)

# TODO: a refactor on that method need to be done. 
# The business logic should not leave here!

"""This method handles with all request for all hierarchies. Thus, depending on the id,
it will analyse what type of location that it handles and then returns 
the proper locations according to the hierarchy.
"""
def detail(request, geonameid):
    
    # TODO: validate geonameid properly.
    if geonameid!="0":
        solr = ServiceSolr()
        results = solr.geonameId(geonameid)
            
        # Check it, if no results in the geonames database, it returns an error 
        if (len(results)==0):
            return HttpResponseBadRequest()
                
        # Fetch one, and only one document 
        # d variable corresponding now to the geoNameId that is passed as parameter    
        d = results.docs[0]
        
        # Fetch the data to variables, only to facilitate the access and to become the code easy to read. 
        fcode = d['fcode_t'][0]
        name = d['name_t'][0]
        
        try:
            country = d['country_t'][0]
        except:
            pass
        
        try:
            admin1 = d['admin1_t'][0]
        except:
            pass
        
        try:
            admin2 = d['admin2_t'][0]
        except:
            pass
        
        try:
            admin3 = d['admin3_t'][0]
        except:
            pass
        
        try:
            admin4 = d['admin4_t'][0]
        except:
            pass

    name = "Mundus"
    response_data = []

    if name == 'Earth':
        response_object = solr.search("fcode_t:CONT")
        response_data = buildJson(response_object.docs,response_data)

    else if name == 'Mundus':
        response_object = solr.search("fcode_t:PCLI")
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
        response_object = solr.search("country_t:"+country+" AND fcode_t:ADM1")
        response_data = buildJson(response_object.docs,response_data)
    elif fcode == 'ADM1':
        response_object = solr.search("country_t:"+country+" AND admin1_t:"+admin1+" AND fcode_t:ADM2")
        #response_object = Geoname.objects.filter(country=location[0].country,admin1=location[0].admin1,fcode='ADM2')
        response_data=buildJson(response_object.docs,response_data)
    elif fcode == 'ADM2':
        #response_object = Geoname.objects.filter(country=location[0].country,admin1=location[0].admin1,admin2=location[0].admin2,fcode='ADM3')
        response_object = solr.search("country_t:"+country+" AND admin1_t:"+admin1+" AND admin2_t:"+admin2+" AND fcode_t:ADM2")
        response_data = buildJson(response_object.docs,response_data)
    elif fcode == 'ADM3':
        #response_object = Geoname.objects.filter(country=location[0].country,admin1=location[0].admin1,admin2=location[0].admin2,admin3=location[0].admin3,fcode='ADM4')
        response_object = solr.search("country_t:"+country+" AND admin1_t:"+admin1+" AND admin2_t:"+admin2+" AND admin3_t:"+admin3+" AND fcode_t:ADM2")
        
        response_data = buildJson(response_object.docs,response_data)
    elif fcode == 'ADM4':
        #response_object = Geoname.objects.filter(country=location[0].country,admin1=location[0].admin1,admin2=location[0].admin2,admin3=location[0].admin3,admin4=location[0].admin4,fcode='ADM5')
        response_object = solr.search("country_t:"+country+" AND admin1_t:"+admin1+" AND admin2_t:"+admin2+" AND admin3_t:"+admin3+" AND admin4_t:"+admin4+" AND fcode_t:ADM2")
        
        response_data = buildJson(response_object.docs,response_data)

    return HttpResponse(json.dumps(response_data),content_type="application/json")


""" Builds the answer with multiples geonames entries"""
def buildJson(response_object,response_data):
    for i in range(0,len(response_object)-1):
        print(response_object[i])
        response_data = response_data+addEntry(response_object[i],response_data)
    return response_data


"""
Handles a GeoName entry
"""
def addEntry(geoname,response_data):    
    response = {}    
    print(geoname)
    response['geonameid'] = int(geoname['geonameId_t'][0])
    response['name'] = geoname['name_t']
    response['fcode'] = geoname['fcode_t']
    try:
        response['country'] = geoname['country_t']
        response['adm1'] = geoname['admin1_t']
        response['adm2'] = geoname['admin2_t']
        response['adm3'] = geoname['admin2_t']
        response['adm4'] = geoname['admin3_t']
    except:
        pass
    
    return [response]