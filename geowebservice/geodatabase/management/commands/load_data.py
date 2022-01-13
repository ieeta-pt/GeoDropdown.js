# -*- coding: utf-8 -*-
import logging

from django.core.management.base import BaseCommand

from geodatabase.services import ServiceSolr

logger = logging.getLogger()
logging.basicConfig(level=logging.DEBUG)


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def add_arguments(self, parser):
        parser.add_argument('all', nargs='+', type=str)
        parser.add_argument('countries', nargs='+', type=str)

    def handle(self, *args, **options):
        all_locations = options['all'][0]
        countries_names = options['countries'][0]

        s = ServiceSolr()
        s.load_country_info(countries_names)
        s.load_initial_data(all_locations)
