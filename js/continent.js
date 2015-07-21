function populateContinents(continentElementId, countryElementId, adm1ElementId, adm2ElementId, adm3ElementId, adm4ElementId, adm5ElementId){
	var continentElement;
	var selectedContinentIndex;
	var selectedContinentText;

	// Continent View
	$("#"+countryElementId).hide();
	$("#"+adm1ElementId).hide();
	$("#"+adm2ElementId).hide();
	$("#"+adm3ElementId).hide();
	$("#"+adm4ElementId).hide();
	$("#"+adm5ElementId).hide();

	// given the id of the <select> tag as function argument, it inserts <option> tags
	continentElement = document.getElementById(continentElementId);
	selectedContinentIndex = document.getElementById( continentElementId ).selectedIndex;

	if(selectedContinentIndex == -1){
		continentElement.length=0;	
		continentElement.options[0] = new Option('Select Continent','');
		continentElement.selectedIndex = 0;

		for(i=0,x=levels[0].length;i<x;i++)
	 		continentElement.options[continentElement.length] = new Option(stripGCode(levels[0][i]),stripGCode(levels[0][i]));
	}
	names = new Array;
	geoParent.append('<ol>'+g.join('')+'</ol>');

	// Assigned all continents. Now assign event listener for the countries.
	if(validData(levels[1],1)) populateCountries(continentElementId, countryElementId, adm1ElementId, adm2ElementId, adm3ElementId, adm4ElementId, adm5ElementId);
	if( countryElementId ){
		 $("#"+continentElementId).change(function(){
			selectedCountryIndex=selectedADM1Index=selectedADM2Index=selectedADM3Index=selectedADM4Index=selectedADM5Index=-1;
			selectedContinentText = $("#"+continentElementId+" option:selected").text();
			levels[2]=levels[3]=levels[4]=levels[5]=levels[6]=null;
			level=1;
			console.log($('a:contains("'+selectedContinentText+'")'));
			geoClick($('a:contains("'+selectedContinentText+'")'));
		});
	}
}