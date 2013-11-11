$(document).ready(function() {
	$("header.main nav li").hover( function() {
		var current = $(this).index();
		
		console.log(current)
		
		var test;
		
		switch(current) {
			case 0:
				test = "url(http://subtlepatterns.com/patterns/tree_bark.png)";
				break;
			case 1:
				test = "url(http://subtlepatterns.com/patterns/geometry.png)";
				break;
			case 2:
				test = "url(http://subtlepatterns.com/patterns/knitting250px.png)";
				break;
			case 3:
				test = "url(http://subtlepatterns.com/patterns/shattered.png)";
				break;
			case 4:
				test = "url(http://subtlepatterns.com/patterns/diagonal_striped_brick.png)";
				break;
			default:
				test = "url(/lib/img/cats/one.jpg)";
				break;
		}
		
		
		$("header.main").css("background-image", test); },
		
		function() { $("header.main").css("background-image", "none");	
		
	});
});
