function populateContinents(self){
	console.log(self.level+" countinent");
	// Continent View
	$("#"+self.country).hide();
	$("#"+self.adm1).hide();
	$("#"+self.adm2).hide();
	$("#"+self.adm3).hide();
	$("#"+self.adm4).hide();
	$("#"+self.adm5).hide();

	// given the id of the <select> tag as function argument, it inserts <option> tags
	continentElement = document.getElementById(self.continent);
	selectedContinentIndex = document.getElementById( self.continent ).selectedIndex;

	if(selectedContinentIndex == -1){
		continentElement.length=0;	
		continentElement.options[0] = new Option('Select Continent','');
		continentElement.selectedIndex = 0;

		for(i=0,x=self.levels[0].length;i<x;i++)
	 		continentElement.options[continentElement.length] = new Option(stripGCode(self.levels[0][i]),stripGCode(self.levels[0][i]));
	}
	self.names = new Array;
	self.geoParent.append('<ol>'+self.g.join('')+'</ol>');

	// Assigned all continents. Now assign event listener for the countries.
	if( self.country ){
		 $("#"+self.continent).change(function(){
			self.selectedCountryIndex=self.selectedADM1Index=self.selectedADM2Index=self.selectedADM3Index=self.selectedADM4Index=self.selectedADM5Index=-1;
			selectedContinentText = $("#"+self.continent+" option:selected").text();
			self.levels[2]=self.levels[3]=self.levels[4]=self.levels[5]=self.levels[6]=null;
			self.level=1;
			self.geoClick($('a:contains("'+selectedContinentText+'")'));
		});
	}
}