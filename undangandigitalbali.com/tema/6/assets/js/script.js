(function ($) {
	"use strict";
	
	// Hero slider
	$('.js-hero-slider').slick({
		autoplay: false,
		autoplaySpeed: 2000,
		infinite: true,
		arrows: false,
		fade: true,
		speed: 800
	});

	/* COUNTDOWN*/
	var $countdown = $('.js-countdown');
	var $date = $countdown.attr('data-date');

	$countdown.countdown($date, function(event) {
		$('.js-countdown-days').html(event.strftime('%D'));
		$('.js-countdown-hours').html(event.strftime('%H'));
		$('.js-countdown-minutes').html(event.strftime('%M'));
		$('.js-countdown-seconds').html(event.strftime('%S'));
	});

	/* ANIMASI */
	AOS.init({
		disable: false,
		easing: 'ease', 
		once: false,
		mirror: true,
		duration: 900,
		delay: 0,
	});


	/* MASONRY GRID */
	var $grid = $('.grid').masonry({
		itemSelector: '.grid-item',
		//columnWidth: '.grid-sizer',
		gutter: '.gutter-sizer',
	});

	$grid.imagesLoaded().progress( function() {
		$grid.masonry('layout');
	});
	
	/* SLIDE GALERY */
	var $slider = $('.js-slider').slick({
		centerMode: true,
		centerPadding: '5%',
		slidesToShow: 3,
		autoplay: true,
		autoplaySpeed: 1800,
		prevArrow: '.js-arrow-prev',
		nextArrow: '.js-arrow-next',
		focusOnSelect: true,
		responsive: [
			{
			breakpoint: 1200,
			settings: {
				arrows: true,
				slidesToShow: 3
				}
			},
			{
			breakpoint: 480,
			settings: {
				arrows: true,
				slidesToShow: 1
				}
			}
		]
	});
	
    jQuery('.story-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

	/* ACTIVE LINK */
	function getSectionsOffset() {
		var sections = $('.js-section');
		var sectionsInfo = [];

		sections.each(function() {
			var $self = $(this);
			sectionsInfo.push({
				id: $self.attr('id'),
				offset: $self.offset().top - 100,
			});
		});

		return sectionsInfo;
	}

	function setActiveNavLink() {
		var scrollPosition = $(window).scrollTop() + 53;
		for ( var i = 0; i < sectionsInfo.length; i++) {
			if( scrollPosition >= sectionsInfo[i].offset ) {
				$( '.js-nav-link' ).removeClass('active');
				$( '.js-nav-link[href="#'+ sectionsInfo[i].id + '"]' ).addClass('active');
			}
		}
	}

	function debounce( func, wait ) {
		var timeout;
		var later = function() {
			timeout = undefined;
			func.call();
		};

		return function() {
			if ( timeout ) {
				clearTimeout( timeout );
			}
			timeout = setTimeout( later, wait );
		};
	};
	
    $(document).ready(function(){
		$('#modal_undangan').modal('show');
	});
	
	$(window).on('scroll', function () {
        if ($(this).scrollTop() > 100) {
            $('#buttonmusic').fadeIn('fast');
        }else {
            $('#buttonmusic').fadeOut('fast');
        }
    });
	
	$(document).ready(function(){
		$(document).bind("contextmenu",function(e){
			return false;
		});
	});
	
    $(document).ready(function() {
        $("#list-ucapan").load("load.php");
    });
	
	var buttonmodal = document.getElementById("button-modal");
    var button = document.getElementById("buttonmusic");
    var audio = document.getElementById("player");
    var videos = document.querySelectorAll("video"); // semua video
    
    audio.loop = true;
    
    // flag untuk simpan apakah user sengaja mematikan musik
    var isMusicManuallyPaused = false;
    
    // fungsi untuk cek apakah ada video yang masih play
    function anyVideoPlaying() {
        return Array.from(videos).some(v => !v.paused && !v.ended);
    }
    
    button.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            button.innerHTML = "<ion-icon name='volume-high-outline'></ion-icon>";
            isMusicManuallyPaused = false; // user nyalakan musik
        } else {
            audio.pause();
            button.innerHTML = "<ion-icon name='volume-mute-outline'></ion-icon>";
            isMusicManuallyPaused = true; // user matikan musik
        }
    });
    
    buttonmodal.addEventListener("click", function(){
        $('.js-hero-slider').slick('slickPlay');
    
        if (audio.paused && !isMusicManuallyPaused) {
            audio.play();
            button.innerHTML = "<ion-icon name='volume-high-outline'></ion-icon>";
        }
    });
    
    // kasih event ke semua video
    videos.forEach(function (vid) {
        vid.addEventListener("play", function () {
            audio.pause();
            button.innerHTML = "<ion-icon name='volume-mute-outline'></ion-icon>";
        });
    
        vid.addEventListener("pause", function () {
            // kalau tidak ada video lain yg masih play & user belum mute manual → musik play lagi
            if (!anyVideoPlaying() && !isMusicManuallyPaused) {
                audio.play();
                button.innerHTML = "<ion-icon name='volume-high-outline'></ion-icon>";
            }
        });
    });

}(jQuery));
