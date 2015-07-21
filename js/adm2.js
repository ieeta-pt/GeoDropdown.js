function populateADM2(continentElementId, countryElementId, adm1ElementId, adm2ElementId, adm3ElementId, adm4ElementId, adm5ElementId){
	var adm2Element;
	var selectedADM2Index;
	var selectedADM2Text;

	// ADM2 View
	$("#"+countryElementId).show();
	$("#"+adm1ElementId).show();
	$("#"+adm2ElementId).show();
	$("#"+adm3ElementId).hide();
	$("#"+adm4ElementId).hide();
	$("#"+adm5ElementId).hide();

	adm2Element = document.getElementById( adm2ElementId );
	if(document.getElementById( adm2ElementId ).selectedIndex != 0)
		selectedADM2Index = document.getElementById( adm2ElementId ).selectedIndex;

	adm2Element.length=1;
	if(selectedADM2Index == -1){
		adm2Element.options[0] = new Option('Select ADM2','');
		adm2Element.selectedIndex = 0;
	}
	else adm2Element.options[0] = new Option(stripGCode(levels[3][selectedADM2Index-1]),stripGCode(levels[3][selectedADM2Index-1]));
	
	for(i=0,x=levels[3].length;i<x;i++)
	 	adm2Element.options[adm2Element.length] = new Option(stripGCode(levels[3][i]),stripGCode(levels[3][i]));

	names = new Array;
	geoParent.append('<ol>'+g.join('')+'</ol>');
	// Assigned all states. Now assign event listener for the cities.
	if(validData(levels[4],4)) populateADM3(continentElementId, countryElementId, adm1ElementId, adm2ElementId, adm3ElementId, adm4ElementId, adm5ElementId);
	if( adm3ElementId )
	{
		$("#"+adm2ElementId).change(function(){
			selectedADM3Index=selectedADM4Index=selectedADM5Index=-1;
			selectedADM2Text = $("#"+adm2ElementId+" option:selected").text();
			levels[5]=levels[6]=null;
			level=4;
			geoClick($('a:contains("'+selectedADM2Text+'")'));
		});
	}
}