$(document).ready(function() {
	var header = $("header.main nav li");
	
	header.hover( function() {
		var current = $(this).index();
		
		//console.log(current)
		
		var test;
		
		switch(current) {
			case 0:
				test = "url(/lib/img/pattern/1.png)";
				break;
			case 1:
				test = "url(/lib/img/pattern/2.png)";
				break;
			case 2:
				test = "url(/lib/img/pattern/3.png)";
				break;
			case 3:
				test = "url(/lib/img/pattern/4.png)";
				break;
			case 4:
				test = "url(/lib/img/pattern/5.png)";
				break;
			default:
				test = "url(/lib/img/cats/one.jpg)";
				break;
		}
		
		
		$("header.main").css("background-image", test);
	},
		
		function() { $("header.main").css("background-image", "none");	
		
	});
	
});


