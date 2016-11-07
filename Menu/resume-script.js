console.log('resume-test');

function toIndex(){ window.location = '../index.html'; };
function setPreset(preset_type){};
function addOption(attributeValue,displayValue){ return "<span class='setting-option' value='"+attributeValue+"'>"+displayValue+"</span>"; };
function removeOption(){ $(this).remove(); }
function removeAllOptions(){ 
	$('.parameter-display .subsection').not('.range').children().remove(); 
	$('#education-min').attr('value',$('#education-min').attr('default-value'));
	$('#education-max').attr('value',$('#education-max').attr('default-value'));
}


$(document).ready(function(){
	var pageWidth = parseFloat($('.main-header').css('width').replace('px',''));
	var pageHeight = parseFloat($('.main-header').css('height').replace('px',''));

	$('.range-select-right .popup-menu').children().mouseup(function(){console.log('right-up');});
	$('.range-select-left .popup-menu').children().mouseup(function(){console.log('left-up');});
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
	$('#clearPreset').mouseup(removeAllOptions);
	$('.popup-option').mouseup(function(event){
		var set_selector = '#set-'+$(this).parent('.popup-menu').attr('id');
		var value_selected = $(this).attr('value');
		
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
	});
	$('#education-min .popup-option,#education-max .popup-option').mouseup(function(event){
		var location_specifier = $(this).parent('.popup-menu.range').attr('id').split('-');
		var set_selector = '#set-'+location_specifier[0]+' .'+location_specifier[1];
		var value_selected = $(this).attr('value');
		$(set_selector).attr('value',value_selected);
		$(set_selector).html(value_selected);
	});
	$('#date-min,#date-max').on('mouseenter',function(){
		$(this).attr('tempStorage',$(this).attr('value'));
		$(this).attr('value','MM/YY');
	}).on('mouseleave',function(){
		$(this).attr('value',$(this).attr('tempStorage'));
	}).on('click',function(){
		$(this).select();
	}).on('keypress',function(event){
		//think of how I want to do the check letter-by-letter
		//two layers:
		//character type
		//then format
		//CHECK INPUT SPEC FOR THIS FEATURE!!!! (I think I saw it,
		//which is why I wanted to use inputs in the first place)
		var pressedKey = event.originalEvent.key;
		//if directly after a click (where it selects), fires PRIOR to the selection being deleted by the keypress
		//need to work with this. But good shit.
		var newValue = $(this).attr('value');
		if(newValue != 'oh my'){
			console.log("Where's George Takei?");
		}
	});

	var Data={};
	var Name = 'Ruy Gaspar Calderon';
	var ContactInfo = {'Phone':['847','207','8622'], 'Email':'ruy.calderon@gmail.com','Address':['494 Park Ave', 'Glencoe Il', '60022'],'website':'RuyCalderon.github.io'};
	var LanguageKeywords = {'C':'','C++':'','Python':'','Javascript':'','SQL':'','HTML':'','CSS':'','Coldfusion':''};
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