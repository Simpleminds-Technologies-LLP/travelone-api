(function(jQuery) {
	jQuery(document).on('click', '.addWhyRow', function(e){
    	e.preventDefault();
    	var i = (jQuery('.why_choose_data > tbody > tr').length) ? jQuery('.why_choose_data > tbody > tr').length : 0;
		var _new_row = '<tr role="row">'+
	        '<td class="text-left">'+
	            '<div class="d-flex align-items-center column-gap-15">'+
	            '<input type="file" name="why_choose_us_box['+i+'][image]" accept=".png, .jpg, .jpeg, .gif" required>'+
	            '</div>'+
	        '</td>'+
	        '<td class="text-left">'+
	            '<input type="text" class="form-control" name="why_choose_us_box['+i+'][title]" placeholder="Title" required>'+
	        '</td>'+
	        '<td class="text-left">'+
	            '<textarea class="form-control" name="why_choose_us_box['+i+'][description]" rows="1" autocomplete="off" placeholder="Description" required></textarea>'+
	        '</td>'+
	        '<td class="align-middle text-center">'+
	            '<button class="btn btn-danger deleteWhyRow" type="button"><i class="fa fa-trash"></i></button>'+
	        '</td>'+
	    '</tr>';
	    jQuery('.why_choose_data > tbody').append(_new_row);
    });

    jQuery(document).on('click', '.deleteWhyRow', function(e) {
    	e.preventDefault();
    	jQuery(this).parents('tr').remove();
    });
})(jQuery);

/**
 * get country by destination
 */
function get_country_by_destination(dest_id)
{
	var data = {
        "destination_id": dest_id
    };
    data[csfr_token_name] = jQuery.cookie(csfr_cookie_name);
    jQuery.ajax({
        type: "POST",
        url: base_url + "ajax_controller/get_country_by_destination",
        data: data,
        success: function (response) {
        	jQuery(".select_country").html(response);
        }
    });
}

/**
 * select agent type for commission field
 */
jQuery('#shop_opening_request_agent_type').on('change', function() {
	// reset notice
	jQuery('.error_notice').empty();

	// get selected agent type
	var agent_type = jQuery(this).val();

	// check data is valid
	if(agent_type) {
		// show loader
		jQuery('.selected_agent_type_commission_field .html_content').html('<div style="text-align: center; padding: 50px; border: 1px solid #F5F5F5"><img src="' + base_url + 'assets/img/svg/generate_elements.svg" style="height: 110px"><br><br><span style="font-size: 16px"><i class="fa fa-spinner fa-spin"></i> &nbsp;Fetching commission rate...</span></div>');

		// perform AJAX
		jQuery.ajax({
	        type: "GET",
	        url: base_url + "admin/shop-opening-request-generate-commission-field",
	        data: {
				'csfr_token_name': jQuery.cookie(csfr_cookie_name),
				'agent_type'     : agent_type,
	        },
	        success: function(response) {
	        	// check response is valid
	        	if(response) {
	        		// update element
	        		jQuery('.selected_agent_type_commission_field .html_content').html(response);
	        	} else {
	        		// show not found content
	        		jQuery('.selected_agent_type_commission_field .html_content').html('<div style="text-align: center; padding: 50px; border: 1px solid #F5F5F5"><img src="' + base_url + 'assets/img/svg/not_found_content.svg" style="height: 140px"><br><br><span style="font-size: 16px;"><i class="fa fa-remove"></i> Oops! Commission rate not found!</span></div>');
	        	}
	        }
	    });
	} else {
		// reset content
		jQuery('.selected_agent_type_commission_field .html_content').empty();
	}
});

/**
 * on click approve shop opening request
 */
jQuery('.approve_shop_request_btn').on('click', function() {
	// reset notice
	jQuery('.error_notice').empty();

	// get requested data
	var request_id      = jQuery(this).data('request_id');
	var request_user_id = jQuery(this).data('request_user_id');

	// check status is valid
	if(request_id && request_user_id) {
		// show loader
		jQuery(this).attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Approve');

		// get agent type ID
		var agent_type_id = jQuery('#shop_opening_request_agent_type').find(':selected').val();

		// get commission rate
		var commission_rate = fetch_selected_agent_commission_rate();

		// check commission rate is valid
		if(commission_rate.length) {
			// perform AJAX
			jQuery.ajax({
		        type: "GET",
		        url: base_url + "admin/shop-opening-request-approve-decline",
		        data: {
					'csfr_token_name': jQuery.cookie(csfr_cookie_name),
					'request_id'     : request_id,
					'request_user_id': request_user_id,
					'agent_type_id'  : agent_type_id,
					'commission_rate': JSON.stringify(commission_rate),
					'is_status'      : 1,
		        },
		        success: function(response) {
		        	// check response is valid
		        	if(response) {
		        		window.location.href = base_url + 'admin/shop-opening-requests';
		        	}
		        }
		    });
		} else {
			// show error
			jQuery('.error_notice').css('color', '#F00').html('<i class="fa fa-exclamation-triangle"></i> Please select commission rate for agent.');

			// reset button
			jQuery('.approve_shop_request_btn').attr('disabled', false).html('<i class="fa fa-check-circle"></i> &nbsp;Approve');
		}
	}
});

/**
 * on click decline shop opening request
 */
jQuery('.decline_shop_request_btn').on('click', function() {
	// reset notice
	jQuery('.error_notice').empty();

	// get requested data
	var request_id      = jQuery(this).data('request_id');
	var request_user_id = jQuery(this).data('request_user_id');

	// check status is valid
	if(request_id && request_user_id) {
		// show loader
		jQuery(this).attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Decline');

		// perform AJAX
		jQuery.ajax({
	        type: "POST",
	        url: base_url + "ajax_controller/shop_opening_request_approve_decline",
	        data: {
				'csfr_token_name': jQuery.cookie(csfr_cookie_name),
				'request_id'     : request_id,
				'request_user_id': request_user_id,
				'is_status'      : 0,
	        },
	        success: function(response) {
	        	// check response is valid
	        	if(response) {
	        		window.location.href = base_url + 'admin/shop-opening-requests';
	        	}
	        }
	    });
	}
});

/**
 * on click save edit commission rate
 */
jQuery('.edit_save_agent_commission_rate').on('click', function() {
	// reset notice
	jQuery('.error_notice').empty();

	// get requested data
	var agent_id = jQuery(this).data('agent_id');

	// check status is valid
	if(agent_id) {
		// show loader
		jQuery(this).attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Save Changes');

		// get commission rate
		var commission_rate = fetch_selected_agent_commission_rate();

		// check commission rate is valid
		if(commission_rate.length) {
			// perform AJAX
			jQuery.ajax({
		        type: "GET",
		        url: base_url + "admin/edit-save-agent-commission-rate",
		        data: {
					'csfr_token_name': jQuery.cookie(csfr_cookie_name),
					'agent_id'       : agent_id,
					'commission_rate': JSON.stringify(commission_rate),
		        },
		        success: function(response) {
		        	console.log(response);
		        	// check response
		        	if(response) {
		        		// show alter
		        		alert('Success! Commission has been update successfully.');

			        	// reload page
			        	location.reload();
		        	}
		        }
		    });
		} else {
			// show error
			jQuery('.error_notice').css('color', '#F00').html('Oops! The commission rate field value is not valid. Please check.');

			// reset button
			jQuery('.approve_shop_request_btn').attr('disabled', false).html('<i class="fa fa-check-circle"></i> &nbsp;Save Changes');
		}
	}
});

/**
 * fetch selected agent commission rate
 */
function fetch_selected_agent_commission_rate()
{
	// define array
	var commission_rate = [];

	// get percentage input field
	var percentage_field_1 = jQuery('#b2b_business_comm_to_travelone_percent').val();
	var percentage_field_2 = jQuery('#b2c_business_comm_to_travelone_percent').val();
	var percentage_field_3 = jQuery('#comm_on_pre_package_itinerary_booking_percent').val();
	var percentage_field_4 = jQuery('#comm_on_accommodation_booking_percent').val();
	var percentage_field_5 = jQuery('#comm_on_sightseeig_acitvities_trans_meal_booking_percent').val();
	var percentage_field_6 = jQuery('#comm_on_airline_booking_percent').val();
	var percentage_field_7 = jQuery('#comm_on_cruise_itinerary_booking_percent').val();

	// get effective date input field
	var date_field_1 = jQuery('#b2b_business_comm_to_travelone_date').val();
	var date_field_2 = jQuery('#b2c_business_comm_to_travelone_date').val();
	var date_field_3 = jQuery('#comm_on_pre_package_itinerary_booking_date').val();
	var date_field_4 = jQuery('#comm_on_accommodation_booking_date').val();
	var date_field_5 = jQuery('#comm_on_sightseeig_acitvities_trans_meal_booking_date').val();
	var date_field_6 = jQuery('#comm_on_airline_booking_date').val();
	var date_field_7 = jQuery('#comm_on_cruise_itinerary_booking_date').val();

	// check field value is valid
	if(percentage_field_1 && percentage_field_2 && percentage_field_3 && percentage_field_4 && percentage_field_5 && percentage_field_6 && percentage_field_7 && date_field_1 && date_field_2 && date_field_3 && date_field_4 && date_field_5 && date_field_6 && date_field_7) {
		// create array
		var new_item_1 = ['b2b_business_comm_to_travelone', Number(percentage_field_1), date_field_1];
		var new_item_2 = ['b2c_business_comm_to_travelone', Number(percentage_field_2), date_field_2];
		var new_item_3 = ['comm_on_pre_package_itinerary_booking', Number(percentage_field_3), date_field_3];
		var new_item_4 = ['comm_on_accommodation_booking', Number(percentage_field_4), date_field_4];
		var new_item_5 = ['comm_on_sightseeig_acitvities_trans_meal_booking', Number(percentage_field_5), date_field_5];
		var new_item_6 = ['comm_on_airline_booking', Number(percentage_field_6), date_field_6];
		var new_item_7 = ['comm_on_cruise_itinerary_booking', Number(percentage_field_7), date_field_7];

		// push data in response
		commission_rate.push(new_item_1);
		commission_rate.push(new_item_2);
		commission_rate.push(new_item_3);
		commission_rate.push(new_item_4);
		commission_rate.push(new_item_5);
		commission_rate.push(new_item_6);
		commission_rate.push(new_item_7);
	}

	// return response
	return commission_rate;
}

/**
 * on change tour banner destination change
 */
jQuery('.banner_form .banner_destination').change(function() {
	// get destination ID
	var destination_id = jQuery('option:selected', this).val(); 

	// check destination ID is valid
	if(destination_id) {
		// reset content
		jQuery('.banner_form .banner_country').html('<option value="">** Select Country **</option>');
		jQuery('.banner_form .banner_city').html('<option value="">** Select City **</option>');

		// fetch country base on destination
		jQuery.ajax({
			type: "GET",
			url : base_url + "admin/filter_country_by_dest",
			data: {
				'csfr_token_name': jQuery.cookie(csfr_cookie_name),
				'destination_id' : destination_id,
				'show_all'       : 1
			},
			success: function(response) {
				// update content
				jQuery('.banner_form .banner_country').html('<option value="">** Select Country **</option>' + response);
			}
		});
	} else {
		// update content
		jQuery('.banner_form .banner_country').html('<option value="">** Select Country **</option>');
		jQuery('.banner_form .banner_city').html('<option value="">** Select City **</option>');
	}
});

/**
 * on change tour banner country change
 */
jQuery('.banner_form .banner_country').change(function() {
	// get country ID
	var country_id = jQuery('option:selected', this).val(); 

	// check country ID is valid
	if(country_id) {
		// fetch country base on country
		jQuery.ajax({
			type: "GET",
			url : base_url + "admin/get_city_by_country",
			data: {
				'csfr_token_name': jQuery.cookie(csfr_cookie_name),
				'country_id'     : country_id,
				'show_all'       : 1
			},
			success: function(response) {
				// update content
				jQuery('.banner_form .banner_city').html('<option value="">** Select City **</option>' + response);
			}
		});
	} else {
		// update content
		jQuery('.banner_form .banner_city').html('<option value="">** Select City **</option>');
	}
});

/**
 * on change blog destination change
 */
jQuery('.blog_location_form .blog_destination').change(function() {
	// get destination ID
	var destination_id = jQuery('option:selected', this).val(); 

	// check destination ID is valid
	if(destination_id) {
		// reset content
		jQuery('.blog_location_form .blog_country').html('<option value="">** Select Country **</option>');
		jQuery('.blog_location_form .blog_city').html('<option value="">** Select City **</option>');

		// fetch country base on destination
		jQuery.ajax({
			type: "GET",
			url : base_url + "admin/filter_country_by_dest",
			data: {
				'csfr_token_name': jQuery.cookie(csfr_cookie_name),
				'destination_id' : destination_id,
				'filter_by'      : 'name',
				'show_all'       : 1
			},
			success: function(response) {
				// update content
				jQuery('.blog_location_form .blog_country').html('<option value="">** Select Country **</option>' + response);
			}
		});
	} else {
		// update content
		jQuery('.blog_location_form .blog_country').html('<option value="">** Select Country **</option>');
		jQuery('.blog_location_form .blog_city').html('<option value="">** Select City **</option>');
	}
});

/**
 * on change tour banner country change
 */
jQuery('.blog_location_form .blog_country').change(function() {
	// get country ID
	var country_id = jQuery('option:selected', this).val(); 

	// check country ID is valid
	if(country_id) {
		// fetch country base on country
		jQuery.ajax({
			type: "GET",
			url : base_url + "admin/get_city_by_country",
			data: {
				'csfr_token_name': jQuery.cookie(csfr_cookie_name),
				'country_id'     : country_id,
				'filter_by'      : 'name',
				'show_all'       : 1
			},
			success: function(response) {
				// update content
				jQuery('.blog_location_form .blog_city').html('<option value="">** Select City **</option>' + response);
			}
		});
	} else {
		// update content
		jQuery('.blog_location_form .blog_city').html('<option value="">** Select City **</option>');
	}
});

/**
 * add new banner new question
 */
jQuery(document.body).on('click', '.banner_form .add_banner_new_question', function() {
    // get question count
	var total_question = jQuery('.banner_form .banner_question_section .banner_question_field').length;
	var next_question  = total_question + 1;

	// prepare html
	var html_content = '<div class="col-md-12 col-lg-12 banner_question_field banner_question_field_' + next_question + '"><input type="hidden" name="question_' + next_question + '_total_answer" class="question_' + next_question + '_total_answer" value="1"><div class="box box-primary"><div class="box-header with-border"><div class="left"><h3 class="box-title"><b>Question ' + next_question + '</b></h3></div><div class="right"><button type="button" class="btn btn-sm btn-primary add_answer_field_btn" data-question_no="' + next_question + '"><i class="fa fa-plus"></i> &nbsp;Add new Answer</button>&nbsp;<button type="button" class="btn btn-sm btn-danger remove_banner_question_field" data-question_no="' + next_question + '"><i class="fa fa-trash"></i></button></div></div><div class="box-body"><div class="row"><div class="col-md-8"><div class="form-group"><label class="control-label">Question title *</label><input type="text" autocomplete="off" name="question_' + next_question + '_title" placeholder="Question title" class="form-control" required></div></div><div class="col-md-4"><div class="form-group"><label class="control-label">Filter Type *</label><select name="question_' + next_question + '_filter_type" class="form-control"><option value="">** Select filter type **</option><option value="theme">Theme</option><option value="hotel_tag">Hotel (Tag)</option><option value="sightseeing_tag">Sightseeing (Tag)</option><option value="traveler_persona">Traveler Persona</option><option value="tours_tags">Tours Tags</option><option value="transportation_tag">Transportation (Tag)</option><option value="meal_tag">Meal (Tag)</option><option value="cities_tag">Cities (Tag)</option></select></div></div></div><hr><div class="question_answer_field"><div class="form-group question_answer question_answer_1"><label class="control-label">Enter Answer</label><input type="text" autocomplete="off" name="question_' + next_question + '_answer_1" placeholder="Enter Answer" class="form-control" required></div></div></div></div></div>';

	// append content
	jQuery('.banner_form .banner_question_section').append(html_content);

	// update count
	update_total_question_no();
});

/**
 * add new banner answer
 */
jQuery(document.body).on('click', '.banner_form .banner_question_section .add_answer_field_btn', function() {
    // get question no
    var question_no = jQuery(this).data('question_no');

    // get answer count
	var total_answer = jQuery('.banner_form .banner_question_section .banner_question_field_' + question_no + ' .question_answer_field .question_answer').length;
	var next_answer  = total_answer + 1;

	// prepare html
	var html_content = '<div class="question_answer question_answer_' + next_answer + '"><div class="row"><div class="col-md-11"><div class="form-group"><label class="control-label">Enter Answer</label><input type="text" autocomplete="off" name="question_' + question_no + '_answer_' + next_answer + '" placeholder="Enter Answer" class="form-control" required></div></div><div class="col-md-1"><div class="form-group"><label class="control-label">Delete</label><button type="button" class="btn btn-danger remove_banner_answer_field" data-question_no="' + question_no + '" data-answer_no="' + next_answer + '"><i class="fa fa-trash"></i></button></div></div></div></div>';

	// append content
	jQuery('.banner_form .banner_question_section .banner_question_field_' + question_no + ' .question_answer_field').append(html_content);

	// update count
	update_total_answer_no(question_no);
});

/**
 * remove banner question
 */
jQuery(document.body).on('click', '.banner_form .remove_banner_question_field', function() {
	// get question no
	var question_no = jQuery(this).data('question_no');

    // append content
	jQuery('.banner_form .banner_question_section .banner_question_field_' + question_no).remove();

	// get current count
	var current_count = jQuery('.total_question_no').val();

	// update count
	jQuery('.total_question_no').val(current_count - 1);

	// update count
	update_total_answer_no(question_no);
});

/**
 * remove banner answer
 */
jQuery(document.body).on('click', '.banner_form .remove_banner_answer_field', function() {
	// get question no
	var question_no = jQuery(this).data('question_no');
	var answer_no   = jQuery(this).data('answer_no');

	// get current count
	var current_count = jQuery('.question_' + question_no + '_total_answer').val();

	// update count
	jQuery('.question_' + question_no + '_total_answer').val(current_count - 1);

    // append content
	jQuery('.banner_form .banner_question_section .banner_question_field_' + question_no + ' .question_answer_' + answer_no).remove();
});

// update total question no
function update_total_question_no()
{
	// get total question
	var total_question = jQuery('.banner_form .banner_question_section .banner_question_field').length;

	// update value
	jQuery('.banner_form .total_question_no').val(total_question);
}

// update total answer no
function update_total_answer_no(question_no)
{
	// get answer count
	var total_answer = jQuery('.banner_form .banner_question_section .banner_question_field_' + question_no + ' .question_answer_field .question_answer').length;

	// update value
	jQuery('.banner_form .banner_question_field_' + question_no + ' .question_' + question_no + '_total_answer').val(total_answer);
}

/**
 * on change fetch user support countries base on destination
 */
jQuery('.user_support_destination').change(function() {
	// get destination ID
	var destination_ids = jQuery('option:selected', this).toArray().map(item => item.value).join();

	// check destination ID is valid
	if(destination_ids) {
		// fetch destination base on destination
		jQuery.ajax({
			type: "GET",
			url : base_url + "admin/get_multi_destination_by_country",
			data: {
				'csfr_token_name': jQuery.cookie(csfr_cookie_name),
				'key'            : destination_ids
			},
			success: function(response) {
				// check response
				if(response) {
					// update content
					jQuery('.user_support_countries').show();
					jQuery('.user_support_countries select').html(response);
				}
			}
		});
	}
});

/**
 * import blog process
 */
jQuery(document).ready(function() {
	jQuery('#bulk-blog-upload-form').on('submit', function(e) {
        e.preventDefault();
        
        // set form data
        var formData = new FormData();
        var fileInput = jQuery('#bulk-blog-upload-form #csv_import_file')[0];

        // check file length
        if (fileInput.files.length > 0) {
            // show loader
            jQuery('.form_error').hide();
            jQuery('#bulk-blog-upload-form button').attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i>&nbsp; Importing...');

        	// append data in array
            formData.append('file', fileInput.files[0]);
            formData.append('csrf_mds_token', jQuery.cookie(csfr_cookie_name));

            // call ajax
            jQuery.ajax({
				url        : base_url + "import-blog-csv-process",
				type       : 'POST',
				data       : formData,
				processData: false,
				contentType: false,
                success: function(response) {
                    // show msg
                    jQuery('.form_error').show();
	        		jQuery('.form_error span').html(response);

                    // stop loader
                    jQuery('#bulk-blog-upload-form button').attr('disabled', false).html('<i class="fa fa-check-circle"></i>&nbsp; Start Process');
                },
                error: function(error) {
                    // show msg
                    jQuery('.form_error').show();
	        		jQuery('.form_error span').html('ERROR: Upload failed. Please attempt the upload again.');
                }
            });
        } else {
            // show msg
            jQuery('.form_error').show();
			jQuery('.form_error span').html('ERROR: Please select valid import file.');
        }
    });
});

// admin - on choose destination id change countries
jQuery('#admin_event_destination_id').on('change', function() {
	// get selected destination id
	var destination_id = jQuery(this).val();

	// blank values
	jQuery('.b2c_event_country').hide();

	// perform AJAX
	jQuery.ajax({
        type: "GET",
        url: base_url + "events/fetch_countries",
        data: {
			"destination_id": destination_id
        },
        success: function(response) {
        	if(response) {
        		// embed html
        		jQuery('.b2c_event_country').show();
        		jQuery('.b2c_event_country #admin_event_countries').html(response);
        	}
        }
    });
});