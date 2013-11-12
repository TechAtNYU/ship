$(document).ready(function() {
	$("header.main nav li").hover( function() {
		var current = $(this).index();
		
		console.log(current)
		
		var test;
		
		switch(current) {
			case 0:
				test = "url(/lib/img/poc/frame1.jpg)";
				break;
			case 1:
				test = "url(/lib/img/poc/frame2.jpg)";
				break;
			case 2:
				test = "url(/lib/img/poc/frame3.jpg)";
				break;
			case 3:
				test = "url(/lib/img/poc/frame4.jpg)";
				break;
			case 4:
				test = "url(/lib/img/poc/frame5.jpg)";
				break;
			default:
				test = "url(/lib/img/cats/one.jpg)";
				break;
		}
		
		
		$("header.main").css("background-image", test).fadeIn(); 
	},
		
		function() { $("header.main").css("background-image", "none");	
		
	});
});
