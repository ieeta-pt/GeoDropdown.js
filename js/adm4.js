function populateADM4(self){
	// ADM4 View
	$('select[id="' + self.country + '"]').show();
	$('select[id="' + self.adm1 + '"]').show()
	$('select[id="' + self.adm2 + '"]').show()
	$('select[id="' + self.adm3 + '"]').show()
	$('select[id="' + self.adm4 + '"]').show()
	$('select[id="' + self.adm5 + '"]').hide()

	adm4Element = document.getElementById( self.adm4 );

	adm4Element.length=1;
	// init adm4 dropdown list
	if(self.selectedADM4Index < 0){
		
		if(self.answer!=undefined && JSON.parse(self.answer)[0]['adm4'] && self.selectedADM4Index==-2){
			adm4Element.options[0] = new Option(JSON.parse(self.answer)[0]['adm4'],'');
			self.selectedADM4Text = JSON.parse(self.answer)[0]['adm4'];
		}
		else{
			adm4Element.options[0] = new Option('Select Region/State','');
			adm4Element.selectedIndex = 0;
		}
	}

	// If there is a selected item put it at the top of the dropdown
	else adm4Element.options[0] = new Option(stripGCode(self.levels[5][self.selectedADM4Index-1]),stripGCode(self.levels[5][self.selectedADM4Index-1]));
	// Fill the dropdown
	for(i=0,x=self.levels[5].length;i<x;i++)
	 	adm4Element.options[adm4Element.length] = new Option(stripGCode(self.levels[5][i]),stripGCode(self.levels[5][i]));

	self.names = new Array;
	self.geoParent.append('<ol>'+self.g.join('')+'</ol>');

	// Assigned all adm4. Now assign event listener for the adm5.
	if( self.adm5 ){
		$('select[id="' + self.adm4 + '"]').change(function(){
			selectedADM4Text = $('select[id="' + self.adm4 + '"] option:selected').text();

			// Deselect the following dropdown
			self.selectedADM5Index=-1;
			self.selectedADM5Text='';

			$('select[id="'+self.id+'_adm5"]').prop('selectedIndex',0);
			
			if(document.getElementById( self.adm4 ).selectedIndex != 0)
				self.selectedADM4Index = document.getElementById( self.adm4 ).selectedIndex;

			// Server request with the selected data
			self.level=6;
			var geoClickText = self.levels[5][self.selectedADM4Index-1];
			if(self.reach=="adm4") return;
			self.geoClick($('a:contains("'+geoClickText.replace(/gcode/,'')+'")'));
		});
	}

	if((self.selectedADM4Index==undefined || self.selectedADM4Index<0) && self.selectedADM4Text!=''){
		self.selectedADM4Text = $('select[id="' + self.adm4 + '"] option:selected').text();

		// Clear and deselect the following dropdowns
		self.selectedADM5Index=-2;
		self.selectedADM5Text='';

		// Get selected index
		if(document.getElementById( self.adm4 ).selectedIndex != 0)
			self.selectedADM4Index = document.getElementById( self.adm4 ).selectedIndex;
		
		// Server request with the selected data
		self.level=6;
		if(self.reach=="adm4") return;
		self.geoClick($('a:contains("'+self.selectedADM4Text+'")'));
	}
}