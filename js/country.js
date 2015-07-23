function populateCountries(self){
	// Country View
	if(self.continent=="continent") $("#"+self.continent).hide();
	$("#"+self.country).show();
	$("#"+self.adm1).hide();
	$("#"+self.adm2).hide();
	$("#"+self.adm3).hide();
	$("#"+self.adm4).hide();
	$("#"+self.adm5).hide();

	countryElement = document.getElementById( self.country );
	
	if(document.getElementById( self.country ).selectedIndex != 0)
		selectedCountryIndex = document.getElementById( self.country ).selectedIndex;

	countryElement.length=1;
	// init country dropdown list
	if(self.selectedCountryIndex == -1 || self.selectedCountryIndex == undefined){
		countryElement.options[0] = new Option('Select Country','');
		countryElement.selectedIndex = 0;
		// Get all correct country self.names
		for(i=0,x=self.levels[1].length;i<x;i++) self.levels[1][i] = getCountryName(self.levels[1][i].substring(self.levels[1][i].length-2,self.levels[1][i].length))
		self.levels[1] = $.unique(self.levels[1]).sort();
	}
	// If there is a selected item put it at the top of the dropdown
	else countryElement.options[0] = new Option(self.levels[1][selectedCountryIndex-1],self.levels[1][selectedCountryIndex-1]);
	// Fill the dropdown
	for(i=0,x=self.levels[1].length;i<x;i++)
	 	countryElement.options[countryElement.length] = new Option(self.levels[1][i],self.levels[1][i]);

	self.names = new Array;
	self.geoParent.append('<ol>'+self.g.join('')+'</ol>');

	// Assigned all countries. Now assign event listener for the regions.
	if( self.adm1 ){
		$("#"+self.country).change(function(){
			// Ask for country code again, in order to execute geoClick
			self.selectedCountryText = getCountryCode(isoCountries,$("#"+self.country+" option:selected").text());
			self.selectedADM1Index=self.selectedADM2Index=self.selectedADM3Index=self.selectedADM4Index=self.selectedADM5Index=-1;
			
			self.levels[3]=self.levels[4]=self.levels[5]=self.levels[6]=null;
			self.level=2;
			
			if(self.selectedCountryText != 'Antarctica')
				self.geoClick($('a:contains("'+self.selectedCountryText+'")'));
		});
	}
}