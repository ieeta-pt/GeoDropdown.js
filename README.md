# GeoDropdown
GeoDropdown makes use of geowebservice to create a multiple drodpdown lists system, which guarantees that users will provides well formatted locations, according to ISO-3166.

# Hierarchical levels
There are 7 hierarchical levels, which corresponds to 7 dropdown list:

	0. Continent
	1. Country
	2. ADM1
	3. ADM2
	4. ADM3
	5. ADM4
	6. ADM5

# First Level
The developer can choose to have continents as first level or countries. If the continent identifier is declared in the GeoDropdown tag, the correspondent dropdown will appear. If not, it won't appear.

# Reach level
The developer can choose the reach level, ie the end point of the GeoDropdown object, this is made by the reach identifier.
####How reach works:
| Identifier Value | Reach Level
|------------------| :-----------: |
| no identifier | adm5 |    
| reach="continent" | continet |
| reach="country" | country |
| reach="adm1" | adm1 |
| reach="adm2" | adm2 |
| reach="adm3" | adm3 |
| reach="adm4" | adm4 |
| reach="adm5" | adm5 |
| reach with other level | adm5 |

# What is ADM#?
[ADM](http://www.geonames.org/export/codes.html) comes from administrative division, and it's the way that geonames handles the heterogeneity among the various administrative organizations of all countries. ADM1 corresponds to a primary administrative division of a country, and each following ADM corresponds to a subdivision of the previous ADM. It's not mandatory that every country reaches ADM5. There are examples, such as Bouvet Island in Antarctica, where the maximum level reached is the country level. And there are also examples, such as France, where the maximum level reached is the ADM5 level.

# How to use the API
To display the dropdowns system on a web page just include the geo-dropdown tag in the HTML, an identifier for each hierarchical levels and a reach identifier.
Here are some examples:

    <geo-dropdown continent="cont" country="count" adm1="a1" adm2="a2" adm3="a3" adm4="a4" adm5="a5"></geo-dropdown> 
    <geo-dropdown country="count" adm1="a1" adm2="a2" adm3="a3" adm4="a4" adm5="a5"></geo-dropdown>
    <geo-dropdown reach="adm1"></geo-dropdown> 

**Note that:**It is also possible to define a delete button with the clean identifier.And, you can define a answer with the answer identifier. If the answer identifier was defined, that value will be loaded when the geodropdown object starts.

    <geo-dropdown clean="del_button" answer="[{continent:'Europe',country:'Portugal'}]"></geo-dropdown>
    
**Note that:**There is also a files called url, where you can define the url to the server where are the locations information

By default:
* country="default_country"
* adm1="default_adm1"
* adm2="default_adm2"
* adm3="default_adm3"
* adm4="default_adm4"
* adm5="default_adm5"
* clean="default_clean"
* answer="empty"

#Example 
You can consult a live example of the GeoDropdown library at http://bioinformatics-ua.github.io/GeoDropdown.js/.
This page displays two Geodropdowns widgets, working simultaneously. One that does not aggregate continents-country and has adm5 as reach level, and other that aggregates and has adm1 as reach level.

#Web Service 
The web service is developed in Django, using SOLR for data storage. The web service functionality is pretty simple, when a geonameid is given to the service, it responds with a json containing all children of the desired location.

###Example
Portugal (wich is a country) geonameid is 2264397, so you can use the link /geodatabase/2264397 to get all ADM1 of Portugal. It will return a json like this:

```json
[{"geonameid": 2262961, "fcode": "ADM1", "name": "Distrito de Set\u00c3\u00babal", "adm1": 19}, {"geonameid": 2263478, "fcode": "ADM1", "name": "Distrito de Santar\u00c3\u00a9m", "adm1": 18}, {"geonameid": 2264507, "fcode": "ADM1", "name": "Distrito de Portalegre", "adm1": 16}, {"geonameid": 2267056, "fcode": "ADM1", "name": "Distrito de Lisboa", "adm1": 14}, {"geonameid": 2267094, "fcode": "ADM1", "name": "Distrito de Leiria", "adm1": 13}, {"geonameid": 2268337, "fcode": "ADM1", "name": "Distrito de Faro", "adm1": 9}, {"geonameid": 2268404, "fcode": "ADM1", "name": "Distrito de \u00c3\u2030vora", "adm1": 8}, {"geonameid": 2269513, "fcode": "ADM1", "name": "Distrito de Castelo Branco", "adm1": 6}, {"geonameid": 2270984, "fcode": "ADM1", "name": "Distrito de Beja", "adm1": 3}, {"geonameid": 2593105, "fcode": "ADM1", "name": "Madeira", "adm1": 10}, {"geonameid": 2732264, "fcode": "ADM1", "name": "Distrito de Viseu", "adm1": 22}, {"geonameid": 2732437, "fcode": "ADM1", "name": "Distrito de Vila Real", "adm1": 21}, {"geonameid": 2732772, "fcode": "ADM1", "name": "Distrito de Viana do Castelo", "adm1": 20}, {"geonameid": 2735941, "fcode": "ADM1", "name": "Distrito do Porto", "adm1": 17}, {"geonameid": 2738782, "fcode": "ADM1", "name": "Distrito da Guarda", "adm1": 11}, {"geonameid": 2740636, "fcode": "ADM1", "name": "Distrito de Coimbra", "adm1": 7}, {"geonameid": 2742026, "fcode": "ADM1", "name": "Distrito de Bragan\u00c3\u00a7a", "adm1": 5}, {"geonameid": 2742031, "fcode": "ADM1", "name": "Distrito de Braga", "adm1": 4}, {"geonameid": 2742610, "fcode": "ADM1", "name": "Distrito de Aveiro", "adm1": 2}]
```

# Setup demo
## Front end:
```sh
npm install -g grunt bower serve

# download external dependencies. These are old and some of these versions are not in npm.
bower install

# build dist files
npm install  # install used dependencies by grunt
grunt

# start a dev server to test demo.html
serve
```

If you open [http://localhost:3000/demo](http://localhost:3000/demo) you should be able to see the components working.

## Server Side:
### How to make it run
There is a docker-compose file to run this application. Therefore, if you want to run geodropdown, just go to geowebservice folder and run the following commands:
```
cd geowebservice
docker-compose build
./start.sh
```

Change the `url` attribute of the `geo-dropdown` components in demo.html from `https://emif-catalogue.eu/geodropdown/geodatabase/` to `http://localhost:8886/geodatabase/`.

### How to load data to the Web Service databases

**Note:** Data is automatically loaded with the start.sh script. You can ignore this section.

To load all the required data, you will need two files from geonames: allCountries.txt and countryInfo.txt.
You can find them here: [files link](http://download.geonames.org/export/dump/)

The next step is to give the location of those files to the webservice. So you need to change the paths in geowebservice/geodatabase/services.py file, lines 178 and 179.

Now you are prepared to load all locations, simply execute python services.py in console.

## Test it
Go to [http://localhost:3000/demo](http://localhost:3000/demo)

# Authors:

- Leonardo Coelho	- <leonardo.coelho@ua.pt>

# Contributors
- Renato Pinho 
- Luis A. Bastião Silva - <bastiao@ua.pt>
- André Pedrosa - <aspedrosa@ua.pt>


# Mantainers 

- Leonardo Coelho	- <leonardo.coelho@ua.pt>
- Luis A. Bastião Silva -  <bastiao@ua.pt>
