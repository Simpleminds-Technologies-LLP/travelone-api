// define value
var add_tags_index = 100;
var add_tags_limit = 15;

// tour product gallery
init_slick_slider_content('.tour_product_gallery');
init_slick_slider_content('.imageSlider');

/**
 * on page load show selected city and nights
 */
jQuery(document).ready(function() {
	// get URL path
	var url_params = new window.URLSearchParams(window.location.search);

	// fetch parameters
	var _ref    = url_params.get('_ref');
	var tour_id = url_params.get('tour_id');

	// check tour is editable
	if(tour_id) {
		// show loader
		jQuery('#city-item-loader').show().html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Fetching selected cities...');
	}

	// fetch city content
	jQuery.ajax({
	    type: "POST",
	    url: base_url + "dashboard/fetch_init_city_night_data",
	    data: {
			'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
			'_ref'          : _ref,
			'tour_id'       : tour_id,
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
	    			jQuery('#tour_destination_' + json_parse.tour_destination[index]).prop("checked", true);
	    		}
	    	}

	    	// check city content is valid
	    	if(json_parse.city_night_content) {
		    	// update content
		    	jQuery('#package-city-night-items').html(json_parse.city_night_content);
	    	} else {
	    		default_city_night_show();
	    	}

	    	// show loader
			jQuery('#city-item-loader').hide().html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Fetching popular cities...');
	    }
	});
});

/**
 * default city night show
 */
function default_city_night_show()
{
	// define icon
    var drag_icon   = base_url + 'assets/img/agent/drag.png';
    var option_icon = base_url + 'assets/img/agent/dropdown.png';

	// append html content
    jQuery('#package-city-night-items').html('<div class="item row city-item-1 default_item"><div class="col-12 col-md-4 col-lg-4 col-xl-4 country"><div class="lableCityNightSelect"><div class="selectLabel selectLabelDv"><img src="' + drag_icon + '" alt="drag-icon" class="selectLabelimg"></div><div class="selectLabel"><select name="country" class="form-control selectric arrow-image" style="background-image:url(' + option_icon + '); cursor:pointer; background-color:#dfffde" id="drop_country" onchange="agent_get_city_from_country(jQuery(this).val());"><option value="">--Select--</option></select><div class="invalid-feedback">Please Select Country</div></div></div></div><div class="col-12 col-md-4 col-lg-4 col-xl-4 city"><div class="lableCityNightSelect"><div class="selectLabel"><select name="city" class="form-control selectric arrow-image" style="background-image:url(' + option_icon + '); cursor:pointer; background-color:#dfffde" id="drop_country" required=""><option value="">--Select--</option></select><div class="invalid-feedback">Please Select Country</div></div></div></div><div class="col-12 col-md-4 col-lg-4 col-xl-4 night"><div class="lableCityNightSelect"><div class="selectLabel"><select name="night" class="form-control selectric arrow-image" style="background-image:url(' + option_icon + '); cursor:pointer; background-color:#dfffde"><option value="">--Select--</option><option value="1">1 night</option><option value="2">2 nights</option><option value="3">3 nights</option><option value="4">4 nights</option><option value="5">5 nights</option></select><div class="invalid-feedback">Please Select Nights</div></div><div class="closeIconStep"><ion-icon name="close-outline" title="Remove" class="CloseIcon remove_city_night_item" data-key="1"></ion-icon></div></div></div></div>');
}

/**
 * jQuery multi form steps wizard
 */
jQuery(document).ready(function() {
	// on multi step form change
	jQuery('#jquery-steps').steps({
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
	            return form_wizard_step_one_pro();
	        } else if(currentIndex == 1) {
	        	// return response
	            return form_wizard_step_two_pro();
	        } else if(currentIndex == 2) {
	        	// return response
	            return form_wizard_step_three_pro();
	        } else if(currentIndex == 3) {
	        	// add package city (for step 5)
	        	add_package_default_city(false);

	        	// trigger resize window
				setTimeout(function() {
			        jQuery(window).trigger('resize');
			    }, 100);

	        	// return response
	            return form_wizard_step_four_pro();
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
	    onFinishing: function(event, currentIndex) {
	        var form = jQuery('.body.current form');
	        if (form.length == 1) {
	            form.validate().settings.ignore = ":disabled";
	            return form.valid();
	        }
	        return true;
	    },
	    onFinished: function(event, currentIndex) {
	    	// final submit package
	    	form_wizard_step_five_pro();
	    }
	});
});

/**
 * change step to show button options
 */
jQuery(document).ready(function() {
	// on click form navigation step change
	jQuery('#jquery-steps .steps ul li').click(function() {
		// check active class
		var is_active_tab = jQuery(this).hasClass('current');
		var is_last_tab   = jQuery(this).hasClass('last');

		// check tab is active
		if(is_active_tab) {
			// check is last step
			if(is_last_tab) {
				// check sub tab is active
				if(jQuery('.itinerary_pkg_tab').hasClass('active')) {
		    		// hide button option
					jQuery('#jquery-steps .actions').hide();
		    	} else if(jQuery('.itinerary_itinerary_tab').hasClass('active')) {
		    		// hide button option
					jQuery('#jquery-steps .actions').hide();
		    	} else if(jQuery('.itinerary_term_tab').hasClass('active')) {
		    		// show button option
					jQuery('#jquery-steps .actions').show();
		    	}
			} else {
				// show button option
				jQuery('#jquery-steps .actions').show();
			}
		} else {
			// show button option
			jQuery('#jquery-steps .actions').hide();
		}
	});
});

/**
 * form step one process
 */
function form_wizard_step_one_pro() {
	// get package title
	var package_title = jQuery(".Step1Form #package_title_name").val();

	// check package title
	if(package_title.length) {
		// get selected place
		var place_count = jQuery(".destination_selection :checkbox:checked").length;

		// check place count
		if(place_count) {
			// define array
			var selected_destination = [];

			// get destination place name
			jQuery(".destination_selection :checkbox:checked").each(function(key, value) {
				// get city name
				var dest_name = jQuery(this).val();

				// check and push in array
				if(dest_name != '' && dest_name != '--Select--' && dest_name != null) {
					selected_destination[key] = dest_name;
				}
			});

			// get city and night
			var count_selected_city_night = jQuery("#package-city-night-items .item").length;

			// define array
			var selected_city_nights = [];

			// check city night count
			if(count_selected_city_night) {
				// define index
				var city_night_index = 0;

				// fetch selected city
				jQuery("#package-city-night-items .item").each(function(index, element) {
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
		        url: base_url + "dashboard/cookie",
		        data: {
					'csrf_mds_token'      : jQuery.cookie(csfr_cookie_name),
					'step_name'           : 'agent_form_step_1',
					'package_title'       : package_title,
					'destination_city'    : selected_destination,
					'selected_city_nights': selected_city_nights,
				},
		        success: function(response) {
		            // json parse
					var json_parse = JSON.parse(response);

					// set SEO title
					// jQuery('#seo_title').val(package_title);

					// set slug
					jQuery('#seo_tour_slug').val(json_parse.tour_slug);

					// update selected city and nights content
					jQuery("#tour_package_1 .package_city_night").html(json_parse.package_city_content);
					jQuery("#tour_package_2 .package_city_night").html(json_parse.package_city_content);
					jQuery("#tour_package_3 .package_city_night").html(json_parse.package_city_content);
					jQuery("#tour_package_4 .package_city_night").html(json_parse.package_city_content);

					// update package itinerary content
					jQuery("#package_itinerary_content").html(json_parse.package_itinerary_content);

					// set tour status in cookie
					jQuery.cookie('is_tour_created_status', json_parse.is_tour_created_status, { expires: 24, path: '/' });

					// check tour is created or updated
					if(json_parse.is_tour_created_status) {
						// set data in cookie
						jQuery.cookie('agent_added_packages', 1, { expires: 24, path: '/' });

						// hide unpublish status button
						jQuery('#unpublish_visibility_package').hide();
					} else {
						// show unpublish status button
						jQuery('#unpublish_visibility_package').show();
					}

					// append parameter in URL
					window.history.replaceState(null, null, "?_ref=edit&tour_id=" + json_parse.tour_id);
		        }
		    });

			// set modal local storage
			jQuery.cookie('agent_selected_package', 1, { expires: 24, path: '/' });
			jQuery.cookie('agent_upload_image_is_primary', 0, { expires: 24, path: '/' });

			// reset style
			jQuery("#package_destination_error").hide();

			// return response
			return true;
		} else {
			// show error msg
			jQuery("#package_destination_error").show().html('*Please choose your destination');
		}

		// reset style
		jQuery("#package_title_error").hide().html('');
	} else {
		// show error msg
		jQuery("#package_title_error").show().html('*Please enter your package title');
	}

	// return response
	return false;
}

/**
 * form step two process
 */
function form_wizard_step_two_pro() {
	// define array
	var tour_highlights   = [];
	var guest_nationality = [];

	// define is other flag
	var is_other_guest_nationality = false;

	// fetch tour highlights
	jQuery("#tour-highlights-items input").each(function(key, value) {
		// get item value
		var item_val = jQuery(this).val();

		// check and push in array
		if(item_val != '' && item_val.length) {
			tour_highlights[key] = item_val;
		}
	});

	// fetch special guest nationality
	jQuery(".special_guest_nationality :checkbox:checked").each(function(key, value) {
		// get selected value
		var select_option = jQuery(this).val();

		// check and push in array
		if(select_option != 'other') {
			guest_nationality.push(select_option);
		}

		// if other selected
		if(select_option == 'other') {
			is_other_guest_nationality = true;
		}
	});

	// fetch other guest nationality
	if(is_other_guest_nationality) {
		jQuery(".other_guest_nationality select :selected").each(function(key, value) {
			guest_nationality.push(jQuery(this).val());
		});
	}

	// get listing type
	var listing_type = jQuery('input[name=listing_type_check]:checked');
	listing_type = (listing_type.length) ? listing_type[0].defaultValue : '';

	// check validation
	if(tour_highlights.length != 4) {
		jQuery("#package_highlight_error").show().html('* Please enter highlight');
		jQuery("#package_nationality_error").hide();
		jQuery("#package_listing_error").hide();
	} else if(!listing_type) {
		jQuery("#package_highlight_error").hide();
		jQuery("#package_nationality_error").hide();
		jQuery("#package_listing_error").show().html('* Please select listing type');
	} else {
		// save data in table
	  	jQuery.ajax({
	        type: "POST",
	        url: base_url + "dashboard/cookie",
	        data: {
				'csrf_mds_token'   : jQuery.cookie(csfr_cookie_name),
				'step_name'        : 'agent_form_step_2',
				'tour_highlights'  : tour_highlights,
				'guest_nationality': guest_nationality,
				'listing_type'     : listing_type,
			},
	    });

		// hide error message
		jQuery("#package_highlight_error").hide();
		jQuery("#package_nationality_error").hide();
		jQuery("#package_listing_error").hide();

		// return response
		return true;
	}

	// return response
	return false;
}

/**
 * fetch uploaded media images
 */
function fetch_uploaded_media_images()
{
	// define image array
	var upload_custom_image = [];
	var image_index         = 0;

	// fetch images
	for (var index = 0; index < 9; index++) {
		// get image source
		var is_image = jQuery("#custom_gallery_preview #image" + index + " img").hasClass('added_img');

		// check image is uploaded
		if(is_image) {
			// get image source
			var image_path = jQuery("#custom_gallery_preview #image" + index + " img").attr('src');

			// push data in array
			upload_custom_image[image_index] = image_path;

			// increment index
			image_index++;
		}
	}

	// return response
	return upload_custom_image;
}

/**
 * form step three process
 */
function form_wizard_step_three_pro()
{
	// hide error msg
	jQuery('.upload_custom_image_error').hide().html('');
	jQuery('#upload_media_processing_loader').hide();

	// get media type
	var media_type = jQuery('input[name=select_media_type]:checked').val();

	// get primary image no
	var is_primary_img = jQuery.cookie("agent_upload_image_is_primary");

	// fetch uploaded media images
	var upload_custom_image = fetch_uploaded_media_images();

	// define guest nationality
	var video_link = [];
	jQuery("#add_video_link input[name=video_link]").each(function(key, value) {
		if(jQuery(this).val()) {
			video_link[key] = jQuery(this).val();
		}
	});

	// check upload atleast 5 images
	if(media_type == 'custom_media' && upload_custom_image.length < 5) {
		// show error message
		jQuery('.upload_img_text').css('margin-bottom', '3px');
		jQuery('.upload_custom_image_error').show().css('margin-bottom', '15px').html('Please upload at least 5 photos. <br/>');

		// return response
		return false;
	}

	// set data in cookie
	jQuery.ajax({
        type: "POST",
        url: base_url + "dashboard/cookie",
        data: {
			'csrf_mds_token'     : jQuery.cookie(csfr_cookie_name),
			'step_name'          : 'agent_form_step_3',
			'media_type'         : media_type,
			'is_primary_img'     : is_primary_img,
			'upload_custom_image': upload_custom_image,
			'video_link'         : video_link,
		},
    });

	// return response
	return true;
}

/**
 * form step four process
 */
function form_wizard_step_four_pro() {
	// define array
	var package_theme        = [];
	var traveler_personas    = [];
	var is_trending_deal_arr = [];

	// get selected theme
	var theme_count = jQuery(".package_theme :checkbox:checked").length;

	// get selected personas
	var personas_count = jQuery(".tour_traveler_personas :checkbox:checked").length;

	// check theme count
	if(theme_count) {
		jQuery(".package_theme :checkbox:checked").each(function(key, value) {
			package_theme.push(jQuery(this).val());
		});
	}

	// check perosnas count
	if(personas_count) {
		jQuery(".tour_traveler_personas :checkbox:checked").each(function(key, value) {
			traveler_personas.push(jQuery(this).val());
		});
	}

	// define tags
	var tour_tags     = fetch_tags_list('tour_tag_box');
	var transpot_tags = fetch_tags_list('transpot_tag_box');
	var meal_tags     = fetch_tags_list('meal_tag_box');
	var city_tags     = fetch_tags_list('city_tag_box');

	// get tour quality
	var tour_quality = jQuery('input[name=tour_quality]:checked').val();

	// home trending deals
	if(jQuery('input[name=is_trending_deal]:checked').length) {
		// fetch trending deals
		jQuery('input[name=is_trending_deal]:checked').each(function(index) {
			is_trending_deal_arr[index] = jQuery(this).val();
		});
	}

	// get seo data
	var seo_title    = jQuery("#seo_title").val();
	var seo_desc     = jQuery("#seo_desc").val();
	var seo_keywords = jQuery("#seo_keywords").val();
	var seo_slug     = jQuery("#seo_tour_slug").val();

	// hide submit form button
	jQuery('#jquery-steps .actions').hide();

	// check tour slug
	if(seo_slug == "") {
		// show error msg
		jQuery("#package_slug_error").show().html('*Please enter valid tour slug');
	} else {
		// hide error msg
		jQuery("#package_slug_error").show().html("");

		// save data in table
		jQuery.ajax({
			type: "POST",
			url: base_url + "dashboard/cookie",
			data: {
				'csrf_mds_token'   : jQuery.cookie(csfr_cookie_name),
				'step_name'        : 'agent_form_step_4',
				'package_theme'    : package_theme,
				'traveler_personas': traveler_personas,
				'tour_quality'     : tour_quality,
				'is_trending_deal' : (is_trending_deal_arr.length) ? is_trending_deal_arr.join(', ') : '',
				'tour_tags'        : tour_tags,
				'transpot_tags'    : transpot_tags,
				'meal_tags'        : meal_tags,
				'city_tags'        : city_tags,
				'seo_title'        : seo_title,
				'seo_desc'         : seo_desc,
				'seo_keywords'     : seo_keywords,
				'seo_slug'         : seo_slug,
			}
		});

		// return response
		return true;		
	}
}

/**
 * form step five process
 */
function form_wizard_step_five_pro()
{
	// fetch terms data
	var terms_data = fetch_terms_content_data();

	// fetch payment sechdule
	var payment_sechdule = fetch_payment_sechdule_data();

	// fetch cancellation payment
	var cancellation_payment = fetch_cancellation_payment_data();

	// get tour package visibility
	var package_visibility_status = jQuery('input[name=package_visibility_status]:checked').val();

	// fetch full payment discount
	var full_payment_discount = jQuery('#full_payment_discount_percentage').val();

	// check package is valid
	if(!package_visibility_status) {
		// show error message
		jQuery(".package_visibility_error").show().html('*Select your package visibility status');

		// return response
		return false;
	} else {
		// hide error message
		jQuery(".package_visibility_error").hide();
	}

	// show loader
	jQuery('#jquery-steps .actions').find('[aria-hidden="false"] a').html('<i class="fa fa-spinner fa-spin"></i> Processing...').css('cursor', 'not-allowed');

	// save data in table
  	jQuery.ajax({
		type: "POST",
		url: base_url + "dashboard/cookie",
		data: {
			'csrf_mds_token'            : jQuery.cookie(csfr_cookie_name),
			'step_name'                 : 'agent_form_step_5',
			'package_visibility_status' : package_visibility_status,
			'terms_made_to_order'       : JSON.stringify(terms_data.made_to_order),
			'terms_what_included'       : JSON.stringify(terms_data.what_included),
			'terms_what_not_included'   : JSON.stringify(terms_data.what_not_included),
			'terms_protect_your_travel' : JSON.stringify(terms_data.protect_your_travel),
			'terms_terms_conditions'    : JSON.stringify(terms_data.terms_conditions),
			'terms_important_notes'     : JSON.stringify(terms_data.important_notes),
			'terms_cancellation_policy' : JSON.stringify(terms_data.cancellation_policy),
			'terms_faqs'                : JSON.stringify(terms_data.faqs),
			'cancellation_policy_status': terms_data.cancellation_policy_status,
			'payment_sechdule'          : JSON.stringify(payment_sechdule['payment_sechdule']),
			'cancellation_payment'      : JSON.stringify(cancellation_payment),
			'full_payment_discount'     : (full_payment_discount) ? full_payment_discount : 0,
		},
		success: function(response) {
			// show loader
			jQuery('#jquery-steps .actions').find('[aria-hidden="false"] a').html('<i class="fa fa-check-circle"></i> Package Saved!').css('cursor', 'pointer');

			// show alert message
			alert("Great! Your package has been updated.");

			// redirect to listing page
			window.location.href = base_url + 'dashboard/listing';
		}
	});
}

/**
 * fetch payment sechdule data
 */
function fetch_payment_sechdule_data()
{
	// define array
	var payment_sechdule                 = [];
	payment_sechdule['payment_sechdule'] = [];

	// define default value
	var total_percentage = 0;

	// get payment sechdule fields
	var payment_sechdule_fields = jQuery('.payment_sechdule_amount_box .item');

	// check array length
	if(payment_sechdule_fields.length) {
		// fetch items
		jQuery.each(payment_sechdule_fields, function() {
			// get item key
			var item_key = jQuery(this).data('item_key');

			// get item data
			var percentage  = jQuery('.payment_sechdule_amount_box .item-' + item_key + ' .percentage').val();
			var before_days = jQuery('.payment_sechdule_amount_box .item-' + item_key + ' .before_days').val();

			// check data is valid
			if(percentage && before_days) {
				// update total percentage
				total_percentage = Number(total_percentage) + Number(percentage);

				// create item data
				var item_data = {
					'percentage' : percentage,
					'before_days': before_days,
				};

				// push data in array
				payment_sechdule['payment_sechdule'].push(item_data);
			}
		});
	}

	// update total percentage
	payment_sechdule['total_percentage'] = total_percentage;

	// return response
	return payment_sechdule;
}

/**
 * fetch cancellation payment data
 */
function fetch_cancellation_payment_data()
{
	// define array
	var cancellation_payment = [];

	// get payment sechdule fields
	var cancellation_payment_fields = jQuery('.cancellation_payment_box .item');

	// check array length
	if(cancellation_payment_fields.length) {
		// fetch items
		jQuery.each(cancellation_payment_fields, function() {
			// get item key
			var item_key = jQuery(this).data('item_key');

			// get item data
			var percentage  = jQuery('.cancellation_payment_box .item-' + item_key + ' .percentage').val();
			var before_days = jQuery('.cancellation_payment_box .item-' + item_key + ' .before_days').val();

			// check data is valid
			if(percentage && before_days) {
				// create item data
				var item_data = {
					'percentage' : percentage,
					'before_days': before_days,
				};

				// push data in array
				cancellation_payment.push(item_data);
			}
		});
	}

	// return response
	return cancellation_payment;
}

// fetch terms data
function fetch_terms_content_data()
{
	// define array
	var terms_arr                    = {};
	terms_arr['made_to_order']       = {};
	terms_arr['what_included']       = {};
	terms_arr['what_not_included']   = {};
	terms_arr['protect_your_travel'] = {};
	terms_arr['terms_conditions']    = {};
	terms_arr['important_notes']     = {};
	terms_arr['cancellation_policy'] = {};
	terms_arr['faqs']                = {};

	// define index
	var made_to_order_index       = 0;
	var what_included_index       = 0;
	var what_not_included_index   = 0;
	var protect_your_travel_index = 0;
	var terms_conditions_index    = 0;
	var important_notes_index     = 0;
	var cancellation_policy_index = 0;
	var faqs_index                = 0;

	// get made to order terms
	var made_to_order_count       = jQuery('.tour_terms_content .terms_made_to_order_tab .terms_made_to_order_content .item').length;
	var what_included_count       = jQuery('.tour_terms_content .terms_what_included_tab .terms_what_included_content .item').length;
	var what_not_included_count   = jQuery('.tour_terms_content .terms_what_not_included_tab .terms_what_not_included_content .item').length;
	var protect_your_travel_count = jQuery('.tour_terms_content .terms_protect_your_travel_tab .terms_protect_your_travel_content .item').length;
	var terms_conditions_count    = jQuery('.tour_terms_content .terms_terms_conditions_tab .terms_terms_conditions_content .item').length;
	var important_notes_count     = jQuery('.tour_terms_content .terms_important_notes_tab .terms_important_notes_content .item').length;
	var cancellation_policy_count = jQuery('.tour_terms_content .terms_cancellation_policy_tab .terms_cancellation_policy_content .item').length;
	var faqs_count                = jQuery('.tour_terms_content .terms_faqs_tab .terms_faqs_content .item').length;

	// get cancellation policy status
	var cancellation_policy_status = jQuery('input[name=refundable]:checked').val();
	terms_arr['cancellation_policy_status'] = cancellation_policy_status;

	// check made to order item
	if(made_to_order_count) {
		jQuery('.tour_terms_content .terms_made_to_order_tab .terms_made_to_order_content .item').each(function(key, element) {
			// get hotel content
			var first_item  = jQuery(this).find('#first_item').val();
			var second_item = jQuery(this).find('#second_item').val();

			// check first item
			if(first_item) {
				// push data in array
				terms_arr['made_to_order'][made_to_order_index] = first_item;
				made_to_order_index++;
			}

			// check second item
			if(second_item) {
				// push data in array
				terms_arr['made_to_order'][made_to_order_index] = second_item;
				made_to_order_index++;
			}
		});
	}

	// check what included item
	if(what_included_count) {
		jQuery('.tour_terms_content .terms_what_included_tab .terms_what_included_content .item').each(function(key, element) {
			// get hotel content
			var first_item  = jQuery(this).find('#first_item').val();
			var second_item = jQuery(this).find('#second_item').val();

			// check first item
			if(first_item) {
				// push data in array
				terms_arr['what_included'][what_included_index] = first_item;
				what_included_index++;
			}

			// check second item
			if(second_item) {
				// push data in array
				terms_arr['what_included'][what_included_index] = second_item;
				what_included_index++;
			}
		});
	}

	// check what not included item
	if(what_not_included_count) {
		jQuery('.tour_terms_content .terms_what_not_included_tab .terms_what_not_included_content .item').each(function(key, element) {
			// get hotel content
			var first_item  = jQuery(this).find('#first_item').val();
			var second_item = jQuery(this).find('#second_item').val();

			// check first item
			if(first_item) {
				// push data in array
				terms_arr['what_not_included'][what_not_included_index] = first_item;
				what_not_included_index++;
			}

			// check second item
			if(second_item) {
				// push data in array
				terms_arr['what_not_included'][what_not_included_index] = second_item;
				what_not_included_index++;
			}
		});
	}

	// check protect your travel item
	if(protect_your_travel_count) {
		jQuery('.tour_terms_content .terms_protect_your_travel_tab .terms_protect_your_travel_content .item').each(function(key, element) {
			// get hotel content
			var first_item  = jQuery(this).find('#first_item').val();
			var second_item = jQuery(this).find('#second_item').val();

			// check first item
			if(first_item) {
				// push data in array
				terms_arr['protect_your_travel'][protect_your_travel_index] = first_item;
				protect_your_travel_index++;
			}

			// check second item
			if(second_item) {
				// push data in array
				terms_arr['protect_your_travel'][protect_your_travel_index] = second_item;
				protect_your_travel_index++;
			}
		});
	}

	// check terms conditions item
	if(terms_conditions_count) {
		jQuery('.tour_terms_content .terms_terms_conditions_tab .terms_terms_conditions_content .item').each(function(key, element) {
			// get hotel content
			var first_item  = jQuery(this).find('#first_item').val();
			var second_item = jQuery(this).find('#second_item').val();

			// check first item
			if(first_item) {
				// push data in array
				terms_arr['terms_conditions'][terms_conditions_index] = first_item;
				terms_conditions_index++;
			}

			// check second item
			if(second_item) {
				// push data in array
				terms_arr['terms_conditions'][terms_conditions_index] = second_item;
				terms_conditions_index++;
			}
		});
	}

	// check important notes item
	if(important_notes_count) {
		jQuery('.tour_terms_content .terms_important_notes_tab .terms_important_notes_content .item').each(function(key, element) {
			// get hotel content
			var first_item  = jQuery(this).find('#first_item').val();
			var second_item = jQuery(this).find('#second_item').val();

			// check first item
			if(first_item) {
				// push data in array
				terms_arr['important_notes'][important_notes_index] = first_item;
				important_notes_index++;
			}

			// check second item
			if(second_item) {
				// push data in array
				terms_arr['important_notes'][important_notes_index] = second_item;
				important_notes_index++;
			}
		});
	}

	// check cancellation policy item
	if(cancellation_policy_count) {
		jQuery('.tour_terms_content .terms_cancellation_policy_tab .terms_cancellation_policy_content .item').each(function(key, element) {
			// get hotel content
			var first_item  = jQuery(this).find('#first_item').val();
			var second_item = jQuery(this).find('#second_item').val();

			// check first item
			if(first_item) {
				// push data in array
				terms_arr['cancellation_policy'][cancellation_policy_index] = first_item;
				cancellation_policy_index++;
			}

			// check second item
			if(second_item) {
				// push data in array
				terms_arr['cancellation_policy'][cancellation_policy_index] = second_item;
				cancellation_policy_index++;
			}
		});
	}

	// check faqs item
	if(faqs_count) {
		jQuery('.tour_terms_content .terms_faqs_tab .terms_faqs_content .item').each(function(key, element) {
			// get hotel content
			var question = jQuery(this).find('#first_item').val();
			var answer   = jQuery(this).find('#second_item').val();

			// check first item
			if(question) {
				// push data in array
				terms_arr['faqs'][faqs_index]    = [];
				terms_arr['faqs'][faqs_index][0] = question;
				terms_arr['faqs'][faqs_index][1] = answer;
				faqs_index++;
			}
		});
	}

	// return response
	return terms_arr;
}

// on ready document event
jQuery(document).ready(function() {
	// define index
	var add_video_link_index = 100;

	// on type convert string to slug
	jQuery("#seo_tour_slug").keyup(function() {
		// var get slug
		var tour_slug = jQuery(this).val();

		// convert to slug
		tour_slug = tour_slug.toLowerCase().replace(/[^a-z0-9\s]/gi, '-').replace(/[_\s]/g, '-');

		// set converted value
		jQuery("#seo_tour_slug").val(tour_slug);
	});

	// package title change on key type
	jQuery("#package_title_name").keyup(function() {
		// change element style
		jQuery(".package_title_name").css("color", "#004963");
		jQuery("#package_title_error").hide().html('');

		// get package name
		var package_name = jQuery(this).val();

		// check title legnth
		if(package_name.length) {
			// change title
			jQuery("#print_package_title").show().html(package_name).css("color","black");

			// set title count
			var title_count = 80 - package_name.length;
			if(title_count) {
				jQuery('.package_title_count').css('color', '#004963').html(title_count);
			} else {
				jQuery('.package_title_count').css('color', '#fa5746').html(title_count);
			}
		} else {
			// change title
			jQuery("#print_package_title").html("").css("color", "#f3f9f4");

			// set title count
			jQuery('.package_title_count').css('color', '#004963').html(80);
		}
	});

	// remove city night item
	jQuery(document.body).on("click", ".remove_city_night_item", function() {
		// get item key
		var item_key = jQuery(this).data('key');

		// count item element
		var item_count = jQuery("#package-city-night-items").children().length - 1;

		// check item count
		if(item_count > 0) {
			// remove item
			jQuery('.city-item-' + item_key).fadeOut().remove();
		}
	});

	// remove video link item
	jQuery(document.body).on("click", ".remove_video_link_item", function() {
		// get item key
		var item_key = jQuery(this).data('key');

		// count item element
		var item_count = jQuery("#add_video_link").children().length - 1;

		// check item count
		if(item_count > 0) {
			// remove item
			jQuery('#add_video_link .video-link-item-' + item_key).fadeOut().remove();
		}
	});

	// remove tags item
	jQuery(document.body).on("click", ".tour_tag_box .remove_tag", function() {
		// get item key
		var item_key = jQuery(this).data('key');

		// remove field
		remove_input_tag_field('tour_tag_box', item_key)
	});

	// remove transpot tags item
	jQuery(document.body).on("click", ".transpot_tag_box .remove_tag", function() {
		// get item key
		var item_key = jQuery(this).data('key');

		// remove field
		remove_input_tag_field('transpot_tag_box', item_key)
	});

	// remove meal tags item
	jQuery(document.body).on("click", ".meal_tag_box .remove_tag", function() {
		// get item key
		var item_key = jQuery(this).data('key');

		// remove field
		remove_input_tag_field('meal_tag_box', item_key)
	});

	// remove city tags item
	jQuery(document.body).on("click", ".city_tag_box .remove_tag", function() {
		// get item key
		var item_key = jQuery(this).data('key');

		// remove field
		remove_input_tag_field('city_tag_box', item_key)
	});

	/**
	 * remove input tags field
	 **/
	function remove_input_tag_field(element = '', item_key)
	{
		// remove item
		jQuery('.' + element + ' .tag_input .tag-item-' + item_key).remove();

		// check active tag
		var current_active_tags = jQuery('.' + element + ' .tag_item_content .tag_input .tag').length;

		// update tag limit
		var current_tags_limit = add_tags_limit - current_active_tags;

		// update tag limit
		if(current_tags_limit > 0) {
			jQuery("." + element + " .tags_limit").html(current_tags_limit + ' to go!');
		} else {
			jQuery("." + element + " .tags_limit").html('');
		}

		// check tag limit
		if(add_tags_limit >= current_tags_limit) {
			jQuery("." + element + " #tag_name").prop('disabled', false);
			jQuery("." + element + " .tagsBlock1 .addInputSec .input-group .form-control").css('border-color', '#004963');
			jQuery("." + element + " .tagsBlock1 .addInputSec .input-group-append .input-group-text").css('border-color', '#004963');
			jQuery("." + element + " .add_tag_btn").css('color', '#004963');
		} else {
			jQuery("." + element + " #tags_input_error").show().html('*Tag Limit Exceed.');
			jQuery("." + element + " #tag_name").val('').prop('disabled', true);
			jQuery("." + element + " .tagsBlock1 .addInputSec .input-group .form-control").css('border-color', '#CCC');
			jQuery("." + element + " .tagsBlock1 .addInputSec .input-group-append .input-group-text").css('border-color', '#CCC');
			jQuery("." + element + " .add_tag_btn").css('color', '#CCC');
		}
	}

	// on click destination place
	jQuery(document.body).on("click", "input[name='destination_place']", function() {
		// get is checked
		var is_checked     = jQuery(this).is(':checked');
		var destination_id = jQuery(this).val();

        // check destination is selected
        if(!is_checked) {
        	// remove destination
        	jQuery('#package-city-night-items .dest-item-' + destination_id).remove();

        	// get item length
        	var item_length = jQuery('#package-city-night-items .item').length;

        	// check length is empty
        	if(!item_length) {
        		default_city_night_show();
        	}
        } else {
        	// show loader
        	jQuery('#city-item-loader').show();
        	jQuery('#add-city-item-btn').hide();

	        // fetch and append city and night
	        jQuery.ajax({
	            type: "POST",
	            url : base_url + "dashboard/get_city_by_mult_destination",
	            data: {
					'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
					'destination_id': destination_id
	            },
	            success: function(response) {
            		// check response is valid
	            	if(response) {
	            		// get item length
	            		var item_length = jQuery('#package-city-night-items .item').length;

	            		// check default item is exist
	            		if(item_length === 1) {
		            		// add content
		            		jQuery('#package-city-night-items').html(response);
	            		} else {
	            			// update content
		            		jQuery('#package-city-night-items').append(response);
	            		}
	            	}

	            	// show loader
		        	jQuery('#city-item-loader').hide();
		        	jQuery('#add-city-item-btn').show();
	            }
	        });
        }
    });

	// add click add new city night item
	jQuery(document.body).on('click', '.add_city_night_item', function() {
		// define array
		var destination_arr = [];

		// fetch selected destination
		jQuery.each(jQuery("input[name='destination_place']:checked"), function() {
			destination_arr.push(jQuery(this).val());
		});

		// perform ajax
		jQuery.ajax({
			type: "POST",
			url: base_url + "dashboard/add_new_city_night_item",
			data: {
				'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
				'destination_id': destination_arr
			},
            success: function(response) {
            	// check response is valid
            	if(response) {
        			// update content
            		jQuery('#package-city-night-items').append(response);
            	}
			}
        });
	});

	// add city night item
	jQuery(".add_video_link_item").click(function() {
		// add item
		jQuery('#add_video_link').append('<div class="row video-link-item-' + add_video_link_index + '"><div class="col-12"><div class="lableCityNightSelect1"><div class="inputyoutubeSec inputyoutubeSecFirstChild"><input type="text" class="form-control inputFormControl" name="video_link" placeholder="Enter YouTube video link" autocomplete="off"></div><div class="closeIconStep"><ion-icon name="close-outline" class="CloseIcon md hydrated remove_video_link_item" data-key="' + add_video_link_index + '" role="img" aria-label="close outline"></ion-icon></div></div></div></div>');

		// increment index
		add_video_link_index++;
	});

	// add new tag item (in click button)
	jQuery(document.body).on('click', '.tour_tag_box .add_tag_btn', function() {
		add_tags_input_content('tour_tag_box');
	});

	// add new tag item (in press enter button)
	jQuery(".tour_tag_box #tag_name").keydown(function(e) {
		// check key code
		if(e.which == 13) {
			add_tags_input_content('tour_tag_box');
		}
	});

	// add new transportation tag item (in click button)
	jQuery(document.body).on('click', '.transpot_tag_box .add_tag_btn', function() {
		add_tags_input_content('transpot_tag_box');
	});

	// add new transportation tag item (in press enter button)
	jQuery(".transpot_tag_box #tag_name").keydown(function(e) {
		// check key code
		if(e.which == 13) {
			add_tags_input_content('transpot_tag_box');
		}
	});

	// add new meal tag item (in click button)
	jQuery(document.body).on('click', '.meal_tag_box .add_tag_btn', function() {
		add_tags_input_content('meal_tag_box');
	});

	// add new meal tag item (in press enter button)
	jQuery(".meal_tag_box #tag_name").keydown(function(e) {
		// check key code
		if(e.which == 13) {
			add_tags_input_content('meal_tag_box');
		}
	});

	// add new city tag item (in click button)
	jQuery(document.body).on('click', '.city_tag_box .add_tag_btn', function() {
		add_tags_input_content('city_tag_box');
	});

	// add new city tag item (in press enter button)
	jQuery(".city_tag_box #tag_name").keydown(function(e) {
		// check key code
		if(e.which == 13) {
			add_tags_input_content('city_tag_box');
		}
	});

	// on upload custom media
	jQuery(document).ready(function() {
		jQuery("#custom_video").hide();
		jQuery("#custom_button_hide").hide();
		jQuery('input[name=select_media_type]').change(function() {
			// get selection value
			var media_type = jQuery('input[name=select_media_type]:checked').val();

			// check media type
			if(media_type == 'custom_media') {
				jQuery("#upload_custom_media").show();
				jQuery("#custom_video").show();
				jQuery("#custom_button_hide").show();
			} else {
				jQuery("#upload_custom_media").hide();
				jQuery("#custom_video").hide();
				jQuery("#custom_button_hide").hide();
			}
		});
	});

	// click to add more package options
	jQuery(".add_package_option").click(function() {
		// get package add index
		var req_package = jQuery(this).data("index");

		// active package tab
		jQuery('.agent_package_tab .nav-item .itinerary_pkg_tab').addClass('active show');
		jQuery('.agent_package_tab .nav-item .itinerary_itinerary_tab').removeClass('active').removeClass('show');
		jQuery('.agent_package_tab_content .agent_package_tab_pkg_content').addClass('active show');
		jQuery('.agent_package_tab_content .agent_package_tab_itinerary_content').removeClass('active').removeClass('show');
		jQuery('.btn_save_package').show();
		jQuery('.btn_save_itinerary').hide();

		// set itinerary package title
		jQuery('.itinerary_package_title').html('Standard');

		// active class
		jQuery(".add_package_option a").removeClass('active');
		jQuery(".pkg_option_" + req_package + " a").addClass('active');

		// set modal local storage
		jQuery.cookie('agent_added_packages', req_package, { expires: 24, path: '/' });
		jQuery.cookie('agent_selected_package', 1, { expires: 24, path: '/' });

		// get package city and night
		var city_night = add_package_default_city(true);

		// fetch selected packages content
		jQuery.ajax({
			type: "POST",
			url: base_url + "dashboard_selected_package_add",
			data: {
				'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
				'add_package'   : req_package
			},
	        success: function(response) {
	        	// check response is valid
	        	if(response) {
	        		// update content
	        		jQuery("#add_package_content").empty().html(response);

	        		// trigger resize window
					setTimeout(function() {
			            jQuery(window).trigger('resize');
			        }, 80);
	        	}
			}
	    });
	});

	// open modal package popup
	jQuery(document.body).on('click', '.package_modal_popup_open', function() {
		// get item data
		var item_index  	  = jQuery(this).data('index');
		var item_modal_type   = jQuery(this).data('modal_type');
		var item_modal_action = jQuery(this).data('modal_action');

		// set modal local storage
		jQuery.cookie('modal_index', item_index, { expires: 24, path: '/' });
		jQuery.cookie('modal_type', item_modal_type, { expires: 24, path: '/' });
		jQuery.cookie('modal_action', item_modal_action, { expires: 24, path: '/' });

		// open popup modal
		if(item_modal_type == 'hotel') {
			// open modal
			jQuery("#package_hotel_modal").modal("show");
		} else if(item_modal_type == 'sightseeing') {
			jQuery("#package_sightseeing_modal").modal("show");
		} else if(item_modal_type == 'activity') {
			jQuery("#package_activity_modal").modal("show");
		}
	});

	// update package meals count
	jQuery(document.body).on('click', '.package_item_inc_meals', function() {
		// get item data
		var item_index  = jQuery(this).data('index');
		var item_name  	= jQuery(this).data('item');
		var item_action = jQuery(this).data('action');
		var curr_count  = jQuery("input[name=package_item_" + item_index + "_" + item_name + "_count]").val();

		// perform count
		if(item_action == 'plus') {
			curr_count++;
		} else {
			curr_count--;
		}

		// check count
		var updated_count = (curr_count > 0) ? curr_count : 0;

		// update meal count
		jQuery(".package_item_" + item_index + "_" + item_name + "_count").html(updated_count);
		jQuery("input[name=package_item_" + item_index + "_" + item_name + "_count]").val(updated_count);
	});

	// define counter
	var term_item_index = 100;

	// add new terms items
	jQuery(document.body).on('click', '.add_new_terms', function() {
		// get item data
		var term_name = jQuery(this).data('term_name');

		// add new html content
		jQuery("." + term_name + "_item").append('<div class="row"><div class="col-12 col-md-6 col-lg-6 col-xl-6"><textarea name="' + term_name + '_item_' + term_item_index + '_1" rows="2"></textarea></div><div class="col-12 col-md-6 col-lg-6 col-xl-6"><textarea name="' + term_name + '_item_' + term_item_index + '_2" rows="2"></textarea></div></div>');

		// increment counter
		term_item_index = term_item_index + 1;
	});

	// shortable city and night items
	const dropCityItems = document.getElementById('package-city-night-items');
	if(dropCityItems) {
		new Sortable(dropCityItems, {
		    animation: 350,
		    chosenClass: "sortable-chosen",
		    dragClass: "sortable-drag"
		});
	}

	// shortable tour highlights
	const dropHighlightsItems = document.getElementById('tour-highlights-items');
	if(dropHighlightsItems) {
		new Sortable(dropHighlightsItems, {
		    animation: 350,
		    chosenClass: "sortable-chosen",
		    dragClass: "sortable-drag"
		});
	}
});

/**
 * add tags input in content
 */
function add_tags_input_content(element = '')
{
	// remove error
	jQuery("." + element + " #tags_input_error").hide().html();

	// get tag value
	var tag_name = jQuery("." + element + " #tag_name").val().trim().toLowerCase();

	// check tag length
	if(tag_name.length) {
		// check special charatcer
		if(/^[a-zA-Z0-9- ]*$/.test(tag_name) == false) {
			// show error message
			jQuery("." + element + " #tags_input_error").show().html('*Tags can only include spaces, letters, and numbers.');
		} else {
			// fetch tags list
			var tags_list = fetch_tags_list(element);

			// check in array tag is exist
			if(jQuery.inArray(tag_name, tags_list) !== -1) {
				// show error message
				jQuery("." + element + " #tags_input_error").show().html('*This tag is already added');
			} else {
				// check active tag
				var current_active_tags = jQuery('.' + element + ' .tag_item_content .tag_input .tag').length;

				// check tag count
				if(current_active_tags >= add_tags_limit) {
					// show limit message
					jQuery("." + element + " #tags_input_error").show().html('*Tag Limit Exceed.');
				} else {
					// add item
					jQuery('.' + element + ' .tag_input').append('<span class="tag label label-info tag-item-' + add_tags_index + '"><span id="input_tag_name">' + tag_name + '</span><span class="remove_tag" data-key="' + add_tags_index + '" data-role="remove"></span></span>');

					// increase tag index
					add_tags_index++;

					// check active tag
					var current_active_tags = jQuery('.' + element + ' .tag_item_content .tag_input .tag').length;

					// update tag limit
					var current_tags_limit = add_tags_limit - current_active_tags;

					// update tag limit
					if(current_tags_limit > 0) {
						// show limit for tags
						jQuery('.' + element + ' .tags_limit').html(current_tags_limit + ' to go!');

						// clear tag input
						jQuery('.' + element + ' #tag_name').val('');

						// autofocus tag
						jQuery('.' + element + ' #tag_name').focus();
					} else {
						// show limit for tags
						jQuery("." + element + " .tags_limit").html('');
					}

					// check tag limit
					if(add_tags_limit > current_active_tags) {
						jQuery("." + element + " #tag_name").prop('disabled', false);
						jQuery("." + element + " .tagsBlock1 .addInputSec .input-group .form-control").css('border-color', '#004963');
						jQuery("." + element + " .tagsBlock1 .addInputSec .input-group-append .input-group-text").css('border-color', '#004963');
						jQuery("." + element + " .add_tag_btn").css('color', '#004963');
					} else {
						jQuery("." + element + " #tags_input_error").show().html('*Tag Limit Exceed.');
						jQuery("." + element + " #tag_name").val('').prop('disabled', true);
						jQuery("." + element + " .tagsBlock1 .addInputSec .input-group .form-control").css('border-color', '#CCC');
						jQuery("." + element + " .tagsBlock1 .addInputSec .input-group-append .input-group-text").css('border-color', '#CCC');
						jQuery("." + element + " .add_tag_btn").css('color', '#CCC');
					}

					// remove error
					jQuery("." + element + " #tags_input_error").hide();
				}
			}
		}
	}
}

// add package default city
function add_package_default_city(return_content = false) {
	// define array
	var package_city_night = {};
	var city_html 		   = '';

	// get city and night
	var count_city_dwn = jQuery("#package-city-night-items .item").length;

	// fetch city and night data
	package_city_night['place_city']  = {};
	package_city_night['place_night'] = {};

	// check city night count
	if(count_city_dwn) {
		// fetch city
		jQuery('select[name=city]').each(function(key, value) {
			// get city name
			var city_name = jQuery(this).val();

			// push data in array
			package_city_night['place_city'][key + 1] = city_name;
		});

		// fetch night
		jQuery('select[name=night]').each(function(key, value) {
			// get night name
			var night_name = jQuery(this).val();

			// push data in array
			package_city_night['place_night'][key + 1] = night_name;
		});
	}

	// arrange content
	for(var index = 1; index <= count_city_dwn; index++) {
		city_html += '<p>' + package_city_night['place_city'][index] + ' (' + package_city_night['place_night'][index] + 'n)</p>';
	}

	// if set return content
	if(return_content) {
		return city_html;
	}

	// add package default city
	jQuery(".package-item-1 .package_city").html(city_html);
}

/**
 * fetch tags list
 */
function fetch_tags_list(element)
{
	// define array
	var tags_list = [];

	// check current tag count
	var current_active_tags = jQuery('.' + element + ' .tag_item_content .tag_input .tag').length;

	// check count
	if(current_active_tags) {
		// fetch tags
		jQuery('.' + element + ' .tag_item_content .tag_input .tag').each(function(index) {
			// get class name
			var class_name = jQuery(this).find('#input_tag_name').html();

			// push data in array
	        tags_list[index] = class_name.toLowerCase();
		});
	}

	// return response
	return tags_list;
}

/**
 * hide / show submit button on package tab
 */
jQuery(document.body).on('click', '.agent_package_tab .itinerary_pkg_tab', function() {
	// hide submit form button
	jQuery('.tour_package_visibility').hide();
	jQuery('#jquery-steps .actions').hide();

	// trigger resize window
	setTimeout(function() {
        jQuery(window).trigger('resize');
    }, 200);
});

/**
 * hide / show submit button on term tab
 */
jQuery(document.body).on('click', '.agent_package_tab .itinerary_itinerary_tab', function() {
	// hide submit form button
	jQuery('.tour_package_visibility').hide();
	jQuery('#jquery-steps .actions').hide();

	// trigger resize window
	setTimeout(function() {
        jQuery(window).trigger('resize');
    }, 200);
});

/**
 * hide / show submit button on term tab
 */
jQuery(document.body).on('click', '.agent_package_tab .itinerary_term_tab', function() {
	// get tour created status
    var is_tour_created_status = jQuery.cookie("is_tour_created_status");

    // check and update final button
    if(is_tour_created_status == true) {
    	// update form button
    	jQuery('#jquery-steps .actions').find('[aria-hidden="false"] a').html('Create Tour');
    } else {
    	// update form button
    	jQuery('#jquery-steps .actions').find('[aria-hidden="false"] a').html('Update');
    }

	// hide submit form button
	jQuery('.tour_package_visibility').show();
	jQuery('#jquery-steps .actions').show();

	// trigger resize window
	setTimeout(function() {
        jQuery(window).trigger('resize');
    }, 200);
});

/**
 * package itinerary term save tab
 */
jQuery(document.body).on('click', '.package_itinerary_term_tab', function() {
	// get ref data
	var ref_data = jQuery(this).data('ref');

	// check ref name
	if(ref_data == 'package') {
		jQuery('.btn_save_package').show();
		jQuery('.btn_save_itinerary').hide();
	} else if(ref_data == 'itinerary') {
		jQuery('.btn_save_package').hide();
		jQuery('.btn_save_itinerary').show();
	} else if(ref_data == 'terms') {
		jQuery('.btn_save_package').hide();
		jQuery('.btn_save_itinerary').hide();
	}
});

/**
 * on itinerary hotel modal
 */
jQuery(document.body).on('click', '.itinerary_hotel_modal_popup', function() {
	// get request data
	var day_no          = jQuery(this).data('day');
	var city_id         = jQuery(this).data('city_id');
	var city_country_id = jQuery(this).data('city_country_id');

	// reset city name and dropdown
	jQuery("#itinerary_hotel_city_name").empty();
	jQuery('#itinerary_hotel_modal .itinerary_hotel_city_list').hide();
	jQuery('#itinerary_hotel_modal .itinerary_hotel_country_name').val('');

	// clear modal search input
	jQuery('#itinerary_hotel_modal .search_hotel_input').val('');

	// reset rating filter
	jQuery('.hotel_modal_rating_filter img').removeClass('active_filter');

	// clear modal data
	jQuery('#itinerary_hotel_modal .hotel_items_content').html('<div class="col-12 col-md-12 col-lg-12 col-xl-12" style="text-align: center;padding: 100px 0px;"><span style="font-size: 18px;"><i class="fa fa-spinner fa-spin"></i> &nbsp;Loading hotels...</span></div>');
	jQuery('#itinerary_hotel_modal #hotel_room_category_modal').hide();
	jQuery('#itinerary_hotel_modal #hotel_room_category_modal tbody').empty();

	// check city name is valid
	if(day_no && city_id && city_country_id) {
		// set data in cookie
		jQuery.cookie('agent_itinerary_select_popup_day', day_no, { expires: 24, path: '/' });
		jQuery.cookie('agent_itinerary_select_popup_name', city_id, { expires: 24, path: '/' });
		jQuery.cookie('agent_itinerary_select_popup_modal', 'hotel', { expires: 24, path: '/' });

		// fetch hotel room data
		jQuery.ajax({
			type: "POST",
			url: base_url + "dashboard_selected_city_hotel_modal",
			data: {
				'csrf_mds_token' : jQuery.cookie(csfr_cookie_name),
				'city_id'        : city_id,
				'city_country_id': city_country_id,
			},
	        success: function(response) {
	        	// json parse
	        	var json_parse = JSON.parse(response);

	        	// set modal city name
				jQuery("#itinerary_hotel_city_name").html(json_parse.hotel_country_name);

				// set modal country name
				jQuery("#itinerary_hotel_modal .itinerary_hotel_country_name").val(json_parse.hotel_country_name);

        		// set content
        		if(json_parse.hotel_city_content) {
	        		jQuery('#itinerary_hotel_modal .itinerary_hotel_city_list').show().html(json_parse.hotel_city_content);
        		}
				
        		// set hotel content
	        	jQuery('#itinerary_hotel_modal .hotel_items_content').empty().html(json_parse.hotel_content);

	        	// init slick slider content
	        	init_slick_slider_content('.hotel_media_gallery');
			}
	    });
	} else {
		// show alert
		alert('Error: City is not selected.');
	}
});

/**
 * on itinerary sightseeing modal
 */
jQuery(document.body).on('click', '.itinerary_sightseeing_modal_popup', function() {
	// get request data
	var day_no          = jQuery(this).data('day');
	var city_id         = jQuery(this).data('city_id');
	var city_country_id = jQuery(this).data('city_country_id');

	// get selected sightseeing data
	var selected_sightseeing_data = fetch_tour_selected_sightseeing_data(day_no);

	// reset city name and dropdown
	jQuery("#itinerary_sightseeing_city_name").empty();
	jQuery('#itinerary_sightseeing_modal .itinerary_sightseeing_city_list').hide();
	jQuery('#itinerary_sightseeing_modal .itinerary_sightseeing_country_name').val('');

	// clear search modal input
	jQuery('#itinerary_sightseeing_modal .search_sightseeing_input').val('');

	// clear modal data
	jQuery('#itinerary_sightseeing_modal .sightseeing_items_content').html('<div class="col-12 col-md-12 col-lg-12 col-xl-12" style="text-align: center; padding: 100px 0px; color: #004963"><span style="font-size: 18px;"><i class="fa fa-spinner fa-spin"></i> &nbsp;Loading sightseeing...</span></div>');

	// hide sightseeing detail modal
	jQuery('#itinerary_sightseeing_modal #sightseeing_single_detail_modal').hide().html();

	// check city name is valid
	if(day_no && city_id && city_country_id) {
		// set data in cookie
		jQuery.cookie('agent_itinerary_select_popup_day', day_no, { expires: 24, path: '/' });
		jQuery.cookie('agent_itinerary_select_popup_name', city_id, { expires: 24, path: '/' });
		jQuery.cookie('agent_itinerary_select_popup_modal', 'sightseeing', { expires: 24, path: '/' });

		// fetch hotel room data
		jQuery.ajax({
			type: "POST",
			url: base_url + "dashboard_selected_city_sightseeing_modal",
			data: {
				'csrf_mds_token'           : jQuery.cookie(csfr_cookie_name),
				'city_id'                  : city_id,
				'city_country_id'          : city_country_id,
				'selected_sightseeing_data': JSON.stringify(selected_sightseeing_data)
			},
	        success: function(response) {
	        	// json parse
	        	var json_parse = JSON.parse(response);

	        	// set modal city name
				jQuery("#itinerary_sightseeing_city_name").html(json_parse.sightseeing_country_name);

				// set modal country name
				jQuery("#itinerary_sightseeing_modal .itinerary_sightseeing_country_name").val(json_parse.sightseeing_country_name);

        		// set content
        		if(json_parse.sightseeing_city_content) {
	        		jQuery('#itinerary_sightseeing_modal .itinerary_sightseeing_city_list').show().html(json_parse.sightseeing_city_content);
        		}
				
        		// set sightseeing content
	        	jQuery('#itinerary_sightseeing_modal .sightseeing_items_content').empty().html(json_parse.sightseeing_content);

	        	// init slider content
	        	init_slick_slider_content('.sightseeing_media_gallery');
			}
	    });
	} else {
		// show alert
		alert('Error: City is not selected.');
	}
});

/**
 * fetch tour selected sightseeing data
 */
function fetch_tour_selected_sightseeing_data(day_no)
{
	// define array
	var sightseeing_activity = [];

	// get count data
	var sightseeing_count = jQuery('#day_' + day_no + '_sightseeing_selection_details .hotel_stay_content').length;

	// check sightseeing data
	if(sightseeing_count) {
		// fetch row
		jQuery('#day_' + day_no + '_sightseeing_selection_details .hotel_stay_content').each(function(key, element) {
			// get hotel content
			var select_sightseeing_name = jQuery(this).find('.selected_item_id').val();

			// push data in array
			if(select_sightseeing_name) {
				// get activity name
				var activity_name = select_sightseeing_name.split('_');

				// push data in array
				sightseeing_activity.push(activity_name[0]);
			}
		});
	}

	// find unique value
	var unique_arr = sightseeing_activity.filter(function(itm, i, a) {
	    return i == a.indexOf(itm);
	});

	// return response
	return unique_arr;
}

/**
 * on itinerary point to point modal
 */
jQuery(document.body).on('click', '.itinerary_point_to_point_modal_popup', function() {
	// get request data
	var day_no = jQuery(this).data('day');

	// set data in cookie
	jQuery.cookie('agent_itinerary_select_popup_day', day_no, { expires: 24, path: '/' });
	jQuery.cookie('agent_itinerary_select_popup_modal', 'point_to_point', { expires: 24, path: '/' });
});

/**
 * on itinerary meal modal
 */
jQuery(document.body).on('click', '.itinerary_meal_modal_popup', function() {
	// get request data
	var day_no = jQuery(this).data('day');

	// set data in cookie
	jQuery.cookie('agent_itinerary_select_popup_day', day_no, { expires: 24, path: '/' });
	jQuery.cookie('agent_itinerary_select_popup_modal', 'meal', { expires: 24, path: '/' });
});

/**
 * on click package select customize tour
 */
jQuery(document.body).on('click', '.pkg_select_customize_tour', function() {
	// get request data
	var package_no   = jQuery(this).data('package_no');
	var package_name = jQuery(this).data('package_name');

	// set title name
	jQuery('.itinerary_package_title').html(package_name);

	// set data in cookie
	jQuery.cookie('agent_selected_package', package_no, { expires: 24, path: '/' });

	// active itinerary tab
	jQuery('.agent_package_tab .nav-item .itinerary_pkg_tab').removeClass('active').removeClass('show');
	jQuery('.agent_package_tab .nav-item .itinerary_itinerary_tab').addClass('active show');
	jQuery('.agent_package_tab_content .agent_package_tab_pkg_content').removeClass('active').removeClass('show');
	jQuery('.agent_package_tab_content .agent_package_tab_itinerary_content').addClass('active show');
	jQuery('.btn_save_package').hide();
	jQuery('.btn_save_itinerary').show();

	// fetch hotel room data
	jQuery.ajax({
		type: "POST",
		url: base_url + "dashboard_package_customize_itinerary",
		data: {
			'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
			'package_no'    : package_no
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
 * on select point to point trip type show field options
 */
jQuery('input[name=point_to_point_trip_type]').change(function() {
	// get trip type value
	var trip_type = jQuery('input[name=point_to_point_trip_type]:checked').val();

	// check type
	if(trip_type == 'One-way') {
		jQuery("#trip_one_way_field").show();
		jQuery("#trip_return_field").hide();
		jQuery("#trip_stand_by_field").hide();
	} else if(trip_type == 'Return') {
		jQuery("#trip_one_way_field").hide();
		jQuery("#trip_return_field").show();
		jQuery("#trip_stand_by_field").hide();
	} else if(trip_type == 'Stand by') {
		jQuery("#trip_one_way_field").hide();
		jQuery("#trip_return_field").hide();
		jQuery("#trip_stand_by_field").show();
	}
});

/**
 * on click modal add meal data
 */
jQuery(document.body).on('click', '#modal_add_meal_btn', function() {
	// show error msg
	jQuery('#modal_itinerary_meal_error').hide();

	// define value
	var meal_html_content = '';

	// get selected day
	var selected_days = jQuery.cookie("agent_itinerary_select_popup_day");

	// get data
	var modal_meal_breakfast = jQuery('input[name="modal_meal_breakfast"]:checked').val();
	var modal_meal_lunch     = jQuery('input[name="modal_meal_lunch"]:checked').val();
	var modal_meal_hitea     = jQuery('input[name="modal_meal_hitea"]:checked').val();
	var modal_meal_dinner    = jQuery('input[name="modal_meal_dinner"]:checked').val();

	// check data is valid
	if(modal_meal_breakfast || modal_meal_lunch || modal_meal_hitea || modal_meal_dinner) {
		// update meal breakfast content
		if(modal_meal_breakfast) {
			meal_html_content += '<div class="hotel_stay_select_details" style="margin-bottom: 10px"><div class="hotel_stay_content"><div class="hotel_stay_content_inner"><img src="' + base_url + 'assets/img/dinner.png" class="img-fluid"><div class="daysDetailTitle text-capitalize">' + modal_meal_breakfast + '</div></div><div class="deleteIcSec remove_itinerary_selection" title="Remove hotel"><i class="fa fa-times-circle"></i></div></div></div>';
		}

		// update meal lunch content
		if(modal_meal_lunch) {
			meal_html_content += '<div class="hotel_stay_select_details" style="margin-bottom: 10px"><div class="hotel_stay_content"><div class="hotel_stay_content_inner"><img src="' + base_url + 'assets/img/dinner.png" class="img-fluid"><div class="daysDetailTitle text-capitalize">' + modal_meal_lunch + '</div></div><div class="deleteIcSec remove_itinerary_selection" title="Remove hotel"><i class="fa fa-times-circle"></i></div></div></div>';
		}

		// update meal hitea content
		if(modal_meal_hitea) {
			meal_html_content += '<div class="hotel_stay_select_details" style="margin-bottom: 10px"><div class="hotel_stay_content"><div class="hotel_stay_content_inner"><img src="' + base_url + 'assets/img/dinner.png" class="img-fluid"><div class="daysDetailTitle text-capitalize">' + modal_meal_hitea + '</div></div><div class="deleteIcSec remove_itinerary_selection" title="Remove hotel"><i class="fa fa-times-circle"></i></div></div></div>';
		}

		// update meal dinner content
		if(modal_meal_dinner) {
			meal_html_content += '<div class="hotel_stay_select_details" style="margin-bottom: 10px"><div class="hotel_stay_content"><div class="hotel_stay_content_inner"><img src="' + base_url + 'assets/img/dinner.png" class="img-fluid"><div class="daysDetailTitle text-capitalize">' + modal_meal_dinner + '</div></div><div class="deleteIcSec remove_itinerary_selection" title="Remove hotel"><i class="fa fa-times-circle"></i></div></div></div>';
		}

		// update content
		jQuery('#day_' + selected_days + '_meal_selection_details').html(meal_html_content);

		// reset form
		jQuery('input[name="modal_meal_breakfast"]').prop('checked', false);
		jQuery('input[name="modal_meal_lunch"]').prop('checked', false);
		jQuery('input[name="modal_meal_hitea"]').prop('checked', false);
		jQuery('input[name="modal_meal_dinner"]').prop('checked', false);

		// close modal
		jQuery("#itinerary_meal_modal").modal('toggle');

		// unset previous cookie
		jQuery.cookie('agent_itinerary_select_popup_day', null, { expires: 0, path: '/' });
		jQuery.cookie('agent_itinerary_select_popup_name', null, { expires: 0, path: '/' });
		jQuery.cookie('agent_itinerary_select_popup_modal', null, { expires: 0, path: '/' });

		// trigger resize window
		setTimeout(function() {
	        jQuery(window).trigger('resize');
	    }, 100);
	} else {
		// show error msg
		jQuery('#modal_itinerary_meal_error').show();
		jQuery('#modal_itinerary_meal_error .poup-msg-error').html('*Please select at least one option.');
	}
});

/**
 * on click modal add suggested restaurant
 */
jQuery(document).ready(function() {
	jQuery(document.body).on('click', '#modal_add_suggested_restaurant_btn', function() {
		// get selected day
		var selected_days = jQuery.cookie("agent_itinerary_select_popup_day");

		// get form data
		var restaurant_meal_type     = jQuery('.restaurant_meal_type :selected').val();
		var selected_restaurant_list = jQuery(".search_restaurant_field :selected").map(function(i, el) {
			return jQuery(el).val();
		}).get();

		// check data is valid
		if(restaurant_meal_type && selected_restaurant_list.length) {
			// set html content
			var suggested_restaurant_content = '<div class="hotel_stay_select_details" style="margin-bottom: 10px"><div class="hotel_stay_content"><div class="hotel_stay_content_inner"><img src="' + base_url + 'assets/img/dinner.png" class="img-fluid"><div class="daysDetailTitle text-capitalize">Suggested restaurant for<br>' + restaurant_meal_type + ' - ' + selected_restaurant_list.join('/') + '</div></div><div class="deleteIcSec remove_itinerary_selection" title="Remove restaurant"><i class="fa fa-times-circle"></i></div></div></div>';

			// update content
			jQuery('#day_' + selected_days + '_meal_selection_details').prepend(suggested_restaurant_content);

			// unset previous cookie
			jQuery.cookie('agent_itinerary_select_popup_day', null, { expires: 0, path: '/' });
			jQuery.cookie('agent_itinerary_select_popup_name', null, { expires: 0, path: '/' });
			jQuery.cookie('agent_itinerary_select_popup_modal', null, { expires: 0, path: '/' });

			// close modal
			jQuery("#itinerary_meal_modal").removeClass('show').hide();
			jQuery(".modal-backdrop").removeClass('show');
			jQuery("#itinerary_meal_modal").modal('toggle');

			// reset restaurant selection
			jQuery('.search_restaurant_field').val('default');
			jQuery('.search_restaurant_field').selectpicker("refresh");

			// trigger resize window
			setTimeout(function() {
		        jQuery(window).trigger('resize');
		    }, 100);
		} else {
			alert('Please select at least one restaurant.');
		}
	});
});


/**
 * on click modal reset meal data
 */
jQuery(document.body).on('click', '#modal_reset_meal_btn', function() {
	// hide error msg
	jQuery('#modal_itinerary_meal_error').hide();

	// reset form data
	jQuery('input[name="modal_meal_breakfast"]').prop('checked', false);
	jQuery('input[name="modal_meal_lunch"]').prop('checked', false);
	jQuery('input[name="modal_meal_hitea"]').prop('checked', false);
	jQuery('input[name="modal_meal_dinner"]').prop('checked', false);
});

/**
 * on click modal add transportation data
 */
jQuery(document.body).on('click', '#modal_add_transportation_btn', function() {
	// get selected day
	var selected_days = jQuery.cookie("agent_itinerary_select_popup_day");

	// get data
	var point_to_point_trip_mode  = jQuery('input[name="trip_mode"]:checked').val();
	var point_to_point_trip_type  = jQuery('input[name="point_to_point_trip_type"]:checked').val();
	var point_to_point_trip_share = jQuery('input[name="point_to_point_trip_share"]:checked').val();
	var point_to_point_trip_guide = jQuery('input[name="trip_guide"]:checked').val();

	// one way field
	var trip_one_way_vehicle_from_field = jQuery('#trip_one_way_vehicle_from_field').val();
	var trip_one_way_pickup_from_field  = jQuery('#trip_one_way_pickup_from_field').val();
	var trip_one_way_drop_to_field      = jQuery('#trip_one_way_drop_to_field').val();
	var trip_one_way_airline            = jQuery('#trip_one_way_airline').val();
	var trip_one_way_class              = jQuery('#trip_one_way_class').val();
	var trip_one_way_duration_field     = jQuery('#trip_one_way_duration_field').val();

	// return field
	var trip_return_pickup_from_field = jQuery('#trip_return_pickup_from_field').val();
	var trip_return_visit_field       = jQuery('#trip_return_visit_field').val();
	var trip_return_return_to_field   = jQuery('#trip_return_return_to_field').val();
	var trip_one_way_boat_name        = jQuery('#trip_one_way_boat_name').val();
	var trip_return_airline           = jQuery('#trip_return_airline').val();
	var trip_return_class             = jQuery('#trip_return_class').val();
	var trip_return_duration_field    = jQuery('#trip_return_duration_field').val();

	// stand by field
	var trip_stand_by_pickup_from_field = jQuery('#trip_stand_by_pickup_from_field').val();
	var trip_stand_by_duration_field    = jQuery('#trip_stand_by_duration_field').val();

	// define array
	var input_field_arr   = [];
	var input_field_index = 0;

	// set content
	if(point_to_point_trip_type == 'One-way') {
		// push data in array
		if(point_to_point_trip_mode) {
			input_field_arr[input_field_index] = point_to_point_trip_mode; input_field_index++;
		}

		if(point_to_point_trip_type) {
			input_field_arr[input_field_index] = point_to_point_trip_type; input_field_index++;
		}

		if(point_to_point_trip_share) {
			var added_vehicle = (point_to_point_trip_mode == 'Arrival' || point_to_point_trip_mode == 'Departure' || point_to_point_trip_mode == 'Point to Point') ? ' Vehicle' : '';
			input_field_arr[input_field_index] = point_to_point_trip_share + added_vehicle; input_field_index++;
		}

		if(trip_one_way_vehicle_from_field) {
			input_field_arr[input_field_index] = trip_one_way_vehicle_from_field; input_field_index++;
		}

		if(trip_one_way_pickup_from_field) {
			input_field_arr[input_field_index] = trip_one_way_pickup_from_field; input_field_index++;
		}

		if(trip_one_way_drop_to_field) {
			input_field_arr[input_field_index] = trip_one_way_drop_to_field; input_field_index++;
		}

		if(trip_one_way_airline) {
			input_field_arr[input_field_index] = trip_one_way_airline; input_field_index++;
		}

		if(trip_one_way_class) {
			input_field_arr[input_field_index] = trip_one_way_class; input_field_index++;
		}

		if(trip_one_way_duration_field) {
			input_field_arr[input_field_index] = trip_one_way_duration_field + ' hours'; input_field_index++;
		}

		if(point_to_point_trip_guide) {
			input_field_arr[input_field_index] = point_to_point_trip_guide; input_field_index++;
		}

		// set content
		var trans_html_content = '<div class="hotel_stay_select_details" style="margin-bottom: 10px"><div class="hotel_stay_content"><div class="hotel_stay_content_inner"><img src="' + base_url + 'assets/img/plane.png" class="img-fluid"><div class="daysDetailTitle text-capitalize">' + input_field_arr.join(' - ') + '</div></div><div class="deleteIcSec remove_itinerary_selection" title="Remove hotel"><i class="fa fa-times-circle"></i></div></div>';
	} else if(point_to_point_trip_type == 'Return') {
		// push data in array
		if(point_to_point_trip_mode) {
			input_field_arr[input_field_index] = point_to_point_trip_mode; input_field_index++;
		}

		if(point_to_point_trip_type) {
			input_field_arr[input_field_index] = point_to_point_trip_type; input_field_index++;
		}

		if(point_to_point_trip_share) {
			var added_vehicle = (point_to_point_trip_mode == 'Arrival' || point_to_point_trip_mode == 'Departure' || point_to_point_trip_mode == 'Point to Point') ? ' Vehicle' : '';
			input_field_arr[input_field_index] = point_to_point_trip_share + added_vehicle; input_field_index++;
		}

		if(trip_return_pickup_from_field) {
			input_field_arr[input_field_index] = trip_return_pickup_from_field; input_field_index++;
		}

		if(trip_return_visit_field) {
			input_field_arr[input_field_index] = trip_return_visit_field; input_field_index++;
		}

		if(trip_return_return_to_field) {
			input_field_arr[input_field_index] = trip_return_return_to_field; input_field_index++;
		}

		if(trip_one_way_boat_name) {
			input_field_arr[input_field_index] = trip_one_way_boat_name; input_field_index++;
		}

		if(trip_return_airline) {
			input_field_arr[input_field_index] = trip_return_airline; input_field_index++;
		}

		if(trip_return_class) {
			input_field_arr[input_field_index] = trip_return_class; input_field_index++;
		}

		if(trip_return_duration_field) {
			input_field_arr[input_field_index] = trip_return_duration_field + ' hours'; input_field_index++;
		}

		if(point_to_point_trip_guide) {
			input_field_arr[input_field_index] = point_to_point_trip_guide; input_field_index++;
		}

		// set content
		var trans_html_content = '<div class="hotel_stay_select_details" style="margin-bottom: 10px"><div class="hotel_stay_content"><div class="hotel_stay_content_inner"><img src="' + base_url + 'assets/img/plane.png" class="img-fluid"><div class="daysDetailTitle text-capitalize">' + input_field_arr.join(' - ') + '</div></div><div class="deleteIcSec remove_itinerary_selection" title="Remove hotel"><i class="fa fa-times-circle"></i></div></div>';
	} else if(point_to_point_trip_type == 'Stand by') {
		// push data in array
		if(point_to_point_trip_mode) {
			input_field_arr[input_field_index] = point_to_point_trip_mode; input_field_index++;
		}

		if(point_to_point_trip_type) {
			input_field_arr[input_field_index] = point_to_point_trip_type; input_field_index++;
		}

		if(point_to_point_trip_share) {
			var added_vehicle = (point_to_point_trip_mode == 'Arrival' || point_to_point_trip_mode == 'Departure' || point_to_point_trip_mode == 'Point to Point') ? ' Vehicle' : '';
			input_field_arr[input_field_index] = point_to_point_trip_share + added_vehicle; input_field_index++;
		}

		if(trip_stand_by_pickup_from_field) {
			input_field_arr[input_field_index] = trip_stand_by_pickup_from_field; input_field_index++;
		}

		if(trip_stand_by_duration_field) {
			input_field_arr[input_field_index] = trip_stand_by_duration_field; input_field_index++;
		}

		if(point_to_point_trip_guide) {
			input_field_arr[input_field_index] = point_to_point_trip_guide; input_field_index++;
		}

		// set content
		var trans_html_content = '<div class="hotel_stay_select_details" style="margin-bottom: 10px"><div class="hotel_stay_content"><div class="hotel_stay_content_inner"><img src="' + base_url + 'assets/img/plane.png" class="img-fluid"><div class="daysDetailTitle text-capitalize">' + input_field_arr.join(' - ') + '</div></div><div class="deleteIcSec remove_itinerary_selection" title="Remove hotel"><i class="fa fa-times-circle"></i></div></div>';
	}

	// update content
	jQuery('#day_' + selected_days + '_point_to_point_selection_details').append(trans_html_content);

	// clear selection
	jQuery('#trip_one_way_pickup_from_field').val('');
	jQuery('#trip_one_way_drop_to_field').val('');
	jQuery('#trip_one_way_airline').val('');
	jQuery('#trip_one_way_class').val('');
	jQuery('#trip_one_way_duration_field').val('');
	jQuery('#trip_return_pickup_from_field').val('');
	jQuery('#trip_return_visit_field').val('');
	jQuery('#trip_return_return_to_field').val('');
	jQuery('#trip_one_way_boat_name').val('');
	jQuery('#trip_return_airline').val('');
	jQuery('#trip_return_class').val('');
	jQuery('#trip_return_duration_field').val('');
	jQuery('#trip_stand_by_pickup_from_field').val('');
	jQuery('#trip_stand_by_duration_field').val('');

	// reset selection
	jQuery('#itinerary_point_to_point_modal .durationFormsTabUL #arrival').prop('checked', true);
	jQuery('#itinerary_point_to_point_modal .durationFormsTabUL #one-way').prop('checked', true);

	// hide extra field
	jQuery('#itinerary_point_to_point_modal #trip_one_way_field .airline').removeClass('d-flex').hide();
	jQuery('#itinerary_point_to_point_modal #trip_one_way_field .class').removeClass('d-flex').hide();

	// reset field tab
	jQuery('#itinerary_point_to_point_modal #trip_one_way_field').addClass('tab-active').show();
	jQuery('#itinerary_point_to_point_modal #trip_return_field').removeClass('tab-active').hide();
	jQuery('#itinerary_point_to_point_modal #trip_stand_by_field').removeClass('tab-active').hide();

	// unset guide service
	jQuery('input[name="trip_guide"]').prop('checked', false);

	// close modal
	jQuery("#itinerary_point_to_point_modal").modal('toggle');

	// unset previous cookie
	jQuery.cookie('agent_itinerary_select_popup_day', null, { expires: 0, path: '/' });
	jQuery.cookie('agent_itinerary_select_popup_name', null, { expires: 0, path: '/' });
	jQuery.cookie('agent_itinerary_select_popup_modal', null, { expires: 0, path: '/' });

	// trigger resize window
	setTimeout(function() {
        jQuery(window).trigger('resize');
    }, 100);
});

/**
 * on click modal add sightseeing data
 */
jQuery(document.body).on('click', '.modal_add_sightseeing_btn', function() {
	// set field content
	var sightseeing_display_arr = [];
	var sightseeing_store_arr   = [];
	var display_index           = 0;
	var store_index             = 0;

	// get selected day
	var selected_days = jQuery.cookie("agent_itinerary_select_popup_day");

	// get req data
	var item_id    = jQuery(this).data('item_id');
	var item_field = '#modal_sightseeing_item_' + item_id;

	// get field data
	var sightseeing_tour_name        = jQuery(item_field + ' input[name="sightseeing_tour_name"]').val();
	var sightseeing_trans_type       = jQuery(item_field + ' input[name="sightseeing_trans_type"]:checked').val();
	var sightseeing_guide_type       = jQuery(item_field + ' input[name="sightseeing_guide_type"]:checked').val();
	var sightseeing_meal_with_lunch  = jQuery(item_field + ' input[name="sightseeing_meal_with_lunch"]:checked').val();
	var sightseeing_meal_with_dinner = jQuery(item_field + ' input[name="sightseeing_meal_with_dinner"]:checked').val();

	// check tour name
	if(sightseeing_tour_name) {
		sightseeing_display_arr[display_index] = sightseeing_tour_name;
		display_index += 1;
	}

	// check sightseeing trans type
	if(sightseeing_trans_type && sightseeing_trans_type != 'Not Required') {
		sightseeing_display_arr[display_index] = sightseeing_trans_type;
		sightseeing_store_arr[store_index] = sightseeing_trans_type;
		display_index += 1;
		store_index += 1;
	}

	// check sightseeing guide type
	if(sightseeing_guide_type) {
		sightseeing_display_arr[display_index] = sightseeing_guide_type;
		sightseeing_store_arr[store_index] = sightseeing_guide_type;
		display_index += 1;
		store_index += 1;
	}

	// check sightseeing meal
	if(sightseeing_meal_with_lunch || sightseeing_meal_with_dinner) {
		if(sightseeing_meal_with_lunch && sightseeing_meal_with_dinner) {
			sightseeing_display_arr[display_index] = "With Lunch & Dinner";
			sightseeing_store_arr[store_index] = "With Lunch & Dinner";
		} else if(!sightseeing_meal_with_lunch && sightseeing_meal_with_dinner) {
			sightseeing_display_arr[display_index] = "With Dinner";
			sightseeing_store_arr[store_index] = "With Dinner";
		} else if(sightseeing_meal_with_lunch && !sightseeing_meal_with_dinner) {
			sightseeing_display_arr[display_index] = "With Lunch";
			sightseeing_store_arr[store_index] = "With Lunch";
		}
		display_index += 1;
		store_index += 1;
	}

	// set html content
	var sightseeing_html_content = '<div class="hotel_stay_select_details" style="margin-bottom: 10px"><div class="hotel_stay_content"><div class="hotel_stay_content_inner"><input type="hidden" class="selected_item_id" value="' + item_id + '_' + sightseeing_store_arr.join(" - ") + '"><img src="' + base_url + 'assets/img/correct.png" class="img-fluid"><div class="daysDetailTitle text-capitalize">' + sightseeing_display_arr.join(" - ") + '</div></div><div class="deleteIcSec remove_itinerary_selection" title="Remove hotel"><i class="fa fa-times-circle"></i></div></div>';

	// update content
	jQuery('#day_' + selected_days + '_sightseeing_selection_details').append(sightseeing_html_content);

	// close modal
	jQuery("#itinerary_sightseeing_modal").modal('toggle');

	// unset previous cookie
	jQuery.cookie('agent_itinerary_select_popup_day', null, { expires: 0, path: '/' });
	jQuery.cookie('agent_itinerary_select_popup_name', null, { expires: 0, path: '/' });
	jQuery.cookie('agent_itinerary_select_popup_modal', null, { expires: 0, path: '/' });

	// trigger resize window
	setTimeout(function() {
        jQuery(window).trigger('resize');
    }, 100);
});

/**
 * on click modal select hotel room category
 */
jQuery(document.body).on('click', '.modal_select_hotel_room_btn', function() {
	// remove active class
	jQuery(".modal_select_hotel_room_btn").removeClass('active');

	// active button
	jQuery(this).addClass('active');

	// get req data
	var hotel_id = jQuery(this).data('hotel_id');

	// fetch hotel room data
	jQuery.ajax({
		type: "POST",
		url: base_url + "dashboard_hotel_room_modal",
		data: {
			'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
			'hotel_id'      : hotel_id
		},
        success: function(room_response) {
        	// check content is valid
        	if(room_response) {
        		// set content
	        	jQuery('#hotel_room_category_modal').show();
	        	jQuery('#hotel_room_category_modal tbody').html(room_response);

	        	// auto scroll to bottom content
	        	var section_offset = jQuery('#hotel_room_category_modal').offset();
				jQuery('#itinerary_hotel_modal').animate({
					scrollTop: 1500
				}, 'slow');
        	}
		}
    });
});

/**
 * on click modal open sightseeing details
 */
jQuery(document.body).on('click', '.modal_sightseeing_details_btn', function() {
	// get req data
	var sightseeing_id = jQuery(this).data('sightseeing_id');

	// fetch sightseeing data
	jQuery.ajax({
		type: "POST",
		url: base_url + "dashboard_sightseeing_detail_modal",
		data: {
			'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
			'sightseeing_id': sightseeing_id
		},
        success: function(response) {
        	// check content is valid
        	if(response) {
        		// set content
	        	jQuery('#sightseeing_single_detail_modal').show().html(response);

	        	// auto scroll to bottom content
	        	var section_offset = jQuery('#sightseeing_single_detail_modal').offset();
				jQuery('#itinerary_sightseeing_modal').animate({
					scrollTop: 2000
				}, 'slow');

				// init slick slider content
				init_slick_slider_content('.itinerary_sightseeing_gallery');
        	}
		}
    });
});

/**
 * on click modal close sightseeing details
 */
jQuery(document.body).on('click', '.close_sightseeing_detail_modal', function() {
	// hide modal and remove content
	jQuery('#sightseeing_single_detail_modal').hide().html('');
});

/**
 * on click modal add hotel data
 */
jQuery(document.body).on('click', '.modal_selected_hotel_btn', function() {
	// get selected day
	var selected_days = jQuery.cookie("agent_itinerary_select_popup_day");

	// get req data
	var hotel_id         = jQuery(this).data('hotel_id');
	var hotel_name       = jQuery(this).data('hotel_name');
	var room_category_id = jQuery(this).data('room_category_id');
	var room_category    = jQuery(this).data('room_category');

	// set hotel content
	var hotel_content = (room_category) ? hotel_name + ' (' + room_category + ')' : hotel_name;

	// set html content
	var hotel_html_content = '<div class="hotel_stay_select_details" style="margin-bottom: 10px"><div class="hotel_stay_content"><div class="hotel_stay_content_inner"><input type="hidden" class="select_hotel_id" value="' + hotel_id + '"><input type="hidden" class="select_hotel_category" value="' + room_category_id + '"><img src="' + base_url + 'assets/img/hotel.png" class="img-fluid"><div class="daysDetailTitle text-capitalize">' + hotel_content + '</div></div></div><div class="deleteIcSec remove_itinerary_selection" title="Remove hotel"><i class="fa fa-times-circle"></i></div>';

	// update content
	jQuery('#day_' + selected_days + '_hotel_selection_details').append(hotel_html_content);

	// remove selection room data
	jQuery('#hotel_room_category_modal tbody').html('');
	jQuery('#hotel_room_category_modal').hide();

	// remove active class
	jQuery(".modal_select_hotel_room_btn").removeClass('active');

	// close modal
	jQuery("#itinerary_hotel_modal").modal('toggle');

	// unset previous cookie
	jQuery.cookie('agent_itinerary_select_popup_day', null, { expires: 0, path: '/' });
	jQuery.cookie('agent_itinerary_select_popup_name', null, { expires: 0, path: '/' });
	jQuery.cookie('agent_itinerary_select_popup_modal', null, { expires: 0, path: '/' });

	// trigger resize window
	setTimeout(function() {
        jQuery(window).trigger('resize');
    }, 100);
});

/**
 * on click save itinerary data
 */
jQuery(document.body).on('click', '.btn_save_itinerary', function() {
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

	// get selected day
	var package_no    = jQuery.cookie("agent_selected_package");
	var selected_days = jQuery.cookie("agent_selected_night_count");

	// fetch itinerary day data
	for(var day = 1; day <= selected_days; day++) {
		// define array
		itinerary_data[index]    = {};
		var itinerary_details    = [];
		var hotel_stay           = [];
		var sightseeing_activity = [];
		var transportation_guide = [];
		var meals                = [];

		// push data in array
		itinerary_data[index]['package_no']      = package_no;
		itinerary_data[index]['day_no']          = day;
		itinerary_data[index]['itinerary_title'] = jQuery('.itinerary_day_' + day + ' .itinaery_title').html();

		// get itinerary day details
		var itinerary_day_details = jQuery('.itinerary_day_' + day + ' .itinerary_day_details .item');
		if(itinerary_day_details.length) {
			jQuery(itinerary_day_details).each(function(index) {
				const line_item = jQuery(this).find('.itinerary_single_item').html();
				itinerary_details.push(line_item);
			});
		}

		/*// get count data
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
		}*/

		// push data in array
		itinerary_data[index]['itinerary_details']    = itinerary_details;
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
		url: base_url + "dashboard_save_itinerary_data",
		data: {
			'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
			'itinerary_data': JSON.stringify(itinerary_data),
		},
		beforeSend: function() {
			// show loader
			jQuery('.btn_save_itinerary').html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Save Itinerary');

			// hide msg
			jQuery("#save_package_msg").hide();
		},
		success: function(response) {
			// check response is valid
        	if(response) {
        		// check transportation count
        		/*if(total_transportation_arrival) {
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
				jQuery('#tour_package_' + package_no + ' #pkg_meals_hitea_count').html(total_selected_meal_hi_tea);*/

				// show success msg
				jQuery("#save_package_msg").show().css('color', '#004963').html("Itinerary data Saved!");
				setTimeout(function() {
					jQuery("#save_package_msg").hide();
				}, 5000);
        	}
		},
		complete: function() {
			// stop loader
			jQuery('.btn_save_itinerary').html('Save Itinerary');
		}
    });
});

/**
 * on click copy standard stay package
 */
jQuery(document.body).on('click', '.pkg_select_copy_tour', function() {
	// get selected day
	var selected_days = jQuery.cookie("agent_itinerary_select_popup_day");

	// show loader
	var is_btn_title = jQuery(this).html();
	jQuery(this).attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;' + is_btn_title);

	// get req data
	var copy_package_name = jQuery(this).data('copy_package_name');
	var copy_package_no   = jQuery(this).data('copy_package_no');
	var package_no        = jQuery(this).data('package_no');

	// get summary data from requested package
	var total_selected_stay           = jQuery('#tour_package_' + copy_package_no + ' #pkg_selected_hotel_count').html();
	var total_selected_sightseeing    = jQuery('#tour_package_' + copy_package_no + ' #pkg_selected_sightseeing_count').html();
	var selected_transportation       = jQuery('#tour_package_' + copy_package_no + ' #pkg_selected_transportation').html();
	var total_selected_meal_breakfast = jQuery('#tour_package_' + copy_package_no + ' #pkg_meals_breakfast_count').html();
	var total_selected_meal_lunch     = jQuery('#tour_package_' + copy_package_no + ' #pkg_meals_lunch_count').html();
	var total_selected_meal_dinner    = jQuery('#tour_package_' + copy_package_no + ' #pkg_meals_dinner_count').html();
	var total_selected_meal_hi_tea    = jQuery('#tour_package_' + copy_package_no + ' #pkg_meals_hitea_count').html();
	var b2b_price_adult               = jQuery('#tour_package_' + copy_package_no + ' #b2b_price_adult').val();
	var b2b_price_child_3_7           = jQuery('#tour_package_' + copy_package_no + ' #b2b_price_child_3_7').val();
	var b2b_price_child_8_12          = jQuery('#tour_package_' + copy_package_no + ' #b2b_price_child_8_12').val();
	var b2b_price_infact_0_2          = jQuery('#tour_package_' + copy_package_no + ' #b2b_price_infact_0_2').val();
	var b2c_price_adult               = jQuery('#tour_package_' + copy_package_no + ' #b2c_price_adult').val();
	var b2c_price_child_3_7           = jQuery('#tour_package_' + copy_package_no + ' #b2c_price_child_3_7').val();
	var b2c_price_child_8_12          = jQuery('#tour_package_' + copy_package_no + ' #b2c_price_child_8_12').val();
	var b2c_price_infact_0_2          = jQuery('#tour_package_' + copy_package_no + ' #b2c_price_infact_0_2').val();

	// fetch hotel room data
	jQuery.ajax({
		type: "POST",
		url: base_url + "dashboard_copy_package_data",
		data: {
			'csrf_mds_token' : jQuery.cookie(csfr_cookie_name),
			'copy_package_no': copy_package_no,
			'package_no'     : package_no
		},
        success: function(response) {
        	// check response is valid
        	if(response) {
        		// update package summary
				jQuery('#tour_package_' + package_no + ' #pkg_selected_hotel_count').html(total_selected_stay);
				jQuery('#tour_package_' + package_no + ' #pkg_selected_sightseeing_count').html(total_selected_sightseeing);
				jQuery('#tour_package_' + package_no + ' #pkg_selected_transportation').html(selected_transportation);
				jQuery('#tour_package_' + package_no + ' #pkg_meals_breakfast_count').html(total_selected_meal_breakfast);
				jQuery('#tour_package_' + package_no + ' #pkg_meals_lunch_count').html(total_selected_meal_lunch);
				jQuery('#tour_package_' + package_no + ' #pkg_meals_dinner_count').html(total_selected_meal_dinner);
				jQuery('#tour_package_' + package_no + ' #pkg_meals_hitea_count').html(total_selected_meal_hi_tea);
				jQuery('#tour_package_' + package_no + ' #b2b_price_adult').val(b2b_price_adult);
				jQuery('#tour_package_' + package_no + ' #b2b_price_child_3_7').val(b2b_price_child_3_7);
				jQuery('#tour_package_' + package_no + ' #b2b_price_child_8_12').val(b2b_price_child_8_12);
				jQuery('#tour_package_' + package_no + ' #b2b_price_infact_0_2').val(b2b_price_infact_0_2);
				jQuery('#tour_package_' + package_no + ' #b2c_price_adult').val(b2c_price_adult);
				jQuery('#tour_package_' + package_no + ' #b2c_price_child_3_7').val(b2c_price_child_3_7);
				jQuery('#tour_package_' + package_no + ' #b2c_price_child_8_12').val(b2c_price_child_8_12);
				jQuery('#tour_package_' + package_no + ' #b2c_price_infact_0_2').val(b2c_price_infact_0_2);

	        	// stop loader
				jQuery('#tour_package_' + package_no + ' .pkg_select_copy_tour').attr('disabled', false).html(is_btn_title);

				// show success msg
				jQuery("#save_package_msg").show().css('color', '#004963').html("Success! Package copied from " + copy_package_name + "!");
        	} else {
        		// show error msg
				jQuery("#save_package_msg").show().css('color', '#fa4c46').html("Oops! Something went wrong. Try again later.");
        	}

        	// hide error
        	setTimeout(function() { jQuery("#save_package_msg").hide(); }, 5000);
		}
    });
});

/**
 * on click save package data
 */
jQuery(document.body).on('click', '.btn_save_package', function() {
	// hide error message
	jQuery("#save_package_msg").css('color', '#004963').hide();

	// define array
	var package_arr = [];

	// get tour is created or not
	var total_package = jQuery.cookie("agent_added_packages");

	// define blank data
	var is_show_error = false;

	// fetch package
	var index = 0;
	for(var package = 1; package <= total_package; package++) {
		// define array
		package_arr[index] = {};

		// get package data
		var package_name          = jQuery("#tour_package_" + package + " .packagesdetailTitle .packTitle").text();
		var package_status        = jQuery("#tour_package_" + package + " input[name='package_" + package + "_status']:checked").val();
		var total_meals_breakfast = jQuery("#tour_package_" + package + " #pkg_meals_breakfast_count").text();
		var total_meals_lunch     = jQuery("#tour_package_" + package + " #pkg_meals_lunch_count").text();
		var total_meals_dinner    = jQuery("#tour_package_" + package + " #pkg_meals_dinner_count").text();
		var total_meals_hi_tea    = jQuery("#tour_package_" + package + " #pkg_meals_hitea_count").text();

		// get package b2b price
		var b2b_price_adult      = jQuery("#tour_package_" + package + " #b2b_price_adult").val();
		var b2b_price_child_3_7  = jQuery("#tour_package_" + package + " #b2b_price_child_3_7").val();
		var b2b_price_child_8_12 = jQuery("#tour_package_" + package + " #b2b_price_child_8_12").val();
		var b2b_price_infact_0_2 = jQuery("#tour_package_" + package + " #b2b_price_infact_0_2").val();

		// get package b2c price
		var b2c_price_adult      = jQuery("#tour_package_" + package + " #b2c_price_adult").val();
		var b2c_price_child_3_7  = jQuery("#tour_package_" + package + " #b2c_price_child_3_7").val();
		var b2c_price_child_8_12 = jQuery("#tour_package_" + package + " #b2c_price_child_8_12").val();
		var b2c_price_infact_0_2 = jQuery("#tour_package_" + package + " #b2c_price_infact_0_2").val();

		// check price is valid
		if(b2b_price_adult == '' || b2b_price_child_3_7 == '' || b2b_price_child_8_12 == '' || b2b_price_infact_0_2 == '' || b2c_price_adult == '' || b2c_price_child_3_7 == '' || b2c_price_child_8_12 == '' || b2c_price_infact_0_2 == '') {
			is_show_error = true;
		}

		// push data in array
		package_arr[index]['package_no']            = package;
		package_arr[index]['package_name']          = jQuery.trim(package_name);
		package_arr[index]['package_status']        = package_status;
		package_arr[index]['total_meals_breakfast'] = jQuery.trim(total_meals_breakfast);
		package_arr[index]['total_meals_lunch']     = jQuery.trim(total_meals_lunch);
		package_arr[index]['total_meals_dinner']    = jQuery.trim(total_meals_dinner);
		package_arr[index]['total_meals_hi_tea']    = jQuery.trim(total_meals_hi_tea);
		package_arr[index]['b2b_price_adult']       = (b2b_price_adult) ? b2b_price_adult : 0;
		package_arr[index]['b2b_price_child_3_7']   = (b2b_price_child_3_7) ? b2b_price_child_3_7 : 0;
		package_arr[index]['b2b_price_child_8_12']  = (b2b_price_child_8_12) ? b2b_price_child_8_12 : 0;
		package_arr[index]['b2b_price_infact_0_2']  = (b2b_price_infact_0_2) ? b2b_price_infact_0_2 : 0;
		package_arr[index]['b2c_price_adult']       = (b2c_price_adult) ? b2c_price_adult : 0;
		package_arr[index]['b2c_price_child_3_7']   = (b2c_price_child_3_7) ? b2c_price_child_3_7 : 0;
		package_arr[index]['b2c_price_child_8_12']  = (b2c_price_child_8_12) ? b2c_price_child_8_12 : 0;
		package_arr[index]['b2c_price_infact_0_2']  = (b2c_price_infact_0_2) ? b2c_price_infact_0_2 : 0;

		// increment index
		index++;
	}

	// check error is set
	if(is_show_error) {
		jQuery("#save_package_msg").show().css('color', '#fa4c46').html('Please enter package price');
		return false;
	}

	// agent save package data
	jQuery.ajax({
		type: "POST",
		url: base_url + "dashboard_save_package_data",
		data: {
			'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
			'package_data'  : JSON.stringify(package_arr)
		},
		beforeSend: function() {
			// show loader
			jQuery('.btn_save_package').html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Save Package');

			// hide msg
			jQuery("#save_package_msg").hide();
		},
		success: function(response) {
			// check response is valid
        	if(response) {
        		// show success msg
				jQuery("#save_package_msg").show().css('color', '#004963').html("Package data Saved!");
				setTimeout(function() { jQuery("#save_package_msg").hide(); }, 5000);
        	}
		},
		complete: function() {
			// stop loader
			jQuery('.btn_save_package').html('Save Package');
		}
    });
});

/**
 * on click add tour terms item
 */
var item_key = 1001;
jQuery(document.body).on('click', '.terms_add_item', function() {
	// get reqested data
	var tab_name = jQuery(this).data('tab');

	// check name is valid
	if(tab_name) {
		// set placeholder title
		if(tab_name == 'made_to_order') {
			var placeholder_title_1 = 'Enter made to order term';
			var placeholder_title_2 = 'Enter made to order term';
		} else if(tab_name == 'what_included') {
			var placeholder_title_1 = "Enter what's included term";
			var placeholder_title_2 = "Enter what's included term";
		} else if(tab_name == 'what_not_included') {
			var placeholder_title_1 = "Enter what's not included term";
			var placeholder_title_2 = "Enter what's not included term";
		} else if(tab_name == 'protect_your_travel') {
			var placeholder_title_1 = 'Enter protect your travel term';
			var placeholder_title_2 = 'Enter protect your travel term';
		} else if(tab_name == 'terms_conditions') {
			var placeholder_title_1 = 'Enter terms conditions term';
			var placeholder_title_2 = 'Enter terms conditions term';
		} else if(tab_name == 'important_notes') {
			var placeholder_title_1 = 'Enter important notes term';
			var placeholder_title_2 = 'Enter important notes term';
		} else if(tab_name == 'cancellation_policy') {
			var placeholder_title_1 = 'Enter cancellation policy term';
			var placeholder_title_2 = 'Enter cancellation policy term';
		} else if(tab_name == 'faqs') {
			var placeholder_title_1 = 'Enter faq question';
			var placeholder_title_2 = 'Enter faq answer';
		}

		// set item content
		var tab_content = '<div class="row termsRemoveblock item item-' + item_key + '" style="margin-bottom: 10px"><div class="col-12 col-md-6 col-lg-6 col-xl-6"><input type="text" name="first_item" id="first_item" class="form-control terms_input" autocomplete="off" placeholder="' + placeholder_title_1 + '"></div><div class="col-12 col-md-6 col-lg-6 col-xl-6 TermsMain_tab"><input type="text" name="second_item" id="second_item" autocomplete="off" class="form-control terms_input" placeholder="' + placeholder_title_2 + '"><div class="closeIconStep closeTermsIcon remove_term_item" data-item_key="' + item_key + '" data-tab="' + tab_name + '"><ion-icon name="close-circle-outline" class="CloseIcon md hydrated"></ion-icon></div></div></div>';

		// increment key
		item_key += 1;

		// append html content
		jQuery('.terms_' + tab_name + '_content').append(tab_content);
	}
});

/**
 * on click remove tour terms item
 */
jQuery(document.body).on('click', '.remove_term_item', function() {
	// get reqested data
	var item_key = jQuery(this).data('item_key');
	var tab_name = jQuery(this).data('tab');

	// remove item
	jQuery('.terms_' + tab_name + '_content .item-' + item_key).remove();
});

/**
 * on keyup search hotel for package
 */
jQuery('.search_hotel_input').keyup(function() {
	// remove active filter
	jQuery('.hotel_modal_rating_filter img').removeClass('active_filter');

	// apply hotel filter
	itinerary_search_hotel_data();
});

/**
 * on select city for search hotel
 */
jQuery('.itinerary_hotel_city_list').change(function() {
	// remove active filter
	jQuery('.hotel_modal_rating_filter img').removeClass('active_filter');

	// apply hotel filter
	itinerary_search_hotel_data();
});

/**
 * on click apply rating filter for hotel modal
 */
jQuery(document.body).on('click', '.hotel_modal_rating_filter', function() {
	// fetch is active rating
	var is_active_filter = jQuery(this).find('img').hasClass('active_filter');

	// hide room category modal
	jQuery('#hotel_room_category_modal').hide();

	// check is active or not
	if(is_active_filter == true) {
		// set reset flag
		var is_reset = 1;

		// remove active class
		jQuery(this).find('img').removeClass('active_filter');
	} else {
		// set reset flag
		var is_reset = 0;

		// remove active filter
		jQuery('.hotel_modal_rating_filter img').removeClass('active_filter');

		// active filter
		jQuery(this).find('img').addClass('active_filter');
	}

	// apply filter
	itinerary_search_hotel_data();
});

/**
 * itinerary search hotel data
 */
function itinerary_search_hotel_data()
{
	// get request data
	var hotel_rating       = get_hotel_rating_filter_data();
	var hotel_keyword      = jQuery('#itinerary_hotel_modal .search_hotel_input').val();
	var hotel_country_name = jQuery('#itinerary_hotel_modal .itinerary_hotel_country_name').val();
	var hotel_city_name    = jQuery('#itinerary_hotel_modal .itinerary_hotel_city_list :selected').val();

	// check keyword length
	if(hotel_keyword.length > 3) {
		// show loading for search
		jQuery('#itinerary_hotel_modal .hotel_items_content').html('<div class="col-12 col-md-12 col-lg-12 col-xl-12" style="text-align: center;padding: 100px 0px;"><span style="font-size: 18px;"><i class="fa fa-spinner fa-spin"></i> &nbsp;Searching for hotels...</span></div>');

		// set reset flag
		var is_reset = 0;
	} else {
		// set reset flag
		var is_reset = 1;
	}

	// search hotel in modal
	jQuery.ajax({
		type: "POST",
		url: base_url + "dashboard_search_hotel",
		data: {
			'csrf_mds_token'    : jQuery.cookie(csfr_cookie_name),
			'rating'            : hotel_rating,
			'hotel_keyword'     : hotel_keyword,
			'hotel_country_name': hotel_country_name,
			'hotel_city_name'   : hotel_city_name,
			'is_reset'          : is_reset
		},
		success: function(hotel_response) {
			// check hotel response is valid
        	if(hotel_response) {
        		// set hotel content
	        	jQuery('#itinerary_hotel_modal .hotel_items_content').empty().html(hotel_response);

	        	// init slick slider content
	        	init_slick_slider_content('.hotel_media_gallery');
        	}
		}
    });
}

/**
 * on keyup search sightseeing
 */
jQuery('.search_sightseeing_input').keyup(function() {
	itinerary_search_sightseeing_data();
});

/**
 * on change search sightseeing city
 */
jQuery('.itinerary_sightseeing_city_list').change(function() {
	itinerary_search_sightseeing_data();
});

/**
 * search itinerary sightseeing data
 */
function itinerary_search_sightseeing_data()
{
	// get requested data
	var sightseeing_keyword      = jQuery('#itinerary_sightseeing_modal .search_sightseeing_input').val();
	var sightseeing_country_name = jQuery('#itinerary_sightseeing_modal .itinerary_sightseeing_country_name').val();
	var sightseeing_city_name    = jQuery('#itinerary_sightseeing_modal .itinerary_sightseeing_city_list :selected').val();

	// get cookie value
	var day_no = jQuery.cookie("agent_itinerary_select_popup_day");

	// hide sightseeing details modal
	jQuery('#sightseeing_single_detail_modal').hide().html();

	// check keyword length
	if(sightseeing_keyword.length > 3) {
		// show loading for search
		jQuery('#itinerary_sightseeing_modal .sightseeing_items_content').html('<div class="col-12 col-md-12 col-lg-12 col-xl-12" style="text-align: center;padding: 100px 0px;"><span style="font-size: 18px;"><i class="fa fa-spinner fa-spin"></i> &nbsp;Searching for sightseeing...</span></div>');

		// set reset flag
		var is_reset = 0;
	} else {
		// set reset flag
		var is_reset = 1;
	}

	// get selected sightseeing data
	var selected_sightseeing_data = fetch_tour_selected_sightseeing_data(day_no);

	// search sightseeing in modal
	jQuery.ajax({
		type: "POST",
		url: base_url + "dashboard_search_sightseeing",
		data: {
			'csrf_mds_token'           : jQuery.cookie(csfr_cookie_name),
			'sightseeing_keyword'      : sightseeing_keyword,
			'sightseeing_country_name' : sightseeing_country_name,
			'sightseeing_city_name'    : sightseeing_city_name,
			'selected_sightseeing_data': JSON.stringify(selected_sightseeing_data),
			'is_reset'                 : is_reset
		},
		success: function(sightseeing_response) {
			// check hotel response is valid
        	if(sightseeing_response) {
        		// set hotel content
	        	jQuery('#itinerary_sightseeing_modal .sightseeing_items_content').empty().html(sightseeing_response);

	        	// init slick slider content
	        	init_slick_slider_content('.sightseeing_media_gallery');
        	}
		}
    });
}

/**
 * on click remove itinerary selection item
 */
jQuery(document.body).on('click', '.remove_itinerary_selection', function() {
	// get selected data
	const day_no  = jQuery(this).data('day_no');
	const item_no = jQuery(this).data('item_no');

	// remove itinerary item
	jQuery('.drag_drop_itinerary_line_' + day_no + ' .item_' + item_no).remove();
});

/**
 * on click active upload is primary
 */
jQuery(document.body).on('click', '.upload_image_is_primary', function() {
	// hide error msg
	jQuery('.upload_custom_image_error').html('');

	// get primary image no
	var upload_no = jQuery(this).data('image_no');

	// get image is empty or not
	var is_fill_img = jQuery('#custom_gallery_preview #image' + upload_no + ' img').hasClass('added_img');

	// check fill img
	if(is_fill_img) {
		// set primary image in crop section
		var primary_img_path = jQuery('#custom_gallery_preview #image' + upload_no + ' img').attr('src');
		jQuery('.imgThumbanailinoutZoom img').attr('src', primary_img_path);

		// remove primary class
		jQuery('.upload_image_is_primary').removeClass('active_primary_img');

		// active primary image
		jQuery(this).addClass('active_primary_img');

		// set in cookie
		jQuery.cookie('agent_upload_image_is_primary', upload_no, { expires: 24, path: '/' });
	} else {
		// show error msg
		jQuery('.upload_img_text').css('margin-bottom', '3px');
		jQuery('.upload_custom_image_error').show().css('margin-bottom', '15px').html('*Please upload the image before making the primary.<br>');
	}
});

/**
 * on click remove upload image
 */
jQuery(document.body).on('click', '.upload_image_remove', function() {
	// hide error msg
	jQuery('.upload_custom_image_error').html('');

	// get primary image no
	var upload_no = jQuery(this).data('image_no');

	// get image is empty or not
	var is_fill_img = jQuery('#custom_gallery_preview #image' + upload_no + ' img').hasClass('added_img');
	var is_primary  = jQuery('#custom_gallery_preview #image' + upload_no + ' .upload_image_is_primary').hasClass('active_primary_img');

	// check fill img
	if(is_fill_img && !is_primary) {
		// set image path
		if(upload_no == 0) {
			var is_upload_path = base_url + 'assets/img/agent/primary-photo.png';
		} else if(upload_no == 1) {
			var is_upload_path = base_url + 'assets/img/agent/sightseeing-photo.png';
		} else if(upload_no == 2) {
			var is_upload_path = base_url + 'assets/img/agent/sightseeing-photo.png';
		} else if(upload_no == 3) {
			var is_upload_path = base_url + 'assets/img/agent/sightseeing-photo.png';
		} else if(upload_no == 4) {
			var is_upload_path = base_url + 'assets/img/agent/hotel-photo.png';
		} else if(upload_no == 5) {
			var is_upload_path = base_url + 'assets/img/agent/sightseeing-photo.png';
		} else if(upload_no == 6) {
			var is_upload_path = base_url + 'assets/img/agent/room-photo.png';
		} else if(upload_no == 7) {
			var is_upload_path = base_url + 'assets/img/agent/sightseeing-photo.png';
		} else if(upload_no == 8) {
			var is_upload_path = base_url + 'assets/img/agent/happy-guest-photo.png';
		}

		// update upload image path
		jQuery('#custom_gallery_preview #image' + upload_no + ' img').attr('src', is_upload_path);

		// remove added class
		jQuery('#custom_gallery_preview #image' + upload_no + ' img').addClass('empty_img').removeClass('added_img');

		// hide element
		jQuery('#custom_gallery_preview #image' + upload_no + ' .upload_image_is_primary').hide();
		jQuery('#custom_gallery_preview #image' + upload_no + ' .upload_image_remove').hide();
	} else {
		// show error msg
		jQuery('.upload_img_text').css('margin-bottom', '3px');
		jQuery('.upload_custom_image_error').show().css('margin-bottom', '15px').html("*Can't remove the primary image.<br>");
	}
});

/**
 * get apply hotel rating filter data
 */
function get_hotel_rating_filter_data()
{
	// define rating
	var rating = '';

	// get element
	var rating_element = jQuery('#itinerary_hotel_modal .ratingPopup ul li');

	// fetch rating element
	jQuery.each(rating_element, function(index, element) {
		// get rating no
		var rating_no = jQuery(this).find('.hotel_modal_rating_filter').data('rating');

		// check active class
		var is_active = jQuery(this).find('.hotel_modal_rating_filter img').hasClass('active_filter');

		// check is active rating
		if(is_active) {
			rating = rating_no;
			return false;
		}
    });

	// return rating
	return rating;
}

/**
 * agent get city from country
 */
jQuery(document.body).on('change', '.agent_get_city_from_country', function() {
	// get selected value
	var country_id = jQuery(this).val();
	var item_key   = jQuery(this).data('key');

	// check data is valid
	if(country_id && item_key) {
		// fetch cities
		jQuery.ajax({
		    type: "POST",
		    url: base_url + "dashboard/agent_get_city_from_country",
		    data: {
				'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
				'country_id'    : country_id
			},
		    success: function(response) {
	    		// set content
	    		jQuery('.city-item-' + item_key + ' .city .form-control').html(response);
		    }
		});
	} else {
		// set content
	    jQuery('.city-item-' + item_key + ' .city .form-control').html('<option value="">--Select--</option>');
	}
});

/**
 * on transportation modal selection
 */
jQuery(document.body).on('click', 'input[name=trip_mode]', function() {
	// get selected trip mode
	var trip_mode = jQuery(this).val();

	// define modal class
	var modal_class = '#point_to_point_transportation_modal ';

	// check trip mode
	if(trip_mode == 'Arrival') {
		// active trip type
		jQuery(modal_class + '.durationFormsTabUL .one_way').show();
		jQuery(modal_class + '.durationFormsTabUL .return').hide();
		jQuery(modal_class + '.durationFormsTabUL .standby').show();

		// active one way
		jQuery(modal_class + '.durationFormsTabUL #one-way').prop('checked', true);

		// active field tab
		jQuery(modal_class + '#trip_one_way_field').addClass('tab-active').show();
		jQuery(modal_class + '#trip_return_field').removeClass('tab-active').hide();
		jQuery(modal_class + '#trip_stand_by_field').removeClass('tab-active').hide();

		// one way input field
		jQuery(modal_class + '#trip_one_way_field .vehicle').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .pickup_from').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .drop_to').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .airline').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_one_way_field .class').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_one_way_field .duration').addClass('d-flex').show();

		// return input field
		jQuery(modal_class + '#trip_return_field .vehicle').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .pickup_from').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .drop_to').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .boat_name').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .airline').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .class').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .duration').addClass('d-flex').show();
	} else if(trip_mode == 'Departure') {
		// active trip type
		jQuery(modal_class + '.durationFormsTabUL .one_way').show();
		jQuery(modal_class + '.durationFormsTabUL .return').hide();
		jQuery(modal_class + '.durationFormsTabUL .standby').show();

		// active one way
		jQuery(modal_class + '.durationFormsTabUL #one-way').prop('checked', true);

		// active field tab
		jQuery(modal_class + '#trip_one_way_field').addClass('tab-active').show();
		jQuery(modal_class + '#trip_return_field').removeClass('tab-active').hide();
		jQuery(modal_class + '#trip_stand_by_field').removeClass('tab-active').hide();

		// input field
		jQuery(modal_class + '#trip_one_way_field .vehicle').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .pickup_from').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .drop_to').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .airline').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_one_way_field .class').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_one_way_field .duration').addClass('d-flex').show();

		// return input field
		jQuery(modal_class + '#trip_return_field .vehicle').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .pickup_from').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .drop_to').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .boat_name').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .airline').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .class').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .duration').addClass('d-flex').show();
	} else if(trip_mode == 'By Air') {
		// active trip type
		jQuery(modal_class + '.durationFormsTabUL .one_way').show();
		jQuery(modal_class + '.durationFormsTabUL .return').show();
		jQuery(modal_class + '.durationFormsTabUL .standby').hide();

		// active one way
		jQuery(modal_class + '.durationFormsTabUL #one-way').prop('checked', true);

		// active field tab
		jQuery(modal_class + '#trip_one_way_field').addClass('tab-active').show();
		jQuery(modal_class + '#trip_return_field').removeClass('tab-active').hide();
		jQuery(modal_class + '#trip_stand_by_field').removeClass('tab-active').hide();

		// input field
		jQuery(modal_class + '#trip_one_way_field .vehicle').addClass('d-flex').hide();
		jQuery(modal_class + '#trip_one_way_field .pickup_from').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .drop_to').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .airline').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .class').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .duration').addClass('d-flex').show();

		// return input field
		jQuery(modal_class + '#trip_return_field .vehicle').addClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .pickup_from').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .drop_to').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .boat_name').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .airline').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .class').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .duration').addClass('d-flex').show();
	} else if(trip_mode == 'By Ferry/Boat') {
		// active trip type
		jQuery(modal_class + '.durationFormsTabUL .one_way').show();
		jQuery(modal_class + '.durationFormsTabUL .return').show();
		jQuery(modal_class + '.durationFormsTabUL .standby').show();

		// active one way
		jQuery(modal_class + '.durationFormsTabUL #one-way').prop('checked', true);

		// active field tab
		jQuery(modal_class + '#trip_one_way_field').addClass('tab-active').show();
		jQuery(modal_class + '#trip_return_field').removeClass('tab-active').hide();
		jQuery(modal_class + '#trip_stand_by_field').removeClass('tab-active').hide();

		// input field
		jQuery(modal_class + '#trip_one_way_field .vehicle').addClass('d-flex').hide();
		jQuery(modal_class + '#trip_one_way_field .pickup_from').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .drop_to').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .airline').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_one_way_field .class').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_one_way_field .duration').addClass('d-flex').show();

		// return input field
		jQuery(modal_class + '#trip_return_field .vehicle').addClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .pickup_from').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .drop_to').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .boat_name').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .airline').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .class').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .duration').addClass('d-flex').show();
	} else if(trip_mode == 'By Train') {
		// active trip type
		jQuery(modal_class + '.durationFormsTabUL .one_way').show();
		jQuery(modal_class + '.durationFormsTabUL .return').show();
		jQuery(modal_class + '.durationFormsTabUL .standby').hide();

		// active one way
		jQuery(modal_class + '.durationFormsTabUL #one-way').prop('checked', true);

		// active field tab
		jQuery(modal_class + '#trip_one_way_field').addClass('tab-active').show();
		jQuery(modal_class + '#trip_return_field').removeClass('tab-active').hide();
		jQuery(modal_class + '#trip_stand_by_field').removeClass('tab-active').hide();

		// input field
		jQuery(modal_class + '#trip_one_way_field .vehicle').addClass('d-flex').hide();
		jQuery(modal_class + '#trip_one_way_field .pickup_from').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .drop_to').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .airline').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_one_way_field .class').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_one_way_field .duration').addClass('d-flex').show();

		// return input field
		jQuery(modal_class + '#trip_return_field .vehicle').addClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .pickup_from').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .drop_to').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .boat_name').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .airline').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .class').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .duration').addClass('d-flex').show();
	} else if(trip_mode == 'Point to Point') {
		// active trip type
		jQuery(modal_class + '.durationFormsTabUL .one_way').show();
		jQuery(modal_class + '.durationFormsTabUL .return').show();
		jQuery(modal_class + '.durationFormsTabUL .standby').show();

		// active one way
		jQuery(modal_class + '.durationFormsTabUL #one-way').prop('checked', true);

		// active field tab
		jQuery(modal_class + '#trip_one_way_field').addClass('tab-active').show();
		jQuery(modal_class + '#trip_return_field').removeClass('tab-active').hide();
		jQuery(modal_class + '#trip_stand_by_field').removeClass('tab-active').hide();

		// input field
		jQuery(modal_class + '#trip_one_way_field .vehicle').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .pickup_from').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .drop_to').addClass('d-flex').show();
		jQuery(modal_class + '#trip_one_way_field .airline').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_one_way_field .class').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_one_way_field .duration').addClass('d-flex').show();

		// return input field
		jQuery(modal_class + '#trip_return_field .pickup_from').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .drop_to').addClass('d-flex').show();
		jQuery(modal_class + '#trip_return_field .boat_name').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .airline').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .class').removeClass('d-flex').hide();
		jQuery(modal_class + '#trip_return_field .duration').addClass('d-flex').show();
	}
});

/**
 * reset tour quality selection
 */
jQuery(document.body).on('click', '.tour_quality_reset', function() {
	jQuery('input[name="tour_quality"]').prop('checked', false);
});

/**
 * on click add new payment sechdule item
 */
jQuery(document.body).on('click', '.add_new_payment_sechdule_btn', function() {
	// fetch cities
	jQuery.ajax({
	    type: "POST",
	    url: base_url + "dashboard/tour_payment_sechdule_add_item",
	    data: {
			'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
		},
	    success: function(response) {
    		// set content
    		jQuery('.payment_sechdule_amount_box').append(response);
	    }
	});
});

/**
 * on click add new cancellation payment
 */
jQuery(document.body).on('click', '.add_new_cancellation_payment_btn', function() {
	// fetch cities
	jQuery.ajax({
	    type: "POST",
	    url: base_url + "dashboard/tour_cancellation_payment_add_item",
	    data: {
			'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
		},
	    success: function(response) {
    		// set content
    		jQuery('.cancellation_payment_box').append(response);
	    }
	});
});

/**
 * on select other guest nationality
 */
jQuery(document).ready(function() {
	jQuery('input[name="agent_add_tour_nationality"]').change(function() {
		// get selected value
		var select_val  = jQuery(this).val();
		var is_selected = this.checked;

		// check is other
		if(is_selected && select_val == 'other') {
			jQuery('.other_guest_nationality_box').show();
		} else {
			jQuery('.other_guest_nationality_box').hide();
		}
	});
});

/**
 * init slick slider content
 */
function init_slick_slider_content(element)
{
	jQuery(element).slick({
		dots: true,
		arrows: true,
		infinite: false,
	});
}

/**
 * on click open suggested restaurant
 */
jQuery('.click_open_suggested_restaurant').click(function() {
	jQuery('.static_meal_box').hide();
	jQuery('.suggested_restaurant_box').show();
});

/**
 * on click open custom meals
 */
jQuery('.click_open_custom_meal').click(function() {
	jQuery('.static_meal_box').show();
	jQuery('.suggested_restaurant_box').hide();
});