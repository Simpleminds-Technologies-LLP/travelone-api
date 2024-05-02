/**
 * on click plan your trip
 */
jQuery(document).on('click', '.plan_your_trip_btn', function() {
	function selectDate(date) {
		jQuery('#calendarPickerTrip').updateCalendarOptions({
			date: date
		});
		jQuery('#calendarPicker').updateCalendarOptions({
			date: date
		});
		var dateOb = new Date(date).toLocaleDateString();
		jQuery('input[name=travel_date]').val(dateOb);
	}

	var currentDate = new Date();
	currentDate.setDate(currentDate.getDate());

	var defaultConfig = {
		weekDayLength   : 1,
		date            : currentDate,
		onClickDate     : selectDate,
		showYearDropdown: true,
		showTodayButton : false,
		disable: function (date) {
			return date < currentDate;
		},
		formatDate: function(day) {
			return day.getDate();
		}
	};

	jQuery('#calendarPicker').calendar(defaultConfig); 
	jQuery('#calendarPickerTrip').calendar(defaultConfig);
});

/* jquery step wizard form */
(function(jQuery) {
	'use strict'

	function selectDate(date) {
		jQuery('#calendarPickerTrip').updateCalendarOptions({
			date: date
		});
		jQuery('#calendarPicker').updateCalendarOptions({
			date: date
		});
		var dateOb = new Date(date).toLocaleDateString();
		jQuery('input[name=travel_date]').val(dateOb);
	}

	var currentDate = new Date();
	currentDate.setDate(currentDate.getDate());

	var defaultConfig = {
		weekDayLength   : 1,
		date            : currentDate,
		onClickDate     : selectDate,
		showYearDropdown: true,
		showTodayButton : false,
		disable: function (date) {
			return date < currentDate;
		},
		formatDate: function(day) {
			return day.getDate();
		}
	};

	jQuery('#calendarPicker').calendar(defaultConfig); 
	jQuery('#calendarPickerTrip').calendar(defaultConfig);

	// on change other experience validation
	jQuery('input[name=other_experience]').on('keyup', function() {
		if(jQuery(this).val()) {
			jQuery('#kindofexperience-error > label').hide();
		}
	});

	// plan your trip destination validation
	jQuery(document.body).on('click', '#planYourTripForm input[name="destinations[]"]', function() {
		// count destination
		var dest_selection = jQuery('#planYourTripForm input[name="destinations[]"]:checked');

		// define array
		var destination_ids = [];

		// fetch selected values
		jQuery(dest_selection).each(function() {
			destination_ids.push(this.value);
		});

		// check array length
		if(destination_ids.length) {
			// on click fetch theme data
			jQuery.ajax({
			    type: "POST",
			    url: mds_config.base_url + "fetch_theme_based_on_destination",
			    data: {
					'csrf_mds_token' : jQuery.cookie(mds_config.csfr_cookie_name),
					'destination_ids': destination_ids
				},
			    success: function(response) {
			    	// convert json to array
			    	var parse_json = JSON.parse(response);

			    	// define default value
			    	var html_content = '';

			    	// check array length
			    	if(parse_json.length) {
			    		// fetch themes
			    		for (var theme_key = 0; theme_key < parse_json.length; theme_key++) {
			    			// get single theme
			    			var single_theme = parse_json[theme_key];

			    			// update content
			    			html_content = html_content + '<li><a class="cursor"><label for="pyt_theme_' + single_theme.slug + '"><input type="checkbox" class="plan_your_trip_themes" name="themes[]" id="pyt_theme_' + single_theme.slug + '" value="' + single_theme.id + '" required=""><div class="lableinputsc">' + single_theme.name + '</div></label></a></li>';
			    		}
			    	}

			    	// check html content is valid
			    	if(html_content) {
			    		// replace content
			    		jQuery('.plan_your_trip_themes_box ul').html(html_content);
			    	}
			    }
			});
		}

		// check destination selection
		if(dest_selection.length > 5) {
			// show error
			jQuery('#destinationErrorPlace').html('<label id="destinations[]-error" class="error" for="destinations[]">* A maximum of 5 place may be chosen.</label>');
		} else {
			// hide error
			jQuery('#destinationErrorPlace').html('');
		}
	});

	// init plan your trip form
	var planYourTripForm = jQuery("#planYourTripForm");

	// modal validation
	planYourTripForm.validate({
		rules : {
			"prefer_travel[family][][value]": {
				required: function() {
					var _is_required =  false;
					if(jQuery('input[name="prefer_travel[type]"]:checked').val() == 'family') {
						_is_required =  true;
						jQuery('.family').each(function() {
							if(parseInt(jQuery(this).val()) > 0) {
								_is_required = false;
							}
						});
					}
					return _is_required;
				}
			},
			"user_email_address": {
				required: true,
				email   : true,
				remote  : {
					type: "GET",
					url : mds_config.base_url + 'check_valid_email',
					data: {
						'csrf_mds_token'    : jQuery.cookie(mds_config.csfr_cookie_name),
						'user_email_address': jQuery(this).val()
					}
				}
			},
			"themes[]" : {
				required: function() {
					return (jQuery.trim(jQuery('input[name=other_experience]').val()) == "") ? true : false;
				}
			}
		},
		errorPlacement: function errorPlacement(error, element) { 
			if (element.attr("name") == "destinations[]") {
				error.appendTo(jQuery('#destinationErrorPlace'));
			} else if (element.attr("name") == "themes[]") {
				error.appendTo(jQuery('#kindofexperience-error').show());
			} else if (element.attr("name") == "phone") {
				error.appendTo(jQuery('#phone-error'));
			} else {
				error.insertAfter(element);
			}
		},
		messages: {
			"destinations[]" : "* Please choose any places that you like!",
			"themes[]" : {
				required: "* Please choose any kind of experience you want to have!",
			},
			user_email_address: {
				required: "* Email address is not valid.",
				email   : "* Please enter a valid email address.",
				remote  : '* Email address is already being used, Please <a id="plan_my_trip_login_modal">login</a> & plan your trip.'
			}
		}
	});

	/**
	 * init plan your trip multi form
	 */
	jQuery('#formwizard').steps({
		showBackButton: true,
		onChange: function (currentIndex, newIndex, stepDirection) {
			if (stepDirection === 'forward') {
				// get is single page
				var is_single_page = jQuery('#single_page_tour_id').val();
				is_single_page = (is_single_page) ? true : false;

				// check first destination checkbox
				if(!is_single_page && currentIndex == 0) {
					// get destination selection
					var dest_selection = jQuery('#planYourTripForm input[name="destinations[]"]:checked').length;

					// check destination selection
					if(dest_selection > 5) {
						// show error
						jQuery('#destinationErrorPlace').html('<label id="destinations[]-error" class="error" for="destinations[]">* A maximum of 5 place may be chosen.</label>');
						return false;
					}
				}

				// check is single page
				if(is_single_page && currentIndex == 0) {
					var _tp = 0;
					if(jQuery('input[name="prefer_travel_type"]:checked').val() == "family") {
						jQuery('input.family_count').each(function(element, index) {
							var count_value = jQuery(this).val();
							_tp += (count_value) ? parseInt(count_value) : 0;
						});

						if(_tp == 0) {
							jQuery('#prefertravel-error').show();
							return false;
						} else if(_tp > 30) {
							jQuery('#prefertravelfamily-error').show();
							return false;
						} else {
							jQuery('#prefertravelfamily-error').hide();
							jQuery('#prefertravel-error').hide();
						}
					} else if(jQuery('input[name="prefer_travel_type"]:checked').val() == "group") {
						var _tp = 0;
						jQuery('input.group_count').each(function(element, index) {
							_tp += (jQuery(this).val()) ? parseInt(jQuery(this).val()) : 0;
						});

						if(_tp == 0) {
							jQuery('#prefertravel-error').show();
							return false;
						} else {
							jQuery('#prefertravel-error').hide();
						}
					}
				} else if(currentIndex == 1) {
					var _tp = 0;
					if(jQuery('input[name="prefer_travel_type"]:checked').val() == "family") {
						jQuery('input.family_count').each(function(element, index) {
							var count_value = jQuery(this).val();
							_tp += (count_value) ? parseInt(count_value) : 0;
						});

						if(_tp == 0) {
							jQuery('#prefertravel-error').show();
							return false;
						} else if(_tp > 30) {
							jQuery('#prefertravelfamily-error').show();
							return false;
						} else {
							jQuery('#prefertravelfamily-error').hide();
							jQuery('#prefertravel-error').hide();
						}
					} else if(jQuery('input[name="prefer_travel_type"]:checked').val() == "group") {
						var _tp = 0;
						jQuery('input.group_count').each(function(element, index) {
							_tp += (jQuery(this).val()) ? parseInt(jQuery(this).val()) : 0;
						});

						if(_tp == 0) {
							jQuery('#prefertravel-error').show();
							return false;
						} else {
							jQuery('#prefertravel-error').hide();
						}
					}
				}

				planYourTripForm.validate().settings.ignore = ":disabled,:hidden";
				return planYourTripForm.valid();
			}
			return true;
		},
		onFinish: function () {
			// perform AJAX
			jQuery.ajax({
				type    : "GET",
				url     : mds_config.base_url + "plan_my_trip_submit_inquiry",
				data    : planYourTripForm.serialize(),
				dataType: 'JSON',
				beforeSend: function() {
					// show loader
					jQuery('.submitfooterbtn').attr('disabled', true).html('Processing...');
				},
				success : function(response) {
					// get match count
					var matched_count       = response;
					var matched_count_refix = (matched_count == 1) ? ' Deal' : ' Deals';

					// update content
					jQuery('#planMyTripModal').addClass('firstCompleted');

					// check matched count
					if(matched_count > 0) {
						// change button text
						jQuery('.dealshead1 > a').html(matched_count + matched_count_refix);
						jQuery('.dealbutton > a').html('View ' + matched_count + matched_count_refix);
					} else {
						// change not found text
						jQuery('.dealshead1').html("Sorry, there aren't any tours available right now based on your search results. Soon, one of our experts will get in touch with you.");
						jQuery('.dealbutton').html('<a href="' + mds_config.base_url + '">Back to Home</a>');
					}
				},
				complete: function() {
					// active submit button
					jQuery('.submitfooterbtn').attr('disabled', false).html('Submitted');
				}
			});
		}
	});
})(jQuery);

/**
 * on click plan your trip reset themes
 */
jQuery('.plan_your_trip_reset_theme').click(function() {
	jQuery('.plan_your_trip_themes').prop('checked', false);
});

/**
 * on check plan your trip themes
 */
jQuery(document.body).on('change', '.plan_your_trip_themes', function() {
	// show error msg
	jQuery('#kindofexperience-error').hide().html('');

	// get is checked
	var is_checked = jQuery(this).is(':checked');
	var is_value   = jQuery(this).val();

	// check is checked
	if(is_checked) {
		// count total theme checked
		var is_count = jQuery(".plan_your_trip_themes:checked").length;

		// match allow count
		if(is_count <= 5) {
			// check checkbox
			jQuery(this).attr("checked", true);
		} else {
			// uncheck checkbox
			jQuery(this).attr("checked", false).prop('checked', false);

			// show error msg
			jQuery('#kindofexperience-error').show().html('<label id="themes[]-error" class="error">* A maximum of 5 experiences may be chosen.</label>');
		}
	}
});

/**
 * on key press filter phone number
 */
jQuery(document).ready(function () {
	jQuery('.PlanYourTripOffcanvas #phone').keypress(function (e) {
		var charCode = (e.which) ? e.which : event.keyCode;
		if (String.fromCharCode(charCode).match(/[^0-9]/g))
			return false;
	});
});

/**
 * on key press filter location name
 */
jQuery(document).ready(function () {
	jQuery('.PlanYourTripOffcanvas .locaInputfld').keypress(function (e) {
		var charCode = (e.which) ? e.which : event.keyCode;
		if (String.fromCharCode(charCode).match(/[^a-zA-Z0-9]/g))
			return false;
	});
});

/**
 * on click plan your trip set package ID
 */
jQuery('.plan_your_trip_btn').click(function() {
	set_tour_package_id();
});
jQuery('.listing-detail-page .tourboxesBtn2').click(function() {
	set_tour_package_id();
});

/**
 * set tour package ID in input field
 */
function set_tour_package_id()
{
	// get package ID
	var package_id = jQuery('input[name="tour_package_selection"]:checked').val();
	package_id = (package_id) ? package_id : 0;

	// set package ID
	jQuery('.PlanYourTripOffcanvas #is_single_package_id').val(package_id);
}

/**
 * plan your trip :: on click compare button
 **/
jQuery('.plan_my_trip_tours_page .btnCompareTours').click(function() {
    // remove error
    jQuery('.comparision_error .container').hide().html('');

    // fetch selected tours
    if(jQuery('.plan_my_trip_tours_page input[name="tours[]"]:checked').length > 1) {
        // define array
        var tourIds = [];

        // get select tour IDs
        jQuery('.plan_my_trip_tours_page input[name="tours[]"]:checked').each(function(index, element) {
            tourIds.push(jQuery(element).val());
        });

        // get button text
        var _btn_text = jQuery('.plan_my_trip_tours_page .btnCompareTours').html();

        // perform AJAX
        jQuery.ajax({
			type: "GET",
			url : mds_config.base_url + "plan_my_trip_inquiry_compare",
			data: {
				'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
				'tourIds'       : tourIds.toString()
            },
            dataType: 'JSON',
            beforeSend: function() {
            	// show loader
        		jQuery('.plan_my_trip_tours_page .btnCompareTours').attr('disabled', true).css('pointer', 'not-allowed').html('<i class="fa fa-spinner fa-spin"></i> ' + _btn_text);
            },
            success: function(response) {
                // check response status
                if(response.status) {
                	// update button text
                	jQuery('.plan_my_trip_tours_page .btnCompareTours').css('pointer', 'not-allowed').html('<i class="fa fa-check-circle"></i> ' + _btn_text);

                    // redirect to URL
                    window.location.href = response.redirect_url; 
                } else {
                    // show error msg
                    jQuery('.comparision_error .container').show().html('<div style="background: #ffeae9; padding: 12px 20px; border: 1px solid #ff4c46; font-weight: 600;"><i class="fa fa-exclamation-triangle"></i> Oops! We encountered an issue. Please try again later.</div>');

                    // auto scroll
        			jQuery(window).scrollTop(0);
                }
            }
        });
    } else {
        // show error msg
        jQuery('.comparision_error .container').show().html('<div style="background: #ffeae9; padding: 12px 20px; border: 1px solid #ff4c46; font-weight: 600;"><i class="fa fa-exclamation-triangle"></i> Please select at least two tours to proceed with the comparison.</div>');

        // auto scroll
        jQuery(window).scrollTop(0);
    }
});

/**
 * plan your trip :: on change compare tours
 **/
jQuery('.plan_my_trip_tours_page input[name="tours[]"]').change(function(e) {
    // remove error
    jQuery('.comparision_error .container').hide().html('');

    // max allow limit
    var allow_limit = 5;

    // define element
    var $this = jQuery(this);

    // get selected length
    var selected_tours = jQuery('.plan_my_trip_tours_page input[name="tours[]"]:checked').length;

    // check count is valid
    if(selected_tours > 1) {
        // check allow tours
        if(selected_tours <= allow_limit) {
            // get count prefix
            var count_prefix = (selected_tours == 1) ? 'tour' : 'tours';

            // update content
            jQuery('.plan_my_trip_tours_page .btnCompareTours').html('Compare ' + selected_tours + ' ' + count_prefix);
        } else {
            // update content
            $this.prop('checked', false);
            jQuery('.plan_my_trip_tours_page .btnCompareTours').html('Compare ' + allow_limit + ' tours');

            // show error msg
            jQuery('.comparision_error .container').show().html('<div style="background: #ffeae9; padding: 12px 20px; border: 1px solid #ff4c46; font-weight: 600;"><i class="fa fa-exclamation-triangle"></i> Oops! You can select up to ' + allow_limit + ' tours for comparison.</div>');

            // auto scroll
        	jQuery(window).scrollTop(0);
        }
    } else {
        // update button text
        jQuery('.plan_my_trip_tours_page .btnCompareTours').html('Compare');
    }
});

/**
 * plan your trip :: compare tours
 **/
jQuery('.listing_details_compare input[name="negotiate_packages[]"]').change(function(e) {
    // remove error
    jQuery('.comparision_error .container').hide().html('');

    // define max allow
    var allow_limit = 5;

    // define element
    var $this = jQuery(this);

    // get selected tour count
    var selected_tours = jQuery('input[name="negotiate_packages[]"]:checked').length;

    // check tour is selected
    if(selected_tours > 0) {
        // check allow limit
        if(selected_tours <= allow_limit) {
            // get selected tour prefix
            var count_prefix = (selected_tours == 1) ? 'tour' : 'tours';

            // update button text
            jQuery('.negoiate_button_right .negotiate_btn').html('Negotiate ' + selected_tours + ' ' + count_prefix);

            // remove class
            jQuery('.negoiate_button_right .negotiate_btn').removeClass('d-none');
        } else {
            $this.prop('checked', false);
            jQuery('.negoiate_button_right .negotiate_btn').html('Negotiate ' + allow_limit + ' tours');

            // remove class
            jQuery('.negoiate_button_right .negotiate_btn').removeClass('d-none');

            // show error msg
            jQuery('.comparision_error .container').show().html('<div style="background: #ffeae9; padding: 12px 20px; border: 1px solid #ff4c46; font-weight: 600;"><i class="fa fa-exclamation-triangle"></i> Oops! Maximun ' + allow_limit + ' packages allow to negotiate.</div>');

            // auto scroll
        	jQuery(window).scrollTop(0);
        }
    } else {
        // add class
        jQuery('.negoiate_button_right .negotiate_btn').addClass('d-none');
    }
});

/**
 * plan your trip :: on click negotiate save tours data
 **/
jQuery('.listing_details_compare .negoiate_button_right .negotiate_btn').click(function() {
    // remove error
    jQuery('.comparision_error .container').hide().html();

    // check selected tours length
    if(jQuery('input[name="negotiate_packages[]"]:checked').length > 0) {
        // define array
        var tourIds = [];

        // get selected tours and push in array
        jQuery('input[name="negotiate_packages[]"]:checked').each(function(index, ele) {
            tourIds.push(jQuery(ele).val());
        });

        // get original button text
        var _btn_text = jQuery('.negoiate_button_right .negotiate_btn').html();

        // perform AJAX
        jQuery.ajax({
            type: "GET",
            url : mds_config.base_url + "plan_my_trip_inquiry_neotiate",
            data: {
                tourIds: tourIds.toString()
            },
            dataType: 'JSON',
            beforeSend: function() {
            	// show loader
        		jQuery('.negoiate_button_right .negotiate_btn').attr('disabled', true).css('pointer', 'not-allowed').html('<i class="fa fa-spinner fa-spin"></i> ' + _btn_text);
            },
            success: function(response) {
                // check response status
                if(response.status) {
                    // show success msg
                    jQuery('.comparision_error .container').show().html('<div style="background: #d3f1d2; padding: 12px 20px; border: 1px solid #20c593; font-weight: 600;"><i class="fa fa-check-circle"></i> ' + response.message + '</div>');

                    // redirect to home
                    window.location.href = response.redirect_url;
                } else {
                    // show error msg
                    jQuery('.comparision_error .container').show().html('<div style="background: #ffeae9; padding: 12px 20px; border: 1px solid #ff4c46; font-weight: 600;"><i class="fa fa-exclamation-triangle"></i> ' + response.message + '</div>');
                }

                // auto scroll
        		jQuery(window).scrollTop(0);
            },
            complete: function() {
            	// update button text
                jQuery('.negoiate_button_right .negotiate_btn').attr('disabled', false).css('pointer', 'not-allowed').html('<i class="fa fa-check-circle"></i> ' + _btn_text);
            }
        });
    } else {
        // show error msg
        jQuery('.comparision_error .container').show().html('<div style="background: #ffeae9; padding: 12px 20px; border: 1px solid #ff4c46; font-weight: 600;"><i class="fa fa-exclamation-triangle"></i> Oops! Please select at least one package.</div>');

        // auto scroll
        jQuery(window).scrollTop(0);
    }
});

/**
 * plan your trip :: on change sort by filter
 **/
jQuery('.plan_my_trip_tours_page .plan_my_trip_sort_by').change(function(e) {
	// show loader
	jQuery('.plan_your_trip_loader').show();

    // get sort filter name
    var sort_filter = jQuery('.plan_my_trip_tours_page .plan_my_trip_sort_by:checked').val();

    // perform AJAX
    jQuery.ajax({
        type: "GET",
        url : mds_config.base_url + "plan-my-trip/tours/soty_by",
        data: {
            'sort_by': sort_filter
        },
        success: function(response) {
        	// hide loader
			jQuery('.plan_your_trip_loader').hide();

        	// update content
            jQuery('.planmytrip').html(response);

            // init slick slider content
            init_slick_slider_content('.imageSlider');
        }
    });
});