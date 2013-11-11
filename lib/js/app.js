$(document).ready( function() {
	
	$(".project").each( function() {
		var classes = $(this).attr("class");
		console.log(classes);
		
	    var color = '#'+Math.floor(Math.random()*16777215).toString(16);
		var bg = $(this).attr("data-bg");
	
		$(this).css("background", "url(/lib/img/" + bg + ".png) center center");
		
	});
	
	$(".project").hover(function() {
		$(this).find("div").fadeIn("50");
	}, function() {
		$(this).find("div").fadeOut();
	});
		

		//temp
		var golden = 1.61803398875;
		var container = $(".container").width();
		
		
		
		console.log(container / golden);
		var gold = container/golden;
		var gold2 = container - gold;
		var gold3 = gold - gold2;
		var gold4 = gold2 - gold3;
		var gold5 = gold3 - gold4;
		var gold6 = gold4 - gold5;
		var gold7 = gold5 - gold6;
		var gold8 = gold6 - gold7;
		
		console.log(container)
		
		
		
		$("li").eq(0).width(gold).height(gold) //.css("background", "url(http://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Starsinthesky.jpg/1280px-Starsinthesky.jpg)");
		$("li").eq(1).width(gold3).height(gold3) //.css("background", "url(http://images.nationalgeographic.com/wpf/media-live/photos/000/012/cache/stars_1230_600x450.jpg)");
		$("li").eq(2).width(gold4).height(gold4) //.css("background", "url(http://d1jqu7g1y74ds1.cloudfront.net/wp-content/uploads/2010/06/Glittering-Metropolis-of-Stars.jpg)");
		$("li").eq(3).width(gold5).height(gold5) //.css("background", "url(http://scienceblogs.com/startswithabang/files/2011/05/stars-nasa1.jpeg)");
		$("li").eq(4).width(gold6).height(gold6) //.css("background", "url(http://i.space.com/images/i/000/005/973/i02/hubble-starburst-large-100706-02.jpg?1294094877)")
		$("li").eq(5).width(gold7).height(gold7);
		$("li").eq(6).width(gold8).height(gold7);
		$("li").eq(7).width(gold2).height(gold2) //.css("background", "url(http://upload.wikimedia.org/wikipedia/commons/6/6a/A_Swarm_of_Ancient_Stars_-_GPN-2000-000930.jpg)");
		
		//	switch (path.data("id")) {
		//	//b to d
		//	case "vRel1":
		//		path.attr({"stroke-linejoin": "round", "stroke-dasharray": ". "})
		//		break;
		//	//d to f
		//	case "vRel3":
		//		path.attr({"stroke-width": 10})
		//		break;
		//	// a to b
		//	case "hRel0":
		//		path.attr({"stroke-width": 10})
		//		break;
		//	// c to d
		//	case "hRel2":
		//		path.attr({"stroke-width": 10})
		//	 	break;
		//	// e to f
		//	case "hRel4":
		//		path.attr({"stroke-linejoin": "miter", "stroke-dasharray": "- "})
		//		break;
		//	default:
		//	  	path.attr({"stroke-width":1})
		//	}
		
		
		//	var genMult = 66;
		//	var constant = golden * genMult;
		//	
        //	
		//	var sep = classes.split(" ");
		//	var widthMult = parseInt(sep[1].slice(2), 10)
		//	console.log(widthMult)
		//	
		//	var heightMult = parseInt(sep[2].slice(2), 10)
		//	console.log(heightMult)
		//	
		//	
		//	
		//	$(this).width(widthMult*constant);
		//	$(this).height(heightMult*constant)

	
});

