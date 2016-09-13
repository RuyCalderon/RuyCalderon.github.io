function setDefaultSize(selector, args){
	$(selector).css('font-size', args.defaultSize);
	$(selector).css('width', args.defaultWidth - ((args.targetElementWidth - args.defaultWidth) / 4));
}

$(document).ready(function(event) {
	console.log('test');

	$('.main-header').find('.navbar-option').each(function(){
		$(this).mousemove(function(event){
			var maxHeight = parseFloat($('.main-header').css('height').replace('px','')/2);
			var originalWidth = parseFloat($('.main-header').css('width').replace('px','')) * 0.19;
			var currentHalfWidth = parseFloat($(this).css('width').replace('px',''))/2;

			var startFontSize = 32;
			var endFontSize = 64; //default: 20
			
			var YFromCenter = Math.abs(event.originalEvent.offsetY - maxHeight);
			var XFromCenter = Math.abs(event.originalEvent.offsetX - currentHalfWidth);
			console.log(XFromCenter + ' ' + YFromCenter);
			var YNormalized = 1.0-(YFromCenter / maxHeight);
			var XNormalized = 1.0-(XFromCenter / currentHalfWidth);
			var normalized = XNormalized*(YNormalized*0.5 + XNormalized*0.5);

			var targetFontSize = normalized * (endFontSize - startFontSize) + startFontSize;
			var targetDivSize = (1.0+normalized) * originalWidth;

			$(this).css('font-size', targetFontSize);
			$(this).css('width', targetDivSize);
			$(this).siblings().each(function(){
				var args = {'defaultSize': startFontSize, 'defaultWidth': originalWidth, 'targetElementWidth': targetDivSize};
				setDefaultSize(this, args);
			});
		});
	});
});