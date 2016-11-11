function toIndex(){
	window.location = '../index.html'
}

$(document).ready(function(){
	$('span.popup-option').on('mouseenter',function(){
		$(this).css('width','100%').children('.popup-menu').children('.section-label-small').css('font-size','36px').addClass('underlined');
		$(this).siblings('span.popup-option').css('display','none').siblings('.section-label-small').css('font-size','36px').removeClass('underlined');
	}).on('mouseleave',function(){
		$(this).css('width','45%').children('.popup-menu').children('.section-label-small').css('font-size','20px').removeClass('underlined');
		$(this).siblings('span.popup-option').css('display','inline-block').siblings('.section-label-small').css('font-size','48px').addClass('underlined');
	});



	$('.section-label-tiny').on('click',function(){
		var current = $(this).next().find('.content-text').css('display');
		if(current == 'none'){
			$(this).next().find('.content-text').css('display','block');
		}
		else{
			$(this).next().find('.content-text').css('display','none');
		}
	});
});