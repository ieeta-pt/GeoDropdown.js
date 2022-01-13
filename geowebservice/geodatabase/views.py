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
import logging

from django.http import HttpResponseBadRequest, HttpResponse

from .services import ServiceSolr

logger = logging.getLogger()

logging.basicConfig(level=logging.DEBUG)


# TODO: a refactor on that method need to be done.
# The business logic should not leave here!


def detail(request, geonameid):
    """
    This method handles with all request for all hierarchies. Thus, depending on the id,
    it will analyse what type of location that it handles and then returns
    the proper locations according to the hierarchy.
    """

    # TODO: validate geonameid properly.
    if geonameid != "0":
        solr = ServiceSolr()
        results = solr.geonameId(geonameid)

        # Check it, if no results in the geonames database, it returns an error 
        if len(results) == 0:
            return HttpResponseBadRequest()

        # Fetch one, and only one document 
        # d variable corresponding now to the geoNameId that is passed as parameter    
        d = results.docs[0]

        # Fetch the data to variables, only to facilitate the access and to become the code easy to read. 
        fcode = d['fcode_t']
        name = d['name_t']

        try:
            country = d['country_t']
        except:
            pass

        try:
            admin1 = d['admin1_t']
        except:
            pass

        try:
            admin2 = d['admin2_t']
        except:
            pass

        try:
            admin3 = d['admin3_t']
        except:
            pass

        try:
            admin4 = d['admin4_t']
        except:
            pass
    else:
        name = "Mundus"
    response_data = []

    if name == 'Earth':
        response_object = solr.search("fcode_t:CONT")
        response_data = buildJson(response_object.docs, response_data)

    elif name == 'Mundus':
        solr = ServiceSolr()
        response_object = solr.search(
            "continent_t:EU OR continent_t:AF OR continent_t:OC OR continent_t:SA OR continent_t:NA OR continent_t:AS")
        response_data = buildJson(response_object.docs, response_data)

    elif fcode == 'CONT':
        if name == 'Europe':
            tmp = solr.search("continent_t:EU")
            response_data = buildJson(tmp.docs, response_data)

        elif name == 'Africa':
            tmp = solr.search("continent_t:AF")
            response_data = buildJson(tmp.docs, response_data)

        elif name == 'Oceania':
            tmp = solr.search("continent_t:OC")
            response_data = buildJson(tmp.docs, response_data)

        elif name == 'South America':
            tmp = solr.search("continent_t:SA")
            response_data = buildJson(tmp.docs, response_data)

        elif name == 'North America':
            tmp = solr.search("continent_t:NA")
            response_data = buildJson(tmp.docs, response_data)

        elif name == 'Asia':
            tmp = solr.search("continent_t:AS")
            response_data = buildJson(tmp.docs, response_data)

    elif fcode == 'PCLI':
        response_object = solr.search("country_t:" + country + " AND (fcode_t:ADM1 OR fcode_t:ISLS)")
        response_data = buildJson(response_object.docs, response_data)
    elif fcode == 'ADM1' or fcode == 'ISLS':
        response_object = solr.search("country_t:" + country + " AND admin1_t:" + admin1 + " AND fcode_t:ADM2")
        response_data = buildJson(response_object.docs, response_data)
    elif fcode == 'ADM2':
        response_object = solr.search(
            "country_t:" + country + " AND admin1_t:" + admin1 + " AND admin2_t:" + admin2 + " AND fcode_t:ADM3")
        response_data = buildJson(response_object.docs, response_data)
    elif fcode == 'ADM3':
        response_object = solr.search(
            "country_t:" + country + " AND admin1_t:" + admin1 + " AND admin2_t:" + admin2 + " AND admin3_t:" + admin3 + " AND fcode_t:ADM4")

        response_data = buildJson(response_object.docs, response_data)
    elif fcode == 'ADM4':
        response_object = solr.search(
            "country_t:" + country + " AND admin1_t:" + admin1 + " AND admin2_t:" + admin2 + " AND admin3_t:" + admin3 + " AND admin4_t:" + admin4 + " AND fcode_t:ADM5")

        response_data = buildJson(response_object.docs, response_data)

    return HttpResponse(json.dumps(response_data), content_type="application/json")


def buildJson(response_object, response_data):
    """ Builds the answer with multiples geonames entries"""
    for i in range(0, len(response_object) - 1):
        print(response_object[i])
        response_data = response_data + addEntry(response_object[i], response_data)
    return response_data


def addEntry(geoname, response_data):
    """
    Handles a GeoName entry
    """
    response = {}
    print(geoname)
    response['geonameid'] = int(geoname['geonameId_t'])
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


def getCoordinates(request, location):
    """
    Get coordinates by location name and fcode
    """
    if location == '' or location is None:
        return HttpResponse(json.dumps([]), content_type="application/json")

    location = location.strip().split(',')
    levels = ['PCLI', 'ADM1', 'ADM2', 'ADM3', 'ADM4', 'ADM5']
    fcode = levels[len(location) - 1]
    name = location[0]

    try:
        solr = ServiceSolr()
        response_object = solr.search("fcode_t:" + fcode + " AND name_t:" + name)
        if fcode == 'ADM1' and response_object.hits == 0:
            response_object = solr.search("fcode_t:ISLS AND name_t:" + name)
        response_object = response_object.docs[0]
        response_data = buildCoordinates(response_object, [])
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    except:
        return HttpResponse(json.dumps([]), content_type="application/json")


def buildCoordinates(response_object, response_data):
    """
    Build a list with latitude and longitude of the location
    """
    return [response_object['latitude_f'], response_object['longitude_f']]
