//==== Purpose: Create and display HTML elements ====//

//Header display elements
$('.header-game-block img').addClass('header-game-icon__'+ gameVersionGroup).attr('src','images/pokemon-'+ version +'-logo.png');

$('.header-game-block span').text(gameVersion)

//Create empty array to store caught Pokemon
if (localStorage.getItem('pokemon_caught') == null){
    var pkmnCaughtArr = [];
    localStorage.setItem('pokemon_caught', JSON.stringify(pkmnCaughtArr));
} else {
    pkmnCaughtArr  = JSON.parse(localStorage.getItem('pokemon_caught'));
} 

function generateHtml() {
    
    //Get last visited location
    var lastLocation = localStorage.getItem('current_location');
    
    //Getting the last location the player visited so that when they come back it will be the first screen they see
    $.each(locationData.locations, function (direction, loc_name){
        if (loc_name.name == lastLocation) {                
            currentLocationData = loc_name;
        }
    })
    //Merging Data
    var encounterArray = [];
    
    //Loop through all available encounters and put them into an array
    if (gameVersionGroup !== 'sun-moon') {
        $.each(currentLocationData.encounters, function (i, encounters){
            $.each(encounters.available_pokemon, function (i,val){
              encounterArray.push(val);  
            })    
        });
    } else {
        $.each(currentLocationData.encounters.areas, function (i, area_encounters){
            $.each(area_encounters.encounters[i].available_pokemon, function (i,val){
                encounterArray.push(val);  
            })    
        });
    }

    //Function for merging data
    function mergeArray(pokemon, index) {
        function findPokemon (nationalPokemon){
            return nationalPokemon.name == pokemon.name;
        }

        var match   = nationalDexData.find(findPokemon);
        var type    = match.type;
        var nDexNum = match.n_dex_num;
        pokemon["type"] = type;    
        pokemon["n_dex_num"] = nDexNum;    
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
$('.block-route-header h3').text(currentLocationData.name);

//Exits
exitInfo = [];
    
$.each(currentLocationData.exits, function (direction, loc_name) {
    var theHtml = '<div class="block-path-group">' +
                  '<span class="block-path-group_direction">'+ direction +'</span>';
        if (typeof loc_name == 'object') {
            for (var i = 0; i < loc_name.length; i++) {
                theHtml += '<button class="button button_route" type="button">'+ loc_name[i] +'</button>';
            }
        } else {
            theHtml += '<button class="button button_route" type="button">'+ loc_name +'</button>' +
                  '</div>';   
        }      
    exitInfo.push(theHtml);
});

//If there are already buttons, remove them
if ($('.block-route-paths').html().length > 0) {
    $('.block-route-paths').empty();
}

$.each(exitInfo, function(i, html){
    $('.block-route-paths').append(html);
});

    
//Encounters
encountersInfo = [];

//Sorting array by national dex number 
if (currentLocationData.encounters != null){
    
    if (gameVersionGroup !== 'sun-moon') {
        $.each(currentLocationData.encounters, function (i, elem){
            sortByKey(elem.available_pokemon, 'n_dex_num');
        })   
    } else {
        $.each(currentLocationData.encounters.areas, function (i, elem) {
            sortByKey(elem.encounters[i].available_pokemon, 'n_dex_num');
        })
    }        
}

$.each(currentLocationData.encounters, function (i, encounter){      
    var encounterObject = {
        'type' : encounter.type,        
        'encounters' : encounterArr = []
    };                        
    
    $.each(encounter.available_pokemon, function(i, pokemon){   
        theRateHtml = '';
        function needPercentSymbol(x) {
            if (typeof x == 'number') {
                return x +'%';
            } else {
                return x;
            }
        }
        
        if (encounter.type != 'gift' && encounter.type != 'starter') {
                            
            if (typeof pokemon.rate == 'object'){                   
                theRateHtml+= '<strong>'+ pokemon.method +'</strong>';
                $.each(this.rate, function(time, rate) {
                    if (rate != null) {
                        if (typeof rate != 'object') {
                         theRateHtml+= '<span>'+ time +': '+ needPercentSymbol(rate) +'</span>'     
                        }  else {
                            theRateHtml += '<span>'+ time + ':</span>';
                            $.each(rate, function (game, rate){                             
                                    theRateHtml += '<span style="margin-left: 5px;">'+ game +': '+ needPercentSymbol(rate) +'</span>';                     
                            })                         
                        }                      
                    }
                })                                        
            } else  {
                theRateHtml+= '<span><strong>'+ pokemon.method +'</strong>: '+ needPercentSymbol(pokemon.rate) +'</span>';
            }
        } else {
            theRateHtml+= '<span><strong>From:</strong>&nbsp;' + pokemon.method + '</span>';
        }
        
        //Get version exclusive info
        var isUnavailable       = pokemon.version != version && pokemon.version != 'both' && pokemon.version != undefined ? true : false; 
        var isUnavailableClass  = isUnavailable ? 'unavailable' : '';
        
        
        var levelRange = pokemon.min_level != pokemon.max_level ? pokemon.min_level + '&ndash;'+ pokemon.max_level : pokemon.min_level;

        var isCaught = $.inArray(pokemon.name, pkmnCaughtArr) !== -1 ? ' caught' : '';                            
        var theHtml = '<div class="block-encounters-pokemon">' +
                          '<div class="card card-default card_pokemon '+ isUnavailableClass +'">' +
                            '<div class="card_pokemon-pokeball">' +
                                '<i class="card_pokemon-pokeball-icon'+ isCaught +'" id="'+ pokemon.name +'"></i>' +
                            '</div>' +
                            '<div class="card_pokemon-info">';
                            if (isUnavailable) {
                                theHtml += '<span class="text-center">Not in ' + gameVersion + '</span>';
                            }
                            theHtml +=   '<div class="pokemon-info-bio">' +
                                    '<div class="pokemon-info-bio-name-sprite">' +
                                        '<i class="sprites '+ pokemon.name +'"></i>' +
                                        '<span class="pokemon-bio-name">'+ pokemon.name +'</span>' +
                                    '</div>'+
                                    '<div class="pokemon-bio-types">';
                                       $.each(pokemon.type, function (i, type){
                                           theHtml += '<i class="type-icon '+ type.toLowerCase() +' "></i>'; 
                                       })
                                    theHtml += '</div>' +
                                '</div>' +
                                '<hr>' +
                                '<div class="pokemon-info-rates">' +
                                    '<div class="pokemon-rate-block">' +
                                        theRateHtml +
                                    '</div>'+
                                    '<div class="pokemon-levels-block">' +
                                        '<span class="level-range">Lvl: '+ levelRange +'</span>' +
                                    '</div>'+
                                '</div>' +
                            '</div>' +
                          '</div>' +
                        '</div>';

            encounterArr.push({'html' : theHtml, 'method' : pokemon.method, 'name' : pokemon.name, 'national_dex' : pokemon.n_dex_num })                
    })
       
    encountersInfo.push(encounterObject)  
     
    var encTypeOrder = ["starter", "walking", "surfing", "fishing", "interaction", "gift"];
        
    encountersInfo.sort(function(a,b){
        if (a.type != b.type) {                    
            return encTypeOrder.indexOf(a.type) > encTypeOrder.indexOf(b.type) ? 1 : -1;
        }
    });   
        
});

//Check to see if info exsists, delete
$('.block-encounters').empty();
    
$.each(encountersInfo, function (i, encounter_info) {
    $('.block-encounters').append('<h3>'+ encounter_info.type + '</h3>');

    $.each(encounter_info.encounters, function (i, info){
        $('.block-encounters').append(info.html);  
    })            
});

if (currentLocationData.encounters == null) {
    $('.block-encounters').append('<p class="text-center">No encounters in this area<p>');
}

//Revert current_location to originial value so that it can be read again if refreshed
localStorage.setItem('current_location', currentLocationData.name);

console.log(currentLocationData);
}