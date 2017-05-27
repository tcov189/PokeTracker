////==== Purpose: Generating Pokedex html ====////

//Vars needed
var pokedexDiv 			= $('#pokedex');
var regionalDexData     = JSON.parse(localStorage.getItem('regional_dex'));
var nationalDexData     = JSON.parse(localStorage.getItem('national_dex'));

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
    
//Function for generating html
var generatePokedexCards = function (pokemon) {
    'use strict';
    
    var isCaught = pokemonHasBeenCaught(pokemon.name) ? ' caught' : '';
    var svgTitle = pokemonHasBeenCaught(pokemon.name) ? 'Pokemon caught!' : 'Pokemon not caught yet!'; 
    var svgDesc  = pokemonHasBeenCaught(pokemon.name) ? 'Pokeball icon with the top half of the ball colored red, indicating the Pokemon is caught' : 'Pokeball icon with the top half of the ball colored gray, indicating the Pokemon is not caught'; 
    
    var theHtml = '<div class="card card_pokemon card_pokedex '+ isCaught +'">' +        
                    '<div class="card_pokemon-pokeball">' +
                        '<i class="card_pokemon-pokeball-icon'+ isCaught +'" id="'+ pokemon.name +'">' +
                              '<svg version="1.1" width="25" height="25" viewBox="0 0 25 25" aria-labelledby="title'+ pokemon.n_dex_num +' desc'+ pokemon.n_dex_num +'" role="button"><title id="title'+ pokemon.n_dex_num +'">'+ svgTitle +'</title><desc id="desc">'+ svgDesc +'</desc><path fill="#FFF" stroke="#000" stroke-width="2" stroke-miterlimit="10" d="M24 12.5C24 18.85 18.85 24 12.5 24c-4.92 0-9.11-3.09-10.75-7.42l8.57-3.29c.31.9 1.17 1.54 2.18 1.54 1.28 0 2.33-1.05 2.33-2.33 0-.31-.061-.6-.17-.88l8.55-3.3c.51 1.3.79 2.7.79 4.18z"/><path stroke="#000" stroke-width="2" stroke-miterlimit="10" d="M23.21 8.32l-8.55 3.3a2.349 2.349 0 0 0-2.16-1.45c-1.28 0-2.33 1.05-2.33 2.33 0 .28.05.54.15.79l-8.57 3.29C1.26 15.31 1 13.94 1 12.5 1 6.15 6.15 1 12.5 1c4.88 0 9.05 3.04 10.71 7.32z"/><path fill="#FFF" d="M14.83 12.5c0 1.28-1.05 2.33-2.33 2.33-1.01 0-1.87-.64-2.18-1.54-.1-.25-.15-.51-.15-.79 0-1.28 1.05-2.33 2.33-2.33.98 0 1.81.61 2.16 1.45.11.28.17.57.17.88z"/></svg>' +
                        '</i>' +
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
    var numCaught = pokemonCaughtArray.length;    
    var totalNumPokes = nationalDexData.length;    
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