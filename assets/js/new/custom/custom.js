document.addEventListener("DOMContentLoaded", function () {
	const lazyImages = document.querySelectorAll(".lazyload");

	function lazyLoad() {
		lazyImages.forEach(image => {
			if (image.getBoundingClientRect().top <= window.innerHeight && image.getBoundingClientRect().bottom >= 0 && getComputedStyle(image).display !== "none") {
				image.src = image.dataset.src;
				image.classList.remove("lazyload");
			}
		});
	}

	// Call the lazyLoad function on scroll and resize events
	window.addEventListener("scroll", lazyLoad);
	window.addEventListener("resize", lazyLoad);
});

/**
 * remove common error message
 */
jQuery(document.body).on('click', '.remove_common_error', function () {
	jQuery('.error_notification').hide();
});

/**
 * remove common success message
 */
jQuery(document.body).on('click', '.remove_common_success', function () {
	jQuery('.success_notification').hide();
});

/**
 * on click wishlist icon
 */
jQuery(document.body).on('click', '.add_wishlist_tour', function () {
	// get requested data
	var tour_id = jQuery(this).data('tour_id');
	var action = jQuery(this).data('action');

	// apply ajax for filter
	jQuery.ajax({
		type: "GET",
		url: mds_config.base_url + "wishlist/add",
		data: {
			'tour_id': tour_id,
			'action': action,
		},
		cache: false,
		success: function (response) {
			// check response
			if (response) {
				// next action
				var next_action = (action == 'add') ? 'remove' : 'add';

				// set next action
				action = next_action;

				// set data
				jQuery(".add_wishlist_tour_" + tour_id).data('action', action);

				// update heart icon
				if (action == 'add') {
					// update icon color
					jQuery(".add_wishlist_tour_" + tour_id).css('color', '#004963');

					// show notification
					jQuery('.wishlist_notification').show();
					jQuery('.wishlist_popup_content').html('<i class="fa fa-trash"></i> Tour/Activity removed from your Wishlist!');

					// hide notification
					setTimeout(function () {
						jQuery('.wishlist_notification').hide();
					}, 4000);
				} else {
					// update icon color
					jQuery(".add_wishlist_tour_" + tour_id).css('color', '#ff4c46');

					// show notification
					jQuery('.wishlist_notification').show();
					jQuery('.wishlist_popup_content').html('<i class="fa fa-check-circle"></i> Tour/Activity added to your Wishlist!');

					// hide notification
					setTimeout(function () {
						jQuery('.wishlist_notification').hide();
					}, 4000);
				}

				// update count header count
				add_header_wishlist_item_count();

				// update wishlist tab count
				update_wishlist_tab_items();
			}
		}
	});
});

// on click wishlist icon
jQuery(document.body).on('click', '.recent_add_wishlist_tour', function () {
	// get data
	var tour_id = jQuery(this).data('tour_id');
	var action = jQuery(this).data('action');

	// apply ajax for filter
	jQuery.ajax({
		type: "GET",
		url: mds_config.base_url + "wishlist/add",
		data: {
			'tour_id': tour_id,
			'action': action,
		},
		cache: false,
		success: function (response) {
			// check response
			if (response) {
				// next action
				var next_action = (action == 'add') ? 'remove' : 'add';

				// set next action
				action = next_action;

				// set data
				jQuery(".recent_add_wishlist_tour_" + tour_id).data('action', action);

				// update heart icon
				if (action == 'add') {
					// update icon color
					jQuery(".add_wishlist_tour_" + tour_id).css('color', '#004963');

					// show notification
					jQuery('.wishlist_notification').show();
					jQuery('.wishlist_popup_content').html('<i class="fa fa-trash"></i> Tour/Activity removed from your Wishlist!');

					// hide notification
					setTimeout(function () {
						jQuery('.wishlist_notification').hide();
					}, 4000);
				} else {
					// update icon color
					jQuery(".add_wishlist_tour_" + tour_id).css('color', '#ff4c46');

					// show notification
					jQuery('.wishlist_notification').show();
					jQuery('.wishlist_popup_content').html('<i class="fa fa-check-circle"></i> Tour/Activity has been added to the Wishlist.');

					// hide notification
					setTimeout(function () {
						jQuery('.wishlist_notification').hide();
					}, 4000);
				}

				// update count
				add_header_wishlist_item_count();
			}
		}
	});
});

/**
 * add header wishlist item count
 */
function add_header_wishlist_item_count() {
	// apply ajax for filter
	jQuery.ajax({
		type: "GET",
		url: mds_config.base_url + "wishlist/count",
		success: function (response) {
			// set counter
			if (response > 0) {
				jQuery(".wishlist_count").show().html(response);
			} else {
				jQuery(".wishlist_count").hide().html('');
			}
		}
	});
}

/**
 * update wishlist tab items
 */
function update_wishlist_tab_items() {
	// apply ajax for filter
	jQuery.ajax({
		type: "GET",
		url: mds_config.base_url + "/wishlist/items",
		cache: false,
		dataType: 'json',
		success: function (response) {
			// set counter
			if (response.html_content) {
				// update content
				jQuery("#wishlist > .row-product-items").html(response.html_content);
				jQuery('#nav-wishlist-tab .count').html("(" + response.total_count + ")");

				// init slider
				init_slick_slider_content('#wishlist .imageSlider');
			}
		}
	});
}

/**
 * tour slider
 */
init_slick_slider_content('.tour_single_package');
init_slick_slider_content('.trending_deals_slider');

/**
 * hide cookies warning
 */
function set_cookies_warning() {
	// set cookie
	jQuery.cookie("travelone_cookies_warning", 1, { expires: 30 });

	// hide warning
	jQuery('.travelone_cookie_warning').hide();
}

/**
 * init text editor
 */
function init_tinymce(selector, min_height) {
	var menu_bar = 'file edit view insert format tools table help';
	if (selector == '.tinyMCEsmall') {
		menu_bar = false;
	}
	var directionality = "ltr";
	tinymce.init({
		selector: selector,
		min_height: min_height,
		valid_elements: '*[*]',
		relative_urls: false,
		remove_script_host: false,
		directionality: directionality,
		entity_encoding: "raw",
		language: 'en',
		menubar: menu_bar,
		plugins: [
			"advlist autolink lists link image charmap print preview anchor",
			"searchreplace visualblocks code codesample fullscreen",
			"insertdatetime media table paste imagetools"
		],
		toolbar: 'fullscreen code preview | bold italic underline strikethrough | fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | numlist bullist | forecolor backcolor removeformat | table image media link | outdent indent superscript subscript',
		content_css: [mds_config.base_url + 'assets/vendor/tinymce/editor_content.css'],
		setup: function (editor) {
			editor.on('change', function () {
				tinymce.triggerSave();
			});
		}
	});
}

if ($('.tinyMCE').length > 0) {
	init_tinymce('.tinyMCE', 500);
}
if ($('.tinyMCEsmall').length > 0) {
	init_tinymce('.tinyMCEsmall', 300);
}

if ($('.whatTraveloneSec .count').length > 0) {
	$('.whatTraveloneSec .count').each(function () {
		$(this).prop('Counter', 0).animate({
			Counter: $(this).text()
		}, {
			duration: 3000,
			easing: 'swing',
			step: function (now) {
				$(this).text(Math.ceil(now));
			}
		});
	});
}

/**
 * init slick slider
 */
jQuery('.customerTraveloneSec .chooseCard').slick({
	arrows: true,
	dots: false,
	infinite: false,
	speed: 300,
	slidesToShow: 3,
	slidesToScroll: 3,
	responsive: [
		{
			breakpoint: 992,
			settings: {
				arrows: true,
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 768,
			settings: {
				arrows: true,
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 480,
			settings: {
				arrows: true,
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});

init_slick_slider_content('#customeraboutslider');

jQuery(document).ready(function () {
	jQuery('.leftcustcorner .tab-a').click(function () {
		jQuery(".tab").removeClass('tab-active');
		jQuery(".tab[data-id='" + jQuery(this).attr('data-id') + "']").addClass("tab-active");
		jQuery(".tab-a").removeClass('active-a');
		jQuery(this).parent().find(".tab-a").addClass('active-a');
	});
});

/**
 * close video when modal is close
 */
jQuery('.modal').on('hidden.bs.modal', function () {
	jQuery('iframe').each(function () {
		var video_src = jQuery(this).attr('src');
		jQuery(this).attr('src', video_src);
	});
});

/**
 * on click tour filter profile
 */
jQuery("#tour_filter_modal .apply_tour_filter").click(function (e) {
	e.preventDefault();

	// update apply text
	jQuery('.apply_tour_filter').attr('disabled', true);
	jQuery('.apply_tour_filter').html('<i class="fa fa-spinner fa-spin"></i>');

	// get data
	var page_type = jQuery('#tour_ajax_data_page_type').val();
	var filter_type = jQuery('#tour_ajax_data_filter_type').val();
	var slug_id = jQuery('#tour_ajax_data_slug_id').val();

	// set start value
	jQuery('#tour_ajax_data_start').val(0);
	jQuery('#tour_ajax_viator_data_start').val(0);

	// apply filter
	fetchListingFilterToursAjax(jQuery(this), 'filter', false, [{
		'page_type': page_type,
		'filter_type': filter_type,
		'slug_id': slug_id,
	}]);

	// show reset filter button
	jQuery(".reset_modal_filter").show();
});

/**
 * on click tour filter profile
 */
jQuery("#activity_filter_modal .apply_activity_filter").click(function (e) {
	e.preventDefault();

	// update apply text
	jQuery('.apply_activity_filter').attr('disabled', true);
	jQuery('.apply_activity_filter').html('<i class="fa fa-spinner fa-spin"></i>');

	// get data
	var page_type = jQuery('#tour_ajax_data_page_type').val();
	var filter_type = jQuery('#tour_ajax_data_filter_type').val();
	var slug_id = jQuery('#tour_ajax_data_slug_id').val();

	// set start value
	jQuery('#tour_ajax_data_start').val(0);
	jQuery('#tour_ajax_viator_data_start').val(0);

	// apply filter
	fetchListingFilterToursAjax(jQuery(this), 'filter', false, [{
		'page_type': page_type,
		'filter_type': filter_type,
		'slug_id': slug_id,
	}]);

	// show reset filter button
	jQuery(".reset_modal_filter").show();
});

/**
 * on click tour filter profile
 */
jQuery(".listing_sort_filter").change(function (e) {
	e.preventDefault();

	// set start value
	jQuery('#tour_ajax_data_start').val(0);
	jQuery('#tour_ajax_viator_data_start').val(0);

	// get data
	var page_type = jQuery('#tour_ajax_data_page_type').val();
	var slug_id = jQuery('#tour_ajax_data_slug_id').val();

	// apply filter
	fetchListingFilterToursAjax('', 'sort', true, [{
		'page_type': page_type,
		'slug_id': slug_id,
	}]);
});

/**
 * on click reset modal listing filter
 */
jQuery("#tour_filter_modal .remove_tour_filter").click(function (e) {
	e.preventDefault();
	// reset checkbox input
	reset_filter_input();

	// update ajax start value
	jQuery('#tour_ajax_data_start').val(0);
	jQuery('#tour_ajax_viator_data_start').val(0);

	// get data
	var page_type = jQuery('#tour_ajax_data_page_type').val();
	var filter_type = jQuery('#tour_ajax_data_filter_type').val();
	var slug_id = jQuery('#tour_ajax_data_slug_id').val();

	// apply filter
	fetchListingFilterToursAjax(jQuery(this), 'reset', false, [{
		'page_type': page_type,
		'slug_id': slug_id,
	}]);
});

/**
 * on click reset modal viator listing filter
 */
jQuery("#activity_filter_modal .remove_activity_filter").click(function (e) {
	e.preventDefault();
	// reset checkbox input
	reset_filter_input();

	// update ajax start value
	jQuery('#tour_ajax_data_start').val(0);
	jQuery('#tour_ajax_viator_data_start').val(0);

	// get data
	var page_type = jQuery('#tour_ajax_data_page_type').val();
	var filter_type = jQuery('#tour_ajax_data_filter_type').val();
	var slug_id = jQuery('#tour_ajax_data_slug_id').val();

	// apply filter
	fetchListingFilterToursAjax(jQuery(this), 'reset', false, [{
		'page_type': page_type,
		'slug_id': slug_id,
	}]);
});

/**
 * on click reset page listing filter
 */
jQuery(".greeceToursSec .reset_modal_filter").click(function (e) {
	e.preventDefault();
	// reset checkbox input
	reset_filter_input();

	// get data
	var page_type = jQuery('#tour_ajax_data_page_type').val();
	var slug_id = jQuery('#tour_ajax_data_slug_id').val();

	// update ajax start value
	jQuery('#tour_ajax_data_start').val(0);
	jQuery('#tour_ajax_viator_data_start').val(0);

	// apply filter
	fetchListingFilterToursAjax(jQuery(this), 'reset', true, [{
		'page_type': page_type,
		'slug_id': slug_id,
	}]);

	// reset sort filter
	jQuery("input:radio[name=listing_sort_filter]:first").attr('checked', true);

	// change title
	jQuery('.reset_modal_filter').html('<ion-icon name="close-outline"></ion-icon><span class="text-capitalize filterHeading">reset</span>');
});

/**
 * on click load more
 */
jQuery(document).ready(function () {
	jQuery(document.body).on('click', "#listing_load_more_btn", function (e) {
		e.preventDefault();
		// get hidden data
		var page_type = jQuery('#tour_ajax_data_page_type').val();
		var slug_id = jQuery('#tour_ajax_data_slug_id').val();

		// apply filter
		fetchListingFilterToursAjax(jQuery(this), 'loadmore', false, [{
			'page_type': page_type,
			'slug_id': slug_id,
		}]);
	});
});

/**
 * on click listing related theme filter
 */
jQuery(".tour_related_theme").change(function () {
	// get data
	var page_type = jQuery('#tour_ajax_data_page_type').val();
	var filter_type = jQuery('#tour_ajax_data_filter_type').val();
	var slug_id = jQuery('#tour_ajax_data_slug_id').val();

	// define array
	var theme_arr = [];

	// update ajax start value
	jQuery('#tour_ajax_data_start').val(0);
	jQuery('#tour_ajax_viator_data_start').val(0);

	// get theme
	jQuery('.tour_related_theme:checked').each(function (index) {
		theme_arr[index] = jQuery(this).val();
	});

	// show reset button
	if (theme_arr.length) {
		// apply filter
		fetchListingFilterToursAjax('', 'filter', true, [{
			'tour_themes': theme_arr,
			'page_type': page_type,
			'slug_id': slug_id,
		}]);

		// show reset button
		jQuery('.reset_modal_filter').show();
	} else {
		// apply filter
		fetchListingFilterToursAjax('', 'reset', true, [{
			'page_type': page_type,
			'slug_id': slug_id,
		}]);

		// hide reset button
		jQuery('.reset_modal_filter').hide();
	}
});

/**
 * on click listing related destination filter
 */
jQuery(".tour_related_destination").change(function () {
	// get data
	var page_type = jQuery('#tour_ajax_data_page_type').val();
	var filter_type = jQuery('#tour_ajax_data_filter_type').val();
	var slug_id = jQuery('#tour_ajax_data_slug_id').val();

	// update ajax start value
	jQuery('#tour_ajax_data_start').val(0);
	jQuery('#tour_ajax_viator_data_start').val(0);

	// define array
	var destination_arr = [];

	// get theme
	jQuery('.tour_related_destination:checked').each(function (index) {
		destination_arr[index] = jQuery(this).val();
	});

	// show reset button
	if (destination_arr.length) {
		// apply filter
		fetchListingFilterToursAjax('', 'filter', true, [{
			'tour_destination': destination_arr,
			'page_type': page_type,
			'slug_id': slug_id,
		}]);

		// show reset button
		jQuery('.reset_modal_filter').show();
	} else {
		// apply filter
		fetchListingFilterToursAjax('', 'filter', true, [{
			'tour_themes': [slug_id],
			'page_type': page_type,
			'slug_id': slug_id,
		}]);

		// hide reset button
		jQuery('.reset_modal_filter').hide();
	}
});

/**
 * on click listing viator related tags filter
 */
jQuery(".activity_related_tags").change(function () {
	// get data
	var page_type = jQuery('#tour_ajax_data_page_type').val();
	var filter_type = jQuery('#tour_ajax_data_filter_type').val();
	var slug_id = jQuery('#tour_ajax_data_slug_id').val();

	// update ajax start value
	jQuery('#tour_ajax_data_start').val(0);
	jQuery('#tour_ajax_viator_data_start').val(0);

	// define array
	var tags_arr = [];

	// get theme
	if (jQuery('.activity_related_tags:checked').length) {
		jQuery('.activity_related_tags:checked').each(function (index) {
			tags_arr[index] = jQuery(this).val();
		});
	}

	// show reset button
	if (tags_arr.length > 0) {
		// apply filter
		fetchListingFilterToursAjax('', 'filter', true, [{
			'viator_tags': tags_arr,
			'page_type': page_type,
			'slug_id': slug_id,
		}]);

		// show reset button
		jQuery('.reset_modal_filter').show();
	}
});

/**
 * on click listing related personas filter
 */
jQuery(document.body).on('change', ".tour_related_personas", function () {
	// get data
	var page_type = jQuery('#tour_ajax_data_page_type').val();
	var filter_type = jQuery('#tour_ajax_data_filter_type').val();
	var slug_id = jQuery('#tour_ajax_data_slug_id').val();

	// update ajax start value
	jQuery('#tour_ajax_data_start').val(0);
	jQuery('#tour_ajax_viator_data_start').val(0);

	// define array
	var personas_arr = [];

	// get theme
	jQuery('.tour_related_personas:checked').each(function (index) {
		personas_arr.push(jQuery(this).val());
	});

	// show reset button
	if (personas_arr.length) {
		// apply filter
		fetchListingFilterToursAjax('', 'filter', true, [{
			'tour_personas': personas_arr,
			'page_type': page_type,
			'slug_id': slug_id,
		}]);

		// show reset button
		jQuery('.reset_modal_filter').show();
	} else {
		// apply filter
		fetchListingFilterToursAjax('', 'filter', true, [{
			'page_type': page_type,
			'slug_id': slug_id,
		}]);

		// hide reset button
		jQuery('.reset_modal_filter').hide();
	}
});

/**
 * on select agent is online show green icon
 */
jQuery(".check_is_agent_online").change(function (e) {
	e.preventDefault();

	// show loader
	jQuery('.show_default_loader').show();

	// set ajax start
	jQuery('#tour_ajax_data_start').val(0);
	jQuery('#tour_ajax_viator_data_start').val(0);

	// get checked flag
	var is_checked = jQuery(this).prop('checked');

	// update apply text
	jQuery('.apply_tour_filter').attr('disabled', true);
	jQuery('.apply_tour_filter').html('<i class="fa fa-spinner fa-spin"></i>');

	// get data
	var page_type = jQuery('#tour_ajax_data_page_type').val();
	var filter_type = jQuery('#tour_ajax_data_filter_type').val();
	var slug_id = jQuery('#tour_ajax_data_slug_id').val();

	// check check box is selected or not
	if (is_checked) {
		// apply filter
		fetchListingFilterToursAjax(jQuery(this), 'filter', false, [{
			'page_type': page_type,
			'filter_type': filter_type,
			'slug_id': slug_id,
			'is_online': 1,
		}]);

		// show reset filter button
		jQuery(".reset_modal_filter").show();

		// remove disabled
		jQuery(this).removeAttr('disabled');
	} else {
		// apply filter
		fetchListingFilterToursAjax(jQuery(this), 'reset', false, [{
			'page_type': page_type,
			'filter_type': filter_type,
			'slug_id': slug_id,
		}]);

		// remove disabled
		jQuery(this).removeAttr('disabled');
	}

	// hide loader
	jQuery('.show_default_loader').hide();
});

/**
 * fetch listing filter ajax
 */
function fetchListingFilterToursAjax(element, action, is_default_loader = false, extra_params = []) {
	// show default loader
	if (is_default_loader) {
		jQuery('.show_default_loader').show();
	}

	// define special filter
	var is_all_tours = 0;
	var is_special_deal = 0;
	var is_traveler_personas = 0;
	var is_agent_online = 0;
	var is_manully_reset = 0;
	var is_location_filter = '';
	var is_location_id = '';
	var is_tag_filter = '';

	// get hidden data
	var sync_type = jQuery('#tour_ajax_tour_sync_type').val();
	var page_type = jQuery('#tour_ajax_data_page_type').val();
	var filter_type = jQuery('#tour_ajax_data_filter_type').val();
	var child_slug_id = jQuery('#tour_ajax_data_slug_id').val();

	// active filter model
	var is_active_model = (sync_type == 'viator') ? '#activity_filter_modal ' : '#tour_filter_modal ';

	// get limit data
	var limit = jQuery("#tour_ajax_data_limit").val();
	var start = (sync_type == 'viator') ? jQuery("#tour_ajax_viator_data_start").val() : jQuery("#tour_ajax_data_start").val();

	// get define array
	var duration_arr = [];
	var destination_arr = [];
	var country_arr = [];
	var state_arr = [];
	var city_arr = [];
	var theme_arr = [];
	var personas_arr = [];
	var period_arr = [];
	var rating_arr = [];
	var viator_tags = [];
	var viator_category_arr = [];
	var special_badge_arr = [];
	var attraction_arr = [];
	var days_arr = '';

	// get selected sort by
	var select_sort = jQuery('.listing_sort_filter:checked').val();

	// get destination
	var destination_val = jQuery(is_active_model + '.filter_destination:checked').val();
	if (destination_val > 0 && destination_val != 'undefined') {
		destination_arr.push(destination_val);
	}

	// get duration
	jQuery(is_active_model + '.filter_duration:checked').each(function (index) {
		duration_arr.push(jQuery(this).val());
	});

	// get countries
	jQuery(is_active_model + '.filter_country:checked').each(function (index) {
		country_arr.push(jQuery(this).val());
	});

	// get states
	jQuery(is_active_model + '.filter_state:checked').each(function (index) {
		state_arr.push(jQuery(this).val());
	});

	// get city
	jQuery(is_active_model + '.filter_city:checked').each(function (index) {
		city_arr[index] = jQuery(this).val();
	});

	// get min and max price
	var min_price = jQuery(is_active_model + '.filter_min_price').val();
	var max_price = jQuery(is_active_model + '.filter_max_price').val();

	// get theme
	jQuery(is_active_model + '.filter_theme:checked').each(function (index) {
		theme_arr.push(jQuery(this).val());
	});

	// get days
	var days_filter_val = jQuery(is_active_model + '.filter_night:checked').val();
	if (days_filter_val != '') {
		days_arr = days_filter_val;
	}

	// get rating
	jQuery(is_active_model + '.filter_rating:checked').each(function (index) {
		rating_arr.push(jQuery(this).val());
	});

	// get viator category
	jQuery(is_active_model + '.filter_categories:checked').each(function (index) {
		viator_category_arr.push(jQuery(this).val());
	});

	// get special badge
	jQuery(is_active_model + '.filter_special_badge:checked').each(function (index) {
		special_badge_arr.push(jQuery(this).val());
	});

	// get attraction
	jQuery(is_active_model + '.filter_attraction:checked').each(function (index) {
		attraction_arr.push(jQuery(this).val());
	});

	// get trveler personas
	jQuery(is_active_model + '.tour_related_personas:checked').each(function (index) {
		personas_arr.push(jQuery(this).val());
	});

	// get trveler personas
	jQuery(is_active_model + '.filter_traveler_personas:checked').each(function (index) {
		personas_arr.push(jQuery(this).val());
	});

	// get activity related tags
	jQuery(is_active_model + '.activity_related_tags:checked').each(function (index) {
		viator_tags.push(jQuery(this).val());
	});

	// if set extra parameters
	if (extra_params.length) {
		// fetch extra parameters
		jQuery.each(extra_params, function (index, param) {
			if (param.page_type == "special_deal") {
				is_special_deal = 1;
			} else if (param.page_type == "traveler_personas") {
				is_traveler_personas = 1;
			} else if (param.page_type == "all_tours") {
				is_all_tours = 1;
			} else if (param.page_type == "destination") {
				if (action == 'filter' || action == 'sort' || action == 'reset') {
					is_location_filter = param.page_type;
					is_location_id = param.slug_id;
				} else if (action == 'loadmore') {
					destination_arr.push(param.slug_id);
				}
			} else if (param.page_type == "country") {
				if (action == 'filter' || action == 'sort') {
					is_location_filter = param.page_type;
					is_location_id = param.slug_id;
				} else if (action == 'reset') {
					is_location_filter = param.page_type;
					is_location_id = param.slug_id;
					country_arr.push(param.slug_id);
				} else if (action == 'loadmore') {
					country_arr.push(param.slug_id);
				}
			} else if (param.page_type == "state") {
				if (action == 'filter' || action == 'sort') {
					is_location_filter = param.page_type;
					is_location_id = param.slug_id;
				} else if (action == 'reset') {
					is_location_filter = param.page_type;
					is_location_id = param.slug_id;
					state_arr.push(param.slug_id);
				} else if (action == 'loadmore') {
					state_arr.push(param.slug_id);
				}
			} else if (param.page_type == "city") {
				if (action == 'filter' || action == 'sort') {
					is_location_filter = param.page_type;
					is_location_id = param.slug_id;
				} else if (action == 'reset') {
					is_location_filter = param.page_type;
					is_location_id = param.slug_id;
					city_arr.push(param.slug_id);
				} else if (action == 'loadmore') {
					city_arr.push(param.slug_id);
				}
			} else if (param.page_type == "theme") {
				is_location_filter = param.page_type;
				is_location_id = param.slug_id;
			} else if (param.page_type == "personas") {
				is_location_filter = param.page_type;
				is_location_id = param.slug_id;
			} else if (param.page_type == "tag") {
				is_tag_filter = param.slug_id;
			}
		});

		// if show agent online
		if (extra_params[0]['is_online'] === 1) {
			is_agent_online = 1;
		}

		// if tour theme is selected
		if (extra_params[0]['viator_tags'] && extra_params[0]['viator_tags'].length > 0) {
			// push data in array
			viator_tags = extra_params[0]['viator_tags'];

			// check filter type
			if (is_location_filter == 'destination') {
				destination_arr.push(is_location_id);
			} else if (is_location_filter == 'country') {
				country_arr.push(is_location_id);
			} else if (is_location_filter == 'state') {
				state_arr.push(is_location_id);
			} else if (is_location_filter == 'city') {
				city_arr.push(is_location_id);
			}
		}

		// if tour theme is selected
		if (extra_params[0]['tour_themes'] && extra_params[0]['tour_themes'].length > 0) {
			// push data in array
			theme_arr = extra_params[0]['tour_themes'];

			// check filter type
			if (is_location_filter == 'destination') {
				destination_arr.push(is_location_id);
			} else if (is_location_filter == 'country') {
				country_arr.push(is_location_id);
			} else if (is_location_filter == 'state') {
				state_arr.push(is_location_id);
			} else if (is_location_filter == 'city') {
				city_arr.push(is_location_id);
			}
		}

		// if tour destination is selected
		if (extra_params[0]['tour_destination'] && extra_params[0]['tour_destination'].length > 0) {
			// push data in array
			destination_arr = extra_params[0]['tour_destination'];

			// check filter type
			if (is_location_filter == 'destination') {
				destination_arr.push(is_location_id);
			} else if (is_location_filter == 'country') {
				country_arr.push(is_location_id);
			} else if (is_location_filter == 'state') {
				state_arr.push(is_location_id);
			} else if (is_location_filter == 'city') {
				city_arr.push(is_location_id);
			}
		}

		// if tour sort by is selected
		if (extra_params[0]['select_sort']) {
			// push data in array
			select_sort = extra_params[0]['select_sort'];
		}

		// check sort filter is apply
		if (select_sort && action == 'sort') {
			// check filter type
			if (is_location_filter == 'destination') {
				destination_arr.push(is_location_id);
			} else if (is_location_filter == 'country') {
				country_arr.push(is_location_id);
			} else if (is_location_filter == 'state') {
				state_arr.push(is_location_id);
			} else if (is_location_filter == 'city') {
				city_arr.push(is_location_id);
			}
		}
	}

	// check if manually reset
	if (destination_arr.length == 0 && country_arr.length == 0 && city_arr.length == 0 && theme_arr.length == 0 && personas_arr.length == 0 && viator_tags.length == 0 && viator_category_arr.length == 0 && days_arr == '') {
		is_manully_reset = 1;
	}

	// apply filters
	jQuery.ajax({
		type: "GET",
		url: mds_config.base_url + "listing_filter_ajax",
		data: {
			'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
			'sync_type': sync_type,
			'is_all_tours': is_all_tours,
			'is_agent_online': is_agent_online,
			'is_special_deal': is_special_deal,
			'is_traveler_personas': is_traveler_personas,
			'is_location_filter': is_location_filter,
			'is_location_id': is_location_id,
			'is_tag_filter': is_tag_filter,
			'duration': duration_arr,
			'destinations': destination_arr,
			'countries': country_arr,
			'states': state_arr,
			'cities': city_arr,
			'min_price': min_price,
			'max_price': max_price,
			'themes': theme_arr,
			'personas': personas_arr,
			'viator_tags': viator_tags,
			'viator_category_arr': viator_category_arr,
			'special_badge_arr': special_badge_arr,
			'attraction_arr': attraction_arr,
			'days': days_arr,
			'period': period_arr,
			'rating': rating_arr,
			'sort': select_sort,
			'limit': limit,
			'start': start
		},
		dataType: 'json',
		beforeSend: function () {
			if (element) {
				if (action == "loadmore") {
					element.attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Load more');
				} else if (action == "filter" || action == "reset") {
					element.attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i>');
				}
			}
		},
		success: function (response) {
			// define default value
			var found_total_tours = 0;
			var is_main_sync_class = '.to_listing_default_products';
			var updated_content_class = '.to_listing_default_products .tour_listing_page';

			// get original tour count
			var original_default_tour_total = jQuery('#tour_ajax_total_count').val();
			var original_viator_tour_total = jQuery('#tour_ajax_viator_total_count').val();

			// check sync type and set content class
			if (sync_type == 'viator') {
				is_main_sync_class = '.to_listing_viator_products';
				updated_content_class = '.to_listing_viator_products .viator_tour_listing_page';
			}

			// check response
			if (action == "filter" || action == "reset" || action == 'sort') {
				// set html content
				if (response.html_content) {
					jQuery(updated_content_class).html(response.html_content);
				} else {
					// check sync type
					if (sync_type == 'viator') {
						jQuery(updated_content_class).html('<div style="text-align: center; padding: 100px; font-size: 20px; color: #ff4c46;"><h3>No Activities Available!</h3></div>');
					} else {
						jQuery(updated_content_class).html('<div style="text-align: center; padding: 100px; font-size: 20px; color: #ff4c46;"><h3>No Tours Available!</h3></div>');
					}
				}

				// check apply is enabled or diabled
				if (element && action == "filter") {
					element.attr('disabled', false).html("Apply");
				}

				// check tour count
				if (response.total_count) {
					// update start value
					if (response.total_count >= limit) {
						found_total_tours = parseInt(limit);
						if (sync_type == 'viator') {
							jQuery("#tour_ajax_viator_data_start").val(parseInt(limit));
						} else {
							jQuery("#tour_ajax_data_start").val(parseInt(limit));
						}
						jQuery(is_main_sync_class + " #listing_load_more_btn").attr('disabled', false).html("Load more").show();
					} else {
						found_total_tours = parseInt(response.total_count);
						if (sync_type == 'viator') {
							jQuery("#tour_ajax_viator_data_start").val(parseInt(response.total_count));
						} else {
							jQuery("#tour_ajax_data_start").val(parseInt(response.total_count));
						}
						jQuery(is_main_sync_class + " #listing_load_more_btn").attr('disabled', false).html("Load more").hide();
					}
				} else {
					// hide load more button
					jQuery(is_main_sync_class + " #listing_load_more_btn").attr('disabled', false).html("Load more").hide();
				}
			} else if (action == "loadmore") {
				// set html content
				if (response.html_content) {
					jQuery(updated_content_class).append(response.html_content);
				}

				// set ajax start value
				if (response.total_count) {
					// get ajax start value
					var default_start_value = jQuery("#tour_ajax_data_start").val();
					var viator_start_value = jQuery("#tour_ajax_viator_data_start").val();

					// update start value
					if (response.total_count >= limit) {
						if (sync_type == 'viator') {
							found_total_tours = parseInt(viator_start_value) + parseInt(limit);
							jQuery("#tour_ajax_viator_data_start").val(parseInt(viator_start_value) + parseInt(limit));
						} else {
							found_total_tours = parseInt(viator_start_value) + parseInt(limit);
							jQuery("#tour_ajax_data_start").val(parseInt(viator_start_value) + parseInt(limit));
						}
						jQuery(is_main_sync_class + " #listing_load_more_btn").attr('disabled', false).html("Load more").show();
					} else {
						if (sync_type == 'viator') {
							found_total_tours = parseInt(default_start_value) + parseInt(response.total_count);
							jQuery("#tour_ajax_viator_data_start").val(parseInt(default_start_value) + parseInt(response.total_count));
						} else {
							found_total_tours = parseInt(default_start_value) + parseInt(response.total_count);
							jQuery("#tour_ajax_data_start").val(parseInt(default_start_value) + parseInt(response.total_count));
						}
						jQuery(is_main_sync_class + " #listing_load_more_btn").attr('disabled', false).html("Load more").hide();
					}
				} else {
					// hide load more button
					jQuery(is_main_sync_class + " #listing_load_more_btn").attr('disabled', false).html("Load more").hide();
				}
			}

			// update total found tours label
			if (is_manully_reset) {
				// define default value
				var found_count_prefix = 'tours & activities';

				// update line
				jQuery('.listing_tour_count').html('We found ' + (Number(original_default_tour_total) + Number(original_viator_tour_total)) + ' ' + found_count_prefix);
			} else if (action == 'filter') {
				// define default value
				var found_count_prefix = 'tour';

				// check sync type prefix
				if (sync_type == 'viator') {
					found_count_prefix = (response.found_count == 1) ? 'activity' : 'activities';
				} else {
					found_count_prefix = (response.found_count == 1) ? 'tour' : 'tours';
				}

				// update line
				jQuery('.listing_tour_count').html('We found ' + response.found_count + ' ' + found_count_prefix);
			} else if (action == 'reset') {
				// define default value
				var found_count_prefix = 'tours & activities';

				// update line
				jQuery('.listing_tour_count').html('We found ' + (Number(original_default_tour_total) + Number(original_viator_tour_total)) + ' ' + found_count_prefix);
			}

			// reset filter
			jQuery(".apply_tour_filter").attr('disabled', false);
			jQuery(".apply_tour_filter").html("Apply");
			jQuery(".apply_activity_filter").attr('disabled', false);
			jQuery(".apply_activity_filter").html("Apply");

			// hide reset filter button
			if (action == 'reset' || is_manully_reset) {
				// hide and show button
				jQuery('.reset_modal_filter').hide();
				jQuery('.remove_tour_filter').attr('disabled', false);
				jQuery('.remove_tour_filter').html('Reset');
				jQuery('.remove_activity_filter').attr('disabled', false);
				jQuery('.remove_activity_filter').html('Reset');
			}

			// close filter modal
			jQuery(".filterModal_Listing .btn-close").trigger('click');

			// reset default loader
			jQuery('.show_default_loader').hide();

			// init new slider
			initNewTourSlider();
		}
	});
}

/**
 * on click open itinerary tab
 */
jQuery('.itinerary_pkg').click(function () {
	// get current tab no
	var active_tab = jQuery(this).data('tab');

	// filter tab number
	if (active_tab == 'tab-1') {
		var tab_no = 1;
	} else if (active_tab == 'tab-2') {
		var tab_no = 2;
	} else if (active_tab == 'tab-3') {
		var tab_no = 3;
	}

	// hide active tab
	jQuery('.itinerary_pkg').removeClass('active');
	jQuery('.itinerary_pkg_content').removeClass('current');

	// active tab content
	jQuery('.itinerary_pkg_content_' + tab_no).addClass('current');

	// active selected tab
	jQuery('.itinerary_pkg_' + tab_no).addClass('active');
});

/**
 * on click load more blog
 */
jQuery(document.body).on('click', '#blog_load_more', function () {
	// get hidden data
	var search_keyword = jQuery('.blog_search_field').val();
	var category_id = jQuery('.blog_category_filter :selected').val();
	var author_id = jQuery('.blog_author_filter :selected').val();
	var page_name = jQuery('.hidden_page_name').val();
	var slug_id = jQuery('.hidden_slug_id').val();
	var per_page = jQuery('.hidden_per_page').val();
	var offset = jQuery('.hidden_offset').val();

	// apply filters
	jQuery.ajax({
		type: "POST",
		url: mds_config.base_url + "blog/filter_blog_ajax",
		data: {
			'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
			'action': 'load_more',
			'page_name': page_name,
			'search_keyword': search_keyword,
			'category_id': category_id,
			'author_id': author_id,
			'slug_id': slug_id,
			'per_page': per_page,
			'offset': offset
		},
		beforeSend: function () {
			// show loader
			jQuery('#blog_load_more button').attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Load more');
		},
		success: function (response) {
			// parse json
			var parse_json = JSON.parse(response);

			// update offset count
			var updated_offset_count = Number(offset) + Number(parse_json.filter_count);
			jQuery('.hidden_offset').val(updated_offset_count);

			// check html content
			if (parse_json.html_content) {
				jQuery('.blog_listing_page').append(parse_json.html_content);
			}

			// check load more button
			if (parse_json.html_content != '' && parse_json.filter_count && parse_json.filter_count >= per_page) {
				jQuery('#blog_load_more').show();
			} else {
				jQuery('#blog_load_more').hide();
			}
		},
		complete: function () {
			// show loader
			jQuery('#blog_load_more button').attr('disabled', false).html('Load more');
		}
	});
});

/**
 * search blog
 **/
jQuery(document).ready(function () {
	var typingTimer;
	var overTypingInterval = 1000;

	// on keyword search
	jQuery('.blog_search_field').keyup(function () {
		clearTimeout(typingTimer);
		if (jQuery('.blog_search_field').val()) {
			typingTimer = setTimeout(overTyping, overTypingInterval);
		}
	});

	// on author filter
	jQuery('.blog_author_filter').change(function () {
		overTyping('author');
	});

	// on category filter
	jQuery('.blog_category_filter').change(function () {
		overTyping('category');
	});

	// on reset filter
	jQuery('.blog_reset_ajax').click(function () {
		// reset field value
		jQuery('.blog_search_field').val('');
		jQuery('.hidden_offset').val(0);
		jQuery('.blog_category_filter').prop('selectedIndex', 0);
		jQuery('.blog_author_filter').prop('selectedIndex', 0);

		// hide reset
		jQuery('.blog_reset_ajax').hide();

		// apply filter
		overTyping('reset');
	});

	// on default reset filter
	jQuery(document.body).on('click', '.default_blog_reset_ajax', function () {
		// reset field value
		jQuery('.blog_search_field').val('');
		jQuery('.hidden_offset').val(0);
		jQuery('.blog_category_filter').prop('selectedIndex', 0);
		jQuery('.blog_author_filter').prop('selectedIndex', 0);

		// hide reset
		jQuery('.blog_reset_ajax').hide();

		// apply filter
		overTyping('reset');
	});

	// typing is over
	function overTyping(action) {
		// get hidden data
		var search_keyword = jQuery('.blog_search_field').val();
		var category_id = jQuery('.blog_category_filter :selected').val();
		var author_id = jQuery('.blog_author_filter :selected').val();
		var page_name = jQuery('.hidden_page_name').val();
		var slug_id = jQuery('.hidden_slug_id').val();
		var per_page = jQuery('.hidden_per_page').val();
		var offset = 0;

		// reset offset value
		jQuery('.hidden_offset').val(offset);

		// apply filters
		jQuery.ajax({
			type: "POST",
			url: mds_config.base_url + "blog/filter_blog_ajax",
			data: {
				'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
				'action': action,
				'page_name': page_name,
				'search_keyword': search_keyword,
				'category_id': category_id,
				'author_id': author_id,
				'slug_id': slug_id,
				'per_page': per_page,
				'offset': offset
			},
			beforeSend: function () {
				// show loader
				jQuery('.blog_search_loader').html('<i class="fa fa-spinner fa-spin"></i>');
			},
			success: function (response) {
				// parse json
				var parse_json = JSON.parse(response);

				// show reset button
				if (action != 'reset') {
					jQuery('.blog_reset_ajax').show();
				}

				// update offset count
				var updated_offset_count = Number(offset) + Number(parse_json.filter_count);
				jQuery('.hidden_offset').val(updated_offset_count);

				// check html content
				if (parse_json.html_content) {
					jQuery('.blog_listing_page').html(parse_json.html_content);
				} else {
					jQuery('.blog_listing_page').html('<div class="col-12 col-md-12 col-lg-12 blog_not_found"><h5>Oops! Blog not found.</h5><button type="button" class="default_blog_reset_ajax">Reload Page</button></div>');
				}

				// update total blog found count
				var count_prefix = (parse_json.all_count == 1) ? ' blog' : ' blogs';
				jQuery('.blog-hero-content h1').html(parse_json.all_count + count_prefix + ' found');

				// check load more button
				if (parse_json.html_content != '' && parse_json.filter_count && parse_json.filter_count >= per_page) {
					jQuery('#blog_load_more').show();
				} else {
					jQuery('#blog_load_more').hide();
				}
			},
			complete: function () {
				// stop loader
				jQuery('.blog_search_loader').html('<ion-icon name="search-outline"></ion-icon>');
			}
		});
	}
});

/**
 * on selection listing sync products
 */
jQuery('.listing-page .choose_product_sync_type').click(function () {
	// get selected type
	var sync_type = jQuery(this).attr('data-sync_type');

	// Reset classes and set active class
	jQuery('.choose_product_sync_type').removeClass('active');
	jQuery(this).addClass('active');

	// Update hidden data
	jQuery('#tour_ajax_tour_sync_type').val(sync_type);

	// match sync type
	if (sync_type == 'viator') {
		// show listing section
		jQuery('.to_listing_default_products').css('display', 'none');
		jQuery('.to_listing_viator_products').css('display', '');

		// active top filters
		jQuery('.tour_related_theme_slider').hide();
		jQuery('.related_viator_tags_slider').show();

		// active short by filter
		jQuery('.viator_tour_short_by_filter').show();
		jQuery('.default_tour_short_by_filter').hide();

		// active filter popup
		jQuery('.viator_listing_filter_btn').show();
		jQuery('.default_listing_filter_btn').hide();

		// init slider
		jQuery('.viator_activity_theme_slider').slick({
			arrows: false,
			dots: false,
			infinite: false,
			speed: 300,
			slidesToShow: 7,
			slidesToScroll: 7,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 7,
						slidesToScroll: 7,
						infinite: false,
						arrows: false,
						dots: false
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 7,
						slidesToScroll: 7,
						infinite: false,
						arrows: false,
						dots: true
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 6,
						slidesToScroll: 6,
						infinite: false,
						arrows: false,
						dots: true
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4,
						infinite: false,
						arrows: false,
						dots: true
					}
				}
			]
		});
	} else {
		// show listing section
		jQuery('.to_listing_default_products').css('display', '');
		jQuery('.to_listing_viator_products').css('display', 'none');

		// active top filters
		jQuery('.tour_related_theme_slider').show();
		jQuery('.related_viator_tags_slider').hide();

		// active short by filter
		jQuery('.viator_tour_short_by_filter').hide();
		jQuery('.default_tour_short_by_filter').show();

		// active filter popup
		jQuery('.viator_listing_filter_btn').hide();
		jQuery('.default_listing_filter_btn').show();

		// init slider
		jQuery('.listing-slider').slick({
			arrows: false,
			dots: false,
			infinite: false,
			speed: 300,
			slidesToShow: 7,
			slidesToScroll: 7,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 7,
						slidesToScroll: 7,
						infinite: false,
						arrows: true,
						dots: false
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 7,
						slidesToScroll: 7,
						infinite: false,
						arrows: false,
						dots: true
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 6,
						slidesToScroll: 6,
						infinite: false,
						arrows: false,
						dots: true
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4,
						infinite: false,
						arrows: false,
						dots: true
					}
				}
			]
		});
	}

	// resize event
	setTimeout(function () {
		jQuery(window).trigger('resize');
	}, 100);
});

/**
 * on click open viator traveler selection
 */
jQuery('.viator_activity_travelers').on('click', function (e) {
	e.preventDefault();

	// get is active
	var is_active = jQuery('.viator_activity_travelers_selection_box').hasClass('active');

	// check is active
	if (is_active) {
		jQuery('.viator_activity_travelers_selection_box').removeClass('active').hide();
	} else {
		jQuery('.viator_activity_travelers_selection_box').addClass('active').show();
	}
});

/**
 * on click close traveler selection model
 */
jQuery('.viator_activity_date').on('click', function (e) {
	e.preventDefault();

	// hide traveler selection box
	jQuery('.viator_activity_travelers_selection_box').removeClass('active').hide();

	// copy price in date box
	viator_synced_price_on_date();
});

/**
 * viator synced price on calender date
 */
function viator_synced_price_on_date() {
	// get tour price
	var offer_price = jQuery('.viator_single_product .offer_price').html();
	var selling_price = jQuery('.viator_single_product .selling_price').html();

	// define default price
	var default_price = (offer_price) ? offer_price : selling_price;
	default_price = default_price.replace('$', '');
	default_price = Math.round(default_price);

	// update price on every date
	setTimeout(function () {
		// check offer price is synced
		var is_synced_price = jQuery('.ui-datepicker td a span').hasClass('is_offer_price');

		// check is synced offer price
		if (is_synced_price == false) {
			jQuery('.ui-datepicker td a').append('<span class="is_offer_price">$' + default_price + '</span>');
		}
	}, 10);
}

/**
 * disabled viator activity travelers input field
 */
jQuery('.viator_activity_travelers').keydown(function () {
	return false;
});

/**
 * on viator traveler count plus
 */
jQuery('.viator_activity_travelers_selection_box .plus_minus_count').on('click', function (e) {
	e.preventDefault();

	// hide single book button and show check availability
	jQuery('.viator_single_product .is_only_single_book_viator_tour').hide();
	jQuery('.viator_single_product .viator_check_availability_btn').show();

	// get input data
	var $this         = jQuery(this);
	var action_type   = $this.data('action');
	var traveler_type = $this.data('traveler_type');
	var min_allow     = $this.data('min_allow');
	var max_allow     = $this.data('max_allow');
	var total_allow   = $this.data('total_allow');
	var $totalCounts  = jQuery('.viator_activity_travelers_selection_box .total_count');

	// calc total selection
	var total_selection = $totalCounts.toArray().reduce(function (acc, elem) {
		return acc + parseInt(jQuery(elem).text());
	}, 0);

	// get is active count
	var $countBox = jQuery('.viator_activity_travelers_selection_box .count_box_' + traveler_type + ' .total_count');
	var is_count = parseInt($countBox.text());

	// updated count is
	var updated_count_is = (action_type == 'plus') ? (is_count + 1) : (is_count - 1);
	updated_count_is = Math.max(0, updated_count_is);
	total_selection += (action_type == 'plus') ? 1 : -1;

	// hide minus button if count is at the minimum allowed value
	$this.attr('disabled', updated_count_is > min_allow);

	// check total travelers count and specific traveler type
	if (total_allow >= total_selection && updated_count_is >= min_allow && updated_count_is <= max_allow) {
	    // enable selection
	    jQuery('.viator_activity_travelers_selection_box .count_box_' + traveler_type + ' .plus_count').attr('disabled', false);

	    // enable minus button only if count is greater than min_allow
	    jQuery('.viator_activity_travelers_selection_box .count_box_' + traveler_type + ' .minus_count').attr('disabled', updated_count_is <= min_allow);

	    // update count in input field
	    $countBox.text(updated_count_is);
	} else {
	    // disable selection
	    $this.attr('disabled', true);
	}

	// disable plus button if total exceeds maximum
	jQuery('.viator_activity_travelers_selection_box .plus_count').attr('disabled', total_selection >= total_allow);

	// update traveler text
	var display_traveler_text = $totalCounts.map(function () {
		var selected_count = parseInt(jQuery(this).text());
		var traveler_type = jQuery(this).data('traveler_type');
		var is_prefix = (selected_count > 1) ? traveler_type + 's' : traveler_type;
		return selected_count ? selected_count + ' ' + is_prefix : null;
	}).get().filter(Boolean).join(", ") || 'Please select travelers';

	jQuery('.viator_activity_travelers').val(display_traveler_text);
});

/**
 * on click apply viator travelers selection
 */
jQuery('.apply_date_traveler_filter').on('click', function (e) {
	e.preventDefault();

	// hide popup
	jQuery('.viator_activity_travelers_selection_box').removeClass('active').hide();
});

/**
 * close traveler selection click outside box
 */
jQuery(document).ready(function () {
	// get references to the parent and child divs
	var $parentDiv = jQuery('.viator_activity_travelers');
	var $childDiv = jQuery('.viator_activity_travelers_selection_box');

	// add a click event listener to the document
	jQuery(document).on('click', function (event) {
		if (!$childDiv.is(event.target) && $childDiv.has(event.target).length === 0) {
			$childDiv.removeClass('active').hide();
		}
	});

	// add a click event listener to the parent div to prevent propagation
	$parentDiv.on('click', function (event) {
		event.stopPropagation();
	});
});

/**
 * on viator click check availability
 */
jQuery('.viator_check_availability_btn').on('click', function (e) {
	e.preventDefault();

	// get hidden input
	var tour_id = jQuery('#single_page_tour_id').val();
	var product_code = jQuery('#single_page_product_code').val();
	var travel_date = jQuery('.viator_activity_date').val();

	// get input data
	var total_selection = 0;
	var selected_travelers = [];

	// fetch total selection
	jQuery('.viator_activity_travelers_selection_box .total_count').each(function (index, key) {
		// update total selection
		total_selection = total_selection + Number(jQuery(this).text());

		// get travelers count
		var selected_count = Number(jQuery(this).text());
		var traveler_type = jQuery(this).data('traveler_type');

		// push data in array
		if (selected_count && traveler_type != 'Please select travelers') {
			selected_travelers.push(selected_count + '@' + traveler_type);
		}
	});

	// check travelers is valid
	if (selected_travelers.length) {
		// perform ajax
		jQuery.ajax({
			type: "POST",
			url: mds_config.base_url + "viator/check_availability",
			data: {
				'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
				'tour_id': tour_id,
				'product_code': product_code,
				'travel_date': travel_date,
				'total_selection': total_selection,
				'selected_travelers': selected_travelers,
			},
			beforeSend: function () {
				// show loader
				jQuery('.viator_check_availability_btn').attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Check Availability');
			},
			success: function (response) {
				// convert json encode
				var json_parse = JSON.parse(response);

				// check status
				if (json_parse.status) {
					// check is only single booked
					if (json_parse.is_only_bookable) {
						// remove compare package tag and content
						jQuery('.to_activity_compare_tabs .itinerary_tab').remove();
						jQuery('.to_activity_compare_tabs .compare_content_tab').remove();
						jQuery('.to_activity_compare_tabs .overview_tab').addClass('active');
						jQuery('.to_activity_compare_tabs .overview_content_tab').addClass('itinerary_tab_Bg2').css('display', 'block');

						// show single book button
						jQuery('.is_only_single_book_viator_tour').show();

						// update tour data
						jQuery('.is_only_single_book_viator_tour').data('pkg_option_code', json_parse.pkg_option_code);

						// hide check availability
						jQuery('.viator_check_availability_btn').hide();
					} else {
						// show book options
						jQuery('.viator_booking_options').html(json_parse.html_content);

						// scroll down
						jQuery('html, body').animate({
							scrollTop: jQuery('.details_tabPackageSec').offset().top
						}, 0);
					}
				} else {
					// remove content from package
					jQuery('.viator_single_product .viator_booking_options').html('<span class="compare_notice">Please select a travel date and travelers to show booking options.</span>');

					// show notification
					jQuery('.error_notification').show();
					jQuery('.error_notification .popup_content').html('Unfortunately, the date you have chosen is not currently available for this activity.');

					// hide notification
					setTimeout(function () {
						// hide message
						jQuery('.error_notification').hide();
					}, 4000);
				}

				// init slider
				jQuery('#packageSlider').slick({
					arrows: true,
					dots: false,
					infinite: false,
					speed: 300,
					slidesToShow: 3,
					slidesToScroll: 3,
					responsive: [
						{
							breakpoint: 992,
							settings: {
								arrows: true,
								slidesToShow: 2,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: 768,
							settings: {
								arrows: true,
								slidesToShow: 1,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: 480,
							settings: {
								arrows: true,
								slidesToShow: 1,
								slidesToScroll: 1
							}
						}
					]
				});

				// stop loader
				jQuery('.viator_check_availability_btn').attr('disabled', false).html('Check Availability');
			},
			complete: function () {
				// stop loader
				jQuery('.viator_check_availability_btn').attr('disabled', false).html('Check Availability');
			}
		});
	} else {
		// show notification
		jQuery('.error_notification').show();
		jQuery('.error_notification .popup_content').html('Oops! Please choose valid traveler selections.');

		// hide notification
		setTimeout(function () {
			// hide message
			jQuery('.error_notification').hide();
		}, 4000);
	}
});

/**
 * on click select package time
 */
jQuery(document.body).on('click', '.viator_booking_options .viator_price_option_btn', function (e) {
	e.preventDefault();

	// get hidden input
	var item_key = jQuery(this).data('item_key');
	var option_code = jQuery(this).data('option_code');
	var start_time = jQuery(this).data('start_time');

	// hide/show option
	jQuery('.viator_booking_options .viator_price_selection_' + option_code).hide();
	jQuery('.viator_booking_options .viator_price_option_' + item_key + '_option_' + option_code).show();

	// active button
	jQuery('.viator_booking_option_choose_btn .viator_price_option_btn').addClass('inactive').removeClass('active');
	jQuery('.viator_booking_option_choose_btn .viator_price_option_' + item_key + '_btn_' + option_code).addClass('active').removeClass('inactive');
});

/**
 * on click viator activity book now
 */
jQuery(document.body).on('click', '.is_viator_book_now_btn', function (e) {
	e.preventDefault();

	// get selected packages option
	var selected_option  = jQuery('.viator_booking_option_choose_btn .viator_price_option_btn.active');
	var pkg_option_code  = selected_option.data('option_code');
	var start_time       = selected_option.data('start_time');
	var is_only_bookable = jQuery(this).data('is_only_bookable');
	var pkg_no           = jQuery(this).data('pkg_no');

	// get hidden data
	var tour_id      = jQuery('#single_page_tour_id').val();
	var product_code = jQuery('#single_page_product_code').val();
	var travel_date  = jQuery('.viator_activity_date').val();

	// get input data
	var total_selection = 0;
	var selected_travelers = [];

	// fetch total selection
	jQuery('.viator_activity_travelers_selection_box .total_count').each(function (index, key) {
		// update total selection
		total_selection = total_selection + Number(jQuery(this).text());

		// get travelers count
		var selected_count = Number(jQuery(this).text());
		var traveler_type = jQuery(this).data('traveler_type');

		// push data in array
		if (selected_count) {
			selected_travelers.push(selected_count + '@' + traveler_type);
		}
	});

	// booking to cart hold
	jQuery.ajax({
		type: "POST",
		url: mds_config.base_url + "viator/booking_cart_hold",
		data: {
			'csrf_mds_token'    : jQuery.cookie(mds_config.csfr_cookie_name),
			'is_only_bookable'  : is_only_bookable ? 'yes' : 'no',
			'tour_id'           : tour_id,
			'product_code'      : product_code,
			'travel_date'       : travel_date,
			'pkg_option_code'   : pkg_option_code,
			'start_time'        : start_time,
			'total_selection'   : total_selection,
			'selected_travelers': selected_travelers,
		},
		beforeSend: function () {
			// show loader
			jQuery('.is_viator_book_now_btn').attr('disabled', true).css('cursor', 'not-allowed');
			jQuery('.is_viator_book_now_' + pkg_no).attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Book Now');
		},
		success: function (response) {
			// parse json data
			var json_parse = JSON.parse(response);

			// check response is valid
			if (json_parse.status) {
				// show notification
				jQuery('.success_notification').show();
				jQuery('.success_notification .popup_content').html('<i class="fa fa-check-circle"></i> Success! Your selected activity has been added to the cart.');

				// hide notification
				setTimeout(function () {
					// hide message
					jQuery('.success_notification').hide();

					// redirect to cart page
					window.location.href = mds_config.base_url + "cart";
				}, 3000);
			} else {
				// show notification
				jQuery('.error_notification').show();
				jQuery('.error_notification .popup_content').html('<i class="fa fa-remove"></i> ERROR: ' + json_parse.message);

				// hide notification
				setTimeout(function () {
					// hide message
					jQuery('.error_notification').hide();
				}, 4000);
			}
		},
		complete: function () {
			// stop loader
			jQuery('.is_viator_book_now_btn').attr('disabled', false).css('cursor', 'pointer');
			jQuery('.is_viator_book_now_' + pkg_no).attr('disabled', false).html('Book Now');
		}
	});
});

/**
 * on click direct book viator activity
 */
jQuery('.viator_single_product .is_only_single_book_viator_tour').click(function (e) {
	e.preventDefault();

	// get hidden data
	var tour_id         = jQuery('#single_page_tour_id').val();
	var product_code    = jQuery('#single_page_product_code').val();
	var travel_date     = jQuery('.viator_activity_date').val();
	var pkg_option_code = jQuery(this).data('pkg_option_code');

	// get input data
	var total_selection = 0;
	var selected_travelers = [];

	// fetch total selection
	jQuery('.viator_activity_travelers_selection_box .total_count').each(function (index, key) {
		// update total selection
		total_selection = total_selection + Number(jQuery(this).text());

		// get travelers count
		var selected_count = Number(jQuery(this).text());
		var traveler_type = jQuery(this).data('traveler_type');

		// push data in array
		if (selected_count) {
			selected_travelers.push(selected_count + '@' + traveler_type);
		}
	});

	// booking to cart hold
	jQuery.ajax({
		type: "POST",
		url: mds_config.base_url + "viator/booking_cart_hold",
		data: {
			'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
			'is_only_bookable': 'yes',
			'is_only_special': 'yes',
			'tour_id': tour_id,
			'product_code': product_code,
			'pkg_option_code': pkg_option_code,
			'travel_date': travel_date,
			'total_selection': total_selection,
			'selected_travelers': selected_travelers,
		},
		beforeSend: function () {
			// show loader
			jQuery('.is_only_single_book_viator_tour').attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Book Now');
		},
		success: function (response) {
			// parse json data
			var json_parse = JSON.parse(response);

			// check response is valid
			if (json_parse.status) {
				// show notification
				jQuery('.success_notification').show();
				jQuery('.success_notification .popup_content').html('<i class="fa fa-check-circle"></i> Success! Your selected activity has been added to the cart.');

				// hide notification
				setTimeout(function () {
					// hide message
					jQuery('.success_notification').hide();

					// redirect to cart page
					window.location.href = mds_config.base_url + "cart";
				}, 3000);
			} else {
				// show notification
				jQuery('.error_notification').show();
				jQuery('.error_notification .popup_content').html('<i class="fa fa-remove"></i> ERROR: ' + json_parse.message);

				// hide notification
				setTimeout(function () {
					// hide message
					jQuery('.error_notification').hide();
				}, 4000);
			}
		},
		complete: function () {
			// stop loader
			jQuery('.is_only_single_book_viator_tour').attr('disabled', false).html('Book Now');
		}
	});
});

/**
 * on datepicker wrap
 */
jQuery(".datepicker-wrap").click(function () {
	jQuery("#datepicker").datepicker("show");
});

/**
 * on review li click
 */
jQuery(".reviews-bar ul li").on("click", function () {
	var contentId = jQuery(this).data("content");
	jQuery(".content").removeClass('show');
	jQuery("#" + contentId).addClass('show');
	jQuery('.review-section .review-slider').slick('refresh');
});

/**
 * on review check
 */
jQuery(".check-review").on("click", function (event) {
	event.preventDefault();
	jQuery(".perforcmance-wrapper").slideToggle();
});

/**
 * on click viator activity rating filter
 */
jQuery('.viator_single_product .choose_review_filter').click(function (e) {
	e.preventDefault();

	// get selected packages option
	var rating = jQuery(this).data('rating');
	var tour_id = jQuery(this).data('tour_id');

	// booking to cart hold
	jQuery.ajax({
		type: "POST",
		url: mds_config.base_url + "viator/activity_review_filter_with_rating",
		data: {
			'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
			'tour_id': tour_id,
			'rating': rating,
		},
		beforeSend: function () {
			// show loader
			jQuery('.viator_single_product .show_review_loader').show();
		},
		success: function (response) {
			// check response is valid
			if (response) {
				// update content
				jQuery('.viator_single_product .review-details').html(response);
			} else {
				// show notification
				jQuery('.error_notification').show();
				jQuery('.error_notification .popup_content').html("<i class='fa fa-star'></i> Unfortunately, we couldn't find any reviews for this rating.");

				// hide notification
				setTimeout(function () {
					// hide message
					jQuery('.error_notification').hide();
				}, 4000);
			}
		},
		complete: function () {
			// stop loader
			jQuery('.viator_single_product .show_review_loader').hide();
		}
	});
});

/**
 * on click viator reset review filter
 */
jQuery(document.body).on('click', '.viator_single_product .clear_review_filter', function (e) {
	e.preventDefault();

	// get selected packages option
	var rating = jQuery(this).data('rating');
	var tour_id = jQuery(this).data('tour_id');

	// booking to cart hold
	jQuery.ajax({
		type: "POST",
		url: mds_config.base_url + "viator/activity_review_filter_with_rating",
		data: {
			'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
			'tour_id': tour_id,
			'rating': rating,
		},
		beforeSend: function () {
			// show loader
			jQuery('.viator_single_product .clear_review_filter').html('<i class="fa fa-spinner fa-spin"></i> &nbsp; Clear filter');
		},
		success: function (response) {
			// check response is valid
			if (response) {
				// update content
				jQuery('.viator_single_product .review-details').html(response);
			} else {
				// show notification
				jQuery('.error_notification').show();
				jQuery('.error_notification .popup_content').html("<i class='fa fa-star'></i> Unfortunately, we couldn't find any reviews for this rating.");

				// hide notification
				setTimeout(function () {
					// hide message
					jQuery('.error_notification').hide();
				}, 4000);
			}
		},
		complete: function () {
			// stop loader
			jQuery('.viator_single_product .clear_review_filter').html('Clear filter');
		}
	});
});

/**
 * on click viator activity rating filter
 */
jQuery(document.body).on('click', '.viator_single_product .load_more_activity_review', function (e) {
	e.preventDefault();

	// get selected packages option
	var tour_id = jQuery(this).data('tour_id');
	var rating = jQuery(this).data('rating');

	// get offset
	var offset = jQuery('.viator_single_product .filter_review_offset').val();

	// booking to cart hold
	jQuery.ajax({
		type: "POST",
		url: mds_config.base_url + "viator/activity_review_filter_pagination",
		data: {
			'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
			'tour_id': tour_id,
			'rating': rating,
			'offset': offset,
		},
		beforeSend: function () {
			// show loader
			jQuery('.viator_single_product .load_more_activity_review').attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Load more');
		},
		success: function (response) {
			// parse json data
			var json_parse = JSON.parse(response);

			// check found reviews
			if (json_parse.found_reviews) {
				// update showing line
				jQuery('.viator_single_product .review_count_line').html(json_parse.showing_line);

				// update offset count
				jQuery('.viator_single_product .filter_review_offset').val(json_parse.next_offset);

				// update content
				jQuery('.viator_single_product .filter_reviews').html(json_parse.html_content);

				// show reset button
				jQuery('.viator_single_product .clear_review_filter').show();

				// count review for load more
				if (json_parse.found_reviews < 5) {
					// hide load more
					jQuery('.viator_single_product .load_more_activity_review').hide();
				}

				// scroll top
				window.scrollTo({ top: 1200, behavior: 'smooth' });
			} else {
				// hide load more
				jQuery('.viator_single_product .load_more_activity_review').hide();
			}
		},
		complete: function () {
			// stop loader
			jQuery('.viator_single_product .load_more_activity_review').attr('disabled', false).html('Load more');
		}
	});
});

// fetch viator checkout travelers details
function fetch_viator_checkout_travelers_info() {
	// define array
	let travelers_list = [];
	let isValid = true;

	// fetch elements
	var traveler_element = jQuery('.viator_travelers_details .viator_traveler_box');

	// Reset previous validation messages
    jQuery('.error-message').remove();

	// Validate each traveler box
    traveler_element.each(function() {
        // get hidden data
		var traveler_no  = jQuery(this).data('traveler_no');
		var age_band     = jQuery(this).data('age_band');
		var total_fields = jQuery(this).data('total_fields');

		// set traveler main class
		var main_class = '.viator_traveler_box_' + traveler_no + '_' + age_band;

		// define array
		let input_array = [];

		// fetch input field
		for (var input_no = 1; input_no <= total_fields; input_no++) {
			// define default value
			let input_value = '';

			// find element value
			let input_type = jQuery(main_class + ' #field_adult_' + traveler_no + '_' + input_no).data('input_type');

			// fetch input value
			if(input_type == 'select') {
				input_value = jQuery(main_class + ' #field_adult_' + traveler_no + '_' + input_no + ' :selected').val();
			} else if(input_type == 'number') {
				input_value = jQuery(main_class + ' #field_adult_' + traveler_no + '_' + input_no).val();
			} else {
				input_value = jQuery(main_class + ' #field_adult_' + traveler_no + '_' + input_no).val();
			}

			// check value is valid
			if(!input_value) {
				jQuery(main_class + ' #field_adult_' + traveler_no + '_' + input_no).after('<div class="error-message text-danger">This field is required</div>');
				isValid = false;
			} else {
				input_array.push(input_value);
			}
		}

		// push data in main array
		travelers_list.push(input_array);
    });

    // return response
    return (isValid) ? travelers_list : false;
}

// fetch viator checkout trasfer mode info
function fetch_viator_checkout_trasfer_mode_info() {
	// define array
	let trasfer_list = [];
	let isValid = true;

	// check is active trasfer mode
	var is_active_trasfer_mode           = jQuery('.checkout_page .is_viator_departure_details').val();
	var is_viator_departure_details_full = jQuery('.checkout_page .is_viator_departure_details_full').val();

	// check is full details
	if(is_viator_departure_details_full) {
		// get selected trasfer mode
		var selected_mode = jQuery('.checkout_page #transfer_departure_mode :selected').val();

		// check and get trasfer details
		if(selected_mode == 'Airpot') {
			// get selected mode values
			var transfer_air_arrival_airline   = jQuery('.departure_detail_airpot_box #transfer_air_arrival_airline').val();
			var transfer_air_arrival_flight_no = jQuery('.departure_detail_airpot_box #transfer_air_arrival_flight_no').val();
			var transfer_arrival_time          = jQuery('.departure_detail_airpot_box #transfer_arrival_time').val();
			var transfer_departure_date        = jQuery('.departure_detail_airpot_box #transfer_departure_date').val();
			var transfer_departure_pickup      = jQuery('.departure_detail_airpot_box #transfer_departure_pickup').val();

			// check entire values is valid
			if(transfer_air_arrival_airline && transfer_air_arrival_flight_no && transfer_arrival_time && transfer_departure_date && transfer_departure_pickup) {
				trasfer_list.push({
					'TRANSFER_ARRIVAL_MODE'           : "AIR",
					'TRANSFER_AIR_ARRIVAL_AIRLINE'    : transfer_air_arrival_airline,
					'TRANSFER_AIR_ARRIVAL_FLIGHT_NO'  : transfer_air_arrival_flight_no,
					'TRANSFER_ARRIVAL_DROP_OFF'       : transfer_departure_pickup, // FREETEXT
					'TRANSFER_ARRIVAL_TIME'           : transfer_arrival_time,
					'TRANSFER_DEPARTURE_MODE'         : "AIR",
					'TRANSFER_AIR_DEPARTURE_AIRLINE'  : transfer_air_arrival_airline,
					'TRANSFER_AIR_DEPARTURE_FLIGHT_NO': transfer_air_arrival_flight_no,
					'TRANSFER_DEPARTURE_DATE'         : transfer_departure_date,
					'TRANSFER_DEPARTURE_TIME'         : transfer_arrival_time,
					'TRANSFER_DEPARTURE_PICKUP'       : transfer_departure_pickup, // FREETEXT
				});
			}
		} else if(selected_mode == 'Port') {
			// get selected mode values
			var transfer_port_cruise_ship  = jQuery('.departure_detail_port_box #transfer_port_cruise_ship').val();
			var transfer_port_arrival_time = jQuery('.departure_detail_port_box #transfer_port_arrival_time').val();
			var transfer_departure_date    = jQuery('.departure_detail_port_box #transfer_departure_date').val();
			var transfer_departure_pickup  = jQuery('.departure_detail_port_box #transfer_departure_pickup').val();

			// check entire values is valid
			if(transfer_port_cruise_ship && transfer_port_arrival_time && transfer_departure_date && transfer_departure_pickup) {
				trasfer_list.push({
					'TRANSFER_ARRIVAL_MODE'       : "SEA",
					'TRANSFER_PORT_CRUISE_SHIP'   : transfer_port_cruise_ship,
					'TRANSFER_ARRIVAL_DROP_OFF'   : transfer_departure_pickup, // FREETEXT
					'TRANSFER_PORT_ARRIVAL_TIME'  : transfer_port_arrival_time,
					'TRANSFER_DEPARTURE_MODE'     : "SEA",
					'TRANSFER_PORT_CRUISE_SHIP'   : transfer_port_cruise_ship,
					'TRANSFER_DEPARTURE_DATE'     : transfer_departure_date,
					'TRANSFER_PORT_DEPARTURE_TIME': transfer_port_arrival_time,
					'TRANSFER_DEPARTURE_PICKUP'   : transfer_departure_pickup, // FREETEXT
				});
			}
		} else if(selected_mode == 'Train') {
			// get selected mode values
			var transfer_rail_arrival_line    = jQuery('.departure_detail_train_box #transfer_rail_arrival_line').val();
			var transfer_rail_arrival_station = jQuery('.departure_detail_train_box #transfer_rail_arrival_station').val();
			var transfer_departure_time       = jQuery('.departure_detail_train_box #transfer_departure_time').val();
			var transfer_departure_date       = jQuery('.departure_detail_train_box #transfer_departure_date').val();
			var transfer_departure_pickup     = jQuery('.departure_detail_train_box #transfer_departure_pickup').val();

			// check entire values is valid
			if(transfer_rail_arrival_line && transfer_rail_arrival_station && transfer_departure_time && transfer_departure_date && transfer_departure_pickup) {
				trasfer_list.push({
					'TRANSFER_ARRIVAL_MODE'          : "RAIL",
					'TRANSFER_RAIL_ARRIVAL_STATION'  : transfer_rail_arrival_station,
					'TRANSFER_ARRIVAL_DROP_OFF'      : transfer_departure_pickup, // FREETEXT
					'TRANSFER_RAIL_ARRIVAL_LINE'     : transfer_rail_arrival_line,
					'TRANSFER_ARRIVAL_TIME'          : transfer_departure_time,
					'TRANSFER_DEPARTURE_MODE'        : "RAIL",
					'TRANSFER_RAIL_DEPARTURE_LINE'   : transfer_rail_arrival_line,
					'TRANSFER_RAIL_DEPARTURE_STATION': transfer_rail_arrival_station,
					'TRANSFER_DEPARTURE_TIME'        : transfer_departure_time,
					'TRANSFER_DEPARTURE_DATE'        : transfer_departure_date,
					'TRANSFER_DEPARTURE_PICKUP'      : transfer_departure_pickup, // FREETEXT
				});
			}
		}

		// return response
	    return (is_active_trasfer_mode && trasfer_list && trasfer_list.length) ? trasfer_list[0] : false;
	} else {
		// fetch elements
		var traveler_element = jQuery('.viator_travelers_details_custom .input_field');

		// Reset previous validation messages
	    jQuery('.departure-error-message').remove();

		// Validate each traveler box
	    traveler_element.each(function() {
	        // get hidden data
			var input_value = jQuery(this).val();

			// check value is valid
			if(!input_value) {
				jQuery(this).after('<div class="departure-error-message text-danger">This field is required</div>');
				isValid = false;
			} else {
				trasfer_list.push(input_value);
			}
	    });

	    // return response
	    return (isValid) ? trasfer_list : false;
	}
}

// ToolTip
jQuery(".tooltip-btn").click(function (e) {
	e.preventDefault();
	jQuery(".tab-tooltip").toggleClass('show');
});

/**
 * on change viator start point
 */
jQuery(".viator_single_product .choose_viator_start_point").change(function () {
	// get selected value
	var location_key = jQuery(this).val();
	var tour_id = jQuery('#single_page_tour_id').val();

	// apply ajax for filter
	jQuery.ajax({
		type: "POST",
		url: mds_config.base_url + "viator/choose_start_end_point_location",
		data: {
			'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
			'tour_id': tour_id,
			'location_key': location_key,
			'action': 'start',
		},
		success: function (response) {
			// update content
			jQuery('.viator_single_product .selected_viator_start_point').html(response);
		}
	});
});

/**
 * on change viator end point
 */
jQuery(".viator_single_product .choose_viator_end_point").change(function () {
	// get selected value
	var location_key = jQuery(this).val();
	var tour_id = jQuery('#single_page_tour_id').val();

	// apply ajax for filter
	jQuery.ajax({
		type: "POST",
		url: mds_config.base_url + "viator/choose_start_end_point_location",
		data: {
			'csrf_mds_token': jQuery.cookie(mds_config.csfr_cookie_name),
			'tour_id': tour_id,
			'location_key': location_key,
			'action': 'end',
		},
		success: function (response) {
			// update content
			jQuery('.viator_single_product .selected_viator_end_point').html(response);
		}
	});
});

/**
 * on change viator end point
 */
jQuery(".checkout_page #transfer_departure_mode").change(function (e) {
	e.preventDefault();

	// get selected value
	var arrival_mode = jQuery(this).val();

	// match and active box
	if(arrival_mode == 'Airpot') {
		jQuery('.checkout_page .departure_detail_airpot_box').show();
		jQuery('.checkout_page .departure_detail_port_box').hide();
		jQuery('.checkout_page .departure_detail_train_box').hide();
	} else if(arrival_mode == 'Port') {
		jQuery('.checkout_page .departure_detail_airpot_box').hide();
		jQuery('.checkout_page .departure_detail_port_box').show();
		jQuery('.checkout_page .departure_detail_train_box').hide();
	} else if(arrival_mode == 'Train') {
		jQuery('.checkout_page .departure_detail_airpot_box').hide();
		jQuery('.checkout_page .departure_detail_port_box').hide();
		jQuery('.checkout_page .departure_detail_train_box').show();
	} else {
		jQuery('.checkout_page .departure_detail_airpot_box').hide();
		jQuery('.checkout_page .departure_detail_port_box').hide();
		jQuery('.checkout_page .departure_detail_train_box').hide();
	}
});

/**
 * on change viator choose meeting pickup option
 */
jQuery(".checkout_page #choose_meeting_pickup_option").change(function (e) {
	e.preventDefault();

	// get selected value
	var choose_meeting_pickup = jQuery(this).val();

	// match and active box
	if(choose_meeting_pickup == 'choose_pickup_hotel') {
		jQuery('.checkout_page .choose_hotel_pickup_box').show();
		jQuery('.checkout_page .choose_airport_pickup_box').hide();
		jQuery('.checkout_page .choose_port_pickup_box').hide();
	} else if(choose_meeting_pickup == 'choose_pickup_airport') {
		jQuery('.checkout_page .choose_hotel_pickup_box').hide();
		jQuery('.checkout_page .choose_airport_pickup_box').show();
		jQuery('.checkout_page .choose_port_pickup_box').hide();
	} else if(choose_meeting_pickup == 'choose_pickup_port') {
		jQuery('.checkout_page .choose_hotel_pickup_box').hide();
		jQuery('.checkout_page .choose_airport_pickup_box').hide();
		jQuery('.checkout_page .choose_port_pickup_box').show();
	} else if(choose_meeting_pickup == 'meet_point') {
		jQuery('.checkout_page .choose_hotel_pickup_box').hide();
		jQuery('.checkout_page .choose_airport_pickup_box').hide();
		jQuery('.checkout_page .choose_port_pickup_box').hide();
		jQuery.cookie("viator_choose_start_pickup_point", "MEET_AT_DEPARTURE_POINT", { expires: 30 / 1440, path: '/' });
	} else if(choose_meeting_pickup == 'decide_later') {
		jQuery('.checkout_page .choose_hotel_pickup_box').hide();
		jQuery('.checkout_page .choose_airport_pickup_box').hide();
		jQuery('.checkout_page .choose_port_pickup_box').hide();
		jQuery.cookie("viator_choose_start_pickup_point", "CONTACT_SUPPLIER_LATER", { expires: 30 / 1440, path: '/' });
	}
});

/**
 * on choose select language guide
 */
jQuery(".checkout_page #choose_tour_language_guide").change(function (e) {
	e.preventDefault();

	// get selected value
	var language_guide = jQuery(this).val();
	language_guide = (language_guide) ? language_guide : 0;

	// match and active box
	jQuery.cookie("viator_tour_language_guide", language_guide, { expires: 30 / 1440, path: '/' });
});

/**
 * on choose select pickup location
 */
jQuery(".checkout_page .meeting_pickup_location_id").change(function (e) {
	e.preventDefault();

	// get selected value
	var choose_location = jQuery(this).val();

	// match and active box
	if(choose_location) {
		jQuery.cookie("viator_choose_start_pickup_point", choose_location, { expires: 30 / 1440, path: '/' });
	}
});

// fetch viator meeting point validation
function fetch_viator_meeting_point_validation() {
	// define default value
	var is_valid = true;

	// get meeting point selection option
	var is_choose_meeting_pickup_option = jQuery('.checkout_page #choose_meeting_pickup_option :selected').val();

	// check selected option
	if(is_choose_meeting_pickup_option && is_choose_meeting_pickup_option == 'choose_pickup') {
		// get choose custom location
		var is_select_custom_location = jQuery('.checkout_page #meeting_pickup_location_id :selected').val();

		// check is valid
		if(!is_select_custom_location) {
			is_valid = false;
		}
	}

	// return response
	return is_valid;
}

// Init select 2
/*jQuery(document).ready(function() {
	jQuery('#meeting_pickup_location_id').select2();
});*/