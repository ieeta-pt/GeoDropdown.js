function populateContinents(self,instanceLocal){
	// Continent View
	$('select[id="' + self.country + '"]').selectpicker('hide');
	$('select[id="' + self.adm1 + '"]').selectpicker('hide');
	$('select[id="' + self.adm2 + '"]').selectpicker('hide');
	$('select[id="' + self.adm3 + '"]').selectpicker('hide');
	$('select[id="' + self.adm4 + '"]').selectpicker('hide');
	$('select[id="' + self.adm5 + '"]').selectpicker('hide');


	continentElement = document.getElementById(self.continent);
	selectedContinentIndex = document.getElementById( self.continent ).selectedIndex;

	if(self.selectedContinentIndex == -1){
		continentElement.length=0;	

		if(self.answer!=undefined && JSON.parse(self.answer)[0]['continent']){
			continentElement.options[0] = new Option(stripGCode(JSON.parse(self.answer)[0]['continent']),'');
			self.selectedContinentText = JSON.parse(self.answer)[0]['continent'];
		}
		else continentElement.options[0] = new Option('Select Continent','');
		
		continentElement.selectedIndex = 0;

		// Fill the continent dropdown
		for(i=0,x=self.levels[0].length;i<x;i++)
	 		continentElement.options[continentElement.length] = new Option(stripGCode(self.levels[0][i]),stripGCode(self.levels[0][i]));
	}
	self.names = new Array;
	self.geoParent.append('<ol>'+self.g.join('')+'</ol>');

	// Assigned all continents. Now assign event listener for the countries.
	if( self.country ){
		 $('select[id="' + self.continent + '"]').change(function(){
		 	self.selectedContinentIndex = document.getElementById( self.continent ).selectedIndex;

		 	// Clear and deselect the following dropdowns
			self.selectedCountryIndex=self.selectedADM1Index=self.selectedADM2Index=self.selectedADM3Index=self.selectedADM4Index=self.selectedADM5Index=-1;
			self.selectedCountryText=self.selectedADM1Text=self.selectedADM2Text=self.selectedADM3Text=self.selectedADM4Text=self.selectedADM5Text='';
			self.levels[2]=self.levels[3]=self.levels[4]=self.levels[5]=self.levels[6]=null;

			// Server request with the selected data
			self.level=1;
			self.selectedContinentText = $('select[id="' + self.continent + '"] option:selected').text();

			instanceLocal.fire(
				'changeVal', 
				{ continent:self.selectedContinentText,country:'',adm1:'',adm2:'',adm3:'',adm4:'',adm5:'' }
			);
			if(self.reach=="continent") return;

			self.geoClick($('a:contains("'+self.selectedContinentText+'")'),instanceLocal);
		});
	}

	if((self.selectedContinentIndex < 0 || self.selectedContinentIndex == undefined) && self.selectedContinentText!=''){
		// Clear and deselect the following dropdowns
		self.selectedCountryIndex=self.selectedADM1Index=self.selectedADM2Index=self.selectedADM3Index=self.selectedADM4Index=self.selectedADM5Index=-1;
		self.selectedCountryText=self.selectedADM1Text=self.selectedADM2Text=self.selectedADM3Text=self.selectedADM4Text=self.selectedADM5Text='';
		self.levels[2]=self.levels[3]=self.levels[4]=self.levels[5]=self.levels[6]=null;

		// Server request with the selected data
		self.level=1;
		self.selectedContinentText = $('select[id="' + self.continent + '"] option:selected').text();
		if(self.reach=="continent") return;
		self.geoClick($('a:contains("'+self.selectedContinentText+'")'),instanceLocal);
	}

	$(continentElement).selectpicker('refresh').selectpicker('show');
}