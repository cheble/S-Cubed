<script>
	var Details ;
    $(document).ready(function() {
    	//DOM sensitive logic
    	Details = new Details(getParameterByName("d"));
    	Details.setUp();
    });


    var Details = function(d){

    	var context = this;

    	var sName = d;

    	var arrTags = [];

    	var sImage;

    	var sDetails;

    	var sWebsite;

    	var sDownload;

    	var arrLinks = []; //array ( of link )

    	var nFavorites;

    	var arrComments = []; //arrary ( of comment )

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

	    this.populatePage = function(){
	    	$("#detailsImage").attr('src',sImage);
	    	$("#detailsTitle").html(sName);
	    	$("#detailsDetails").html(sDetails);
				if (sWebsite === undefined) {
					$("#detailsHomePageLink").hide();
				} else {
					$("#detailsHomePageLink").attr('href',sWebsite);
				}
				if (sDownload === undefined) {
					$("#detailsDownloadLink").hide();
				} else {
					$("#detailsDownloadLink").attr('href',sDownload);
				}
	    	$("#detailsFavorites").html(String(nFavorites));


	    	//Tags, Links, Comments
	    	var tagLink = "#" //dumby

	    	var htmlTagOut=""
	    	for(var i = 0; i < arrTags.length; i++){
	    		var htmlTags = "<a href='<<href>>' style='padding:4px 15px; margin:2px 2px' class='btn btn-info btn-xs'><<text>></a>"
	    		htmlTags = htmlTags.replace("<<href>>","SearchResults.html?q=" +encodeURIComponent(arrTags[i]));
	    		htmlTags = htmlTags.replace("<<text>>",arrTags[i]);
	    		htmlTagOut += htmlTags;
	    	}
	    	$("#detailsTags").html(htmlTagOut);

	    	var htmlLinksOut = "";
	    	for(var i = 0; i < arrLinks.length; i++){
	    		var htmlLinks = "<a  href='<<href>>'  target=\"_blank\" class='btn btn-default btn-raised'><<text>></a><br />";
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
	    	htmlCommentsOut += '<div class="form-group comment_container">';
			htmlCommentsOut += '<label for="comment">Leave a Comment:</label>';
			htmlCommentsOut += '<textarea class="form-control comment_area" rows="9" id="comment"></textarea>';
			htmlCommentsOut += '<a href="#" class="btn btn-raised btn-primary btn-flat">Submit</a>';
			htmlCommentsOut += '</div>';

	    	$("#detailsComments").html(htmlCommentsOut);

	    }

		this.setUp = function(){
			$.getJSON( "_data/"+sName+".json", function( data ) {
				//Build this Details Object
				sName = data.name;
				sImage = data.image;
				sDetails = data.details;
				sWebsite = data.website;
				sDownload = data.download;
				nFavorites = Number(data.favorites);

				for(var i = 0; i < data.tags.length; i++){
					arrTags.push(data.tags[i]);
				}

				for(var i = 0; i < data.Links.length; i++){
					var l = new link(data.Links[i].description, data.Links[i].url);
					arrLinks.push(l);
				}

				for(var i = 0; i < data.comments.length; i++){
					var c = new comment(data.comments[i].username,data.comments[i].comment);
					arrComments.push(c);
				}

				context.populatePage();
			}).done(function() {
			    console.log( "second success" );
			  })
			  .fail(function( jqxhr, textStatus, error ) {
			    var err = textStatus + ", " + error;
			    console.log( "Request Failed: " + err );
			  })
			  .always(function() {
			    console.log( "complete" );
			  });
			}

			var link = function(description,url){

	    	this.description = description;
	    	this.url = url;

	    }

	    var comment = function(username,comment){

	    	this.username = username;
	    	this.comment = comment;

	    }

			this.favoriteAction = function(){

				if ( $(".favorite").children().first().hasClass("fa-star") ) {
					// Favorite -> non-Favorite
					$(".favorite").attr("data-original-title", "Remove From Your Favorites.");
					$(".favorite").children().first().removeClass("fa-star");
					$(".favorite").children().first().addClass("fa-star-o");

					// decrement number
					$("#detailsFavorites").html(String(nFavorites));
				} else {
					// non-Favorite -> Favorite
					$(".favorite").attr("data-original-title", "Add To Your Favorites!");
					$(".favorite").children().first().removeClass("fa-star-o");
					$(".favorite").children().first().addClass("fa-star");

					// increment number
					$("#detailsFavorites").html(String(nFavorites+1));
				}
			}

    }


</script>
