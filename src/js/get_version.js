//// -------- Purpose: Set Version for app to use --------////

// User picks version of game they are playing and set localStorage accordingly

$('#version_button_group .button').on('click', function(){
    var version = $(this).attr('id');
    localStorage.setItem("version", version.toUpperCase());
    
    window.location.href = 'tracker.html';
});