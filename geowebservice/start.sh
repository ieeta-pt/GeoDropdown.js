#!/bin/sh

PREVIOUS_PWD=$(pwd)
cd $(dirname "$0")

docker-compose up -d solr

until docker-compose exec -T solr sh -c "solr status" | grep running ; do
  sleep 2
done

(
    set -e

    docker-compose exec -T solr sh -c "solr create_core -c geonames -d basic_configs"

    docker-compose up -d geodropdownservice

    docker-compose exec -T geodropdownservice sh -c """
    set -x
    wget -P /tmp http://download.geonames.org/export/dump/allCountries.zip
    unzip /tmp/allCountries.zip -d /tmp
    python manage.py load_data country.csv /tmp/allCountries.txt
    rm /tmp/allCountries.*
    """
)

cd $PREVIOUS_PWD
