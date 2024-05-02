/**
 * homepage banner multi form
 */
jQuery(document).ready(function() {
	// on click change question
	jQuery(document.body).on('click', '.banner_form_navigation_btn', function() {
	    // get form data
		var action    = jQuery(this).data('action');
		var banner_no = jQuery(this).data('banner_no');
		var form_no   = jQuery(this).data('form_no');
		var next_step = jQuery(this).data('step');

		// get hidden value
		var banner_id = jQuery('#banner_form_' + banner_no + ' #hidden_banner_id').val();
		var limit     = jQuery('#banner_form_' + banner_no + ' #hidden_limit').val();

		// save question and answer for user
		save_question_answer_in_tbl(banner_id, banner_no, form_no, limit);

		// active next step
		on_click_active_next_step(banner_no, next_step, limit);

		// show progress bar
		calc_form_progress_length(banner_no, next_step, limit);
	});

	// on click find tours based on answer
	jQuery(document.body).on('change', '.banner_form_input_field', function() {
	    // get form data
		var banner_no       = jQuery(this).data('banner_no');
		var form_no         = jQuery(this).data('form_no');
		var selected_answer = jQuery(this).filter(':checked').val();

		// get hidden value
		var banner_id = jQuery('#banner_form_' + banner_no + ' #hidden_banner_id').val();
		var limit     = jQuery('#banner_form_' + banner_no + ' #hidden_limit').val();

		// get answer data
		var question_answer = fetch_selection_base_answer_value(banner_no, limit);

		// save question and answer for user
		save_question_answer_in_tbl(banner_id, banner_no, form_no, limit);

    	// apply ajax for filter
		jQuery.ajax({
			type: "GET",
			url : mds_config.base_url + "homepage/find_tours",
			data: {
				'banner_id'      : banner_id,
				'question_answer': JSON.stringify(question_answer)
			},
			success: function(response) {
				// convert response
				var json_parse = JSON.parse(response);

				// response prefix
				var tour_prefix = (json_parse.count <= 1) ? 'tour' : 'tours';

				// update count
				jQuery('.dest_banner_' + banner_no + ' .tour_explore_h3').html(json_parse.count + ' ' + tour_prefix + ' found');

				// update link
				if(json_parse.encode) {
					// update view btn url
					jQuery('.dest_banner_' + banner_no + ' .tour_explore_a').attr('href', mds_config.base_url + 'tour_filter/' + banner_id + '/' + json_parse.encode);

					// update last screen btn url
					jQuery('#banner_form_' + banner_no + ' .banner_last_screen .last_screen_btn').attr('href', mds_config.base_url + 'tour_filter/' + banner_id + '/' + json_parse.encode);
				}

				// check and hide view link
				if(json_parse.count > 0) {
					jQuery('.dest_banner_' + banner_no + ' .tour_explore_a').show();
				} else {
					jQuery('.dest_banner_' + banner_no + ' .tour_explore_a').hide();
				}

				// show remove tag
				show_remove_answer_tag_btn(banner_no, form_no, selected_answer);

				// show progress bar
				calc_form_progress_length(banner_no, form_no, limit);

				// active next step
				if(form_no < limit) {
					on_click_active_next_step(banner_no, form_no + 1, limit);
				} else {
					show_banner_last_screen_option(banner_no);
				}
			}
		});
	});

	// on click remove selected answer tag
	jQuery(document.body).on('click', '.remove_banner_answer_btn', function() {
	    // get form data
		var banner_no = jQuery(this).data('banner_no');
		var form_no   = jQuery(this).data('form_no');

		// get hidden value
		var banner_id = jQuery('#banner_form_' + banner_no + ' #hidden_banner_id').val();
		var limit     = jQuery('#banner_form_' + banner_no + ' #hidden_limit').val();

		// show loader
		jQuery(this).html('<i class="fa fa-spinner fa-spin"></i>');

		// remove radio selected
		jQuery('input[name="banner_' + banner_no + '_form_' + form_no + '_question_' + form_no + '_answer"]').prop('checked', false);

		// get answer data
		var question_answer = fetch_selection_base_answer_value(banner_no, limit);

		// save question and answer for user
		save_question_answer_in_tbl(banner_id, banner_no, form_no, limit);

    	// apply ajax for filter
		jQuery.ajax({
			type: "GET",
			url : mds_config.base_url + "homepage/find_tours",
			data: {
				'banner_id'      : banner_id,
				'question_answer': JSON.stringify(question_answer)
			},
			success: function(response) {
				// convert response
				var json_parse = JSON.parse(response);

				// response prefix
				var tour_prefix = (json_parse.count <= 1) ? 'tour' : 'tours';

				// update count
				jQuery('.dest_banner_' + banner_no + ' .tour_explore_h3').html(json_parse.count + ' ' + tour_prefix + ' found');

				// update link
				if(json_parse.encode) {
					jQuery('.dest_banner_' + banner_no + ' .tour_explore_a').attr('href', mds_config.base_url + 'tour_filter/' + banner_id + '/' + json_parse.encode);
				}

				// check and hide view link
				if(json_parse.count > 0) {
					jQuery('.dest_banner_' + banner_no + ' .tour_explore_a').show();
				} else {
					jQuery('.dest_banner_' + banner_no + ' .tour_explore_a').hide();
				}

				// remove answer tag
				jQuery('#banner_remove_tag_' + banner_no + ' .banner_' + banner_no + '_form_' + form_no + '_tag').remove();
			}
		});
	});

	// on click remove selected answer tag
	jQuery(document.body).on('click', '.banner_form_reset', function() {
	    // get form data
		var banner_no = jQuery(this).data('banner_no');

		// get hidden value
		var banner_id = jQuery('#banner_form_' + banner_no + ' #hidden_banner_id').val();
		var limit     = jQuery('#banner_form_' + banner_no + ' #hidden_limit').val();

		// show loader
		jQuery(this).html('<i class="fa fa-spinner fa-spin"></i> Reset');

		// reset active steps
		on_click_active_next_step(banner_no, 1, limit);

		// reset progress bar
		calc_form_progress_length(banner_no, 0, limit, true);

		// reset all field value
		reset_all_fields_input_value(banner_id, banner_no, limit, true);

		// show loader
		jQuery(this).html('Reset');
	});

	// reset all fields input value
	function reset_all_fields_input_value(banner_id, banner_no, limit, is_reset = false)
	{
		// remove selected tags
		jQuery('#banner_form_' + banner_no + ' #banner_remove_tag_' + banner_no).empty();

		// remove radio selected
		for (var form_no = 1; form_no <= limit; form_no++) {
			jQuery('input[name="banner_' + banner_no + '_form_' + form_no + '_question_' + form_no + '_answer"]').prop('checked', false);
		}

		// get answer data
		var question_answer = fetch_selection_base_answer_value(banner_no, limit);

		// apply ajax for filter
		jQuery.ajax({
			type: "GET",
			url : mds_config.base_url + "homepage/find_tours",
			data: {
				'banner_id'      : banner_id,
				'question_answer': JSON.stringify(question_answer)
			},
			success: function(response) {
				// convert response
				var json_parse = JSON.parse(response);

				// response prefix
				var tour_prefix = (json_parse.count <= 1) ? 'tour' : 'tours';

				// update count
				if(is_reset) {
					jQuery('.dest_banner_' + banner_no + ' .tour_explore_h3').html(json_parse.count + ' ' + tour_prefix);
				} else {
					jQuery('.dest_banner_' + banner_no + ' .tour_explore_h3').html(json_parse.count + ' ' + tour_prefix + ' found');
				}

				// update link
				if(json_parse.encode) {
					jQuery('.dest_banner_' + banner_no + ' .tour_explore_a').attr('href', mds_config.base_url + 'tour_filter/' + banner_id + '/' + json_parse.encode);
				}

				// check and hide view link
				if(json_parse.count > 0) {
					jQuery('.dest_banner_' + banner_no + ' .tour_explore_a').show();
				} else {
					jQuery('.dest_banner_' + banner_no + ' .tour_explore_a').hide();
				}

				// remove answer tag
				jQuery('#banner_remove_tag_' + banner_no + ' .banner_' + banner_no + '_form_' + form_no + '_tag').remove();
			}
		});
	}

	// show remove answer tag btn
	function show_remove_answer_tag_btn(banner_no, form_no, answer)
	{
		// get banner form class is exist
		var is_exist_answer = jQuery('#banner_remove_tag_' + banner_no + ' .banner_' + banner_no + '_form_' + form_no + '_tag').length;

		// match is exist class
		if(is_exist_answer) {
			// set html content
			var replace_content = '<div class="tagsSelectName">' + answer + '</div><a class="remove_banner_answer_btn" data-banner_no="' + banner_no + '" data-form_no="' + form_no + '" class="close-div">X</a>';

			// append html
			jQuery('#banner_remove_tag_' + banner_no + ' .banner_' + banner_no + '_form_' + form_no + '_tag').html(replace_content);
		} else {
			// set html content
			var append_content = '<div class="tagsSelectItems banner_' + banner_no + '_form_' + form_no + '_tag" id="clients-edit-wrapper"><div class="tagsSelectName">' + answer + '</div><a class="remove_banner_answer_btn" data-banner_no="' + banner_no + '" data-form_no="' + form_no + '" class="close-div">X</a></div>';

			// append html
			jQuery('#banner_remove_tag_' + banner_no).append(append_content);
		}
	}

	// fetch selection base answer value
	function fetch_selection_base_answer_value(banner_no, limit)
	{
		// define array
		var answer_arr = [];

		// for loop
		for (var form_no = 1; form_no <= limit; form_no++) {
			// fetch form data
			var answer_val  = jQuery('#banner_form_' + banner_no + ' #form_' + form_no + ' .banner_form_input_field:checked').val();
			var filter_type = jQuery('#banner_form_' + banner_no + ' #form_' + form_no).data('filter_type');

			// push data in array
			var both_str = filter_type + '=' + answer_val;

			// push data in array
			if(answer_val) {
				answer_arr.push(both_str);
			}
		}

		// return response
		return answer_arr;
	}

	// on click active multi form banner option
	function on_click_active_next_step(banner_no, next_step, limit)
	{
		// hide all form
	    jQuery('#banner_form_' + banner_no + ' .form-step').addClass('d-none');

        // active next/prev step
	    jQuery('#banner_form_' + banner_no + ' #form_' + next_step).removeClass('d-none');

	    // show prev step
		if(next_step > 1) {
			jQuery('#banner_form_' + banner_no + ' #form_' + next_step + ' .prev_btn').show();
			jQuery('#banner_form_' + banner_no + ' #form_' + next_step + ' .prev_btn').attr('data-step', next_step - 1);
		}

		// check next step
		if(next_step == limit) {
			jQuery('#banner_form_' + banner_no + ' #form_' + next_step + ' .next_btn').hide();
		} else {
			jQuery('#banner_form_' + banner_no + ' #form_' + next_step + ' .next_btn').show();
			jQuery('#banner_form_' + banner_no + ' #form_' + next_step + ' .next_btn').attr('data-step', next_step + 1);
		}
	}

	// show banner last screen option
	function show_banner_last_screen_option(banner_no)
	{
		// hide question answer
	    jQuery('#banner_form_' + banner_no + ' .banner_multi_questions').hide();

        // show last screen
	    jQuery('#banner_form_' + banner_no + ' .banner_last_screen').show();

	    // hide tag remove button
	    jQuery('#banner_remove_tag_' + banner_no + ' .remove_banner_answer_btn').remove();
	}

	// calc form progress length
	function calc_form_progress_length(banner_no, selected_step, limit, reset_percent = false)
	{
		// calc progress
		if(!reset_percent) {
			var progress_percent = (selected_step * 100) / limit;
		} else {
			var progress_percent = 0;
		}

		// update progress bar
		jQuery('#banner_form_' + banner_no + ' .progress-bar').attr('aria-valuenow', progress_percent).css('width', progress_percent + '%');
	}

	// save question answer for user
	function save_question_answer_in_tbl(banner_id, banner_no, form_no, limit)
	{
		// define array
		var answer_arr = [];

		// for loop
		for (var form_no = 1; form_no <= limit; form_no++) {
			// define array
			single_answer_arr = {};

			// fetch form data
			var selected_question = jQuery('#banner_form_' + banner_no + ' #form_' + form_no + ' .font-normal span').text();
			var selected_answer   = jQuery('#banner_form_' + banner_no + ' #form_' + form_no + ' .banner_form_input_field:checked').val();

			// push data in array
			if(selected_answer) {
				// push value in array
				single_answer_arr['question'] = jQuery.trim(selected_question.replace(/(\r\n|\n|\r)/gm, ""));
				single_answer_arr['answer']   = selected_answer;

				// push data in main array
				answer_arr.push(single_answer_arr);
			}
		}

		// check question and answer length
		if(answer_arr.length) {
			// perform AJAX
			jQuery.ajax({
				type: "POST",
				url : mds_config.base_url + "homepage/save_banner_selection_data",
				data: {
					'csrf_mds_token' : jQuery.cookie(mds_config.csfr_cookie_name),
					'banner_id'      : banner_id,
					'banner_no'      : banner_no,
					'question_answer': JSON.stringify(answer_arr)
				}
			});
		}
	}
});