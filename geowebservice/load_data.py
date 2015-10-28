#!/usr/bin/env python
# -*- coding: utf-8 -*-


from geodatabase.models import Geoname
from django.db import transaction

import csv

i = 0
def make_unicode(input):
    if type(input) != unicode:
        input =  input.decode('utf-8')
        return input
    else:
        return input
with open('/Users/bastiao/Downloads/allCountries.txt') as csvfile:
	spamreader = csv.reader(csvfile, delimiter='\t', quotechar='|')
	l = []
	
	for row in spamreader:
		#print row
		#print row[0]
		i = i + 1
		
			
		g = Geoname()
		try:
			g.geonameid = int(row[0])
		except: 
			pass 
		try:
			g.name = make_unicode(row[1])
		except: 
			pass 
		try:
			
			g.asciiname = make_unicode(row[2])
			#g.alternatenames = make_unicode(row[3])
		except:
			pass 
		
		g.latitude = float(row[4])
		g.longitude = float(row[5])
		g.fclass = row[6]
		g.country = row[7]
		g.cc2 = row[8]
		g.admin1 = row[9]
		g.admin2 = row[10]
		g.admin3 = row[11]
		g.admin4 = row[12]
		try:
			g.population = int(row[13])
			g.elevation = int(row[14])
			g.gtopo30 = int(row[15])
			g.timezone = row[16]
		except: 
			pass 
		#g.moddate = Date(row[17])
		if (i%6000==0):
			print i
			Geoname.objects.bulk_create(l)
			l = []
		else:
			l.append(g)
	Geoname.objects.bulk_create(l)
		
    