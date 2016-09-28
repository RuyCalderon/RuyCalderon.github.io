$(document).ready(function(){
	$('.main-header').mousemove(function(event) {
		//it is actually changing position, so this will be difficult
		
	});


	$('.deadzone').mouseenter(function(event) {
		$(this).parent().removeClass('start-state').addClass('end-state');
		$(this).parent().siblings('.start-state').removeClass('start-state').addClass('end-state');
	});
	$('.deadzone').parent().mouseleave(function(event) {
		$(this).removeClass('end-state').addClass('start-state');
		$(this).siblings('.end-state').removeClass('end-state').addClass('start-state');
	});
});