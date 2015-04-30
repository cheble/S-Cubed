<script>

var products = [];
{% for data in site.data.details %}
  var tags = [];
  {% for tag in data[1].tags %}
    tags.push("{{ tag }}");
  {% endfor %}
  products.push({
    id: "{{ data[1].id }}",
    name: "{{ data[1].name }}",
    tags: tags,
    favorites: {{ data[1].favorites }},
    comments: {{ data[1].comments | size }}
  });
{% endfor %}

var Search ;
$(document).ready(function() {
  //DOM sensitive logic
  Search = new Search(getParameterByName("q"));
  Search.populatePage();
});


var Search = function(q){

  var context = this;

  var query = q;

  var matchedIds = [];

  var byName = [];

  var byComments = [];

  var byFavorites = [];

  for (i in products) {
    var product = products[i];

    if (query.toUpperCase() === product.id.toUpperCase() ||
          query.toUpperCase() === product.name.toUpperCase()) {
      matchedIds.push(product.id);
    } else {
      for ( j in product.tags ) {
        if (query.toUpperCase() === product.tags[j].toUpperCase()) {
          matchedIds.push(product.id);
          break;
        }
      }
    }
  }
  console.log(matchedIds);

  this.populatePage = function(){

    if (matchedIds.length == 0) {
      $("#top").html("<h2>Your search query does not produce any results.</h2><h3>Try another search query.</h3>");
    }
    $("#top").show();

    for ( i in matchedIds ) {
      $("#"+matchedIds[i]).parent().show();
    }

    this.sortResults();

  }

  this.sortResults = function(){
    var type = $("#sort").val();
    var order = $("#order").val();

    if (type == "Name") {
      products.sort(Search.compareProductByName);
    } else if (type == "Favorites") {
      products.sort(Search.compareProductByFavorites);
    } else if (type == "Comments") {
      products.sort(Search.compareProductByComments);
    }

    // reorder products;
    if (order == "Accending") {
      for (var i=products.length-1; i>=0; i--) {
        $("#"+products[i].id).parent().insertAfter("#top");
      }
    } else {
      for (var i=0; i<products.length; i++) {
        $("#"+products[i].id).parent().insertAfter("#top");
      }
    }

  }

}

Search.compareProductByName = function(a, b) {
  if (a.name < b.name) {
    return -1;
  } else if (a.name == b.name) {
    return 0;
  } else {
    return 1;
  }
}

Search.compareProductByFavorites = function(a, b) {
  return a.favorites - b.favorites;
}

Search.compareProductByComments = function(a, b) {
  return a.comments - b.comments;
}

</script>
