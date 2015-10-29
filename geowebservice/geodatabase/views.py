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

def detail(request, geonameid):
    
    solr = ServiceSolr()
    results = solr.search(geonameid)
    if (len(results)==0):
        return HttpResponseBadRequest()
    d = results.docs[0]
	
	fcode = d['fcode_t']

	response_data = []
    name = d['name_t']    
	if name == 'Earth':
		response_object = Geoname.objects.filter(fcode='CONT')
		response_data = buildJson(response_object,response_data)

	elif fcode == 'CONT':
		if name == 'Europe':
			tmp = Countryinfo.objects.filter(continent='EU')
			response_object = []
			for i in range(0,len(tmp)-1):
				geonameId = int(str(tmp[i]).split(',')[0])
				response_object = response_object + [Geoname.objects.get(geonameid = geonameId)]
			response_data = buildJson(response_object,response_data)
		
		elif name == 'Africa':
			tmp = Countryinfo.objects.filter(continent='AF')
			response_object = []
			for i in range(0,len(tmp)-1):
				geonameId = int(str(tmp[i]).split(',')[0])
				response_object = response_object + [Geoname.objects.get(geonameid = geonameId)]
			response_data = buildJson(response_object,response_data)
		
		elif name == 'Oceania':
			tmp = Countryinfo.objects.filter(continent='OC')
			response_object = []
			for i in range(0,len(tmp)-1):
				geonameId = int(str(tmp[i]).split(',')[0])
				response_object = response_object + [Geoname.objects.get(geonameid = geonameId)]
			response_data = buildJson(response_object,response_data)
		
		elif name == 'South America':
			tmp = Countryinfo.objects.filter(continent='SA')
			response_object = []
			for i in range(0,len(tmp)-1):
				geonameId = int(str(tmp[i]).split(',')[0])
				response_object = response_object + [Geoname.objects.get(geonameid = geonameId)]
			response_data = buildJson(response_object,response_data)
		
		elif name == 'North America':
			tmp = Countryinfo.objects.filter(continent='NA')
			response_object = []
			for i in range(0,len(tmp)-1):
				geonameId = int(str(tmp[i]).split(',')[0])
				response_object = response_object + [Geoname.objects.get(geonameid = geonameId)]
			response_data = buildJson(response_object,response_data)
		
		elif name == 'Asia':
			tmp = Countryinfo.objects.filter(continent='AS')
			response_object = []

			for i in range(0,len(tmp)-1):
				geonameId = int(str(tmp[i]).split(',')[0])
				print geonameId
				try:
					response_object = response_object + [Geoname.objects.get(geonameid = geonameId)]
				except:
					print "fodeu -se :D  "
					print geonameId
			response_data = buildJson(response_object,response_data)

	elif fcode == 'PCLI':
		response_object = Geoname.objects.filter(country=location[0].country,fcode='ADM1')
		response_data = buildJson(response_object,response_data)
	elif fcode == 'ADM1':
		response_object = Geoname.objects.filter(country=location[0].country,admin1=location[0].admin1,fcode='ADM2')
		response_data=buildJson(response_object,response_data)
	elif fcode == 'ADM2':
		response_object = Geoname.objects.filter(country=location[0].country,admin1=location[0].admin1,admin2=location[0].admin2,fcode='ADM3')
		response_data = buildJson(response_object,response_data)
	elif fcode == 'ADM3':
		response_object = Geoname.objects.filter(country=location[0].country,admin1=location[0].admin1,admin2=location[0].admin2,admin3=location[0].admin3,fcode='ADM4')
		response_data = buildJson(response_object,response_data)
	elif fcode == 'ADM4':
		response_object = Geoname.objects.filter(country=location[0].country,admin1=location[0].admin1,admin2=location[0].admin2,admin3=location[0].admin3,admin4=location[0].admin4,fcode='ADM5')
		response_data = buildJson(response_object,response_data)

	return HttpResponse(json.dumps(response_data),content_type="application/json")

def buildJson(response_object,response_data):
	for i in range(0,len(response_object)-1):
		response_data = response_data+addEntry(response_object[i],response_data)
	return response_data

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