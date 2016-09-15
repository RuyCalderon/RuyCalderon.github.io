function setDefaultSize(selector, defaultSize){
	$(selector).css('font-size', defaultSize);
}

$(document).ready(function(event) {
	console.log('test');

	$('.main-header').find('.navbar-option').each(function(){
		if($(this).prev().length){
			var previousLeft = parseFloat($(this).prev().css('left').replace('px',''));
			var divWidth = parseFloat($('.main-header').css('width').replace('px','')*0.19);
			$(this).css('left', (previousLeft + divWidth).toString() + 'px');
		}
		$(this).mousemove(function(event){
			var height = parseFloat($(this).css('height').replace('px',''));
			var width = parseFloat($(this).css('width').replace('px',''));
			var mouseLocationX = event.originalEvent.offsetX;
			var mouseLocationY = event.originalEvent.offsetY;

			var startFontSize = 32;
			var endFontSize = 48;
			if(!$(event.target).hasClass('deadzone')){
				var deadZoneX = parseFloat($(this).find('.deadzone').css('width').replace('px',''));
				var deadZoneY = parseFloat($(this).find('.deadzone').css('height').replace('px',''));

				var xMin = deadZoneX / 2;
				var yMin = deadZoneY / 2;

				var x = Math.abs(mouseLocationX - width/2);
				var y = Math.abs(mouseLocationY - height/2);

				var xMax =  width / 2;
				var yMax =  height / 2;

				var ratioX = (x - xMin) / (xMax - xMin);
				var ratioY = (y - yMin) / (yMax - yMin);

				var ratioToUse = 1-((ratioX < 0) ? ratioY : ratioX);

				// console.log('X: ' + parseInt(xMin) + '<' + parseInt(x) + '<' + parseInt(xMax));
				// console.log('Y: ' + parseInt(yMin) + '<' + parseInt(y) + '<' + parseInt(yMax));
				// console.log('C/M: ' + ratioToUse);

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
				});	
			}
		});
	});
});