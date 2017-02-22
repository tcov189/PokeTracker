//==== Purpose: Load data for app ====//

//Get version from localStorage
var version = localStorage.getItem("version");

//Get Pokedex
switch (version) {
    case 'or' || 'as' :
        var regionalDex = 'oras-pokedex.json';
        var nationalDex = 'national-dex-post-5.json';
        var gameVersionGroup = 'oras';
        break;
    default :
        var nationalDex = 'national-dex-post-5.json';
}

//Fuction for adding data into localStorage
function loadDataIntoLocalStorage (r_dex, n_dex, gameVersion) {
    //Get Regional Dex
    $.ajax({
        url: 'data/pokedexes/' + r_dex,
        async: false,
        success: function(data){
            var data = JSON.stringify(data);
            localStorage.setItem('regional_dex', data);
        }
    });
    
    //Get National Dex
    $.ajax({
        url: 'data/pokedexes/' + n_dex,
        async: false,
        success: function(data){
            var data = JSON.stringify(data);
            localStorage.setItem('national_dex', data)
        }
    });
    
    //Get National Dex
    $.ajax({
        url: 'data/locations/' + gameVersion +'/locations.json',
        async: false,
        success: function(data){
            localStorage.setItem('region', data.name);
            var data = JSON.stringify(data);            
            localStorage.setItem('locations', data);
        }
    });
}

loadDataIntoLocalStorage(regionalDex, nationalDex, gameVersionGroup);