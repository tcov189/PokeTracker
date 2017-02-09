function getPkmnInfo (){
        var pkmnName = $('#pkmn-name').val();
        var pkmnDex  = $('#pkmn-dex').val();
        var pkmnType1  = $('#pkmn-type1').val();
        var pkmnType2  = $('#pkmn-type2').val();
        var pkmnXY  = $('#pkmn-xy').val();
        var pkmnORAS  = $('#pkmn-oras').val();
        
        var theInfoHTML = '';
        
        theInfoHTML += "<span>var " + pkmnName + " = new Pokemon(<span><br>" +     
        "<span class='indent'>'" + pkmnName + "',</span><br>" +
        "<span class='indent'>'" + pkmnDex + "',</span><br>";
        if (pkmnType2 !== '') {
            theInfoHTML += "<span class='indent'>['" + pkmnType1 + "', '" + pkmnType2 + "'],</span><br>";    
        } else {
             theInfoHTML += "<span class='indent'>['" + pkmnType1 + "'],</span><br>";
   
        }
        theInfoHTML += 
        "<span class='indent'>'No',</span><br>" +
        "<span class='indent'>''</span><br/>" +
        "<span>);</span><br>" +
        "<span>addToPokedexArr(" + pkmnName + ");</span><br><br><hr><br>";
        
        $('#pkmnjs').append(theInfoHTML);        
        
        var theLessHTML = '<span>&.' + pkmnName + ' {<br><br>}</span><br>';
        $('#pkmn input').val('');
        
        $('.lessresult').append(theLessHTML);
    }
    
    function clearPkmn(){
        $('#pkmnjs span').remove();
        $('.lessresult span').remove();
    }

    function clearLoc(){
        $('#loc-result span:nth-child(4)').remove();        
    }
    
    function getLocInfo() {
        var locName = $('#loc-name').val();
        
        var theLocInfoHTML = 
            '<span>var '+ locName.split(' ').join('_') + ' = new Location(<br>' +        
            '"' + locName + '",<br>' +
            '//Walk<br>' +
            "<span id='walkingPkmn'>'None',</span><br>"+
            '//YF<br>' +
            "<span id='yfPkmn'>'None',</span><br>"+
            '//RF<br>' +
            "<span id='rfPkmn'>'None',</span><br>"+
            '//PF<br>' +
            "<span id='pfPkmn'>'None',</span><br>"+
            '//Shaking<br>' +
            "<span id='shakingPkmn'>'None',</span><br>"+
            '//Horde<br>' +
            "<span id='hordePkmn'>'None',</span><br>"+
            '//Surf<br>' +
            "<span id='surfPkmn'>'None',</span><br>"+
            '//Old Rod<br>' +
            "<span id='oldRodPkmn'>'None',</span><br>"+
            '//Good Rod<br>' +
            "<span id='goodRodPkmn'>'None',</span><br>"+
            '//Super Rod<br>' +
            "<span id='superRodPkmn'>'None',</span><br>"+
            '//Rock Smash<br>' +
            "<span id='rockSmashPkmn'>'None',</span><br>"+
            '//Gift/Static<br>' +
            "<span id='giftStaticPkmn'>'None',</span><br>"+
            "<span>'',</span><br>"+
            "<span>''</span><br>"+
            ');';              
        $('#loc-result').append(theLocInfoHTML);    
        
        $('input#loc-name').val('');
    }
    
    //Walking Pkmn
    function emptyWalkingArray (){
      $('#walkingPkmn').html('[<br><span id="walkPkmnArray"></span>],');  
    }
    function addWalkingPkmn(){
        var walkPkmnName = $('#walking').val();
        var walkPkmnRate = $('#walk_rate').val();        
        var theWalkingInfo = "["+ walkPkmnName +", '" + walkPkmnRate + "%']<strong>,</strong><br>";        
        $('#walkPkmnArray').append(theWalkingInfo);
        
        $('#walking').val('');
        $('#walk_rate').val('');        
    }

    //YF Pkmn
    function emptyYFArray (){
      $('#yfPkmn').html('[<br><span id="yfPkmnArray"></span>],');  
    }
    function addYFPkmn(){
        var yfPkmnName = $('#yf').val();
        var yfPkmnRate = $('#yf_rate').val();        
        var theYFInfo = "["+ yfPkmnName +", '" + yfPkmnRate + "%']<strong>,</strong><br>";        
        $('#yfPkmnArray').append(theYFInfo);
        
        $('#yf').val('');
        $('#yf_rate').val('');        
    }

    function emptyRFArray (){
      $('#rfPkmn').html('[<br><span id="rfPkmnArray"></span>],');  
    }
    function addRFPkmn(){
        var rfPkmnName = $('#rf').val();
        var rfPkmnRate = $('#rf_rate').val();        
        var theRFInfo = "["+ rfPkmnName +", '" + rfPkmnRate + "%']<strong>,</strong><br>";        
        $('#rfPkmnArray').append(theRFInfo);
        
        $('#rf').val('');
        $('#rf_rate').val('');        
    }

    //PF Pkmn
    function emptyPFArray (){
      $('#pfPkmn').html('[<br><span id="pfPkmnArray"></span>],');  
    }
    function addPFPkmn(){
        var pfPkmnName = $('#pf').val();
        var pfPkmnRate = $('#pf_rate').val();        
        var thePFInfo = "["+ pfPkmnName +", '" + pfPkmnRate + "%']<strong>,</strong><br>";        
        $('#pfPkmnArray').append(thePFInfo);
        
        $('#pf').val('');
        $('#pf_rate').val('');        
    }

    //Shaking Pkmn
    function emptyShakingArray (){
      $('#shakingPkmn').html('[<br><span id="shakingPkmnArray"></span>],');  
    }
    function addShakingPkmn(){
        var shakePkmnName = $('#shaking').val();
        var shakePkmnRate = $('#shake_rate').val();        
        var theShakingInfo = "["+ shakePkmnName +", '" + shakePkmnRate + "%']<strong>,</strong><br>";        
        $('#shakingPkmnArray').append(theShakingInfo);
        
        $('#shaking').val('');
        $('#shake_rate').val('');
    }
    
    //Horde Pkmn
    function emptyHordeArray (){
      $('#hordePkmn').html('[<br><span id="hordePkmnArray"></span>],');  
    }
    function addHordePkmn(){
        var hordePkmnName = $('#horde').val();
        var hordePkmnRate = $('#horde_rate').val();        
        var theHordeInfo = "["+ hordePkmnName +", '" + hordePkmnRate + "%']<strong>,</strong><br>";        
        $('#hordePkmnArray').append(theHordeInfo);
        
        $('#horde').val('');        
    }
    
     //Surf Pkmn
    function emptySurfArray (){
      $('#surfPkmn').html('[<br><span id="surfPkmnArray"></span>],');  
    }
    function addSurfPkmn(){
        var surfPkmnName = $('#surf').val();
        var surfPkmnRate = $('#surf_rate').val();        
        var theSurfInfo = "["+ surfPkmnName +", '" + surfPkmnRate + "%']<strong>,</strong><br>";        
        $('#surfPkmnArray').append(theSurfInfo);
        
        $('#surf').val('');
        $('#surf_rate').val('');
    }
      
    //Old Rod Pkmn
    function emptyOldRodArray (){
      $('#oldRodPkmn').html('[<br><span id="oldRodPkmnArray"></span>],');  
    }
    function addOldRodPkmn(){
        var oldRodPkmnName = $('#oldRod').val();
        var oldRodPkmnRate = $('#oldRod_rate').val();        
        var theoldRodInfo = "["+ oldRodPkmnName +", '" + oldRodPkmnRate + "%']<strong>,</strong><br>";        
        $('#oldRodPkmnArray').append(theoldRodInfo);
        
        $('#oldRod').val('');
        $('#oldRod_rate').val('');
    }
    
    //Good Rod Pkmn
    function emptyGoodRodArray (){
      $('#goodRodPkmn').html('[<br><span id="goodRodPkmnArray"></span>],');  
    }
    function addGoodRodPkmn(){
        var goodRodPkmnName = $('#goodRod').val();
        var goodRodPkmnRate = $('#goodRod_rate').val();        
        var theGoodRodInfo = "["+ goodRodPkmnName +", '" + goodRodPkmnRate + "%']<strong>,</strong><br>";        
        $('#goodRodPkmnArray').append(theGoodRodInfo);
        
        $('#goodRod').val('');
        $('#goodRod_rate').val('');
    }
    
    //Super Rod Pkmn
    function emptySuperRodArray (){
      $('#superRodPkmn').html('[<br><span id="superRodPkmnArray"></span>],');  
    }
    
    function addSuperRodPkmn(){
        var superRodPkmnName = $('#superRod').val();
        var superRodPkmnRate = $('#superRod_rate').val();        
        var theSuperRodInfo = "["+ superRodPkmnName +", '" + superRodPkmnRate + "%']<strong>,</strong><br>";        
        $('#superRodPkmnArray').append(theSuperRodInfo);
        
        $('#superRod').val('');
        $('#superRod_rate').val('');
    }
    
     //Rock Smash Pkmn
    function emptyRockSmashArray (){
      $('#rockSmashPkmn').html('[<br><span id="rockSmashPkmnArray"></span>],');  
    }
    
    function addRockSmashPkmn(){
        var rockSmashPkmnName = $('#rockSmash').val();
        var rockSmashPkmnRate = $('#rockSmash_rate').val();        
        var theRockSmashInfo = "["+ rockSmashPkmnName +", '" + rockSmashPkmnRate + "%']<strong>,</strong><br>";        
        $('#rockSmashPkmnArray').append(theRockSmashInfo);
        
        $('#rockSmash').val('');
        $('#rockSmash_rate').val('');
    }
    
    //Gift/Static Pkmn
    function emptyGiftStaticArray (){
      $('#giftStaticPkmn').html('[<br><span id="giftStaticPkmnArray"></span>],');  
    }
    
    function addGiftStaticPkmn(){
        var giftStaticPkmnName = $('#giftStatic').val();
        var giftStaticPkmnFrom = $('#giftStatic_rate').val();        
        var theGiftStaticInfo = "[" + giftStaticPkmnName + ", '" + giftStaticPkmnFrom + "']<strong>,</strong><br>";        
        $('#giftStaticPkmnArray').append(theGiftStaticInfo);
        
        $('#giftStatic').val('');
        $('#giftStatic_rate').val('');
    }
    