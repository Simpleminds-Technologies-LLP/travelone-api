/* Start Header Menu Search Input Dropdown Js */
jQuery(".status_change .dropdown-item").click(function() {
    var getStatusText = jQuery(this).text();
    jQuery(this).closest(".status_dropdown").find(".status__btn").text(getStatusText);

    var generateStatusClass = `${jQuery(this).attr('data-class')}-status`;
    jQuery(this).closest(".status_dropdown").attr("data-color", `${generateStatusClass}`);
});

// define a timer variable
var typingTimerWeb;
var typingTimerMobile;

// set the delay (in milliseconds) after which the event will trigger
var doneTypingIntervalWeb    = 1000;
var doneTypingIntervalMobile = 1000;

// select your input field by its id
jQuery('.web_main_header_search').keyup(function() {
    // Clear the previous timer
    clearTimeout(typingTimerWeb);

    // get keyword value
    var keyword = jQuery(this).val();

    // Start a new timer
    typingTimerWeb = setTimeout(function() {
        // search tour data
        jQuery.ajax({
            type: "GET",
            url : mds_config.base_url + "header_search",
            data: {
                'search_keyword': keyword
            },
            success: function(response) {
                // set content
                jQuery("#web_search_suggestion_box").html(response);

                // show suggestion box
                jQuery("#web_response_search_results").addClass("open");
            }
        });
    }, doneTypingIntervalWeb);
});

// header search suggestion box
jQuery(".mobile_main_header_search").keyup(function() {
    // Clear the previous timer
    clearTimeout(typingTimerMobile);

    // get keyword value
    var keyword = jQuery(this).val();

    // Start a new timer
    typingTimerMobile = setTimeout(function() {
        // search tour data
        jQuery.ajax({
            type: "GET",
            url : mds_config.base_url + "header_search",
            data: {
                'search_keyword': keyword
            },
            success: function(response) {
                // check response
                if(response) {
                    // show suggestion box
                    jQuery("#mobile_response_search_results").addClass("open");

                    // set content
                    jQuery("#mobile_search_suggestion_box").html(response);
                }
            }
        });
    }, doneTypingIntervalMobile);
});

// close modal on outerclick
jQuery("body").click(function() {
    // remove suggestion box
    jQuery("#web_response_search_results").removeClass("open");
    jQuery("#mobile_response_search_results").removeClass("open");
});

// on press enter search
/*jQuery('.web_header_search_input').keypress(function (e) {
    var key = e.which;
    if(key == 13) {
        // get data
        var keyword  = jQuery(".web_header_search_input").val();
        var category = jQuery(".web_header_search_dwn").text().trim();

        // redirect to page
        search_product(keyword, category);
    }
});*/

// on click web search icon
jQuery(".web_header_search_btn").click(function() {
    // get data
    var keyword  = jQuery(".web_header_search_input").val();
    var category = jQuery(".web_header_search_dwn").text().trim();

    // redirect to page
    search_product(keyword, category);
});

// on press enter search
/*jQuery('.mobile_header_search_input').keypress(function (e) {
    var key = e.which;
    if(key == 13) {
        // get data
        var keyword  = jQuery(".mobile_header_search_input").val();
        var category = jQuery(".mobile_header_search_dwn").text().trim();

        // redirect to page
        search_product(keyword, category);
    }
});*/

// on click web search icon
jQuery(".mobile_header_search_btn").click(function() {
    // get data
    var keyword  = jQuery(".mobile_header_search_input").val();
    var category = jQuery(".mobile_header_search_dwn").text().trim();

    // redirect to page
    search_product(keyword, category);
});

// search product
function search_product(keyword, category) {
    // set site url
    var base_url = window.location.origin + '/search/?keyword=' + keyword + '&category=' + category;

    // redirect to search
    window.open(base_url, '_self');
}

// active only one sub menu
jQuery(".menu-main li").click(function() {
    // check is active
    var is_active = jQuery(this).hasClass('active');

    // check active class
    if(is_active) {
        // remove active class
        jQuery('.menu-main .menu-item-has-children').removeClass('active');
    }
});

// hide menu on body
jQuery(".wrapper").click(function() {
    jQuery('.menu-item-has-children').removeClass('active');
});

// hide menu on top bar
jQuery(".top-barNav").click(function() {
    jQuery('.menu-item-has-children').removeClass('active');
});

// hide menu on middle header
jQuery(".head_scndblock").click(function() {
    jQuery('.menu-item-has-children').removeClass('active');
});