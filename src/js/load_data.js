//==== Purpose: Load data for app ====//

//Check to see if these variables are already set
if (!localStorage.getItem('current_location')) {

    //Get version from localStorage
    var version = localStorage.getItem("version");

<<<<<<< HEAD
    //Get Pokedex
    switch (true) {
        case version == 'or' || version == 'as' :
            var regionalDex = 'oras-pokedex.json';
            var nationalDex = 'national-dex-post-5.json';
            var gameVersionGroup = 'oras';
            var gameVersion = version == 'or' ? 'Omega Ruby' : 'Alpha Sapphire';   
            if (!localStorage.getItem('current_location')) {
                localStorage.setItem('current_location', 'route 101');   
            }        
            break;
        case version == 'hg' || version == 'ss' :
            var regionalDex = 'hgss-pokedex.json';
            var nationalDex = 'national-dex.json';
            var gameVersionGroup = 'hgss';
            var gameVersion = version == 'hg' ? 'Heart Gold' : 'Soul Silver';      
            if (!localStorage.getItem('current_location')) {
                localStorage.setItem('current_location', 'route 29');   
            }    
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
            url: 'data/locations/' + gameVersion +'.json',
            async: false,
            success: function(data){
                localStorage.setItem('region', data.name);
                var data = JSON.stringify(data);            
                localStorage.setItem('locations', data);
            }
        });
    }

    loadDataIntoLocalStorage(regionalDex, nationalDex, gameVersionGroup);

}
=======
//Fuction for adding data into localStorage
function loadDataIntoLocalStorage (r_dex, n_dex, gameVersion) {
    //Get Regional Dex
    $.ajax({
        url: 'data/pokedexes/' + r_dex,
        async: false,
        success: function(data){
            localStorage.setItem('regional_dex', data);
        }
    });

    //Get National Dex
    $.ajax({
        url: 'data/pokedexes/' + n_dex,
        async: false,
        success: function(data){
            localStorage.setItem('national_dex', data)
        }
    });

    //Get National Dex
    $.ajax({
        url: 'data/locations/' + gameVersion +'.json',
        async: false,
        success: function(data){
            localStorage.setItem('region', data.name);                 
            localStorage.setItem('locations', data);
        }
    });
}

loadDataIntoLocalStorage(regionalDex, nationalDex, gameVersionGroup);
 
//Set vars from data from localStorage
regionalDexData     = JSON.parse(localStorage.getItem('regional_dex'));
nationalDexData     = JSON.parse(localStorage.getItem('national_dex'));
locationData        = JSON.parse(localStorage.getItem('locations'));
>>>>>>> gh-pages
