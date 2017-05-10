////==== Purpose: Generating Pokedex html ====////

//Vars needed
var pokedexDiv = $('#pokedex');
var regionalDexData     = JSON.parse(localStorage.getItem('regional_dex'));
var nationalDexData     = JSON.parse(localStorage.getItem('national_dex'));

var caughtPokemonArray  = JSON.parse(localStorage.getItem('pokemon_caught'));

// If there is no national dex in localStorage, then just default to Gen 7
if (!nationalDexData) {
    //Get National Dex
    $.ajax({
        url: 'assets/data/pokedexes/national-dex-post-6.json',
        async: false,
        success: function(data){
            data = JSON.stringify(data);
            localStorage.setItem('national_dex', data);
            nationalDexData = JSON.parse(localStorage.getItem('national_dex'));
        }
    });
}

// If there is no caught pokemon, create the array
if (!caughtPokemonArray){
    var pkmnCaughtArr = [];
    localStorage.setItem('pokemon_caught', JSON.stringify(pkmnCaughtArr));
} else {
    pkmnCaughtArr  = JSON.parse(localStorage.getItem('pokemon_caught'));
} 
    
//Function for generating html
var generatePokedexCards = function (pokemon) {
    'use strict';
    
    var isCaught = $.inArray(pokemon.name, caughtPokemonArray) !== -1 ? ' caught' : '';
    
    var theHtml = '<div class="card card_pokemon card_pokedex '+ isCaught +'">' +        
                    '<div class="card_pokemon-pokeball">' +
                        '<i class="card_pokemon-pokeball-icon'+ isCaught +'" id="'+ pokemon.name +'"></i>' +
                    '</div>' + // End card_pokemon-pokeball
                    '<div class="card_pokemon-info">' +                        
                        '<div class="pokemon-info-bio">' +
                            '<div class="pokemon-bio-name">'+ pokemon.name +'<br> #'+ pokemon.n_dex_num +'</div>' +
                            '<div class="pokemon-info-bio-name-sprite">' +
                                '<i class="sprites '+ pokemon.name +'"></i>' +                                
                            '</div>' + //end pokemon-info-bio-name-sprite
                            '<div class="pokemon-bio-types">';
                                $.each(pokemon.type, function (i, type){
                                       theHtml += '<i class="type-icon '+ type.toLowerCase() +' "></i>'; 
                                   });
                 theHtml += '</div>' + //end pokemon-bio-types                            
                        '</div>' +// end card_pokemon-info-bio
                    '</div>' + // end card_pokemon-info        
                '</div>';//End card div        
    
    return theHtml;
};


//Function for creating all the pokedex divs
var generatePokedex = function () {    
    // Var for the pokedex Html
    var pokedexHtml= '';
    
    for (var i = 0; i < nationalDexData.length; i++) {        
        pokedexHtml += generatePokedexCards(nationalDexData[i]);
    }   
    return pokedexHtml;
};

//List progress
var updateProgress = function() {    
    var numCaught = JSON.parse(localStorage.getItem('pokemon_caught')).length;    
    var totalNumPokes = JSON.parse(localStorage.getItem('national_dex')).length;    
    var percentCaught = (numCaught / totalNumPokes) * 100;
    
    if (percentCaught % 1 !== 0) {
        percentCaught = '~' + Math.ceil((numCaught / totalNumPokes) * 100);
    }
    
    $('.progress').html('<p>You have caught <strong>'+ numCaught +'</strong> out of <strong>'+ totalNumPokes +'</strong>, or <strong>'+ percentCaught +'%</strong>.');
};


pokedexDiv.html(generatePokedex());

$(document).ready(function (){
    updateProgress();
    
    $('body').on('click', 'i.card_pokemon-pokeball-icon', function(){   
        updateProgress();
    });
});