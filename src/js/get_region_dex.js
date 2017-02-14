$.ajax({
        url: 'data/pokemon.json',
        async: false,
        success: function(data){
            nationalPkmnData = [];
            $.each(data, function(i, val){
                nationalDexObj = {
                    'name' : i.toLowerCase(),
                    'type' : val.type,
                    'n_dex_num' : val.dex_num,
                    'r_dex_num' : ''
                };                
                nationalPkmnData.push(nationalDexObj);
            })
        }
    });
    
    $.ajax({
        url: 'data/pokedexes/sshg.json',
        async: false,
        success: function(data){
            sshgRegionalDex = [];
            $.each(data.pokemon_entries, function(i, val){
                regionalDexObj = {
                    'name' : val.pokemon_species.name,
                    'r_dex_num' : val.entry_number                
                }
                sshgRegionalDex.push(regionalDexObj);
            })
        }
    });    

    var mergedArr = $.merge(nationalPkmnData, sshgRegionalDex);
    
    var johtoOnly = [];
    var dupes = [];
    
    mergedArr.forEach(function(value) {
      var existing = dupes.filter(function(v, i) {
        return v.name == value.name;
      });
      if (existing.length) {
        var existingIndex = dupes.indexOf(existing[0]);        
        dupes[existingIndex].r_dex_num = dupes[existingIndex].r_dex_num.concat(value.r_dex_num);
        johtoOnly.push(dupes[existingIndex])  
      } else {
        if (typeof value.name == 'string')
          value.name = value.name;
        dupes.push(value);
      }
    });
    
    console.log(JSON.stringify(johtoOnly));