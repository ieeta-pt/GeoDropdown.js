function populateCountries(continentElementId, countryElementId, adm1ElementId, adm2ElementId, adm3ElementId, adm4ElementId, adm5ElementId){
	var countryElement;
	var selectedCountryIndex;
	var selectedCountryText;

	// Country View
	$("#"+countryElementId).show();
	$("#"+adm1ElementId).hide();
	$("#"+adm2ElementId).hide();
	$("#"+adm3ElementId).hide();
	$("#"+adm4ElementId).hide();
	$("#"+adm5ElementId).hide();

	countryElement = document.getElementById( countryElementId );
	if(document.getElementById( countryElementId ).selectedIndex != 0)
		selectedCountryIndex = document.getElementById( countryElementId ).selectedIndex;

	countryElement.length=1;
	// init country dropdown list
	if(selectedCountryIndex == -1){
		countryElement.options[0] = new Option('Select Country','');
		countryElement.selectedIndex = 0;
		// Get all correct country names
		for(i=0,x=levels[1].length;i<x;i++) levels[1][i] = getCountryName(levels[1][i].substring(levels[1][i].length-2,levels[1][i].length))
		levels[1] = $.unique(levels[1]).sort();
	}
	// If there is a selected item put it at the top of the dropdown
	else countryElement.options[0] = new Option(levels[1][selectedCountryIndex-1],levels[1][selectedCountryIndex-1]);
	// Fill the dropdown
	for(i=0,x=levels[1].length;i<x;i++)
	 	countryElement.options[countryElement.length] = new Option(levels[1][i],levels[1][i]);

	names = new Array;
	geoParent.append('<ol>'+g.join('')+'</ol>');
	// Assigned all countries. Now assign event listener for the regions.
	if(validData(levels[2],2)) populateADM1(continentElementId, countryElementId, adm1ElementId, adm2ElementId, adm3ElementId, adm4ElementId, adm5ElementId); 
	if( adm1ElementId ){
		$("#"+countryElementId).change(function(){
			// Ask for country code again, in order to execute geoClick
			selectedCountryText = getCountryCode(isoCountries,$("#"+countryElementId+" option:selected").text());
			selectedADM1Index=selectedADM2Index=selectedADM3Index=selectedADM4Index=selectedADM5Index=-1;
			levels[3]=levels[4]=levels[5]=levels[6]=null;
			level=2;
			if(selectedCountryText != 'Antarctica')
				geoClick($('a:contains("'+selectedCountryText+'")'));
		});
	}
}