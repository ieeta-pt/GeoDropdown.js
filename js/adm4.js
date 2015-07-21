function populateADM4(continentElementId, countryElementId, adm1ElementId, adm2ElementId, adm3ElementId, adm4ElementId, adm5ElementId){
	var adm4Element;
	var selectedADM4Index;
	var selectedADM4Text;

	// ADM4 View
	$("#"+countryElementId).show();
	$("#"+adm1ElementId).show();
	$("#"+adm2ElementId).show();
	$("#"+adm3ElementId).show();
	$("#"+adm4ElementId).show();
	$("#"+adm5ElementId).hide();

	adm4Element = document.getElementById( adm4ElementId );
	if(document.getElementById( adm4ElementId ).selectedIndex != 0)
		selectedADM4Index = document.getElementById( adm4ElementId ).selectedIndex;

	adm4Element.length=1;
	if(selectedADM4Index == -1){
		adm4Element.options[0] = new Option('Select ADM4','');
		adm4Element.selectedIndex = 0;
	}
	else adm4Element.options[0] = new Option(stripGCode(levels[5][selectedADM4Index-1]),stripGCode(levels[5][selectedADM4Index-1]));
	
	for(i=0,x=levels[5].length;i<x;i++)
	 	adm4Element.options[adm4Element.length] = new Option(stripGCode(levels[5][i]),stripGCode(levels[5][i]));

	names = new Array;
	geoParent.append('<ol>'+g.join('')+'</ol>');

	// Assigned all cities.
	if(validData(levels[6],6)) populateADM5(continentElementId, countryElementId, adm1ElementId, adm2ElementId, adm3ElementId, adm4ElementId, adm5ElementId);
	if( adm5ElementId ){
		$("#"+adm4ElementId).change(function(){
			selectedADM5Index=-1;
			selectedADM4Text = $("#"+adm4ElementId+" option:selected").text();
			level=6;
			geoClick($('a:contains("'+selectedADM4Text+'")'));
		});
	}
}