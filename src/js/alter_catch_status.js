//// ==== Function for setting a pokemons status as caught/uncaught ==== ////

//Adding/Removing pokemon caught
$('body').on('click', 'i.card_pokemon-pokeball-icon', function(){        
    var pokemonCaught = $(this).attr('id');
    $('i.card_pokemon-pokeball-icon#'+ pokemonCaught).toggleClass('caught');
    $('i.card_pokemon-pokeball-icon#'+ pokemonCaught).closest(".card_pokemon").toggleClass('caught');          

    if (pokemonCaughtArray.indexOf(pokemonCaught) === -1) {
        pokemonCaughtArray.push(pokemonCaught);        
    } else {
        pokemonCaughtArray.splice(pokemonCaughtArray.indexOf(pokemonCaught), 1);
    }        
    
    if ($('i.card_pokemon-pokeball-icon#'+ pokemonCaught).hasClass('caught')) {
        $('i.card_pokemon-pokeball-icon#'+ pokemonCaught + ' svg title').text('Pokemon caught!');
        $('i.card_pokemon-pokeball-icon#'+ pokemonCaught + ' svg desc').text('Pokeball icon with the top half of the ball colored red, indicating the Pokemon is caught');
    } else {
        $('i.card_pokemon-pokeball-icon#'+ pokemonCaught + ' svg title').text('Pokemon not caught yet!');
        $('i.card_pokemon-pokeball-icon#'+ pokemonCaught + ' svg desc').text('Pokeball icon with the top half of the ball colored gray, indicating the Pokemon is not caught');
    }

    localStorage.setItem('pokemon_caught', JSON.stringify(pokemonCaughtArray));
});

//== If pokemon_caught key is in localStorage, parse it and set it to pokemonCaughtArray variable, else set it to an empty array
pokemonCaughtArray = localStorage.getItem('pokemon_caught') ? JSON.parse(localStorage.getItem('pokemon_caught')) : localStorage.setItem('pokemon_caught', '[]');

// Function for determining if a pokemon has been caught. 
function pokemonHasBeenCaught(pokemon) {
	return pokemonCaughtArray.indexOf(pokemon) !== -1;
}