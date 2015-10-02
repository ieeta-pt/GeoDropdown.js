# Create your views here.
import json
from django.http import HttpResponse
from geodatabase.models import Geoname,Countryinfo

def detail(request, geonameid):
	location = Geoname.objects.filter(geonameid=geonameid)
	fcode = location[0].fcode

	response_data = []
	if fcode == 'CONT':
		if location[0].name == 'Europe':
			tmp = Countryinfo.objects.filter(continent='EU')
			response_object = []
			for i in range(0,len(tmp)-1):
				geonameId = int(str(tmp[i]).split(',')[0])
				response_object = response_object + [Geoname.objects.get(geonameid = geonameId)]
			response_data = buildJson(response_object,response_data)
		
		elif location[0].name == 'AFrica':
			tmp = Countryinfo.objects.filter(continent='AF')
			response_object = []
			for i in range(0,len(tmp)-1):
				geonameId = int(str(tmp[i]).split(',')[0])
				response_object = response_object + [Geoname.objects.get(geonameid = geonameId)]
			response_data = buildJson(response_object,response_data)
		
		elif location[0].name == 'Oceania':
			tmp = Countryinfo.objects.filter(continent='OC')
			response_object = []
			for i in range(0,len(tmp)-1):
				geonameId = int(str(tmp[i]).split(',')[0])
				response_object = response_object + [Geoname.objects.get(geonameid = geonameId)]
			response_data = buildJson(response_object,response_data)
		
		elif location[0].name == 'South America':
			tmp = Countryinfo.objects.filter(continent='SA')
			response_object = []
			for i in range(0,len(tmp)-1):
				geonameId = int(str(tmp[i]).split(',')[0])
				response_object = response_object + [Geoname.objects.get(geonameid = geonameId)]
			response_data = buildJson(response_object,response_data)
		
		elif location[0].name == 'North America':
			tmp = Countryinfo.objects.filter(continent='NA')
			response_object = []
			for i in range(0,len(tmp)-1):
				geonameId = int(str(tmp[i]).split(',')[0])
				response_object = response_object + [Geoname.objects.get(geonameid = geonameId)]
			response_data = buildJson(response_object,response_data)
		
		elif location[0].name == 'Asia':
			tmp = Countryinfo.objects.filter(continent='AS')
			response_object = []
			for i in range(0,len(tmp)-1):
				geonameId = int(str(tmp[i]).split(',')[0])
				response_object = response_object + [Geoname.objects.get(geonameid = geonameId)]
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
	result = str(geoname).split(',')
	response['geonameid'] = int(result[0])
	response['name'] = result[1]
	response['fcode'] = result[2]
	response['adm1'] = int(result[3])
	if 'adm2' in response:
		response['adm2'] = int(result[4])
	if 'adm3' in response:
		response['adm3'] = int(result[5])
	if 'adm4' in response:
		response['adm4'] = int(result[6])
	return [response]