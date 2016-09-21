function setDefaultSize(selector, defaultSize){
	$(selector).css('font-size', defaultSize);
}
function domStrToFloat(string){
	return parseFloat(string.replace('px',''));
}

$(document).ready(function(event) {
	console.log('test');

	$('.main-header').find('.navbar-option').each(function(){
		if($(this).prev().length){
			var previousLeft = parseFloat($(this).prev().css('left').replace('px',''));
			var divWidth = parseFloat($('.main-header').css('width').replace('px','')*0.2);
			$(this).css('left', (previousLeft + divWidth).toString() + 'px');
		}
		$(this).mousemove(function(event){
			var height = parseFloat($(this).css('height').replace('px',''));
			var width = parseFloat($(this).css('width').replace('px',''));
			var mouseLocationX = event.originalEvent.offsetX;
			var mouseLocationY = event.originalEvent.offsetY;

			var startFontSize = 32;
			var endFontSize = 48;

			if(!$(event.target).hasClass('deadzone') && $(event.target).parents('.deadzone').length == 0){
				$(event.target).find('.submenu').css('display','none');

				var deadzone = $(event.target).children('.deadzone');
				var deadZoneWidth = domStrToFloat($(deadzone).css('width'));
				var deadZoneHeight = domStrToFloat($(deadzone).css('height'));
				var deadZoneLocX = $(deadzone).prop('offsetLeft');
				var deadZoneLocY = $(deadzone).prop('offsetTop');
			
				var xMin = deadZoneLocX / 2;
				var yMin = deadZoneLocY / 2;

				var x = Math.abs(mouseLocationX - width/2);
				var y = Math.abs(mouseLocationY - height/2);

				var xMax =  width / 2;
				var yMax =  height / 2;

				var ratioX = (x - xMin) / (xMax - xMin);
				var ratioY = (y - yMin) / (yMax - yMin);

				var ratioToUse = 1-((ratioX < 0) ? ratioY : ratioX);

				var targetFontSize = ratioToUse *(endFontSize - startFontSize) + startFontSize;
				targetFontSize = (targetFontSize < startFontSize) ? startFontSize : (targetFontSize > endFontSize) ? endFontSize : targetFontSize;
				$(this).css('font-size', targetFontSize);
				$(this).siblings().each(function(){
					setDefaultSize(this, startFontSize);
				});
			}
			else{
				$(this).siblings().each(function(){
					setDefaultSize(this, startFontSize);
					$(this).find('.submenu').css('display','none');
					//have to add below line to work around bug in chrome in which the width of
					//the span is miscalculated after hiding the submenu
					$($(this).find('.deadzone')[0]).css('display','none').css('display','inline-block');
				});
				$(event.target).find('.submenu').css('display','block');

			}
			
		});
	});

});