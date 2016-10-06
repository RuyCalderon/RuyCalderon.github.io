function getStateLocations(){
	var selector = arguments[0];
	var result = {	'start-state':{}, 
					'end-state':{},
					'end-selected-poll':{}};
					
	for(key in result){
		if(!$(selector).hasClass(key)){
			$(selector).addClass(key);
		}
		for(var i = 1; i < arguments.length; ++i){
			result[key][arguments[i]] = parseFloat($(selector).css(arguments[i]).replace('px',''))
		}
		$(selector).removeClass(key);
	}
	$(selector).addClass('start-state');
	
	return result;
}

function outsideBounds(selector, position){
	return true;
}

function toVec3Quad(locationObj, zLevel){
	var left = 0;
	var hasLeft = false;
	var right = 0;
	var hasRight = false;
	var top = 0;
	var hasTop = false;
	var bottom = 0;
	var hasBottom = false;
	var _width = 0;
	var hasWidth = false;
	var _height = 0;
	var hasHeight = false;

	if('left' in locationObj){
		left = locationObj.left;
		hasLeft = true;
	}
	if('right' in locationObj){
		right = locationObj.right;
		hasRight = true;
	}
	if('top' in locationObj){
		top = locationObj.top;
		hasTop == true;
	}
	if('bottom' in locationObj){
		bottom = locationObj.bottom;
		hasBottom = true;
	}
	if('width' in locationObj){
		_width = locationObj.width;
		hasWidth = true;	
	}
	if('height' in locationObj){
		_height = locationObj.height;
		hasHeight = true;	
	}

	if(!hasWidth){
		_width = right - left;
	}
	if(!hasHeight){
		_height = bottom - top;
	}
	if(!hasLeft){
		left = right - _width;
	}
	if(!hasRight){
		right = left + _width;
	}
	if(!hasTop){
		top = bottom - _height;
	}
	if(!hasBottom){
		bottom = top + _height;
	}

	var topLeft = Vec3(left, top, zLevel);
	var topRight =  Vec3(right, top, zLevel);
	var bottomRight = Vec3(right, bottom, zLevel);
	var borromLeft = Vec3(left, bottom, zLevel);

	var Quad = Quad_3(topLeft, topRight, bottomRight, topLeft);
	return Quad;
}

function Quad_3(topLeft, topRight, bottomRight, bottomLeft){
	var Quad = {_0_0:topLeft,
				_1_0:topRight,
				_1_1:bottomRight,
				_0_1:bottomLeft};
	return Quad;
}
function Vec3(X, Y, Z){
	var Vec3 = {X:X, Y:Y, Z:Z};
	return Vec3;
}
function Poly6s_3d(top, bottom){
	var poly6s = {
		_0_0_0:top._0_0,
		_1_0_0:top._1_0,
		_1_1_0:top._1_1,
		_0_1_0:top._0_1,
		_0_0_1:bottom._0_0,
		_1_0_1:bottom._1_0,
		_1_1_1:bottom._1_1,
		_0_1_1:bottom._0_1
	}
	return poly6s;
}

function getAnimationProgress(mouse, plane){
	//'top' is initial frame, so 0, a little fucked but i visualize it better
	//this way in my head.
	var iHatCoord = (mouse.X - (plane.jHat.Y))/(plane.iHat.X + (plane.iHat.Y*plane.jHat.X)/plane.jHat.Y);
	var jHatCoord = (mouse.Y - (plane.iHat.X))/(plane.jHat.Y + (plane.jHat.X*plane.iHat.Y)/plane.iHat.X);
	var height = iHatCoord * plane.iHat.Z + jHatCoord * plane.jHat.Z;

	return (1.0-(height<0.0))?0.0:height;
}

$(document).ready(function(){
	var locations_At_Work = getStateLocations('#at-work', 'left', 'top', 'width', 'height');
	var locations_After_Work = getStateLocations('#after-work', 'right', 'top', 'width', 'height');
	var pageWidth = parseFloat($('.main-header').css('width').replace('px',''));
	var pageHeight = parseFloat($('.main-header').css('height').replace('px',''));		

	$('.main-header').prop('locations_at_work',locations_At_Work);
	$('.main-header').prop('locations_after_work',locations_After_Work);

	$('.main-header').prop('animation_states', {
		'at_work_start':toVec3Quad(locations_At_Work['start-state'],0),
		'at_work_end_selected':toVec3Quad(locations_At_Work['end-selected-poll'],1),
		'at_work_end_not_selected':toVec3Quad(locations_At_Work['end-state'],1),
		'after_work_start':toVec3Quad(locations_After_Work['start-state'],0),
		'after_work_end_selected':toVec3Quad(locations_After_Work['end-selected-poll'],1),
		'after_work_end_not_selected':toVec3Quad(locations_After_Work['end-state'],1),
		'mouse_at_work_start':Quad_3(	Vec3(0.0, 0.0, 0.0),
										Vec3(pageWidth/2.0, 0.0, 0.0),
										Vec3(pageWidth/2.0, pageHeight, 0.0),
										Vec3(0.0, pageHeight, 0.0)),
		'mouse_after_work_start':Quad_3(Vec3(pageWidth/2.0, 0.0, 0.0),
										Vec3(pageWidth, 0.0, 0.0),
										Vec3(pageWidth, pageHeight, 0.0),
										Vec3(pageWidth/2.0, pageHeight, 0.0))
	});

	$('.main-header').mousemove(function(event) {
		var pageWidth = parseFloat($('.main-header').css('width').replace('px',''));
		var pageHeight = parseFloat($('.main-header').css('height').replace('px',''));
		
		var at_work = $(this).prop('locations_at_work');
		var after_work = $(this).prop('location_after_work');
		
		var mouseLocation ={X:event.originalEvent.offsetX - (pageWidth/2.0),
							Y:event.originalEvent.offsetY - (pageHeight/2.0),
							Z:0};
		
		if(true){
			var initialSize = 48;
			var finalSize_Selected = 72;
			var finalSize_NotSelected = 32;

			var animationStates = $('.main-header').prop('animation_states');

			var pageWidth = parseFloat($('.main-header').css('width').replace('px',''));
			var pageHeight = parseFloat($('.main-header').css('height').replace('px',''));


			var selectedSide = (mouseLocation.X < pageWidth / 2.0) ? 'at-work' : 'after-work';
			var notSelectedSide = (selectedSide == 'at-work') ? 'after-work' : 'at-work';			 
		

			var at_work_endstate = (selectedSide=='at-work')?'at_work_end_selected':'at_work_end_not_selected';
			var after_work_endstate = (selectedSide=='after-work')?'after_work_end_selected':'after_work_end_not_selected';
			
			var at_work_controller = Poly6s_3d(	top=animationStates.at_work_start,
												bottom=animationStates[at_work_endstate]);
			var after_work_controller = Poly6s_3d(	top=animationStates.after_work_start,
													bottom=animationStates[after_work_endstate]);
			var mouse_controller_at_work = Poly6s_3d(	top=animationStates.mouse_at_work_start,
														bottom=animationStates[at_work_endstate]);
			var mouse_controller_after_work = Poly6s_3d(top=animationStates.mouse_after_work_start,
														bottom=animationStates[after_work_endstate]);;


			function Plane3d(origin, x, y){
				var result = {iHat:v3_sub(x,origin), jHat: v3_sub(y,origin)};
				return result;
			};
			function horizontalSlice(controller, highest){
				return 0.0;
			};
			function v3_sub(A, B){
				var result = {	X: A.X - B.X,
								Y: A.Y - B.Y,
								Z: A.Z - B.Z};
				return result;
			}

			var planes = [	Plane3d(mouse_controller_at_work._0_0_0, mouse_controller_at_work._1_0_0, mouse_controller_at_work._0_0_1), 
							Plane3d(mouse_controller_at_work._1_0_0, mouse_controller_at_work._1_1_0, mouse_controller_at_work._1_0_1),
							Plane3d(mouse_controller_at_work._1_1_0, mouse_controller_at_work._0_1_0, mouse_controller_at_work._1_1_1), 
							Plane3d(mouse_controller_at_work._0_1_0, mouse_controller_at_work._0_0_0, mouse_controller_at_work._0_1_1),
							Plane3d(mouse_controller_after_work._0_0_0, mouse_controller_after_work._1_0_0, mouse_controller_after_work._0_0_1), 
							Plane3d(mouse_controller_after_work._1_0_0, mouse_controller_after_work._1_1_0, mouse_controller_after_work._1_0_1),
							Plane3d(mouse_controller_after_work._1_1_0, mouse_controller_after_work._0_1_0, mouse_controller_after_work._1_1_1), 
							Plane3d(mouse_controller_after_work._0_1_0, mouse_controller_after_work._0_0_0, mouse_controller_after_work._0_1_1)];
			console.log('at-work: ' + at_work_controller);
			console.log('after-work: ' + after_work_controller);
		


			var highest = -10000.0;
			for(var planeIndex in planes){
				var animationDepth = getAnimationProgress(mouseLocation, planes[planeIndex]);
				if(animationDepth > highest){
					highest = animationDepth;
				}
			}
			console.log(highest);
			//var at_work_bounds = horizontalSlice(at_work_controller, highest);
			//var after_work_bounds = horizontalSlice(after_work_controller, highest);

			// for(direction in at_work_bounds){
			// 	$('#at_work').css(direction, at_work_bounds[direction]);
			// }
			// for(direction in after_work_bounds){
			// 	$('#at_work').css(direction, after_work_bounds[direction]);
			// }
		}



		console.log(mouseLocation);
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