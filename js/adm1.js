function populateADM1(self){
	// ADM1 View
	$("#"+self.country).show();
	$("#"+self.adm1).show();
	$("#"+self.adm2).hide();
	$("#"+self.adm3).hide();
	$("#"+self.adm4).hide();
	$("#"+self.adm5).hide();

	adm1Element = document.getElementById( self.adm1 );
	
	adm1Element.length=1;
	// init adm1 dropdown list
	if(self.selectedADM1Index == -1){
		adm1Element.options[0] = new Option('Select ADM1','');
		adm1Element.selectedIndex = 0;
	}
	// If there is a selected item put it at the top of the dropdown
	else adm1Element.options[0] = new Option(stripGCode(self.levels[2][selectedADM1Index-1]),stripGCode(self.levels[2][selectedADM1Index-1]));
	// Fill the dropdown
	for(i=0,x=self.levels[2].length;i<x;i++)
	 	adm1Element.options[adm1Element.length] = new Option(stripGCode(self.levels[2][i]),stripGCode(self.levels[2][i]));

	self.names = new Array;
	self.geoParent.append('<ol>'+self.g.join('')+'</ol>');
	
	// Assigned all adm1. Now assign event listener for the adm2.
	if( self.adm2 ){
		$("#"+self.adm1).change(function(){
			self.selectedADM1Text = $("#"+self.adm1+" option:selected").text();

			// Clear and deselect the following dropdowns
			self.selectedADM2Index=self.selectedADM3Index=self.selectedADM4Index=self.selectedADM5Index=-1;
			self.levels[4]=self.levels[5]=self.levels[6]=null;

			// Get selected index
			if(document.getElementById( self.adm1 ).selectedIndex != 0)
				self.selectedADM1Index = document.getElementById( self.adm1 ).selectedIndex;
			
			// Server request with the selected data
			self.level=3;
			var geoClickText = self.levels[2][self.selectedADM1Index-1];
			self.geoClick($('a:contains("'+geoClickText.replace(/gcode/,'')+'")'));
		});
	}
}