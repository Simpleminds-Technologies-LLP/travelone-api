// on choose destination id change countries
jQuery('.b2c_event_audience_form #destination').on('change', function() {
	// get selected destination id
	var destination_id = jQuery(this).val();

	// blank values
	jQuery('.b2c_event_country_cities_box').hide();
	jQuery('.b2c_event_country').hide();
	jQuery('.b2c_event_cities').hide();
	jQuery('.b2c_event_audience_form #countries').html('');
	jQuery('.b2c_event_audience_form #cities').html('');

	// perform AJAX
	jQuery.ajax({
        type: "GET",
        url: mds_config.base_url + "events/fetch_event_countries",
        data: {
			"destination_id": destination_id
        },
        success: function(response) {
        	if(response) {
        		// embed html
        		jQuery('.b2c_event_country_cities_box').show();
        		jQuery('.b2c_event_country').show();
        		jQuery('.b2c_event_audience_form #countries').html(response);
        	}
        }
    });
});

/**
 * on choose countries id chnage cities
 */
jQuery('.b2c_event_audience_form #countries').on('change', function() {
	// get selected country id
	var country_id = jQuery(this).val();

	// blank values
	jQuery('.b2c_event_cities').hide();
	jQuery('.b2c_event_audience_form #cities').html('');

	// perform AJAX
	jQuery.ajax({
        type: "GET",
        url: mds_config.base_url + "events/fetch_cities",
        data: {
			"country_id": country_id
        },
        success: function(response) {
        	if(response) {
        		// embed html
        		jQuery('.b2c_event_country_cities_box').show();
        		jQuery('.b2c_event_cities').show();
        		jQuery('.b2c_event_audience_form #cities').html(response);
        	}
        }
    });
});

/**
 * on choose countries id chnage cities
 */
jQuery(document.body).on('click', '.b2c_event_audience_form .submit_b2c_event_form', function() {
	// get form data
	var full_name         = jQuery('.b2c_event_audience_form #full_name').val();
	var email             = jQuery('.b2c_event_audience_form #email').val();
	var country_code      = jQuery('.b2c_event_audience_form .iti__selected-dial-code').text();
	var contact_number    = jQuery('.b2c_event_audience_form #contact_number').val();
	var country_attach_id = jQuery('.b2c_event_audience_form #country_attach_id :selected').val();
	var interest_area     = jQuery('.b2c_event_audience_form #interest_area :selected').val();
	var event_name        = jQuery('.b2c_event_audience_form #event_name :selected').val();
	var travel_month      = jQuery('.b2c_event_audience_form #travel_month :selected').val();

	// check is valid values
	if(full_name && email && country_code && contact_number && country_attach_id && interest_area && travel_month) {
		// perform AJAX
		jQuery.ajax({
	        type: "POST",
	        url: mds_config.base_url + "events/form_submit",
	        data: {
				"csrf_mds_token"   : jQuery.cookie(mds_config.csfr_cookie_name),
				"full_name"        : full_name,
				"email"            : email,
				"country_code"     : (country_code) ? country_code : '+1',
				"contact_number"   : contact_number,
				"country_attach_id": country_attach_id,
				"interest_area"    : interest_area,
				"event_name"       : event_name,
				"travel_month"     : travel_month
	        },
	        beforeSend: function() {
	        	// show loader
        		jQuery('.submit_b2c_event_form').html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Submit').attr('disabled', true).css('cursor', 'not-allowed');
	        },
	        success: function(response) {
	        	// convert json to array
	        	var json_parse = JSON.parse(response);

	        	// check response status
	        	if(json_parse.status) {
	        		// reset form data
                    jQuery('.b2c_event_audience_form #first-name').val('');

                    // show success
                    jQuery('.b2c_event_audience_form .form_error').show().css('color', '#014962').html('Thank you! Your form has been successfully submitted.');

                    // update link
                    jQuery('.explore_event_form_btn a').attr('href', json_parse.attach_link);
                    jQuery('.explore_event_form_btn a').text(json_parse.button_title);

                    // replace explore word
                    var country_package_name = (json_parse.button_title).replace('Explore ', '');

                    // update text
                    jQuery('.b2c_event_audience_form .form-label').html("We've received your interest and our team is crafting personalized " + country_package_name + " just for you.<br>Keep an eye on your inbox for exciting offers and your 10% discount voucher!");

                    // show finish box
                    jQuery('.b2c_event_audience_form .form_data').hide();
                    jQuery('.b2c_event_audience_form .finish_box').show();
	        	} else {
	        		// show error
					jQuery('.b2c_event_audience_form .form_error').show().css('color', '#ff4c46').html('Oops! Something went wrong. Please try again later.');
	        	}

	        	// stop loader
                jQuery('.submit_b2c_event_form').html('<i class="fa fa-check-circle"></i> &nbsp;Submit').attr('disabled', false).css('cursor', 'pointer');
	        }
	    });
	} else {
		// show error
		jQuery('.b2c_event_audience_form .form_error').show().css('color', '#ff4c46').html('ERROR: * All fields are required.');
	}
});