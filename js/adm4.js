function populateADM4(self){
	// ADM4 View
	$("#"+self.country).show();
	$("#"+self.adm1).show();
	$("#"+self.adm2).show();
	$("#"+self.adm3).show();
	$("#"+self.adm4).show();
	$("#"+self.adm5).hide();

	adm4Element = document.getElementById( self.adm4 );

	adm4Element.length=1;
	if(self.selectedADM4Index == -1){
		adm4Element.options[0] = new Option('Select ADM4','');
		adm4Element.selectedIndex = 0;
	}
	else adm4Element.options[0] = new Option(stripGCode(self.levels[5][self.selectedADM4Index-1]),stripGCode(self.levels[5][self.selectedADM4Index-1]));
	
	for(i=0,x=self.levels[5].length;i<x;i++)
	 	adm4Element.options[adm4Element.length] = new Option(stripGCode(self.levels[5][i]),stripGCode(self.levels[5][i]));

	self.names = new Array;
	self.geoParent.append('<ol>'+self.g.join('')+'</ol>');

	// Assigned all cities.
	if( self.adm5 ){
		$("#"+self.adm4).change(function(){
			self.selectedADM5Index=-1;
			selectedADM4Text = $("#"+self.adm4+" option:selected").text();
			self.level=6;
			
			if(document.getElementById( self.adm4 ).selectedIndex != 0)
				self.selectedADM4Index = document.getElementById( self.adm4 ).selectedIndex;

			var geoClickText = self.levels[5][self.selectedADM4Index-1];
			self.geoClick($('a:contains("'+geoClickText.replace(/gcode/,'')+'")'));
		});
	}
}