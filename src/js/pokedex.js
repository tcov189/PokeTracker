//=========== Pokedex Page ==============//

//Compare function used to sort the pokedexArr by dex number
function compare(a,b) {
  if (Number(a.dexNum) < Number(b.dexNum))
    return -1;
  if (Number(a.dexNum) > Number(b.dexNum))
    return 1;
  return 0;
}

//Sort the pokedexArr by dex number
pokedexArr.sort(compare);


//Creating the dom and adding functionality
$("document").ready(function(){
   
    //Global vars
    var $dexDiv = $("#pokedex");

    //Click Pokeball img to toggle a Pokemon from caught/not caught
    function toggleCatch (pokemon){
        //OnClick of Pokeball
        $('img.' + pokemon.dexNum).click(function(){

            //Get catch status of current Pokemon
            var catchStatus = localStorage.getItem(pokemon.name);

            if (catchStatus == "Caught"){
                //If catchStatus is already set to catch, reverse it
                $(this).attr("src","images/pokeball-no-catch.png");       
                localStorage.setItem(pokemon.name,"Not Caught");
                pokemon.caught = "No";
            } else {
                //If Pokemon is not in localStorage or catchStatus is set to 
                $(this).attr("src","images/pokeball-catch.png"); 
                localStorage.setItem(pokemon.name,"Caught");                     
                pokemon.caught = "Yes";
            }                   
        });
    }
  
    //Creating Pokemon cards
    //Loop through every Pokemon obj in the pokedexArr
    for (var i = 0; i < pokedexArr.length; i++){                            

            //Check to see if current Pokemon obj is in localStorage
            var wasPokemonCaught = localStorage.getItem(pokedexArr[i].name); 

            //Start of the Pokemon Card div        
            theHTML = '<div class="pkmn-card" id="' + pokedexArr[i].name + '"><div class="pkmn-card-info">';
            
            theHTML += '<div class="pkmn-catch-icon">';
            //Determine if Pokemon has already been caught and set pokeball icon accordingly
            if (wasPokemonCaught == 'Caught' || pokedexArr[i].caught == 'Yes'){
              theHTML += '<img class="'+ pokedexArr[i].dexNum +' catch" src="images/pokeball-catch.png">'
            } else {
              theHTML += '<img class="'+ pokedexArr[i].dexNum +' no-catch" src="images/pokeball-no-catch.png">'
            }
        
            theHTML += '</div>';
        
            theHTML += '<div class="pkmn-data">';

            //Add more Pokemon object info to html
            theHTML += '<i class="sprites '+ pokedexArr[i].name +' "></i>'+
                '<a href="" onclick="toPokeInfo('+ pokedexArr[i].name +');">' + pokedexArr[i].name +' #'+ pokedexArr[i].dexNum + '</a>';               

            //Add types to Pokemon card
            theHTML += '<div class="types"><i class="type-icon '+ pokedexArr[i].type[0] +'"></i>';
        
            //If Pokemon obj has more than one type, display the second type
            if (pokedexArr[i].type[1] != null){
                theHTML += '&nbsp;|&nbsp;<i class="type-icon '+ pokedexArr[i].type[1] +'"></i>';
            }                                                                       

            //Add the EV yields to the Pokemon Card
            theHTML += '</div></div>';

        
        $dexDiv.append(theHTML);     
        toggleCatch(pokedexArr[i]);
    }
});