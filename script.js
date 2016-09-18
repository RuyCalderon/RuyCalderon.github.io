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
				var deadZoneX = parseFloat($(event.target).css('width').replace('px',''));
				var deadZoneY = parseFloat($(event.target).css('height').replace('px',''));

				var xMin = deadZoneX / 2;
				var yMin = deadZoneY / 2;

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
					$(event.target).children('.submenu').children('submenu-popup').each(function(){
						$(this).attr('hidden','true');
					});
				});
				$(event.target).children('.submenu').removeAttr('hidden');
			}
		});

		// $(this).find('.submenu').children('.submenu-option').each(function(){
		// 	$(this).find('.deadzone').on('click',funcion(){
		// 		$(this).siblings().find('.submenu-popup').attr('hidden','false');
		// 	});
		// });
	});

});