function pdxOverlay (){
    //Get the data
    getData();                    
    
   //==Create overlay container and inner div
    var $overlay        = $('<div class="pkmnOverlay"></div>');
    var $overlayClose   = $('<div class="close-btn"></div>');
    var $pokemonInfoDiv = $('<div class="pokemon-info"></div>');            
    var $horzRule           = $('<hr>');
    
        //==Create pokemonInfoDiv content            
        var $pokemonInfoTitle = $('<div class="pokemon-info-title"></div>');
            var $current          = $('<h1 class="current"><span>'+ name +'</span>&nbsp;#' + dexnum + '</h1>');
            
            //==Create pokemonInfoSpecies
                var $pokemonInfoPokedex = $('<div class="pokemon-info-pokedex"></div>');

                    //Pokedex Info heading
                    var $pokedexH1       = $('<h1>Pokedex Info:</h1>');

                    //Create Species info
                    var $pokedexInfo        = $('<div class="pokedex-info"></div>');                
                        var $speciesName    = $('<span>' + species + '<br>Pokemon</span>');
                        var $height         = $('<span>Height:<br>' + height +'</span>');
                        var $weight         = $('<span>Weight:<br>' + weight + '</span>');

                    //Append elements to spciesInfo
                    $pokedexInfo.append($speciesName, $height, $weight);
    
            //Append elements to pokemonInfoTitle
            $pokemonInfoTitle.append($current, $pokedexInfo);
    
        //==Create pokemonInfoNav
        var $pokemonInfoNav   = $('<div class="pokemon-info-nav"></div>');
        //TODO: Create funcitonality to make as caught or not
            var $pdxBox              = $('<div class="pdx-box ' + dexnum + ' no-catch"></div>');
                var $spriteBg        = $('<div class="sprite-bg"><i class="sprites ' + name + '"></i></div>');
                var $pokemonInfoType = $('<div class="pokemon-info-type"></div>');
                    $.each(typeArr, function(i,val){                        
                        $pokemonInfoType.append('<i class="type-icon '+ val.type +'"></i>');
                    });
        
            //Append elements to pdxBox
            $pdxBox.append($spriteBg, $pokemonInfoType);
    
            //NavTabs
            var $navTabs      = $('<div class="nav-tabs">' +
                                  '<button type="button" id="pokemon-nav-basics">Basics</button>' +
                                  '<button tyyp="button" id="pokemon-nav-location">Location</button>' +
                                  '</div>');
            var $navTabs2     = $('<div class="nav-tabs">' +
                                  '<button type="button" id="pokemon-nav-evo">Evos/Forms</button>' +
                                  '<button type="button" id="pokemon-nav-moves">Move List</button>' +
                                  '</div>');                        
    
        //Append elements to pokemonInfoNav
        $pokemonInfoNav.append($pdxBox, $navTabs, $navTabs2);
        
      /*  
    
        //Append elements to pokemonInfoPokedex   
        $pokemonInfoPokedex.append($pokedexH1, $pokedexInfo);
    */
        //Append elements to pokemonInfoAbilities
        var $pokemonInfoAbilities       = $('<div class="pokemon-info-abilities"></div>');
    
            var $pokemonAbilitiesH1     = $('<h1>Abilities:</h1>');
            var $pokemonAbilitiesDiv    = $('<div class="pokemon-abilities"></div>');
            var $pokemonAbilitiesDesc   = $('<div class="pokemon-abilities-desc"></div>');
            
            $.each(abilitiesArr, function(i,val){                
                
                $pokemonAbilitiesDiv.append('<a href="#" id="'+ val.name +'"  onClick="showAbilityDesc(\''+ val.name +'\');">'+ val.name.split('-').join(' ') +'</a>&nbsp;');                
                if (val.isHidden === true) {
                    $pokemonAbilitiesDiv.append('<span>(Hidden)</span>');
                }                                
                
                $pokemonAbilitiesDesc.append('<div id="'+ val.name +'-desc" style="display: none;">'+ val.desc +'</div>');                
            });
        
        $pokemonInfoAbilities.append($pokemonAbilitiesH1, $pokemonAbilitiesDiv, $pokemonAbilitiesDesc);
            
        //== Create pokemonInfoStats
        var $pokemonInfoStats       = $('<div class="pokemon-info-stats" id="basics"></div>');
    
            var $pokemonStatsH1     = $('<h1>Stats:</h1>');    
    
            //== Create Stats Table
            var $statsTable         = $('<div class="stats-table"></div>');
    
                var $statsTableHead = $('<div class="row" style="display:flex;"><div class="th name">Name</div><div class="th">&nbsp;</div><div class="th">&nbsp;</div><div class="th evs">EVs</div></div>');
                $.each(statsArr, function(i,val) {
                   $statsTable.append('<div class="row">' +
                                        '<div class="stat-name '+ val.name +'">' + val.name +'</div>' +       
                                        '<div class="stat-val"><span>' + val.stat +'</span></div>'+
                                        '<div class="stat-meter"><meter value="'+ val.stat +'" min="0" low="70" high="100" max="255"></meter></div>'+
                                        '<div class="stat-ev">' + val.effort + '</div>' +
                                      '</div>');        
                });            
    
        //Append Stats Table to pokemonInfoStats
        $pokemonInfoStats.append($pokemonStatsH1, $statsTableHead, $statsTable);
        
    
        //== Create evolutionFormsDiv
        var $evoFormsDiv            = $('<div class="evo-forms-div" id="evo" style="display:none;"></div>');  
    
            //Elements for evoFormsDiv
            var $evoFormsH1         = $('<h1>Evoultions</h1>');
            var $evoStagesDiv       = $('<div class="evo-stages"></div>');
    
                //Append elements to evoStagesDiv
                $firstStage     = $('<div class="first-stage">' +
                                            '<div class="evo-box">' + '<div class="sprite-bg"><i class="sprites ' + baseName + '"></i></div>' +
                                                '<div class="evo-info">' +
                                                    '<div class="name">' + baseName +'</div>' +
                                                    '<div>' + basicOrBaby + '</div>' +                     
                                                '</div>'+
                                            '</div>'+
                                        '</div>');
                
                $evoStagesDiv.append($firstStage);   
    
                if (hasSecondStage) {
                    $secondStage    =   $('<div class="second-stage">' +
                                            '<div class="evo-box">' + '<div class="sprite-bg"><i class="sprites ' + secondStageName + '"></i></div>' +
                                                '<div class="evo-info">' +
                                                    '<div class="name">' + secondStageName +'</div>' +
                                                    '<div class="method '+ secondStageMethod +'">' + secondStageTriggerName + " " + secondStageCondition + '</div>' +                                                   
                                                '</div>'+
                                            '</div>'+
                                        '</div>');               
    
                    $evoStagesDiv.append($secondStage);   
                }                
    
                if (hasSecondSplitStage) {
                    var $secondSplitStage    =   $('<div class="second-split-stage" style="float: right; width: 48%">' +
                                            '<div class="evo-box">' + '<div class="sprite-bg"><i class="sprites ' + secondSplitStageName + '"></i></div>' +
                                                '<div class="evo-info">' +
                                                    '<div class="name">' + secondSplitStageName +'</div>' +
                                                    '<div class="method '+ secondStageMethod +'">' + secondSplitStageTriggerName + " " + secondSplitStageCondition + '</div>' +                                                   
                                                '</div>'+
                                            '</div>'+
                                        '</div>');               
    
                    $secondStage.css({'float':'left', 'width':'48%'});
                    $evoStagesDiv.append($secondSplitStage);   
                }   
    
                if (hasThirdStage) {
                     $thirdStage     = $('<div class="third-stage">' +
                                            '<div class="evo-box">' + '<div class="sprite-bg"><i class="sprites ' + thirdStageName + '"></i></div>' +
                                                '<div class="evo-info">' +
                                                    '<div class="name">' + thirdStageName +'</div>' +
                                                    '<div class="method '+ thirdStageMethod +'">' + thirdStageTriggerName + " " + thirdStageCondition + '</div>' +                                                   
                                                '</div>'+
                                            '</div>'+
                                        '</div>');
                    
                    $evoStagesDiv.append($thirdStage);
                }
    
                if (hasSplitStage) {
                     var $splitStage     = $('<div class="split-stage" style="float: right;; width: 46%">' +
                                            '<div class="evo-box">' + '<div class="sprite-bg"><i class="sprites ' + splitStageName + '"></i></div>' +
                                                '<div class="evo-info">' +
                                                    '<div class="name">' + splitStageName +'</div>' +
                                                    '<div class="method '+ splitStageMethod +'">' + splitStageTriggerName + " " + splitStageCondition + '</div>' +                                                   
                                                '</div>'+
                                            '</div>'+
                                        '</div>');
                    
                    $thirdStage.css({'float':'left', 'width':'50%'});
                    
                    $evoStagesDiv.append($splitStage);
                }
    
        $evoFormsDiv.append($evoFormsH1, $evoStagesDiv);
    
    //==Create location div
    $pokemonInfoLocation            =   $('<div class="pokemon-info-location" id="location" style="display:none"></div>');
    
    
    //==Create Moves div
    $pokemonInfoMoves               =   $('<div class="pokemon-info-moves" id="moves" style="display:none"></div>');
        //Move elements
        $moveH1                     =   $('<h1>Moves</h1>');
        $moveContainer              =   $('<div class="move-container"></div>');
            $gameNavTabs                =   $('<div class="games nav">' +
                                                  '<ul class="games nav-tabs">' +
                                                    '<li><a href="#" id="red-blue">R/B</a></li>' +
                                                    '<li><a href="#" id="yellow">Y</a></li>' +
                                                    '<li><a href="#" id="gold-silver">G/S</a></li>' +
                                                    '<li><a href="#" id="crystal">C</a></li>' +
                                                    '<li><a href="#" id="ruby-sapphire">R/S</a></li>' +
                                                    '<li><a href="#" id="emeral">E</a></li>' +
                                                    '<li><a href="#" id="diamond-pearl">D/P</a></li>' +
                                                    '<li><a href="#" id="platinum">P</a></li>' +
                                                    '<li><a href="#" id="black-white">B/W</a></li>' +
                                                    '<li><a href="#" id="black2-white2">B2/W2</a></li>' +
                                                    '<li><a href="#" id="x-y">X/Y</a></li>' +
                                                    '<li><a href="#" id="omega-ruby-alpha-sapphire">OR/AS</a></li>' +
                                                  '</ul>' +
                                              '</div>');
        
            $methodNavTabs          =   $('<div class="method nav">' +
                                            '<ul class="method nav-tabs">' +
                                                '<li><a href="#" id="level-up">Level</a></li>' +
                                                '<li><a href="#" id="machine">TM/HM</a></li>' +
                                                '<li><a href="#" id="egg">Egg</a></li>' +
                                                '<li><a href="#" id="tutor">Tutor</a></li>' +
                                            '</ul>' + 
                                          '</div>');
            $moveTable              = $('<div class="table move-table"><div>');
                           
    
        //Append elements to moveContainer
        $moveContainer.append($gameNavTabs, $methodNavTabs, $moveTable);    
    
    //Append elements to pokemonInfoMoves
    $pokemonInfoMoves.append($moveH1, $moveContainer);
    
    //Append to pokemonInfoDIv
    $pokemonInfoDiv.append(
        $pokemonInfoTitle, $pokemonInfoNav, $pokemonInfoPokedex, $pokemonInfoAbilities, $horzRule, $pokemonInfoStats,
        $evoFormsDiv, $pokemonInfoLocation, $pokemonInfoMoves
    );
        
    
    //Append elements to overlay    
    $overlay.append($pokemonInfoDiv, $overlayClose);
    
    //Append Overlay to body
    $('body').prepend($overlay);

    //Get relevant data for moves
        $('.games.nav-tabs li a').on('click', function(i,val){
            gameSelection = $(this).attr('id');            
        });
         $('.method.nav-tabs li a').on('click', function(i,val){
            methodSelection = $(this).attr('id');            
            generateMoveTable(gameSelection, methodSelection);
        });
    
        //Generate the table html for the move table
            function generateMoveTable(game, method){                
                levelUpArr = [];
                levelUpObj = {};
                $.each(movesArr, function(i,val){                    
                    $.each(val, function(i,val){
                        if(val.game_name === game && val.method === method){
                            if (method === 'level-up') {
                                levelUpObj[val.level_learned]  =   val.move_name;                               
                            } 
                            /*$moveTable.append('<div class="row">' +
                                                '<div class="method">' + condition + '</div>' +
                                                '<div class="move-name">' + val.move_name + '</div>' +
                                              '</div>')*/
                        }
                    });
                });
                Object.keys(levelUpObj).sort();                
                levelUpArr.push(levelUpObj);
                
            }
    //Hide/show sections when buttons are pressed
        $("#pokemon-nav-basics").on('click', function() {
           $('#basics').toggle(); 
        });

        $("#pokemon-nav-evo").on('click', function() {
           $('#evo').toggle(); 
        });

        $("#pokemon-nav-location").on('click', function() {
           $('#location').toggle(); 
        });

        $("#pokemon-nav-moves").on('click', function() {
           $('#moves').toggle(); 
        });
    

    
    //Remove overlay when close is clicked    
    $overlayClose.click(function(){		
		$overlay.remove();
    });
}