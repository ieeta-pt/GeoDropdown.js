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

import logging
import ast
from django.conf import settings

import csv
import random
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
    CONNECTION_TIMEOUT_DEFAULT = 10
    
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
    def __init__(self, host="127.0.0.1", port="8983", path="/solr", timeout=CONNECTION_TIMEOUT_DEFAULT, core='collection1'):
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
    def load_initial_data(self, allCountriesFile):
        logger.info("Load initial data to Solr")
        
        with open(allCountriesFile) as csvfile:
            spamreader = csv.reader(csvfile, delimiter='\t', quotechar='|')
            list_docs_to_commit = []
            i = 0 
            for row in spamreader:
                i = i + 1
                
                d = {}
                d['geonameId_t'] = row[0]
                d['name_t'] = row[1]
                d['asciiname_t'] = row[2]
                d['alternatenames_t'] = row[3]
                d['latitude_f'] = row[4]
                d['longitude_f'] = row[5]
                d['fclass_t'] = row[6]
                d['country_t'] = row[7]
                d['cc2_t'] = row[8]
                d['admin1_t'] = row[9]
                d['admin2_t'] = row[10]
                d['admin3_t'] = row[11]
                d['admin4_t'] = row[12]
                d['population_t'] = row[13]
                d['elevation_t'] = row[14]
                d['gtopo30_t'] = row[15]
                d['timezone_t'] = row[16]
                #print(d)
                d = dict(d.items())
                list_docs_to_commit.append(d)
                if (i%6000==0):
                    xml_answer = self.solr.add(list_docs_to_commit)
                    list_docs_to_commit = []
                    print(i)    
                    
            xml_answer = self.solr.add([list_docs_to_commit])
            list_docs_to_commit = []
            self.solr.optimize()
                
    def search(self):
        pass
            
    
def main():
    
    s = ServiceSolr()
    allCountriesFile = '/home/sysadmin/Downloads/allCountries.txt'
    print(allCountriesFile)
    s.load_initial_data(allCountriesFile)
    
main()