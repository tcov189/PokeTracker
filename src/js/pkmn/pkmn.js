//====== Pokemon Object ======//

//The object protoype
function Pokemon(name, dexNum, type, caught, evo) {
    "use strict";
    this.name = name;
    this.dexNum = dexNum;
    this.type = type;
    this.caught = caught;
    this.evo = evo;
}

//Creating Pokedex Array
var pokedexArr = [];

//Function for adding Pokemon objs to the pokedexArr array
function addToPokedexArr (Pokemon){
    pokedexArr.push(Pokemon);
}
  

//TODO: Remove these from Pokemon Objs
var level = 'level_';

var final = "<span>Final</span>";

var moonStone = '<i class="moonStone"></i>'

var happiness = '<i class="happiness"></i>';

var nightTime = '<i class="nightTime"></i>';

var remoraidInParty = '';
