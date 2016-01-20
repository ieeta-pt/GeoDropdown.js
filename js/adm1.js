
function populateADM1(self,instanceLocal){
	// ADM1 View
	$('select[id="' + self.country + '"]').selectpicker('show');
	$('select[id="' + self.adm1 + '"]').selectpicker('show');
	$('select[id="' + self.adm2 + '"]').selectpicker('hide');
	$('select[id="' + self.adm3 + '"]').selectpicker('hide');
	$('select[id="' + self.adm4 + '"]').selectpicker('hide');
	$('select[id="' + self.adm5 + '"]').selectpicker('hide');

	adm1Element = document.getElementById( self.adm1 );
	
	adm1Element.length=1;
	// init adm1 dropdown list
	if(self.selectedADM1Index < 0){
		
		if(self.answer!=undefined && JSON.parse(self.answer)[0]['adm1'] && self.selectedADM1Index==-2){
			adm1Element.options[0] = new Option(stripGCode(JSON.parse(self.answer)[0]['adm1']),'');
			self.selectedADM1Text = JSON.parse(self.answer)[0]['adm1'];
		}
		else{
			adm1Element.options[0] = new Option('Select Region/State','');
			adm1Element.selectedIndex = 0;
		}
	}
	// If there is a selected item put it at the top of the dropdown
	else adm1Element.options[0] = new Option(stripGCode(self.levels[2][selectedADM1Index-1]),stripGCode(self.levels[2][selectedADM1Index-1]));
	// Fill the dropdown
	for(i=0,x=self.levels[2].length;i<x;i++){
	 	if(self.webservice=="childrenJSON") adm1Element.options[adm1Element.length] = new Option(stripGCode(self.levels[2][i]),stripGCode(self.levels[2][i]));
	 	else adm1Element.options[adm1Element.length] = new Option(self.levels[2][i]['name'],self.levels[2][i]['name']);
	 }

	self.names = new Array;
	if(self.webservice=="childrenJSON") self.geoParent.append('<ol>'+self.g.join('')+'</ol>');
	
	// Assigned all adm1. Now assign event listener for the adm2.
	if( self.adm2 ){
		$('select[id="' + self.adm1 + '"]').change(function(){
			// Clear and deselect the following dropdowns
			self.selectedADM2Index=self.selectedADM3Index=self.selectedADM4Index=self.selectedADM5Index=-1;
			self.selectedADM2Text=self.selectedADM3Text=self.selectedADM4Text=self.selectedADM5Text='';
			self.levels[4]=self.levels[5]=self.levels[6]=null;

			// Get selected index
			if(document.getElementById( self.adm1 ).selectedIndex != 0)
				self.selectedADM1Index = document.getElementById( self.adm1 ).selectedIndex;
			
			// Server request with the selected data
			self.level=3;

			if(self.webservice=="childrenJSON") self.selectedADM1Text = self.levels[2][self.selectedADM1Index-1];
			else self.selectedADM1Text = self.levels[2][self.selectedADM1Index-1]['name'];

			instanceLocal.fire(
				'changeVal', 
				{ continent:self.selectedContinentText,country:getCountryName(self.selectedCountryText),adm1:self.selectedADM1Text,adm2:'',adm3:'',adm4:'',adm5:'' }
			);
			if(self.reach=="adm1") return;

			if(self.webservice=="childrenJSON")
				self.geoClick($('a:contains("'+self.selectedADM1Text.replace(/gcode/,'')+'")'),instanceLocal);
			else{
				for(i=0;i<self.levels[self.level-1].length;i++){
					if(self.levels[self.level-1][i]['name'] == self.selectedADM1Text)
						self.geoClick(undefined,instanceLocal,self.levels[self.level-1][i]['geonameId']);
				}
			}
		});

		if((self.selectedADM1Index==undefined || self.selectedADM1Index<0) && self.selectedADM1Text!=''){
			// Clear and deselect the following dropdowns
			self.selectedADM2Index=self.selectedADM3Index=self.selectedADM4Index=self.selectedADM5Index=-2;
			self.selectedADM2Text=self.selectedADM3Text=self.selectedADM4Text=self.selectedADM5Text='';
			self.levels[4]=self.levels[5]=self.levels[6]=null;

			// Get selected index
			if(document.getElementById( self.adm1 ).selectedIndex != 0)
				self.selectedADM1Index = document.getElementById( self.adm1 ).selectedIndex;
			
			// Server request with the selected data
			self.level=3;
			if(self.reach=="adm1") return;

			if(self.webservice=="childrenJSON"){
				exists = false;
				for(i=0;i<self.levels[self.level-1].length;i++){
					clean = self.selectedADM1Text.replace(/gcode/,'');
					if(beginsWith(clean,self.levels[self.level-1][i])){
						exists = true;
						self.geoClick($('a:contains("'+self.levels[self.level-1][i].replace(/gcode/,'')+'")'),instanceLocal);
					}
				}
				if(!exists) self.geoClick($('a:contains("'+self.selectedADM1Text.replace(/gcode/,'')+'")'),instanceLocal);
			}
			else{
				for(i=0;i<self.levels[self.level-1].length;i++){
					if(self.levels[self.level-1][i]['name'] == self.selectedADM1Text)
						self.geoClick(undefined,instanceLocal,self.levels[self.level-1][i]['geonameId']);
				}
			}
		}
	}
	$(adm1Element).selectpicker('refresh').selectpicker('show');
}