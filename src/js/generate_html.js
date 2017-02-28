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
$.each(locationData.locations, function (i, val){
    if (val.name == lastLocation) {                
        currentLocationData = val;
    }
})
    
        
//Populate the HTML                                        

//Route header
$('.block-route-header h3').text(currentLocationData.name);

//Exits
exitInfo = [];
$.each(currentLocationData.exits, function (i, val) {
    var theHtml = '<div class="block-path-group">' +
                  '<span class="block-path-group_direction">'+ i +'</span>' +
                  '<button class="button button_route" type="button">'+ val +'</button>' +
                  '</div>';
    exitInfo.push(theHtml);
});
$.each(exitInfo, function(i, val){
    $('.block-route-paths').append(val);
});

//Encounters
encountersInfo = [];
$.each(currentLocationData.encounters, function (i, val){
    var encounterObject = {
        'type' : val.type,        
        'encounters' : encounterArr = []
    };            

    $.each(val.pokemon, function(i, pokemon){ 
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
                                       $.each(val.pokemon[i].type, function (i, type){
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
$.each(encountersInfo, function (i, val) {
    $('.block-encounters').append('<h3>'+ val.type + '</h3>');

    $.each(val.encounters, function (i,val){
        $('.block-encounters').append(val.html);  
    })            
})

//Revert current_location to originial value so that it can be read again if refreshed
localStorage.setItem('current_location', currentLocationData.name);

console.log(currentLocationData);