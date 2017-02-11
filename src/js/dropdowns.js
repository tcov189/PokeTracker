//------- Functionality for home page --//

//--- Dropdowns
$('.dropdown-heading').on('click', function(){
    $(this).siblings().slideToggle();
    $(this).toggleClass('open');
});