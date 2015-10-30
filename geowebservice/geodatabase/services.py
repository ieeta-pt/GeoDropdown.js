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
"""A module to index 
.. moduleauthor:: Luís A. Bastião Silva <bastiao@ua.pt>
"""

from __future__ import print_function
import pysolr


import ast
from django.conf import settings

import csv
import random

import logging

from utils import * 
logger = logging.getLogger()

logging.basicConfig(level=logging.DEBUG)


"""convert input to unicode"""        
def make_unicode(input):
    if type(input) != unicode:
        input =  input.decode('utf-8')
        return input
    else:
        return input

"""
Search service, that contains all the information about contries.
It also has methods to load the initial data and to update them 
"""
class ServiceSolr(object):
    CONNECTION_TIMEOUT_DEFAULT = 10000000
    
    def __fetch_initial_settings(self):
        try:
            self.SOLR_HOST = settings.SOLR_HOST
            self.SOLR_PORT = settings.SOLR_PORT
            self.SOLR_PATH = settings.SOLR_PATH
        except:
            # TODO:
            # Maybe should load default settings here? 
            logger.error("It is not running in Django enviroment")
            raise 
    def __init__(self, host="hs", port="8983", path="/solr", timeout=CONNECTION_TIMEOUT_DEFAULT, core="geonames"):
        # Setup a Solr instance. The timeout is optional.
        logger.info("Initial Solr Service")
        try:
            self.__fetch_initial_settings()
        except:
            self.SOLR_HOST = host
            self.SOLR_PORT = port
            self.SOLR_PATH = path
            
        self.solr = pysolr.Solr('http://' +self.SOLR_HOST+ ':'+ self.SOLR_PORT+self.SOLR_PATH+'/'+core, timeout=timeout)
        logger.info("Connected to Solr")   
        
    def load_contry_info(self, countryFile="country.csv"):
        self.contryInfo = {}
        
        import csv
        ifile = open(countryFile, "rU")
        #reader = csv.reader(ifile, delimiter='\t')
        reader = UnicodeReader(ifile, delimiter='\t', )
        for row in reader:
            
            #a.name = row[4]
            # a.continent = row[8]
            # a.geonameId = row[11]
            self.contryInfo[row[11]] = {'continent': row[8],'name':  row[4]} 
            
            
    
    def load_initial_data(self, allCountriesFile):
        logger.info("Load initial data to Solr")
        
        with open(allCountriesFile) as csvfile:
            #spamreader = csv.reader(csvfile, delimiter='\t', quotechar='|')
            spamreader = UnicodeReader(csvfile, delimiter='\t', quotechar='|')
            list_docs_to_commit = []
            i = 0 
            for row in spamreader:
                if not (row[1]=='Earth' or row[7] == 'CONT' or row[7] == 'PCLI' or row[7] == 'ADM1' or  row[7] == 'ADM2' or  row[7] == 'ADM3' or  row[7] == 'ADM4'): 
                    continue
                i = i + 1
                d = {}
                
                d['geonameId_t'] = row[0]
                print(row[0])
                d['name_t'] = row[1]
                d['asciiname_t'] = row[2]
                d['alternatenames_t'] = row[3]
                d['latitude_f'] = row[4]
                d['longitude_f'] = row[5]
                d['fclass_t'] = row[6]
                d['fcode_t'] = row[7]
                try:
                    d['country_t'] = row[8]
                except:
                    pass
                d['cc2_t'] = row[9]
                d['admin1_t'] = row[10]
                d['admin2_t'] = row[11]
                d['admin3_t'] = row[12]
                d['admin4_t'] = row[13]
                d['population_t'] = row[14]
                d['elevation_t'] = row[15]
                d['gtopo30_t'] = row[16]
                d['timezone_t'] = row[17]
                
                if row[0] in self.contryInfo:
                    d['continent_t'] = self.contryInfo[row[0]]['continent']
                    d['name_t'] = self.contryInfo[row[0]]['name']
                    
                #print(d)
                d = dict(d.items())
                list_docs_to_commit.append(d)
                if (i%60000==0):
                    xml_answer = self.solr.add(list_docs_to_commit)
                    list_docs_to_commit = []
                    print(i)    
                    
            xml_answer = self.solr.add(list_docs_to_commit)
            list_docs_to_commit = []
            self.solr.optimize()
            
    """Fetch the result by id"""
    def geonameId(self, geonameId, start=0, rows=100, fl='', sort='', facet="off"):
        print(self.solr)
        results = self.solr.search("geonameId_t:"+geonameId,**{
            'facet': facet,
            'rows': rows,
            'start': start,
            'fl': fl,
            'sort': sort
        })
        return results
   
    
    """Generic search
    """            
    def search(self, query, start=0, rows=100, fl='', sort='', facet="off"):
        results = self.solr.search(query,**{
            'facet': facet,
            'rows': rows,
            'start': start,
            'fl': fl,
            'sort': sort
        })
        return results
    
    
def main():
    s = ServiceSolr()
    allCountriesFile = '/home/sysadmin/Downloads/allCountries.txt'
    allCountriesFile = '/Users/bastiao/Downloads/allCountries.txt'
    countryFile = '/home/sysadmin/GeoDropdown.js/geowebservice/country.csv'
    countryFile = '/Users/bastiao/GeoDropdown.js/geowebservice/country.csv'
    print(allCountriesFile)
    s.load_contry_info(countryFile)
    s.load_initial_data(allCountriesFile)
    
    #results = s.search("3039162")
    #d = results.docs[0]
    #print(d)
if __name__ == "__main__":
    main()