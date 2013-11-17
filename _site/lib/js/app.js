$(document).ready(function() {
	var header = $("header.main nav li");
	
	//$("header.main nav li").hover( function() {
	//	var current = $(this).index();
	//	
	//	//console.log(current)
	//	
	//	var test;
	//	
	//	switch(current) {
	//		case 0:
	//			test = "url(/lib/img/poc/frame1.jpg)";
	//			break;
	//		case 1:
	//			test = "url(/lib/img/poc/frame2.jpg)";
	//			break;
	//		case 2:
	//			test = "url(/lib/img/poc/frame3.jpg)";
	//			break;
	//		case 3:
	//			test = "url(/lib/img/poc/frame4.jpg)";
	//			break;
	//		case 4:
	//			test = "url(/lib/img/poc/frame5.jpg)";
	//			break;
	//		default:
	//			test = "url(/lib/img/cats/one.jpg)";
	//			break;
	//	}
	//	
	//	
	//	$("header.main").css("background-image", test).fadeIn(); 
	//},
		
		//function() { $("header.main").css("background-image", "none");	
		
//	});
	
	
	header.mousemove(function( event ) {
		var self = $(this);
		
		var current = $(this).index();
		var location = event.pageX;
		var offset = self.offset().left;
		var width = self.width();
		var relative = location - offset;
		
		console.log(relative);
		
		var limit =  width / 5;
		var background;
		
		if (current === 1) {
			switch(true) {
				case (relative < limit):
					background = "url(/lib/img/poc/frame1.jpg)";
					break;
				case (relative < limit*2):
					background = "url(/lib/img/poc/frame2.jpg)";
					break;
				case (relative < limit*3):
					background = "url(/lib/img/poc/frame3.jpg)";
					break;
				case (relative < limit*4):
					background = "url(/lib/img/poc/frame4.jpg)";
					break;
				case (relative < limit*5):
					background = "url(/lib/img/poc/frame5.jpg)";
					break;
				default:
					console.log("what");
			}
		}
		$("header.main").css("background-image", background); 
		
	});
	header.mouseover(function() {
		$(".logo").fadeOut();
	})
	
	header.mouseout(function() {
		$("header.main").css("background-image", "none");	
	});
});


