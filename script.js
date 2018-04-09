function setDefaultSize(selector, defaultSize){
	$(selector).css('font-size', defaultSize);
}
function domStrToFloat(string){
	return parseFloat(string.replace('px',''));
}

$(document).ready(function(event) {

	$('.main-header').find('.navbar-option').each(function(){

		if($(this).prev().length){
			var previousLeft = domStrToFloat($(this).prev().css('left'));
			var divWidth = domStrToFloat($('.main-header').css('width'))*0.2;


			//for ie
			if(previousLeft.toString() == 'NaN'){
				previousLeft = parseFloat($(this).prev().prop('clientLeft'));
			}
			if(divWidth.toString() == 'NaN'){
				var divWidth = domStrToFloat($('.main-header').css('width'))*0.2;
			}
			$(this).css('left', (previousLeft + divWidth).toString() + 'px');
		}
		$(this).mousemove(function(event){
			var height = domStrToFloat($(this).css('height'));
			var width = domStrToFloat($(this).css('width'));
			var mouseLocationX = event.originalEvent.offsetX;
			var mouseLocationY = event.originalEvent.offsetY;

			var startFontSize = 32;
			var endFontSize = 54;

			if(!$(event.target).hasClass('deadzone') && $(event.target).parents('.deadzone').length == 0){
				$(event.target).find('.submenu').css('display','none');

				var deadzone = $(event.target).children('.deadzone');
				var deadZoneWidth = domStrToFloat($(deadzone).css('width'));
				var deadZoneHeight = domStrToFloat($(deadzone).css('height'));
				var deadZoneLocX = $(deadzone).prop('offsetLeft');
				var deadZoneLocY = $(deadzone).prop('offsetTop');
			
				var xMin = deadZoneWidth / 2;
				var yMin = deadZoneHeight / 2;

				//using deadZoneHeight and deadZoneWidth gives proper behavior...
				//but I like the way this looks more.

				var x = Math.abs(mouseLocationX - width/2);
				var y = Math.abs(mouseLocationY - height/2);

				var xMax =  width / 2;
				var yMax =  height / 2;
				var ratioX = (x - xMin) / (xMax - xMin);
				var ratioY = (y - yMin) / (yMax - yMin);
				
				var ratioToUse = (1.0-ratioY)*(1.0-ratioX);
				
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

function toResume(location){
	window.location='Menu/resume.html?'+location;
}

function toAlgoda(){
	window.location='https://github.com/RuyCalderon/RC_AlgoDa';
}

function toLD34(){
	window.location='https://github.com/RuyCalderon/LudumDare-34-entry'
}

function toAboutMe(){
	window.location='Menu/about.html'
}

function toTesseract()
{
	window.location = 'Portfolio/Tesseract.html'
}