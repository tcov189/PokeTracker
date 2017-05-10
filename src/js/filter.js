//====== Filter functionality ======/
//Found at http://blog.grapii.com/2010/08/how-to-build-a-simple-search-filter-with-jquery/
(function ($) {
  jQuery.expr[':'].Contains = function(a,i,m){
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
  };

    function listFilter(list) {
        var form = $("form").attr({"id":"search_form","action":"#"}),
        input = $("input").attr({"id":"search_input","type":"text"});
       
        $(input).change( function () {
            var filter = $(this).val();
            if(filter) {
              $(list).find(".card_pokemon .card_pokemon-info .pokemon-info-bio .pokemon-bio-name:not(:Contains(" + filter + "))").closest('.card_pokemon').hide();
              $(list).find(".card_pokemon .card_pokemon-info .pokemon-info-bio .pokemon-bio-name:Contains(" + filter + ")").closest('.card_pokemon').show();          
            } else {
              $(list).find(".card_pokemon").show();
            }
            return false;
        }).keyup( function () {
            $(this).change();
        });       
    }

    $(function () {
        listFilter($("#pokedex"));
    });
}(jQuery));  