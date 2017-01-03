
//Add button functionality
function addButtonFunc(location){
    //Set button functionality
    $('button.' + location[0].dexNum + '_caughtBtn').click(function(){
        $("img[class*='_" + location[0].dexNum + "']").attr("src","images/pokeball-catch.png");       
        location[0].caught = "Yes";
        localStorage.setItem(location[0].name,"Caught");
    });

    $('button.' + location[0].dexNum + '_missedBtn').click(function(){
        $("img[class*='_" + location[0].dexNum + "']").attr("src","images/pokeball-no-catch.png");   
        location[0].caught = "No";
        localStorage.setItem(location[0].name,"Not Caught");
    });  
}

//Generate new HTML
function generateHTML (){
    
    // If loc_enc_dropdown has html in it, empty it
    if($('#loc_enc_dropdown').html().length > 0) {
        $('#loc_enc_dropdown').html('');
    }
    
    // Get location localStorage
    currentLoc = localStorage.getItem("location");

    //setting location obj
    locationInfo = this[currentLoc];
    
    //Generating locHeader
    $("#loc_title_text").html(locationInfo.name);
    
    //Generating locImg
    function generatingClass(x){
        var b = x;
        var formatted = b.split(' ').join('_');
        formatted = formatted.replace(/'/g, '') 
        
        return formatted;
    }        
    locName = generatingClass(locationInfo.name);
    
    //Generating locImg and overlay
    $('#loc_img_lw .locationMarker').attr('id', locName);
    $('#loc_img').attr('class', 'locImg ' + locName);
    $('#loc_img .locationMarkerSm').attr('class', 'locationMarkerSm '+ locName);
    
    $mapOverlay = $('#map_overlay');
    
    $('#map_overlay p').html(locationInfo.name);
    
    $('button.zoomBtn').click(function(){
        $mapOverlay.fadeIn();
    });
    
    $mapOverlay.click(function(){
        $(this).fadeOut();
    })
    
    
    //Remove buttons if they are alreay on the page
    if($('#loc_previous button').length >= 1){
        $('#loc_previous button').remove();
    };
    if ($('#loc_next button').length >= 1){
        $('#loc_next button').remove();
    };
    
    //Appending prev location buttons
    for (var i = 0; i < locationInfo.previous.length; i++){
        $('#loc_previous').append('<button type="button" onclick=\'toPrevLoc("' + locationInfo.previous[i] + '");\'>'+ locationInfo.previous[i] +'</button>')

    }
    
    //Appending next location buttons
    for (var i = 0; i < locationInfo.next.length; i++){
        $('#loc_next').append('<button type="button" id="' + locationInfo.next[i] + '" onclick=\'toNextLoc("' + locationInfo.next[i] + '");\'>'+ locationInfo.next[i] +'</button>')

    }
    
    locEncDropdownHTML = '';
    locEncTop = '';
    
    //Create locEncDropdownHTML
    if (locationInfo.walk_pkmn != 'None' || locationInfo.walk_tg_pkmn != 'None' || locationInfo.horde_pkmn != 'None' || locationInfo.walk_sw_pkmn != 'None' || locationInfo.shaking_pkmn != 'None' || locationInfo.rock_smash_pkmn != 'None'){
        locEncDropdownHTML += 
            '<button class="encType" onclick=\'expandList("walk")\'><i class="walkIcon encIcon"></i>Walking</button>';
        locEncTop += '<div class="walk" style="display:none;">';
        if (locationInfo.walk_pkmn != 'None'){
            locEncTop += 
                '<div class="standardWalk" id="standard_walk_li"><span onclick=\'displayPokemonCards("walk_pkmn");\'>Standard Walking</span></div>'
        }
        if (locationInfo.walk_tg_pkmn != 'None'){
            locEncTop += 
                '<div class="tallGrassWalk" id="tall_grass_walk_li"><span onclick=\'displayPokemonCards("walk_tg_pkmn");\'>Tall Grass</span></div>'
        }
        if (locationInfo.horde_pkmn != 'None'){
            locEncTop += 
                '<div class="hordeWalk" id="horde_walk_li"><span onclick=\'displayPokemonCards("horde_pkmn");\'>Horde</span></div>'
        }
        if (locationInfo.walk_sw_pkmn != 'None'){
            locEncTop += 
                '<div class="shallowWaterWalk" id="shallow_water_walk_li"><span onclick=\'displayPokemonCards("walk_sw_pkmn");\'>Shallow Water</span></div>'
        }
        if (locationInfo.shaking_pkmn != 'None'){
            locEncTop += 
                '<div class="shakingWalk" id="shaking_walk_li"><span onclick=\'displayPokemonCards("shaking_pkmn");\'>Shaking Spots</span></div>'
        }
        if (locationInfo.rock_smash_pkmn != 'None'){
            locEncTop += 
                '<div class="rockSmashWalk" id="rock_smash_walk_li"><span onclick=\'displayPokemonCards("rock_smash_pkmn");\'>Rock Smash</span></div>'
        } 
        locEncTop += '</div>';
    }
    
    if (locationInfo.yf_pkmn != 'None' || locationInfo.rf_pkmn != 'None' || locationInfo.pf_pkmn != 'None'){
        locEncDropdownHTML +=
            '<button class="encType" onclick=\'expandList("flower")\'><i class="flowerIcon encIcon"></i>Flower Patches</button>';
        locEncTop += '<div class="flower" style="display:none;">';
        if (locationInfo.yf_pkmn != 'None') {
            locEncTop +=
                '<div class="yf" id="yf_li"><span onclick=\'displayPokemonCards("yf_pkmn");\'>Yellow Flowers</span></div>';
        }
        if (locationInfo.rf_pkmn != 'None') {
            locEncTop +=
                '<div class="rf" id="rf_li"><span onclick=\'displayPokemonCards("rf_pkmn");\'>Red Flowers</span></div>';
        }
        if (locationInfo.pf_pkmn != 'None') {
            locEncTop +=
                '<div class="pf" id="pf_li"><span onclick=\'displayPokemonCards("pf_pkmn");\'>Purple Flowers</span></div>';
        }
        locEncTop += '</div>';
    }
   
    if (locationInfo.old_rod_pkmn != 'None' || locationInfo.good_rod_pkmn !='None' || locationInfo.super_rod_pkmn != 'None'){
        locEncDropdownHTML +=
            '<button class="encType" onclick=\'expandList("rod")\'><i class="rodIcon encIcon"></i>Fishing</button>';
        locEncTop += '<div class="rod" style="display:none;">';
        if (locationInfo.old_rod_pkmn != 'None') {
            locEncTop +=
                '<div class="oldRodEnc" id="old_rod_li"><span onclick=\'displayPokemonCards("old_rod_pkmn");\'>Old Rod</span></div>';
        }
        if (locationInfo.good_rod_pkmn != 'None') {
            locEncTop +=
                '<div class="goodRodEnc" id="good_rod_li"><span onclick=\'displayPokemonCards("good_rod_pkmn");\'>Good Rod</span></div>';
        }
        if (locationInfo.super_rod_pkmn != 'None') {
            locEncTop +=
                ' <div class="superRodEnc" id="super_rod_li"><span onclick=\'displayPokemonCards("super_rod_pkmn");\'>Super Rod</span></div>';
        }
        locEncTop += '</div>';
    }
    
    if (locationInfo.surfing_pkmn != 'None') {
        locEncDropdownHTML +=
            '<button class="encType" onclick=\'displayPokemonCards("surfing_pkmn");\'><i class="surfIcon encIcon"></i>Surfing</button>';
    }
    
    if (locationInfo.gift_pkmn != 'None') {
        locEncDropdownHTML += 
            '<button class="encType" onclick=\'displayPokemonCards("gift_pkmn");\'><i class="giftIcon encIcon"></i><span>Gift</span></button>';
    }
    
    if (locationInfo.static_pkmn != 'None') {
        locEncDropdownHTML += 
            '<button class="encType" onclick=\'displayPokemonCards("static_pkmn");\'><i class="staticIcon encIcon"></i>Static</button>';
    }   
    
   $('#loc_enc_dropdown').append(locEncDropdownHTML);    
   
    if ( $('#loc_enc_dropdown').html().length <= 0) {
         $('#loc_enc_dropdown').append('<p class="error">There are no encounters here.')
    }
    
    //Checks to see if there is anything in the div, and if so deletes it
    if ($("#pokemon_route_info").html().length > 0){
        $("#pokemon_route_info").empty();
    }
    if($('#loc_info_top').html().length > 0){
        $('#loc_info_top').empty();
    }
    
    localStorage.setItem("location", locName)
}

//Show/hide ul in locEncDropdown
function expandList(type) {        
    $('#loc_info_top').html(locEncTop);
    $('div.' + type).toggle('500', function(){       
      if($(this).is(':visible')) {
          $(this).attr('style', 'display: flex');
      }   
    });     
}


//Creating click functionality to next location buttons
 function toNextLoc(next){    
    //Set current route to default route
    var a = next;
    var nextLoc = a.split(' ').join('_');
    localStorage.setItem("location", nextLoc);
     
    generateHTML();
     
}



//Creating click functionality for prev location buttons
function toPrevLoc(prev){
    var b = prev;
    var prevLoc = b.split(' ').join('_');
    localStorage.setItem("location", prevLoc);
    
    generateHTML();
}

function gameChange(){
   localStorage.setItem('version','');
   localStorage.setItem('location','');    
    window.location.reload();
};

//For the select
function selectChangeRoute (){
    var locationInfo = $('select').val();
    localStorage.setItem("location", locationInfo);
    generateHTML();
}

//Display Route/Pokemon info
function displayPokemonCards(enctype){
    //Checks to see if there is anything in the div, and if so deletes it
    if ($("#pokemon_route_info").html().length > 0){
        $("#pokemon_route_info").empty();
    }    
    
    //Remove other encType selections
    if (enctype == 'surfing_pkmn' || enctype == 'gift_pkmn' || enctype == 'static_pkmn'){        
        $('#loc_info_top').empty();
    }
    
        //Setting encounter type
        locEncType = locationInfo[enctype];
    
        switch (enctype) {
            case "walk_pkmn":
                encTypeHeader = 'Standard Walking'
                break;
            case "walk_tg_pkmn":
                encTypeHeader = 'Tall Grass'
                break;
            case "walk_sw_pkmn":
                encTypeHeader = 'Shallow Water'
                break;
            case "yf_pkmn":
                encTypeHeader = 'Yellow Flowers'
                break;
            case "rf_pkmn":
                encTypeHeader = 'Red Flowers'
                break;
            case "pf_pkmn":
                encTypeHeader = 'Purple Flowers'
                break;
            case "shaking_pkmn":
                encTypeHeader = 'Shaking Spots'
                break;
            case "horde_pkmn":
                encTypeHeader = 'Hordes'
                break;
            case "surfing_pkmn":
                encTypeHeader = 'Surfing'
                break;
            case "old_rod_pkmn":
                encTypeHeader = 'Old Rod'
                break;
            case "good_rod_pkmn":
                encTypeHeader = 'Good Rod'
                break;
            case 'super_rod_pkmn':
                encTypeHeader = 'Super Rod'
                break;
            case 'rock_smash_pkmn':
                encTypeHeader = 'Rock Smash'
                break;
            case 'gift_pkmn':
                encTypeHeader = 'Gift'
                break;
            case 'static_pkmn':
                encTypeHeader = 'Static'
                break;
        }              
    
        if (locEncType == 'None'){                 
            $('#pokemon_route_info').append('<p class="error">There are no encounters of this type.');
        } else {


        //Setting walking counter
        var counter = 0;

        //Start walking div
        $('#pokemon_route_info').append('<div id="' +enctype+ '"><h2>' + encTypeHeader +'</h2></div>');     


        //Loop through each available Pokemon with walk method
        locEncType.forEach(function (Pokemon){                                                        

            //Variables for Pokemon in array
            var currentPkmn = locEncType[counter];
            var rate = locEncType[counter][1];
            var encounterDiv = $('#'+ enctype +'');

            //Variables for determining version                    
            var pkmnVersion = locEncType[counter][2];
            var pokemonORASVersion = Pokemon[0].ORAS_version;
            var getLocalVersion = localStorage.getItem("version");

            //Condition to determine which version exclusives to show
            if(pkmnVersion == getLocalVersion || pkmnVersion == null) {           

                //Var for checking localStorage
                var wasPokemonCaught = localStorage.getItem(Pokemon[0].name); 

                //Start of the Pokemon Card div        
                theHTML = "<div class='pkmn-card' id='" + Pokemon[0].name + "'><div class='pkmn-card-info'>";

                //Determine if Pokemon has already been caught and set pokeball icon accordingly
                if (wasPokemonCaught == "Caught" || Pokemon[0].caught == "Yes"){
                  theHTML += "<img class='_"+ Pokemon[0].dexNum +"-catch' src='images/pokeball-catch.png'>"
                } else {
                  theHTML += "<img class='_"+ Pokemon[0].dexNum +"-no-catch' src='images/pokeball-no-catch.png'>"
                }

                //Add more Pokemon object info to html
                theHTML += "<i class='sprites " + Pokemon[0].name + " '></i><p>" + Pokemon[0].name + "</p>";               

                theHTML += '<i class="type-icon '+ Pokemon[0].type[0] +'"></i>';
                if (Pokemon[0].type[1] != null){
                    theHTML += '&nbsp;|&nbsp;<i class="type-icon '+ Pokemon[0].type[1] +'"></i>';
                }                                                                       

                theHTML += "</div>" +
                "<div class='catch-info'>" +
                "<span class='" + Pokemon[0].name +"-rate'>Rate: " + rate + "</span>"+
                "<button type='button' class='" + Pokemon[0].dexNum +"_caughtBtn'>Got It!</button><button type='button' class='" + Pokemon[0].dexNum + "_missedBtn'>Missed It</button>"+
                "</div><!--end catchBtns-->";

                encounterDiv.append(theHTML);

                addButtonFunc(currentPkmn);

            }//End loop to check for walking Pokemon

            //Counting the loops
            counter++;    
            encounterDiv.focus();
        });            
    }//End Loop    
};  