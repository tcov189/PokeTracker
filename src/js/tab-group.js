//// ==== Tab Group JS ==== ////

// Vars for targeting the various elements
var $tabGroup           = $(".tab-group");
var $tabGroupNav        = $(".tab-group ul.tab-group-nav");
var $navTab             = $(".tab-group ul.tab-group-nav .nav-tab");
var $tabGroupContent    = $(".tab-group .tab-group-content");


// Add event listener
$navTab.on('click', function(){
    // If this doesn't active class, then remove active class from other elems and add it to this elem 
    if (!$(this).hasClass('active')) {
        $navTab.removeClass('active');
        $(this).addClass('active');
        
        // Match the data attrs
        var navTabDataLabel             = $(this).data('tab');
        var tabGroupContentMatch        = $tabGroup.find('[data-content='+ navTabDataLabel +']');
        
        if (!tabGroupContentMatch.hasClass('active')) {
            $tabGroupContent.removeClass('active');
            tabGroupContentMatch.addClass('active');
        }
    }
});