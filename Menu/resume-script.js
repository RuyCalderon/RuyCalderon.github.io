console.log('resume-test');

function toIndex(){ window.location = '../index.html'; };
function addOption(attributeValue,displayValue){ return "<span class='setting-option' value='"+attributeValue+"'>"+displayValue+"</span>"; };
function removeOption(){ $(this).remove(); }
function removeAllOptions(){ 
	$('.parameter-display .subsection').not('.range').children().remove(); 
	$('#education-min').attr('value',$('#education-min').attr('default-value'));
	$('#education-max').attr('value',$('#education-max').attr('default-value'));
}
function toDisplayDate(rawDate){
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		
	var m_y_Split = rawDate.split('/');
	var month = months[parseInt(m_y_Split[0])-1];
	var year = ((parseInt(m_y_Split[1]) > 43) ? '19':'20') + m_y_Split[1];
	var displayDate = month + ', ' + year;

	return displayDate;
}
function toValueFormat(rawDate){
	var m_y_Split = rawDate.split('/');
	var yyyy = ((parseInt(m_y_Split[1]) > 43) ? '19':'20') + m_y_Split[1];
	var dateValue =  yyyy + m_y_Split[0];
	return dateValue;
}

$(document).ready(function(){
	var pageWidth = parseFloat($('.main-header').css('width').replace('px',''));
	var pageHeight = parseFloat($('.main-header').css('height').replace('px',''));

	$('#clearPreset').mouseup(removeAllOptions);
	$('.setting-option').mouseup( function(event){
		if(event.button == 0){ 
			if($(this).parent().attr('class').search('range') > 0){
				$(this).attr('value',$(this).attr('default-value'));
				$(this).html($(this).attr('default-value'));
			}
			else{
				$(this).remove(); 
			}
		}
	});
	$('#presets > .popup-option').mouseup(function(event){
		removeAllOptions();
		var value_selected = $(this).attr('value');
		var value_settings = {
		'contact-info':[],
		'languages':[],
		'frameworks':[],
		'industries':[],
		'roles':[],
		'timeline':[],
		'education':[]};
		switch(value_selected){
			case 'general':{
				value_settings['contact-info'] = [{'internal':'phone','display':'Phone'}, 
												  {'internal':'email','display':'Email'}];
				value_settings.languages = [{'internal':'c++','display':'C++'},
											{'internal':'python','display':'Python'},
											{'internal':'javascript','display':'Javascript'}];
				value_settings.frameworks = ['windows c++ api', {'internal':'jquery','display':'Jquery'}];
				value_settings.industries = [	{'internal':'ecommerce','display':'ECommerce'}, 
												{'internal':'medical','display':'Medical'}];
				value_settings.roles = ['junior developer', 'computer programmer', 'it/developer'];
				value_settings.timeline= ['11/13','11/16'];
				value_settings.education= [	{'internal':'bootcamp','display':'Bootcamp'}, 
											{'internal':'bachelors','display':'Bachelors'}];
			}break;
			case 'employer':{
				value_settings['contact-info'] = [	{'internal':'phone','display':'Phone'}, 
													{'internal':'email','display':'Email'}, 
													{'internal':'address','display':'Address'}];
				value_settings.languages = [{'internal':'c','display':'C'},
											{'internal':'c++','display':'C++'},
											{'internal':'python','display':'Python'},
											{'internal':'javascript','display':'Javascript'},
											{'internal':'html','display':'HTML/CSS'},
											{'internal':'sql','display':'Sql'}];
				value_settings.frameworks = ['windows c++ api', 'windows gdi', 'jquery'];
				value_settings.industries = [	{'internal':'eCommerce','display':'ECommerce'}, 
												{'internal':'medical','display':'Medical'}, 
												{'internal':'research','display':'research'}];
				value_settings.roles = ['junior developer', 'it/developer', 'computer programmer'];
				value_settings.timeline= ['11/13','11/16'];
				value_settings.education= [	{'internal':'bootcamp','display':'Bootcamp'}, 
											{'internal':'bachelors','display':'Bachelors'}];
			}break;
			case 'client':{
				value_settings['contact-info'] = [	{'internal':'phone','display':'Phone'}, 
													{'internal':'email','display':'Email'}, 
													{'internal':'website','display':'Website'}];
				value_settings.languages = [{'internal':'python','display':'Python'},
											{'internal':'javascript','display':'Javascript'},
											{'internal':'html','display':'HTML/CSS'},
											{'internal':'sql','display':'SQL'}];
				value_settings.frameworks = [{'internal':'jquery','display':'JQuery'}];
				value_settings.industries = [	{'internal':'ecommerce','display':'Ecommerce'}, 
												{'internal':'research','display':'Research'}];
				value_settings.roles = ['junior developer', 'computer programmer', 'contractor']
				value_settings.timeline= ['10/14','11/16'];
				value_settings.education= [	{'internal':'bootcamp','display':'Bootcamp'}, 
											{'internal':'bachelors','display':'Bachelors'}];
			}break;
			default:{
				//none
			}break;
		}
		for(var key in value_settings){
			if(key != 'timeline' && key != 'education'){
				var selector = '#'+key ;
				$(selector).html(addOption(value_settings[key][0].internal,value_settings[key][0].display));
				$(selector).find('span[value="'+value_settings[key][0].internal + '"]').mouseup(removeOption);
				for(var index=1; index<value_settings[key].length; ++index){
					$(selector).find('.setting-option:last').before(value_settings[key][index].internal,value_settings[key][index].display)
					$(selector).find('span[value="'+value_settings[key][index].internal + '"]').mouseup(removeOption);
				}
			}
		}
	});
	$('.options-body .popup-option').mouseup(function(event){
		var set_selector = '#set-'+$(this).parent('.popup-menu').attr('id');
		var value_selected = $(this).attr('value');
		if($(set_selector).length > 0){
			if($(set_selector).find('span[value="'+value_selected+'"]').length == 0){
				if($(set_selector).find('.setting-option').length == 0){
					$(set_selector).html(addOption(value_selected, $(this).html()));
					$(set_selector).find('span[value="'+value_selected+'"]').mouseup(removeOption);
				}
				else{
					$(set_selector).find('.setting-option:last').before(addOption(value_selected,$(this).html()));
					$(set_selector).find('span[value="'+value_selected+'"]').mouseup(removeOption);
				}
			}
		}
	});
	$('#education-min .popup-option,#education-max .popup-option').mouseup(function(event){
		var location_specifier = $(this).parent('.popup-menu.range').attr('id').split('-');
		var set_selector = '#set-'+location_specifier[0]+' .'+location_specifier[1];
		var value_selected = $(this).attr('value');
		$(set_selector).attr('value',value_selected).html(value_selected);
	});
	$('#date-min,#date-max').on('click',function(){
		$(this).select();
	}).on('keypress',function(event){
		var currentValue = $(this).prop('value');
		var currentKey = event.originalEvent.key;
		if(currentKey != 'Backspace' && currentKey != 'Delete'){
			if(currentValue=='MM/YY')
				currentValue ='';
			if(currentKey >= '0' && currentKey <='9'){
				switch(currentValue.length){
					case 0:{
						if(currentKey >'1')
							$(this).prop('value', '0');
					}break;
					case 1:{
						if(currentKey >'2' && currentValue != '0')
							$(this).prop('value','0'+currentValue+'/');
						if(currentKey == '0' && currentValue == '0')
							event.preventDefault();
					}break;
					case 2:{
						$(this).prop('value',currentValue+'/');
					}break;
					default: break;
				}
			}
			else
				event.preventDefault();
		}
	}).on('change',function(){
		var currentValue = $(this).prop('value');
		var validEntry = false;
		if(!currentValue.match(/\d\d\/\d{1,2}/)){
			if(currentValue.length == 2){
				currentValue = '0' + currentValue[0] + '/0' + currentValue[1];
				$(this).prop('value',currentValue);
				validEntry = true;
			}
			else{
				$(this).prop('value','MM/YY');
			}
		}
		else{
			validEntry = true;
		}
		if(validEntry){
			if(currentValue.length == 4)
			{
				currentValue = currentValue.replace('/','/0');
				$(this).prop('value',currentValue);
			}
			var displayDate = toDisplayDate(currentValue);
			var dateValue = toValueFormat(currentValue);
			var dateBound = $(this).attr('id').split('-')[1];
			$('#set-dates').find('.' + dateBound).attr('value',dateValue);
			$('#set-dates').find('.' + dateBound).html(displayDate);
		}
	});

	var Data={};
	var Name = 'Ruy Gaspar Calderon';
	var ContactInfo = {'Phone':['847','207','8622'], 'Email':'ruy.calderon@gmail.com','Address':['494 Park Ave', 'Glencoe Il', '60022'],'website':'RuyCalderon.github.io'};
	var Languages = {'C/C++':'','Python':'','Javascript':'','SQL':'','HTML':'','CSS':'','Coldfusion':''};
	var FrameworkKeywords = {'JQuery':'','Windows API':''};
	var IndustryKeywords = {'ECommerce':'','Medical':'','Startup':'','Gaming':''};
	var RoleKeywords = {'Junior Developer':'', 'IT/Developer':'','Computer Programmer':'','Contractor':''};
	var TimeLine = {'Start':'1301', 'End':'1611'};
	var FormalEducation = {	'Bachelors':{'Name':'University of Illinois at Chicago', 'Diploma':'Bachelor of Science: Civil Engineering', 'Date': 'Part Time-Expected 2018'}};
	var ContinuingEducation = {	'Chicago C/C++ Users Group':{'Detail':'Member', 'Range':['1507','present'], 'Body':'This group is an excellent way to meet other programmers and exposes me to coding techniques and practices in C++ that I would otherwise be unaware of'},
								'Handmade Con':{'Detail':'Perennial Attendee', 'Range':['1511','present'], 'Body':'Yearly conference focused on game engine development. Features top industry speakers, and affords me the opportunity to speak with and learn from a number of very talented individuals.'}}
	var Projects = {'Algoda':{'Date':'1607', 'Detail':'Solo Contributor', 'Body': 'Algorithm and Data Structure practice in c/c++, will eventually be optimized for production use.'},
					'Ludum Dare':{'Date':'1504', 'Detail':'Solo Contributor', 'Body':'Game written in 48 hours from scratch in c/c++ and implementing the windows API and windows GDI for rendering'},
					'Personal Website':{'Date':'1610', 'Detail':'Sole Designer and Developer', 'Body':'Website written to showcase progress in frontend web development skills'}};
	var Contracts = {	'Loehle Enterprises':{'Date':'1506','Detail':'Sub-Contractor', 'Body':'Given script written in Matlab over-deadline when awarded the contract, successfully wrote and delivered functional Javascript analogue in one weekend.'},
						'For Individual':{'Date':'1511','Detail':'Contractor','Body': 'Wrote data gathering script in Python that gathered fantasy football data from 7 different websites and output as csv'},
						'Undisclosed Startup':{'Date':'1610','Detail':'-','Body':'Responsible for the design and creation of the minimum viable product prior to company launch'}};
	var WorkHistory = {	'Alpine Home Air Products':{'Range':['1606','1609'], 'Detail': 'Computer Programmer', 'Body': 'Full stack developer working in SQL, Coldfusion-Lucee, JQuery, HTML/CSS to maintain and upgrade website and CMS web application'},
						'More Than Medicine MD':{'Range':['1407','1606'], 'Detail':'IT/Developer','Body':'Wrote scripts in Python to automate ETL operations for medical patient data, IT support focusing on installation, upgrade, and maintenance of EMR software during ICD9/ICD10 switch, Built, maintained, and upgraded company hardware'},
						'EParts and More':{'Range':['1311','1406'],'Detail':'Junior Developer','Body':'Wrote scripts to automate data collection in Python and C#. Maintained and upgraded in-house CMS in SQL,Python,JQuery,and HTML/CSS. Maintained and upgraded third party MS Access Application written in VBA.'}};
});