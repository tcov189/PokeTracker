//==== Purpose: Create and display HTML elements ====//

//== Let's test the speed baby
console.time('speed test');

//== Create i element, give it the game class name, append it to header-game-block
    var headerGameIcon = document.createElement('i');
    headerGameIcon.className = 'header-game-icon__' + version;
    document.getElementsByClassName('header-game-block')[0].appendChild(headerGameIcon);

//== Creating the options for the select element
    // select element
    var select = document.getElementsByTagName("select")[0];

    // for each location, add the name to a value/text option element, then append it to the select 
    for (var b = 0, max = locationData.locations.length; b < max; b++){
        // create option element
            var routeOption = document.createElement("option");
        
        // set the value/text to the location name
            routeOption.value = locationData.locations[b].name;
            routeOption.text = locationData.locations[b].name;
        // append the option to the select element
            select.appendChild(routeOption);
    }

//== Create a function for changing the route via the select box
    function changeRoute(){    
        // Get the value of the select and set it to locationInfo
          var locationInfo = select.value;
        
        // Set the item to current_location key
          localStorage.setItem("current_location", locationInfo);    
        
        // Call generateHtml function
          generateHtml();
                
    }

//== Add change event listener for select.route-select and call changeRoute
    $('.route-select').on('change', function(){       
        changeRoute();
        changeTabs('pokemon');
    });

//== Generates the HTML on the page
function generateHtml() {    
    //= We start by getting what route the user was last on or the default route (as set in load_data.js ln 7)
        // Get the last visited location from localStorage    
            var lastLocation = localStorage.getItem('current_location');

        // Loop through the locations to find lastLocation, then set it to currentLocation to be used throughout
            for (var a = 0, arrLength = locationData.locations.length; a < arrLength ; a++) {
                if (locationData.locations[a].name === lastLocation) {
                    currentLocation = locationData.locations[a];
                    break;
                }            
            }                
    
    //= Next,we will insert the route name the header__route element with the name of the route    
        document.getElementsByClassName("header__route")[0].innerHTML = currentLocation.name;    
	
	// Var for the block-encounters div
		var blockEncountersDiv = document.getElementsByClassName('block-encounters')[0];
    
	//== Creating the Pokemon Encounters elements ==//
	
	//= First, check to see if there are any encounters
		if (currentLocation.encounters) {         			     

			//= Create the available pokemon array that will store all the available pokemon info that will be used later
			var availablePkmnArray = [];

			// If currentlocation encounters does have an area prop
			if (currentLocation.encounters.hasOwnProperty('areas')) {

				// Loop through the areas property
				$.each(currentLocation.encounters.areas, function (i, area){
					// Loop through encounters in area property
					$.each(area.encounters, function (i,encounter){
						//Loop through available_pokemon in encounters properties in area property
						$.each(encounter.available_pokemon, function (i, pokemon){
							// Push the current pokemon object in to encounters array
							availablePkmnArray.push(pokemon);
						}); 
					});
				});

			} else { // If currentlocation encounters doesn't have an area prop

				// Loop through the encounters object
				$.each(currentLocation.encounters, function (i, encounter){
					// Loop through the available_pokemon prop in encounters
					$.each(encounter.available_pokemon, function (i, pokemon){
						// Push the current pokemon object into the encounters array
						availablePkmnArray.push(pokemon);  
					});    
				});                   
			}

		//= Now we need to merge the data that is in the availablePkmnArray with data that is in the nationalDexArray
			// For each pokemon entry in the availablePkmnArray, run mergeArray
				availablePkmnArray.forEach(mergeArray);
			
			// Now that we have the function for storing the html in an array, lets use it and create the whole encounter object		

			// This Array will be used to sort the encounter methods
				var encTypeOrder = ["starter", "walking", "surfing", "fishing", "interaction", "radio", "ambush", "sos ally", "special", "gift", "island scan"];    						
				
			// Creating array that will hold the information about the encounters on the route
				var encountersInfo = [];

			// If the current Location doesn't have any areas
					if (!currentLocation.encounters.areas) {      
						
						// Loop through each encounter
						$.each(currentLocation.encounters, function (i, encounter){      
							// Create the encounterObject
							var encounterObject = {             
								'type' : encounter.type,        
								'pokemonCards' : pokemonCardsArray = []
							};                        
							
							// For each available pokemon within the encounter type, generate the html and put it into encounterObject.encounters
							$.each(encounter.available_pokemon, function(i, pokemon){   
								generatePokemonCardsArray(pokemon, encounter.type, pokemonCardsArray);
							});

							// push the encounter object into the encounterinfo array
							encountersInfo.push(encounterObject);

							// sort the array by encounter type
							encountersInfo.sort(function(a,b){
								if (a.type !== b.type) {                    
									return encTypeOrder.indexOf(a.type) > encTypeOrder.indexOf(b.type) ? 1 : -1;
								}
							});   
						});
					} else {// if currentLocation has areas
						// Loop through the encounters
						$.each(currentLocation.encounters.areas, function(i, area){
							
							// Create encounter object
							var encounterObject = {
								'area_name' : area.name,
								'area_encounters' : [] 
							};

							//For each encounter type in an area, push the type and PokemonCardArray
							$.each(area.encounters, function (i, encounter){
								encounterObject.area_encounters.push({
									'type' : encounter.type, 
									'pokemonCards' : pokemonCardsArray = [] 
								});

								// For each available pokemon within the encounter type, generate the html and put it into encounterObject.encounters
								$.each(encounter.available_pokemon, function (i, pokemon){
									generatePokemonCardsArray(pokemon, encounter.type, pokemonCardsArray);    
								});

							});   
							
							//Push it into the encounterInfo array
							encountersInfo.push(encounterObject);  

							//Sort by encountertype
							encountersInfo.sort(function(a,b){
								if (a.area_encounters.type !== b.area_encounters.type) {                    
									return encTypeOrder.indexOf(a.area_encounters.type) > encTypeOrder.indexOf(b.area_encounters.type) ? 1 : -1;
								}
							}); 
							
							// Sort by area name, making sure All is first
							encountersInfo.sort(function(a,b){
								return a.area_name > b.area_name ? 1 : -1;
							});
						});
					}
			
			// With all the information we need, let's put this sucker on the page						
					
					// Empty out the div
					blockEncountersDiv.innerHTML = '';

					// For each encounter in the encounters info array
					$.each(encountersInfo, function (i, encounter_info) {    
						// if the encounter isn't an area
						if (!encountersInfo[i].area_name) {
							
							// Append the encounter type
							blockEncountersDiv.innerHTML += '<div class="block-encounters-header"><span>'+ encounter_info.type + '</span></div>';

							// For each card in the encounters pokemonCard object
							$.each(encounter_info.pokemonCards, function (i, card){
								// Append the card
								blockEncountersDiv.innerHTML += card;								
							});            
						} else {// If encounter does have areas        
							
							// For each area encounter
							$.each(encounter_info.area_encounters, function (index, encounters){
								// Apend the encounter type with the area name next to it
								blockEncountersDiv.innerHTML += '<div class="block-encounters-header"><span>'+ encounters.type +'</span><span>'+ encounter_info.area_name + '</span></div>'; 

								// For each card in the encounters pokemonCard object
								$.each(encounters.pokemonCards, function (i, card){
									// Append the card
									blockEncountersDiv.innerHTML += card;
								});                        
							});                    
						}

					});
	
					// Add a horizontal rule before the encounter header, after the first one
					$(".block-encounters-header:nth-child(n+2)").before('<hr>');


		} else {
			blockEncountersDiv.innerHTML = '<p class="text-center">No encounters in this area<p>';
		}				

		//Revert current_location to originial value so that it can be read again if refreshed
			localStorage.setItem('current_location', currentLocation.name);
	
	// == Creating Exit Elements		
		//= Lets start by emptying out the div
		document.getElementsByClassName('block-route-paths')[0].innerHTML = '';
			
		// Loop through all of the exits
		$.each(currentLocation.exits, function (direction, loc_name) {
			// format the direction to replace any underscores with spaces
			var directionFormatted = direction.split('_').join(' ');

			
			var theExitHtml = '<div class="block-path-group block-path-group_'+ direction +'">' +
						  '<span class="block-path-group_direction">'+ directionFormatted +'</span>';
				if (typeof loc_name === 'object') {
					for (var i = 0; i < loc_name.length; i++) {
						theExitHtml += '<button class="button button_route" type="button">'+ loc_name[i] +'</button>';
					}
				} else {
					theExitHtml += '<button class="button button_route" type="button">'+ loc_name +'</button>' +
						  '</div>';   
				}      

				$('.block-route-paths').append(theExitHtml);    
		});    

//== General functions and vars ==//
    
//NeedPercent function
function needPercentSymbol(x) {
    if (typeof x === 'number') {
        return x +'%';
    } else {
        return x;
    }
}
	
//Function for merging data, pokemon arg being the value in the availablePkmnArray and index being it's position
function mergeArray(pokemon, index) {

	// Function for finding a match in the nationalDexData
	function findPokemon (nationalPokemon){
		return nationalPokemon.name === pokemon.name;
	}

	// Set the match variable to be the result of find the current pokemons data in the National Dex, and set type / form vars to undefined
	var match = nationalDexData.find(findPokemon), type, form;                        

	// If the pokemon has any forms
	if (match.forms){
		// Loop through the forms
		for (var i = 0, formsLength = match.forms.length; i < formsLength ; i++){                
			// If there is a regional form and if the form of the pokemon matches the regional form
			if (regionalForm && match.forms[i].name === regionalForm) {

				// Set type to be the type of the form
				pokemon.type = match.forms[i].type;

				//Set the to be the name of the form
				pokemon.form = match.forms[i].name;                                       
			} else { // if the pokemon has a form but it is not the regional form default to it's orginal typing
				pokemon.type = match.type;
			}
		}    
	} else { // If the pokemon doesn't have any forms
		// Set type to be that which is in it's ndex entry
		pokemon.type = match.type;
	}                    

	// Set pokemons national dex number
	pokemon.n_dex_num = match.n_dex_num;    

} // End mergeArray function   
	
//Generate pokemonCardsArray that provides the pokemon cards
	function generatePokemonCardsArray(pokemon, encounterType, array) {

		// Get version exclusive info
		var isUnavailable       = pokemon.version !== version && pokemon.version !== 'both' && pokemon.version !== undefined ? true : false; 
		var isUnavailableClass  = isUnavailable ? 'unavailable' : '';

		// Get caught status						
		var isCaught 	= pokemonHasBeenCaught(pokemon.name) ? ' caught' : '';  

		//Generate the svg title and description attribute
		var svgTitle 	= pokemonHasBeenCaught(pokemon.name) ? 'Pokemon caught!' : 'Pokemon not caught yet!';               
		var svgDesc 	= pokemonHasBeenCaught(pokemon.name) ? 'Pokeball icon with the top half of the ball colored red, indicating the Pokemon is caught' : 'Pokeball icon with the top half of the ball colored gray, indicating the Pokemon is not caught'; 

		//The pokemon-pokeball div
		var pokeballHtml = '<div class="card_pokemon-pokeball">' +
								'<i class="card_pokemon-pokeball-icon'+ isCaught +'" id="'+ pokemon.name +'">' +
									'<svg version="1.1" width="25" height="25" viewBox="0 0 25 25" aria-labelledby="title'+ pokemon.n_dex_num +' desc'+ pokemon.n_dex_num +'" role="button"><title id="title'+ pokemon.n_dex_num +'">'+ svgTitle +'</title><desc id="desc'+ pokemon.n_dex_num +'">'+ svgDesc +'</desc><path fill="#FFF" stroke="#000" stroke-width="2" stroke-miterlimit="10" d="M24 12.5C24 18.85 18.85 24 12.5 24c-4.92 0-9.11-3.09-10.75-7.42l8.57-3.29c.31.9 1.17 1.54 2.18 1.54 1.28 0 2.33-1.05 2.33-2.33 0-.31-.061-.6-.17-.88l8.55-3.3c.51 1.3.79 2.7.79 4.18z"/><path stroke="#000" stroke-width="2" stroke-miterlimit="10" d="M23.21 8.32l-8.55 3.3a2.349 2.349 0 0 0-2.16-1.45c-1.28 0-2.33 1.05-2.33 2.33 0 .28.05.54.15.79l-8.57 3.29C1.26 15.31 1 13.94 1 12.5 1 6.15 6.15 1 12.5 1c4.88 0 9.05 3.04 10.71 7.32z"/><path fill="#FFF" d="M14.83 12.5c0 1.28-1.05 2.33-2.33 2.33-1.01 0-1.87-.64-2.18-1.54-.1-.25-.15-.51-.15-.79 0-1.28 1.05-2.33 2.33-2.33.98 0 1.81.61 2.16 1.45.11.28.17.57.17.88z"/></svg>' +
								'</i>' +
							'</div>';


		// Declare the variable for the info-encounter div						
		var infoEncounterHtml = '';   

			//Determining what is in the info-encounter div
			if (encounterType !== 'gift' && encounterType !== 'starter') {

				// If pokemon has more than one rate
				if (typeof pokemon.rate === 'object'){                   
					// first put the method type in bold
					infoEncounterHtml+= '<strong>'+ pokemon.method +'</strong>';

					// then for each rate, list it's condition and the rate converted to a percent, if needed
					$.each(pokemon.rate, function(condition, rate) {										
						infoEncounterHtml+= '<span>'+ condition +': '+ needPercentSymbol(rate) +'</span>';											
					});

				} else  { // If pokemon has only one rate
					// Add the method and the rate to the html
					infoEncounterHtml+= '<span><strong>'+ pokemon.method +'</strong>: '+ needPercentSymbol(pokemon.rate) +'</span>';
				}
			} else { // If encountertype is a gift or a starter
				//Have it say from instead of a method type
				infoEncounterHtml+= '<span><strong>From:</strong>&nbsp;' + pokemon.method + '</span>';
			}

		// Set variables for the form css class and the form name that will be displayed
		var formClass 	= pokemon.form ? pokemon.form : '';
		var formName	= pokemon.form ? '<small>('+ pokemon.form +')</small>' : '';												

		// Function for creating sos div
		function generateSosDiv (sos) {
			theSosHtml = '<div class="pokemon-sos-block"><div class="text-center">S.O.S:</div>';

			if (sos.constructor !== Array) {
				theSosHtml += '<i class="sprites '+ sos +' '+ formClass +'"></i>';
			} else {
				$.each(sos, function (i, val) {
					theSosHtml += '<i class="sprites '+ val +' '+ formClass +'"></i>';
				});
			}

			theSosHtml += '</div>';

			return theSosHtml;
		}

		var levelRange = pokemon.min_level !== pokemon.max_level ? pokemon.min_level + '&ndash;'+ pokemon.max_level : pokemon.min_level;												

		var theHtml = '<div class="block-encounters-pokemon">' +
						'<div class="card card-default card_pokemon '+ isUnavailableClass +' '+ isCaught +'">' +
						pokeballHtml +
							'<div class="card_pokemon-info">';
							if (isUnavailable) {
								theHtml += '<span class="text-center">Not in ' + gameVersion + '</span>';
							}
							theHtml +=   '<div class="pokemon-info-bio">' +
									'<div class="pokemon-info-bio-name-sprite">' +
										'<i class="sprites '+ pokemon.name +' '+ formClass +'"></i>' +
										'<span class="pokemon-bio-name">'+ pokemon.name; 
										if (formName){theHtml += formName;}
									theHtml += '</span></div>'+
									'<div class="pokemon-bio-types">';
										for (var i = 0, max = pokemon.type.length; i < max; i++) {
											theHtml += '<i class="type-icon '+ pokemon.type[i].toLowerCase() +' "></i>'; 	
										}   
									theHtml += '</div>' +
								'</div>' +
								'<div class="pokemon-info-encounter">' +
									'<div class="pokemon-rate-block">' +
										infoEncounterHtml +
									'</div>';
										if (gameVersionGroup === 'sun-moon' && pokemon.sos){
											theHtml += generateSosDiv(pokemon.sos);
										} 
									theHtml += '<div class="pokemon-levels-block">' +
										'<span class="level-range">Lvl: '+ levelRange +'</span>' +
									'</div>'+
								'</div>' +
							'</div>' +
						'</div>' +
					  '</div>';

		array.push(theHtml);               
	} // End generatePokemonCardsArray function
					
}// End generateHtml function

 //Generate Html on document.ready
$().ready(function(){
   generateHtml(); 
});

//Set new current location to button click
$('body').on('click', '.button_route', function(){
    newLocation = $(this).text();
    localStorage.setItem('current_location', newLocation);
    generateHtml();   
});
console.timeEnd('speed test');