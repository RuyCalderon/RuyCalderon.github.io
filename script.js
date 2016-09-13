function setDefaultSize(startFontSize, originalWidth){
	$(this).css('font-size', startFontSize);
	$(this).css('width', originalWidth);
}

$(document).ready(function(event) {
	console.log('test');

	$('.navbar-wrapper').find('.navbar-option').each(function(){
		$(this).mousemove(function(event){
			console.log('(' + event.originalEvent.offsetX + ', '
						    + event.originalEvent.offsetY + ')' );

			var maxHeight = parseFloat($('.navbar-wrapper').css('height').replace('px','')/2);
			var originalWidth = parseFloat($('.navbar-wrapper').css('width').replace('px','')) * 0.19;

			var startFontSize = 32;
			var endFontSize = 64; //default: 20
			
			var YFromCenter = Math.abs(event.originalEvent.offsetY - maxHeight);

			var normalized = 1-(YFromCenter / maxHeight);
			var targetFontSize = normalized * (endFontSize - startFontSize) + startFontSize;
			var targetDivSize = (1.0+normalized) * originalWidth;

			$(this).css('font-size', targetFontSize);
			$(this).css('width', targetDivSize);
			$(this).siblings().each(setDefaultSize(startfontSize, originalWidth));
		});
	});
});