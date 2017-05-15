//==== Purpose: Create and display HTML elements ====//

//Header display elements
$('.header-game-block').html('<i class="header-game-icon__'+ version +'"></i>');

//Create empty array to store caught Pokemon
if (!localStorage.getItem('pokemon_caught')){
    var pkmnCaughtArr = [];
    localStorage.setItem('pokemon_caught', JSON.stringify(pkmnCaughtArr));
}     

function generateHtml() {
    
    //Get last visited location
    var lastLocation = localStorage.getItem('current_location');
    
    //Getting the last location the player visited so that when they come back it will be the first screen they see
    $.each(locationData.locations, function (direction, loc_name){
        if (loc_name.name === lastLocation) {                
            currentLocationData = loc_name;
        }
    });
    
    //Merging Data
    var encounterArray = [];
    
    //Loop through all available encounters and put them into an array if there are encounters
    if (currentLocationData.encounters !== null) {
    
        if (!currentLocationData.encounters.hasOwnProperty('areas')) {
            $.each(currentLocationData.encounters, function (i, encounters){
                $.each(encounters.available_pokemon, function (i,val){
                  encounterArray.push(val);  
                });    
            });
        } else {
            $.each(currentLocationData.encounters.areas, function (i, area_encounters){
                $.each(area_encounters.encounters, function (i,val){
                    $.each(val.available_pokemon, function (index, elem){
                        encounterArray.push(elem);
                    }); 
                });
            });
        }
    }
    //Function for merging data
    function mergeArray(pokemon, index) {
        function findPokemon (nationalPokemon){
            return nationalPokemon.name === pokemon.name;
        }

        var match   = nationalDexData.find(findPokemon);
        var type;
        var form;
        
        
        // Check to see if the pokemon has any forms
        if(match.forms){
            // Loop through the forms
            for (var i = 0; i < match.forms.length; i++){                
                // Apply type and name of regional form if there is one
                if (regionalForm) {
                    if (match.forms[i].name === regionalForm) {
                        type = match.forms[i].type;
                        form = match.forms[i].name;       
                    }                    
                }
            }    
        }
        
        
        if (pokemon.form){ //see if mon has form
            for (var j = 0; j < match.forms.length; j++){
                if (match.forms[j].name === pokemon.form) {
                    type = match.forms[j].type;
                    form = match.forms[j].name;       
                }
            }                        
        } else if (!type){            
            type    = match.type;   
        }     
        
        var nDexNum = match.n_dex_num;
        
        pokemon.type = type;    
        pokemon.form = form;
        pokemon.n_dex_num = nDexNum;    
    }

    encounterArray.forEach(mergeArray);

    function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }




//Populate the HTML                                        

//Route header
$('.header__route').text(currentLocationData.name);

//Exits

//If there are already buttons, remove them
if ($('.block-route-paths').html().length > 0) {
    $('.block-route-paths').empty();
}

    
$.each(currentLocationData.exits, function (direction, loc_name) {    
    var directionFormatted = direction.split('_').join(' ');
    
    var theHtml = '<div class="block-path-group block-path-group_'+ direction +'">' +
                  '<span class="block-path-group_direction">'+ directionFormatted +'</span>';
        if (typeof loc_name === 'object') {
            for (var i = 0; i < loc_name.length; i++) {
                theHtml += '<button class="button button_route" type="button">'+ loc_name[i] +'</button>';
            }
        } else {
            theHtml += '<button class="button button_route" type="button">'+ loc_name +'</button>' +
                  '</div>';   
        }      
        
        $('.block-route-paths').append(theHtml);    
});
    
//Encounters
encountersInfo = [];

//Sorting array by national dex number 
if (currentLocationData.encounters !== null){
    
    if (!currentLocationData.encounters.hasOwnProperty('areas')) {
        $.each(currentLocationData.encounters, function (i, elem){
            sortByKey(elem.available_pokemon, 'n_dex_num');
        }); 
    } else {
        $.each(currentLocationData.encounters.areas, function (i, elem) {
            $.each(elem.encounters.available_pokemon, function (index, pokemon){
                sortByKey(elem.encounters[i].available_pokemon, 'n_dex_num');
            });            
        });
    }        
}

//General functions and vars
    
//NeedPercent function
function needPercentSymbol(x) {
    if (typeof x === 'number') {
        return x +'%';
    } else {
        return x;
    }
}
    
//Generate EncounterArr
function generateEncounterArr(pokemon, encounter) {
    theRateHtml = '';            

    if (encounter.type !== 'gift' && encounter.type !== 'starter') {

        if (typeof pokemon.rate === 'object'){                   
            theRateHtml+= '<strong>'+ pokemon.method +'</strong>';

            $.each(pokemon.rate, function(time, rate) {
                if (rate !== null) {
                    if (typeof rate !== 'object') {
                     theRateHtml+= '<span>'+ time +': '+ needPercentSymbol(rate) +'</span>';
                    }  else {
                        theRateHtml += '<span>'+ time + ':</span>';
                        $.each(rate, function (game, rate){                             
                                theRateHtml += '<span style="margin-left: 5px;">'+ game +': '+ needPercentSymbol(rate) +'</span>';                     
                        });
                    }
                }
            });                                     
        } else  {
            theRateHtml+= '<span><strong>'+ pokemon.method +'</strong>: '+ needPercentSymbol(pokemon.rate) +'</span>';
        }
    } else {
        theRateHtml+= '<span><strong>From:</strong>&nbsp;' + pokemon.method + '</span>';
    }

    //Encounter type order    
    encTypeOrder = ["starter", "walking", "surfing", "fishing", "interaction", "radio", "ambush", "special", "gift", "island scan"];    

    //Get version exclusive info
    var isUnavailable       = pokemon.version !== version && pokemon.version !== 'both' && pokemon.version !== undefined ? true : false; 
    var isUnavailableClass  = isUnavailable ? 'unavailable' : '';

    var formClass;
    var formName;
    
    if (pokemon.form) {
        formClass = pokemon.form;    
        formName = '<small>('+ pokemon.form +')</small>';
    }
    
    var sosEncounters;
    var generateSosDiv;
    
    if (gameVersionGroup === "sun-moon" && pokemon.sos) {
        sosEncounters = pokemon.sos;

        generateSosDiv = function (sos) {
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
        };
    }
    
    var levelRange = pokemon.min_level !== pokemon.max_level ? pokemon.min_level + '&ndash;'+ pokemon.max_level : pokemon.min_level;
    
    pkmnCaughtArr  = JSON.parse(localStorage.getItem('pokemon_caught'));
    var isCaught = $.inArray(pokemon.name, pkmnCaughtArr) !== -1 ? ' caught' : '';                            
    var svgTitle = $.inArray(pokemon.name, pkmnCaughtArr) !== -1 ? 'Pokemon caught!' : 'Pokemon not caught yet!';               
    var svgDesc = $.inArray(pokemon.name, pkmnCaughtArr) !== -1 ? 'Pokeball icon with the top half of the ball colored red, indicating the Pokemon is caught' : 'Pokeball icon with the top half of the ball colored gray, indicating the Pokemon is not caught'; 
    
    var theHtml = '<div class="block-encounters-pokemon">' +
                      '<div class="card card-default card_pokemon '+ isUnavailableClass +' '+ isCaught +'">' +
                        '<div class="card_pokemon-pokeball">' +
                            '<i class="card_pokemon-pokeball-icon'+ isCaught +'" id="'+ pokemon.name +'">' +
                                '<svg version="1.1" width="25" height="25" viewBox="0 0 25 25" aria-labelledby="title'+ pokemon.n_dex_num +' desc'+ pokemon.n_dex_num +'" role="button"><title id="title'+ pokemon.n_dex_num +'">'+ svgTitle +'</title><desc id="desc'+ pokemon.n_dex_num +'">'+ svgDesc +'</desc><path fill="#FFF" stroke="#000" stroke-width="2" stroke-miterlimit="10" d="M24 12.5C24 18.85 18.85 24 12.5 24c-4.92 0-9.11-3.09-10.75-7.42l8.57-3.29c.31.9 1.17 1.54 2.18 1.54 1.28 0 2.33-1.05 2.33-2.33 0-.31-.061-.6-.17-.88l8.55-3.3c.51 1.3.79 2.7.79 4.18z"/><path stroke="#000" stroke-width="2" stroke-miterlimit="10" d="M23.21 8.32l-8.55 3.3a2.349 2.349 0 0 0-2.16-1.45c-1.28 0-2.33 1.05-2.33 2.33 0 .28.05.54.15.79l-8.57 3.29C1.26 15.31 1 13.94 1 12.5 1 6.15 6.15 1 12.5 1c4.88 0 9.05 3.04 10.71 7.32z"/><path fill="#FFF" d="M14.83 12.5c0 1.28-1.05 2.33-2.33 2.33-1.01 0-1.87-.64-2.18-1.54-.1-.25-.15-.51-.15-.79 0-1.28 1.05-2.33 2.33-2.33.98 0 1.81.61 2.16 1.45.11.28.17.57.17.88z"/></svg>' +
                            '</i>' +
                        '</div>' +
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
                                   $.each(pokemon.type, function (i, type){
                                       theHtml += '<i class="type-icon '+ type.toLowerCase() +' "></i>'; 
                                   });
                                theHtml += '</div>' +
                            '</div>' +
                            '<div class="pokemon-info-rates">' +
                                '<div class="pokemon-rate-block">' +
                                    theRateHtml +
                                '</div>';
                                    if (gameVersionGroup === 'sun-moon' && pokemon.sos){
                                        theHtml += generateSosDiv(sosEncounters);
                                    } 
                                theHtml += '<div class="pokemon-levels-block">' +
                                    '<span class="level-range">Lvl: '+ levelRange +'</span>' +
                                '</div>'+
                            '</div>' +
                        '</div>' +
                      '</div>' +
                    '</div>';

    encounterArr.push({'html' : theHtml, 'method' : pokemon.method, 'name' : pokemon.name, 'national_dex' : pokemon.n_dex_num });               
}

if (currentLocationData.encounters !== null) {
    if (!currentLocationData.encounters.areas) {      
        
        $.each(currentLocationData.encounters, function (i, encounter){      
            var encounterObject = {             
                'type' : encounter.type,        
                'encounters' : encounterArr = []
            };                        

            $.each(encounter.available_pokemon, function(i, pokemon){   
                generateEncounterArr(pokemon, encounter);
            });

            encountersInfo.push(encounterObject);

            encountersInfo.sort(function(a,b){
                if (a.type !== b.type) {                    
                    return encTypeOrder.indexOf(a.type) > encTypeOrder.indexOf(b.type) ? 1 : -1;
                }
            });   
        });
    } else {//Seperate function for locations that 
        $.each(currentLocationData.encounters.areas, function(i, area){
            
            encounterObject = {
                'area_name' : area.name,
                'area_encounters' : [] 
            };
            
            $.each(area.encounters, function (i, encounter){
                encounterObject.area_encounters.push({ 'type' : encounter.type, 'encounters' : encounterArr = [] });

                $.each(encounter.available_pokemon, function (i, pokemon){
                    generateEncounterArr(pokemon, encounter);    
                });

            });   
             
            encountersInfo.push(encounterObject);  

            encountersInfo.sort(function(a,b){
                if (a.area_encounters.type !== b.area_encounters.type) {                    
                    return encTypeOrder.indexOf(a.area_encounters.type) > encTypeOrder.indexOf(b.area_encounters.type) ? 1 : -1;
                }
            }); 
        });
    }
}
//Check to see if info exsists, delete
$('.block-encounters').empty();
    
$.each(encountersInfo, function (i, encounter_info) {    
    if (!encountersInfo[i].area_name) {
        $('.block-encounters').append('<div class="block-encounters-header"><span>'+ encounter_info.type + '</span></div>');   
        
        $.each(encounter_info.encounters, function (i, info){
            $('.block-encounters').append(info.html);  
        });            
    } else {        
        
        $.each(encounter_info.area_encounters, function (index, encounters){
            $('.block-encounters').append('<div class="block-encounters-header"><span>'+ encounters.type +'</span><span>'+ encounter_info.area_name + '</span></div>'); 

            $.each(encounters.encounters, function (counter, elem){
              $('.block-encounters').append(elem.html);    
            });                        
        });                    
    }
    
});

$(".block-encounters-header:nth-child(n+2)").before('<hr>');

if (!currentLocationData.encounters) {
    $('.block-encounters').append('<p class="text-center">No encounters in this area<p>');
}

//Revert current_location to originial value so that it can be read again if refreshed
localStorage.setItem('current_location', currentLocationData.name);

}

 //Generate Html starting function
$().ready(function(){
   generateHtml(); 
});

//Set new current location to button click
$('body').on('click', '.button_route', function(){
    newLocation = $(this).text();
    localStorage.setItem('current_location', newLocation);
    generateHtml();
    $navTab.removeClass('active');
    $tabGroupNav.find('[data-tab=pokemon]').addClass('active');
    
    $tabGroupContent.removeClass('active');
    $tabGroup.find('[data-content=pokemon]').addClass('active');
});

    
//Generating routes
var select = $('select');

$.each(locationData.locations, function (index, location){
    $(select).append($('<option>', { 
        value: location.name,
        text : location.name 
    }));
});

//Route selector
function selectChangeRoute(){
    var locationInfo = $('select').val();
    localStorage.setItem("current_location", locationInfo);    
    generateHtml();
    $navTab.removeClass('active');
    $tabGroupNav.find('[data-tab=pokemon]').addClass('active');
    
    $tabGroupContent.removeClass('active');
    $tabGroup.find('[data-content=pokemon]').addClass('active');
}

$('.route-select').on('change', function(){
    selectChangeRoute();
});