# -*- coding: utf-8 -*-
import logging

from django.core.management.base import BaseCommand

from geodatabase.services import ServiceSolr

logger = logging.getLogger()
logging.basicConfig(level=logging.DEBUG)


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def add_arguments(self, parser):
        parser.add_argument('countries', type=str)
        parser.add_argument('all', type=str)

    def handle(self, *args, **options):
        countries_names = options['countries']
        all_locations = options['all']

        s = ServiceSolr()
        s.load_country_info(countries_names)
        s.load_initial_data(all_locations)
