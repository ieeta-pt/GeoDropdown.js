var adm5Element;
var selectedADM5Index;
var selectedADM5Text;
function populateADM5(self,instanceLocal){
	// ADM5 View
	$('select[id="' + self.country + '"]').show();
	$('select[id="' + self.adm1 + '"]').show()
	$('select[id="' + self.adm2 + '"]').show()
	$('select[id="' + self.adm3 + '"]').show()
	$('select[id="' + self.adm4 + '"]').show()
	$('select[id="' + self.adm5 + '"]').show()

	adm5Element = document.getElementById( self.adm5 );

	adm5Element.length=1;

	if(self.selectedADM5Index < 0){
		
		if(self.answer!=undefined && JSON.parse(self.answer)[0]['adm5'] && self.selectedADM5Index==-2){
			adm5Element.options[0] = new Option(stripGCode(JSON.parse(self.answer)[0]['adm5']),'');
			self.selectedADM5Text = JSON.parse(self.answer)[0]['adm5'];
		}
		else{
			adm5Element.options[0] = new Option('Select ADM5','');
			adm5Element.selectedIndex = 0;
		}
	}

	// If there is a selected item put it at the top of the dropdown
	else adm5Element.options[0] = new Option(stripGCode(self.levels[6][self.selectedADM5Index-1]),stripGCode(self.levels[6][self.selectedADM5Index-1]));
	// Fill the dropdown
	for(i=0,x=self.levels[6].length;i<x;i++){
	 	if(self.webservice=="childrenJSON") adm5Element.options[adm5Element.length] = new Option(stripGCode(self.levels[6][i]),stripGCode(self.levels[6][i]));
	 	else adm5Element.options[adm5Element.length] = new Option(self.levels[6][i]['name'],self.levels[6][i]['name']);
	}

	self.names = new Array;
	if(self.webservice=="childrenJSON") self.geoParent.append('<ol>'+self.g.join('')+'</ol>');

	// Assigned all adm5.
	$('select[id="' + self.adm5 + '"]').change(function(){
		selectedADM5Text = $('select[id="' + self.adm5 + '"] option:selected').text();
		
		if(document.getElementById( self.adm5 ).selectedIndex != 0)
			self.selectedADM5Index = document.getElementById( self.adm5 ).selectedIndex;

		instanceLocal.fire(
			'changeVal', 
			{ continent:self.selectedContinentText,country:getCountryName(self.selectedCountryText),adm1:self.selectedADM1Text,adm2:self.selectedADM2Text,adm3:self.selectedADM3Text,adm4:self.selectedADM4Text,adm5:self.selectedADM5Text }
		);
	});
}