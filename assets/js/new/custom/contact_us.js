jQuery(document).ready(function() {
    /**
     * find contact field value field
     */
    function contact_field_value_find(element_name, type = 'value')
    {
        // define blank value
        var element_val = '';

        // fetch input field
        jQuery(element_name).each(function(index) {
            // get value
            if(type == 'value') {
                var value = jQuery(this).val();
            } else if(type == 'text') {
                var value = jQuery(this).text();
            } else if(type == 'title') {
                var value = jQuery(this).attr('title');
            }

            // check and update value
            if(element_val == '' && value != '') {
                element_val = value;
            }
        });

        // return response
        return element_val;
    }

    /**
     * find contact country field value
     */
    function country_field_value_find(element_name)
    {
        // define blank value
        var element_val = '';

        // get field length
        var field_length = jQuery('.form_1_contact .iti__selected-dial-code').length;
        field_length = field_length - 1;

        // fetch input field
        jQuery(element_name).each(function(index) {
            if(index == field_length) {
                element_val = jQuery(this).text();
            }
        });

        // return response
        return element_val;
    }

    /**
     * on submit sales contact form
     */
    jQuery(document.body).on('click', '.submit_sales_contact_form', function(e) {
        e.preventDefault();

        // hide error
        jQuery('.sales_form .form_error').hide();

        // get requested data
        var form_type    = 'sales';
        var first_name   = contact_field_value_find('.sales_form #first-name', 'value');
        var last_name    = contact_field_value_find('.sales_form #last-name', 'value');
        var work_email   = contact_field_value_find('.sales_form #work-email', 'value');
        var country_code = country_field_value_find('.form_1_contact .iti__selected-dial-code');
        var phone_number = contact_field_value_find('.sales_form #contact_number', 'value');
        var message      = contact_field_value_find('.sales_form #message', 'value');

        // check data is valid
        if(!first_name || !last_name || !work_email || !country_code || !phone_number || !message) {
            // show error
            jQuery('.sales_form .form_error').show().css('color', '#ff4c46').html('ERROR: * All fields are required.');
        } else if(phone_number.length <= 7 && phone_number >= 15) {
            // show error
            jQuery('.sales_form .form_error').show().css('color', '#ff4c46').html('ERROR: Please enter valid contact number.');
        } else {
            // show loader
            jQuery('.submit_sales_contact_form').html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Submit').attr('disabled', true).css('cursor', 'not-allowed');

            // submit form data
            jQuery.ajax({
                type: "POST",
                url: mds_config.base_url + "/contact_form_submit",
                data: {
                    'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
                    'form_type'     : form_type,
                    'first_name'    : first_name,
                    'last_name'     : last_name,
                    'work_email'    : work_email,
                    'country_code'  : country_code,
                    'phone_number'  : phone_number,
                    'message'       : message,
                },
                success: function(response) {
                    // check response
                    if(response) {
                        // reset form data
                        jQuery('.sales_form #first-name').val('');
                        jQuery('.sales_form #last-name').val('');
                        jQuery('.sales_form #work-email').val('');
                        jQuery('.sales_form #country_code').val('');
                        jQuery('.sales_form #phone-number').val('');
                        jQuery('.sales_form #message').val('');

                        // show success
                        jQuery('.sales_form .form_error').show().css('color', '#014962').html('Thanks! Your message has been sent successfully.');

                        // stop loader
                        jQuery('.submit_sales_contact_form').html('<i class="fa fa-check-circle"></i> &nbsp;Submit').attr('disabled', false).css('cursor', 'pointer');
                    }
                }
            });
        }
    });

    /**
     * on submit support contact form
     */
    jQuery('.submit_support_contact_form').click(function(e) {
        e.preventDefault();

        // hide error
        jQuery('.support_form .form_error').hide();

        // get requested data
        var form_type          = 'support';
        var booking_ref_number = contact_field_value_find('.support_form .support_booking_ref_number', 'value');
        var first_name         = contact_field_value_find('.support_form #first-name', 'value');
        var last_name          = contact_field_value_find('.support_form #last-name', 'value');
        var work_email         = contact_field_value_find('.support_form #work-email', 'value');
        var country_code       = country_field_value_find('.form_2_contact .iti__selected-dial-code');
        var phone_number       = contact_field_value_find('.support_form #contact_number', 'value');
        var message            = contact_field_value_find('.support_form #message', 'value');

        // submit support form
        submit_multiple_contact_form(form_type, first_name, last_name, work_email, country_code, phone_number, message, booking_ref_number);
    });

    /**
     * on submit register contact form
     */
    jQuery('.submit_register_contact_form').click(function(e) {
        e.preventDefault();

        // get requested data
        var form_type          = 'register';
        var booking_ref_number = contact_field_value_find('.register_form .register_booking_ref_number', 'value');
        var first_name         = contact_field_value_find('.register_form #first_name', 'value');
        var last_name          = contact_field_value_find('.register_form #last_name', 'value');
        var work_email         = contact_field_value_find('.register_form #work_email', 'value');
        var country_code       = country_field_value_find('.form_3_contact .iti__selected-dial-code');
        var phone_number       = contact_field_value_find('.register_form #contact_number', 'value');
        var message            = contact_field_value_find('.register_form #message', 'value');

        // submit register form
        submit_multiple_contact_form(form_type, first_name, last_name, work_email, country_code, phone_number, message, booking_ref_number);
    });

    /**
     * on submit feedback contact form
     */
    jQuery('.submit_feedback_contact_form').click(function(e) {
        e.preventDefault();

        // get requested data
        var form_type          = 'feedback';
        var booking_ref_number = contact_field_value_find('.feedback_form .feedback_booking_ref_number', 'value');
        var first_name         = contact_field_value_find('.feedback_form #first_name', 'value');
        var last_name          = contact_field_value_find('.feedback_form #last_name', 'value');
        var work_email         = contact_field_value_find('.feedback_form #work_email', 'value');
        var country_code       = country_field_value_find('.form_4_contact .iti__selected-dial-code');
        var phone_number       = contact_field_value_find('.feedback_form #contact_number', 'value');
        var message            = contact_field_value_find('.feedback_form #message', 'value');

        // submit feedback form
        submit_multiple_contact_form(form_type, first_name, last_name, work_email, country_code, phone_number, message, booking_ref_number);
    });

    /**
     * on submit report contact form
     */
    jQuery('.submit_report_contact_form').click(function(e) {
        e.preventDefault();

        // get requested data
        var form_type          = 'report';
        var booking_ref_number = contact_field_value_find('.report_form .report_booking_ref_number', 'value');
        var first_name         = contact_field_value_find('.report_form #first_name', 'value');
        var last_name          = contact_field_value_find('.report_form #last_name', 'value');
        var work_email         = contact_field_value_find('.report_form #work_email', 'value');
        var country_code       = country_field_value_find('.form_5_contact .iti__selected-dial-code');
        var phone_number       = contact_field_value_find('.report_form #contact_number', 'value');
        var message            = contact_field_value_find('.report_form #message', 'value');

        // submit report form
        submit_multiple_contact_form(form_type, first_name, last_name, work_email, country_code, phone_number, message, booking_ref_number);
    });

    /**
     * submit multiple contact form
     */
    function submit_multiple_contact_form(form_type, first_name, last_name, work_email, country_code, phone_number, message, booking_ref_number)
    {
        if(!booking_ref_number || !first_name || !last_name || !work_email || !country_code || !phone_number || !message) {
            // show error
            jQuery('.' + form_type + '_form .form_error').show().css('color', '#ff4c46').html('ERROR: * All fields are required.');
        } else if(phone_number.length <= 7 && phone_number >= 15) {
            // show error
            jQuery('.' + form_type + '_form .form_error').show().css('color', '#ff4c46').html('ERROR: Please enter valid contact number.');
        } else {
            // show loader
            jQuery('.submit_' + form_type + '_contact_form').html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Submit').attr('disabled', true).css('cursor', 'not-allowed');

            // submit form data
            jQuery.ajax({
                type: "POST",
                url : mds_config.base_url + "/contact_form_submit",
                data: {
                    'csrf_mds_token'    : jQuery.cookie(mds_config.csfr_cookie_name),
                    'form_type'         : form_type,
                    'first_name'        : first_name,
                    'last_name'         : last_name,
                    'work_email'        : work_email,
                    'country_code'      : country_code,
                    'phone_number'      : phone_number,
                    'message'           : message,
                    'booking_ref_number': booking_ref_number,
                },
                success: function(response) {
                    // json parse
                    var json_parse = JSON.parse(response);

                    // check response
                    if(json_parse.is_valid_customer) {
                        // reset form data
                        jQuery('.' + form_type + '_form .' + form_type + '_booking_ref_number').val('');
                        jQuery('.' + form_type + '_form #first-name').val('');
                        jQuery('.' + form_type + '_form #last-name').val('');
                        jQuery('.' + form_type + '_form #work-email').val('');
                        jQuery('.' + form_type + '_form #country_code').val('');
                        jQuery('.' + form_type + '_form #phone-number').val('');
                        jQuery('.' + form_type + '_form #message').val('');

                        // show success
                        jQuery('.' + form_type + '_form .form_error').show().css('color', '#014962').html('Thanks! Your message has been sent successfully.');

                        // hide error
                        jQuery('.' + form_type + '_form .is_ref_validation').empty();
                    } else {
                        // show error
                        jQuery('.' + form_type + '_form .form_error').show().css('color', '#ff4c46').html('ERROR: Booking Reference Number is not valid for this customer. Please check again.');
                    }

                    // stop loader
                    jQuery('.submit_' + form_type + '_contact_form').html('<i class="fa fa-check-circle"></i> &nbsp;Submit').attr('disabled', false).css('cursor', 'pointer');
                }
            });
        }
    }
});