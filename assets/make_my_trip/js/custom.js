/**
 * jquery step wizard form
 */
var frmInfo1 = jQuery('#frmInfo1');
var frmInfo1Validator = frmInfo1.validate();

var frmInfo2 = jQuery('#frmInfo2');
var frmInfo2Validator = frmInfo2.validate();

var frmInfo3 = jQuery('#frmInfo3');
var frmInfo3Validator = frmInfo3.validate();

var frmInfo4 = jQuery('#frmInfo4');
var frmInfo4Validator = frmInfo4.validate();

var frmInfo5 = jQuery('#frmInfo5');
var frmInfo5Validator = frmInfo5.validate();

var frmInfo6 = jQuery('#frmInfo6');
var frmInfo6Validator = frmInfo6.validate();

var frmInfo7 = jQuery('#frmInfo7');
var frmInfo7Validator = frmInfo7.validate();

var frmInfo8 = jQuery('#frmInfo8');
var frmInfo8Validator = frmInfo8.validate();

var frmInfo9 = jQuery('#frmInfo9');
var frmInfo9Validator = frmInfo9.validate();

var frmInfo10 = jQuery('#frmInfo10');
var frmInfo10Validator = frmInfo10.validate();

var frmInfo11 = jQuery('#frmInfo11');
var frmInfo11Validator = frmInfo11.validate();

var frmInfo12 = jQuery('#frmInfo12');
var frmInfo12Validator = frmInfo12.validate();

var frmInfo13 = jQuery('#frmInfo13');
var frmInfo13Validator = frmInfo13.validate();

var frmInfo14 = jQuery('#frmInfo14');
var frmInfo14Validator = frmInfo14.validate();

var frmInfo15 = jQuery('#frmInfo15');
var frmInfo15Validator = frmInfo15.validate();

/**
 * init form step wizard
 */
jQuery('#PlanMyTripwizard').steps({
	onStepChanging: function (event, currentIndex, newIndex) {
    	console.log(currentIndex);
    }
});

/**
 * prefer solo travel or with someone else (step 3)
 */
jQuery("input[name=prefer_solo_travel]").change(function() {
	// get value
	var value = jQuery('input[name=prefer_solo_travel]:checked').val();

	// match value
	if (value == 'family') {
		jQuery(".family_counter").addClass('open');
		jQuery(".group_counter").removeClass('open');
	} else if (value == 'group') {
		jQuery(".family_counter").removeClass('open');
		jQuery(".group_counter").addClass('open');
	} else {
		jQuery(".family_counter").removeClass('open');
		jQuery(".group_counter").removeClass('open');
	}
});

// update family travel count (step 3)
jQuery(document).ready(function() {
	// on click family counter
	jQuery(".update_family_counter").click(function() {
		// get data
		var method = jQuery(this).data('method');
		var action = jQuery(this).data('action');

		// get current count
		var curr_count = jQuery('#family_' + action + '_count').val();

		// update counter
		if(method == 'plus') {
			var updated_count = Number(curr_count) + 1;
		} else {
			var updated_count = Number(curr_count) - 1;
		}

		// check count
		var final_count = (updated_count > 0) ? updated_count : 1;

		// update count
		jQuery('#family_' + action + '_count').val(final_count);
	});

	// on click group counter
	jQuery(".update_group_counter").click(function() {
		// get data
		var method = jQuery(this).data('method');
		var action = jQuery(this).data('action');

		// get current count
		var curr_count = jQuery('#group_' + action + '_count').val();

		// update counter
		if(method == 'plus') {
			var updated_count = Number(curr_count) + 1;
		} else {
			var updated_count = Number(curr_count) - 1;
		}

		// check count
		var final_count = (updated_count > 0) ? updated_count : 1;

		// update count
		jQuery('#group_' + action + '_count').val(final_count);
	});
});

/**
 * check active tab
 */
function check_active_form_step() {
	// match condition
	if(jQuery('#PlanMyTripwizard .divStep1').hasClass('active')) {
		return 1;
	} else if(jQuery('#PlanMyTripwizard .divStep2').hasClass('active')) {
		return 2;
	} else if(jQuery('#PlanMyTripwizard .divStep3').hasClass('active')) {
		return 3;
	} else if(jQuery('#PlanMyTripwizard .divStep4').hasClass('active')) {
		return 4;
	} else if(jQuery('#PlanMyTripwizard .divStep5').hasClass('active')) {
		return 5;
	} else if(jQuery('#PlanMyTripwizard .divStep6').hasClass('active')) {
		return 6;
	}
}

/**
 * plan my trip on click process
 */
function plan_my_trip_next_process() {
	// get active step
	var active_step = check_active_form_step();

	// check form step and process
	if(active_step == 1) {
		// define array
		var plan_destination = [];

		// fetch plan destination
        jQuery('.plan_destination:checked').each(function(key, value) {
        	plan_destination[key] = jQuery(this).val();
        });

        // convert array split
        var plan_destination_str = plan_destination.join(',');

        // save cookie in data
        localStorage.setItem('plan_my_trip_step_1', plan_destination_str);
	} else if(active_step == 2) {
		// define array
		var user_experience = [];

		// fetch user experience
        jQuery('.user_experience:checked').each(function(key, value) {
        	user_experience[key] = jQuery(this).val();
        });

        // convert array split
        var user_experience_str = user_experience.join(',');

        // save cookie in data
        localStorage.setItem('plan_my_trip_step_2', user_experience_str);
	} else if(active_step == 3) {
		// get value
		var travel_pref_value = jQuery('input[name=prefer_solo_travel]:checked').val();

		// if family travel
		if (travel_pref_value == 'family') {
			// get family count
			var family_age_13_above_count = jQuery("#family_age_13_above_count").val();
			var family_age_8_12_count 	  = jQuery("#family_age_8_12_count").val();
			var family_age_3_7_count 	  = jQuery("#family_age_3_7_count").val();
			var family_age_0_2_count 	  = jQuery("#family_age_0_2_count").val();

			// set string
			var family_count = 'Ages 13 above - ' + family_age_13_above_count + ', Ages 8-12 - ' + family_age_8_12_count + ', Ages 3-7 - ' + family_age_3_7_count + ', Ages 0-2 - ' + family_age_0_2_count;

			// save cookie in data
        	localStorage.setItem('plan_my_trip_step_3_travel_family', family_count);
		} else if (travel_pref_value == 'group') {
			// get family count
			var group_age_13_above_count = jQuery("#group_age_13_above_count").val();
			var group_age_8_12_count 	 = jQuery("#group_age_8_12_count").val();
			var group_age_3_7_count 	 = jQuery("#group_age_3_7_count").val();
			var group_age_0_2_count 	 = jQuery("#group_age_0_2_count").val();

			// set string
			var group_count = 'Ages 13 above - ' + group_age_13_above_count + ', Ages 8-12 - ' + group_age_8_12_count + ', Ages 3-7 - ' + group_age_3_7_count + ', Ages 0-2 - ' + group_age_0_2_count;

			// save cookie in data
        	localStorage.setItem('plan_my_trip_step_3_travel_group', group_count);
		} else {
			// save cookie in data
        	localStorage.setItem('plan_my_trip_step_3_travel_group', '');
        	localStorage.setItem('plan_my_trip_step_3_travel_family', '');
		}

		// save cookie in data
        localStorage.setItem('plan_my_trip_step_3_travel_pref', travel_pref_value);
	} else if(active_step == 4) {
		// get value
		var lot_of_places = jQuery('input[name=lot_of_places]:checked').val();

		// save cookie in data
        localStorage.setItem('plan_my_trip_step_4_lot_of_places', lot_of_places);
	} else if(active_step == 5) {
		// get value
		var temperate_places = jQuery('input[name=temperate_places]:checked').val();

		// save cookie in data
        localStorage.setItem('plan_my_trip_step_5_temperate_places', temperate_places);
	}
}

/**
 * plan my trip on click submit process
 */
jQuery(document).ready(function() {
	jQuery(".step-footer .step-btn").click(function() {
		// check button action
		var btn_action = jQuery(this).data('step-action');

		// check action
		if(btn_action == 'finish') {
			// get form data
			var user_email 		 = jQuery('input[name=user_email]').val();
			var first_name 		 = jQuery('input[name=first_name]').val();
			var last_name 		 = jQuery('input[name=last_name]').val();
			var phone_number     = jQuery('input[name=phone_number]').val();
			var location 		 = jQuery('input[name=location]').val();
			var custom_itinerary = jQuery('input[name=custom_itinerary]').val();

			// save form data using AJAX
			jQuery.ajax({
				type: "GET",
				url: window.location.origin + "/global/save_trip_trip",
				data: {
					user_email: user_email
				},
				success: function(response) {
					console.log(response);
				}
			});
		}
	});
});