////==== Purpose: Generating Pokedex html ====////

//Vars needed
var pokedexDiv = $('#pokedex');

//Function for generating html
var generatePokedex = function () {
    'use strict';
    
    var theHtml = '<div class="card card-default card_pokemon">';
        
        
    theHtml += '</div>';//End card div        
    
    return theHtml;
};


pokedexDiv.append(generatePokedex());

/*<div class="card card-default card_pokemon "><div class="card_pokemon-pokeball"><i class="card_pokemon-pokeball-icon" id="caterpie"></i></div><div class="card_pokemon-info"><div class="pokemon-info-bio"><div class="pokemon-info-bio-name-sprite"><i class="sprites caterpie undefined"></i><span class="pokemon-bio-name">caterpie</span></div><div class="pokemon-bio-types"><i class="type-icon bug "></i></div></div><hr><div class="pokemon-info-rates"><div class="pokemon-rate-block"><span><strong>grass</strong>: 20%</span></div><div class="pokemon-sos-block"><div class="text-center">S.O.S:</div><i class="sprites caterpie undefined"></i></div><div class="pokemon-levels-block"><span class="level-range">Lvl: 2–3</span></div></div></div></div>*/