//// -------- Purpose: Set Version for app to use --------////

// User picks version of game they are playing and set localStorage accordingly

$(".version_X").on("click", function(){
    localStorage.setItem("version","X");
    localStorage.setItem("location", "Vaniville_Town"); 
});

$(".version_Y").on("click", function(){
    localStorage.setItem("version","Y");
    localStorage.setItem("location", "Vaniville_Town");
});