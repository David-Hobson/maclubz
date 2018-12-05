let letters = $(".letter-select");
let category = $(".category");
let teams = $(".teams");
let clearLetter = $(".clear-letter");

letters.each(function(index, letter){
	$(letter).click(function(){
		letters.removeClass("highlight");
		$(this).addClass("highlight");
		letterSearch($(this).html());
	});
});

category.change(function(){
	categorySearch($(this).val());
});

clearLetter.click(function(){
	letters.removeClass("highlight");
	teams.removeClass("non-search");
	clearLetter.addClass("hide");
	category.val("Select Category");
	$(".no-results").addClass("hide");
});


function letterSearch(letter){
	category.val("Select Category");

	teams.each(function(index, team){
		if(this.getAttribute("name").toLowerCase()[0] == letter.toLowerCase()){
            $(this).removeClass("non-search");
        }else {
            $(this).addClass("non-search");
        }
	});

	if(teams.length == $(".non-search").length){
    	$(".no-results").removeClass("hide");
    }else{
    	$(".no-results").addClass("hide");
    }

    clearLetter.removeClass("hide");
}	

function categorySearch(category){
	letters.removeClass("highlight");
	if(category != "Select Category"){
		teams.each(function(index, team){
			if(this.getAttribute("type").toLowerCase() == category.toLowerCase()){
	            $(this).removeClass("non-search");
	        }else {
	            $(this).addClass("non-search");
	        }
		});

		if(teams.length == $(".non-search").length){
	    	$(".no-results").removeClass("hide");
	    }else{
	    	$(".no-results").addClass("hide");
	    }
    }else{
    	teams.removeClass("non-search");
    }
}
