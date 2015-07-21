// GeoDropdown object
var geoDrop;
var geoConstructor = function(continent,country,adm1,adm2,adm3,adm4,adm5){
	this.continent = continent;
	this.country = country;
	this.adm1 = adm1;
	this.adm2 = adm2;
	this.adm3 = adm3;
	this.adm4 = adm4;
	this.adm5 = adm5;
}

// 3D array with all the hierarchical information
var levels = new Array;
var names = new Array;
var level = -1;

// Server request variables
var defaultLang;
var geoParent;
var g;

geoConstructor.prototype.geoReady = function(){
	// top link
	$.each(decodeURI(location.pathname).split('/'), function() {
	  $("#self").html(this+'');
	});

	// browser default lang
	defaultLang = navigator.language /* Mozilla */ || navigator.userLanguage /* IE */;

	// does URL contain lang=xx ?
	$.each(decodeURI(location.search.substr(1)).split('&'), function() {
		var s = this.split('=');
		if (s[0]=="lang") defaultLang = s[1];
	});

	// entry point
	geoClick($("#earth"));
}
function geoClick(geo) {
	geoParent = geo.parent();
	// server request
	$.ajax({
		url: 'http://geotree.geonames.net/childrenJSON',
		dataType:'jsonp',
		data: {
			geonameId: geo.attr("gid"),
			token: 'eertoeg',
			maxRows: 999,
			style: 'full',
			lang: defaultLang
		},
		success: function(response) {
			// ws returns an error message
			if (response.status) {
				$("#alert").html(response.status.message+' ('+response.status.value+')').show();
			}
			// ws returns an array of data
			if (response.geonames && response.geonames.length) {
				g = new Array;
				$.each(response.geonames, function() {
					// add hierarchy as title
					var title = '';
					if (this.fcode=='CONT' && this.continentCode) { title = this.continentCode; level=0; }
					else if (this.countryCode && this.fcl!=='P') {
						title += this.countryCode;
						if (this.adminCode1) {
							title += '-'+this.adminCode1;
							if (this.adminCode2) {
								title += '-'+this.adminCode2;
								if (this.adminCode3) {
									title += '-'+this.adminCode3;
									if (this.adminCode4) {
										title += '-'+this.adminCode4;
										if (this.adminCode5) {
											title += '-'+this.adminCode5;
										}
									}
								}
							}
						}
					}
					// empty adminCode1 for some countries
					if (title.length==5) title = title.replace('-00','');
					// add code to item name
					var gcode = '';
					if (this.fcl!=='P') {
						gcode = title;
						var s = gcode.split('-');
						for (var i=1; i<=5; i++) if (this.fcode=='ADM'+i) gcode = s[i];
					}
					g.push('<li><a href="#" sort="'+asciiName(this.name)+'" title="'+title+'" fcode="'+this.fcode+'" gid="'+this.geonameId+'" class="id_'+this.geonameId+'">'+this.name+gcode+'</a></li>');
                    names.push(this.name+gcode);
				});
				levels[level] = names;

				populateContinents(geoDrop.continent,geoDrop.country,geoDrop.adm1,geoDrop.adm2,geoDrop.adm3,geoDrop.adm4,geoDrop.adm5);
			}
		},
		error: function() {
			// error handling goes here
			$("#alert").html('ws timeout').show();
		}
	});
}

// Replace to provide names in the correct ascii code
asciiName = function(s){
    var r = s.toLowerCase();
    r = r .replace(/\\s/g, "");
    r = r .replace(/[àáâãäå]/g, "a");
    r = r .replace(/æ/g, "ae");
    r = r .replace(/ç/g, "c");
    r = r .replace(/[èéêë]/g, "e");
    r = r .replace(/[ìíîï]/g, "i");
    r = r .replace(/ñ/g, "n");
    r = r .replace(/[òóôõö]/g, "o");
    r = r .replace(/œ/g, "oe");
    r = r .replace(/[ùúûü]/g, "u");
    r = r .replace(/[ýÿ]/g, "y");
    r = r .replace(/\\W/g, "a");
    return r;
};

function validData(array,level){
	if(array==null || array=={}) return false;
	var i;
	for(i=0;i<7;i++) if(level != i && array == levels[i]) return false;
	return true; 
}

function stripGCode(string,length){
    return string.replace(/\d+/g, '').replace(/[A-Z][A-Z]+/,'');
}