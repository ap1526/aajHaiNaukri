jQuery(function ($) {
	'use strict';

	// START MENU JS
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 50) {
			$('.main-nav').addClass('menu-shrink');
		} else {
			$('.main-nav').removeClass('menu-shrink');
		}
	});

	// Mean Menu
	// jQuery('.mean-menu').meanmenu({
	// 	meanScreenWidth: '991'
	// });

	// Sorting Portfolio JS
	try {
		var mixer = mixitup('#container', {
			controls: {
				toggleDefault: 'none'
			}
		});
	} catch (err) { }

	//keywords add

	$(".keywords-container").each(function () {
		console.log("hello");
		var keywordInput = $(this).find(".keyword-input");
		var keywordsList = $(this).find(".keywords-list");
		function addKeyword() {
			var $newKeyword = $("<span class='keyword'><span class='keyword-remove'></span><span class='keyword-text'>" + keywordInput.val() + "</span></span>");
			keywordsList.append($newKeyword).trigger('resizeContainer');
			keywordInput.val("");
		}
		keywordInput.on('keyup', function (e) {
			if ((e.keyCode == 13) && (keywordInput.val() !== "")) {
				addKeyword();
			}
		});
		$('.keyword-input-button').on('click', function () {
			if ((keywordInput.val() !== "")) {
				console.log("hello"); addKeyword();
			}
		});
		$(document).on("click", ".keyword-remove", function () {
			$(this).parent().addClass('keyword-removed');
			function removeFromMarkup() {
				$(".keyword-removed").remove();
			}
			setTimeout(removeFromMarkup, 500);
			keywordsList.css({ 'height': 'auto' }).height();
		});
		keywordsList.on('resizeContainer', function () {
			var heightnow = $(this).height();
			var heightfull = $(this).css({ 'max-height': 'auto', 'height': 'auto' }).height();
			$(this).css({ 'height': heightnow }).animate({ 'height': heightfull }, 200);
		});
		$(window).on('resize', function () {
			keywordsList.css({ 'height': 'auto' }).height();
		});
		$(window).on('load', function () {
			var keywordCount = $('.keywords-list').children("span").length;
			if (keywordCount > 0) {
				keywordsList.css({ 'height': 'auto' }).height();
			}
		});
	});


	// Odometer JS
	$('.odometer').appear(function (e) {
		var odo = $('.odometer');
		odo.each(function () {
			var countNumber = $(this).attr('data-count');
			$(this).html(countNumber);
		});
	});

	// Companies Slider JS
	$('.companies-slider').owlCarousel({
		loop: true,
		margin: 0,
		nav: false,
		dots: true,
		smartSpeed: 1000,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			},
			600: {
				items: 2,
			},
			1000: {
				items: 4,
			}
		}
	});

	// Profile Slider JS
	$('.profile-slider').owlCarousel({
		loop: true,
		margin: 0,
		nav: false,
		dots: true,
		smartSpeed: 1000,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			},
			600: {
				items: 2,
			},
			1000: {
				items: 4,
			}
		}
	});

	// Subscribe form
	$(".newsletter-form").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			// handle the invalid form...
			formErrorSub();
			submitMSGSub(false, "Please enter your email correctly.");
		} else {
			// everything looks good!
			event.preventDefault();
		}
	});
	function callbackFunction(resp) {
		if (resp.result === "success") {
			formSuccessSub();
		}
		else {
			formErrorSub();
		}
	}
	function formSuccessSub() {
		$(".newsletter-form")[0].reset();
		submitMSGSub(true, "Thank you for subscribing!");
		setTimeout(function () {
			$("#validator-newsletter").addClass('hide');
		}, 4000)
	}
	function formErrorSub() {
		$(".newsletter-form").addClass("animated shake");
		setTimeout(function () {
			$(".newsletter-form").removeClass("animated shake");
		}, 1000)
	}
	function submitMSGSub(valid, msg) {
		if (valid) {
			var msgClasses = "validation-success";
		} else {
			var msgClasses = "validation-danger";
		}
		$("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
	}

	// AJAX MailChimp
	$(".newsletter-form").ajaxChimp({
		url: "https://envytheme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
		callback: callbackFunction
	});

	// PRELOADER
	// jQuery(window).on('load', function () {

	// 	jQuery(".loader").fadeOut(500);
	// });

	// Wow JS
	new WOW().init();

	// Accordion JS
	$('.accordion > li:eq(0) a').addClass('active').next().slideDown();
	$('.accordion a').on('click', function (j) {
		var dropDown = $(this).closest('li').find('p');
		$(this).closest('.accordion').find('p').not(dropDown).slideUp(300);
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).closest('.accordion').find('a.active').removeClass('active');
			$(this).addClass('active');
		}
		dropDown.stop(false, true).slideToggle(300);
		j.preventDefault();
	});

	// Back to top 
	$('body').append('<div id="toTop" class="back-to-top-btn"><i class="icofont-dotted-up"></i></div>');
	$(window).scroll(function () {
		if ($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();
		} else {
			$('#toTop').fadeOut();
		}
	});
	$('#toTop').on('click', function () {
		$("html, body").animate({ scrollTop: 0 }, 900);
		return false;
	});



	// Buy Now Btn
	//$('body').append("<a href='https://themeforest.net/checkout/from_item/26313553?license=regular&support=bundle_6month&_ga=2.14942449.634514020.1646539215-1425290503.1590986634' target='_blank' class='buy-now-btn'><img src='assets/img/envato.png' alt='envato'/>Buy Now</a>");

	// Switch Btn
	//$('body').append("<div class='switch-box'><label id='switch' class='switch'><input type='checkbox' onchange='toggleTheme()' id='slider'><span class='slider round'></span></label></div>");
}(jQuery));


// function to set a given theme/color-scheme
function setTheme(themeName) {
	localStorage.setItem('gable_theme', themeName);
	document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
	if (localStorage.getItem('gable_theme') === 'theme-dark') {
		setTheme('theme-light');
	} else {
		setTheme('theme-dark');
	}
}

//toast on creat-account

// Immediately invoked function to set the theme on initial load
// (function () {
//     if (localStorage.getItem('gable_theme') === 'theme-dark') {
//         setTheme('theme-dark');
//         document.getElementById('slider').checked = false;
//     } else {
//         setTheme('theme-light');
//       document.getElementById('slider').checked = true;
//     }
// })();