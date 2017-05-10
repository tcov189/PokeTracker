//// ==== Function for setting a pokemons status as caught/uncaught ==== ////

//Adding/Removing pokemon caught
$('body').on('click', 'i.card_pokemon-pokeball-icon', function(){        
    var pokemonCaught = $(this).attr('id');
    $('i.card_pokemon-pokeball-icon#'+ pokemonCaught).toggleClass('caught');
    $('i.card_pokemon-pokeball-icon#'+ pokemonCaught).closest(".card_pokemon").toggleClass('caught');
    pkmnCaughtData = JSON.parse(localStorage.getItem('pokemon_caught'));

    if ($.inArray(pokemonCaught, pkmnCaughtData) === -1) {
        pkmnCaughtData.push(pokemonCaught);   
    } else {
        pkmnCaughtData.splice( $.inArray(pokemonCaught, pkmnCaughtData), 1);
    }        

    localStorage.setItem('pokemon_caught', JSON.stringify(pkmnCaughtData));
});