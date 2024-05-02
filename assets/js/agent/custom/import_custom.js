jQuery(document).ready(function() {
	jQuery('#bulk-upload-form').on('submit', function(e) {
        e.preventDefault();
        
        // set form data
        var formData = new FormData();
        var fileInput = jQuery('#csv_import_file')[0];

        // check file length
        if (fileInput.files.length > 0) {
            // show loader
            jQuery('.form_error').hide();
            jQuery('#bulk-upload-form button').html('<i class="fa fa-spinner fa-spin"></i>&nbsp; Importing...');

        	// append data in array
            formData.append('file', fileInput.files[0]);
            formData.append('csrf_mds_token', jQuery.cookie(csfr_cookie_name));

            // call ajax
            jQuery.ajax({
				url        : base_url + "dashboard/bulk-import-process",
				type       : 'POST',
				data       : formData,
				processData: false,
				contentType: false,
                success: function(response) {
                    // show msg
                    jQuery('.form_error').show();
	        		jQuery('.form_error span').html(response);

                    // stop loader
                    jQuery('#bulk-upload-form button').html('<i class="fa fa-check-circle"></i>&nbsp; Start Process');
                },
                error: function(error) {
                    // show msg
                    jQuery('.form_error').show();
	        		jQuery('.form_error span').html('ERROR: Upload failed. Please attempt the upload again.');
                }
            });
        } else {
            // show msg
            jQuery('.form_error').show();
			jQuery('.form_error span').html('ERROR: Please select valid import file.');
        }
    });
});