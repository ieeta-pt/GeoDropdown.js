#!/bin/sh

PREVIOUS_PWD=$(pwd)
cd $(dirname "$0")

docker-compose up -d solr

until docker-compose exec -T solr sh -c "solr status" | grep running ; do
  sleep 2
done

(
    set -e

    docker-compose exec -T solr sh -c """
    solr create_core -c geonames -d _default
    solr config -c geonames -p 8983 -action set-user-property -property update.autoCreateFields -value false
    """

    docker-compose up -d geodropdownservice

    docker-compose exec -T geodropdownservice sh -c """
    set -x

    wget -nv -P /tmp http://download.geonames.org/export/dump/allCountries.zip
    unzip /tmp/allCountries.zip -d /tmp

    wget -nv -P /tmp http://download.geonames.org/export/dump/countryInfo.txt
    sed -i "/^#/d" /tmp/countryInfo.txt

    python manage.py load_data /tmp/countryInfo.txt /tmp/allCountries.txt
    rm -f /tmp/allCountries.* /tmp/countryInfo.txt
    """
)

cd $PREVIOUS_PWD
