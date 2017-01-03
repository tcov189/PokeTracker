//====== Filter functionality ======/
//Found at http://blog.grapii.com/2010/08/how-to-build-a-simple-search-filter-with-jquery/
(function ($) {
  jQuery.expr[':'].Contains = function(a,i,m){
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
  };

  function listFilter(list) {
    var form = $("form").attr({"id":"searchForm","action":"#"}),
        input = $("input").attr({"id":"search-input","type":"text"});

    $(input)
      .change( function () {
        var filter = $(this).val();
        if(filter) {
          $(list).find(".pkmn-card .pkmn-card-info p:not(:Contains(" + filter + "))").closest('.pkmn-card').hide();
          $(list).find(".pkmn-card .pkmn-card-info p:Contains(" + filter + ")").parent().show();
          $(list).find(".pkmn-card .pkmn-card-info p span:not(:Contains(" + filter + "))").closest('.pkmn-card').hide();
          $(list).find(".pkmn-card .pkmn-card-info p span:Contains(" + filter + ")").parent().show();
        } else {
          $(list).find(".pkmn-card").show();
        }
        return false;
      })
    .keyup( function () {
        $(this).change();
    });
  }

  $(function () {
    listFilter($("#pokedex"));
  });
}(jQuery));  