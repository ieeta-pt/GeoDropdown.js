# Caution!
Under development

# GeoDropdown
GeoDropdown makes use of [geonames data server](http://geonames.org/) to create a multiple drodpdown lists system, which guarantees that users will provides well formatted locations, according to ISO-3166.

# How to use the API
To display the dropdowns system on a web page just include the geo-dropdown tag in the HTML, and an identifier for each hierarchical levels.
Here is an example:

    <geo-dropdown continent="cont" country="count" adm1="a1" adm2="a2" adm3="a3" adm4="a4" adm5="a5"></geo-dropdown> 

By default:
* continent="continent"
* country="country"
* adm1="adm1"
* adm2="adm2"
* adm3="adm3"
* adm4="adm4"
* adm5="adm5"

# Hierarchical levels
There are 7 hierarchical levels, which corresponds to 7 dropdown list:

	0. Continent
	1. Country
	2. ADM1
	3. ADM2
	4. ADM3
	5. ADM4
	6. ADM5

# What is ADM#?
[ADM](http://www.geonames.org/export/codes.html) comes from administrative division, and it's the way that geonames handles the heterogeneity among the various administrative organizations of all countries. ADM1 corresponds to a primary administrative division of a country, and each following ADM corresponds to a subdivision of the previous ADM. It's not mandatory that every country must reach ADM5. There are examples, such as Bouvet Island in Antarctica, where the maximum level reached is the country level. And there are also examples, such as France, where the maximum level reached is the ADM5 level. 

#Example
You can consult a live example of the GeoDropdown library at http://bioinformatics-ua.github.io/GeoDropdown.js/.
This page displays two GeoDropdowns widget, working simultaneously.
