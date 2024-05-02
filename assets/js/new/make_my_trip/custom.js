jQuery(window).on('load', function() {
    jQuery('#status').fadeOut();
    jQuery('#preloader').delay(350).fadeOut('slow');
    jQuery('body').delay(550).css({'overflow':'visible'});
});

/**
 * on click open plan my trip login modal
 */
jQuery(document.body).on('click', '#plan_my_trip_login_modal', function() {
    // close plan my trip modal
    jQuery('#planMyTripModal .btn-close').trigger('click');
    
    // open login modal
    setTimeout(function() {
        jQuery('#loginModal').modal('show');
    }, 500);

});

/* input password js */
function password_show_hide() {
    var x = document.getElementById("password");
    var show_eye = document.getElementById("show_eye");
    var hide_eye = document.getElementById("hide_eye");
    hide_eye.classList.remove("d-none");
    if (x.type === "password") {
        x.type                 = "text";
        show_eye.style.display = "none";
        hide_eye.style.display = "block";
    } else {
        x.type                 = "password";
        show_eye.style.display = "block";
        hide_eye.style.display = "none";

    }
  }
function password_show_hide1() {
    var x        = document.getElementById("password1");
    var show_eye = document.getElementById("show_eye1");
    var hide_eye = document.getElementById("hide_eye1");

    hide_eye.classList.remove("d-none");
    if (x.type === "password") {
        x.type                 = "text";
        show_eye.style.display = "none";
        hide_eye.style.display = "block";
    } else {
        x.type                 = "password";
        show_eye.style.display = "block";
        hide_eye.style.display = "none";
    }
}

/* multi select js */
jQuery(".chosen-select").chosen({
    no_results_text: "Oops, nothing found!"
});

jQuery(document).ready(function()  {
    // initialize select2
    jQuery("#selUser").select2();

    // read selected option
    jQuery('#but_read').click(function() {
        var username = jQuery('#selUser option:selected').text();
        var userid   = jQuery('#selUser').val();
        jQuery('#result').html("id : " + userid + ", name : " + username);
    });
});

jQuery(document).ready(function() {
    // initialize select2
    jQuery("#selUser1").select2();

    // read selected option
    jQuery('#but_read').click(function() {
        var username = jQuery('#selUser1 option:selected').text();
        var userid = jQuery('#selUser1').val();
        jQuery('#result').html("id : " + userid + ", name : " + username);
    });
});

/**
 * on click plan your trip - step 3 - trip length update
 */
jQuery(function() {
    jQuery('[data-trip_increase]').click(trip_increase);
    jQuery('[data-trip_decrease]').click(trip_decrease);
    jQuery('[data-trip_value]').change(trip_valueChange);
});

// on increase change value
function trip_increase() {
    var value = jQuery(this).parent().find('[data-trip_value]').val();
    if(value < 30) {
        value++;
        jQuery('.pyt_s3_trip_length .day_prefix').html('Days');
        jQuery(this).parent().find('[data-trip_value]').val(value);
    }
}

// on decrease change value
function trip_decrease() {
    var value = jQuery(this).parent().find('[data-trip_value]').val();
    if(value > 1) {
        value--;
        if(value == 1) {
            jQuery('.pyt_s3_trip_length .day_prefix').html('Day');
        } else {
            jQuery('.pyt_s3_trip_length .day_prefix').html('Days');
        }
        jQuery(this).parent().find('[data-trip_value]').val(value);
    } else {
        jQuery('.pyt_s3_trip_length .day_prefix').html('Day');
        jQuery(this).parent().find('[data-trip_value]').val(1);
    }
}

// on change value
function trip_valueChange() {
    var value = jQuery(this).val();
    if(value == undefined || isNaN(value) == true || value <= 0) {
        jQuery(this).val(0);
    } else if(value >= 101) {
        jQuery(this).val(100);
    }
}

/**
 * on click plan your trip - step 2 - member count update
 */
jQuery(function() {
    jQuery('[data-increase]').click(increase);
    jQuery('[data-decrease]').click(decrease);
    jQuery('[data-value]').change(valueChange);
});

// on increase change value
function increase() {
    var value = jQuery(this).parent().find('[data-value]').val();
    if(value < 30) {
        value++;
        jQuery(this).parent().find('[data-value]').val(value);
    }
}

// on decrease change value
function decrease() {
    var value = jQuery(this).parent().find('[data-value]').val();
    if(value > 0) {
        value--;
        if(jQuery(this).parent().find('.adult').length && value == 0) {
            value = 1;
        }
        jQuery(this).parent().find('[data-value]').val(value);
    }
}

// on change value
function valueChange() {
    var value = jQuery(this).val();
    if(value == undefined || isNaN(value) == true || value <= 0) {
        jQuery(this).val(0);
    } else if(value >= 101) {
        jQuery(this).val(100);
    }
}

/**
 * on change internation telephone (for specific field)
 */
var telInput = document.querySelector("#phone");
var errorMsg = jQuery("#error-msg");
var validMsg = jQuery("#valid-msg");

function get_selected_country()
{
    var country_code = 'ca';
    jQuery.getJSON("https://ipinfo.io", function(response) {
        var get_code = response.country;
        country_code = get_code.toLowerCase();
    });
    return country_code;
}

// initialise script
var iti = window.intlTelInput(telInput, {
    initialCountry: get_selected_country(),
    geoIpLookup: function(success, failure) {
        jQuery.getJSON("https://ipinfo.io", function(data) {
            var country_code = data.country;
            country_code     = country_code.toLowerCase();
            success(country_code);
        });
    },
    hiddenInput     : "full",
    nationalMode    : true,
    separateDialCode: true,
    utilsScript     : "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.14/js/utils.js"
});

// set number
jQuery('input[name="phone_number[full]"]').val(iti.getNumber());

// set placeholder
jQuery('input[name="phone_number[full]"]').attr('placeholder', '');
jQuery('input[name="phone_number[main]"]').attr('placeholder', '');

telInput.addEventListener("countrychange", function() {
    // set phone number
    jQuery('input[name="phone_number[full]"]').val(iti.getNumber());

    // set placeholder
    jQuery('input[name="phone_number[full]"]').attr('placeholder', '');
    jQuery('input[name="phone_number[main]"]').attr('placeholder', '');
});

// on change value remove placeholder
jQuery("#phone").on('change', function() {
    // set phone number
    jQuery('input[name="phone_number[full]"]').val(iti.getNumber());

    // set placeholder
    jQuery('input[name="phone_number[full]"]').attr('placeholder', '');
    jQuery('input[name="phone_number[main]"]').attr('placeholder', '');
});

// on keup remove placeholder
jQuery('input[name="phone_number[main]"]').on('keyup', function(e) {
    // set placeholder
    jQuery('input[name="phone_number[full]"]').attr('placeholder', '');
    jQuery('input[name="phone_number[main]"]').attr('placeholder', '');
});

jQuery('input[name="prefer_travel_type"]').on('change', function(e) {
    switch(jQuery(this).val()) {
        case 'family':
            jQuery(".familyadultBox").addClass("open");
            jQuery(".familyadultBox .family").prop("disabled", false);
            jQuery(".groupAdultBox").removeClass("open");
            jQuery(".groupAdultBox .group").prop("disabled", true);
            jQuery('#prefertravel-error').hide();
            break;
        case 'group':
            jQuery(".familyadultBox").removeClass("open");
            jQuery(".familyadultBox .family").prop("disabled", true);
            jQuery(".groupAdultBox").addClass("open");
            jQuery(".groupAdultBox .group").prop("disabled", false);
            jQuery('#prefertravelfamily-error').hide();
            break;
        default:
            jQuery(".familyadultBox").removeClass("open");
            jQuery(".groupAdultBox").removeClass("open");
            jQuery(".familyadultBox .family").prop("disabled", true);
            jQuery(".groupAdultBox .group").prop("disabled", true);
            jQuery('#prefertravel-error').hide();
            jQuery('#prefertravelfamily-error').hide();
    }
});

google.maps.event.addDomListener(window, 'load', initialize);
function initialize() {
    var input = document.getElementById('autocomplete');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function () {});
}

/**
 * on change internation telephone (for contact form 1)
 */
var contact_phone_1 = document.querySelector(".contact_phone_1");
var iti_field = window.intlTelInput(contact_phone_1, {
    initialCountry: get_selected_country(),
    geoIpLookup: function(success, failure) {
        jQuery.getJSON("https://ipinfo.io", function(data) {
            var country_code = data.country;
            country_code     = country_code.toLowerCase();
            success(country_code);
        });
    },
    hiddenInput     : "full",
    nationalMode    : true,
    separateDialCode: true,
    utilsScript     : "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.14/js/utils.js"
});

// set number
jQuery('.contact_phone_1').val(iti_field.getNumber());

contact_phone_1.addEventListener("countrychange", function() {
    // set phone number
    jQuery('.contact_phone_1').val(iti_field.getNumber());

    // set placeholder
    jQuery('.contact_phone_1').attr('placeholder', 'Enter your contact number');
});

/**
 * on change internation telephone (for contact form 2)
 */
var contact_phone_2 = document.querySelector(".contact_phone_2");
var iti_field = window.intlTelInput(contact_phone_2, {
    initialCountry: get_selected_country(),
    geoIpLookup: function(success, failure) {
        jQuery.getJSON("https://ipinfo.io", function(data) {
            var country_code = data.country;
            country_code     = country_code.toLowerCase();
            success(country_code);
        });
    },
    hiddenInput     : "full",
    nationalMode    : true,
    separateDialCode: true,
    utilsScript     : "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.14/js/utils.js"
});

// set number
jQuery('.contact_phone_2').val(iti_field.getNumber());

contact_phone_2.addEventListener("countrychange", function() {
    // set phone number
    jQuery('.contact_phone_2').val(iti_field.getNumber());

    // set placeholder
    jQuery('.contact_phone_2').attr('placeholder', 'Enter your contact number');
});

/**
 * on change internation telephone (for contact form 3)
 */
var contact_phone_3 = document.querySelector(".contact_phone_3");
var iti_field = window.intlTelInput(contact_phone_3, {
    initialCountry: get_selected_country(),
    geoIpLookup: function(success, failure) {
        jQuery.getJSON("https://ipinfo.io", function(data) {
            var country_code = data.country;
            country_code     = country_code.toLowerCase();
            success(country_code);
        });
    },
    hiddenInput     : "full",
    nationalMode    : true,
    separateDialCode: true,
    utilsScript     : "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.14/js/utils.js"
});

// set number
jQuery('.contact_phone_3').val(iti_field.getNumber());

contact_phone_3.addEventListener("countrychange", function() {
    // set phone number
    jQuery('.contact_phone_3').val(iti_field.getNumber());

    // set placeholder
    jQuery('.contact_phone_3').attr('placeholder', 'Enter your contact number');
});

/**
 * on change internation telephone (for contact form 4)
 */
var contact_phone_4 = document.querySelector(".contact_phone_4");
var iti_field = window.intlTelInput(contact_phone_4, {
    initialCountry: get_selected_country(),
    geoIpLookup: function(success, failure) {
        jQuery.getJSON("https://ipinfo.io", function(data) {
            var country_code = data.country;
            country_code     = country_code.toLowerCase();
            success(country_code);
        });
    },
    hiddenInput     : "full",
    nationalMode    : true,
    separateDialCode: true,
    utilsScript     : "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.14/js/utils.js"
});

// set number
jQuery('.contact_phone_4').val(iti_field.getNumber());

contact_phone_4.addEventListener("countrychange", function() {
    // set phone number
    jQuery('.contact_phone_4').val(iti_field.getNumber());

    // set placeholder
    jQuery('.contact_phone_4').attr('placeholder', 'Enter your contact number');
});

/**
 * on change internation telephone (for contact form 5)
 */
var contact_phone_5 = document.querySelector(".contact_phone_5");
var iti_field = window.intlTelInput(contact_phone_5, {
    initialCountry: get_selected_country(),
    geoIpLookup: function(success, failure) {
        jQuery.getJSON("https://ipinfo.io", function(data) {
            var country_code = data.country;
            country_code     = country_code.toLowerCase();
            success(country_code);
        });
    },
    hiddenInput     : "full",
    nationalMode    : true,
    separateDialCode: true,
    utilsScript     : "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.14/js/utils.js"
});

// set number
jQuery('.contact_phone_5').val(iti_field.getNumber());

contact_phone_5.addEventListener("countrychange", function() {
    // set phone number
    jQuery('.contact_phone_5').val(iti_field.getNumber());

    // set placeholder
    jQuery('.contact_phone_5').attr('placeholder', 'Enter your contact number');
});