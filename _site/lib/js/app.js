$(document).ready( function() {
	
	$(".project").each( function() {
		var classes = $(this).attr("class");
		console.log(classes);
		
	    var color = '#'+Math.floor(Math.random()*16777215).toString(16);
		$(this).css("background-color", color);
		
		var array = [];
		
		//temp
		var golden = 1.6;
		var genMult = 66;
		var constant = golden * genMult;
		

		var sep = classes.split(" ");
		var widthMult = parseInt(sep[1].slice(2), 10)
		console.log(widthMult)
		
		var heightMult = parseInt(sep[2].slice(2), 10)
		console.log(heightMult)
		
		
		
		$(this).width(widthMult*constant);
		$(this).height(heightMult*constant)
	});
	
});

