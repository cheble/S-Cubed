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

		this.setUp = function(){
			$.getJSON( "Details/"+sName+".json", function( data ) {
				//Build this Details Object
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