//=========== Pokedex Page ==============//

//Compare function used to sort the pokedexArr by dex number
function compare(a,b) {
  if (Number(a.dexNum) < Number(b.dexNum)) {
    return -1;
  }
  if (Number(a.dexNum) > Number(b.dexNum)){
    return 1;
  }
  return 0;
}

//Load national dex into localstorage if not there already
if (!localStorage.getItem('national_dex')) {
   //Get National Dex
    $.ajax({
        url: 'data/pokedexes/national-dex-post-6.json',
        async: false,
        success: function(data){
            var data = JSON.stringify(data);
            localStorage.setItem('national_dex', data);            
        }
    });    
}

nationalDexData = JSON.parse(localStorage.getItem('national_dex'));

//Sort the pokedexArr by dex number



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

            if (catchStatus === "Caught"){
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
    for (var i = 0; i < nationalDexData.length; i++){                            

            //Check to see if current Pokemon obj is in localStorage
            var wasPokemonCaught = localStorage.getItem(nationalDexData[i].name); 

            //Start of the Pokemon Card div        
            theHTML = '<div class="pkmn-card" id="' + nationalDexData[i].name + '"><div class="pkmn-card-info">';
            
            theHTML += '<div class="pkmn-catch-icon">';
            //Determine if Pokemon has already been caught and set pokeball icon accordingly
            if (wasPokemonCaught === 'Caught' || nationalDexData[i].caught === 'Yes'){
              theHTML += '<img class="'+ nationalDexData[i].dexNum +' catch" src="images/pokeball-catch.png">';
            } else {
              theHTML += '<img class="'+ nationalDexData[i].dexNum +' no-catch" src="images/pokeball-no-catch.png">';
            }
        
            theHTML += '</div>';
        
            theHTML += '<div class="pkmn-data">';

            //Add more Pokemon object info to html
            theHTML += '<i class="sprites '+ nationalDexData[i].name +' "></i>';
            if (nationalDexData[i].forms) {
                $.each(nationalDexData[i].forms, function(index, val){
                   theHTML += '<i class="sprites '+ nationalDexData[i].name +' '+ val.name +'"></i>';
                }) 
            }
                theHTML += '<a href="" onclick="toPokeInfo('+ nationalDexData[i].name +');">' + nationalDexData[i].name +' #'+ nationalDexData[i].dexNum + '</a>';               

            //Add types to Pokemon card
            theHTML += '<div class="types"><i class="type-icon '+ nationalDexData[i].type[0] +'"></i>';
        
            //If Pokemon obj has more than one type, display the second type
            if (nationalDexData[i].type[1] !== null){
                theHTML += '&nbsp;|&nbsp;<i class="type-icon '+ nationalDexData[i].type[1] +'"></i>';
            }                                                                       

            //Add the EV yields to the Pokemon Card
            theHTML += '</div></div>';

        
        $dexDiv.append(theHTML);     
        toggleCatch(nationalDexData[i]);
    }
});