function populateADM3(self){
	console.log(self.level+" adm3");

	// ADM3 View
	$("#"+self.country).show();
	$("#"+self.adm1).show();
	$("#"+self.adm2).show();
	$("#"+self.adm3).show();
	$("#"+self.adm4).hide();
	$("#"+self.adm5).hide();

	adm3Element = document.getElementById( self.adm3 );

	adm3Element.length=1;
	if(self.selectedADM3Index == -1){
		adm3Element.options[0] = new Option('Select ADM3','');
		adm3Element.selectedIndex = 0;
	}
	else adm3Element.options[0] = new Option(stripGCode(self.levels[4][self.selectedADM3Index-1]),stripGCode(self.levels[4][self.selectedADM3Index-1]));
	
	for(i=0,x=self.levels[4].length;i<x;i++)
	 	adm3Element.options[adm3Element.length] = new Option(stripGCode(self.levels[4][i]),stripGCode(self.levels[4][i]));

	self.names = new Array;
	self.geoParent.append('<ol>'+self.g.join('')+'</ol>');

	// Assigned all cities.
	if( self.adm4 ){
		$("#"+self.adm3).change(function(){
			self.selectedADM4Index=self.selectedADM5Index=-1;
			self.selectedADM3Text = $("#"+self.adm3+" option:selected").text();
			
			self.levels[6]=null;
			self.level=5;
			
			if(document.getElementById( self.adm3 ).selectedIndex != 0)
				self.selectedADM3Index = document.getElementById( self.adm3 ).selectedIndex;

			var geoClickText = self.levels[4][self.selectedADM3Index-1];
			self.geoClick($('a:contains("'+geoClickText+'")'));
		});
	}
}