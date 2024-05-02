// interval time
var doneTypingIntervalItinerary = 1000;

// define blank data
var typingTimerItinerary;

/**
 * on ready slider apply
 */
jQuery(document).ready(function() {
	init_slick_slider_content('.tour_product_gallery');
});

/**
 * on filter apply on listing page
 */
jQuery(document.body).on('keyup', '#agent_search_listing', function() {
	// get request data
	var search_keyword = jQuery(this).val();

	// check string length
	if(search_keyword.length > 3) {
		search_listing_tour_filters(search_keyword);
	} else {
		search_listing_tour_filters();
	}
});

/**
 * on filter apply search status change
 */
jQuery(document.body).on('change', '.filter_tour_status', function() {
	// get request data
	var tour_status = jQuery(this).val();

	// check string length
	if(tour_status != '') {
		search_listing_tour_filters('', tour_status);
	} else {
		search_listing_tour_filters();
	}
});

/**
 * on click load more agent booking
 */
jQuery('.agent_booking_list #load_more_agent_booking').click(function(e) {
	e.preventDefault();
	// apply booking filter
	fetchAgentBookingListAjax(jQuery(this), 'loadmore', false);
});

/**
 * fetch booking listing filter ajax
 */
function fetchAgentBookingListAjax(element, action, is_default_loader = false)
{
	// show default loader
	if(is_default_loader) {
		jQuery('.agent_booking_list #show_default_loader').show();
	}

	// get limit data
	var limit       = jQuery('.agent_booking_list #booking_ajax_data_limit').val();
	var start       = jQuery('.agent_booking_list #booking_ajax_data_start').val();
	var total_count = jQuery('.agent_booking_list #booking_ajax_total_count').val();

	// get search value
	var search_keyword = jQuery('.agent_booking_list .booking_search').val();

	// get selected sort by
	var tour_status = jQuery('.agent_booking_list .filter_tour_status :selected').val();

	// apply filters
	jQuery.ajax({
		type: "GET",
		url: base_url + "dashboard/booking/agent_booking_listing_ajax",
		data: {
			'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
			'search_keyword': search_keyword,
			'tour_status'   : tour_status,
			'limit'         : limit,
			'start'         : start
		},
		success: function(response) {
			// console.log(response);
		}
	});
}

/**
 * on click load more agent tour listing
 */
jQuery('.agent_tour_listing #load_more_agent_tour_listing').click(function(e) {
	e.preventDefault();
	// filter tour listing
	fetchAgentTourListingAjax(jQuery(this), 'loadmore', false);
});

/**
 * fetch agent tour listing filter ajax
 */
function fetchAgentTourListingAjax(element, action, is_default_loader = false)
{
	// show default loader
	if(is_default_loader) {
		jQuery('.agent_tour_listing #show_default_loader').show();
	}

	// get limit data
	var limit       = jQuery('.agent_tour_listing #listing_ajax_data_limit').val();
	var start       = jQuery('.agent_tour_listing #listing_ajax_data_start').val();
	var total_count = jQuery('.agent_tour_listing #listing_ajax_total_count').val();

	// get search value
	var search_keyword = jQuery('.agent_tour_listing #agent_search_listing').val();

	// get selected sort by
	var tour_status = jQuery('.agent_tour_listing .filter_tour_status :selected').val();

	// show loader
	if(action == 'loadmore') {
		// show loader
		jQuery('.agent_tour_listing #load_more_agent_tour_listing').attr('disabled', true).css('cursor', 'not-allowed').html('<i class="fa-solid fa-spinner fa-spin"></i> &nbsp;Load more');
	}

	// apply filters
	jQuery.ajax({
		type: "POST",
		url: base_url + "dashboard/listing/filter_tours_listing_ajax",
		data: {
			'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
			'search_keyword': search_keyword,
			'tour_status'   : tour_status,
			'limit'         : limit,
			'start'         : start
		},
		success: function(response) {
			// json response parse
	    	var json_parse = JSON.parse(response);

	    	// check response is valid
	    	if(json_parse['total_tours']) {
	    		// update content
	    		jQuery('.tour_listing_page').append(json_parse['html_content']);

	    		// init slider
	    		jQuery('.tour_product_gallery').slick({
					dots: true,
					arrows: true,
					infinite: false,
				});

				// update offset count
				jQuery('.agent_tour_listing #listing_ajax_data_start').val(Number(start) + Number(json_parse['total_tours']));

		    	// stop loader
				jQuery('.agent_tour_listing #load_more_agent_tour_listing').attr('disabled', false).css('cursor', 'pointer').html('Load more');
	    	}

			// hide loader
	    	if(json_parse['total_tours'] < limit) {
				jQuery('.agent_tour_listing #load_more_agent_tour_listing').hide();
	    	}
		}
	});
}

/**
 * filter for search listing
 */
function search_listing_tour_filters(search_keyword = '', tour_status = '1')
{
	// show loader
	jQuery('.tour_listing_page').html('<div class="col-12 col-md-12 col-lg-12 col-xl-12"><div style="text-align: center; padding: 50px"><img src="' + base_url + '/assets/img/svg/searching_icon.svg" draggable="false" style="height: 140px"><br><br><span style="font-weight: 600; font-size: 14px; color: #004963"><i class="fa fa-spinner fa-spin"></i> &nbsp;Searching tour...</span></div></div>');

	// hide load more button
	jQuery('#load_more_agent_tour_listing').hide();

	// fetch city content
	jQuery.ajax({
	    type: "POST",
	    url: base_url + "dashboard/agent_search_tour_listing_data",
	    data: {
			'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
			'keyword'       : search_keyword,
			'tour_status'   : tour_status,
		},
	    success: function(response) {
	    	// json response parse
	    	var json_parse = JSON.parse(response);

	    	// update total count
	    	var tour_prefix = (json_parse['tour_result'] == 1) ? ' Tour' : ' Tours';
	    	jQuery('.tour_found_count').html(json_parse['tour_result'] + tour_prefix + ' Found');

	    	// check response is valid
	    	if(json_parse['html_content']) {
	    		// update content
	    		jQuery('.tour_listing_page').html(json_parse['html_content']);

	    		// init slider
	    		jQuery('.tour_product_gallery').slick({
					dots: true,
					arrows: true,
					infinite: false,
				});
	    	} else {
	    		// show not found msg
	    		jQuery('.tour_listing_page').html('<div class="col-12 col-md-12 col-lg-12 col-xl-12"><div style="text-align: center; padding: 50px"><img src="' + base_url + '/assets/img/svg/not_found_content.svg" draggable="false" style="height: 140px"><br><br><span style="font-weight: 600; font-size: 14px; color: #004963"><i class="fa fa-sad"></i> &nbsp;Oops! No tour(s) found!</span></div></div>');
	    	}
	    }
	});
}

/**
 * on keyup search hotel for package
 */
jQuery('#travelone_itinerary_search_listing').keyup(function() {
	// Clear the previous timer
    clearTimeout(typingTimerItinerary);

    // get keyword value
    var search_keyword = jQuery(this).val();

    // Start a new timer
    typingTimerItinerary = setTimeout(function() {
        // show loader
		jQuery('.travelone_itinerary_listing').html('<div class="col-12 col-md-12 col-lg-12 col-xl-12"><div style="text-align: center; padding: 50px"><img src="' + base_url + '/assets/img/svg/searching_icon.svg" draggable="false" style="height: 140px"><br><br><span style="font-weight: 600; font-size: 14px; color: #004963"><i class="fa fa-spinner fa-spin"></i> &nbsp;Searching tour...</span></div></div>');

		// hide add to shop button
		jQuery('.addIteneraryToMyShop').hide();

		// hide load more
		if(search_keyword.length) {
			jQuery('#loadMore').hide();
		} else {
			jQuery('#loadMore').show();
		}

		// fetch city content
		jQuery.ajax({
		    type: "POST",
		    url: base_url + "dashboard/agent_search_travelone_listing_data",
		    data: {
				'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
				'keyword'       : search_keyword,
			},
		    success: function(response) {
		    	// json response parse
		    	var json_parse = JSON.parse(response);

		    	// check response is valid
		    	if(json_parse['html_content']) {
		    		// update content
		    		jQuery('.travelone_itinerary_listing').html(json_parse['html_content']);

		    		// hide add to shop button
					jQuery('.addIteneraryToMyShop').show();
		    	} else {
		    		// show not found msg
		    		jQuery('.travelone_itinerary_listing').html('<div class="col-12 col-md-12 col-lg-12 col-xl-12"><div style="text-align: center; padding: 50px"><img src="' + base_url + '/assets/img/svg/not_found_content.svg" draggable="false" style="height: 140px"><br><br><span style="font-weight: 600; font-size: 14px; color: #004963"><i class="fa fa-sad"></i> &nbsp;Oops! No tour(s) found!</span></div></div>');
		    	}
		    }
		});
    }, doneTypingIntervalItinerary);
});