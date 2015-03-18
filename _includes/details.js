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

    	var sDtails;

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
				var stopping = data;
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