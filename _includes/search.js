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
});


var Search = function(q){

  var context = this;

  var query = q;

  var matchedIds = [];

  //CONSTANTS//
  var name = "name";
  var tags = "tags";
  var image = "image";
  var details = "details";
  var website = "website";
  var download = "download";
  var Links = "Links";
  var favorites = "favorites";
  var comments = "comments";
  //--------//


  for (i in products) {
    var product = products[i];

    if (query.toUpperCase() === product.id.toUpperCase() ||
          query.toUpperCase() === product.name.toUpperCase()) {
      matchedIds.push(product.id);
    } else {
      console.log("else reached.");
      console.log(product.tags);
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
    $("#detailsImage").attr('src',sImage);
    $("#detailsTitle").html(sName);
    $("#detailsDetails").html(sDetails);
    $("#detailsHomePageLink").attr('href',sWebsite);
    $("#detailsDownloadLink").attr('href',sDownload);
    $("#detailsFavorites").html(String(nFavorites));


    //Tags, Links, Comments
    var tagLink = "#" //dumby

    var htmlTagOut=""
    for(var i = 0; i < arrTags.length; i++){
      var htmlTags = "<a href='<<href>>' class='btn btn-primary btn-raised'><<text>></a>"
      htmlTags = htmlTags.replace("<<href>>",tagLink);
      htmlTags = htmlTags.replace("<<text>>",arrTags[i]);
      htmlTagOut += htmlTags;
    }
    $("#detailsTags").html(htmlTagOut);

    var htmlLinksOut = "";
    for(var i = 0; i < arrLinks.length; i++){
      var htmlLinks = "<a  href='<<href>>' class='btn btn-primary btn-raised'><<text>></a><br />";
      htmlLinks = htmlLinks.replace("<<href>>",arrLinks[i].url);
      htmlLinks = htmlLinks.replace("<<text>>",arrLinks[i].description);
      htmlLinksOut += htmlLinks;
    }
    $("#detailsExtraLinks").html(htmlLinksOut);

    var htmlCommentsOut = "";
    for(var i = 0; i < arrComments.length; i++){
      var htmlComment = "<div class='comment_container'><span class='comment'><<comment>></span><br />";
      htmlComment += "<span class='comment_author'><<author>></span></div>";

      htmlComment = htmlComment.replace("<<comment>>",arrComments[i].comment);
      htmlComment = htmlComment.replace("<<author>>","- " + arrComments[i].username);
      htmlCommentsOut += htmlComment;
    }
    $("#detailsComments").html(htmlCommentsOut);

  }


}

</script>
