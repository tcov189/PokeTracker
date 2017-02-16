$.ajax({
        url: 'data/pokedexes/national-dex.json',
        async: false,
        success: function(data){
            nationalPkmnData = [];
            $.each(data, function(i, val){
                nationalDexObj = {
                    'name' : val.name,
                    'type' : val.type,
                    'n_dex_num' : val.n_dex_num,
                    'r_dex_num' : ''
                };                
                nationalPkmnData.push(nationalDexObj);
            });
        }
    });
    
    $.ajax({
        url: 'data/pokeapi_data/red-blue.json',
        async: false,
        success: function(data){
            regionalDexData = [];
            $.each(data.pokemon_entries, function(i, val){
                regionalDexObj = {
                    'name' : val.pokemon_species.name,
                    'r_dex_num' : val.entry_number
                };
                regionalDexData.push(regionalDexObj);
            });
        }
    });    

    var mergedArr = $.merge(nationalPkmnData, regionalDexData);
    
    var regionOnly = [];
    var dupes = [];
    
    mergedArr.forEach(function(value) {
      var existing = dupes.filter(function(v, i) {
        return v.name === value.name;
      });
      if (existing.length) {
        var existingIndex = dupes.indexOf(existing[0]);        
        dupes[existingIndex].r_dex_num = dupes[existingIndex].r_dex_num.concat(value.r_dex_num);
        regionOnly.push(dupes[existingIndex]);
      } else {
        if (typeof value.name === 'string'){
          value.name = value.name;
        dupes.push(value);
        }
      }
    });
    
    console.log(JSON.stringify(regionOnly));