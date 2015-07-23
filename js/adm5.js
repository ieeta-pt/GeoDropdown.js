var adm5Element;
var selectedADM5Index;
var selectedADM5Text;
function populateADM5(self){
	// ADM5 View
	$("#"+self.country).show();
	$("#"+self.adm1).show();
	$("#"+self.adm2).show();
	$("#"+self.adm3).show();
	$("#"+self.adm4).show();
	$("#"+self.adm5).show();

	adm5Element = document.getElementById( self.adm5 );

	adm5Element.length=1;
	if(self.selectedADM5Index == -1){
		adm5Element.options[0] = new Option('Select ADM5','');
		adm5Element.selectedIndex = 0;
	}
	else adm5Element.options[0] = new Option(stripGCode(self.levels[6][self.selectedADM5Index-1]),stripGCode(self.levels[6][self.selectedADM5Index-1]));
	for(i=0,x=self.levels[6].length;i<x;i++){
	 	adm5Element.options[adm5Element.length] = new Option(stripGCode(self.levels[6][i]),stripGCode(self.levels[6][i]));
	}

	self.names = new Array;
	self.geoParent.append('<ol>'+self.g.join('')+'</ol>');

	// Assigned all cities.
	$("#"+self.adm5).change(function(){
		selectedADM5Text = $("#"+self.adm5+" option:selected").text();
		
		if(document.getElementById( self.adm5 ).selectedIndex != 0)
			self.selectedADM5Index = document.getElementById( self.adm5 ).selectedIndex;
	});
}