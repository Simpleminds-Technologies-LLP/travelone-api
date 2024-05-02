/**
 * preloader js start
 */
jQuery(window).on('load', function() {
    jQuery('#status').fadeOut();
    jQuery('#preloader').delay(350).fadeOut('slow');
    jQuery('body').delay(550).css({
        'overflow': 'visible'
    });
});

/**
 * on click modal open reset form data
 */
jQuery(document).on('click', '.book_now_tour_modal',function() {
    // set nationality
    jQuery('input[name="book_nationality"]').attr('checked', false);
    jQuery('input[name="book_nationality"]').prop('checked', false);
    jQuery(".nationality_other_input_box").hide();

    // get today date
    var today        = new Date();
    var dd           = today.getDate();
    var MM           = today.getMonth();
    var yyyy         = today.getFullYear();
    var current_date = dd + "-" + (MM + 1) + "-" + yyyy;

    // init calendar picker
    init_calendar_picker('#calendarPicker', current_date, '.select_book_now_date');
});

/**
 * on click next multiform button
 */
jQuery(document).on('click', '#book_now_modal .book_now_next_step_btn', function(e) {
    e.preventDefault();

    // define default
    var is_booking_today      = is_booking_date_is_today();
    var is_valid_booking_date = is_booking_date_valid();
    var is_valid_nationality  = false;

    // check is valid
    if(!is_booking_today && is_valid_booking_date) {
        // active tab
        active_multiform_steps_tab(2);
    } else {
        // show error
        jQuery('.error_notification').show();

        // show error notification
        if(is_booking_today) {
            jQuery('.popup_content').html("<i class='fa fa-calendar'></i> &nbsp;Oops! You can't select today!");
        } else if(is_valid_booking_date == false) {
            jQuery('.popup_content').html("<i class='fa fa-calendar'></i> &nbsp;Oops! You can't select past dates!");
        }

        // hide notification
        setTimeout(function() {
            jQuery('.error_notification').hide();
        }, 5000);
    }
});

/**
 * on click previous multiform button
 */
jQuery(document).on('click', '#book_now_modal .book_now_prev_step_btn',function() {
    // active tab
    active_multiform_steps_tab(1);
});

/**
 * click to change form steps
 */
function active_multiform_steps_tab(active_tab = 1)
{
    // check active step
    if(active_tab == 1) {
        // show / hide tab
        jQuery('#book_now_modal .step_wizard_1').show();
        jQuery('#book_now_modal .step_wizard_2').hide();

        // show submit and previous button
        jQuery('#book_now_modal .book_now_submit_btn').hide();
        jQuery('#book_now_modal .upate_book_item_submit_btn').hide();
        jQuery('#book_now_modal .book_now_next_step_btn').show();
        jQuery('#book_now_modal .book_now_prev_step_btn').hide();

        // active indicator
        jQuery('#book_now_modal .step_2_indicator').removeClass('active');
    } else if(active_tab == 2) {
        // show / hide tab
        jQuery('#book_now_modal .step_wizard_1').hide();
        jQuery('#book_now_modal .step_wizard_2').show();

        // show submit and previous button
        jQuery('#book_now_modal .book_now_submit_btn').show();
        jQuery('#book_now_modal .upate_book_item_submit_btn').show();
        jQuery('#book_now_modal .book_now_next_step_btn').hide();
        jQuery('#book_now_modal .book_now_prev_step_btn').show();

        // active indicator
        jQuery('#book_now_modal .step_2_indicator').addClass('active');
    }
}

/**
 * click to show other nationality
 */
jQuery(document).on('change', "input[name='book_nationality']", function() {
    // get selected value
    var selected_nationality = jQuery("input[name='book_nationality']:checked").val();

    // check selection
    if(selected_nationality == 'other') {
        jQuery('#book_now_modal .nationality_other_input_box').show();
    } else {
        jQuery('#book_now_modal .nationality_other_input_box').hide();
    }
});

/**
 * click to click plus / minus travelers rooms
 */
jQuery(document).on('click', '#book_now_modal .travelers_room_plus_minus', function(e) {
    e.preventDefault();

    // check is disabled
    if(jQuery('.travelers_room_plus_minus').attr('disabled') != 'disabled') {
        // disable button
        jQuery('.travelers_room_plus_minus').attr('disabled', true).css('cursor', 'not-allowed');

        // hide loader
        jQuery('#book_now_modal .travelers_rooms_loader').show();
        jQuery('#book_now_modal .travelers_rooms_input').hide();

        // show or hide trash button
        show_hide_tab_trash_button();

        // get action data
        var is_action = jQuery(this).data('action');

        // get currect count
        var current_count = jQuery('#book_now_modal .travelers_rooms_input').val();

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

            // show error notification
            jQuery('.error_notification').show();
            jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Oops! You can only 5 rooms selected at a time.');

            // hide notification
            setTimeout(function() {
                jQuery('.error_notification').hide();
            }, 5000);

            // hide loader
            jQuery('#book_now_modal .travelers_rooms_loader').hide();
            jQuery('#book_now_modal .travelers_rooms_input').show();
        } else {
            // perform AJAX
            jQuery.ajax({
                type: "POST",
                url: mds_config.base_url + "book_now/set_travelers_rooms_content",
                data: {
                    'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
                    'updated_count' : updated_count,
                },
                success: function(response) {
                    // parse json
                    var json_parse = JSON.parse(response);

                    // update html
                    if(is_action == 'plus') {
                        if(updated_count > 1) {
                            jQuery('#book_now_modal .travelers_room_tab').append(json_parse.html_tab);
                            jQuery('#book_now_modal .travelers_room_tab_content').append(json_parse.html_tab_content);
                        }
                    } else {
                        var remove_current_count = current_count + 1;
                        if(remove_current_count > 1) {
                            // remove tab
                            jQuery('#book_now_modal .travelers_room_tab').children().last().remove();
                            jQuery('#book_now_modal .travelers_room_tab_content').children().last().remove();
                        }
                    }

                    // remove pprevious selected tab
                    jQuery('#book_now_modal .travelers_room_tab .travelers_room_selection').removeClass('active');
                    jQuery('#book_now_modal .travelers_room_tab_content .travelers_room_tab_content_single').hide();

                    // active selected tab
                    jQuery('#book_now_modal .travelers_room_tab .travelers_room_' + updated_count + '_selection').addClass('active');
                    jQuery('#book_now_modal .travelers_room_tab_content .travelers_room_tab_content_' + updated_count).show();

                    // show or hide trash button
                    show_hide_tab_trash_button();

                    // enable button
                    jQuery('.travelers_room_plus_minus').attr('disabled', false).css('cursor', 'pointer');

                    // update count
                    jQuery('#book_now_modal .travelers_rooms_input').val(updated_count);

                    // hide loader
                    jQuery('#book_now_modal .travelers_rooms_loader').hide();
                    jQuery('#book_now_modal .travelers_rooms_input').show();
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
        jQuery('#book_now_modal .travelers_room_delete').hide();
    } else {
        // show trash button
        jQuery('#book_now_modal .travelers_room_delete').show();
    }
}

/**
 * click to delete selected room tab content
 */
jQuery(document.body).on('click', '#book_now_modal .travelers_room_delete', function(e) {
    e.preventDefault();

    // define default value
    var is_active_room = null;

    // fetch tabs
    jQuery.each(jQuery("#book_now_modal .travelers_room_tab .travelers_room_selection"), function() {
        // get is active
        var is_active_tab = jQuery(this).hasClass('active');

        // check is active
        if(is_active_tab) {
            is_active_room = jQuery(this).attr('data-room_no');
        }
    });

    // get current tabs
    var prev_total_tabs = jQuery('#book_now_modal .travelers_room_tab .travelers_room_selection').length;

    // check active tab is valid
    if(is_active_room && prev_total_tabs > 1) {
        // rearrange traveler selection tabs
        rearrange_traveler_selection_tabs();

        // remove tab content
        jQuery('#book_now_modal .travelers_room_tab .travelers_room_' + is_active_room + '_selection').closest(".tab").remove();
        jQuery('#book_now_modal .travelers_room_tab_content .travelers_room_tab_content_' + is_active_room).remove();

        // show default tab
        jQuery('#book_now_modal .travelers_room_tab .travelers_room_1_selection').addClass('active');
        jQuery('#book_now_modal .travelers_room_tab_content .travelers_room_tab_content_1').show();

        // get total room count
        var total_rooms = jQuery('#book_now_modal .travelers_rooms_input').val();

        // set new count
        var total_rooms = total_rooms - 1;

        // update count
        jQuery('#book_now_modal .travelers_rooms_input').val(total_rooms);

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
        jQuery('.error_notification').show();
        jQuery('.popup_content').html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Oops! We need at least one room selection.");

        // hide notification
        setTimeout(function() {
            jQuery('.error_notification').hide();
        }, 5000);
    }
});

/**
 * rearrange traveler selection tabs
 */
function rearrange_traveler_selection_tabs()
{
    // rearrange current tabs
    jQuery.each(jQuery('#book_now_modal .travelers_room_tab .travelers_room_selection'), function(index) {
        // set room no
        var room_no = index + 1;

        // remove class and add new
        jQuery(this).removeClass('travelers_room_1_selection').removeClass('travelers_room_2_selection').removeClass('travelers_room_3_selection').removeClass('travelers_room_4_selection').removeClass('travelers_room_5_selection').addClass('travelers_room_' + room_no + '_selection');

        // set room data
        jQuery(this).attr('data-room_no', room_no);
    });

    // rearrange current tabs content
    jQuery.each(jQuery('#book_now_modal .travelers_room_tab_content .travelers_room_tab_content_single'), function(index) {
        // set room no
        var room_no = index + 1;

        // remove class and add new
        jQuery(this).removeClass('travelers_room_tab_content_1').removeClass('travelers_room_tab_content_2').removeClass('travelers_room_tab_content_3').removeClass('travelers_room_tab_content_4').removeClass('travelers_room_tab_content_5').addClass('travelers_room_tab_content_' + room_no);
    });
}

/**
 * check booking date is valid
 */
function is_booking_date_valid()
{
    // define default status
    var is_valid = true;

    // get selected date
    var selected_date = jQuery('.calendar-box .week .day.selected').attr('data-formatted_date');

    // split selected date
    var split_date = selected_date.split('-');

    // get single year, month and day
    var select_year  = split_date[0];
    var select_month = split_date[1];
    var select_date  = split_date[2];

    // convert in to date
    var booking_date = new Date(select_month + ' ' + select_date + ' ' + select_year);

    // match two dates
    if (new Date(booking_date).getTime() <= new Date().getTime()) {
        is_valid = false;
    }

    // return response
    return is_valid;
}

/**
 * check booking date is today or not
 */
function is_booking_date_is_today()
{
    // define default status
    var is_today = false;

    // get selected date
    var selected_date = jQuery('.calendar-box .week .day.selected').attr('data-formatted_date');

    // split selected date
    var split_date = selected_date.split('-');

    // get single year, month and day
    var select_year  = split_date[0];
    var select_month = split_date[1];
    var select_date  = split_date[2];

    // convert in to date
    var booking_date = new Date(select_month + ' ' + select_date + ' ' + select_year);

    // get today date
    var today_date = new Date();
    today_date.setHours(0, 0, 0, 0);

    // match two dates
    if (new Date(booking_date).getTime() == new Date(today_date).getTime()) {
        is_today = true;
    }

    // return response
    return is_today;
}

/**
 * click to show tab content
 */
jQuery(document.body).on('click', '#book_now_modal .travelers_room_selection', function(e) {
    e.preventDefault();

    // get data
    var room_no = jQuery(this).html().replace('Room ', '');

    // rearrange traveler selection tabs
    rearrange_traveler_selection_tabs();

    // hide tab content
    jQuery('body #book_now_modal .travelers_room_tab_content_single').hide();
    jQuery('body #book_now_modal .travelers_room_selection').removeClass('active');

    // active tab content
    jQuery('body #book_now_modal .travelers_room_tab_content_' + room_no).show();
    jQuery('body #book_now_modal .travelers_room_' + room_no + '_selection').addClass('active');

    // check tab and show delete button
    if(room_no != 1) {
        jQuery('body #book_now_modal .travelers_room_delete').show();
    } else {
        jQuery('body #book_now_modal .travelers_room_delete').hide();
    }
});

/**
 * click to update tab content count
 */
jQuery(document.body).on('click', '#book_now_modal .room_tab_update_count', function() {
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
    var current_count = jQuery('#book_now_modal .travelers_room_tab_content_' + room_no + ' .room_tab_content_' + count_type + '_count').val();

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
        jQuery('.error_notification').show();
        jQuery('.popup_content').html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Oops! You can't make adult count 0.");

        // hide notification
        setTimeout(function() {
            jQuery('.error_notification').hide();
        }, 5000);
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
            jQuery('#book_now_modal .travelers_room_tab_content_' + room_no + ' .room_tab_content_' + count_type + '_count').val(updated_count);
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
            jQuery('.error_notification').show();
            jQuery('.popup_content').html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Oops! " + error_msg);

            // hide notification
            setTimeout(function() {
                jQuery('.error_notification').hide();
            }, 5000);
        }
    }
});

/**
 * on click submit book now data
 */
jQuery(document).on('click', '#book_now_modal .book_now_submit_btn', function() {
    // show loader
    jQuery(this).attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Submit');

    // get data
    var tour_id    = jQuery('#single_page_tour_id').val();
    var package_id = jQuery("input[name='tour_package_selection']:checked").val();

    // get book selected data
    var selected_book_data = get_customer_selected_book_data();

    // check is array or not
    if(jQuery.isArray(selected_book_data)) {
        // check room data is valid
        if(selected_book_data['room_data'].length) {
            // save booking data
            jQuery.ajax({
                type: "POST",
                url: mds_config.base_url + "book_now/save_customer_booking_data",
                data: {
                    'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
                    'tour_id'       : tour_id,
                    'package_id'    : package_id,
                    'booking_date'  : selected_book_data['booking_date'],
                    'nationality_id': selected_book_data['nationality_id'],
                    'total_rooms'   : selected_book_data['total_rooms'],
                    'room_data'     : JSON.stringify(selected_book_data['room_data']),
                },
                datatype: 'JSON',
                success: function(response) {
                    // check response is valid
                    if(response == 'success') {
                        // show error
                        jQuery('.success_notification').show();
                        jQuery('.success_notification .popup_content').html('<i class="fa fa-check-circle"></i> Congratulations! You have successfully added the selected tour to your cart.');

                        // redirect to cart page
                        setTimeout(function() {
                            window.location.href = mds_config.base_url + 'cart';
                        }, 2000);
                    } else {
                        // show error
                        jQuery('.error_notification').show();
                        jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Apologies! We encountered a problem. Please try again later.');

                        // hide notification
                        setTimeout(function() {
                            jQuery('.error_notification').hide();
                        }, 5000);
                    }

                    // stop loader
                    jQuery('#book_now_modal .book_now_submit_btn').attr('disabled', false).html('<i class="fa fa-check-circle"></i> Submit');
                }
            });
        } else {
            // stop loader
            jQuery('#book_now_modal .book_now_submit_btn').attr('disabled', false).html('<i class="fa fa-check-circle"></i> Submit');

            // show error notification
            jQuery('.error_notification').show();
            jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Uh-oh! It appears that the data for the room selected by the traveler(s) is not valid. Please check it.');

            // hide notification
            setTimeout(function() {
                jQuery('.error_notification').hide();
            }, 5000);
        }
    } else {
        // stop loader
        jQuery('#book_now_modal .book_now_submit_btn').attr('disabled', false).html('<i class="fa fa-check-circle"></i> Submit');

        // show error notification
        jQuery('.error_notification').show();
        if (selected_book_data == 'out_of_members') {
            jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Oops! You can select maximum 4 guests in one double/twin room!');
        } else {
            jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Oops! Please make sure to select at least one member for the double/twin room.');
        }

        // hide notification
        setTimeout(function() {
            jQuery('.error_notification').hide();
        }, 5000);
    }
});

/**
 * for cart page => on click update item data
 */
jQuery(document).on('click', '#book_now_modal .upate_book_item_submit_btn', function() {
    // show loader
    jQuery(this).attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Save Changes');

    // get data
    var tour_id = jQuery('#single_page_tour_id').val();

    // get book selected data
    var selected_book_data = get_customer_selected_book_data();

    // check is array or not
    if(jQuery.isArray(selected_book_data)) {
        // check room data is valid
        if(selected_book_data['room_data'].length) {
            // save booking data
            jQuery.ajax({
                type: "POST",
                url: mds_config.base_url + "book_now/update_cart_item_booking_data",
                data: {
                    'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
                    'tour_id'       : tour_id,
                    'booking_date'  : selected_book_data['booking_date'],
                    'nationality_id': selected_book_data['nationality_id'],
                    'total_rooms'   : selected_book_data['total_rooms'],
                    'room_data'     : JSON.stringify(selected_book_data['room_data']),
                },
                success: function(response) {
                    // check response is valid
                    if(response == 'success') {
                        // show error
                        jQuery('.success_notification').show();
                        jQuery('.success_notification .popup_content').html('<i class="fa fa-check-circle"></i> Success! You selected package has been updated successfully.');

                        // redirect to cart page
                        setTimeout(function() {
                            window.location.href = mds_config.base_url + 'cart';
                        }, 2000);
                    } else {
                        // show error
                        jQuery('.error_notification').show();
                        jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Apologies for the inconvenience! We encountered an issue. Please try again later.');

                        // hide notification
                        setTimeout(function() {
                            jQuery('.error_notification').hide();
                        }, 5000);
                    }

                    // stop loader
                    jQuery('#book_now_modal .upate_book_item_submit_btn').attr('disabled', false).html('<i class="fa fa-check-circle"></i> Save Changes');
                }
            });
        } else {
            // stop loader
            jQuery('#book_now_modal .upate_book_item_submit_btn').attr('disabled', false).html('<i class="fa fa-check-circle"></i> Save Changes');

            // show error notification
            jQuery('.error_notification').show();
            jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Oops! The data for the room selected by the traveler(s) is not valid. Please check it.');

            // hide notification
            setTimeout(function() {
                jQuery('.error_notification').hide();
            }, 5000);
        }
    } else {
        // stop loader
        jQuery('#book_now_modal .upate_book_item_submit_btn').attr('disabled', false).html('<i class="fa fa-check-circle"></i> Save Changes');

        // show error notification
        jQuery('.error_notification').show();
        jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Oops! You can select maximum 4 guests in one double/twin room!');

        // hide notification
        setTimeout(function() {
            jQuery('.error_notification').hide();
        }, 5000);
    }
});

/**
 * get customer selected book data
 */
function get_customer_selected_book_data()
{
    // define array
    var book_data = [];
    var room_data = [];

    // set valid flag
    var is_valid_room = true;

    // get booking date
    var booking_date = jQuery('#book_now_modal .select_book_now_date').val();

    // get selected nationality
    var is_nationality = jQuery("input[name='book_nationality']:checked").val();

    // check nationality
    if(is_nationality == 'other') {
        is_nationality = jQuery('#book_now_modal #nationality_other_input :selected').val();
    }

    // get selected room count
    var total_rooms = jQuery('#book_now_modal .travelers_rooms_input').val();

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

        // check and update flag if not selection
        if(total_members == 0) {
            if(is_valid_room) {
                is_valid_room = false;
            }
        }

        // check total selected members
        if(total_members > 0 && total_members < 5) {
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

    // check is valid
    if(total_rooms == room_data.length) {
        // push data in array
        book_data['booking_date']   = booking_date;
        book_data['nationality_id'] = is_nationality;
        book_data['total_rooms']    = total_rooms;
        book_data['room_data']      = room_data;

        // return response
        return book_data;
    } else {
        // check validation flag
        if(is_valid_room == false) {
            return 'not_selected';
        } else {
            // return response
            return 'out_of_members';
        }
    }
}

/**
 * click to apply cart coupon code
 */
jQuery(document.body).on('click', '.remove_cart_item', function() {
    // show loader
    jQuery(this).attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Remove');

    // get coupon code
    var tour_id    = jQuery(this).data('tour_id');
    var booking_id = jQuery(this).data('booking_id');

    // check coupon code is valid
    if(tour_id && booking_id) {
        // perform AJAX
        jQuery.ajax({
            type: "POST",
            url: mds_config.base_url + "cart/remove_item_from_cart",
            data: {
                'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
                'tour_id'       : tour_id,
                'booking_id'    : booking_id,
            },
            success: function(response) {
                // converrt json parse
                var json_parse = JSON.parse(response);

                // check response is valid
                if(json_parse.is_removed) {
                    // show error
                    jQuery('.success_notification').show();
                    jQuery('.success_notification .popup_content').html('<i class="fa fa-check-circle"></i> Success! Item removed from your cart.');

                    // update cart count
                    jQuery('.cart_count').hide().html('');

                    // show not found msg
                    jQuery('.cart_content_box').removeClass('col-md-8 col-lg-8 col-xl-8').removeClass('col-md-12 col-lg-12 col-xl-12').html('<div class="cart_not_found"><img draggable="false" class="lazyload img-responsive img-fluid" style="height: 150px" src="' + mds_config.base_url + 'assets/img/svg/empty_cart.svg"><br><br><span>Oops! No Tours were found in your cart.</span></div>');
                    jQuery('.cart_calculation_section').hide();
                } else {
                    // show error
                    jQuery('.error_notification').show();
                    jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Oops! Something went wrong. Please try again later.');

                    // hide notification
                    setTimeout(function() {
                        jQuery('.error_notification').hide();
                    }, 5000);
                }

                // stop loader
                jQuery('.remove_cart_item_' + tour_id).attr('disabled', false).html('<ion-icon name="close-circle-outline" role="img" class="md hydrated" aria-label="close outline"></ion-icon> Remove');
            }
        });
    } else {
        // show error
        jQuery('.error_notification').show();
        jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Oops! Something went wrong. Please try again later.');

        // hide notification
        setTimeout(function() {
            jQuery('.error_notification').hide();
        }, 5000);

        // stop loader
        jQuery('.remove_cart_item_' + tour_id).attr('disabled', false).html('<ion-icon name="close-circle-outline" role="img" class="md hydrated" aria-label="close outline"></ion-icon> Remove');
    }
});

/**
 * click to apply cart coupon code
 */
jQuery(document.body).on('click', '.apply_cart_coupon_code', function() {
    // apply coupon code
    apply_coupon_code_in_cart_page();
});

/**
 * on press enter to apply cart coupon code
 */
jQuery('#cart_coupon_code').keypress(function (e) {
    // check key value
    if(e.which == 13) {
        // apply coupon code
        apply_coupon_code_in_cart_page();
    }
});

/**
 * apply coupon code in cart page
 */
function apply_coupon_code_in_cart_page()
{
    // get coupon code
    var coupon_code = jQuery('#cart_coupon_code').val();

    // perform AJAX
    jQuery.ajax({
        type: "POST",
        url: mds_config.base_url + "cart/apply_cart_coupon_code",
        data: {
            'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
            'coupon_code'   : coupon_code,
        },
        beforeSend: function() {
            // remove coupon msg
            jQuery('.cart_coupon_error').hide();

            // show loader
            jQuery('.apply_cart_coupon_code').attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Apply');
        },
        success: function(response) {
            // json parse
            var json_parse = JSON.parse(response);

            // update discount total
            jQuery('.cart_calculation_section .discount_total').show();
            jQuery('.cart_calculation_section .discount_total .rate').html(json_parse.discount_text);
            jQuery('.cart_calculation_section .grand_total_price').html('$' + json_parse.grand_total);
            jQuery('.cart_calculation_section .paynow_reserve_button span').html('$' + json_parse.part_payment);
            jQuery('.cart_calculation_section .cart_payfull_buttons .button2').html('Pay Full ($' + json_parse.grand_total + ')');
            jQuery('.cart_calculation_section .payfull_hightlight').html('Pay full and get $' + json_parse.full_payment_discount + ' discount');

            // set next payment schedule
            if(json_parse.payment_schedule) {
                jQuery('.cart_calculation_section .cart_right_payschedule .payscheDatePrice').html(json_parse.payment_schedule);
            }

            // set discount price
            if(json_parse.discount_price) {
                jQuery('.cart_calculation_section .discount_total .price').show().html('- $' + json_parse.discount_price);
            } else {
                jQuery('.cart_calculation_section .discount_total .price').hide();
            }

            // check response is valid
            if(json_parse.is_valid) {
                // show success
                jQuery('.cart_coupon_error').css('color', '#20c593').show().html('Coupon code applied successfully.');
            } else {
                // show error
                jQuery('.cart_coupon_error').css('color', '#ff4c46').show().html(json_parse.error);
            }
        },
        error: function(error) {
            // show error
            jQuery('.cart_coupon_error').css('color', '#ff4c46').show().html('Oops! Error occured. Please try again later.');
        },
        complete: function() {
            // stop loader
            jQuery('.apply_cart_coupon_code').attr('disabled', false).html('Apply');
        }
    });
}

/**
 * on click active booking room tab
 */
jQuery(document.body).on('click', '.booking_room_tab', function() {
    // get room data
    var room_no = jQuery(this).data('room_no');

    // deactive current tab
    jQuery('.booking_room_tab .titleCounter').removeClass('active');
    jQuery('.booking_single_room .booking_single_room_content').hide();

    // active selected tab
    jQuery('.booking_room_tab_' + room_no + ' .titleCounter').addClass('active');
    jQuery('.booking_single_room .booking_single_room_content_' + room_no).show();
});

/**
 * on keyup check traveler info using passport
 */
jQuery('.traveller_passport_no').keyup(function() {
    // get passport number
    var booking_ref_no  = jQuery('#hidden_booking_ref_no').val();
    var agent_id        = jQuery(this).data('agent_id');
    var traveller_type  = jQuery(this).data('traveller_type');
    var count_no        = jQuery(this).data('count');
    var passport_number = jQuery(this).val();
    var created_id      = jQuery('.save_booking_traveller_info_btn_adults_' + count_no).data('created_id');

    // caps strign
    var updated_number = passport_number.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toUpperCase();

    // update caps value
    jQuery(this).val(updated_number);

    // check is string is exist
    var is_alphanumeric = isAlphanumeric(passport_number);

    // check length
    if(agent_id && passport_number.length > 8) {
        // check is alpha numeric string
        if(is_alphanumeric) {
            // perform AJAX
            jQuery.ajax({
                type: "POST",
                url: mds_config.base_url + "my_bookings/check_booking_traveller_info",
                data: {
                    'csrf_mds_token' : jQuery.cookie(mds_config.csfr_cookie_name),
                    'booking_ref_no' : booking_ref_no,
                    'agent_id'       : agent_id,
                    'passport_number': passport_number,
                    'created_id'     : created_id,
                },
                success: function(response) {
                    // convert json parse
                    var json_parse = JSON.parse(response);

                    // check already exist
                    if(json_parse.is_exist) {
                        // show error
                        jQuery('.error_notification').show();
                        jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Oops! The entered passport number already exists for this tour. Please review and save it.');
                    }
                }
            });
        } else {
            // show error
            jQuery('.error_notification').show();
            jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Oops! Entered passport number is not valid. Please enter valid passport number.');
        }

        // hide notification
        setTimeout(function() {
            jQuery('.error_notification').hide();
        }, 5000);
    }
});

/**
 * check string is Alphanumeric
 */
function isAlphanumeric(string)
{
    // define blank data
    var is_number = false;
    var is_string = false;

    // define match string
    var match_string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var match_number = "0123456789";

    // check is string and number
    if(string.length > 8) {
        for (var index = 0; index < string.length; index++) {
            // get single character
            var single_letter = string[index];

            // match is string
            if(is_string == false) {
                var str_result = match_string.match(single_letter);
                is_string      = (str_result) ? true : false;
            }

            // match is number
            if(is_number == false) {
                var num_result = match_number.match(single_letter);
                is_number      = (num_result) ? true : false;
            }
        }
    }

    // check both result
    if(is_number && is_string) {
        return true;
    } else {
        return false;
    }
}

/**
 * on click save booking traveller info
 */
jQuery(document.body).on('click', '.save_booking_traveller_info_btn', function() {
    // get requested data
    var agent_id       = jQuery(this).data('agent_id');
    var booking_id     = jQuery(this).data('booking_id');
    var booking_ref_no = jQuery(this).data('booking_ref_no');
    var traveller_type = jQuery(this).data('traveller_type');
    var count_no       = jQuery(this).data('count');

    // check is updated
    var is_updated = jQuery(this).hasClass('is_updated');
    var created_id = jQuery(this).attr('data-created_id');

    // reset danger input
    jQuery('.single_traveller_adults_count_' + count_no + ' #traveller_fname').css('border', 'unset');
    jQuery('.single_traveller_adults_count_' + count_no + ' #traveller_mname').css('border', 'unset');
    jQuery('.single_traveller_adults_count_' + count_no + ' #traveller_lname').css('border', 'unset');
    jQuery('.single_traveller_adults_count_' + count_no + ' #traveller_passport_no').css('border', 'unset');

    // check requested data is valid
    if(booking_id && booking_ref_no && traveller_type && count_no) {
        // get form data
        var traveller_fname           = jQuery('.single_traveller_' + traveller_type + '_count_' + count_no + ' #traveller_fname').val();
        var traveller_mname           = jQuery('.single_traveller_' + traveller_type + '_count_' + count_no + ' #traveller_mname').val();
        var traveller_lname           = jQuery('.single_traveller_' + traveller_type + '_count_' + count_no + ' #traveller_lname').val();
        var traveller_dob             = jQuery('.single_traveller_' + traveller_type + '_count_' + count_no + ' #traveller_dob').val();
        var traveller_passport_no     = jQuery('.single_traveller_' + traveller_type + '_count_' + count_no + ' #traveller_passport_no').val();
        var traveller_passport_expiry = jQuery('.single_traveller_' + traveller_type + '_count_' + count_no + ' #traveller_passport_expiry').val();
        var traveller_nationality     = jQuery('.single_traveller_' + traveller_type + '_count_' + count_no + ' #traveller_nationality :selected').val();

        // check form data is valid
        if(!isAlphanumeric(traveller_passport_no)) {
            // show error
            jQuery('.error_notification').show();
            jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Oops! Entered passport number is not valid. Please enter valid passport number.');

            // hide notification
            setTimeout(function() {
                jQuery('.error_notification').hide();
            }, 5000);
        } else if(traveller_fname && traveller_mname && traveller_lname && traveller_dob && traveller_passport_no && traveller_passport_expiry && traveller_nationality) {
            // show loader
            jQuery(this).attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Save Changes');

            // perform AJAX
            jQuery.ajax({
                type: "POST",
                url: mds_config.base_url + "my_bookings/save_booking_traveller_info",
                data: {
                    'csrf_mds_token'           : jQuery.cookie(mds_config.csfr_cookie_name),
                    'is_updated'               : (is_updated) ? 1 : 0,
                    'already_created_id'       : created_id,
                    'agent_id'                 : agent_id,
                    'booking_id'               : booking_id,
                    'booking_ref_no'           : booking_ref_no,
                    'traveller_type'           : traveller_type,
                    'count_no'                 : count_no,
                    'traveller_fname'          : traveller_fname,
                    'traveller_mname'          : traveller_mname,
                    'traveller_lname'          : traveller_lname,
                    'traveller_dob'            : traveller_dob,
                    'traveller_passport_no'    : traveller_passport_no,
                    'traveller_passport_expiry': traveller_passport_expiry,
                    'traveller_nationality'    : traveller_nationality,
                },
                success: function(response) {
                    // json parse
                    var json_parse = JSON.parse(response);

                    // check already exist
                    if(json_parse.is_returned == 'passport_already_exist') {
                        // show error
                        jQuery('.error_notification').show();
                        jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Oops! The passport number entered already existed with other passengers.');

                        // show input danger
                        jQuery('.single_traveller_adults_count_' + count_no + ' #traveller_passport_no').css('border', '1px solid rgb(255, 76, 70)');

                        // stop loader
                        jQuery('.save_booking_traveller_info_btn').attr('disabled', false).html('<i class="fa fa-check-circle"></i> &nbsp;Save Changes');

                        // hide notification
                        setTimeout(function() {
                            jQuery('.error_notification').hide();
                        }, 5000);
                    } else if(json_parse.is_returned == 'fullname_already_exist') {
                        // show error
                        jQuery('.error_notification').show();
                        jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Oops! The full name entered already existed with other passengers.');

                        // show input danger
                        jQuery('.single_traveller_adults_count_' + count_no + ' #traveller_fname').css('border', '1px solid rgb(255, 76, 70)');
                        jQuery('.single_traveller_adults_count_' + count_no + ' #traveller_mname').css('border', '1px solid rgb(255, 76, 70)');
                        jQuery('.single_traveller_adults_count_' + count_no + ' #traveller_lname').css('border', '1px solid rgb(255, 76, 70)');

                        // stop loader
                        jQuery('.save_booking_traveller_info_btn').attr('disabled', false).html('<i class="fa fa-check-circle"></i> &nbsp;Save Changes');

                        // hide notification
                        setTimeout(function() {
                            jQuery('.error_notification').hide();
                        }, 5000);
                    } else if(json_parse.is_returned == 'success') {
                        // show error
                        jQuery('.success_notification').show();
                        jQuery('.popup_content').html('<i class="fa fa-check-circle"></i> Success! Traveler information has been saved.');

                        // hide notification
                        setTimeout(function() {
                            jQuery('.success_notification').hide();
                        }, 5000);

                        // updated created ID
                        if(json_parse.created_id) {
                            jQuery('.save_booking_traveller_info_btn_' + traveller_type + '_' + count_no).attr('data-created_id', json_parse.created_id);
                        }

                        // stop loader
                        jQuery('.save_booking_traveller_info_btn_' + traveller_type + '_' + count_no).css('background', '#20c593').attr('disabled', false).html('<i class="fa fa-check-circle"></i> &nbsp;Update').addClass('is_updated');
                    } else {
                        // show error
                        jQuery('.error_notification').show();
                        jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Oops! Something went wrong. Please try again later.');

                        // hide notification
                        setTimeout(function() {
                            jQuery('.error_notification').hide();
                        }, 5000);

                        // stop loader
                        jQuery('.save_booking_traveller_info_btn').attr('disabled', false).html('<i class="fa fa-check-circle"></i> &nbsp;Save Changes');
                    }
                }
            });
        } else {
            // show error
            jQuery('.error_notification').show();
            jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Oops! * All fields are required.');

            // hide notification
            setTimeout(function() {
                jQuery('.error_notification').hide();
            }, 5000);
        }
    } else {
        // show error
        jQuery('.error_notification').show();
        jQuery('.popup_content').html('<i class="fa fa-exclamation-triangle"></i> Oops! Something went wrong. Please try again later.');

        // hide notification
        setTimeout(function() {
            jQuery('.error_notification').hide();
        }, 5000);
    }
});

/**
 * on click fetch booking room allocation tabs
 */
jQuery(document.body).on('change', '.room_allocation_tab_mobile', function() {
    // get selected tab
    var tab_index = jQuery('option:selected', this).data('tab_index');

    // check tab is third
    if(tab_index == 3) {
        generate_room_allocation_tab_content();
    }
});

/**
 * on click fetch booking room allocation tabs
 */
jQuery(document.body).on('click', '.room_allocation_tab', function() {
    generate_room_allocation_tab_content();
});

/**
 * generate room allocation tab content
 */
function generate_room_allocation_tab_content()
{
    // show loader
    jQuery('#tab3').html('<div style="text-align: center; padding: 50px 0px;"><img draggable="false" style="height: 140px" class="img-responsive img-fluid lazyload" src="' + mds_config.base_url + 'assets/img/svg/opened_tabs.svg"><br><br><span style="color: #004963; font-weight: 600"><i class="fa fa-spinner fa-spin"></i> &nbsp;Fetching room allocation...</span></div>');

    // get booking ref number
    var booking_ref_no = jQuery('.mybookingDetailsSec #hidden_booking_ref_no').val();

    // perform AJAX
    jQuery.ajax({
        type: "POST",
        url: mds_config.base_url + "my_bookings/generate_room_allocation_tabs",
        data: {
            'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
            'booking_ref_no': booking_ref_no,
        },
        success: function(response) {
            // set content
            jQuery('#tab3').html(response);

            // trigger resize window
            setTimeout(function() {
                jQuery(window).trigger('resize');
            }, 0);
        }
    });
}

/**
 * on click open room allocation tab content
 */
jQuery(document).ready(function() {
    jQuery(document.body).on('click', '.booking_room_allocation_tab .open_room_allocation_tab', function() {
        // get selected tab
        var room_no = jQuery(this).data('room_no');

        // deactive current tab
        jQuery('.booking_room_allocation_tab .open_room_allocation_tab').removeClass('booking_room_active_tab');
        jQuery('.booking_room_allocation_tab_content .tabcontent_room_allocation').css('display', 'none');

        // active selected tab
        jQuery('.booking_room_allocation_tab .open_room_allocation_tab_' + room_no).addClass('booking_room_active_tab');
        jQuery('.booking_room_allocation_tab_content #Room' + room_no).css('display', 'block');

        // trigger resize window
        setTimeout(function() {
            jQuery(window).trigger('resize');
        }, 100);
    });
});

/**
 * on select allocate room to traveler members
 */
jQuery(document.body).on('change', '.select_member_allocate_room', function() {
    // get traveller id
    var traveller_id = jQuery(this).find(':selected').val();

    // get selected tab
    var allocate_room_no = jQuery(this).data('room_no');

    // perform AJAX
    jQuery.ajax({
        type: "POST",
        url: mds_config.base_url + "my_bookings/traveler_members_allocate_room",
        data: {
            'csrf_mds_token'  : jQuery.cookie(mds_config.csfr_cookie_name),
            'traveller_id'    : traveller_id,
            'allocate_room_no': allocate_room_no,
        }
    });
});

/**
 * check traveller passport expiry
 **/
jQuery(document).on('change', '.traveller_passport_expiry', function() {
    // reset input danger
    jQuery(this).css('border-color', 'unset').css('border-radius', '5px');

    // get expiry date
    var traveller_type = jQuery(this).data('traveller_type');
    var count_no       = jQuery(this).data('count');
    var booking_date   = jQuery(this).data('booking_date');
    var expiry_date    = jQuery(this).val();

    // convert timestemp
    var booking_timestemp = new Date(booking_date);
    var expiry_timestemp  = new Date(expiry_date);

    // convert in to date
    const days_diff_in_minutes = new Date(expiry_date) - new Date(booking_date)

    // count days
    const count_days = days_diff_in_minutes / (1000 * 60 * 60 * 24);

    // define default value
    var is_date_valid = true;

    // check date is grater then booking date
    if(booking_timestemp.getTime() > expiry_timestemp.getTime()) {
        // show warning for expiry
        jQuery('.single_traveller_' + traveller_type + '_count_' + count_no + ' .passport_expity_notice').html('<i class="fa fa-exclamation-triangle"></i> The passport expiry date should be greater than the booking date.').show();

        // input danger
        jQuery(this).css('border-color', 'rgb(255 76 70)').css('border-radius', '5px');

        // remove date
        jQuery(this).val('');
        is_date_valid = false;        
    }

    // check days with in 6 months
    if(is_date_valid) {
        if(count_days < 184) {
            // show warning for expiry
            jQuery('.single_traveller_' + traveller_type + '_count_' + count_no + ' .passport_expity_notice').html('<i class="fa fa-exclamation-triangle"></i> The passport will expire within 6 months.').show();

            // input danger
            jQuery(this).css('border-color', 'rgb(255 76 70)').css('border-radius', '5px');
        } else {
            // hide warning for expiry
            jQuery('.single_traveller_' + traveller_type + '_count_' + count_no + ' .passport_expity_notice').hide();
        }
    }
});

/**
 * on click active payment method in checkout page
 */
jQuery(document.body).on('click', '.checkout_payment_method .tab_list .item', function() {
    // get selected tab
    var tab_name = jQuery(this).data('tab_name');

    // remove active tab
    jQuery('.checkout_payment_method .tab_list .item').removeClass('active-a');
    jQuery('.checkout_payment_method .tab_content .tab').removeClass('tab-active');

    // active selected tab
    jQuery('.checkout_payment_method .tab_list .item-' + tab_name).addClass('active-a');
    jQuery('.checkout_payment_method .tab_content .tab_content_' + tab_name).addClass('tab-active');

    // hide pay now option
    if(tab_name == 'stripe_credit_card') {
        jQuery('.checkout_pay_now').show();
    } else {
        jQuery('.checkout_pay_now').hide();
    }
});

/**
 * on click edit single cart items data
 */
jQuery(document.body).on('click', '.cart_items .edit_single_cart_item', function() {
    // update content
    jQuery('#book_now_modal .cart_item_content').html('<div style="text-align: center; font-size: 16px; padding-top: 50px; color: #004963; font-weight: 600"><i class="fa fa-spinner fa-spin"></i>&nbsp;&nbsp;Fetching tour content...</div>');

    // perform AJAX
    jQuery.ajax({
        type: "POST",
        url: mds_config.base_url + "cart/edit_cart_item_participant_data",
        data: {
            'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name)
        },
        success: function(response) {
            // convert json parse
            var json_parse = JSON.parse(response);

            // update content
            jQuery('#book_now_modal .cart_item_content').html(json_parse.html_content);

            // init calendar picker
            init_calendar_picker('#cart_book_calendar_picker', json_parse.booking_date, '.select_book_now_date');
        }
    });
});

/**
 * on checkout confirm email
 */
jQuery(document.body).on('keyup', '.payment_section #user_email_address', function() {
    // get email value
    var user_email = jQuery(this).val();

    // check email is valid
    if(user_email) {
        // update confirm email message
        jQuery('.checkout_confirm_email_section').show().html('<i>* Confirmation will sent on “' + user_email + '”</i>');
    } else {
        // hide confirm email message
        jQuery('.checkout_confirm_email_section').hide().html('');
    }
});

/**
 * init calendar picker
 */
function init_calendar_picker(calendar_class, booking_date, hidden_input_field)
{
    function selectCalendarDate(date) {
        jQuery(calendar_class).updateCalendarOptions({
            date: date
        });

        var dateOb = new Date(date).toLocaleDateString();
        jQuery(hidden_input_field).val(dateOb);
    }

    // init calendar
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate());

    // set options
    var defaultConfig = {
        weekDayLength: 1,
        dateFormat: 'Y-m-d',
        date: jQuery(hidden_input_field).val(),
        onClickDate: selectCalendarDate,
        showYearDropdown: true,
        showTodayButton:false,
        formatDate:function(day) {
            return day.getDate();
        }
    };

    // define calendar
    jQuery(calendar_class).calendar(defaultConfig); 
}