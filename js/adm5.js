function populateADM5(continentElementId, countryElementId, adm1ElementId, adm2ElementId, adm3ElementId, adm4ElementId, adm5ElementId){
	var adm5Element;
	var selectedADM5Index;
	var selectedADM5Text;

	// ADM5 View
	$("#"+countryElementId).show();
	$("#"+adm1ElementId).show();
	$("#"+adm2ElementId).show();
	$("#"+adm3ElementId).show();
	$("#"+adm4ElementId).show();
	$("#"+adm5ElementId).show();

	adm5Element = document.getElementById( adm5ElementId );
	
	if(document.getElementById( adm5ElementId ).selectedIndex != 0)
		selectedADM5Index = document.getElementById( adm5ElementId ).selectedIndex;

	adm5Element.length=1;
	if(selectedADM5Index == -1){
		adm5Element.options[0] = new Option('Select ADM5','');
		adm5Element.selectedIndex = 0;
	}
	else adm5Element.options[0] = new Option(stripGCode(levels[6][selectedADM5Index-1]),stripGCode(levels[6][selectedADM5Index-1]));
	for(i=0,x=levels[6].length;i<x;i++){
	 	adm3Element.options[adm5Element.length] = new Option(stripGCode(levels[6][i]),stripGCode(levels[6][i]));
	}

	names = new Array;
	geoParent.append('<ol>'+g.join('')+'</ol>');

	// Assigned all cities.
	$("#"+adm5ElementId).change(function(){
		selectedADM5Text = $("#"+adm5ElementId+" option:selected").text();
		geoClick($('a:contains("'+selectedADM5Text+'")'));
	});
}