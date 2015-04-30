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
    $("#sort").prop('selectedIndex', -1);
    $("#top").show();

    for ( i in matchedIds ) {
      $("#"+matchedIds[i]).parent().show();
    }

  }

  this.sortResults = function(){
    var type = $("#sort").val();

    if (type == "Name") {
      products.sort(compareProductByName());
    } else if (type == "Favorites") {
      products.sort(compareProductByFavorites());
    } else if (type == "Comments") {
      products.sort(compareProductByComments());
    }

    // reorder products;
    for (var i=products.length-1; i>=0; i--) {
      $("#"+products[i].id).parent().insertAfter("#top");
    }

    console.log("sorted");
  }

  this.compareProductByName(a, b) = function() {
    if (a.name < b.name) {
      return -1;
    } else if (a.name == b.name) {
      return 0;
    } else {
      return 1;
    }
  }

  this.compareProductByFavorites(a, b) = function() {
    return a.favorites - b.favorites;
  }

  this.compareProductByComments(a, b) = function() {
    return a.comments - b.comments;
  }

}

</script>
