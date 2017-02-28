//==== Purpose: Create and display HTML elements ====//

//Header display elements
$('.header-game-block img').addClass('header-game-icon__'+ gameVersionGroup).attr('src','images/pokemon-'+ version +'-logo.png');

$('.header-game-block span').text(gameVersion)


//Get last visited location
var lastLocation = localStorage.getItem('current_location');

//Get data from localStorage
regionalDexData     = JSON.parse(localStorage.getItem('regional_dex'));
nationalDexData     = JSON.parse(localStorage.getItem('national_dex'));
locationData        = JSON.parse(localStorage.getItem('locations'));


//Create empty array to store caught Pokemon
if (localStorage.getItem('pokemon_caught') == null){
    var pkmnCaughtArr = [];
    localStorage.setItem('pokemon_caught', JSON.stringify(pkmnCaughtArr));
} else {
    pkmnCaughtArr  = JSON.parse(localStorage.getItem('pokemon_caught'));
}


//Getting the last location the player visited so that when they come back it will be the first screen they see
$.each(locationData.locations, function (direction, loc_name){
    if (loc_name.name == lastLocation) {                
        currentLocationData = loc_name;
    }
})
    
//Merging Data
var encounterArray = [];

$.each(currentLocationData.encounters, function (i, encounters){
    $.each(encounters.available_pokemon, function (i,val){
      encounterArray.push(val);  
    })    
})



//Populate the HTML                                        

//Route header
$('.block-route-header h3').text(currentLocationData.name);

//Exits
exitInfo = [];
$.each(currentLocationData.exits, function (direction, loc_name) {
    var theHtml = '<div class="block-path-group">' +
                  '<span class="block-path-group_direction">'+ direction +'</span>' +
                  '<button class="button button_route" type="button">'+ loc_name +'</button>' +
                  '</div>';
    exitInfo.push(theHtml);
});
$.each(exitInfo, function(i, html){
    $('.block-route-paths').append(html);
});

//Encounters
encountersInfo = [];
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
        if (typeof pokemon.rate == 'object'){
            $.each(pokemon.rate, function(time, rate) {
                if (rate != null) {                                    
                    theRateHtml+= '<span>'+ time +': '+ needPercentSymbol(rate) +'</span>'                    
                }
            })            
        } else {
            theRateHtml+= '<span>'+ pokemon.method +': '+ needPercentSymbol(pokemon.rate) +'</span>';
        }

        var levelRange = pokemon.min_level != pokemon.max_level ? pokemon.min_level + '&ndash;'+ pokemon.max_level : pokemon.min_level;

        var isCaught = $.inArray(pokemon.name, pkmnCaughtArr) !== -1 ? ' caught' : '';                            
        var theHtml = '<div class="block-encounters-pokemon">' +
                          '<div class="card card-default card_pokemon">' +
                            '<div class="card_pokemon-pokeball">' +
                                '<i class="card_pokemon-pokeball-icon'+ isCaught +'" id="'+ pokemon.name +'"></i>' +
                            '</div>' +
                            '<div class="card_pokemon-info">' +
                                '<div class="pokemon-info-bio">' +
                                    '<div class="pokemon-info-bio-name-sprite">' +
                                        '<i class="sprites '+ pokemon.name +'"></i>' +
                                        '<span class="pokemon-bio-name">'+ pokemon.name +'</span>' +
                                    '</div>'+
                                    '<div class="pokemon-bio-types">';
                                       $.each(pokemon.type, function (i, type){
                                           theHtml += '<i class="type-icon '+ type +' "></i>'; 
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

            encounterArr.push({'html' : theHtml, 'method' : pokemon.method })                
    })
    
    var methodOrder = ["grass", "dex nav", "fishing", "horde", "gift"];
    
    encounterArr.sort(function(a,b){
      return methodOrder.indexOf(a.method) < methodOrder.indexOf(b.method) ? -1 : 1;
    });
    
    encountersInfo.push(encounterObject)    
});
$.each(encountersInfo, function (i, encounter_info) {
    $('.block-encounters').append('<h3>'+ encounter_info.type + '</h3>');

    $.each(encounter_info.encounters, function (i, info){
        $('.block-encounters').append(info.html);  
    })            
})

//Revert current_location to originial value so that it can be read again if refreshed
localStorage.setItem('current_location', currentLocationData.name);

console.log(currentLocationData);