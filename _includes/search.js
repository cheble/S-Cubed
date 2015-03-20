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
      $("#0").html("<h2>Your search query does not produce any results.</h2><h3>Try another search query.</h3>");
      $("#0").show();
    }

    for ( i in matchedIds ) {
      $("#"+matchedIds[i]).parent().show();
    }

  }


}

</script>
