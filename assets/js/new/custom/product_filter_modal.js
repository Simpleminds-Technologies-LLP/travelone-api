/**
 * on click show more destination
 */
var destination_page_index = 5;
jQuery("#show_more_destination").click(function() {
	// get attr data
	var is_disabled = jQuery(this).attr('disabled');

	// check is disabled
	if(is_disabled != 'disabled') {
		// define data
		var page_type   = jQuery(this).data('page_type');
		var filter_type = jQuery(this).data('filter_type');
		var slug_id     = jQuery(this).data('slug_id');

		// disable button
		jQuery('#show_more_destination').html('<i class="fa fa-spinner fa-spin"></i> Show More').css('cursor', 'not-allowed').attr('disabled', true);

		// get destination data
		jQuery.ajax({
			type: "POST",
			url: mds_config.base_url + "modal_filter_lode_more_dest",
			data: {
				'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
				'count_index'   : destination_page_index,
				'page_type'     : page_type,
				'filter_type'   : filter_type,
				'slug_id'       : slug_id,
			},
			success: function(response) {
				// parse json
				var json_parse = JSON.parse(response);

				// check response
				if(json_parse.html_content) {
					// set content
					jQuery(".destination_list").append(json_parse.html_content);

					// update offset data
					destination_page_index += (json_parse.total_record) ? json_parse.total_record : 0;

					// check show more button
					if(json_parse.total_record == 5) {
						// show show more button
						jQuery('#show_more_destination').show();
					} else {
						// hide show more button
						jQuery('#show_more_destination').hide();
					}
				} else {
					// hide show more button
					jQuery('#show_more_destination').hide();
				}

				// disable button
				jQuery('#show_more_destination').css('cursor', 'pointer').html('+ Show More').attr('disabled', false);
			}
		});
	}
});

// on click show more country
var country_page_index = 5;
jQuery("#show_more_country").click(function() {
	// get attr data
	var is_disabled = jQuery(this).attr('disabled');

	// check is disabled
	if(is_disabled != 'disabled') {
		// define data
		var page_type   = jQuery(this).data('page_type');
		var filter_type = jQuery(this).data('filter_type');
		var slug_id     = jQuery(this).data('slug_id');

		// disable button
		jQuery('#show_more_country').html('<i class="fa fa-spinner fa-spin"></i> Show More').css('cursor', 'not-allowed').attr('disabled', true);

		// get country data
		jQuery.ajax({
			type: "POST",
			url: mds_config.base_url + "modal_filter_lode_more_country",
			data: {
				'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
				'count_index'   : country_page_index,
				'page_type'     : page_type,
				'filter_type'   : filter_type,
				'slug_id'       : slug_id,
			},
			success: function(response) {
				// parse json
				var json_parse = JSON.parse(response);

				// check response
				if(json_parse.html_content) {
					// set content
					jQuery(".country_list").append(json_parse.html_content);

					// update offset data
					country_page_index += (json_parse.total_record) ? json_parse.total_record : 0;

					// check show more button
					if(json_parse.total_record == 5) {
						// show show more button
						jQuery('#show_more_country').show();
					} else {
						// hide show more button
						jQuery('#show_more_country').hide();
					}
				} else {
					// hide show more button
					jQuery('#show_more_country').hide();
				}

				// disable button
				jQuery('#show_more_country').css('cursor', 'pointer').html('+ Show More').attr('disabled', false);
			}
		});
	}
});

/**
 * on click show more state
 */
var state_page_index = 5;
jQuery("#show_more_state").click(function() {
	// get attr data
	var is_disabled = jQuery(this).attr('disabled');

	// check is disabled
	if(is_disabled != 'disabled') {
		// define data
		var page_type   = jQuery(this).data('page_type');
		var filter_type = jQuery(this).data('filter_type');
		var slug_id     = jQuery(this).data('slug_id');

		// disable button
		jQuery('#show_more_state').html('<i class="fa fa-spinner fa-spin"></i> Show More').css('cursor', 'not-allowed').attr('disabled', true);

		// get country data
		jQuery.ajax({
			type: "POST",
			url: mds_config.base_url + "modal_filter_lode_more_state",
			data: {
				'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
				'count_index'   : state_page_index,
				'page_type'     : page_type,
				'filter_type'   : filter_type,
				'slug_id'       : slug_id,
			},
			success: function(response) {
				// parse json
				var json_parse = JSON.parse(response);

				// check response
				if(json_parse.html_content) {
					// set content
					jQuery(".state_list").append(json_parse.html_content);

					// update offset data
					state_page_index += (json_parse.total_record) ? json_parse.total_record : 0;

					// check show more button
					if(json_parse.total_record == 5) {
						// show show more button
						jQuery('#show_more_state').show();
					} else {
						// hide show more button
						jQuery('#show_more_state').hide();
					}
				} else {
					// hide show more button
					jQuery('#show_more_state').hide();
				}

				// disable button
				jQuery('#show_more_state').css('cursor', 'pointer').html('+ Show More').attr('disabled', false);
			}
		});
	}
});

/**
 * on click show more city
 */
var city_page_index = 5;
jQuery("#show_more_city").click(function() {
	// get attr data
	var is_disabled = jQuery(this).attr('disabled');

	// check is disabled
	if(is_disabled != 'disabled') {
		// define data
		var page_type   = jQuery(this).data('page_type');
		var filter_type = jQuery(this).data('filter_type');
		var slug_id     = jQuery(this).data('slug_id');

		// disable button
		jQuery('#show_more_city').html('<i class="fa fa-spinner fa-spin"></i> Show More').css('cursor', 'not-allowed').attr('disabled', true);

		// get city data
		jQuery.ajax({
			type: "POST",
			url: mds_config.base_url + "modal_filter_lode_more_city",
			data: {
				'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
				'count_index'   : city_page_index,
				'page_type'     : page_type,
				'filter_type'   : filter_type,
				'slug_id'       : slug_id,
			},
			success: function(response) {
				// parse json
				var json_parse = JSON.parse(response);

				// check response
				if(json_parse.html_content) {
					// set content
					jQuery(".city_list").append(json_parse.html_content);

					// update offset data
					city_page_index += (json_parse.total_record) ? json_parse.total_record : 0;

					// check show more button
					if(json_parse.total_record == 5) {
						// show show more button
						jQuery('#show_more_city').show();
					} else {
						// hide show more button
						jQuery('#show_more_city').hide();
					}
				} else {
					// hide show more button
					jQuery('#show_more_city').hide();
				}

				// disable button
				jQuery('#show_more_city').css('cursor', 'pointer').html('+ Show More').attr('disabled', false);
			}
		});
	}
});

/**
 * on click show more theme
 */
var theme_page_index = 5;
jQuery("#show_more_theme").click(function() {
	// get attr data
	var is_disabled = jQuery(this).attr('disabled');

	// check is disabled
	if(is_disabled != 'disabled') {
		// define data
		var page_type   = jQuery(this).data('page_type');
		var filter_type = jQuery(this).data('filter_type');
		var slug_id     = jQuery(this).data('slug_id');

		// disable button
		jQuery('#show_more_theme').html('<i class="fa fa-spinner fa-spin"></i> Show More').css('cursor', 'not-allowed').attr('disabled', true);

		// get city data
		jQuery.ajax({
			type: "POST",
			url: mds_config.base_url + "modal_filter_lode_more_theme",
			data: {
				'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
				'count_index'   : theme_page_index,
				'page_type'     : page_type,
				'filter_type'   : filter_type,
				'slug_id'       : slug_id,
			},
			success: function(response) {
				// parse json
				var json_parse = JSON.parse(response);

				// check response
				if(json_parse.html_content) {
					// set content
					jQuery(".theme_list").append(json_parse.html_content);

					// update offset data
					theme_page_index += (json_parse.total_record) ? json_parse.total_record : 0;

					// check show more button
					if(json_parse.total_record == 5) {
						// show show more button
						jQuery('#show_more_theme').show();
					} else {
						// hide show more button
						jQuery('#show_more_theme').hide();
					}
				} else {
					// hide show more button
					jQuery('#show_more_theme').hide();
				}

				// disable button
				jQuery('#show_more_theme').css('cursor', 'pointer').html('+ Show More').attr('disabled', false);
			}
		});
	}
});

/**
 * on click show more traveler personas
 */
var personas_page_index = 5;
jQuery("#show_more_personas").click(function() {
	// get attr data
	var is_disabled = jQuery(this).attr('disabled');

	// check is disabled
	if(is_disabled != 'disabled') {
		// define data
		var page_type   = jQuery(this).data('page_type');
		var filter_type = jQuery(this).data('filter_type');
		var slug_id     = jQuery(this).data('slug_id');

		// disable button
		jQuery('#show_more_personas').html('<i class="fa fa-spinner fa-spin"></i> Show More').css('cursor', 'not-allowed').attr('disabled', true);

		// get city data
		jQuery.ajax({
			type: "POST",
			url: mds_config.base_url + "modal_filter_lode_more_personas",
			data: {
				'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
				'count_index'   : personas_page_index,
				'page_type'     : page_type,
				'filter_type'   : filter_type,
				'slug_id'       : slug_id,
			},
			success: function(response) {
				// parse json
				var json_parse = JSON.parse(response);

				// check response
				if(json_parse.html_content) {
					// set content
					jQuery(".personas_list").append(json_parse.html_content);

					// update offset data
					personas_page_index += (json_parse.total_record) ? json_parse.total_record : 0;

					// check show more button
					if(json_parse.total_record == 5) {
						// show show more button
						jQuery('#show_more_personas').show();
					} else {
						// hide show more button
						jQuery('#show_more_personas').hide();
					}
				} else {
					// hide show more button
					jQuery('#show_more_personas').hide();
				}

				// disable button
				jQuery('#show_more_personas').css('cursor', 'pointer').html('+ Show More').attr('disabled', false);
			}
		});
	}
});

// on click show more category
var category_page_index = 5;
jQuery("#show_more_category").click(function() {
	// get attr data
	var is_disabled = jQuery(this).attr('disabled');

	// check is disabled
	if(is_disabled != 'disabled') {
		// define data
		var page_type   = jQuery(this).data('page_type');
		var filter_type = jQuery(this).data('filter_type');
		var slug_id     = jQuery(this).data('slug_id');

		// disable button
		jQuery('#show_more_category').html('<i class="fa fa-spinner fa-spin"></i> Show More').css('cursor', 'not-allowed').attr('disabled', true);

		// get category data
		jQuery.ajax({
			type: "POST",
			url: mds_config.base_url + "modal_filter_lode_more_category",
			data: {
				'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
				'count_index'   : category_page_index,
				'page_type'     : page_type,
				'filter_type'   : filter_type,
				'slug_id'       : slug_id,
			},
			success: function(response) {
				// parse json
				var json_parse = JSON.parse(response);

				// check response
				if(json_parse.html_content) {
					// set content
					jQuery(".category_list").append(json_parse.html_content);

					// update offset data
					category_page_index += (json_parse.total_record) ? json_parse.total_record : 0;

					// check show more button
					if(json_parse.total_record == 5) {
						// show show more button
						jQuery('#show_more_category').show();
					} else {
						// hide show more button
						jQuery('#show_more_category').hide();
					}
				} else {
					// hide show more button
					jQuery('#show_more_category').hide();
				}

				// disable button
				jQuery('#show_more_category').css('cursor', 'pointer').html('+ Show More').attr('disabled', false);
			}
		});
	}
});

// on click reset tour
jQuery(".reset_tour_filter").click(function(e) {
	e.preventDefault();
	// reset checkbox input
	reset_filter_input();

	var $this = jQuery(this);
	jQuery("#tours").attr('data-start', 0);
	fetchFilterToursAjax($this, 'reset');
});

/**
 * reset filter input
 */
function reset_filter_input() {
	jQuery('.filter_duration').prop('checked', false);
	jQuery('.filter_destination').prop('checked', false);
	jQuery('.filter_country').prop('checked', false);
	jQuery('.filter_state').prop('checked', false);
	jQuery('.filter_city').prop('checked', false);
	jQuery('.filter_price_type').prop('checked', false);
	jQuery('.filter_theme').prop('checked', false);
	jQuery('.filter_categories').prop('checked', false);
	jQuery('.filter_traveler_personas').prop('checked', false);
	jQuery('.filter_night').prop('checked', false);
	jQuery('.filter_period').prop('checked', false);
	jQuery('.filter_rating').prop('checked', false);
	jQuery('.filter_special_badge').prop('checked', false);
	jQuery('.filter_attraction').prop('checked', false);
	jQuery('.tour_related_theme').prop('checked', false);
	jQuery('.tour_related_destination').prop('checked', false);
	jQuery('.tour_related_personas').prop('checked', false);
	jQuery('.activity_related_tags').prop('checked', false);
	jQuery('.filter_min_price').val('');
	jQuery('.filter_max_price').val('');
}

/**
 * on click tour filter profile
 */
jQuery("#tours.tab-pane .apply_tour_filter").click(function(e) {
	e.preventDefault();
	var $this = jQuery(this);
	jQuery("#tours").attr('data-start', 0);
	fetchFilterToursAjax($this, 'filter');
	jQuery("#collapseFilters").toggleClass('show');
	jQuery(".reset_modal_filter").show();
	jQuery(window).scrollTop(jQuery('.nav-tabs-profile').offset().top);

});

/**
 * on click tour filter profile
 */
jQuery(".allToursUL li a").click(function(e) {
	e.preventDefault();
	var page_type 	= jQuery(this).data('page_type');
	var slug_id   	= jQuery(this).data('slug_id');
	reset_filter_input();
	jQuery('.filter_' + page_type).each(function() {
		if(jQuery(this).val() == slug_id) {
			jQuery(this).prop('checked', true);
		}
	});
	jQuery("#tours").attr('data-start', 0);
	var $this = jQuery('.tours_sort_filter');
	fetchFilterToursAjax($this, 'sort', [{page_type:page_type,slug_id: slug_id}]);
	jQuery('#nav-tours-tab').trigger('click');
	jQuery(window).scrollTop(jQuery('.nav-tabs-profile').offset().top);
});

/**
 * on click show more destination
 */
var profile_destination_page_index = 2;
jQuery("#profile_show_more_destination").click(function() {
	// define data
	var page_type   = jQuery(this).data('page_type');
	var filter_type = jQuery(this).data('filter_type');
	var slug_id     = jQuery(this).data('slug_id');
	var user_id     = jQuery(this).data('user_id');

	// get destination data
	jQuery.ajax({
		type: "GET",
		url: mds_config.base_url + "profile_filter_load_more_dest",
		data: {
			'count_index': profile_destination_page_index,
			'page_type'  : page_type,
			'filter_type': filter_type,
			'slug_id'    : slug_id,
			'user_id'    : user_id,
		},
		success: function(response) {
			// check response
			if(response) {
				jQuery(".destination_list").append(response);
				profile_destination_page_index += 1;
			} else {
				jQuery('#profile_show_more_destination').hide();
			}
		}
	});
});

/**
 * on click show more destination
 */
var profile_country_page_index = 2;
jQuery("#profile_show_more_country").click(function() {
	// define data
	var page_type   = jQuery(this).data('page_type');
	var filter_type = jQuery(this).data('filter_type');
	var slug_id     = jQuery(this).data('slug_id');
	var user_id     = jQuery(this).data('user_id');

	// get destination data
	jQuery.ajax({
		type: "GET",
		url: mds_config.base_url + "profile_filter_load_more_country",
		data: {
			'count_index': profile_country_page_index,
			'page_type'  : page_type,
			'filter_type': filter_type,
			'slug_id'    : slug_id,
			'user_id'    : user_id,
		},
		success: function(response) {
			// check response
			if(response) {
				jQuery(".country_list").append(response);
				profile_country_page_index += 1;
			} else {
				jQuery('#profile_show_more_country').hide();
			}
		}
	});
});

/**
 * on click show more destination
 */
var profile_state_page_index = 2;
jQuery("#profile_show_more_state").click(function() {
	// define data
	var page_type   = jQuery(this).data('page_type');
	var filter_type = jQuery(this).data('filter_type');
	var slug_id     = jQuery(this).data('slug_id');
	var user_id     = jQuery(this).data('user_id');

	// get destination data
	jQuery.ajax({
		type: "GET",
		url: mds_config.base_url + "profile_filter_load_more_state",
		data: {
			'count_index': profile_state_page_index,
			'page_type'  : page_type,
			'filter_type': filter_type,
			'slug_id'    : slug_id,
			'user_id'    : user_id,
		},
		success: function(response) {
			// check response
			if(response) {
				jQuery(".state_list").append(response);
				profile_state_page_index += 1;
			} else {
				jQuery('#profile_show_more_state').hide();
			}
		}
	});
});
/**
 * on click profile show more city
 */
var profile_city_page_index = 2;
jQuery("#profile_show_more_city").click(function() {
	// define data
	var page_type   = jQuery(this).data('page_type');
	var filter_type = jQuery(this).data('filter_type');
	var slug_id     = jQuery(this).data('slug_id');
	var user_id     = jQuery(this).data('user_id');

	// get city data
	jQuery.ajax({
		type: "GET",
		url: mds_config.base_url + "profile_filter_load_more_city",
		data: {
			'count_index': profile_city_page_index,
			'page_type'  : page_type,
			'filter_type': filter_type,
			'slug_id'    : slug_id,
			'user_id'    : user_id,
		},
		success: function(response) {
			// check response
			if(response) {
				jQuery(".city_list").append(response);
				profile_city_page_index += 1;
			} else {
				jQuery('#profile_show_more_city').hide();
			}
		}
	});
});

/**
 * on click profile show more theme
 */
var profile_theme_page_index = 2;
jQuery("#profile_show_more_theme").click(function() {
	// define data
	var page_type   = jQuery(this).data('page_type');
	var filter_type = jQuery(this).data('filter_type');
	var slug_id     = jQuery(this).data('slug_id');
	var user_id     = jQuery(this).data('user_id');

	// get city data
	jQuery.ajax({
		type: "GET",
		url: mds_config.base_url + "profile_filter_load_more_theme",
		data: {
			'count_index': profile_theme_page_index,
			'page_type'  : page_type,
			'filter_type': filter_type,
			'slug_id'    : slug_id,
			'user_id'    : user_id,
		},
		success: function(response) {
			// check response
			if(response) {
				jQuery(".theme_list").append(response);
				profile_theme_page_index += 1;
			} else {
				jQuery('#profile_show_more_theme').hide();
			}
		}
	});
});

/**
 * init slick slider
 */
function initNewTourSlider()
{
	jQuery('.imageSlider:not(.slick-initialized)').slick({
		arrows: true,
		dots: true,
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1, 
		autoplaySpeed: 2000,
		responsive: [
		    {
		    	breakpoint: 1200,
		    	settings: {
					dots          : true,
					slidesToShow  : 1,
					slidesToScroll: 1,
					infinite      : true,
				}
			},
			{
				breakpoint: 1024,
				settings: {
					dots          : true,
					slidesToShow  : 1,
					slidesToScroll: 1,
					infinite      : true,
				}
			},
		    {
		    	breakpoint: 992,
		    	settings: {
					dots          : true,
					slidesToShow  : 1,
					slidesToScroll: 1,
					infinite      : true,
				}
		    },
		    {
		    	breakpoint: 768,
		    	settings: {
					dots          : true,
					slidesToShow  : 1,
					slidesToScroll: 1,
					infinite      : true,
				}
		    },
		    {
		    	breakpoint:767,
		    	settings: {
					dots          : true,
					slidesToShow  : 1,
					slidesToScroll: 1,
					infinite      : true,
				}
		    },
		    {
		    	breakpoint: 480,
		    	settings: {
					dots          : true,
					slidesToShow  : 1,
					slidesToScroll: 1,
					infinite      : true,
				}
			}
		]
	});
}

/**
 * init slick slider content
 */
function init_slick_slider_content(element)
{
	jQuery(element).slick({
		dots: true,
		arrows: true,
	});
}

/**
 * fetch filter tours for ajax
 */
function fetchFilterToursAjax(element, action, extra_params = [])
{
	// get data
	var user_id   	= jQuery("#tours").attr('data-user_id');
	var limit   	= jQuery("#tours").attr('data-limit');
	var start   	= jQuery("#tours").attr('data-start');
	var select_sort = '';

	// get define array
	var destination_arr = [];
	var country_arr     = [];
	var state_arr       = [];
	var city_arr        = [];
	var theme_arr       = [];
	var days_arr        = [];
	var period_arr      = [];
	var rating_arr      = [];

	// get destinations
	destination_arr.push(jQuery('.filter_destination:checked').val());

	// get countries
	jQuery('.filter_country:checked').each(function(index) {
		country_arr[index] = jQuery(this).val();
	});

	// get states
	jQuery('.filter_state:checked').each(function(index) {
		state_arr[index] = jQuery(this).val();
	});

	// get city
	jQuery('.filter_city:checked').each(function(index) {
		city_arr[index] = jQuery(this).val();
	});

	// get price type
	var min_price = jQuery('.filter_min_price').val();
	var max_price = jQuery('.filter_max_price').val();

	// get theme
	jQuery('.filter_theme:checked').each(function(index) {
		theme_arr[index] = jQuery(this).val();
	});

	// get night
	jQuery('.filter_night:checked').each(function(index) {
		days_arr[index] = jQuery(this).val();
	});

	// get period
	jQuery('.filter_period:checked').each(function(index) {
		period_arr[index] = jQuery(this).val();
	});

	// get rating
	jQuery('.filter_rating:checked').each(function(index) {
		rating_arr[index] = jQuery(this).val();
	});

	// check extra parameters
	if(extra_params) {
		jQuery.each(extra_params, function(index, param) {
			if(param.page_type == "theme") {
				theme_arr.push(param.slug_id);	
			} else if(param.page_type == "destination") {
				destination_arr.push(param.slug_id);	
			} else if(param.page_type == "country") {
				country_arr.push(param.slug_id);	
			} else if(param.page_type == "night") {
				days_arr.push(param.slug_id);	
			}
		});
	}

	// get sort values
	var select_sort = jQuery('input[name=tours_sort_filter]:checked').val();

	// call ajax
	jQuery.ajax({
		type: "GET",
		url: mds_config.base_url + "tours_filter_ajax",
		data: {
			'user_id'     : user_id,
			'destinations': destination_arr,
			'countries'   : country_arr,
			'states'      : state_arr,
			'cities'      : city_arr,
			'min_price'   : min_price,
			'max_price'   : max_price,
			'themes'      : theme_arr,
			'days'        : days_arr,
			'period'      : period_arr,
			'rating'      : rating_arr,
			'sort'        : select_sort,
			'limit'       : limit,
			'start'       : start,
			'page_type'   : page_type,
			'slug_id'     : slug_id,
		},
		cache: false,
		dataType: 'json',
		beforeSend:function() {
			if(action == "loadmore") {
				element.attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Loading...');
			} else if(action == "filter" || action == "reset") {
				element.attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i>');
			}
		},
		success: function(response) {
			// check response
			if(action =="filter" || action =="reset" || action == 'sort')
			{
				if(response.html_content) {
					jQuery(".tour_listing_page").html(response.html_content);
				} else {
					jQuery(".tour_listing_page").html('<div style="text-align: center; padding: 100px; font-size: 20px; color: #ff4c46;"><h3>No Tours Available!</h3></div>');
				}

				if(action == "filter") {
					element.attr('disabled', false).html("Apply");
					jQuery('.reset_tour_filter').attr('disabled', false).show();
				} else if(action == "reset") {
					jQuery('.reset_tour_filter').attr('disabled', false).html('<ion-icon name="close-outline" role="img" class="md hydrated" aria-label="close outline"><div class="icon-inner"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon s-ion-icon" viewBox="0 0 512 512"><title>Close</title><path stroke-linecap="round" stroke-linejoin="round" d="M368 368L144 144M368 144L144 368" class="ionicon-fill-none ionicon-stroke-width"></path></svg></div></ion-icon><span class="text-capitalize filterHeading">reset filter</span>').hide();
				}

				if(parseInt(response.total_count) <= (parseInt(start) + parseInt(limit))) {
					jQuery("#btn_listing_load_more").attr('disabled', false).html("Load more").hide();
				} else {
					jQuery("#btn_listing_load_more").attr('disabled', false).html("Load more").show();
				}

				if(response.total_count) {
					jQuery("#tours").attr('data-start', parseInt(limit));	
				}
				jQuery('.count.listing_tour_count').html(response.total_count);
			} else if(action == "loadmore") {
				if(response.html_content) {
					jQuery(".tour_listing_page").append(response.html_content);
				}

				if(parseInt(response.total_count) <= (parseInt(start) + parseInt(limit))) {
					element.attr('disabled', false).html("Load more").hide();
				} else {
					element.attr('disabled', false).html("Load more").show();
				}

				if(response.total_count) {
					jQuery("#tours").attr('data-start', parseInt(jQuery("#tours").attr('data-start')) + parseInt(limit));	
				}
			}

			// init slick sloder
			initNewTourSlider();
		}
	});
}

/**
 * load more button click
 */
jQuery(document).ready(function() {
	jQuery(document).on('click', "#btn_listing_load_more", function(e) {
		e.preventDefault();
		var $this = jQuery(this);
		fetchFilterToursAjax($this, 'loadmore');
	});

	// on select listing sort filter
	jQuery(".tours_sort_filter").change(function(e) {
		e.preventDefault();
		var $this = jQuery(this);
		jQuery("#tours").attr('data-start', 0);
		fetchFilterToursAjax($this, 'sort');
	});
});