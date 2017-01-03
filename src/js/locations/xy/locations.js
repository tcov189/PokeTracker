/*
Template
 = new Location(
"",
//Walk
'None',
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
'None',
//Horde
'None',
//Surf
'None',
//Old Rod
'None',
//Good Rod
'None',
//Super Rod
'None',
//Rock Smash
'None',
//Gift
'None',
//Static
'None',
'',
''
);*/

//Locations
Santalune_Forest = new Location(
    'Santalune Forest',
    //Walk
    [
        [Weedle, '20%', 'X'],
        [Caterpie, '20%', 'Y'],
        [Caterpie, '10%', 'X'],
        [Weedle, '10%', 'Y'],
        [Scatterbug, '20%'],
        [Pansage, '10%'],
        [Pansear, '10%'],
        [Panpour, '10%'],
        [Fletchling, '10%'],
        [Pikachu, '6%'],
        [Kakuna, '4%', 'X'],
        [Metapod, '4%', 'Y']
    ],
    //TG
    'None',
    //WtG
    'None',
    //YF
    'None',
    //RF
    'None',
    //PF
    'None',
    //Shaking
    'None',
    //Horde
    'None',
    //Surf
    'None',
    //Old Rod
    'None',
    //Good Rod
    'None',
    //Super Rod
    'None',
    //Rock Smash
    'None',
    //Gift
    'None',
    //Static
    'None',
    ['Route 3'],
    ['Route 2']
);


Victory_Road = new Location(
"Victory Road",
//Walk
[
    [Gurdurr, '30%'],
    [Graveler, '20%'],
    [Druddigon, '20%'],
    [Lickitung, '15%'],
    [Haunter, '10%'],
    [Zweilous, '5%']
],
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
[
    [Graveler, '--%'],
    [Ariados, '--%'],
    [Noibat, '--%'],
    [Fearow, '--%'],
    [Skarmory, '--%'],
    [Hydreigon, '--%']
],
//Horde
[
    [Floatzel, '--%'],
    [Geodude, '--%'],
    [Graveler, '--%'],
    [Lickitung, '--%']
],
//Surf
[
    [Lombre, 'Common'],
    [Poliwhirl, 'Common'],
    [Floatzel, 'Uncommon']
],
//Old Rod
[
    [Poliwag, '100%']
],
//Good Rod
[
    [Basculin, '70%'],
    [Poliwhirl, '30%']
],
//Super Rod
[
    [Poliwhirl, '65%'],
    [Basculin, '35%'],
    [Poliwrath, '5%']
],
//Rock Smash
[
    [Graveler, '95%'],
    [Shuckle, '5%']
],
//Gift
'None',
//Static
'None',
['Pokemon League'],
['Route 21', 'Route 22']
);

Pokemon_Village = new Location(
"Pokemon Village",
//Walk
'None',
//WtG
'None',
//WsW
'None',
//YF
[
    [Gothorita, '30%'],
    [Ditto, '20%'],
    [Amoonguss, '20%'],
    [Jigglypuff, '10%'],
    [Noctowl, '10%'],
    [Zoroark, '10%'],
],
//RF
'None',
//PF
[
    [Noctowl, '30%'],
    [Ditto, '20%'],
    [Amoonguss, '20%'],
    [Jigglypuff, '10%'],
    [Gothorita, '10%'],
    [Zoroark, '10%'],
],
//Shaking
[
    [Banette, '--%'],
    [Garbodor, '--%']
],
//Horde
[
    [Poliwag, '--%'],
    [Lombre, '--%'],
    [Foongus, '--%']
],
//Surf
[
    [Lombre, 'Common'],
    [Poliwhirl, 'Uncommon']
],
//Old Rod
[
    [Poliwag, '100%']
],
//Good Rod
[
    [Basculin, '70%'],
    [Poliwhirl, '30%']
],
//Super Rod
[
    [Poliwhirl, '70%'],
    [Basculin, '30%']
],
//Rock Smash
'None',
//Gift
'None',
//Static
[
    [Mewtwo, 'Lv. 70']
],
'',
['Route 20']
);

Terminus_Cave = new Location(
"Terminus Cave",
//Walk
[
    [Durant, '40%'],
    [Sandslash, '20%'],
    [Graveler, '20%'],
    [Lairon, '20%', 'X'],
    [Pupitar, '20%', 'Y']
],
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
[
    [Ariados, '--%'],
    [Noibat, '--%']
],
//Horde
[
    [Geodude, '--%'],
    [Aron, '--%', 'X'],
    [Larvitar, '--%','Y'],
    [Durant, '--%']
],
//Surf
'None',
//Old Rod
'None',
//Good Rod
'None',
//Super Rod
'None',
//Rock Smash
[
    [Graveler, '95%'],
    [Shuckle, '5%']
],
//Gift
'None',
//Static
[
    [Zygarde, 'Lv. 70']
],
'',
['Route 18']
);
Team_Flare_HQ = new Location(
"Team Flare HQ",
//Walk
'None',
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
'None',
//Horde
'None',
//Surf
'None',
//Old Rod
'None',
//Good Rod
'None',
//Super Rod
'None',
//Rock Smash
'None',
//Gift
'None',
//Static
[
    [Xerneas, 'Lv. 50', 'X'],
    [Yveltal, 'Lv. 50', 'Y']
],
['Route 18'],
['Anistar City']
);

Sea_Spirits_Den = new Location(
"Sea Spirit's Den",
//Walk
'None',
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
'None',
//Horde
'None',
//Surf
'None',
//Old Rod
'None',
//Good Rod
'None',
//Super Rod
'None',
//Rock Smash
'None',
//Gift
'None',
//Static
[
    [Articuno, 'Lv. 70'],
    [Zapdos, 'Lv. 70'],
    [Moltres, 'Lv. 70']
],
'',
['Azure Bay']
);


Pokemon_League = new Location(
"Pokemon League",
//Walk
'None',
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
'None',
//Horde
'None',
//Surf
'None',
//Old Rod
'None',
//Good Rod
'None',
//Super Rod
'None',
//Rock Smash
'None',
//Gift
'None',
//Static
'None',
['End'],
['Victory Road']
);

Pokeball_Factory = new Location(
"Pokeball Factory",
//Walk
'None',
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
'None',
//Horde
'None',
//Surf
'None',
//Old Rod
'None',
//Good Rod
'None',
//Super Rod
'None',
//Rock Smash
'None',
//Gift
'None',
//Static
'None',
'',
''
);

Parfum_Palace = new Location(
    "Parfum Palace",
    //Walk
    'None',
    //WtG
    'None',
    //WsW
    'None',
    //YF
    'None',
    //RF
    'None',
    //PF
    'None',
    //Shaking
    'None',
    //Horde
    'None',
    //Surf
    'None',
    //Old Rod
    [
        [Magikarp, '100%']
    ],
    //Good Rod
    [
        [Goldeen, '95%'],
        [Corphish, '5%']
    ],
    //Super Rod
    [
        [Gyarados, '65%'],
        [Seaking, '30%'],
        [Crawdaunt, '5%']
    ],
    //Rock Smash
    'None',
    //Gift
    'None',
    //Static
    'None',
    '',
    ['Route 6']
);

Lysandre_Labs = new Location(
"Lysandre Labs",
//Walk
'None',
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
'None',
//Horde
'None',
//Surf
'None',
//Old Rod
'None',
//Good Rod
'None',
//Super Rod
'None',
//Rock Smash
'None',
//Gift
'None',
//Static
'None',
'',
''
);

Lost_Hotel = new Location(
"Lost Hotel",
//Walk
[
    [Magneton, '20%'],
    [Electrode, '20%'],
    [Litwick, '20%'],
    [Pawniard, '20%'],
    [Klefki, '20%']
],
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
[
    [Rotom, '--%'],
    [Trubbish, '--%'],
    [Garbodor, '--%']
],
//Horde
'None',
//Surf
'None',
//Old Rod
'None',
//Good Rod
'None',
//Super Rod
'None',
//Rock Smash
'None',
//Gift
'None',
//Static
'None',
'',
['Route 15']
);

Kalos_Power_Plant = new Location(
"Kalos Power Plant",
//Walk
'None',
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
'None',
//Horde
'None',
//Surf
'None',
//Old Rod
'None',
//Good Rod
'None',
//Super Rod
'None',
//Rock Smash
'None',
//Gift
'None',
//Static
'None',
'',
''
);

Glittering_Cave = new Location(
"Glittering Cave",
//Walk
'None',
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
[
    [Machop, 'Common'],
    [Rhyhorn, 'Common'],
    [Cubone, 'Uncommon'],
    [Onyx, 'Uncommon'],
    [Lunatone, 'Rare'],
    [Solrock, 'Rare'],
    [Woobat, 'Rare'],
    [Ferroseed, 'Rare'],
    [Kangaskhan, 'Rare'],
    [Mawile, 'Rare']
],
//Horde
'None',
//Surf
'None',
//Old Rod
'None',
//Good Rod
'None',
//Super Rod
'None',
//Rock Smash
[
    [Dwebble, '65%'],
    [Onyx, '35%']
],
//Gift
'None',
//Static
'None',
'',
['Route 9']
);

var Frost_Cavern= new Location(
"Frost Cavern",
//Walk
[
    [Jynx, '20%'],
    [Piloswine, '20%'],
    [Beartic, '20%'],
    [Bergmite, '20%'],
    [Haunter, '16%'],
    [Cryogonal, '4%']
],
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
'None',
//Horde
[
    [Smoochum, '--%'],
    [Vanillite, '--%'],
    [Cubchoo, '--%']
],
//Surf
[
    [Poliwhirl, 'Common'],
    [Floatzel, 'Uncommon']
],
//Old Rod
[
    [Poliwag, '100%']
],
//Good Rod
[
    [Basculin, '70%'],
    [Poliwhirl, '30%']
],
//Super Rod
[
    [Poliwhirl, '65%'],
    [Basculin, '35%']
],
//Rock Smash
'None',
//Gift
'None',
//Static
'None',
'',
['Dendemille Town']
);

Flare_Cafe = new Location(
"Flare Cafe",
//Walk
'None',
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
'None',
//Horde
'None',
//Surf
'None',
//Old Rod
'None',
//Good Rod
'None',
//Super Rod
'None',
//Rock Smash
'None',
//Gift
'None',
//Static
'None',
'',
''
);

var Chamber_of_Emptiness = new Location(
"Chamber of Emptiness",
//Walk
'None',
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
'None',
//Horde
'None',
//Surf
'None',
//Old Rod
'None',
//Good Rod
'None',
//Super Rod
'None',
//Rock Smash
'None',
//Gift
'None',
//Static
'None',
'',
''
);

var Battle_Maison = new Location(
"Battle Maison",
//Walk
'None',
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
'None',
//Horde
'None',
//Surf
'None',
//Old Rod
'None',
//Good Rod
'None',
//Super Rod
'None',
//Rock Smash
'None',
//Gift
'None',
//Static
'None',
'',
''
);

var Battle_Chateau = new Location(
"Battle Chateau",
//Walk
'None',
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
'None',
//Horde
'None',
//Surf
'None',
//Old Rod
'None',
//Good Rod
'None',
//Super Rod
'None',
//Rock Smash
'None',
//Gift
'None',
//Static
'None',
'',
''
);

var Azure_Bay = new Location(
"Azure Bay",
//Walk
[
    [Slowpoke, '40%'],
    [Chatot, '35%'],
    [Inkay, '15%'],
    [Exeggcute, '10%']
],
//WtG
'None',
//WsW
'None',
//YF
'None',
//RF
'None',
//PF
'None',
//Shaking
'None',
//Horde
[
    [Slowpoke, '--%'],
    [Exeggcute, '--%'],
    [Wingull, '--%']
],
//Surf
[
    [Tentacool, 'Common'],
    [Mantyke, 'Uncommon'],
    [Lapras, 'Very Rare']
],
//Old Rod
[
    [Luvdisc, '100%']
],
//Good Rod
[
    [Remoraid, '70%'],
    [Chinchou, '30%']
],
//Super Rod
[
    [Alomomola, '65%'],
    [Octillery, '30%'],
    [Lanturn, '5%']
],
//Rock Smash
[
    [Dwebble, '66%'],
    [Binacle, '34%']
],
//Gift
'None',
//Static
'None',
['Sea Spirits Den'],
['Coumarine City']
);



Connecting_Cave = new Location(
    'Connecting Cave',
    //Walk
    [
        [Zubat, '30%'],
        [Whismur, '30%'],
        [Meditite, '30%'],
        [Axew, '10%']
    ],
    //TG
    'None',
    //WtG
    'None',
    //YF
    'None',
    //RF
    'None',
    //PF
    'None',
    //Shaking
    'None',
    //Horde
    [
        [Zubat, '--%'],
        [Whismur, '--%'],
        [Axew, '--%']
    ],
    //Surf
    'None',
    //Old Rod
    'None',
    //Good Rod
    'None',
    //Super Rod
    'None',
    //Rock Smash
    'None',
    //Gift
    'None',
    //Static
    'None',
    ['Route 8'],
    ['Route 7']
);

var Reflection_Cave = new Location (
    'Reflection Cave',
    //Walking
    [
        [MrMime, '20%'],
        [Roggenrola, '20%'],
        [Solosis, '20%'],
        [Chingling, '15%'],
        [Wobbuffet, '10%'],
        [Carbink, '10%'],
        [Sableye, '5%']
    ],
    //TG
    'None',
    //WtG
    'None',
    //YF
    'None',
    //RF
    'None',
    //PF
    'None',
    //Shaking
    [
        [Woobat, '--%'],
        [Ferroseed, '--%']
    ],
    [
        [MimeJr, '--%'],
        [Roggenrola, '--%'],
        [Carbink, '--%']
    ],
    //Surf
    "None",
    //Old Rod
    "None",
    //Great Rod
    "None",
    //Super Rod
    "None",
    //Rock Smash
    "None",
    //Gift
    'None',
    //Static
    'None',
    ['Shalour City'],
    ['Route 11']
);

var Tower_of_Mastery = new Location(
    'Tower Of Mastery',
    //Walking
    'None',
    //TG
    'None',
    //WtG
    'None',
    //YF
    'None',
    //RF
    'None',
    //PF
    'None',
    //Shaking
    'None',
    //Horde
    'None',
    //Surf
    'None',
    //Old Rod
    'None',
    //Great Rod
    'None',
    //Super Rod
    'None',
    //Rock Smash
    'None',
    //Gift
    [
        [Lucario, 'Korrina']
    ],
    //Static
    'None',
    //Next
    'Route 1',
    //Previous
    'None'
);
