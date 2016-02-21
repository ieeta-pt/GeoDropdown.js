function populateADM4(self,instanceLocal){
	// ADM4 View
	$('select[id="' + self.country + '"]').selectpicker('show');
	$('select[id="' + self.adm1 + '"]').selectpicker('show');
	$('select[id="' + self.adm2 + '"]').selectpicker('show');
	$('select[id="' + self.adm3 + '"]').selectpicker('show');
	$('select[id="' + self.adm4 + '"]').selectpicker('show');
	$('select[id="' + self.adm5 + '"]').selectpicker('hide');

	adm4Element = document.getElementById( self.adm4 );

	adm4Element.length=1;
	// init adm4 dropdown list
	if(self.selectedADM4Index < 0){
		
		if(self.answer!=undefined && JSON.parse(self.answer)[0]['adm4'] && self.selectedADM4Index==-2){
			adm4Element.options[0] = new Option(stripGCode(JSON.parse(self.answer)[0]['adm4']),'');
			self.selectedADM4Text = JSON.parse(self.answer)[0]['adm4'];
		}
		else{
			adm4Element.options[0] = new Option('Select ADM4','');
			adm4Element.selectedIndex = 0;
		}
	}

	// If there is a selected item put it at the top of the dropdown
	else adm4Element.options[0] = new Option(stripGCode(self.levels[5][self.selectedADM4Index-1]),stripGCode(self.levels[5][self.selectedADM4Index-1]));
	// Fill the dropdown
	for(i=0,x=self.levels[5].length;i<x;i++){
	 	if(self.webservice=="childrenJSON") adm4Element.options[adm4Element.length] = new Option(stripGCode(self.levels[5][i]),stripGCode(self.levels[5][i]));
	 	else adm4Element.options[adm4Element.length] = new Option(self.levels[5][i]['name'],self.levels[5][i]['name']);
	 }

	self.names = new Array;
	if(self.webservice=="childrenJSON") self.geoParent.append('<ol>'+self.g.join('')+'</ol>');

	// Assigned all adm4. Now assign event listener for the adm5.
	if( self.adm5 ){
		$('select[id="' + self.adm4 + '"]').change(function(){
			// Deselect the following dropdown
			self.selectedADM5Index=-1;
			self.selectedADM5Text='';

			$('select[id="'+self.id+'_adm5"]').prop('selectedIndex',0);
			
			if(document.getElementById( self.adm4 ).selectedIndex != 0)
				self.selectedADM4Index = document.getElementById( self.adm4 ).selectedIndex;

			// Server request with the selected data
			self.level=6;
			if(self.webservice=="childrenJSON") self.selectedADM4Text = self.levels[5][self.selectedADM4Index-1];
			else self.selectedADM4Text = self.levels[5][self.selectedADM4Index-1]['name'];

			instanceLocal.fire(
				'changeVal', 
				{ continent:self.selectedContinentText,country:getCountryName(self.selectedCountryText),adm1:self.selectedADM1Text,adm2:self.selectedADM2Text,adm3:self.selectedADM3Text,adm4:self.selectedADM4Text,adm5:'' }
			);
			if(self.reach=="adm4") return;

			if(self.webservice=="childrenJSON") self.geoClick($('a:contains("'+self.selectedADM4Text.replace(/gcode/,'')+'")'),instanceLocal);
			else{
				for(i=0;i<self.levels[self.level-1].length;i++){
					if(self.levels[self.level-1][i]['name'] == self.selectedADM4Text)
						self.geoClick(undefined,instanceLocal,self.levels[self.level-1][i]['geonameId']);
				}
			}
		});
	}

	if((self.selectedADM4Index==undefined || self.selectedADM4Index<0) && self.selectedADM4Text!=''){
		// Clear and deselect the following dropdowns
		self.selectedADM5Index=-2;
		self.selectedADM5Text='';

		// Get selected index
		if(document.getElementById( self.adm4 ).selectedIndex != 0)
			self.selectedADM4Index = document.getElementById( self.adm4 ).selectedIndex;
		
		// Server request with the selected data
		self.level=6;
		if(self.reach=="adm4") return;

		if(self.webservice=="childrenJSON"){
			exists = false;
			for(i=0;i<self.levels[self.level-1].length;i++){
				clean = self.selectedADM4Text.replace(/gcode/,'');
				if(beginsWith(clean,self.levels[self.level-1][i])){
					exists = true;
					self.geoClick($('a:contains("'+self.levels[self.level-1][i].replace(/gcode/,'')+'")'),instanceLocal);
				}
			}
			if(!exists) self.geoClick($('a:contains("'+self.selectedADM4Text.replace(/gcode/,'')+'")'),instanceLocal);
		}
		else{
			for(i=0;i<self.levels[self.level-1].length;i++){
				if(self.levels[self.level-1][i]['name'] == stripGCode(self.selectedADM4Text))
					self.geoClick(undefined,instanceLocal,self.levels[self.level-1][i]['geonameId']);
			}
		}
	}
	$(adm4Element).selectpicker('refresh').selectpicker('show');
}