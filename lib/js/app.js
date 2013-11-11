$(document).ready(function() {
	$("header.main nav li").hover( function() {

		$("header.main").css("background-image", "url(/lib/img/cats/three.jpg)"); },
		
		function() { $("header.main").css("background-image", "none");	
		
	});
});
