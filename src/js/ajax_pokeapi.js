//Uppercase returned name
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function showAbilityDesc(name){                
    if ($('#'+ name + '-desc').is(":visible")){
        $('#'+ name + '-desc').hide();
    } else {
        $('.pokemon-abilities-desc').children().hide();
        $('#'+ name + '-desc').show();   
    }            
}

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j]) {
                a.splice(j--, 1);
            }
        }
    }

    return a;
}

//Sort array to make sure primary type is first
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
                
//For removing the duplicate values in arrays
Array.prototype.getUnique = function(){
    var uniques = [];
    for(var i = 0, l = this.length; i < l; ++i){
        if(this.lastIndexOf(this[i]) === this.indexOf(this[i])) {
            uniques.push(this[i]);
        }
    }
    return uniques;
};

function getData(){    
    
    //get value from the form
    var pokemonID       = localStorage.getItem("CurrentPoke");
    var currentVersion  = localStorage.getItem('version');
        
    //Api url data based off of input
    var url = "http://pokeapi.co/api/v2/pokemon/"+ pokemonID +"/";
    
    
    var pkmnData            = JSON.parse(localStorage.getItem('pkmnData-'+ pokemonID));
    var pkmnDataSpecies     = JSON.parse(localStorage.getItem('pkmnData-'+ pokemonID + '-species'));
    var pkmnDataEvos        = JSON.parse(localStorage.getItem('pkmnData-'+ pokemonID + '-evos'));
    
    if (!pkmnData){ 
        $.ajax({
            url: url,
            async: false,
            success: function(data){
                localStorage.setItem('pkmnData-'+ pokemonID, JSON.stringify(data));
                pkmnData = JSON.parse(localStorage.getItem('pkmnData-'+ pokemonID));

            }
        });
    }
    
    if (!pkmnDataSpecies){
        $.ajax({
            url: pkmnData.species.url,
            async: false,
            success: function(data){
                localStorage.setItem('pkmnData-'+ pokemonID + '-species', JSON.stringify(data));
                pkmnDataSpecies = JSON.parse(localStorage.getItem('pkmnData-'+ pokemonID + '-species'));
            }
        });
    }    
    
    if (!pkmnDataEvos) {
        $.ajax({
            url: pkmnDataSpecies.evolution_chain.url,
            async: false,
            success: function(data){
                localStorage.setItem('pkmnData-'+ pokemonID + '-evos', JSON.stringify(data));
                pkmnDataEvos = JSON.parse(localStorage.getItem('pkmnData-'+ pokemonID + '-evos'));
            }
        });
    }
       
//Gather and display info            
    //MainInfo    
    
        //Name of Pokemon
        name       = pkmnData.name;                
            
        name = capitalizeFirstLetter(name);

        //Dex Number
        dexnum     = pkmnData.id;

            //Function to add zeros for mons 001-099
            if (dexnum <= 99){                    
                var pad = function(str, max) {
                  str = str.toString();
                  return str.length < max ? pad("0" + str, max) : str;
                };   
                dexnum = pad(dexnum, 3);        
            }
        
        
        //Types
        types      = pkmnData.types;                    
        typeArr    = [];
            
                //Loop through the types 
                $.each(types, function(i, val){               
                    typeObj = {};
                    typeObj.type = capitalizeFirstLetter(types[i].type.name);
                    typeObj.slot = types[i].slot;
                    typeArr.push(typeObj);                    
                });            
                    
                typeArr = sortByKey(typeArr, "slot");
    
    //Characteristcs
        //Species
            species    = pkmnDataSpecies.genera[0].genus;        

            
        //Height
            height     = pkmnData.height;
            //convert height into feet
    
                function convertToFeet(n){                    
                    var realFeet = ((n*3.9370078) / 12);
                    var feet = Math.floor(realFeet);
                    var inches = Math.round((realFeet - feet) * 12);
                    return feet + "&prime;" + inches + '&Prime;';
                }
    
            height = convertToFeet(height);
        //Weight
            weight     = pkmnData.weight;
            //convert weight into lbs
            function gToLbs(pK) {
                var nearExact = pK/4.5359237;
                var lbs = Math.floor(nearExact);
                var oz = Math.round((nearExact - lbs) * 16);
                return lbs + "." + oz + " lbs";
            }            
            
            weight = gToLbs(weight);
    
        //Stats
            stats      = pkmnData.stats;
            
            statsArr   = [];
    
            $.each(stats, function(i, val){
                statsObj = {};
                statsObj.name    = stats[i].stat.name.split('-').join(' ');
                statsObj.stat    = stats[i].base_stat;   
                statsObj.effort  = stats[i].effort;
                statsArr.unshift(statsObj);
            });                
        
        //Abilities
            abilities  = pkmnData.abilities;            
            
            abilitiesArr = [];
    
            $.each(abilities, function(i, val){
                abilityUrl              = abilities[i].ability.url;
                abilityDatai = JSON.parse(localStorage.getItem('pkmnData-'+ abilities[i].ability.name + '-abilityUrl'));
                
                if (!abilityDatai){
                    $.ajax({
                        url: abilityUrl,
                        async: false,
                        success: function(data){
                            localStorage.setItem('pkmnData-'+ abilities[i].ability.name +'-abilityUrl', JSON.stringify(data));
                            abilityDatai = JSON.parse(localStorage.getItem('pkmnData-'+ abilities[i].ability.name + '-abilityUrl'));

                        }
                    });
                }
                
                abilitiesObj            = {};
                abilitiesObj.name    = abilities[i].ability.name;
                abilitiesObj.slot    = abilities[i].slot;
                abilitiesObj.isHidden= abilities[i].is_hidden;
                abilitiesObj.desc    = abilityDatai.effect_entries[0].short_effect;                
                abilitiesArr.push(abilitiesObj);                
            });
                        
            abilitiesArr = sortByKey(abilitiesArr, 'slot');
    
    //Evolutions                   
        
    
        //Base Pokemon Chain
        baseEvoChain            =   pkmnDataEvos.chain;
            baseName            =   capitalizeFirstLetter(baseEvoChain.species.name);
            secondStageEvoChain     =   baseEvoChain.evolves_to;
            hasSecondStage      =   false;
            hasThirdStage       =   false;
            hasSplitStage       =   false;
            hasSecondSplitStage =   false;
    
            //Formatting for TriggerName
            function formatTriggerName(trigger) {
                switch(trigger) {
                    case 'level-up':
                        trigger = 'Level ';
                        return trigger;
                    case 'use-item':
                        trigger = '';
                        return trigger;
                    default:
                        return trigger;
                }                                                
            }
            
        if (baseEvoChain.evolves_to.length >= 1){
            hasSecondStage = true; 
            //Second Stage Pokemon Chain
            secondStageEvoChain     =   baseEvoChain.evolves_to;
            secondStageName         =   capitalizeFirstLetter(secondStageEvoChain[0].species.name);     
            secondStageTriggerName  =   secondStageEvoChain[0].evolution_details[0].trigger.name;
                                
            secondStageTriggerName = formatTriggerName(secondStageTriggerName);                    
                
    
            $.each(secondStageEvoChain[0].evolution_details[0], function(i,val){
                if (i === 'trigger' && val.name === 'trade') {
                    secondStageMethod = 'trade';
                    secondStageCondition = '';
                } else if (val !== null && val !== false && i !== 'trigger'){                                           
                    secondStageMethod = i;
                    secondStageCondition = val;
                    switch(i) {
                        case 'min_happiness':
                            secondStageTriggerName  = 'Min Happiness of';
                            break;
                        case 'item':                            
                            secondStageCondition    = secondStageCondition.split('-').join(' ');
                            break;
                        case 'held_item':
                            secondStageCondition    = 'w/<br>' + secondStageCondition.name.split('-').join(' ');
                            break;
                     }
                }             
            });                         
        } 
    
        if (baseEvoChain.evolves_to.length === 2){
                hasSecondSplitStage = true; 
                //Second Stage Pokemon Chain
                secondSplitStageEvoChain     =   baseEvoChain.evolves_to;
                secondSplitStageName         =   capitalizeFirstLetter(secondSplitStageEvoChain[1].species.name);     
                secondSplitStageTriggerName  =   secondSplitStageEvoChain[1].evolution_details[0].trigger.name;

                secondSplitStageTriggerName = formatTriggerName(secondSplitStageTriggerName);                    


                $.each(secondSplitStageEvoChain[1].evolution_details[0], function(i,val){
                    if (i === 'trigger' && val.name === 'trade') {
                        secondSplitStageMethod = 'trade';
                        secondSplitStageCondition = '';
                    } else if (val !== null && val !== false && i !== 'trigger'){                                           
                        secondSplitStageMethod = i;
                        secondSplitStageCondition = val;
                        switch(i) {
                            case 'min_happiness':
                                secondSplitStageTriggerName  = 'Min Happiness of';
                                break;
                            case 'item':                            
                                secondSplitStageCondition    = secondSplitStageCondition.split('-').join(' ');
                                break;
                            case 'held_item':
                                secondSplitStageCondition    = 'w/<br> ' + secondSplitStageCondition.name.split('-').join(' ');
                                break;
                         }
                    }             
                });         
            }            
                    
        if (secondStageEvoChain[0].evolves_to.length >= 1){
            hasThirdStage = true;
            
            thirdStageEvoChain      =   secondStageEvoChain[0].evolves_to;  
            thirdStageName          =   capitalizeFirstLetter(thirdStageEvoChain[0].species.name);
            thirdStageTriggerName   =   thirdStageEvoChain[0].evolution_details[0].trigger.name;
            
            thirdStageTriggerName   =   formatTriggerName(thirdStageTriggerName);
            
            $.each(thirdStageEvoChain[0].evolution_details[0], function(i,val){
                if (i === 'trigger' && val.name === 'trade') {
                    thirdStageMethod = 'trade';
                    thirdStageCondition = '';
                } else if (val !== null && val !== false && i !== 'trigger'){                    
                    thirdStageMethod = i;
                    thirdStageCondition = val;
                    switch(i) {
                        case 'min_happiness':
                            thirdStageTriggerName   = 'Min Happiness of';
                            break;
                        case 'item':                            
                            thirdStageCondition     = thirdStageCondition.name.split('-').join(' ');
                            break;
                        case 'held_item':
                           thirdStageCondition      = 'w/<br> ' + thirdStageCondition.name.split('-').join(' ');
                            break;
                     }
                }  
            });
            
        }
    
        if (secondStageEvoChain[0].evolves_to.length > 1) {
            hasSplitStage = true;
            
            splitStageEvoChain      =   secondStageEvoChain[0].evolves_to;  
            splitStageName          =   capitalizeFirstLetter(splitStageEvoChain[1].species.name);
            splitStageTriggerName   =   splitStageEvoChain[1].evolution_details[0].trigger.name;
            
            splitStageTriggerName   =   formatTriggerName(splitStageTriggerName);
            
            $.each(splitStageEvoChain[1].evolution_details[0], function(i,val){               
                if (i === 'trigger' && val.name === 'trade') {
                    splitStageMethod = 'trade';
                    splitStageCondition = '';                    
               } else if (val !== null && val !== false && i !== 'trigger'){                    
                    splitStageMethod = i;
                    splitStageCondition = val;
                    switch(i) {
                        case 'min_happiness':
                            splitStageTriggerName   = 'Min Happiness of';
                            break;
                        case 'item':                            
                            splitStageCondition     = splitStageCondition.name.split('-').join(' ');
                            break;
                        case 'held_item':
                            splitStageCondition     = 'w/<br> ' + splitStageCondition.name.split('-').join(' ');
                            break;
                    }
                } 
            });       
        }
        
        
    //Move info
    moves               = pkmnData.moves;    
    movesArr            = [];    
    
    //Loop through all the objects and put the move into a version specific array
        $.each(moves, function (i,val){  
            moveData = JSON.parse(localStorage.getItem('pkmnData-move' + val.move.name));
            if(!moveData) {
                $.ajax({
                    url: val.move.url,
                    async: false,
                    success: function(data){
                        localStorage.setItem('pkmnData-move' + val.move.name, JSON.stringify(data));
                        moveData = JSON.parse(localStorage.getItem('pkmnData-move' + val.move.name));
                    }
                });
            }
            console.log(moveData);
            movesObj            = {};            
            for (var c = 0; c < moves[i].version_group_details.length; c++) {
                movesObj['game-' + c]   =   {};                
                movesObj['game-' + c].game_name                  = moves[i].version_group_details[c].version_group.name;                 
                movesObj['game-' + c].move_name    = moves[i].move.name;
                movesObj['game-' + c].method        = moves[i].version_group_details[c].move_learn_method.name;
                if (movesObj['game-' + c].method === 'level-up' && moves[i].version_group_details[c].level_learned_at > 0) {
                    movesObj['game-' + c].level_learned = moves[i].version_group_details[c].level_learned_at;
                }
            }
            movesArr.push(movesObj);
        });  
}