//------- Functionality for home page --//

//--- Dropdowns
//Hide show tech-info and app_info div 
$('#tech_header').click(function(){
    if ($('#tech_info').is(':hidden')){
        $('#tech_info').slideDown();
        $('#tech_header .arrowIcon').css('transform','rotate(0deg)');
    } else {
        $('#tech_info').slideUp();
        $('#tech_header .arrowIcon').css('transform','rotate(180deg)');
    }        
});

$('#app_info_header').click(function(){
    if ($('#app_info').is(':hidden')){
        $('#app_info').slideDown();
        $('#app_info_header .arrowIcon').css('transform','rotate(0deg)');
    } else {
        $('#app_info').slideUp();
        $('#app_info_header .arrowIcon').css('transform','rotate(180deg)');
    }   
});

//-- Button actions