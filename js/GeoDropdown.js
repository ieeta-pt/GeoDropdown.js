// GeoDropdown object
var geoDropdown = function(continent,country,adm1,adm2,adm3,adm4,adm5,reach,answer,clean){
	// HTML Elements ID
	this.continent = continent;
	this.country = country;
	this.adm1 = adm1;
	this.adm2 = adm2;
	this.adm3 = adm3;
	this.adm4 = adm4;
	this.adm5 = adm5;
	this.reach = reach;
	this.answer = answer;
	this.clean = clean;

	// 3D array with all the hierarchical information
	this.levels = new Array;
	this.names = new Array;
	this.level = -1;

	// Tree variables 
	this.geoParent;
	this.g;

	// continent dropdown variables
	this.continentElement;
	this.selectedContinentIndex = -1;
	this.selectedContinentText = '';

	// country dropdown variables
	this.countryElement;
	this.selectedCountryIndex = -1;
	this.selectedCountryText = '';

	// adm1 dropdown variables
	this.adm1Element;
	this.selectedADM1Index = -1;
	this.selectedADM1Text = '';

	// adm2 dropdown variables
	this.adm2Element;
	this.selectedADM2Index = -1;
	this.selectedADM2Text = '';
	
	// adm3 dropdown variables
	this.adm3Element;
	this.selectedADM3Index = -1;
	this.selectedADM3Text = '';
	
	// adm4 dropdown variables
	this.adm4Element;
	this.selectedADM4Index = -1;
	this.selectedADM4Text = '';

	// adm5 dropdown variables
	this.adm5Element;
	this.selectedADM5Index = -1;
	this.selectedADM5Text = '';
}

// Init method
geoDropdown.prototype.geoReady = function(instance){

	/* initialize selectpickers */
	$('#' + this.country).selectpicker().selectpicker('hide');
	$('#' + this.adm1).selectpicker().selectpicker('hide');
	$('#' + this.adm2).selectpicker().selectpicker('hide');
	$('#' + this.adm3).selectpicker().selectpicker('hide');
	$('#' + this.adm4).selectpicker().selectpicker('hide');
	$('#' + this.adm5).selectpicker().selectpicker('hide');

	// entry point without aggregation
	if(this.continent!="default_continent") {
		$('#' + this.continent).selectpicker().selectpicker('hide');
		this.geoClick($("#earth"),instance);
	}
	// entry point with aggregation
	else
	{
		this.geoClick($("#africa"),instance);
		this.geoClick($("#antarctica"),instance);
		this.geoClick($("#asia"),instance);
		this.geoClick($("#europe"),instance);
		this.geoClick($("#north_america"), instance);
		this.geoClick($("#oceania"), instance);
		this.geoClick($("#south_america"), instance);
		
	}

}

// Request method
geoDropdown.prototype.geoClick = function(geo, instance) {
	var self = this;
	this.geoParent = geo.parent().first();
	var instanceLocal = instance ; 
	var defaultLang = navigator.language /* Mozilla */ || navigator.userLanguage /* IE */;
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
				self.g = new Array;
				$.each(response.geonames, function() {
					// add hierarchy as title
					var title = '';
					if (this.fcode=='CONT' && this.continentCode) 
					{ 
						title = this.continentCode; 
						if(self.continent!="default_continent") self.level=0; 
					}
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
					self.g.push('<li><a href="#" sort="'+asciiName(this.name)+'" title="'+title+'" fcode="'+this.fcode+'" gid="'+this.geonameId+'" class="id_'+this.geonameId+'">'+this.name+gcode+'</a></li>');
					// Stop if non ISO-3166 location
					if(gcode=='') return; 

                    self.names.push(this.name+"gcode"+gcode);
				});
				
				// append all countries
				if(self.continent=="default_continent") 
					if(self.level==-1) 
						if(self.names.length<248) { self.geoParent.append('<ol>'+self.g.join('')+'</ol>'); return; }
						else self.level=1;
				
				// Ensure that all data is correct
				if(self.names.length==0) { castView(self.level,self); return; }
				self.names = $.unique(self.names).sort();
				
				for(i=0;i<7;i++){
					if(i!=self.level && self.levels[i] != undefined){
						if(self.levels[i][0] == self.names[0]) { castView(self.level,self); return; }
					}
				}
               
                // add the required data to 3D array
                self.levels[self.level] = self.names;

                // Populate the fresh data
                
                switch(self.level)
                {
                    case 0: { populateContinents(self,instanceLocal); break; } 
                    case 1: { populateCountries(self,instanceLocal); break; }
                    case 2: { populateADM1(self,instanceLocal); break; }
                    case 3: { populateADM2(self,instanceLocal); break; }
                    case 4: { populateADM3(self,instanceLocal); break; }
                    case 5: { populateADM4(self,instanceLocal); break; }
                    case 6: { populateADM5(self,instanceLocal); break; }
                }
			}
			else castView(self.level,self);


		},
		error: function() {
			// error handling goes here
			castView(self.level,self);
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

// Remove the gcode to display in the dropdowns
function stripGCode(string){
    return string.replace(/gcode(.)*/,'');
}

// Update view when something went wrong with geoClick
function castView(level,self){
	if(self.level<2)	{ $("#"+self.country).hide(); self.selectedCountryText=''; }
	if(self.level<3)	{ $("#"+self.adm1).hide(); self.selectedADM1Text=''; }
	if(self.level<4)	{ $("#"+self.adm2).hide(); self.selectedADM2Text=''; }
	if(self.level<5)	{ $("#"+self.adm3).hide(); self.selectedADM3Text=''; }
	if(self.level<6)	{ $("#"+self.adm4).hide(); self.selectedADM4Text=''; }
	if(self.level<7)	{ $("#"+self.adm5).hide(); self.selectedADM5Text=''; }
}