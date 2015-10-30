function populateADM3(self,instanceLocal){
	// ADM3 View
	$('select[id="' + self.country + '"]').selectpicker('show');
	$('select[id="' + self.adm1 + '"]').selectpicker('show');
	$('select[id="' + self.adm2 + '"]').selectpicker('show');
	$('select[id="' + self.adm3 + '"]').selectpicker('show');
	$('select[id="' + self.adm4 + '"]').selectpicker('hide');
	$('select[id="' + self.adm5 + '"]').selectpicker('hide');

	adm3Element = document.getElementById( self.adm3 );

	adm3Element.length=1;
	// init adm3 dropdown list
	if(self.selectedADM3Index < 0){
		
		if(self.answer!=undefined && JSON.parse(self.answer)[0]['adm3'] && self.selectedADM3Index==-2){
			adm3Element.options[0] = new Option(stripGCode(JSON.parse(self.answer)[0]['adm3']),'');
			self.selectedADM3Text = JSON.parse(self.answer)[0]['adm3'];
		}
		else{
			adm3Element.options[0] = new Option('Select ADM3','');
			adm3Element.selectedIndex = 0;
		}
	}
	
	// If there is a selected item put it at the top of the dropdown
	else adm3Element.options[0] = new Option(stripGCode(self.levels[4][self.selectedADM3Index-1]),stripGCode(self.levels[4][self.selectedADM3Index-1]));
	// Fill the dropdown
	for(i=0,x=self.levels[4].length;i<x;i++){
	 	if(self.webservice=="childrenJSON") adm3Element.options[adm3Element.length] = new Option(stripGCode(self.levels[4][i]),stripGCode(self.levels[4][i]));
	 	else adm3Element.options[adm3Element.length] = new Option(self.levels[4][i]['name'],self.levels[4][i]['name']);
	}

	self.names = new Array;
	if(self.webservice=="childrenJSON") self.geoParent.append('<ol>'+self.g.join('')+'</ol>');

	// Assigned all adm3. Now assign event listener for the adm4.
	if( self.adm4 ){
		$('select[id="' + self.adm3 + '"]').change(function(){
			// Clear and deselect the following dropdowns
			self.selectedADM4Index=self.selectedADM5Index=-1;
			self.selectedADM4Text=self.selectedADM5Text='';
			self.levels[6]=null;

			$('select[id="'+self.id+'_adm4"]').prop('selectedIndex',0); $('select[id="'+self.id+'_adm5"]').prop('selectedIndex',0);

			if(document.getElementById( self.adm3 ).selectedIndex != 0)
				self.selectedADM3Index = document.getElementById( self.adm3 ).selectedIndex;
			
			// Server request with the selected data
			self.level=5;
			self.selectedADM3Text = self.levels[4][self.selectedADM3Index-1]['name'];

			instanceLocal.fire(
				'changeVal', 
				{ continent:self.selectedContinentText,country:getCountryName(self.selectedCountryText),adm1:self.selectedADM1Text,adm2:self.selectedADM2Text,adm3:self.selectedADM3Text,adm4:'',adm5:'' }
			);
			if(self.reach=="adm3") return;

			if(self.webservice=="childrenJSON") self.geoClick($('a:contains("'+self.selectedADM3Text.replace(/gcode/,'')+'")'),instanceLocal);
			else{
				for(i=0;i<self.levels[self.level-1].length;i++){
					if(self.levels[self.level-1][i]['name'] == self.selectedADM3Text)
						self.geoClick(undefined,instanceLocal,self.levels[self.level-1][i]['geonameId']);
				}
			}
		});
	}

	if((self.selectedADM3Index==undefined || self.selectedADM3Index<0) && self.selectedADM3Text!=''){
		// Clear and deselect the following dropdowns
		self.selectedADM4Index=self.selectedADM5Index=-2;
		self.selectedADM4Text=self.selectedADM5Text='';
		self.levels[6]=null;

		// Get selected index
		if(document.getElementById( self.adm3 ).selectedIndex != 0)
			self.selectedADM3Index = document.getElementById( self.adm3 ).selectedIndex;
		
		// Server request with the selected data
		self.level=5;
		if(self.reach=="adm3") return;
		
		if(self.webservice=="childrenJSON") self.geoClick($('a:contains("'+self.selectedADM3Text.replace(/gcode/,'')+'")'),instanceLocal);
		else{
			for(i=0;i<self.levels[self.level-1].length;i++){
				if(self.levels[self.level-1][i]['name'] == self.selectedADM3Text)
					self.geoClick(undefined,instanceLocal,self.levels[self.level-1][i]['geonameId']);
			}
		}
	}
	$(adm3Element).selectpicker('refresh').selectpicker('show');
}