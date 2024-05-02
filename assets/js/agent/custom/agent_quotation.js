/**
 * open quotation package tab content
 */
jQuery(document.body).on('click', '.open_quotation_package_tab_content', function() {
	// get item key
	var package_key = jQuery(this).data('package_key') + 1;

	// remove active
	jQuery('.quote_main_tab .tab-nav .tab .tablinks').removeClass('active');
	jQuery('.quote_main_tab .tabcontent').css('display', 'none');
	jQuery('.quote_main_tab .itinerary_pkg').removeClass('active');
	jQuery('.quote_main_tab .itinerary_pkg_content').css('display', 'none');

	// active tab content
	jQuery('.quote_main_tab .tab-nav .tab .tab2').addClass('active');
	jQuery('.quote_main_tab #tab2').css('display', 'block');
	jQuery('.quote_main_tab .itinerary_pkg_' + package_key).addClass('active');
	jQuery('.quote_main_tab .itinerary_pkg_content_' + package_key).css('display', 'block');
	jQuery('.quote_main_tab .itinerary_pkg_content_' + package_key).addClass('current');

	// resize window
	setTimeout(function() {
        jQuery(window).trigger('resize');
    }, 0);

	// scroll top
    jQuery('#tour_price_quotation_modal').animate({
		scrollTop: 20
	}, 'slow');
});

/**
 * open quotation quote tab content
 */
jQuery(document.body).on('click', '.open_quotation_quote_tab_content', function() {
	// get item key
	var package_key = jQuery(this).data('package_key') + 1;

	// remove active
	jQuery('.quote_main_tab .tab-nav .tab .tablinks').removeClass('active');
	jQuery('.quote_main_tab .tabcontent').css('display', 'none');
	jQuery('.quote_main_tab .tab_package_quote').removeClass('active-ag3');
	jQuery('.quote_main_tab .tab_package_quote_content').removeClass('tab-activeg3');

	// active tab content
	jQuery('.quote_main_tab .tab-nav .tab .tab3').addClass('active');
	jQuery('.quote_main_tab #tab3').css('display', 'block');
	jQuery('.quote_main_tab .tab_package_quote_' + package_key).addClass('active-ag3');
	jQuery('.quote_main_tab .tab_package_quote_content_' + package_key).addClass('tab-activeg3');

	// resize window
	setTimeout(function() {
        jQuery(window).trigger('resize');
    }, 0);

	// scroll top
    jQuery('#tour_price_quotation_modal').animate({
		scrollTop: 20
	}, 'slow');
});

/**
 * on click quote travelone button
 */
jQuery(document.body).on('click', '.tour_quote_travelone_btn', function() {
	// get item key
	var tour_id = jQuery(this).data('tour_id');

	// show loader
	jQuery('#tour_price_quotation_modal .modal_content').html('<div class="quote_modal_process"><img class="img-fluid" draggable="false" src="'+ base_url +'/assets/img/svg/generate_content.svg" style="height: 150px; margin-bottom: 24px;"><br><i class="fa fa-spinner fa-spin"></i> &nbsp;Fetching tour content...</div>');

	// perform AJAX call
	jQuery.ajax({
	    type: "POST",
	    url: base_url + "dashboard/agent_tour_quote_travelone_modal",
	    data: {
			'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
			'tour_id'       : tour_id,
		},
	    success: function(response_content) {
	    	// check response is valid
	    	if(response_content) {
		    	// update html content
	    		jQuery('#tour_price_quotation_modal .modal_content').html(response_content);

	    		// init package slider
	    		jQuery('.quote_itinerary_package_box').slick({
	    			infinite: false,
	    			slidesToShow: 3,
	    			slidesToScroll: 3,
	    			dot: false,
	    			arrows:true,
	    			responsive: [
	    				{
	    					breakpoint: 1276,
	    					settings: {
	    						slidesToShow: 2,
	    						slidesToScroll: 2,
	    					}
	    				},
	    				{
	    					breakpoint: 881,
	    					settings: {
	    						slidesToShow: 1,
	    						slidesToScroll: 1
	    					}
	    				}
	    			]
	    		});

	    		// resize window
	    		setTimeout(function() {
		            jQuery(window).trigger('resize');
		        }, 0);
	    	}
	    }
	});
});

/**
 * on click active tab itinerary in travelone itinerary quote
 */
jQuery(document.body).on('click', '.itinerary_pkg', function() {
	// get item key
	var tab_name = jQuery(this).data('tab');

	// set tab index
	var tab_index = tab_name.replace('tab-', '');

	// check tab name is valid
	if(tab_name && tab_index) {
		// reset selection
		jQuery('.itinerary_pkg').removeClass('active');
		jQuery('.itinerary_pkg_content').removeClass('current');

		// active tab class
		jQuery('.itinerary_pkg_' + tab_index).addClass('active');
		jQuery('.itinerary_pkg_content_' + tab_index).addClass('current');

		// trigger resize window
	    setTimeout(function() {
	        jQuery(window).trigger('resize');
	    }, 0);
	}
});

/**
 * on click active quotation tab in travelone itinerary
 */
jQuery(document.body).on('click', '.tab_package_quote', function() {
	// get item key
	var tab_name = jQuery(this).data('id');

	// set tab index
	var tab_index = tab_name.replace('tab-', '');

	// check tab name is valid
	if(tab_name && tab_index) {
		// reset selection
		jQuery('.tab_package_quote').removeClass('active-ag3');
		jQuery('.tab_package_quote_content').removeClass('tab-activeg3');

		// active tab class
		jQuery('.tab_package_quote_' + tab_index).addClass('active-ag3');
		jQuery('.tab_package_quote_content_' + tab_index).addClass('tab-activeg3');
	}
});

/**
 * on click add new custom price row
 */
jQuery(document.body).on('click', '.add_package_quotation_price_btn', function() {
	// get requested data
	var package_id = jQuery(this).data('package_id');
	var country_id = jQuery(this).data('country_id');

	// show loader
	jQuery(this).html('Adding...');

	// perform AJAX call
	jQuery.ajax({
	    type: "POST",
	    url: base_url + "dashboard/agent_add_custom_quotation_row",
	    data: {
			'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
			'package_id'    : package_id,
			'country_id'    : country_id,
		},
	    success: function(response_content) {
	    	// check response is valid
	    	if(response_content) {
		    	// update html content
	    		jQuery('#tour_price_quotation_modal .table_package_' + package_id + '_country_' + country_id + '_content').append(response_content);
	    	}

	    	// show loader
	    	jQuery('.add_package_quotation_price_btn').html('Add');
	    }
	});
});

/**
 * on click add additional perks row
 */
jQuery(document.body).on('click', '.add_additional_perks_row', function() {
	// get requested data
	var package_id = jQuery(this).data('package_id');

	// show loader
	jQuery(this).html('Adding...');

	// perform AJAX call
	jQuery.ajax({
	    type: "POST",
	    url: base_url + "dashboard/agent_add_additional_perks_row",
	    data: {
			'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
			'package_id'    : package_id,
		},
	    success: function(response_content) {
	    	// check response is valid
	    	if(response_content) {
		    	// update html content
	    		jQuery('#tour_price_quotation_modal .package_' + package_id + '_quotation_additional_perks .html_content').append(response_content);
	    	}

	    	// show loader
	    	jQuery('.add_additional_perks_row').html('Add');
	    }
	});
});

/**
 * on click remove quotation price row
 */
jQuery(document.body).on('click', '.remove_quotation_price_row', function() {
	// get item key
	var package_id = jQuery(this).data('package_id');
	var country_id = jQuery(this).data('country_id');
	var item_key   = jQuery(this).data('key');

	// get total item row
	var total_row = jQuery('#tour_price_quotation_modal .table_package_' + package_id + '_country_' + country_id + '_content .row-item').length;

	// check row count
	if(total_row > 1) {
		// remove price row
		jQuery('#tour_price_quotation_modal .table_package_' + package_id + '_country_' + country_id + '_content .item-' + item_key).remove();

		// active button
		jQuery('.save_agent_tour_quotation_btn').attr('disabled', false).css('cursor', 'pointer');
		jQuery('.btn_copy_package_' + package_id).attr('disabled', false).css('cursor', 'pointer');

		// remove field error
		jQuery('.item_error_box').empty();
	}
});

/**
 * on click remove additional perks row
 */
jQuery(document.body).on('click', '.remove_additional_perks_row', function() {
	// get item key
	var package_id = jQuery(this).data('package_id');
	var item_key   = jQuery(this).data('key');

	// get total item row
	var total_row = jQuery('#tour_price_quotation_modal .package_' + package_id + '_quotation_additional_perks .html_content .row-item').length;

	// check row count
	if(total_row > 1) {
		// remove price row
		jQuery('#tour_price_quotation_modal .package_' + package_id + '_quotation_additional_perks .html_content .item-' + item_key).remove();
	}
});

/**
 * on click copy quotation price
 */
jQuery(document.body).on('click', '.btn_copy_quotation_price', function() {
	// get item key
	var tour_id             = jQuery(this).data('tour_id');
	var package_id          = jQuery(this).data('package_id');
	var is_disabled         = jQuery(this).attr('disabled');
	var from_nationality_id = (jQuery(this).data('nationality')) ? jQuery(this).data('nationality') : 0;
	var to_nationality_id   = from_nationality_id + 1;

	// check is disabled
	is_disabled = (is_disabled == 'disabled') ? true : false;

	// check button is disabled
	if(!is_disabled) {
		// get selected package nationality data
		var get_nationality_data = get_package_nationality_field_data(package_id, from_nationality_id);

		// perform AJAX call
		jQuery.ajax({
		    type: "POST",
		    url: base_url + "dashboard/agent_copy_quotation_price_data",
		    data: {
				'csrf_mds_token'     : jQuery.cookie(csfr_cookie_name),
				'tour_id'            : tour_id,
				'package_id'         : package_id,
				'from_nationality_id': from_nationality_id,
				'to_nationality_id'  : to_nationality_id,
				'field_data'         : JSON.stringify(get_nationality_data),
			},
		    success: function(response_content) {
		    	// parse array content
		    	var array_parse = JSON.parse(response_content);

		    	// check array length
		    	if(array_parse['country_length']) {
			    	// fetch country content
			    	for(var index = 0; index < array_parse['country_length']; ++index) {
			    		// get country id
			    		var country_id = array_parse['country_data'][index];

			    		// get country content
			    		var copy_content = array_parse['html_content'][country_id];

			    		// check content is valid
			    		if(copy_content) {
				    		// remove previous content
				    		jQuery('.table_package_' + package_id + '_nationality_' + to_nationality_id + '_country_' + country_id + '_content .row-item').remove();

				    		// append copy content
				    		jQuery('.table_package_' + package_id + '_nationality_' + to_nationality_id + '_country_' + country_id + '_content').append(copy_content);

				    		// remove validation error
				    		jQuery('.item_error_box').empty();
			    		}
			    	}
		    	}
		    }
		});
	} else {
		// show error
		alert('ERROR: Copying prices is not allowed. Please fix the error.');
	}
});

/**
 * on click copy package additional perks
 */
jQuery(document.body).on('click', '.copy_additional_perks_data', function() {
	// get item key
	var tour_id         = jQuery(this).data('tour_id');
	var package_id      = jQuery(this).data('package_id');
	var copy_package_id = jQuery(this).data('copy_package_id');

	// get copy package data
	var additional_perks = [];

	// get additional perks length
	var total_additional_perks = jQuery('.package_' + copy_package_id + '_quotation_additional_perks .html_content .row-item').length;

	// check data length
	if(total_additional_perks) {
		// fetch data
		jQuery.each(jQuery('.package_' + copy_package_id + '_quotation_additional_perks .html_content .row-item'), function() {
			// get content
			var item_content = jQuery(this).find('.input_field').val();

			// check content is valid
			if(item_content) {
				// push data in array
				additional_perks.push(item_content);
			}
		});
	}

	// perform AJAX call
	jQuery.ajax({
	    type: "POST",
	    url: base_url + "dashboard/agent_copy_additional_perks_data",
	    data: {
			'csrf_mds_token'  : jQuery.cookie(csfr_cookie_name),
			'package_id'      : package_id,
			'additional_perks': JSON.stringify(additional_perks),
		},
	    success: function(response_content) {
	    	// check response is valid
	    	if(response_content) {
	    		// update content
	    		jQuery('.package_' + package_id + '_quotation_additional_perks .html_content').html(response_content);
	    	}
	    }
	});
});

/**
 * on click save agent tour quotation data
 */
jQuery(document.body).on('click', '.save_agent_tour_quotation_btn', function() {
	// get data
	var tour_id   = jQuery(this).data('tour_id');
	var save_mode = jQuery(this).data('save_mode');

	// check is disabled
	var is_disabled = jQuery(this).attr('disabled');
	is_disabled = (is_disabled == 'disabled') ? true : false;

	// check button is disabled
	if(!is_disabled) {
		// set default value
		var is_confirm_accepted = false;

		// on click confirm
		if(save_mode == 'publish') {
			is_confirm_accepted = confirm("After submitting, you are unable to make changes. Do you really want to submit this?");
		} else {
			is_confirm_accepted = true;
		}

		// check confirm is accepted
		if(is_confirm_accepted) {
			// reset error
			jQuery('.quote_error').html('');

			// get package selection fields data
			var package_quotation_data = get_tour_package_selection_quotation_data(tour_id);

			// check item is valid
			if(package_quotation_data['total_item'] == package_quotation_data['quotation_arr'].length) {
				// get package additional perks data
				var additional_perks_data = get_tour_package_additional_perks_data(tour_id);

				// check quoration is valid
				if(package_quotation_data['quotation_arr'].length == 0) {
					// show error
					jQuery('.quote_error').html('<div style="font-size: 14px; margin-top: 20px; color: #ff231b; font-weight: 600;">ERROR: Oops! The quotation value is not valid. Please select at least one quotation value in order to submit TravelOne.</div>');
				} else {
					// perform AJAX call
					jQuery.ajax({
					    type: "POST",
					    url: base_url + "dashboard/save_agent_tour_quotation",
					    data: {
							'csrf_mds_token'       : jQuery.cookie(csfr_cookie_name),
							'tour_id'              : tour_id,
							'save_mode'            : save_mode,
							'quotation_data'       : JSON.stringify(package_quotation_data['quotation_arr']),
							'additional_perks_data': JSON.stringify(additional_perks_data),
						},
					    success: function(response_content) {
					    	// check response is valid
					    	if(response_content) {
					    		// check save mode
					    		if(save_mode == 'publish') {
					    			// show success msg
							    	jQuery('#tour_price_quotation_modal .modal_content').html('<div class="quote_modal_process" style="font-size: 18px"><i class="fa fa-check-circle"></i> &nbsp;Thanks! Your package quotation has been sent successfully. Please wait, our team will contact you back.</div>');

							    	// change tour card button
							    	jQuery('.tour-item-' + tour_id + ' .QuoteViewDeals a').addClass('cart_item_request_to').html('Quote Submitted');
					    		} else {
					    			// show success msg
					    			jQuery('.quote_error').html('<div style="font-size: 14px; margin-top: 20px; color: #004963; font-weight: 600;"><i class="fa fa-check-circle"></i> &nbsp;Success! Your package quotation has been saved as a draft. You can modify it and send it to the TravelOne team.</div>');
					    		}
					    	} else {
					    		// show error
					    		jQuery('.quote_error').html('<div style="font-size: 14px; margin-top: 20px; color: #ff4c46; font-weight: 600;">ERROR: Oops! Quotation value is not valid. Please check!</div>');
					    	}
					    }
					});
				}
			} else {
				// show error
				jQuery('.quote_error').html('<div style="font-size: 14px; margin-top: 20px; color: #ff4c46; font-weight: 600;">ERROR: The value in the quote field is not valid. Please check or correct it.</div>');

				// active button
				jQuery('.btn_copy_quotation_price').attr('disabled', false).css('cursor', 'pointer');
			}
		} else {
			// return response
			return false;
		}
	}
});

/**
 * on click request agent tour quotation for edit access
 */
jQuery(document.body).on('click', '.request_agent_tour_quotation_edit_access_btn', function() {
	// get requested data
	var tour_id = jQuery(this).data('tour_id');

	// check data is valid
	if(tour_id) {
		// perform AJAX call
		jQuery.ajax({
		    type: "POST",
		    url: base_url + "dashboard/agent_request_to_edit_access",
		    data: {
				'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
				'tour_id'       : tour_id,
			},
		    success: function(response) {
		    	// check response is valid
		    	if(response) {
		    		// set content
		    		jQuery('#tour_price_quotation_modal .quote_main_tab .tabcontentBg3 .myModal_pricing').html('<div class="quote_modal_process"><img class="img-fluid" draggable="false" src="' + base_url + '/assets/img/svg/accept_request.svg" style="height: 150px; margin-bottom: 24px;"><br>Your request under evaluation.</div>');

		    		// change tour card button
		    		jQuery('.tour-item-' + tour_id + ' .QuoteViewDeals a').addClass('cart_item_request_to').html('Request To Requote Submitted');
		    	}
		    }
		});
	}

	// show notify to agent
	alert("You can modify once TravelOne's administrator has given the edit access.");
});

/**
 * get tour package selection quotation data
 */
function get_tour_package_selection_quotation_data(tour_id)
{
	// define array
	var return_arr    = [];
	var quotation_arr = [];
	var total_item    = 0;

	// get package length
	var total_tour_package = jQuery('#tour_price_quotation_modal .tab_package_quote_content').length;

	// check page length
	if(total_tour_package) {
		// fetch packages
		jQuery.each(jQuery("#tour_price_quotation_modal .tab_package_quote_content"), function(index, value) {
			// set package no
			var package_id = index + 1;

			// fetch country
			jQuery.each(jQuery('.tab_package_quote_content_' + package_id + ' .nationality_country_box'), function(index, value) {
				// get data
				var country_id = jQuery(this).data('country_id');

				// get quotation field value
				var total_field = jQuery('.table_package_' + package_id + '_country_' + country_id + '_content .row-item').length;

				// check field length
				if(total_field) {
					// fetch fields
					jQuery.each(jQuery('.table_package_' + package_id + '_country_' + country_id + '_content .row-item'), function(index, value) {
						// get field value
						var from_date        = jQuery(this).find('#custom_from_date').val();
						var to_date          = jQuery(this).find('#custom_to_date').val();
						var price_adult      = jQuery(this).find('#b2c_price_adult').val();
						var price_child_3_7  = jQuery(this).find('#b2c_price_child_3_7').val();
						var price_child_8_12 = jQuery(this).find('#b2c_price_child_8_12').val();
						var price_infact_0_2 = jQuery(this).find('#b2c_price_infact_0_2').val();

						// update total item count
						if(from_date != '' || to_date != '') {
							total_item += 1;
						}

						// check field value
						if(from_date && to_date && price_adult >= 0 && price_child_3_7 >= 0 && price_child_8_12 >= 0 && price_infact_0_2 >= 0) {
							// set array
							var item_arr                 = {};
							item_arr['tour_id']          = tour_id;
							item_arr['package_id']       = package_id;
							item_arr['country_id']       = country_id;
							item_arr['from_date']        = from_date;
							item_arr['to_date']          = to_date;
							item_arr['price_adult']      = Number(price_adult);
							item_arr['price_child_3_7']  = Number(price_child_3_7);
							item_arr['price_child_8_12'] = Number(price_child_8_12);
							item_arr['price_infact_0_2'] = Number(price_infact_0_2);

							// push data in array
							quotation_arr.push(item_arr);
						}
					});
				}
			});
		});
	}

	// push in return array
	return_arr['quotation_arr'] = quotation_arr;
	return_arr['total_item']    = total_item;

	// return response
	return return_arr;
}

/**
 * get tour package additional perks data
 */
function get_tour_package_additional_perks_data(tour_id)
{
	// define array
	var additional_perks_arr = [];

	// get package length
	var total_tour_package = jQuery('#tour_price_quotation_modal .tab_package_quote_content').length;

	// check page length
	if(total_tour_package) {
		// fetch packages
		jQuery.each(jQuery("#tour_price_quotation_modal .tab_package_quote_content"), function(index, value) {
			// set package no
			var package_id = index + 1;

			// get additional perks field
			var total_additional_perks = jQuery('.package_' + package_id + '_quotation_additional_perks .html_content .row-item').length;

			// check package nationality
			if(total_additional_perks) {
				// fetch package nationality
				jQuery.each(jQuery('.package_' + package_id + '_quotation_additional_perks .html_content .row-item'), function(index, value) {
					// get field
					var input_field = jQuery(this).find('.input_field').val();

					// check field value is empty
					if(input_field) {
				  		// set array
						var item_arr            = {};
						item_arr['tour_id']     = tour_id;
						item_arr['package_id']  = package_id;
						item_arr['perks_field'] = input_field;

						// push data in array
						additional_perks_arr.push(item_arr);
					}
				});
			}
		});
	}

	// return response
	return additional_perks_arr;
}

/**
 * get package nationality field data
 */
function get_package_nationality_field_data(req_package_id, from_nationality_id)
{
	// define array
	var quotation_arr = [];

	// get package length
	var total_tour_package = jQuery('#tour_price_quotation_modal .tab_package_quote_content').length;

	// check page length
	if(total_tour_package) {
		// fetch packages
		jQuery.each(jQuery("#tour_price_quotation_modal .tab_package_quote_content"), function(index, value) {
			// set package no
			var package_id = index + 1;

			// check package id
			if(package_id == req_package_id) {
				// get total package nationality
				var total_package_nationality = jQuery('.tab_package_quote_content_' + package_id + ' .package_nationality_box').length;

				// check package nationality
				if(total_package_nationality) {
					// fetch package nationality
					jQuery.each(jQuery('.tab_package_quote_content_' + package_id + ' .package_nationality_box'), function(index, value) {
						// get data
						var nationality_id   = (jQuery(this).data('nationality_id')) ? jQuery(this).data('nationality_id') : 0;
						var nationality_name = jQuery(this).data('nationality_name');

						// match nationality id
						if(nationality_id == from_nationality_id) {
							// get total nationality country
							var total_nationality_country = jQuery('.package_' + package_id + ' .nationality_country_box').length;

							// fetch country
							jQuery.each(jQuery('.package_' + package_id + ' .nationality_country_box'), function(index, value) {
								// get data
								var country_id = jQuery(this).data('country_id');

								// get quotation field value
								var total_field = jQuery('.table_package_' + package_id + '_nationality_' + nationality_id + '_country_' + country_id + '_content .row-item').length;

								// check field length
								if(total_field) {
									// fetch fields
									jQuery.each(jQuery('.table_package_' + package_id + '_nationality_' + nationality_id + '_country_' + country_id + '_content .row-item'), function(index, value) {
										// get field value
										var from_date        = jQuery(this).find('#custom_from_date').val();
										var to_date          = jQuery(this).find('#custom_to_date').val();
										var price_adult      = jQuery(this).find('#b2c_price_adult').val();
										var price_child_3_7  = jQuery(this).find('#b2c_price_child_3_7').val();
										var price_child_8_12 = jQuery(this).find('#b2c_price_child_8_12').val();
										var price_infact_0_2 = jQuery(this).find('#b2c_price_infact_0_2').val();

										// check field value
										if(from_date && to_date && price_adult >= 0 && price_child_3_7 >= 0 && price_child_8_12 >= 0 && price_infact_0_2 >= 0) {
											// set array
											var item_arr                 = {};
											item_arr['country_id']       = country_id;
											item_arr['from_date']        = from_date;
											item_arr['to_date']          = to_date;
											item_arr['price_adult']      = price_adult;
											item_arr['price_child_3_7']  = price_child_3_7;
											item_arr['price_child_8_12'] = price_child_8_12;
											item_arr['price_infact_0_2'] = price_infact_0_2;

											// push data in array
											quotation_arr.push(item_arr);
										}
									});
								}
							});
						}
					});
				}
			}
		});
	}

	// return response
	return quotation_arr;
}

/**
 * on document page event
 */
jQuery(document).ready(function() {
	/**
	 * on quote to date check validation
	 */
	jQuery(document.body).on('change', '#tour_price_quotation_modal .quote_to_field_input', function() {
	    // get requested data
		var input_to_date  = jQuery(this).val();
		var package_id     = jQuery(this).data('package_id');
		var country_id     = jQuery(this).data('country_id');

		// hide error
		jQuery('.package_' + package_id + ' .nationality_country_box_' + country_id + ' .item_error_box').html('');
		jQuery('.save_agent_tour_quotation_btn').attr('disabled', false).css('cursor', 'pointer');

	    // get parent class
	    var parent_main_class = jQuery(this).parent().closest('.table').attr('class').replace('table table-sm ', '');
	    var parent_item_class = jQuery(this).parent().closest('.row-item').attr('class').replace('row-item ', '');

	    // get from date
	    var input_from_date = jQuery('.' + parent_main_class + ' .' + parent_item_class + ' .quote_from_field_input').val();

	    // get section date field
	    var all_date_field = fetch_quote_section_date_field(parent_item_class, package_id, country_id);

	    // define default value
	    var is_exist_date = false;

	    // check both date is valid
	    if(input_to_date) {
		    // check date exist in previous entered date
		    if(all_date_field.length) {
		    	// fetch array item
			    jQuery.each(all_date_field, function(index, item) {
			    	// convert into date
					var con_input_from_date = new Date(input_from_date);
					var con_input_to_date   = new Date(input_to_date);
					var arr_from_date       = new Date(item['from_date']);
					var arr_to_date         = new Date(item['to_date']);

					// check to and from date
			    	if(con_input_from_date.getTime() <= arr_to_date.getTime() && con_input_from_date.getTime() >= arr_from_date.getTime() || con_input_to_date.getTime() <= arr_to_date.getTime() && con_input_from_date.getTime() >= arr_from_date.getTime()) {
			    		is_exist_date = true;
			    	}

			    	// check only to date
			    	if(!is_exist_date) {
				    	if(con_input_to_date.getTime() >= arr_from_date.getTime() && con_input_to_date.getTime() <= arr_to_date.getTime()) {
				    		is_exist_date = true;
				    	}
			    	}
			    });
		    }

		    // check both date is same
		    if(new Date(input_to_date).getTime() != new Date(input_from_date).getTime()) {
		    	// check date validation
			    if (new Date(input_to_date).getTime() <= new Date().getTime()) {
			    	// show error
	    			var set_error_msg = "ERROR: The date must be greater than today's date.";

			    	// show error
			    	jQuery('.package_' + package_id + ' .nationality_country_box_' + country_id + ' .item_error_box').html('<div style="font-size: 14px; color: #ff4c46; font-weight: 600;">' + set_error_msg + '</div>');

			    	// clear value
			    	jQuery(this).val('').attr('value', '');
			    } else if (new Date(input_to_date).getTime() <= new Date(input_from_date).getTime()) {
			    	// show error
			    	jQuery('.package_' + package_id + ' .nationality_country_box_' + country_id + ' .item_error_box').html('<div style="font-size: 14px; color: #ff4c46; font-weight: 600;">ERROR: The date entered in the FROM field should be greater than the date entered in the TO field.</div>');

			    	// disabled button
			    	jQuery('.save_agent_tour_quotation_btn').attr('disabled', true).css('cursor', 'not-allowed');
			    	jQuery('.btn_copy_package_' + package_id + '_nationality_' + nationality_id).attr('disabled', true).css('cursor', 'not-allowed');
			    } else if (is_exist_date) {
			    	// show error
			    	jQuery('.package_' + package_id + ' .nationality_country_box_' + country_id + ' .item_error_box').html('<div style="font-size: 14px; color: #ff4c46; font-weight: 600;">ERROR: The date you entered already exists in a previous entry.</div>');

			    	// disabled button
			    	jQuery('.save_agent_tour_quotation_btn').attr('disabled', true).css('cursor', 'not-allowed');
			    	jQuery('.btn_copy_package_' + package_id + '_nationality_' + nationality_id).attr('disabled', true).css('cursor', 'not-allowed');
			    } else {
			    	// hide error
			    	jQuery('.package_' + package_id + ' .nationality_country_box_' + country_id + ' .item_error_box').html('');

			    	// disabled button
			    	jQuery('.save_agent_tour_quotation_btn').attr('disabled', false).css('cursor', 'pointer');
			    	jQuery('.btn_copy_package_' + package_id + '_nationality_' + nationality_id).attr('disabled', false).css('cursor', 'pointer');
			    }
		    } else {
		    	// hide error
		    	jQuery('.package_' + package_id + ' .nationality_country_box_' + country_id + ' .item_error_box').html('');

		    	// disabled button
		    	jQuery('.save_agent_tour_quotation_btn').attr('disabled', false).css('cursor', 'pointer');
		    	jQuery('.btn_copy_package_' + package_id + '_nationality_' + nationality_id).attr('disabled', false).css('cursor', 'pointer');
		    }
	    }
	});

	/**
	 * on quote from date check validation
	 */
	jQuery(document.body).on('change', '#tour_price_quotation_modal .quote_from_field_input', function() {
	    // get requested data
		var input_from_date = jQuery(this).val();
		var package_id      = jQuery(this).data('package_id');
		var country_id      = jQuery(this).data('country_id');

		// hide error
		jQuery('.package_' + package_id + ' .nationality_country_box_' + country_id + ' .item_error_box').html('');
		jQuery('.save_agent_tour_quotation_btn').attr('disabled', false).css('cursor', 'pointer');

	    // get parent class
	    var parent_main_class = jQuery(this).parent().closest('.table').attr('class').replace('table table-sm ', '');
	    var parent_item_class = jQuery(this).parent().closest('.row-item').attr('class').replace('row-item ', '');

	    // get to date
	    var input_to_date = jQuery('.' + parent_main_class + ' .' + parent_item_class + ' .quote_to_field_input').val();

	    // get section date field
	    var all_date_field = fetch_quote_section_date_field(parent_item_class, package_id, country_id);

	    // define default value
	    var is_exist_date = false;

	    // check both date is valid
	    if(input_from_date) {
		    // check date exist in previous entered date
		    if(all_date_field.length) {
		    	// fetch array item
			    jQuery.each(all_date_field, function(index, item) {
			    	// convert into date
					var con_input_from_date = new Date(input_from_date);
					var arr_from_date       = new Date(item['from_date']);
					var arr_to_date         = new Date(item['to_date']);

					// check from and to date
			    	if(con_input_from_date.getTime() <= arr_to_date.getTime() && con_input_from_date.getTime() >= arr_from_date.getTime()) {
			    		is_exist_date = true;
			    	}
			    });
		    }

		    // check both date is same
		    if(new Date(input_from_date).getTime() != new Date(input_to_date).getTime()) {
			    // check date
			    if (new Date(input_from_date).getTime() <= new Date().getTime()) {
			    	// show error
	    			var set_error_msg = "ERROR: The date must be greater than today's date.";

			    	// show error
			    	jQuery('.package_' + package_id + ' .nationality_country_box_' + country_id + ' .item_error_box').html('<div style="font-size: 14px; color: #ff4c46; font-weight: 600;">' + set_error_msg + '</div>');

			    	// clear value
			    	jQuery(this).val('').attr('value', '');
			    } else if (is_exist_date) {
			    	// show error
			    	jQuery('.package_' + package_id + ' .nationality_country_box_' + country_id + ' .item_error_box').html('<div style="font-size: 14px; color: #ff4c46; font-weight: 600;">ERROR: The date you entered already exists in a previous entry.</div>');

			    	// disabled button
			    	jQuery('.save_agent_tour_quotation_btn').attr('disabled', true).css('cursor', 'not-allowed');
			    	jQuery('.btn_copy_package_' + package_id + '_nationality_' + nationality_id).attr('disabled', true).css('cursor', 'not-allowed');
			    } else if (new Date(input_from_date).getTime() >= new Date(input_to_date).getTime()) {
			    	// show error
			    	jQuery('.package_' + package_id + ' .nationality_country_box_' + country_id + ' .item_error_box').html('<div style="font-size: 14px; color: #ff4c46; font-weight: 600;">ERROR: The date entered in the FROM field should be smaller than the date entered in the TO field.</div>');

			    	// disabled button
			    	jQuery('.save_agent_tour_quotation_btn').attr('disabled', true).css('cursor', 'not-allowed');
			    	jQuery('.btn_copy_package_' + package_id + '_nationality_' + nationality_id).attr('disabled', true).css('cursor', 'not-allowed');
			    } else {
			    	// hide error
			    	jQuery('.package_' + package_id + ' .nationality_country_box_' + country_id + ' .item_error_box').html('');

			    	// disabled button
			    	jQuery('.save_agent_tour_quotation_btn').attr('disabled', false).css('cursor', 'pointer');
			    	jQuery('.btn_copy_package_' + package_id + '_nationality_' + nationality_id).attr('disabled', false).css('cursor', 'pointer');
			    }
			} else {
				// hide error
		    	jQuery('.package_' + package_id + ' .nationality_country_box_' + country_id + ' .item_error_box').html('');

		    	// disabled button
		    	jQuery('.save_agent_tour_quotation_btn').attr('disabled', false).css('cursor', 'pointer');
		    	jQuery('.btn_copy_package_' + package_id + '_nationality_' + nationality_id).attr('disabled', false).css('cursor', 'pointer');
			}
	    }
	});
});

/**
 * fetch quote single section date field
 */
function fetch_quote_section_date_field(skip_item, package_id, country_id)
{
	// define array
	var date_field_arr = [];

	// check get total input
	var total_input_field = jQuery('.table_package_' + package_id + '_country_' + country_id + '_content .row-item');

	// count element length
	if(total_input_field.length) {
		// fetch item
		jQuery.each(total_input_field, function(index, value) {
			// get date element
			var from_date    = jQuery(this).find('#custom_from_date').val();
			var to_date      = jQuery(this).find('#custom_to_date').val();
			var is_skip_item = jQuery(this).hasClass(skip_item);

			// define array
			if(!is_skip_item) {
				item_arr              = {};
				item_arr['from_date'] = (from_date) ? from_date : '';
				item_arr['to_date']   = (to_date) ? to_date : '';

				// push data in array
				date_field_arr.push(item_arr);
			}
		});
	}

	// return response
	return date_field_arr;
}

/****************************** Custom Pricing JS ******************************/

/**
 * on click active custom pricing tab content
 */
jQuery(document.body).on('click', '.tab_nationality_menu .nationality_tab', function() {
	// get item key
	var tab_index = jQuery(this).data('id');

	// deactive tab
	jQuery('#custom_b2c_pricing_modal .modal_content .tab_nationality_menu .nationality_tab').removeClass('active-a');
	jQuery('#custom_b2c_pricing_modal .modal_content .custom_price_tab_content').removeClass('tab-active');

	// active tab
	jQuery('#custom_b2c_pricing_modal .modal_content .tab_nationality_menu .nationality_tab_' + tab_index).addClass('active-a');
	jQuery('#custom_b2c_pricing_modal .modal_content .custom_price_tab_content_' + tab_index).addClass('tab-active');
});

/**
 * on click open custom b2c pricing modal
 */
jQuery(document.body).on('click', '.custom_b2c_pricing_modal_btn', function() {
	// get URL path
	var url_params = new window.URLSearchParams(window.location.search);

	// get requested data
	var _ref         = url_params.get('_ref');
	var tour_id      = url_params.get('tour_id');
	var package_no   = jQuery(this).data('package_no');
	var package_name = jQuery(this).data('package_name');

	// check data is valid
	if(package_no && package_name) {
		// set default content
		jQuery('#custom_b2c_pricing_modal .custom_package_title').html('');

		// show loader
		jQuery('#custom_b2c_pricing_modal .modal_content').html('<div class="quote_modal_process"><img class="img-fluid" draggable="false" src="'+ base_url +'/assets/img/svg/generate_content.svg" style="height: 150px; margin-bottom: 24px;"><br><i class="fa fa-spinner fa-spin"></i> &nbsp;Fetching package content...</div>');

		// perform AJAX call
		jQuery.ajax({
		    type: "POST",
		    url: base_url + "dashboard/agent_custom_b2c_price_content",
		    data: {
				'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
				'tour_id'       : tour_id,
				'package_no'    : package_no,
				'package_name'  : package_name,
			},
		    success: function(response_content) {
		    	// check response is valid
		    	if(response_content) {
			    	// update html content
		    		jQuery('#custom_b2c_pricing_modal .modal_content').html(response_content);
		    	}
		    }
		});
	}
});

/**
 * on click add new row custom price row
 */
jQuery(document.body).on('click', '.add_row_custom_price_btn', function() {
	// get requested data
	var price_type = jQuery(this).data('price_type');
	var package_id = jQuery(this).data('package_id');
	var country_id = jQuery(this).data('country_id');

	// show loader
	jQuery(this).html('Adding...');

	// perform AJAX call
	jQuery.ajax({
	    type: "POST",
	    url: base_url + "dashboard/agent_add_custom_b2c_price_content",
	    data: {
			'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
			'price_type'    : price_type,
			'package_id'    : package_id,
			'country_id'    : country_id,
		},
	    success: function(response_content) {
	    	// check response is valid
	    	if(response_content) {
		    	// update html content
	    		jQuery('#custom_b2c_pricing_modal .table_' + price_type + '_package_' + package_id + '_country_' + country_id + '_content').append(response_content);

	    		// show loader
	    		jQuery('.add_row_custom_price_btn').html('Add');
	    	}
	    }
	});
});

/**
 * on click remove custom price row
 */
jQuery(document.body).on('click', '.remove_custom_price_row', function() {
	// get item key
	var price_type = jQuery(this).data('price_type');
	var package_id = jQuery(this).data('package_id');
	var country_id = jQuery(this).data('country_id');
	var item_key   = jQuery(this).data('key');

	// get total item row
	var total_row = jQuery('#custom_b2c_pricing_modal .table_' + price_type + '_package_' + package_id + '_country_' + country_id + '_content .row-item').length;

	// check row count
	if(total_row > 1) {
		// remove price row
		jQuery('#custom_b2c_pricing_modal .table_' + price_type + '_package_' + package_id + '_country_' + country_id + '_content .item-' + item_key).remove();
	}
});

/**
 * on click save custom package price
 */
jQuery(document.body).on('click', '.custom_price_submit_btn', function() {
	// get requested data
	var tour_id    = jQuery(this).data('tour_id');
	var package_id = jQuery(this).data('package_id');

	// check is disabled
	var is_disabled = jQuery(this).attr('disabled');
	is_disabled = (is_disabled == 'disabled') ? true : false;

	// check button is disabled
	if(!is_disabled) {
		// remove error
		jQuery('#custom_b2c_pricing_modal #custom_price_error').empty();

		// check data is valid
		if(tour_id && package_id) {
			// get pricing data
			var pricing_data = get_custom_pricing_data(tour_id, package_id);

			// check item is valid
			if(pricing_data['total_item'] == pricing_data['custom_price_arr'].length) {
				// check price length
				if(pricing_data['custom_price_arr'].length) {
					// show loader
					jQuery(this).attr('disabled', true).html('<i class="fa fa-spinner fa-spin" style="line-height: unset"></i> &nbsp;Save Changes');

					// perform AJAX call
					jQuery.ajax({
					    type: "POST",
					    url: base_url + "dashboard/agent_save_custom_price_content",
					    data: {
							'csrf_mds_token': jQuery.cookie(csfr_cookie_name),
							'tour_id'       : tour_id,
							'package_id'    : package_id,
							'price_content' : JSON.stringify(pricing_data['custom_price_arr']),
						},
					    success: function(response_content) {
					    	// check response is valid
					    	if(response_content) {
					    		// show success msg
					    		jQuery('#custom_b2c_pricing_modal #custom_price_error').html('<div style="font-size: 14px; color: #004963; font-weight: 600;"><i class="fa fa-check-circle"></i> &nbsp;The custom price saved Successfully!</div>');
					    	} else {
					    		// show error msg
					    		jQuery('#custom_b2c_pricing_modal #custom_price_error').html('<div style="font-size: 14px; color: #ff4c46; font-weight: 600;"><i class="fa fa-exclamation-triangle"></i> &nbsp;Oops! Something went wrong. Try again later.</div>');
					    	}

					    	// stop loader
					    	jQuery('#custom_b2c_pricing_modal .pricing_custom_save_btn').attr('disabled', false).html('Save Changes');

					    	// active copy button
					    	jQuery('#custom_b2c_pricing_modal .copy_custom_price_data_btn').attr('disabled', false).css('cursor', 'pointer');
					    }
					});
				} else {
					// show error msg
					jQuery('#custom_b2c_pricing_modal #custom_price_error').html('<div style="font-size: 14px; color: #ff4c46; font-weight: 600;"><i class="fa fa-exclamation-triangle"></i> &nbsp;ERROR: All fields are required.</div>');

					// stop loader
					jQuery('#custom_b2c_pricing_modal .pricing_custom_save_btn').attr('disabled', false).html('Save Changes');
				}
			} else {
				// show error
				jQuery('#custom_b2c_pricing_modal #custom_price_error').html('<div style="font-size: 14px; color: #ff4c46; font-weight: 600;">ERROR: The value in the custom price field is not valid. Please check or correct it.</div>');
			}
		}
	}
});

/**
 * on click copy custom package price data
 */
jQuery(document.body).on('click', '.copy_custom_price_data_btn', function() {
	// get requested data
	var tour_id             = jQuery(this).data('tour_id');
	var package_id          = jQuery(this).data('package_id');
	var from_nationality_id = jQuery(this).data('from_nationality_id');
	var to_nationality_id   = jQuery(this).data('to_nationality_id');
	var is_disabled         = jQuery(this).attr('disabled');

	// check is disabled
	is_disabled = (is_disabled == 'disabled') ? true : false;

	// check button is disabled
	if(!is_disabled) {
		// check data is valid
		if(tour_id && package_id && from_nationality_id && to_nationality_id) {
			// get pricing data
			var pricing_data = get_custom_pricing_from_nationality_data(tour_id, package_id, from_nationality_id);

			// check price length
			if(pricing_data.length) {
				// perform AJAX call
				jQuery.ajax({
				    type: "POST",
				    url: base_url + "dashboard/agent_copy_custom_price_content",
				    data: {
						'csrf_mds_token'   : jQuery.cookie(csfr_cookie_name),
						'tour_id'          : tour_id,
						'package_id'       : package_id,
						'to_nationality_id': to_nationality_id,
						'price_content'    : JSON.stringify(pricing_data),
					},
				    success: function(response_content) {
				    	// parse array content
				    	var array_parse = JSON.parse(response_content);

				    	// check b2b html content
				    	if(array_parse['b2b_html_length']) {
				    		// fetch b2b content
				    		jQuery.each(array_parse['b2b_html_content'], function(country_id, html_element) {
				    			// check element is valid
				    			if(html_element) {
				    				// remove previous content
						    		jQuery('.table_b2b_package_' + package_id + '_nationality_' + to_nationality_id + '_country_' + country_id + '_content .row-item').remove();

						    		// append copy content
						    		jQuery('.table_b2b_package_' + package_id + '_nationality_' + to_nationality_id + '_country_' + country_id + '_content').append(html_element);
				    			}
				    		});
				    	}

				    	// check b2c html content
				    	if(array_parse['b2c_html_length']) {
				    		// fetch b2c content
				    		jQuery.each(array_parse['b2c_html_content'], function(country_id, html_element) {
				    			// check element is valid
				    			if(html_element) {
				    				// remove previous content
						    		jQuery('.table_b2c_package_' + package_id + '_nationality_' + to_nationality_id + '_country_' + country_id + '_content .row-item').remove();

						    		// append copy content
						    		jQuery('.table_b2c_package_' + package_id + '_nationality_' + to_nationality_id + '_country_' + country_id + '_content').append(html_element);
				    			}
				    		});
				    	}
				    }
				});
			} else {
				// show error msg
				jQuery('#custom_b2c_pricing_modal #custom_price_error').css('color', '#ff4c46').html('ERROR: All fields are required.');
				setTimeout(function() { jQuery("#custom_b2c_pricing_modal #custom_price_error").hide(); }, 5000);

				// stop loader
				jQuery('#custom_b2c_pricing_modal .pricing_custom_save_btn').attr('disabled', false).html('Save Changes');
			}
		}
	} else {
		// show error
		alert('ERROR: Copying prices is not allowed. Please fix the error.');
	}
});

/**
 * get custom pricing data
 */
function get_custom_pricing_data(tour_id, package_id)
{
	// define array
	var return_arr       = [];
	var custom_price_arr = [];
	var total_item       = 0;

	// define nationality price type
	var nationality_price = ['b2b', 'b2c'];

	// get package length
	var total_nationality_tab = jQuery('#custom_b2c_pricing_modal .custom_price_tab_content');

	// count array length
	if(total_nationality_tab.length) {
		// fetch packages
		jQuery.each(total_nationality_tab, function(index, value) {
			// set package no
			var nationality_id   = index + 1;
			var nationality_name = jQuery(this).data('title');

			// fetch price type
			for(var price_index = 0; price_index < nationality_price.length; price_index++) {
				// get price name
				var price_type = nationality_price[price_index];

				// get total price country
				var total_price_country = jQuery('.custom_price_tab_content_' + nationality_id + ' .custom_' + price_type + '_price_box .nationality_country_box');

				// count array length
				if(total_price_country.length) {
					// fetch country
					jQuery.each(total_price_country, function(index, value) {
						// get country id
						var country_id = jQuery(this).data('country_id');

						// get quotation field value
						var total_input_field = jQuery('.table_' + price_type + '_package_' + package_id + '_nationality_' + nationality_id + '_country_' + country_id + '_content .row-item');

						// count item length
						if(total_input_field.length) {
							// fetch fields
							jQuery.each(total_input_field, function(index, value) {
								// get field value
								var from_date        = jQuery(this).find('#custom_from_date').val();
								var to_date          = jQuery(this).find('#custom_to_date').val();
								var price_adult      = jQuery(this).find('#b2c_price_adult').val();
								var price_child_3_7  = jQuery(this).find('#b2c_price_child_3_7').val();
								var price_child_8_12 = jQuery(this).find('#b2c_price_child_8_12').val();
								var price_infact_0_2 = jQuery(this).find('#b2c_price_infact_0_2').val();

								// check and update item count
								if(from_date != '' || to_date != '') {
									total_item += 1;
								}

								// check field value
								if(from_date && to_date && price_adult >= 0 && price_child_3_7 >= 0 && price_child_8_12 >= 0 && price_infact_0_2 >= 0) {
									// set array
									var item_arr                 = {};
									item_arr['tour_id']          = tour_id;
									item_arr['package_id']       = package_id;
									item_arr['nationality']      = nationality_name;
									item_arr['price_type']       = price_type;
									item_arr['country_id']       = country_id;
									item_arr['from_date']        = from_date;
									item_arr['to_date']          = to_date;
									item_arr['price_adult']      = price_adult;
									item_arr['price_child_3_7']  = price_child_3_7;
									item_arr['price_child_8_12'] = price_child_8_12;
									item_arr['price_infact_0_2'] = price_infact_0_2;

									// push data in array
									custom_price_arr.push(item_arr);
								}
							});
						}
					});
				}
			}
		});
	}

	// push data in return array
	return_arr['custom_price_arr'] = custom_price_arr;
	return_arr['total_item']       = total_item;

	// return response
	return return_arr;
}

/**
 * get custom pricing data
 */
function get_custom_pricing_from_nationality_data(tour_id, package_id, from_nationality_id)
{
	// define array
	var custom_price_arr = [];

	// define nationality price type
	var nationality_price = ['b2b', 'b2c'];

	// get package length
	var total_nationality_tab = jQuery('#custom_b2c_pricing_modal .custom_price_tab_content');

	// count array length
	if(total_nationality_tab.length) {
		// fetch packages
		jQuery.each(total_nationality_tab, function(index, value) {
			// set package no
			var nationality_id   = index + 1;
			var nationality_name = jQuery(this).data('title');

			// match from nationality id
			if(nationality_id == from_nationality_id) {
				// fetch price type
				for(var price_index = 0; price_index < nationality_price.length; price_index++) {
					// get price name
					var price_type = nationality_price[price_index];

					// get total price country
					var total_price_country = jQuery('.custom_price_tab_content_' + nationality_id + ' .custom_' + price_type + '_price_box .nationality_country_box');

					// count array length
					if(total_price_country.length) {
						// fetch country
						jQuery.each(total_price_country, function(index, value) {
							// get country id
							var country_id = jQuery(this).data('country_id');

							// get quotation field value
							var total_input_field = jQuery('.table_' + price_type + '_package_' + package_id + '_nationality_' + nationality_id + '_country_' + country_id + '_content .row-item');

							// count item length
							if(total_input_field.length) {
								// fetch fields
								jQuery.each(total_input_field, function(index, value) {
									// get field value
									var from_date        = jQuery(this).find('#custom_from_date').val();
									var to_date          = jQuery(this).find('#custom_to_date').val();
									var price_adult      = jQuery(this).find('#b2c_price_adult').val();
									var price_child_3_7  = jQuery(this).find('#b2c_price_child_3_7').val();
									var price_child_8_12 = jQuery(this).find('#b2c_price_child_8_12').val();
									var price_infact_0_2 = jQuery(this).find('#b2c_price_infact_0_2').val();

									// check field value
									if(from_date && to_date && price_adult >= 0 && price_child_3_7 >= 0 && price_child_8_12 >= 0 && price_infact_0_2 >= 0) {
										// set array
										var item_arr                 = {};
										item_arr['tour_id']          = tour_id;
										item_arr['package_id']       = package_id;
										item_arr['nationality']      = nationality_name;
										item_arr['price_type']       = price_type;
										item_arr['country_id']       = country_id;
										item_arr['from_date']        = from_date;
										item_arr['to_date']          = to_date;
										item_arr['price_adult']      = price_adult;
										item_arr['price_child_3_7']  = price_child_3_7;
										item_arr['price_child_8_12'] = price_child_8_12;
										item_arr['price_infact_0_2'] = price_infact_0_2;

										// push data in array
										custom_price_arr.push(item_arr);
									}
								});
							}
						});
					}
				}
			}
		});
	}

	// return response
	return custom_price_arr;
}

/**
 * on document ready event
 */
jQuery(document).ready(function() {
	/**
	 * on custom pricing to date check validation
	 */
	jQuery(document.body).on('change', '#custom_b2c_pricing_modal .quote_to_field_input', function() {
	    // get requested data
		var input_to_date  = jQuery(this).val();
		var price_type     = jQuery(this).data('price_type');
		var package_id     = jQuery(this).data('package_id');
		var country_id     = jQuery(this).data('country_id');

	    // get parent class
	    var parent_main_class = jQuery(this).parent().closest('.table').attr('class').replace('table table-sm ', '');
	    var parent_item_class = jQuery(this).parent().closest('.row-item').attr('class').replace('row-item ', '');

		// hide error
		jQuery('.box_' + price_type + '_country_' + country_id + ' .item_error_box').html('');
		jQuery('.custom_price_submit_btn').attr('disabled', false).css('cursor', 'pointer');

	    // get from date
	    var input_from_date = jQuery('.' + parent_main_class + ' .' + parent_item_class + ' .quote_from_field_input').val();

	    // get section date field
	    var all_date_field = fetch_custom_price_section_date_field(parent_item_class, parent_main_class);

	    // define default value
	    var is_exist_date = false;

	    // check both date is valid
	    if(input_to_date) {
		    // check date exist in previous entered date
		    if(all_date_field.length) {
		    	// fetch array item
			    jQuery.each(all_date_field, function(index, item) {
			    	// convert into date
					var con_input_from_date = new Date(input_from_date);
					var con_input_to_date   = new Date(input_to_date);
					var arr_from_date       = new Date(item['from_date']);
					var arr_to_date         = new Date(item['to_date']);

					// check from and to date
			    	if(con_input_from_date.getTime() <= arr_to_date.getTime() && con_input_from_date.getTime() >= arr_from_date.getTime() || con_input_to_date.getTime() <= arr_to_date.getTime() && con_input_from_date.getTime() >= arr_from_date.getTime()) {
			    		is_exist_date = true;
			    	}

			    	// check only to date
			    	if(!is_exist_date) {
				    	if(con_input_to_date.getTime() >= arr_from_date.getTime() && con_input_to_date.getTime() <= arr_to_date.getTime()) {
				    		is_exist_date = true;
				    	}
			    	}
			    });
		    }

		    // check both date is same
		    if(new Date(input_to_date).getTime() != new Date(input_from_date).getTime()) {
		    	// check date validation
			    if (new Date(input_to_date).getTime() <= new Date().getTime()) {
					// show error
			    	var set_error_msg = "ERROR: The date must be greater than today's date.";

			    	// show error
			    	jQuery('.box_' + price_type + '_nationality_' + nationality_id + '_country_' + country_id + ' .item_error_box').html('<div style="font-size: 14px; color: #ff4c46; font-weight: 600;">' + set_error_msg + '</div>');

			    	// update value
			    	jQuery(this).val('');
			    } else if (new Date(input_to_date).getTime() <= new Date(input_from_date).getTime()) {
			    	// show error
			    	jQuery('.box_' + price_type + '_nationality_' + nationality_id + '_country_' + country_id + ' .item_error_box').html('<div style="font-size: 14px; color: #ff4c46; font-weight: 600;">ERROR: The date entered in the FROM field should be greater than the date entered in the TO field.</div>');

			    	// disabled button
			    	jQuery('.custom_price_submit_btn').attr('disabled', true).css('cursor', 'not-allowed');
			    } else if (is_exist_date) {
			    	// show error
			    	jQuery('.box_' + price_type + '_nationality_' + nationality_id + '_country_' + country_id + ' .item_error_box').html('<div style="font-size: 14px; color: #ff4c46; font-weight: 600;">ERROR: Entered validity is already covered in the above-added price.</div>');

			    	// disabled button
			    	jQuery('.custom_price_submit_btn').attr('disabled', true).css('cursor', 'not-allowed');
			    } else {
			    	// hide error
			    	jQuery('.box_' + price_type + '_nationality_' + nationality_id + '_country_' + country_id + ' .item_error_box').html('');

			    	// disabled button
			    	jQuery('.custom_price_submit_btn').attr('disabled', false).css('cursor', 'pointer');
			    }
		    } else {
		    	// hide error
		    	jQuery('.box_' + price_type + '_nationality_' + nationality_id + '_country_' + country_id + ' .item_error_box').html('');

		    	// disabled button
		    	jQuery('.custom_price_submit_btn').attr('disabled', false).css('cursor', 'pointer');
		    }
	    }
	});

	/**
	 * on quote from date check validation
	 */
	jQuery(document.body).on('change', '#custom_b2c_pricing_modal .quote_from_field_input', function() {
	    // get requested data
		var input_from_date = jQuery(this).val();
		var price_type      = jQuery(this).data('price_type');
		var package_id      = jQuery(this).data('package_id');
		var country_id      = jQuery(this).data('country_id');

	    // get parent class
	    var parent_main_class = jQuery(this).parent().closest('.table').attr('class').replace('table table-sm ', '');
	    var parent_item_class = jQuery(this).parent().closest('.row-item').attr('class').replace('row-item ', '');

		// hide error
		jQuery('.box_' + price_type + '_nationality_' + nationality_id + '_country_' + country_id + ' .item_error_box').html('');
		jQuery('.custom_price_submit_btn').attr('disabled', false).css('cursor', 'pointer');

		// get to date
	    var input_to_date = jQuery('.' + parent_main_class + ' .' + parent_item_class + ' .quote_to_field_input').val();

	    // get section date field
	    var all_date_field = fetch_custom_price_section_date_field(parent_item_class, parent_main_class);

	    // define default value
	    var is_exist_date = false;

	    // check both date is valid
	    if(input_from_date) {
		    // check date exist in previous entered date
		    if(all_date_field.length) {
		    	// fetch array item
			    jQuery.each(all_date_field, function(index, item) {
			    	// convert into date
					var con_input_from_date = new Date(input_from_date);
					var arr_from_date       = new Date(item['from_date']);
					var arr_to_date         = new Date(item['to_date']);

					// check from and to date
			    	if(con_input_from_date.getTime() <= arr_to_date.getTime() && con_input_from_date.getTime() >= arr_from_date.getTime()) {
			    		is_exist_date = true;
			    	}
			    });
		    }

		    // check both date is same
		    if(new Date(input_to_date).getTime() != new Date(input_from_date).getTime()) {
			    // check date
			    if (new Date(input_from_date).getTime() <= new Date().getTime()) {
					// show error
			    	var set_error_msg = "ERROR: The date must be greater than today's date.";

			    	// show error
			    	jQuery('.box_' + price_type + '_nationality_' + nationality_id + '_country_' + country_id + ' .item_error_box').html('<div style="font-size: 14px; color: #ff4c46; font-weight: 600;">' + set_error_msg + '</div>');

			    	// update value
			    	jQuery(this).val('');
			    } else if (is_exist_date) {
			    	// show error
			    	jQuery('.box_' + price_type + '_nationality_' + nationality_id + '_country_' + country_id + ' .item_error_box').html('<div style="font-size: 14px; color: #ff4c46; font-weight: 600;">ERROR: Entered validity is already covered in the above-added price.</div>');

			    	// disabled button
			    	jQuery('.custom_price_submit_btn').attr('disabled', true).css('cursor', 'not-allowed');
			    } else if (new Date(input_from_date).getTime() >= new Date(input_to_date).getTime()) {
			    	// show error
			    	jQuery('.box_' + price_type + '_nationality_' + nationality_id + '_country_' + country_id + ' .item_error_box').html('<div style="font-size: 14px; color: #ff4c46; font-weight: 600;">ERROR: The date entered in the FROM field should be smaller than the date entered in the TO field.</div>');

			    	// disabled button
			    	jQuery('.custom_price_submit_btn').attr('disabled', true).css('cursor', 'not-allowed');
			    } else {
			    	// hide error
			    	jQuery('.box_' + price_type + '_nationality_' + nationality_id + '_country_' + country_id + ' .item_error_box').html('');

			    	// disabled button
			    	jQuery('.custom_price_submit_btn').attr('disabled', false).css('cursor', 'pointer');
			    }
		    } else {
		    	// hide error
		    	jQuery('.box_' + price_type + '_nationality_' + nationality_id + '_country_' + country_id + ' .item_error_box').html('');

		    	// disabled button
		    	jQuery('.custom_price_submit_btn').attr('disabled', false).css('cursor', 'pointer');
		    }
	    }
	});
});

/**
 * fetch custom price single section date field
 */
function fetch_custom_price_section_date_field(skip_item, parent_main_class)
{
	// define array
	var date_field_arr = [];

	// check get total input
	var total_input_field = jQuery('.' + parent_main_class + ' .row-item');

	// count element length
	if(total_input_field.length) {
		// fetch item
		jQuery.each(total_input_field, function(index, value) {
			// get date element
			var from_date    = jQuery(this).find('#custom_from_date').val();
			var to_date      = jQuery(this).find('#custom_to_date').val();
			var is_skip_item = jQuery(this).hasClass(skip_item);

			// define array
			if(!is_skip_item) {
				item_arr              = {};
				item_arr['from_date'] = (from_date) ? from_date : '';
				item_arr['to_date']   = (to_date) ? to_date : '';

				// push data in array
				date_field_arr.push(item_arr);
			}
		});
	}

	// return response
	return date_field_arr;
}

/**
 * single quote from email - on click save agent quotation data
 */
jQuery('.agent_email_single_quotation .save_agent_single_tour_quotation_btn').click(function() {
	// get data
	var tour_id    = jQuery(this).data('tour_id');
	var package_id = jQuery(this).data('package_id');
	var deal_id    = jQuery(this).data('deal_id');

	// check is disabled
	var is_disabled = jQuery(this).attr('disabled');
	is_disabled = (is_disabled == 'disabled') ? true : false;

	// check button is disabled
	if(!is_disabled) {
		// set default value
		var is_confirm_accepted = false;

		// on click confirm
		if(!is_confirm_accepted) {
			is_confirm_accepted = confirm("After submission, modifications are no longer possible. Are you certain you want to proceed and submit a quote for this package?");
		} else {
			is_confirm_accepted = true;
		}

		// check confirm is accepted
		if(is_confirm_accepted) {
			// reset error
			jQuery('.agent_email_single_quotation .quote_error').html('');

			// get package selection fields data
			var package_quotation_data = get_tour_package_selection_quotation_data(tour_id);

			// check item is valid
			if(package_quotation_data['total_item'] == package_quotation_data['quotation_arr'].length) {
				// get package additional perks data
				var additional_perks_data = get_tour_package_additional_perks_data(tour_id);

				// check quoration is valid
				if(package_quotation_data['quotation_arr'].length == 0) {
					// show error
					jQuery('.agent_email_single_quotation .quote_error').html('<div style="font-size: 14px; margin-top: 20px; color: #ff231b; font-weight: 600;">Oops! Please select at least one valid quotation value.</div>');
				} else {
					// perform AJAX call
					jQuery.ajax({
					    type: "POST",
					    url: base_url + "dashboard/save_agent_single_tour_quotation",
					    data: {
							'csrf_mds_token'       : jQuery.cookie(csfr_cookie_name),
							'tour_id'              : tour_id,
							'deal_id'              : deal_id,
							'quotation_data'       : JSON.stringify(package_quotation_data['quotation_arr']),
							'additional_perks_data': JSON.stringify(additional_perks_data),
						},
						beforeSend: function() {
							// show loader
							jQuery('.agent_email_single_quotation .save_agent_single_tour_quotation_btn').css('cursor', 'progress').attr('disabled', true).html('<i class="fa fa-spinner fa-spin" style="font-size: 22px"></i> &nbsp;&nbsp;Submit Your Quote');
						},
					    success: function(response_content) {
					    	// check response is valid
					    	if(response_content) {
				    			// show success msg
						    	jQuery('.agent_email_single_quotation #tour_price_quotation_modal').html('<div class="col-12 tab-container text-center" style="padding: 50px;"><img style="height: 200px" class="lazyload img-responsive img-fluid" src="' + base_url + 'assets/img/svg/done_checkmark_girl.svg"><h3 style="font-size: 18px; margin-top: 25px; font-weight: 400;">Thanks! Your package quotation has been sent successfully.<br>Please wait, our team will contact you back. Thanks!</h3></div>');

						    	// stop loader
						    	jQuery('.agent_email_single_quotation .save_agent_single_tour_quotation_btn').css('cursor', 'pointer').attr('disabled', false).html('<i class="fa fa-paper-plane" style="margin-top: 5px"></i> &nbsp;&nbsp;Submit Your Quote');
					    	} else {
					    		// show error
					    		jQuery('.agent_email_single_quotation .quote_error').html('<div style="font-size: 14px; margin-top: 20px; color: #ff4c46; font-weight: 600;">ERROR: Oops! Quotation value is not valid. Please check!</div>');
					    	}
					    }
					});
				}
			} else {
				// show error
				jQuery('.agent_email_single_quotation .quote_error').html('<div style="font-size: 14px; margin-top: 20px; color: #ff4c46; font-weight: 600;">ERROR: The value in the quote field is not valid. Please check or correct it.</div>');

				// active button
				jQuery('.btn_copy_quotation_price').attr('disabled', false).css('cursor', 'pointer');
			}
		} else {
			// return response
			return false;
		}
	}
});

/**
 * close tour price quotation modal
 */
jQuery('#tour_price_quotation_modal .close').click(function(e) {
	e.preventDefault();
	jQuery('.myModal_quote').trigger('click');
});