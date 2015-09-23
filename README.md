# Caution!
Under development

# GeoDropdown
GeoDropdown makes use of [geonames data server](http://geonames.org/) to create a multiple drodpdown lists system, which guarantees that users will provides well formatted locations, according to ISO-3166.

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
