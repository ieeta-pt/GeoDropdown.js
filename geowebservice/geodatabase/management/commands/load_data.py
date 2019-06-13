# -*- coding: utf-8 -*-
from __future__ import print_function
import pysolr

from django.core.management.base import BaseCommand, CommandError

import ast
from django.conf import settings

from geodatabase.services import ServiceSolr

import logging
logger = logging.getLogger()
logging.basicConfig(level=logging.DEBUG)

class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def add_arguments(self, parser):
        parser.add_argument('all', nargs='+', type=str)
        parser.add_argument('countries', nargs='+', type=str)

    def handle(self, *args, **options):
        all_locations = ''
        countries_names = ''
        try:
            all_locations = options['all'][0]
            countries_names = options['countries'][0]
        except:
            all_locations = '/home/leonardo/Área de Trabalho/geonames_files/allCountries.txt'
            countries_names = '/home/leonardo/Área de Trabalho/geonames_files/country.csv'
        
        s = ServiceSolr()
        s.load_contry_info(countries_names)
        s.load_initial_data(all_locations)