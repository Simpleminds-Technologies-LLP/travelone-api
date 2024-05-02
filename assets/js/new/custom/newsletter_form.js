// on click add form data
jQuery("#newsletter_submit").click(function() {
	// show loader
	jQuery('#newsletter_submit').html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Subscribe').attr('disabled', true);

	// hide error
	jQuery("#newsletter_msg").hide();

	// get user email
	var user_email 			= jQuery("#newsletter_email").val();
	var newsletter_base_url = jQuery("#newsletter_base_url").val();

	// is valid email
	if(is_valid_email(user_email)) {
		// apply ajax for filter
		jQuery.ajax({
			type: "POST",
			url: mds_config.base_url + "newsletter_submit",
			data: {
				'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
				'user_email': user_email
			},
			success: function(response) {
				// parse json
				var json_parse = JSON.parse(response);

				// check response
				if(json_parse.status == 'success') {
					jQuery("#newsletter_msg").show().html("<br>Thanks! Your email has been subscribed to our newsletter.");
				} else if(json_parse.status == 'error') {
					jQuery("#newsletter_msg").show().html("<br>Oops! Something went wrong. Please try again.");
				} else if(json_parse.status == 'exist') {
					jQuery("#newsletter_msg").show().html("<br>You have already registered for the newsletter.");
				}

				// reset form
				jQuery("#newsletter_email").val('');

				// show loader
				jQuery('#newsletter_submit').html('Subscribe').attr('disabled', false);
			}
		});
	} else {
		// show error
		jQuery("#newsletter_msg").show().html("<br>Error! Enter your email address.");

		// show loader
		jQuery('#newsletter_submit').html('Subscribe').attr('disabled', false);
	}
});

/**
 * is valid email
 */
function is_valid_email(email)
{
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(!regex.test(email)) {
		return false;
	} else {
		return true;
	}
}