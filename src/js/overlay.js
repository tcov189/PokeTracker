//Add overlay on click of zoom button

$mapOverlay = $('#map_overlay');

$('button.zoom').click(function(){
    $mapOverlay.show();
});