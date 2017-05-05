//// -------- Purpose: Set Version for app to use --------////

// User picks version of game they are playing and set localStorage accordingly

$('#version_button_group .button').on('click', function(){
    var version = $(this).attr('id');    
    var name = $('#version_button_group .button#'+ localStorage.getItem('version')).attr('name');
    
    if (localStorage.getItem('version')) {
        if (localStorage.getItem('version') !== version) {
             if (confirm('It looks like you already started a game in ' + name + '. Would you like to start a new one?')) {
                localStorage.clear();
                localStorage.setItem("version", version);
            }    
        }        
    } else {
        localStorage.setItem("version", version);
    }    
    
    window.location.href = 'tracker.html';
});