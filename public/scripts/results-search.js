let searchBox = $(".search-box");
let teams = $(".teams");


function teamsSearch(){
	teams.each(function(){
        if(this.getAttribute("tags").toLowerCase().includes(searchBox.val().trim().toLowerCase())){
            $(this).removeClass("non-search");
        }else {
            $(this).addClass("non-search");
        }
    });

    if(teams.length == $(".non-search").length){
    	$(".no-results").removeClass("hide");
    	console.log("TEST");
    }else{
    	$(".no-results").addClass("hide");
    }
}

searchBox.keyup(function(){
	teamsSearch();
});

$(document).ready(function(){
	teamsSearch();
})