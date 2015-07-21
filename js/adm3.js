function populateADM3(continentElementId, countryElementId, adm1ElementId, adm2ElementId, adm3ElementId, adm4ElementId, adm5ElementId){
	var adm3Element;
	var selectedADM3Index;
	var selectedADM3Text;

	// ADM3 View
	$("#"+countryElementId).show();
	$("#"+adm1ElementId).show();
	$("#"+adm2ElementId).show();
	$("#"+adm3ElementId).show();
	$("#"+adm4ElementId).hide();
	$("#"+adm5ElementId).hide();

	adm3Element = document.getElementById( adm3ElementId );
	if(document.getElementById( adm3ElementId ).selectedIndex != 0)
		selectedADM3Index = document.getElementById( adm3ElementId ).selectedIndex;

	adm3Element.length=1;
	if(selectedADM3Index == -1){
		adm3Element.options[0] = new Option('Select ADM3','');
		adm3Element.selectedIndex = 0;
	}
	else adm3Element.options[0] = new Option(stripGCode(levels[4][selectedADM3Index-1]),stripGCode(levels[4][selectedADM3Index-1]));
	
	for(i=0,x=levels[4].length;i<x;i++)
	 	adm3Element.options[adm3Element.length] = new Option(stripGCode(levels[4][i]),stripGCode(levels[4][i]));

	names = new Array;
	geoParent.append('<ol>'+g.join('')+'</ol>');

	// Assigned all cities.
	if(validData(levels[5],5)) populateADM4(continentElementId, countryElementId, adm1ElementId, adm2ElementId, adm3ElementId, adm4ElementId, adm5ElementId);
	if( adm4ElementId ){
		$("#"+adm3ElementId).change(function(){
			selectedADM4Index=selectedADM5Index=-1;
			selectedADM3Text = $("#"+adm3ElementId+" option:selected").text();
			levels[6]=null;
			level=5;
			geoClick($('a:contains("'+selectedADM3Text+'")'));
		});
	}
}