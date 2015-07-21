function populateADM1(continentElementId, countryElementId, adm1ElementId, adm2ElementId, adm3ElementId, adm4ElementId, adm5ElementId){
	var adm1Element;
	var selectedADM1Index;
	var selectedADM1Text;

	// ADM1 View
	$("#"+countryElementId).show();
	$("#"+adm1ElementId).show();
	$("#"+adm2ElementId).hide();
	$("#"+adm3ElementId).hide();
	$("#"+adm4ElementId).hide();
	$("#"+adm5ElementId).hide();

	adm1Element = document.getElementById( adm1ElementId );
	if(document.getElementById( adm1ElementId ).selectedIndex != 0)
		selectedADM1Index = document.getElementById( adm1ElementId ).selectedIndex;
	adm1Element.length=1;
	if(selectedADM1Index == -1){
		adm1Element.options[0] = new Option('Select ADM1','');
		adm1Element.selectedIndex = 0;
	}
	else adm1Element.options[0] = new Option(stripGCode(levels[2][selectedADM1Index-1]),stripGCode(levels[2][selectedADM1Index-1]));
	
	// Fill the dropdown
	for(i=0,x=levels[2].length;i<x;i++)
	 	adm1Element.options[adm1Element.length] = new Option(stripGCode(levels[2][i]),stripGCode(levels[2][i]));

	names = new Array;
	geoParent.append('<ol>'+g.join('')+'</ol>');
	// Assigned all regions. Now assign event listener for the states.
	if(validData(levels[3],3)) populateADM2(continentElementId, countryElementId, adm1ElementId, adm2ElementId, adm3ElementId, adm4ElementId, adm5ElementId);
	if( adm2ElementId ){
		$("#"+adm1ElementId).change(function(){
			selectedADM2Index=selectedADM3Index=selectedADM4Index=selectedADM5Index=-1;
			selectedADM1Text = $("#"+adm1ElementId+" option:selected").text();
			levels[4]=levels[5]=levels[6]=null;
			level=3;
			geoClick($('a:contains("'+selectedADM1Text+'")'));
		});
	}
}