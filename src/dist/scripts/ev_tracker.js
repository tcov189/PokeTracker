//HP

function stat(ev_name, pokemon_name, island, location, ev_yield) {
    this.ev_name        = ev_name;
    this.pokemon_name   = pokemon_name;
    this.island         = island;
    this.location       = location;
    this.ev_yield       = ev_yield;
}

evArr = [
    hp = new stat ('HP', 'wailmer', 'poni island', 'poni wilds (surfing ambush)', 1),
    attack = new stat('attack', 'crabrawler', 'all', 'any berry tree', 1 ),
    defense = new stat('defense', 'roggenrola', 'melemele island', 'ten carat hill (cave)', 1 ),
    special_attack = new stat('special attack', 'psyduck', 'akala island', 'brooklet hill', 1 ),
    special_defense = new stat('special defense', 'tentacool', 'akala island', 'hano beach (surfing ambush)', 1 ),
    speed = new stat('speed', 'diglett', 'akala island', 'diglett\'s tunnel (dust cloud ambush)', 1 )
];
//=== Ev Tracking ===//

//Vars
maxEvPerStat = 252;
maxEvsPerMon = 510;
evGoal       = 0;
evsGained    = 0;              
pkmnLeft     = 0;     
isSos        = false;
hasPowerItem = false;
hasPokerus   = false;

$('#sos').on('change',function() {
    if ($(this).prop('checked')){
        isSos = true;                    
    }  else {
        isSos = false;
    }
});

$('#power_item').on('change',function() {
    if ($(this).prop('checked')){
        hasPowerItem = true;                    
    } else {
        hasPowerItem = false;
    }   
});

$('#pokerus').on('change',function() {
    if ($(this).prop('checked')){
        hasPokerus = true;                    
    } else {
        hasPokerus = false;
    }   
});

//= Ev goal 

//Stat Entry Validation
$('#ev_goal').on('change', function(){
    evGoal = 0;
    if (parseInt($(this).val()) > maxEvPerStat) {
        parseInt($(this).val(maxEvPerStat));
        alert('Can\'t do that');
    }
    
   if (parseInt($(this).val()) <= 0) {
        parseInt($(this).val(0));
        alert('Can\'t do that');
    }
    
    evGoal = parseInt($(this).val());      
});  
 $('.button-group button').on('click', function (id){
    id = $(this).attr('id');
    id = id.split('_').join(' ');
     $.each(evArr, function(i,val){
        if (val.ev_name.toLowerCase() === id){
            $.each(val, function(index, value){                   
                var elem = $('#' + index);
                elem.text(value);                                   
            });                                               
        }
    });                
});

  
$('#start').on('click', function(){
    var evPokemonName = $('#pokemon_name').text();
    if (evPokemonName !== '') {
        var theHtml = '<div class="'+ evPokemonName +'"></div>';

        if (isSos) {
            theHtml += theHtml;
        }

        $('.wildPokemon').html(theHtml);   
    }               
});

var faintedPokemon = $('.wildPokemon div');

$('.wildPokemon').on('click', 'div', function() {
    var evYield = parseInt($('#ev_yield').text());    
    
//Multipliers    
    //Power Item
    if (hasPowerItem) {
        evYield += 8;
    }  
    //SOS
    if (isSos) {
        evYield = evYield * 2; 
    }
    //Pokerus
    if (hasPokerus) {
        evYield = evYield * 2; 
    }
    
    evsGained += evYield;
    
    evsLeft = evGoal - evsGained;

    $('.evs_needed_result').text(evsLeft);
    
    pokemonNeededToKo = (evGoal - evsGained) / evYield;    
    
    $('.kos_needed_result').text(pokemonNeededToKo);
});