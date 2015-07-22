function populateADM2(self){
	console.log(self.level+" adm2");

	// ADM2 View
	$("#"+self.country).show();
	$("#"+self.adm1).show();
	$("#"+self.adm2).show();
	$("#"+self.adm3).hide();
	$("#"+self.adm4).hide();
	$("#"+self.adm5).hide();

	adm2Element = document.getElementById( self.adm2 );

	adm2Element.length=1;
	if(self.selectedADM2Index == -1){
		adm2Element.options[0] = new Option('Select ADM2','');
		adm2Element.selectedIndex = 0;
	}
	else adm2Element.options[0] = new Option(stripGCode(self.levels[3][self.selectedADM2Index-1]),stripGCode(self.levels[3][self.selectedADM2Index-1]));
	
	for(i=0,x=self.levels[3].length;i<x;i++)
	 	adm2Element.options[adm2Element.length] = new Option(stripGCode(self.levels[3][i]),stripGCode(self.levels[3][i]));

	self.names = new Array;
	self.geoParent.append('<ol>'+self.g.join('')+'</ol>');

	// Assigned all states. Now assign event listener for the cities.
	if( self.adm3 )
	{
		$("#"+self.adm2).change(function(){
			self.selectedADM3Index=self.selectedADM4Index=self.selectedADM5Index=-1;
			self.selectedADM2Text = $("#"+self.adm2+" option:selected").text();
			
			self.levels[5]=self.levels[6]=null;
			self.level=4;
			
			if(document.getElementById( self.adm2 ).selectedIndex != 0)
				self.selectedADM2Index = document.getElementById( self.adm2 ).selectedIndex;
			
			var geoClickText = self.levels[3][self.selectedADM2Index-1];
			self.geoClick($('a:contains("'+geoClickText+'")'));
		});
	}
}