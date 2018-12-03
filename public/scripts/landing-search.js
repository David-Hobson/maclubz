let letters = $(".letter-select");


letters.each(function(index, letter){
	$(letter).click(function(){
		letters.removeClass("test");
		$(this).addClass("test");
	})
});	


let searchBox = $(".search-box");

searchBox.keyup(function(){
	$(".landing-title").addClass("hide");

	if(searchBox.val() == ""){
		$(".landing-title").removeClass("hide");
	}
});
