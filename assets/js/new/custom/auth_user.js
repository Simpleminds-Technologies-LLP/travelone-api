/**
 * manual page auth login
 */
jQuery("#manual_login_submit").click(function() {
	// get data
	var user_email    = jQuery("#manual_login_form #user_email").val();
	var user_password = jQuery("#manual_login_form #user_password").val();
	var requested_url = window.location.href;

	// show loader
	jQuery("#manual_login_submit").prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Verifying your account...');

	// check data
	if(!user_email.length) {
		// show error msg
		jQuery("#manual_login_modal_error").show().html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Email address is not valid.");
		jQuery("#manual_login_submit").prop('disabled', false).html('Login');
	} else if(!user_password.length) {
		// show error msg
		jQuery("#manual_login_modal_error").show().html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Password is not valid.");
		jQuery("#manual_login_submit").prop('disabled', false).html('Login');
	} else {
		// apply ajax for login
		jQuery.ajax({
			type: "POST",
			url : mds_config.base_url + "login/manual_check",
			data: {
				'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
				'user_email'    : user_email,
				'user_password' : user_password,
			},
			success: function(response) {
				// convert json parse
				var json_parse = JSON.parse(response);

				// check response
				if(json_parse.status == 'invalid' || json_parse.status == 'error') {
					// show error msg
					jQuery("#manual_login_modal_error").show().html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Email address or password is not valid.");
				} else if(json_parse.status == 'not_active') {
					// show error msg
					jQuery("#manual_login_modal_error").show().html("<i class='fa fa-times'></i> &nbsp;Your account is not active. Please verify your account.");
				} else if(json_parse.status == 'is_banned') {
					// show error msg
					jQuery("#manual_login_modal_error").show().html("<i class='fa fa-ban'></i> &nbsp;Your account has been blocked. Please contact support team.");
				} else if(json_parse.status == 'not_found') {
					// show error msg
					jQuery("#manual_login_modal_error").show().html("<i class='fa fa-user-times'></i> &nbsp;This user does not exist in our system.");
				} else if(json_parse.status == 'valid') {
					// show success msg
					jQuery("#manual_login_modal_error").removeClass('alert-danger').addClass('alert-success').show().html("<i class='fa fa-check'></i> &nbsp;Login successfully.");

					// check specific redirect in homepage
					if(requested_url.indexOf("checkout/orders") != -1) {
						// redirect to page
						window.location.href = mds_config.base_url;
					} else {
						// redirect to page
						window.location.href = json_parse.redirect_path;
					}
				}

				// stop loader
				jQuery("#manual_login_submit").prop('disabled', false).html('Login');
			}
		});
	}
});

// on click login submit
jQuery("#login_submit").click(function() {
	auth_user_login();
});

// on enter login email
jQuery("#login_form #user_email").keypress(function(e) {
	var key = e.which;
	if(key == 13) {
		auth_user_login();
	}
});

// on enter login password
jQuery("#login_form #user_password").keypress(function(e) {
	var key = e.which;
	if(key == 13) {
		auth_user_login();
	}
});

// on click register submit
/*jQuery("#register_submit").click(function() {
	auth_user_register();
});*/

/**
 * auth user login
 */
function auth_user_login()
{
	// get data
	var user_email    = jQuery("#login_form #user_email").val();
	var user_password = jQuery("#login_form #user_password").val();
	var requested_url = window.location.href;

	// show loader
	jQuery("#login_submit").prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Verifying your account...');

	// check data
	if(!user_email.length) {
		// show error msg
		jQuery("#login_modal_error").show().html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Email address is not valid.");
		jQuery("#login_submit").prop('disabled', false).html('Login');
	} else if(!user_password.length) {
		// show error msg
		jQuery("#login_modal_error").show().html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Password is not valid.");
		jQuery("#login_submit").prop('disabled', false).html('Login');
	} else {
		// apply ajax for login
		jQuery.ajax({
			type: "POST",
			url : mds_config.base_url + "login/check",
			data: {
				'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
				'user_email'    : user_email,
				'user_password' : user_password,
			},
			success: function(response) {
				// check response
				if(response == 'invalid' || response == 'error') {
					// show error msg
					jQuery("#login_modal_error").show().html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Email address or password is not valid.");
				} else if(response == 'not_active') {
					// show error msg
					jQuery("#login_modal_error").show().html("<i class='fa fa-times'></i> &nbsp;Your account is not active. Please verify your account.");
				} else if(response == 'is_banned') {
					// show error msg
					jQuery("#login_modal_error").show().html("<i class='fa fa-ban'></i> &nbsp;Your account has been blocked. Please contact support team.");
				} else if(response == 'not_found') {
					// show error msg
					jQuery("#login_modal_error").show().html("<i class='fa fa-user-times'></i> &nbsp;This user does not exist in our system.");
				} else if(response == 'valid') {
					// show success msg
					jQuery("#login_modal_error").removeClass('alert-danger').addClass('alert-success').show().html("<i class='fa fa-check'></i> &nbsp;Login successfully.");

					// check specific redirect in homepage
					if(requested_url.indexOf("checkout/orders") >= 0) {
						// reload page
						setTimeout(function () {
							window.location.href = mds_config.base_url;
						}, 1000);
					} else {
						// reload page
						setTimeout(function () {
							location.reload();
						}, 1000);
					}
				}

				// stop loader
				jQuery("#login_submit").prop('disabled', false).html('Login');
			}
		});
	}
}

/**
 * auth user register
 */

(function($){
    'use strict'

    $(document).ready(function()
    {

    	jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
	        phone_number = phone_number.replace(/\s+/g, "");
	        return this.optional(element) || phone_number.length > 5 && phone_number.length < 11;
	    }, "*Please enter a valid phone number");

	    jQuery.validator.addMethod("noSpace", function(value, element) { 
	      return value.indexOf(" ") < 0 && value != ""; 
	    }, "*Space is not allow");

	    $.validator.addMethod("noCaps", function(value, element) {
	      return this.optional(element) || !/[A-Z]{1}/.test(value); 
	    }, "*Only lower case letters allow.");

        $('#register_form').validate({
            rules: {
                user_username: {
                    required: true,
	                noSpace: true,
	                noCaps: true,
	                /*remote: {
	                    url: mds_config.base_url + "ajax_controller/checkUserNameIsExists",
	                    type: "post",
	                    data: {
							'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name)
						}
	                }*/
                },
                user_first_name: {
                    required: true
                },
                user_last_name: {
                    required: true
                },
                user_email_address: {
                    required: true,
                    email: true,
                    /*remote: {
	                    type: "POST",
	                    url: mds_config.base_url + "login/email_is_exists",
	                    data: {
							'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name)
						}
	                }*/ 
                },
                user_password: {
                    required: true,
                    minlength: 8,
                },
                user_confirm_password: {
                    required: true,
                    equalTo: "#user_reister_password"
                }
            },
            messages:
            {
                user_username: {
                    required: "*Username is not valid.",
	                remote: "*Username is already being used"
                },
                user_first_name: {
                    required: "First name is not valid."
                },
                user_last_name: {
                    required: "Last name is not valid."
                },
                user_email_address: {
                    required: "Email address is not valid.",
                    email: "Please enter a valid email address.",
                    remote: "*Email address is already being used"
                },
                user_password: {
                    required: "Password is not valid.",
                    minlength: "Password must be at least 8 characters long."
                },
                user_confirm_password: {
                    required: "Confirm password is not valid.",
                    equalTo: "Confirm password does not match."
                }
            }
        });

        $('#register_form').on('submit', function(e){
        	e.preventDefault();
        	var form = $(this);
        	if($('#register_form').valid()){
	    		jQuery.ajax({
			        type: "POST",
			        url: mds_config.base_url + "register/create",
			        data : form.serialize() + '&csrf_mds_token=' + jQuery.cookie(mds_config.csfr_cookie_name),
			        beforeSend: function()
			        {
			            jQuery("#btn_register_submit").prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Creating your account...');
			        },
			        success: function(response) {
			        	// convert json parse
			        	var json_parse = JSON.parse(response);

			        	// check is error
			        	if(json_parse.is_error) {
							jQuery("#show_register_error").show().html("<i class='fa fa-exclamation-triangle'></i> &nbsp;" + json_parse.message);
							window.scrollTo({ top: 20, behavior: 'smooth' });
			        	} else {
			        		// show success msg
							jQuery("#show_register_error").removeClass('alert-danger').addClass('alert-primary').show().html("<i class='fa fa-envelope'></i> &nbsp;" + json_parse.message);
							window.scrollTo({ top: 20, behavior: 'smooth' });
							$(form)[0].reset();
			        	}

						// stop loader
						jQuery("#btn_register_submit").prop('disabled', false).html('Create an Account');
					}
			    });
	    	}

	    	return false;
        });
        
    });
})(jQuery);

/*function auth_user_register()
{
	// get requested data
	var user_username 	  	  = jQuery("#register_form #user_username").val();
	var user_first_name 	  = jQuery("#register_form #user_first_name").val();
	var user_last_name 		  = jQuery("#register_form #user_last_name").val();
	var user_email_address 	  = jQuery("#register_form #user_email_address").val();
	var user_password 		  = jQuery("#register_form #user_password").val();
	var user_confirm_password = jQuery("#register_form #user_confirm_password").val();

	// show loader
	jQuery("#register_submit").prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Creating your account...');

	// check data
	if(!user_username.length) {
		// show error msg
		jQuery("#show_register_error").show().html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Username is not valid.");
		jQuery("#register_submit").prop('disabled', false).html('Create an Account');
		jQuery("#user_username").focus();
		window.scrollTo({ top: 20, behavior: 'smooth' });
	} else if(!user_first_name.length) {
		// show error msg
		jQuery("#show_register_error").show().html("<i class='fa fa-exclamation-triangle'></i> &nbsp;First name is not valid.");
		jQuery("#register_submit").prop('disabled', false).html('Create an Account');
		jQuery("#user_first_name").focus();
		window.scrollTo({ top: 20, behavior: 'smooth' });
	} else if(!user_last_name.length) {
		// show error msg
		jQuery("#show_register_error").show().html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Last name is not valid.");
		jQuery("#register_submit").prop('disabled', false).html('Create an Account');
		jQuery("#user_last_name").focus();
		window.scrollTo({ top: 20, behavior: 'smooth' });
	} else if(!user_email_address.length) {
		// show error msg
		jQuery("#show_register_error").show().html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Email address is not valid.");
		jQuery("#register_submit").prop('disabled', false).html('Create an Account');
		jQuery("#user_email_address").focus();
		window.scrollTo({ top: 20, behavior: 'smooth' });
	} else if(user_password.length <= 8) {
		// show error msg
		jQuery("#show_register_error").show().html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Password must be at least 8 characters long.");
		jQuery("#register_submit").prop('disabled', false).html('Create an Account');
		jQuery("#user_password").focus();
		window.scrollTo({ top: 20, behavior: 'smooth' });
	} else if(user_password != user_confirm_password) {
		// show error msg
		jQuery("#show_register_error").show().html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Confirm password not match.");
		jQuery("#register_submit").prop('disabled', false).html('Create an Account');
		jQuery("#user_confirm_password").focus();
		window.scrollTo({ top: 20, behavior: 'smooth' });
	} else {
		// apply ajax for register
		jQuery.ajax({
			type: "POST",
			url: mds_config.base_url + "register/create",
			data: {
				'csrf_mds_token'    : jQuery.cookie(mds_config.csfr_cookie_name),
				'user_username'     : user_username,
				'user_first_name'   : user_first_name,
				'user_last_name'    : user_last_name,
				'user_email_address': user_email_address,
				'user_password'     : user_password,
			},
			success: function(response) {
				// check response
				if(response == 'username_exist') {
					// show error msg
					jQuery("#show_register_error").show().html("<i class='fa fa-exclamation-triangle'></i> &nbsp;An account with username <b>" + user_username + "</b> already exists.");
					window.scrollTo({ top: 20, behavior: 'smooth' });
				} else if(response == 'email_exist') {
					// show error msg
					jQuery("#show_register_error").show().html("<i class='fa fa-exclamation-triangle'></i> &nbsp;An account with email <b>" + user_email_address + "</b> already exists.");
					window.scrollTo({ top: 20, behavior: 'smooth' });
				} else if(response == 'verify') {
					// show success msg
					jQuery("#show_register_error").removeClass('alert-danger').addClass('alert-primary').show().html("<i class='fa fa-envelope'></i> &nbsp;Please verify your account. We sent mail to your registered email address.");
					window.scrollTo({ top: 20, behavior: 'smooth' });

					// unset data
					jQuery("#register_form #base_url").val('');
					jQuery("#register_form #user_username").val('');
					jQuery("#register_form #user_first_name").val('');
					jQuery("#register_form #user_last_name").val('');
					jQuery("#register_form #user_email_address").val('');
					jQuery("#register_form #user_password").val('');
					jQuery("#register_form #user_confirm_password").val('');
				} else if(response == 'success') {
					// show success msg
					jQuery("#show_register_error").removeClass('alert-danger').addClass('alert-success').show().html("<i class='fa fa-check'></i> &nbsp;Your account created successfully.");
					window.scrollTo({ top: 20, behavior: 'smooth' });

					// reload page
					setTimeout(function () {
						location.reload();
					}, 1000);
				} else {
					// show success msg
					jQuery("#show_register_error").show().html("<i class='fa fa-exclamation-triangle'></i> &nbsp;Something went wrong with account creation. Please try after some time.");
					window.scrollTo({ top: 20, behavior: 'smooth' });
				}

				// stop loader
				jQuery("#register_submit").prop('disabled', false).html('Create an Account');
			}
		});
	}
}**/