/**
 * jQuery multi form steps wizard
 */
jQuery(document).ready(function() {
	// on multi step form change
	jQuery('#single_booking_steps').steps({
	    headerTag: "h3",
	    bodyTag: "section",
	    onStepChanging: function(event, currentIndex, newIndex) {
	        // check current index
	        if (newIndex < currentIndex) {
	            return true;
	        }

	        // click next to process
	        if(currentIndex == 0) {
	        	// return response
	            return booking_form_wizard_step_one_pro();
	        } else if(currentIndex == 1) {
                // load city nights
                load_selected_tour_city_nights_data();

	        	// return response
	            return booking_form_wizard_step_two_pro();
	        } else if(currentIndex == 2) {
                // show save package
                jQuery('.btn_save_booking_package').show();

	        	// return response
	            return booking_form_wizard_step_three_pro();
	        } else if(currentIndex == 3) {
                // trigger resize window
                setTimeout(function() {
                    jQuery(window).trigger('resize');
                }, 0);

	        	// return response
	            return booking_form_wizard_step_four_pro();
	        }

	        // define form
	        var form = jQuery('.body.current form');

	        // check form length
	        if (form.length == 1) {
	            form.validate().settings.ignore = ":disabled,:hidden";
	            return form.valid();
	        }

	        // return response
	        return true;
	    },
	    onFinished: function(event, currentIndex) {
	    	// final submit package
	    	booking_form_wizard_step_five_pro();
	    }
	});
});

/**
 * on page load show selected city and nights
 */
function load_selected_tour_city_nights_data()
{
    // fetch parameters
    var booking_ref_no   = jQuery('#agent_single_booking #booking_ref_no').val();
    var agent_booking_id = jQuery('#agent_single_booking #agent_booking_id').val();
    var tour_id          = jQuery('#agent_single_booking #booking_tour_id').val();

    // check data is valid
    if(booking_ref_no && agent_booking_id && tour_id) {
        // fetch city content
        jQuery.ajax({
            type: "POST",
            url: base_url + "dashboard/booking/booking_fetch_init_city_night_data",
            data: {
                'csrf_mds_token'  : jQuery.cookie(csfr_cookie_name),
                'booking_ref_no'  : booking_ref_no,
                'agent_booking_id': agent_booking_id,
                'tour_id'         : tour_id,
            },
            success: function(response) {
                // convert json parse
                var json_parse = JSON.parse(response);

                // check destination length
                if(json_parse.tour_destination.length) {
                    // fetch destination
                    for (var index = 0; index <= json_parse.tour_destination.length; index++) {
                        // get destination id
                        var destination_id = json_parse.tour_destination[index];

                        // check checkbox
                        jQuery('#agent_single_booking #tour_destination_' + json_parse.tour_destination[index]).prop("checked", true);
                    }
                }

                // check city content is valid
                if(json_parse.city_night_content) {
                    // update content
                    jQuery('#agent_single_booking #package-city-night-items').html(json_parse.city_night_content);
                } else {
                    // update content
                    default_city_night_show();
                }

                // show selected destination loader
                jQuery('#agent_single_booking #city-item-loader').hide();
            }
        });
    }
}

/**
 * on booking form wizard step one process
 */
function booking_form_wizard_step_one_pro()
{
    // get static data
    var booking_ref_no   = jQuery('#agent_single_booking #booking_ref_no').val();
    var agent_booking_id = jQuery('#agent_single_booking #agent_booking_id').val();

    // get selected date
    var booking_date = jQuery('#agent_single_booking .booking_date').val();

    // selected nationality
    var is_nationality = jQuery("input[name='book_nationality']:checked").val();

    // set is valid
    if (is_nationality == 'other') {
        // get other input value
        var is_nationality = jQuery('#agent_single_booking #nationality_other_input :selected').val();
    }

    // check data is valid
    if(booking_date && is_nationality) {
        // update data
        jQuery.ajax({
            type: "POST",
            url: base_url + "dashboard/booking/update_booking_data",
            data: {
                'csrf_mds_token'  : jQuery.cookie(csfr_cookie_name),
                'step_name'       : 'agent_form_step_1',
                'booking_ref_no'  : booking_ref_no,
                'agent_booking_id': agent_booking_id,
                'booking_date'    : booking_date,
                'is_nationality'  : is_nationality,
            }
        });

        // return resposne
        return true;
    } else {
        // return resposne
        return false;
    }
}

/**
 * on booking form wizard step two process
 */
function booking_form_wizard_step_two_pro()
{
    // get static data
    var booking_ref_no   = jQuery('#agent_single_booking #booking_ref_no').val();
    var agent_booking_id = jQuery('#agent_single_booking #agent_booking_id').val();

    // get selected date
    var room_data = get_agent_customer_selected_book_data();

    // update data
    jQuery.ajax({
        type: "POST",
        url: base_url + "dashboard/booking/update_booking_data",
        data: {
            'csrf_mds_token'  : jQuery.cookie(csfr_cookie_name),
            'step_name'       : 'agent_form_step_2',
            'booking_ref_no'  : booking_ref_no,
            'agent_booking_id': agent_booking_id,
            'room_data'       : room_data,
        }
    });

    // show selected destination loader
    jQuery('#agent_single_booking #city-item-loader').show();

    // return resposne
    return true;
}

/**
 * on booking form wizard step three process
 */
function booking_form_wizard_step_three_pro() {
    // get static data
    var booking_ref_no     = jQuery('#agent_single_booking #booking_ref_no').val();
    var agent_booking_id   = jQuery('#agent_single_booking #agent_booking_id').val();
    var booking_tour_id    = jQuery('#agent_single_booking #booking_tour_id').val();
    var booking_package_id = jQuery('#agent_single_booking #booking_package_id').val();

    // get package title
    var package_title = jQuery("#agent_single_booking .Step3Form #package_title_name").val();

    // check package title
    if(package_title.length) {
        // get selected place
        var place_count = jQuery("#agent_single_booking .destination_selection :checkbox:checked").length;

        // check place count
        if(place_count) {
            // define array
            var selected_destination = [];

            // get destination place name
            jQuery("#agent_single_booking .destination_selection :checkbox:checked").each(function(key, value) {
                // get city name
                var dest_name = jQuery(this).val();

                // check and push in array
                if(dest_name != '' && dest_name != '--Select--' && dest_name != null) {
                    selected_destination[key] = dest_name;
                }
            });

            // get city and night
            var count_selected_city_night = jQuery("#agent_single_booking #package-city-night-items .item").length;

            // define array
            var selected_city_nights = [];

            // check city night count
            if(count_selected_city_night) {
                // define index
                var city_night_index = 0;

                // fetch selected city
                jQuery("#agent_single_booking #package-city-night-items .item").each(function(index, element) {
                    // get city name
                    var city_element = jQuery(this).find('.city .lableCityNightSelect select[name="city"] :selected').val();

                    // get city name
                    var night_element = jQuery(this).find('.night .lableCityNightSelect select[name="night"] :selected').val();

                    // check and push in array
                    selected_city_nights[city_night_index] = city_element + '##' + night_element;
                    city_night_index++
                });
            }

            // save data in table
            jQuery.ajax({
                type: "POST",
                url: base_url + "dashboard/booking/update_booking_data",
                data: {
                    'csrf_mds_token'      : jQuery.cookie(csfr_cookie_name),
                    'step_name'           : 'agent_form_step_3',
                    'booking_ref_no'      : booking_ref_no,
                    'agent_booking_id'    : agent_booking_id,
                    'booking_package_id'  : booking_package_id,
                    'tour_id'             : booking_tour_id,
                    'package_title'       : package_title,
                    'destination_city'    : selected_destination,
                    'selected_city_nights': selected_city_nights,
                },
                success: function(response) {
                    // json parse
                    var json_parse = JSON.parse(response);

                    // update package itinerary content
                    jQuery("#agent_single_booking #package_itinerary_content").html(json_parse.package_itinerary_content);
                }
            });

            // reset style
            jQuery("#agent_single_booking #package_destination_error").hide();
        } else {
            // show error msg
            jQuery("#agent_single_booking #package_destination_error").show().html('*Please choose your destination');
        }

        // reset style
        jQuery("#agent_single_booking #package_title_error").hide().html('');
    } else {
        // show error msg
        jQuery("#agent_single_booking #package_title_error").show().html('*Please enter package title');
    }

    // return response
    return true;
}

/**
 * on booking form wizard step forth process
 */
function booking_form_wizard_step_four_pro() {
    // get static data
    var booking_ref_no     = jQuery('#agent_single_booking #booking_ref_no').val();
    var agent_booking_id   = jQuery('#agent_single_booking #agent_booking_id').val();
    var booking_tour_id    = jQuery('#agent_single_booking #booking_tour_id').val();
    var booking_package_id = jQuery('#agent_single_booking #booking_package_id').val();

    // fetch terms data
    var terms_data = fetch_terms_content_data();

    // save data in table
    jQuery.ajax({
        type: "POST",
        url: base_url + "dashboard/booking/update_booking_data",
        data: {
            'csrf_mds_token'            : jQuery.cookie(csfr_cookie_name),
            'step_name'                 : 'agent_form_step_4',
            'booking_ref_no'            : booking_ref_no,
            'agent_booking_id'          : agent_booking_id,
            'booking_package_id'        : booking_package_id,
            'tour_id'                   : booking_tour_id,
            'terms_made_to_order'       : JSON.stringify(terms_data.made_to_order),
            'terms_what_included'       : JSON.stringify(terms_data.what_included),
            'terms_what_not_included'   : JSON.stringify(terms_data.what_not_included),
            'terms_protect_your_travel' : JSON.stringify(terms_data.protect_your_travel),
            'terms_terms_conditions'    : JSON.stringify(terms_data.terms_conditions),
            'terms_important_notes'     : JSON.stringify(terms_data.important_notes),
            'terms_cancellation_policy' : JSON.stringify(terms_data.cancellation_policy),
            'terms_faqs'                : JSON.stringify(terms_data.faqs),
            'cancellation_policy_status': terms_data.cancellation_policy_status,
        }
    });

    // show service vouchers loader
    jQuery('.booking_service_vouchers_tbl').html('<div style="font-size: 16px; color: #004963"><i class="fa fa-spinner fa-spin"></i> &nbsp;Fetching service vouchers...</div>');

    // update service vouchers
    jQuery.ajax({
        type: "POST",
        url: base_url + "dashboard/booking/fetch_service_vouchers",
        data: {
            'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
            'booking_ref_no': booking_ref_no,
            'tour_id'       : booking_tour_id
        },
        success: function(html_response) {
            // update content
            jQuery('.booking_service_vouchers_tbl').html(html_response);
        }
    });

    // return response
    return true;
}

/**
 * on booking form wizard step five process
 */
function booking_form_wizard_step_five_pro() {
    // show alert message
    alert("Success! Booking data saved successfully.");

    // redirect to listing page
    window.location.href = base_url + 'dashboard/booking';
}

/**
 * get agent customer selected book data
 */
function get_agent_customer_selected_book_data()
{
    // define array
    var room_data = [];

    // get selected room count
    var total_rooms = jQuery('#agent_single_booking .travelers_rooms_input').val();

    // fetch room
    for (var room_no = 1; room_no <= total_rooms; room_no++) {
        // get selected nationality
        var bedding_preference = jQuery('.travelers_room_tab_content_' + room_no + ' .tab_preference:checked').val();

        // traveler count
        var adults_count     = jQuery(".travelers_room_tab_content_" + room_no + " .room_tab_content_adults_count").val();
        var child_8_12_count = jQuery(".travelers_room_tab_content_" + room_no + " .room_tab_content_child_8_12_count").val();
        var child_3_7_count  = jQuery(".travelers_room_tab_content_" + room_no + " .room_tab_content_child_3_7_count").val();
        var infant_count     = jQuery(".travelers_room_tab_content_" + room_no + " .room_tab_content_infant_count").val();

        // set total members
        var total_members = Number(adults_count) + Number(child_8_12_count) + Number(child_3_7_count) + Number(infant_count);

        // check total selected members
        if(total_members <= 4) {
            // push in new array
            var item_arr                   = {};
            item_arr['bedding_preference'] = (bedding_preference) ? bedding_preference : 'double';
            item_arr['adults']             = adults_count;
            item_arr['child_8_12']         = child_8_12_count;
            item_arr['child_3_7']          = child_3_7_count;
            item_arr['infant']             = infant_count;

            // append in array
            room_data.push(item_arr);
        }
    }

    // return response
    return room_data;
}

/**
 * on select other nationality
 */
jQuery(document).on('change', 'input[type=radio][name=book_nationality]', function() {
	// get selected value
	var selected_nationality = jQuery(this).val();

	// check is valid
    if (selected_nationality == 'other') {
        // show other option
        jQuery('.nationality_other_input_box').show();
    } else {
        // hide other option
        jQuery('.nationality_other_input_box').hide();
    }
});

/**
 * click to click plus / minus travelers rooms
 */
jQuery(document).on('click', '.travelers_room_plus_minus', function(e) {
    e.preventDefault();

    // hide error
    jQuery('.step_2_error').hide();

    // check is disabled
    if(jQuery('.travelers_room_plus_minus').attr('disabled') != 'disabled') {
        // disable button
        jQuery('.travelers_room_plus_minus').attr('disabled', true).css('cursor', 'not-allowed');

        // hide loader
        jQuery('#single_booking_steps .travelers_rooms_loader').show();
        jQuery('#single_booking_steps .travelers_rooms_input').hide();

        // show or hide trash button
        show_hide_tab_trash_button();

        // get action data
        var is_action = jQuery(this).data('action');

        // get currect count
        var current_count = jQuery('#single_booking_steps .travelers_rooms_input').val();

        // check action
        if(is_action == 'plus') {
            current_count++;
        } else if(is_action == 'minus') {
            current_count--;
        }

        // updated count
        var updated_count = (current_count > 1) ? current_count : 1;

        // check update count is out of limit
        if(updated_count > 5) {
            // enable button
            jQuery('.travelers_room_plus_minus').attr('disabled', false).css('cursor', 'pointer');

            // show or hide trash button
            show_hide_tab_trash_button();

            // show error
            jQuery('.step_2_error').show().css('color', '#f9110a').html('<i class="fa fa-exclamation-triangle"></i> Oops! You can only 5 rooms selected at a time.');

            // hide loader
            jQuery('#single_booking_steps .travelers_rooms_loader').hide();
            jQuery('#single_booking_steps .travelers_rooms_input').show();
        } else {
            // perform AJAX
            jQuery.ajax({
                type: "POST",
                url: base_url + "book_now/set_travelers_rooms_content",
                data: {
                    'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
                    'updated_count' : updated_count,
                },
                success: function(response) {
                    // parse json
                    var json_parse = JSON.parse(response);

                    // update html
                    if(is_action == 'plus') {
                        if(updated_count > 1) {
                            jQuery('#single_booking_steps .travelers_room_tab').append(json_parse.html_tab);
                            jQuery('#single_booking_steps .travelers_room_tab_content').append(json_parse.html_tab_content);
                        }
                    } else {
                        var remove_current_count = current_count + 1;
                        if(remove_current_count > 1) {
                            // remove tab
                            jQuery('#single_booking_steps .travelers_room_tab').children().last().remove();
                            jQuery('#single_booking_steps .travelers_room_tab_content').children().last().remove();

                            // show default tab
                            jQuery('#single_booking_steps .travelers_room_tab .travelers_room_1_selection').addClass('active');
                            jQuery('#single_booking_steps .travelers_room_tab_content .travelers_room_tab_content_1').show();
                        }
                    }

                    // show or hide trash button
                    show_hide_tab_trash_button();

                    // enable button
                    jQuery('.travelers_room_plus_minus').attr('disabled', false).css('cursor', 'pointer');

                    // update count
                    jQuery('#single_booking_steps .travelers_rooms_input').val(updated_count);

                    // hide loader
                    jQuery('#single_booking_steps .travelers_rooms_loader').hide();
                    jQuery('#single_booking_steps .travelers_rooms_input').show();
                }
            });
        }
    }
});

/**
 * show/hide tab trash button
 */
function show_hide_tab_trash_button()
{
    // get currect tab
    var is_first_active = jQuery('.travelers_room_1_selection').hasClass('active');

    // check tab
    if(is_first_active) {
        // hide trash button
        jQuery('#single_booking_steps .travelers_room_delete').hide();
    } else {
        // show trash button
        jQuery('#single_booking_steps .travelers_room_delete').show();
    }
}

/**
 * click to show tab content
 */
jQuery(document.body).on('click', '#single_booking_steps .travelers_room_selection', function(e) {
    e.preventDefault();

    // get data
    var room_no = jQuery(this).html().replace('Room ', '');

    // rearrange traveler selection tabs
    rearrange_traveler_selection_tabs();

    // hide tab content
    jQuery('body #single_booking_steps .travelers_room_tab_content_single').hide();
    jQuery('body #single_booking_steps .travelers_room_selection').removeClass('active');

    // active tab content
    jQuery('body #single_booking_steps .travelers_room_tab_content_' + room_no).show();
    jQuery('body #single_booking_steps .travelers_room_' + room_no + '_selection').addClass('active');

    // check tab and show delete button
    if(room_no != 1) {
        jQuery('body #single_booking_steps .travelers_room_delete').show();
    } else {
        jQuery('body #single_booking_steps .travelers_room_delete').hide();
    }

    // check selected tab
    var selected_preference = jQuery('travelers_room_tab_content_' + room_no + ' .tab_preference:checked').val();

    // if not selected set default value
    if(!selected_preference) {
        jQuery('travelers_room_tab_content_' + room_no + ' .tab_preference').filter('[value="double"]').attr('checked', true);
    }
});

/**
 * click to delete selected room tab content
 */
jQuery(document.body).on('click', '#single_booking_steps .travelers_room_delete', function(e) {
    e.preventDefault();

    // hide error
    jQuery('.step_2_error').hide();

    // define default value
    var is_active_room = null;

    // fetch tabs
    jQuery.each(jQuery("#single_booking_steps .travelers_room_tab .travelers_room_selection"), function() {
        // get is active
        var is_active_tab = jQuery(this).hasClass('active');

        // check is active
        if(is_active_tab) {
            is_active_room = jQuery(this).attr('data-room_no');
        }
    });

    // get current tabs
    var prev_total_tabs = jQuery('#single_booking_steps .travelers_room_tab .travelers_room_selection').length;

    // check active tab is valid
    if(is_active_room && prev_total_tabs > 1) {
        // rearrange traveler selection tabs
        rearrange_traveler_selection_tabs();

        // remove tab content
        jQuery('#single_booking_steps .travelers_room_tab .travelers_room_' + is_active_room + '_selection').closest(".tab").remove();
        jQuery('#single_booking_steps .travelers_room_tab_content .travelers_room_tab_content_' + is_active_room).remove();

        // show default tab
        jQuery('#single_booking_steps .travelers_room_tab .travelers_room_1_selection').addClass('active');
        jQuery('#single_booking_steps .travelers_room_tab_content .travelers_room_tab_content_1').show();

        // get total room count
        var total_rooms = jQuery('#single_booking_steps .travelers_rooms_input').val();

        // set new count
        var total_rooms = total_rooms - 1;

        // update count
        jQuery('#single_booking_steps .travelers_rooms_input').val(total_rooms);

        // show or hide trash button
        show_hide_tab_trash_button();

        // get total tabs
        var total_tabs = jQuery('.travelers_room_tab .travelers_room_selection').length;

        // reset tab number
        if(total_tabs > 1) {
            jQuery.each(jQuery('.travelers_room_tab .travelers_room_selection'), function(index) {
                jQuery(this).html('Room ' + (index + 1));
            });
        }
    } else {
        // show error
        jQuery('.step_2_error').show().css('color', '#f9110a').html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Oops! We need at least one room selection.");
    }
});

/**
 * rearrange traveler selection tabs
 */
function rearrange_traveler_selection_tabs()
{
    // rearrange current tabs
    jQuery.each(jQuery('#single_booking_steps .travelers_room_tab .travelers_room_selection'), function(index) {
        // set room no
        var room_no = index + 1;

        // remove class and add new
        jQuery(this).removeClass('travelers_room_1_selection').removeClass('travelers_room_2_selection').removeClass('travelers_room_3_selection').removeClass('travelers_room_4_selection').removeClass('travelers_room_5_selection').addClass('travelers_room_' + room_no + '_selection');

        // set room data
        jQuery(this).attr('data-room_no', room_no);
    });

    // rearrange current tabs content
    jQuery.each(jQuery('#single_booking_steps .travelers_room_tab_content .travelers_room_tab_content_single'), function(index) {
        // set room no
        var room_no = index + 1;

        // remove class and add new
        jQuery(this).removeClass('travelers_room_tab_content_1').removeClass('travelers_room_tab_content_2').removeClass('travelers_room_tab_content_3').removeClass('travelers_room_tab_content_4').removeClass('travelers_room_tab_content_5').addClass('travelers_room_tab_content_' + room_no);

        // rearrange select dropdown
        // jQuery('.travelers_room_tab_content_' + room_no + ' .complete-plan').attr('for', 'tab_' + room_no + '_double');
        // jQuery('.travelers_room_tab_content_' + room_no + ' .tab_preference').attr('id', 'tab_' + room_no + '_double').attr('name', 'tab_' + room_no + '_preference');

        // // rearrange count data
        // jQuery('.travelers_room_tab_content_' + room_no + ' .room_tab_update_count').attr('data-room_no', room_no);
    });
}

/**
 * click to update tab content count
 */
jQuery(document.body).on('click', '#single_booking_steps .room_tab_update_count', function() {
    // show error
    jQuery('.step_2_error').hide();

    // get data
    var is_action  = jQuery(this).data('action');
    var count_type = jQuery(this).data('type');
    var room_no    = jQuery(this).data('room_no');

    // set max limit
    var adults_limit     = 4;
    var child_8_12_limit = 2;
    var child_3_7_limit  = 1;
    var infant_limit     = 2;

    // define default value
    var is_single_valid_limit = false;

    // get currect count
    var current_count = jQuery('#single_booking_steps .travelers_room_tab_content_' + room_no + ' .room_tab_content_' + count_type + '_count').val();

    // check action
    if(is_action == 'plus') {
        current_count++;
    } else if(is_action == 'minus') {
        current_count--;
    }

    // check updated count
    var updated_count = (current_count > 0) ? current_count : 0;

    // check adults is zero
    if(count_type == 'adults' && updated_count == 0) {
        // show error
        jQuery('.step_2_error').show().css('color', '#f9110a').html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Oops! You can't make adult count 0.");
    } else {
        // check is valid limit
        if(count_type == 'adults' && updated_count <= adults_limit) {
            is_single_valid_limit = true;
        } else if(count_type == 'child_8_12' && updated_count <= child_8_12_limit) {
            is_single_valid_limit = true;
        } else if(count_type == 'child_3_7' && updated_count <= child_3_7_limit) {
            is_single_valid_limit = true;
        } else if(count_type == 'infant' && updated_count <= infant_limit) {
            is_single_valid_limit = true;
        }

        // update count
        if(is_single_valid_limit) {
            jQuery('#single_booking_steps .travelers_room_tab_content_' + room_no + ' .room_tab_content_' + count_type + '_count').val(updated_count);
        } else {
            // set error msg
            if(count_type == 'adults') {
                var error_msg = "You can't select more than " + adults_limit + " adults.";
            } else if(count_type == 'child_8_12') {
                var error_msg = "You can't select more than " + child_8_12_limit + " child who needs bed.";
            } else if(count_type == 'child_3_7') {
                var error_msg = "You can't select more than " + child_3_7_limit + " child who doesn't need bed.";
            } else if(count_type == 'infant') {
                var error_msg = "You can't select more than " + infant_limit + " infant.";
            }

            // show error
            jQuery('.step_2_error').show().css('color', '#f9110a').html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Oops! " + error_msg);
        }
    }
});

/**
 * on click package select customize tour
 */
jQuery(document.body).on('click', '#agent_single_booking .booking_select_customize_tour', function() {
    // get booking data
    var booking_ref_no   = jQuery('#agent_single_booking #booking_ref_no').val();
    var agent_booking_id = jQuery('#agent_single_booking #agent_booking_id').val();

    // get request data
    var tour_id      = jQuery(this).data('tour_id');
    var package_no   = jQuery(this).data('package_no');
    var package_name = jQuery(this).data('package_name');

    // set title name
    jQuery('.itinerary_package_title').html(package_name);

    // active itinerary tab
    jQuery('.agent_package_tab .nav-item .itinerary_pkg_tab').removeClass('active').removeClass('show');
    jQuery('.agent_package_tab .nav-item .itinerary_itinerary_tab').addClass('active show');
    jQuery('.agent_package_tab_content .agent_package_tab_pkg_content').removeClass('active').removeClass('show');
    jQuery('.agent_package_tab_content .agent_package_tab_itinerary_content').addClass('active show');
    jQuery('.btn_save_booking_package').hide();
    jQuery('.btn_save_booking_itinerary').show();

    // fetch hotel room data
    jQuery.ajax({
        type: "POST",
        url: base_url + "dashboard/booking/booking_package_customize_itinerary",
        data: {
            'csrf_mds_token'  : jQuery.cookie(csfr_cookie_name),
            'booking_ref_no'  : booking_ref_no,
            'agent_booking_id': agent_booking_id,
            'tour_id'         : tour_id,
            'package_no'      : package_no
        },
        success: function(itinerary_response) {
            // check content is valid
            if(itinerary_response) {
                jQuery('#package_itinerary_content').html(itinerary_response);
            }

            // trigger resize window
            setTimeout(function() {
                jQuery(window).trigger('resize');
            }, 200);
        }
    });
});

/**
 * on click save itinerary data
 */
jQuery(document.body).on('click', '#agent_single_booking .btn_save_booking_itinerary', function() {
    // get booking data
    var booking_ref_no   = jQuery('#agent_single_booking #booking_ref_no').val();
    var agent_booking_id = jQuery('#agent_single_booking #agent_booking_id').val();
    var tour_id          = jQuery('#agent_single_booking #booking_tour_id').val();
    var package_no       = jQuery('#agent_single_booking #booking_package_id').val();
    var selected_days    = jQuery(this).data('total_night');

    // define array
    var itinerary_data = [];

    // define value
    var total_selected_stay            = [];
    var index                          = 0;
    var total_selected_sightseeing     = 0;
    var total_selected_meal_breakfast  = 0;
    var total_selected_meal_lunch      = 0;
    var total_selected_meal_dinner     = 0;
    var total_selected_meal_hi_tea     = 0;
    var total_selected_stay_index      = 0;
    var total_transportation_arrival   = 0;
    var total_transportation_departure = 0;
    var total_transportation_by_air    = 0;
    var total_transportation_by_boat   = 0;
    var total_transportation_by_train  = 0;
    var total_transportation_point     = 0;
    var total_transportation_guide     = 0;
    var selected_transportation        = '';

    // allow transportation mode
    var allow_trans_mode = ['Arrival', 'Departure', 'By Air', 'By Ferry/Boat', 'By Train', 'Point to Point'];

    // fetch itinerary day data
    for(var day = 1; day <= selected_days; day++) {
        // define array
        itinerary_data[index]    = {};
        var hotel_stay           = [];
        var sightseeing_activity = [];
        var transportation_guide = [];
        var meals                = [];

        // push data in array
        itinerary_data[index]['package_no']      = package_no;
        itinerary_data[index]['day_no']          = day;
        itinerary_data[index]['itinerary_title'] = jQuery('#itinerary_day_' + day + ' .city_name').val();

        // get count data
        var hotel_stay_count     = jQuery('#day_' + day + '_hotel_selection_details .hotel_stay_select_details').length;
        var sightseeing_count    = jQuery('#day_' + day + '_sightseeing_selection_details .hotel_stay_content').length;
        var transportation_count = jQuery('#day_' + day + '_point_to_point_selection_details .hotel_stay_content').length;
        var meal_count           = jQuery('#day_' + day + '_meal_selection_details .hotel_stay_content').length;

        // check hotel stay data
        if(hotel_stay_count) {
            jQuery('#day_' + day + '_hotel_selection_details .hotel_stay_select_details').each(function(key, element) {
                // get hotel content
                var hotel_id         = jQuery(this).find('.select_hotel_id').val();
                var room_category_id = jQuery(this).find('.select_hotel_category').val();

                // update count
                if(jQuery.inArray(hotel_id, total_selected_stay) === -1) {
                    total_selected_stay[total_selected_stay_index] = hotel_id;
                    total_selected_stay_index++;
                }

                // push data in array
                if(hotel_id.length) {
                    hotel_stay[key] = hotel_id + '_' + room_category_id;
                }
            });
        }

        // check sightseeing data
        if(sightseeing_count) {
            jQuery('#day_' + day + '_sightseeing_selection_details .hotel_stay_content').each(function(key, element) {
                // get hotel content
                var select_sightseeing_name = jQuery(this).find('.selected_item_id').val();

                // push data in array
                if(select_sightseeing_name) {
                    // push data in array
                    sightseeing_activity[key] = select_sightseeing_name.replace('Not Required - ', '');

                    // check guide service selected
                    if(select_sightseeing_name.indexOf('Guide') != -1) {
                        total_transportation_guide++;
                    }

                    // update count
                    total_selected_sightseeing++;
                }
            });
        }

        // check transportation data
        if(transportation_count) {
            jQuery('#day_' + day + '_point_to_point_selection_details .hotel_stay_content').each(function(key, element) {
                // get hotel content
                var select_trans_name = jQuery(this).find('.daysDetailTitle').text();

                // push data in array
                if(select_trans_name.length) {
                    // push data in array
                    transportation_guide[key] = select_trans_name;

                    // split by dash
                    var dash_split_str   = select_trans_name.split(' - ');
                    var split_trans_mode = (dash_split_str.length) ? dash_split_str[0] : '';

                    // check guide service selected
                    if(select_trans_name.indexOf('Guide') != -1) {
                        total_transportation_guide++;
                    }

                    // check split value in allow mode
                    if(jQuery.inArray(split_trans_mode, allow_trans_mode) !== -1) {
                        // check transport mode
                        if(split_trans_mode == 'Arrival') {
                            total_transportation_arrival++;
                        } else if(split_trans_mode == 'Departure') {
                            total_transportation_departure++;
                        } else if(split_trans_mode == 'By Air') {
                            total_transportation_by_air++;
                        } else if(split_trans_mode == 'By Ferry/Boat') {
                            total_transportation_by_boat++;
                        } else if(split_trans_mode == 'By Train') {
                            total_transportation_by_train++;
                        } else if(split_trans_mode == 'Point to Point') {
                            total_transportation_point++;
                        }
                    }
                }
            });
        }

        // check meal data
        if(meal_count) {
            jQuery('#day_' + day + '_meal_selection_details .hotel_stay_content').each(function(key, element) {
                // get hotel content
                var select_meal_name = jQuery(this).find('.daysDetailTitle').text();

                // push data in array
                if(select_meal_name.length) {
                    // push data in array
                    meals[key] = select_meal_name;

                    // update count
                    if(select_meal_name.indexOf('Breakfast') != -1) {
                        total_selected_meal_breakfast++;
                    } else if(select_meal_name.indexOf('Lunch') != -1) {
                        total_selected_meal_lunch++;
                    } else if(select_meal_name.indexOf('Hi-Tea') != -1) {
                        total_selected_meal_hi_tea++;
                    } else if(select_meal_name.indexOf('Dinner') != -1) {
                        total_selected_meal_dinner++;
                    }
                }
            });
        }

        // push data in array
        itinerary_data[index]['stay']                 = hotel_stay;
        itinerary_data[index]['sightseeing_activity'] = sightseeing_activity;
        itinerary_data[index]['transportation_guide'] = transportation_guide;
        itinerary_data[index]['meals']                = meals;

        // update index
        index += 1;
    }

    // save itinerary package data
    jQuery.ajax({
        type: "POST",
        url: base_url + "dashboard/booking/booking_save_itinerary_data",
        data: {
            'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
            'booking_ref_no': booking_ref_no,
            'tour_id'       : tour_id,
            'package_no'    : package_no,
            'itinerary_data': JSON.stringify(itinerary_data),
        },
        beforeSend: function() {
            // show loader
            jQuery('#agent_single_booking .btn_save_booking_itinerary').html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Save Itinerary');
        },
        success: function(response) {
            // check response is valid
            if(response) {
                // check transportation count
                if(total_transportation_arrival) {
                    selected_transportation += '<li class="boldTitledetail text-capitalize">' + total_transportation_arrival + ' Arrival Transportation</li>';
                }
                if(total_transportation_departure) {
                    selected_transportation += '<li class="boldTitledetail text-capitalize">' + total_transportation_departure + ' Departure Transportation</li>';
                }
                if(total_transportation_by_air) {
                    selected_transportation += '<li class="boldTitledetail text-capitalize">' + total_transportation_by_air + ' By Air Transportation</li>';
                }
                if(total_transportation_by_boat) {
                    selected_transportation += '<li class="boldTitledetail text-capitalize">' + total_transportation_by_boat + ' By Ferry/Boat Transportation</li>';
                }
                if(total_transportation_by_train) {
                    selected_transportation += '<li class="boldTitledetail text-capitalize">' + total_transportation_by_train + ' By Train Transportation</li>';
                }
                if(total_transportation_point) {
                    selected_transportation += '<li class="boldTitledetail text-capitalize">' + total_transportation_point + ' Point to Point Transportation</li>';
                }

                // set guide content
                if(total_transportation_guide) {
                    selected_transportation += '<li class="boldTitledetail text-capitalize">' + total_transportation_guide + ' Guided Services</li>';
                }

                // update package summary
                jQuery('#tour_package_' + package_no + ' #pkg_selected_hotel_count').html(total_selected_stay.length + ' Selected');
                jQuery('#tour_package_' + package_no + ' #pkg_selected_sightseeing_count').html(total_selected_sightseeing + ' Selected');
                jQuery('#tour_package_' + package_no + ' #pkg_selected_transportation').html(selected_transportation);
                jQuery('#tour_package_' + package_no + ' #pkg_meals_breakfast_count').html(total_selected_meal_breakfast);
                jQuery('#tour_package_' + package_no + ' #pkg_meals_lunch_count').html(total_selected_meal_lunch);
                jQuery('#tour_package_' + package_no + ' #pkg_meals_dinner_count').html(total_selected_meal_dinner);
                jQuery('#tour_package_' + package_no + ' #pkg_meals_hitea_count').html(total_selected_meal_hi_tea);
            }
        },
        complete: function() {
            // show loader
            jQuery('#agent_single_booking .btn_save_booking_itinerary').html('Save Itinerary');

            // show success msg
            jQuery("#save_booking_package_msg").show().css('color', '#004963').html("Itinerary data Saved!");

            // hide msg
            setTimeout(function() {
                jQuery("#save_booking_package_msg").hide();
            }, 5000);
        }
    });
});

/**
 * package itinerary term save tab
 */
jQuery(document.body).on('click', '#agent_single_booking .package_itinerary_term_tab', function() {
    // get ref data
    var ref_data = jQuery(this).data('ref');

    // check ref name
    if(ref_data == 'package') {
        jQuery('.btn_save_booking_package').show();
        jQuery('.btn_save_booking_itinerary').hide();
    } else if(ref_data == 'itinerary') {
        jQuery('.btn_save_booking_package').hide();
        jQuery('.btn_save_booking_itinerary').show();
    } else if(ref_data == 'terms') {
        jQuery('.btn_save_booking_package').hide();
        jQuery('.btn_save_booking_itinerary').hide();
    }
});

/**
 * on click save package data
 */
jQuery(document.body).on('click', '#agent_single_booking .btn_save_booking_package', function() {
    // get booking data
    var booking_ref_no   = jQuery('#agent_single_booking #booking_ref_no').val();
    var agent_booking_id = jQuery('#agent_single_booking #agent_booking_id').val();
    var tour_id          = jQuery('#agent_single_booking #booking_tour_id').val();
    var package_id       = jQuery('#agent_single_booking #booking_package_id').val();

    // get package data
    var total_meals_breakfast = jQuery.trim(jQuery("#tour_package_data #pkg_meals_breakfast_count").text());
    var total_meals_lunch     = jQuery.trim(jQuery("#tour_package_data #pkg_meals_lunch_count").text());
    var total_meals_dinner    = jQuery.trim(jQuery("#tour_package_data #pkg_meals_dinner_count").text());
    var total_meals_hi_tea    = jQuery.trim(jQuery("#tour_package_data #pkg_meals_hitea_count").text());

    // get package b2b price
    var package_price_adult      = jQuery("#tour_package_data #price_adult").val();
    var package_price_child_3_7  = jQuery("#tour_package_data #price_child_3_7").val();
    var package_price_child_8_12 = jQuery("#tour_package_data #price_child_8_12").val();
    var package_price_infact_0_2 = jQuery("#tour_package_data #price_infact_0_2").val();

    // check price is valid
    if(package_price_adult >= 0 && package_price_child_3_7 >= 0 && package_price_child_8_12 >= 0 && package_price_infact_0_2 >= 0) {
        // agent save package data
        jQuery.ajax({
            type: "POST",
            url: base_url + "dashboard/booking/booking_save_package_data",
            data: {
                'csrf_mds_token'       : jQuery.cookie(csfr_cookie_name),
                'booking_ref_no'       : booking_ref_no,
                'agent_booking_id'     : agent_booking_id,
                'tour_id'              : tour_id,
                'package_id'           : package_id,
                'total_meals_breakfast': total_meals_breakfast,
                'total_meals_lunch'    : total_meals_lunch,
                'total_meals_dinner'   : total_meals_dinner,
                'total_meals_hi_tea'   : total_meals_hi_tea,
                'price_adult'          : (package_price_adult) ? package_price_adult : 0,
                'price_child_3_7'      : (package_price_child_3_7) ? package_price_child_3_7 : 0,
                'price_child_8_12'     : (package_price_child_8_12) ? package_price_child_8_12 : 0,
                'price_infact_0_2'     : (package_price_infact_0_2) ? package_price_infact_0_2 : 0,
            },
            beforeSend: function() {
                // hide error
                jQuery("#save_package_msg").css('color', '#004963').hide();

                // show loader
                jQuery('#agent_single_booking .btn_save_booking_package').html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Save Package');
            },
            success: function(response) {
                // check response is valid
                if(response) {
                    // show success msg
                    jQuery("#save_booking_package_msg").show().css('color', '#004963').html("Package data Saved!");
                }
            },
            complete: function() {
                // stop loader
                jQuery('#agent_single_booking .btn_save_booking_package').html('Save Package');

                // hide msg
                setTimeout(function() {
                    jQuery("#save_booking_package_msg").hide();
                }, 5000);
            }
        });
    } else {
        // show error msg
        jQuery("#save_booking_package_msg").show().css('color', '#fa4c46').html('Please enter package price');
        return false;
    }
});

/**
 * on click single lead transfer btn
 */
jQuery('.single_lead_transfer_btn').click(function() {
    // get data
    var inquiry_id  = jQuery('.single_lead_id').val();
    var lead_status = jQuery('input[name="single_lead_status"]:checked').val();
    var agent_id    = jQuery('.lead_transfer_to').val();

    // perform AJAX
    jQuery.ajax({
        type: "POST",
        url: base_url + "dashboard/inquiry/update_lead_status",
        data: {
            'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
            'inquiry_id'    : inquiry_id,
            'lead_status'   : (lead_status) ? lead_status : 'New',
            'agent_id'      : (agent_id) ? agent_id : '',
        },
        success: function(response) {
            // reload page
            alert('Success! Inquiry update successfully.');
            location.reload();
        }
    });
});

/**
 * on click single lead transfer btn
 */
jQuery('.agent_inquiry_filter_apply_btn').click(function() {
    // show loader
    jQuery('.agent_inquiry_filter_apply_btn').html('<i class="fa fa-spinner fa-spin"></i> Searching');

    // get data
    var destination_id = jQuery('.agent_inquiry_box .destination_filter :selected').val();
    var start_date     = jQuery('.agent_inquiry_box .from_date_filter').val();
    var end_date       = jQuery('.agent_inquiry_box .end_date_filter').val();

    // perform AJAX
    jQuery.ajax({
        type: "POST",
        url: base_url + "dashboard/inquiry/filter_inquiry",
        data: {
            'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
            'destination_id': destination_id,
            'start_date'    : start_date,
            'end_date'      : end_date,
        },
        success: function(response) {
            // update content
            jQuery('.agent_inquiry_box .agent_lead_tbl tbody').html(response);

            // hide pagination
            jQuery('.agent_inquiry_box .pagination_section').hide();

            // stop loader
            jQuery('.agent_inquiry_filter_apply_btn').html('Apply Filter');
        }
    });
});

/**
 * on click single booking voucher number update
 */
jQuery(document.body).on('click', '.booking_voucher_save_changes', function() {
    // get data
    var voucher_id     = jQuery(this).data('voucher_id');
    var booking_ref_no = jQuery(this).data('booking_ref_no');
    var tour_id        = jQuery(this).data('tour_id');
    var voucher_number = jQuery('.booking_voucher_input_field_' + voucher_id).val();

    // check value is valid
    if(voucher_id && booking_ref_no && tour_id && voucher_number) {
        // perform AJAX
        jQuery.ajax({
            type: "POST",
            url: base_url + "dashboard/booking/update_vouchers_number",
            data: {
                'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
                'voucher_id'    : voucher_id,
                'booking_ref_no': booking_ref_no,
                'tour_id'       : tour_id,
                'voucher_number': voucher_number,
            },
            beforeSend: function() {
                // hide error
                jQuery('.service_voucher_error').hide();
                jQuery('.booking_voucher_field_error_' + voucher_id).hide();

                // show loader
                jQuery('.booking_voucher_save_btn_' + voucher_id).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Save Changes');
            },
            success: function(response) {
                // check response is valid
                if(response) {
                    jQuery('.service_voucher_error').show().css('color', '#20c593').html('<i class="fa fa-check-circle"></i> &nbsp;Success! Confirmation number has been saved.');
                } else {
                    jQuery('.service_voucher_error').show().css('color', '#ff4c46').html('<i class="fa fa-exclamation-triangle"></i> &nbsp;Oops! Something went wrong. Please try again.');
                }
            },
            complete: function() {
                // show loader
                jQuery('.booking_voucher_save_btn_' + voucher_id).html('Save Changes');

                // hide msg
                setTimeout(function() {
                    jQuery('.service_voucher_error').hide();
                }, 5000);
            }
        });
    } else {
        // show field error
        jQuery('.booking_voucher_field_error_' + voucher_id).show().html('Confirmation number is invalid.');
    }
});

/**
 * on click single booking voucher send by email
 */
jQuery(document.body).on('click', '.booking_voucher_send_by_email', function() {
    // get data
    var voucher_id     = jQuery(this).data('voucher_id');
    var booking_ref_no = jQuery(this).data('booking_ref_no');
    var tour_id        = jQuery(this).data('tour_id');
    var voucher_number = jQuery('.booking_voucher_input_field_' + voucher_id).val();

    // check value is valid
    if(voucher_id && booking_ref_no && tour_id && voucher_number) {
        // perform AJAX
        jQuery.ajax({
            type: "POST",
            url: base_url + "dashboard/booking/send_voucher_by_email",
            data: {
                'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
                'voucher_id'    : voucher_id,
                'booking_ref_no': booking_ref_no,
                'tour_id'       : tour_id,
                'voucher_number': voucher_number,
            },
            beforeSend: function() {
                // hide error
                jQuery('.service_voucher_error').hide();
                jQuery('.booking_voucher_field_error_' + voucher_id).hide();

                // show loader
                jQuery('.booking_voucher_send_by_email_btn_' + voucher_id).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Send by Email');
            },
            success: function(response) {
                // check response is valid
                if(response == 1) {
                    jQuery('.booking_voucher_field_error_' + voucher_id).show().css('color', '#20c593').html('Voucher sent by email successfully.');
                } else {
                    jQuery('.booking_voucher_field_error_' + voucher_id).show().css('color', '#ff4c46').html('Oops! Something went wrong.');
                }
            },
            complete: function() {
                // show loader
                jQuery('.booking_voucher_send_by_email_btn_' + voucher_id).html('Send by Email');

                // hide msg
                setTimeout(function() {
                    jQuery('.service_voucher_error').hide();
                }, 5000);
            }
        });
    } else {
        // show field error
        jQuery('.booking_voucher_field_error_' + voucher_id).show().css('color', '#ff4c46').html('Confirmation number is invalid.');
    }
});