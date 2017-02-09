$(document).ready(function () {

	$('.main-slider').owlCarousel({
		dots: true,
		nav: false,
		items: 1
	});

	$('.clients__track').owlCarousel({
		autoWidth:true,
		autoplay: true,
		loop: true,
		slidesToScroll: 1,
		items: 6
	});

});