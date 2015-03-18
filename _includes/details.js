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
	    	$("#detailsHomePageLink").attr('src',sWebsite);
	    	$("#detailsdownloadLink").attr('src',sDownload);
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
	    		var htmlLinks = "<a class='btn btn-flat btn-link' href='<<href>>'><<text>></a><br />";
	    		htmlLinks = htmlLinks.replace("<<href>>",arrLinks[i].url);
	    		htmlLinks = htmlLinks.replace("<<text>>",arrLinks[i].description);
	    		htmlLinksOut += htmlLinks;
	    	}
	    	$("#detailsExstraLinks").html(htmlLinksOut);

	    	var htmlCommentsOut = "";
	    	for(var i = 0; i < arrComments.length; i++){
	    		var htmlComment = "<div class='comment_container'><span class='comment'><<comment>></span><br />";
	    		htmlComment += "<span class='comment_author'><<author>></span></div>";

	    		htmlComment = htmlComment.replace("<<comment>>",arrComments[i].comment);
	    		htmlComment = htmlComment.replace("<<author>>",arrComments[i].username);
	    		htmlCommentsOut += htmlComment;
	    	}
	    	$("#detailsComments").html(htmlCommentsOut);

	    }

		this.setUp = function(){
			$.getJSON( "Details/"+sName+".json", function( data ) {
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


    }

    
</script>