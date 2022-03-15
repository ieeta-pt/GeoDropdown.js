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
import csv
import logging

import pysolr
from django.conf import settings

logger = logging.getLogger()
logging.basicConfig(level=logging.DEBUG)


class ServiceSolr(object):
    """
    Search service, that contains all the information about contries.
    It also has methods to load the initial data and to update them
    """

    CONNECTION_TIMEOUT_DEFAULT = 99000000

    def __init__(self):
        # Setup a Solr instance. The timeout is optional.
        logger.info("Initial Solr Service")

        self.solr = pysolr.Solr(
            f"http://{settings.SOLR_HOST}:{settings.SOLR_PORT}/solr/{settings.SOLR_CORE}/",
            timeout=self.CONNECTION_TIMEOUT_DEFAULT,
        )
        logger.info("Connected to Solr")

    def load_country_info(self, countryFile):
        logger.info("Loading country info")

        with open(countryFile, "rU") as ifile:
            reader = csv.reader(ifile, delimiter="\t")

            self.countryInfo = {row[16]: {'continent': row[8], 'name': row[4]} for row in reader}

    def load_initial_data(self, allCountriesFile):
        logger.info("Load initial data to Solr")

        with open(allCountriesFile) as csvfile:
            spamreader = csv.reader(csvfile, delimiter='\t', quotechar='|')
            list_docs_to_commit = []
            i = 0

            for row in spamreader:
                if not (row[1] == 'Earth' or row[7] == 'CONT' or row[7] == 'PCLI' or row[7] == 'ISLS' or row[7] == 'ADM1' or row[7] == 'ADM2' or row[7] == 'ADM3' or row[7] == 'ADM4'):
                    continue
                i = i + 1
                d = {'id': i, 'geonameId_t': row[0], 'name_t': row[1], 'asciiname_t': row[2],
                     'alternatenames_t': row[3], 'latitude_f': row[4], 'longitude_f': row[5], 'fclass_t': row[6],
                     'fcode_t': row[7], 'country_t': row[8], 'cc2_t': row[9], 'admin1_t': row[10], 'admin2_t': row[11],
                     'admin3_t': row[12],
                     'admin4_t': row[13], 'population_t': row[14], 'elevation_t': row[15], 'gtopo30_t': row[16],
                     'timezone_t': row[17]}

                if row[0] in self.countryInfo:
                    d['continent_t'] = self.countryInfo[row[0]]['continent']
                    d['name_t'] = self.countryInfo[row[0]]['name']

                list_docs_to_commit.append(d)
                if i % 60000 == 0:
                    self.solr.add(list_docs_to_commit)
                    list_docs_to_commit.clear()
                    print(i)

            self.solr.add(list_docs_to_commit)
            self.solr.optimize()

    def geonameId(self, geonameId, start=0, rows=100, fl='', sort='', facet="off"):
        """Fetch the result by id"""
        results = self.solr.search("geonameId_t:" + geonameId, **{
            'facet': facet,
            'rows': rows,
            'start': start,
            'fl': fl,
            'sort': sort
        })
        return results

    def search(self, query, start=0, rows=500, fl='', sort='', facet="off"):
        """
        Generic search
        """
        results = self.solr.search(query, **{
            'facet': facet,
            'rows': rows,
            'start': start,
            'fl': fl,
            'sort': sort
        })
        return results
