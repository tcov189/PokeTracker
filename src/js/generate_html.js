//==== Purpose: Create and display HTML elements ====//
 //Test
    localStorage.setItem('current_location', 'route 101');
    var lastLocation = localStorage.getItem('current_location');
    
    //Get data from localStorage
    regionalDexData     = JSON.parse(localStorage.getItem('regional_dex'));
    nationalDexData     = JSON.parse(localStorage.getItem('national_dex'));
    locationData        = JSON.parse(localStorage.getItem('locations'));       
    
    $.each(locationData.locations, function (i, val){
        if (val.name = lastLocation) {            
            localStorage.setItem('current_location', JSON.stringify(val));
            currentLocationData = JSON.parse(localStorage.getItem('current_location'));
        }
    })
    
    
    
    $(document).ready(function(){
        //Populate the HTML                                        
        
        //Route header
        $('.block-route-header h3').text(currentLocationData.name);
        
        //Exits
        exitInfo = [];
        $.each(currentLocationData.exits, function (i, val) {
            var theHtml = '<div class="block-path-group">' +
                          '<span class="block-path-group_direction">'+ i +'</span>' +
                          '<button class="button button_route" type="button">'+ val +'</button>' +
                          '</div>';
            exitInfo.push(theHtml);
        });
        $.each(exitInfo, function(i, val){
            $('.block-route-paths').append(val);
        });
        
        //Encounters
        encountersInfo = [];
        $.each(currentLocationData.encounters, function (i, val){
            if (val.post_elite_four != 'yes') {
                var encounterObject = {
                    'type' : val.type,
                    'encounters' : encounterArr = []
                };            
                $.each(val.pokemon, function(i, pokemon){                
                      var theHtml = '<div class="block-encounters-pokemon">' +
                                      '<div class="card card-default card_pokemon">' +
                                        '<div class="card_pokemon-pokeball">' +
                                            '<img class="card_pokemon-pokeball-icon" src="images/pokeball-no-catch.png" alt="">' +
                                        '</div>' +
                                        '<div class="card_pokemon-info">' +
                                            '<div class="pokemon-info-bio">' +
                                                '<div class="pokemon-info-bio-name-sprite">' +
                                                    '<i class="sprites '+ pokemon.name +'"></i>' +
                                                    '<span class="pokemon-bio-name">'+ pokemon.name +'</span>' +
                                                '</div>'+
                                                '<div class="pokemon-bio-types">';
                                                   $.each(val.pokemon[i].type, function (i, type){
                                                       theHtml += '<i class="type-icon '+ type +' "></i>'; 
                                                   })
                                                theHtml += '</div>' +
                                            '</div>' +
                                            '<hr>' +
                                            '<div class="pokemon-info-rates">' +
                                                '<div class="pokemon-rate-block">' +
                                                    '<span class="type">'+ val.type +'&nbsp;</span><span class="rate">'+ pokemon.rate +'</span>' +
                                                '</div>'+
                                            '</div>' +
                                        '</div>' +
                                      '</div>' +
                                    '</div>';

                        encounterArr.push(theHtml)                
                })            
            encountersInfo.push(encounterObject)
            }
        });
        $.each(encountersInfo, function (i, val) {
            $('.block-encounters').append('<h4>'+ val.type + '</h4>');
            
            $.each(val.encounters, function (i,val){
                $('.block-encounters').append(val);  
            })            
        })
    })
    console.log(currentLocationData);