$(document).ready(function () {
	var Ship = {
		"config": {
		},
		"init": function () {
			$("#masthead").fitText(0.48);
			$("img").unveil();
			Ship.shipShape();
			Ship.smoothScroll();

			var windowWidth = $(window).width();
			Ship.headerSwitcher(windowWidth);
			
			$(window).resize(function() {
				windowWidth = $(window).width();
				Ship.headerSwitcher(windowWidth);
			});
			
			$(document).scroll(function() {
				var top = $(document).scrollTop();
				Ship.sidebar(windowWidth, top);
			});
		},
		"shipShape": function () {
			// Get a handle to our canvas
			var canvas = $('#overlay');
			var ctx = canvas[0].getContext("2d");

			// Draw the black rectangle
			ctx.fillStyle = "#203447";
			ctx.fillRect(0,0,156,200);

			// Punch out the text!
			ctx.globalCompositeOperation = 'destination-out'; 
		
			ctx.save();
			ctx.translate(0,0);
			ctx.beginPath();
			ctx.moveTo(0,0);
			ctx.lineTo(157.026,0);
			ctx.lineTo(157.026,195.651);
			ctx.lineTo(0,195.651);
			ctx.closePath();
			ctx.clip();
			ctx.translate(0,0);
			ctx.translate(0,0);
			ctx.scale(1,1);
			ctx.translate(0,0);
			ctx.strokeStyle = 'rgba(0,0,0,0)';
			ctx.lineCap = 'butt';
			ctx.lineJoin = 'miter';
			ctx.miterLimit = 4;
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(87.016,31.264);
			ctx.lineTo(78.66300000000001,22.405);
			ctx.lineTo(70.30900000000001,31.264000000000003);
			ctx.lineTo(5,10);
			ctx.lineTo(37.654,63.412);
			ctx.bezierCurveTo(54.108000000000004,67.462,78.66300000000001,67.21,78.66300000000001,67.21);
			ctx.bezierCurveTo(78.66300000000001,67.21,103.21700000000001,67.46199999999999,119.67200000000001,63.41199999999999);
			ctx.lineTo(152.327,10);
			ctx.lineTo(87.016,31.264);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
			ctx.restore();
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(42.321,121.59);
			ctx.bezierCurveTo(42.811,119.23700000000001,43.300999999999995,116.59100000000001,43.007999999999996,114.533);
			ctx.bezierCurveTo(42.714,112.57300000000001,41.92999999999999,111.20100000000001,40.263999999999996,111.20100000000001);
			ctx.bezierCurveTo(37.519999999999996,111.299,36.04899999999999,114.14000000000001,35.166999999999994,118.355);
			ctx.bezierCurveTo(34.67699999999999,120.805,35.068999999999996,123.35300000000001,36.14699999999999,126.09700000000001);
			ctx.bezierCurveTo(37.22499999999999,128.841,38.49899999999999,131.684,39.968999999999994,134.722);
			ctx.bezierCurveTo(41.830999999999996,138.348,43.300999999999995,142.073,44.477,145.699);
			ctx.bezierCurveTo(45.555,149.32500000000002,46.044999999999995,153.05,45.163999999999994,156.97000000000003);
			ctx.bezierCurveTo(44.08599999999999,161.77300000000002,42.517999999999994,166.18300000000002,39.47899999999999,169.61400000000003);
			ctx.bezierCurveTo(36.440999999999995,173.04400000000004,32.519999999999996,175.10200000000003,26.639999999999993,175.10200000000003);
			ctx.bezierCurveTo(19.876999999999995,175.10200000000003,16.544999999999995,172.55400000000003,15.270999999999994,168.63300000000004);
			ctx.bezierCurveTo(13.800999999999993,164.71300000000005,14.584999999999994,159.61600000000004,15.663999999999994,154.12800000000004);
			ctx.lineTo(26.247999999999994,153.14800000000005);
			ctx.bezierCurveTo(25.561999999999994,156.18700000000004,25.071999999999996,159.22500000000005,25.365999999999993,161.47900000000004);
			ctx.bezierCurveTo(25.659999999999993,163.83200000000005,26.443999999999992,165.39900000000003,28.697999999999993,165.39900000000003);
			ctx.bezierCurveTo(31.834999999999994,165.39900000000003,33.59799999999999,162.06700000000004,34.67699999999999,157.46100000000004);
			ctx.bezierCurveTo(35.166999999999994,155.10900000000004,34.67699999999999,152.36400000000003,33.59899999999999,149.52300000000005);
			ctx.bezierCurveTo(33.30499999999999,148.83700000000005,33.01099999999999,148.05300000000005,32.71699999999999,147.36700000000005);
			ctx.bezierCurveTo(32.422999999999995,146.68100000000004,32.12899999999999,145.89700000000005,31.83499999999999,145.21100000000004);
			ctx.bezierCurveTo(31.14799999999999,143.74100000000004,30.36499999999999,142.17300000000003,29.58099999999999,140.50700000000003);
			ctx.bezierCurveTo(28.796999999999986,138.84100000000004,28.012999999999987,137.17500000000004,27.227999999999987,135.31300000000005);
			ctx.bezierCurveTo(25.561999999999987,131.58800000000005,24.679999999999986,127.86500000000004,24.38599999999999,124.14000000000004);
			ctx.bezierCurveTo(24.091999999999988,122.27800000000005,24.38599999999999,120.31800000000004,24.777999999999988,118.35800000000005);
			ctx.bezierCurveTo(25.561999999999987,114.43700000000004,27.325999999999986,110.22300000000004,30.364999999999988,106.98900000000005);
			ctx.bezierCurveTo(33.20699999999999,103.85300000000005,37.12699999999999,101.59800000000004,42.12599999999999,101.50100000000005);
			ctx.bezierCurveTo(48.69199999999999,101.40300000000005,51.72999999999999,104.04900000000005,53.00499999999999,107.87100000000005);
			ctx.bezierCurveTo(54.18099999999999,111.79200000000006,53.78799999999999,116.59400000000005,52.90599999999999,120.61200000000005);
			ctx.lineTo(42.321,121.59);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
			ctx.restore();
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(71.7,142.955);
			ctx.lineTo(63.468,142.955);
			ctx.lineTo(56.803000000000004,174.317);
			ctx.lineTo(46.218,174.317);
			ctx.lineTo(61.507000000000005,102.28200000000001);
			ctx.lineTo(72.09100000000001,102.28200000000001);
			ctx.lineTo(65.721,132.07600000000002);
			ctx.lineTo(73.953,132.07600000000002);
			ctx.lineTo(80.32300000000001,102.28200000000002);
			ctx.lineTo(90.90800000000002,102.28200000000002);
			ctx.lineTo(75.62,174.317);
			ctx.lineTo(65.036,174.317);
			ctx.lineTo(71.7,142.955);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
			ctx.restore();
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(98.746,102.282);
			ctx.lineTo(109.33099999999999,102.282);
			ctx.lineTo(94.04199999999999,174.317);
			ctx.lineTo(83.457,174.317);
			ctx.lineTo(98.746,102.282);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
			ctx.restore();
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(117.168,102.282);
			ctx.lineTo(127.75300000000001,102.282);
			ctx.bezierCurveTo(132.359,102.282,136.67200000000003,103.36,139.514,106.78999999999999);
			ctx.bezierCurveTo(142.357,110.22099999999999,143.63,115.61099999999999,141.769,123.844);
			ctx.bezierCurveTo(139.907,132.076,136.476,137.369,132.262,140.79899999999998);
			ctx.bezierCurveTo(128.047,144.23,123.147,145.503,118.54,145.503);
			ctx.lineTo(112.46400000000001,174.31699999999998);
			ctx.lineTo(101.87900000000002,174.31699999999998);
			ctx.lineTo(117.168,102.282);
			ctx.closePath();
			ctx.moveTo(120.795,134.723);
			ctx.bezierCurveTo(124.029,134.723,126.283,134.13500000000002,127.753,132.46900000000002);
			ctx.bezierCurveTo(129.321,130.901,130.106,128.25400000000002,130.987,124.23600000000002);
			ctx.bezierCurveTo(131.869,120.21800000000002,132.16299999999998,117.47400000000002,131.38,115.61200000000002);
			ctx.bezierCurveTo(130.596,113.94600000000003,128.635,113.06300000000002,125.401,113.06300000000002);
			ctx.lineTo(120.795,134.723);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
			ctx.restore();
			ctx.restore();
		},
		"headerSwitcher": function (ww) {
			var $navCol = $("header.main nav li");
			
			function hoverBars() {
				$navCol.hover(function() {
					var index = $(this).index();
					var bg;
					
					switch(index) {
					case 0:
						bg = "url(/lib/img/bowery.jpg)";
						break;
					case 1:
						bg = "url(/lib/img/demo.jpg)";
						break;
					case 2:
						bg = "url(/lib/img/phys.jpg)";
						break;
					case 3:
						bg = "url(/lib/img/grantophone.jpg)";
						break;
					case 4:
						bg = "url(/lib/img/hotdogs.jpg)";
						break;
					case 5:
						bg = "url(/lib/img/raise-cache.jpg)";
						break;
					case 6:
						bg = "url(/lib/img/branch.jpg)";
						break;
					case 7:
						bg = "url(/lib/img/retreat.jpg)";
						break;
					default:
						bg = "url(/lib/img/hotdogs.jpg)";
						break;
					}
					
					$("header.main").css("background-image", bg);
				});
			}
			
			function divideNav() {
				if (ww > 620) {
					$navCol.width(ww/8.5);
					hoverBars();
				} else {
					$navCol.removeAttr("style")
				}
			}
			return divideNav();
		},
		"getSectionOffsets": function () {
			var collection = [];
			
			var Section = function(top, ref) {
				this.top = top;
				this.ref = ref;
			}
			
			$(".blog").each(function() {
				collection.push(new Section($(this)[0].offsetTop, $(this)[0].id));
			});
			return collection;
		},
		"sidebar": function (ww, top) {
			var $sbar = $(".logo aside");
			var $nav = $("header.main nav");
			
			function removeSidebar() {
				$sbar.fadeOut("fast");
				$nav.fadeIn();
			}
			function showSidebar() {
				$sbar.fadeIn().addClass("sticky");
				$nav.fadeOut();
			}
            
			function decideSidebar() {
				var checkOffset = Ship.getSectionOffsets();
				var ratchet = 0;
				function compareOffset() {
					console.log(ratchet)
					console.log(ww + " CURRENT")
					console.log(checkOffset[ratchet].top + " FIRST")
					console.log(checkOffset[ratchet + 1].top + " SECOND")
					
					
					if (ww > checkOffset[ratchet].top && ww < checkOffset[ratchet + 1].top) {
						console.log("WINNER")
						console.log(checkOffset[ratchet].ref)
					} else if (ww > checkOffset[ratchet + 1].top) {
						console.log("overshoot");
						ratchet++;
						compareOffset();
					}
				}
				
				if (ww < 1100) {
					if ($sbar.is(":visible")) {
						removeSidebar();
					}
					return;
				}
				else {
					if (top > 380) {
						showSidebar();
						//compareOffset();
					}
					else if (top < 380) {
						removeSidebar();
					}        
				}
			}
			
			return decideSidebar();
		},
		"smoothScroll": function () {
			$(function() {
				var offsets = Ship.getSectionOffsets();
				
				$('a[href*=#]:not([href=#])').click(function() {
					var ms;
					for (var i = 0; i < offsets.length; i++) {
						if ("#" + offsets[i].ref === $(this)[0].hash) {
							console.log(offsets[i].top);
							var top = offsets[i].top;
							var currentLocation = $(document).scrollTop();
							var diff = Math.abs(top - currentLocation)
							
							ms = Math.log(diff, 10) * 100;
						}
					}

					if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
						var target = $(this.hash);
						target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
						if (target.length) {
							$('html,body').animate({
								scrollTop: target.offset().top
							}, ms);
							return false;
						}
					}
				});
			});
		}
	}
	Ship.init();
});