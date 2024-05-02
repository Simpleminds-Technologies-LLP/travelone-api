// custom tab
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    $('.multiple-items').slick('refresh');

    // trigger resize window
    setTimeout(function() {
        jQuery(window).trigger('resize');
    }, 0);
}

// single tour package tab
function openTourTab(event, tab_name, is_scroll = false, package_id = '') {
    // define and get data
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // check tab is itinerary
    if(tab_name == 'tab1' || tab_name == 'tab2') {
        // refresh slider
        jQuery('.multiple-items').slick('refresh');

        // resize trigger
        setTimeout(function() {
            jQuery(window).trigger('resize');
        }, 0);
    }

    // scroll to tab
    if(is_scroll) {
        // active tab
        jQuery('.package_tab').addClass('active');
        jQuery('.itinerary_tab').removeClass('active');

        // active tab content
        jQuery('.itinerary_content_tab').css('display', 'block');
        jQuery('.package_content_tab').css('display', 'none');

        // active itinerary package
        if(package_id) {
            // active itinerary tab
            jQuery('.itinerary_pkg').removeClass('active');
            jQuery('.itinerary_pkg_' + package_id).addClass('active');
            
            // active itinerary package tab
            jQuery('.itinerary_pkg_content').removeClass('current');
            jQuery('.itinerary_pkg_content_' + package_id).addClass('current');
        }

        // scroll to tab
        jQuery('html, body').animate({
            scrollTop: 650
        }, 100);
    } else {
        // active tab
        document.getElementById(tab_name).style.display = "block";
        event.currentTarget.className += " active";
    }
}

// slider tab open
function openSliderTab(element, tab_name) {
    // set tab index
    var tab_index = tab_name.replace('tab', '');

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tab_name).style.display = "block";
    element.currentTarget.className += " active";

    // reinit slider
    jQuery('.responsive1').slick('setPosition');
    jQuery('.slider_' + tab_index).slick('refresh');
    jQuery('.slider_' + tab_index).slick('setPosition');
    jQuery('.slider_' + tab_index).slick({
        dots: true,
        arrows: true,
    });
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function sortNumber(a, b) {
    return a - b;
}