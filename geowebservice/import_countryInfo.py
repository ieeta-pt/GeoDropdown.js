


import csv

from geodatabase.models import Countryinfo

import csv
ifile = open("country.csv", "rU")
reader = csv.reader(ifile, delimiter='\t')
for row in reader:
    print row
    a = Countryinfo()
    a.iso_alpha2 = row[0]
    a.iso_alpha3 = row[1]
    a.iso_numeric = row[2]
    a.fips_code = row[3]
    a.name = row[4]
    a.capital = row[5]
    a.areainsqkm = row[6]
    a.population = row[7]
    a.continent = row[8]
    a.currency = row[9]
    a.currencyName = row[10]
    a.geonameId = row[11]
    a.save()