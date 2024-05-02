 // Itinerary  Tab
 var matchHeightTitle = function () {
    function init() {
        eventListenersTitle();
        matchHeightTitle();
    }
    function eventListenersTitle() {
        $(window).on('resize', function () {
            matchHeightTitle();
        });
    }
    function matchHeightTitle() {
        var groupNameTitle = $('[data-match-heightTitle]');
        var groupHeightsTitle = [];

        groupNameTitle.css('min-height', 'auto');

        groupNameTitle.each(function () {
            groupHeightsTitle.push($(this).outerHeight());
        });

        var maxHeightTitle = Math.max.apply(null, groupHeightsTitle);
        groupNameTitle.css('min-height', maxHeightTitle);
    };
    return {
        init: init
    };

}();
$(document).ready(function () { 
    matchHeightTitle.init();
});
// Itinerary  Tab 



 // Itinerary  Tab
 var matchHeightStay = function () {
    function init() {
        eventListenersStay();
        matchHeightStay();
    }
    function eventListenersStay() {
        $(window).on('resize', function () {
            matchHeightStay();
        });
    }
    function matchHeightStay() {
        var groupNameStay = $('[data-match-heightStay]');
        var groupHeightsStay = [];

        groupNameStay.css('min-height', 'auto');

        groupNameStay.each(function () {
            groupHeightsStay.push($(this).outerHeight());
        });

        var maxHeightStay = Math.max.apply(null, groupHeightsStay);
        groupNameStay.css('min-height', maxHeightStay);
    };
    return {
        init: init
    };

}();
$(document).ready(function () { 
    matchHeightStay.init();
});
// Itinerary  Tab 


 // Itinerary  Tab
 var matchHeightActivity = function () {
    function init() {
        eventListenersActivity();
        matchHeightActivity();
    }
    function eventListenersActivity() {
        $(window).on('resize', function () {
            matchHeightActivity();
        });
    }
    function matchHeightActivity() {
        var groupNameActivity = $('[data-match-heightActivity]');
        var groupHeightsActivity = [];

        groupNameActivity.css('min-height', 'auto');

        groupNameActivity.each(function () {
            groupHeightsActivity.push($(this).outerHeight());
        });

        var maxHeightActivity = Math.max.apply(null, groupHeightsActivity);
        groupNameActivity.css('min-height', maxHeightActivity);
    };
    return {
        init: init
    };

}();
$(document).ready(function () { 
    matchHeightActivity.init();
});
// Itinerary  Tab 



 // Itinerary  Tab
 var matchHeightsightTranspo = function () {
    function init() {
        eventListenerssightTranspo();
        matchHeightsightTranspo();
    }
    function eventListenerssightTranspo() {
        $(window).on('resize', function () {
            matchHeightsightTranspo();
        });
    }
    function matchHeightsightTranspo() {
        var groupNamesightTranspo = $('[data-match-heightsightTranspo]');
        var groupHeightssightTranspo = [];

        groupNamesightTranspo.css('min-height', 'auto');

        groupNamesightTranspo.each(function () {
            groupHeightssightTranspo.push($(this).outerHeight());
        });

        var maxHeightsightTranspo = Math.max.apply(null, groupHeightssightTranspo);
        groupNamesightTranspo.css('min-height', maxHeightsightTranspo);
    };
    return {
        init: init
    };

}();
$(document).ready(function () { 
    matchHeightsightTranspo.init();
});
// Itinerary  Tab 



 // Itinerary  Tab
 var matchHeightsightMeals = function () {
    function init() {
        eventListenerssightMeals();
        matchHeightsightMeals();
    }
    function eventListenerssightMeals() {
        $(window).on('resize', function () {
            matchHeightsightMeals();
        });
    }
    function matchHeightsightMeals() {
        var groupNamesightMeals = $('[data-match-heightsightMeals]');
        var groupHeightssightMeals = [];

        groupNamesightMeals.css('min-height', 'auto');

        groupNamesightMeals.each(function () {
            groupHeightssightMeals.push($(this).outerHeight());
        });

        var maxHeightsightMeals = Math.max.apply(null, groupHeightssightMeals);
        groupNamesightMeals.css('min-height', maxHeightsightMeals);
    };
    return {
        init: init
    };

}();
$(document).ready(function () { 
    matchHeightsightMeals.init();
});
// Itinerary  Tab 



// Package details  Tab
var matchHeightpackagesdetailTitle = function () {
    function init() {
        eventListenerspackagesdetailTitle();
        matchHeightpackagesdetailTitle();
    }
    function eventListenerspackagesdetailTitle() {
        $(window).on('resize', function () {
            matchHeightpackagesdetailTitle();
        });
    }
    function matchHeightpackagesdetailTitle() {
        var groupNamepackagesdetailTitle = $('[data-match-heightpackagesdetailTitle]');
        var groupHeightspackagesdetailTitle = [];

        groupNamepackagesdetailTitle.css('min-height', 'auto');

        groupNamepackagesdetailTitle.each(function () {
            groupHeightspackagesdetailTitle.push($(this).outerHeight());
        });

        var maxHeightpackagesdetailTitle = Math.max.apply(null, groupHeightspackagesdetailTitle);
        groupNamepackagesdetailTitle.css('min-height', maxHeightpackagesdetailTitle);
    };
    return {
        init: init
    };

}();
$(document).ready(function () { 
    matchHeightpackagesdetailTitle.init();
});
// Package details  Tab 


// Package details  Tab
var matchHeightpackagesdetailCityBreak = function () {
    function init() {
        eventListenerspackagesdetailCityBreak();
        matchHeightpackagesdetailCityBreak();
    }
    function eventListenerspackagesdetailCityBreak() {
        $(window).on('resize', function () {
            matchHeightpackagesdetailCityBreak();
        });
    }
    function matchHeightpackagesdetailCityBreak() {
        var groupNamepackagesdetailCityBreak = $('[data-match-heightpackagesdetailCityBreak]');
        var groupHeightspackagesdetailCityBreak = [];

        groupNamepackagesdetailCityBreak.css('min-height', 'auto');

        groupNamepackagesdetailCityBreak.each(function () {
            groupHeightspackagesdetailCityBreak.push($(this).outerHeight());
        });

        var maxHeightpackagesdetailCityBreak = Math.max.apply(null, groupHeightspackagesdetailCityBreak);
        groupNamepackagesdetailCityBreak.css('min-height', maxHeightpackagesdetailCityBreak);
    };
    return {
        init: init
    };

}();
$(document).ready(function () { 
    matchHeightpackagesdetailCityBreak.init();
});
// Package details  Tab 


// Package details  Tab
var matchHeightpackagesdetailStayActivity = function () {
    function init() {
        eventListenerspackagesdetailStayActivity();
        matchHeightpackagesdetailStayActivity();
    }
    function eventListenerspackagesdetailStayActivity() {
        $(window).on('resize', function () {
            matchHeightpackagesdetailStayActivity();
        });
    }
    function matchHeightpackagesdetailStayActivity() {
        var groupNamepackagesdetailStayActivity = $('[data-match-heightpackagesdetailStayActivity]');
        var groupHeightspackagesdetailStayActivity = [];

        groupNamepackagesdetailStayActivity.css('min-height', 'auto');

        groupNamepackagesdetailStayActivity.each(function () {
            groupHeightspackagesdetailStayActivity.push($(this).outerHeight());
        });

        var maxHeightpackagesdetailStayActivity = Math.max.apply(null, groupHeightspackagesdetailStayActivity);
        groupNamepackagesdetailStayActivity.css('min-height', maxHeightpackagesdetailStayActivity);
    };
    return {
        init: init
    };

}();
$(document).ready(function () { 
    matchHeightpackagesdetailStayActivity.init();
});
// Package details  Tab 




// Package details  Tab
var matchHeightpackagesdetailTranspo = function () {
    function init() {
        eventListenerspackagesdetailTranspo();
        matchHeightpackagesdetailTranspo();
    }
    function eventListenerspackagesdetailTranspo() {
        $(window).on('resize', function () {
            matchHeightpackagesdetailTranspo();
        });
    }
    function matchHeightpackagesdetailTranspo() {
        var groupNamepackagesdetailTranspo = $('[data-match-heightpackagesdetailTranspo]');
        var groupHeightspackagesdetailTranspo = [];

        groupNamepackagesdetailTranspo.css('min-height', 'auto');

        groupNamepackagesdetailTranspo.each(function () {
            groupHeightspackagesdetailTranspo.push($(this).outerHeight());
        });

        var maxHeightpackagesdetailTranspo = Math.max.apply(null, groupHeightspackagesdetailTranspo);
        groupNamepackagesdetailTranspo.css('min-height', maxHeightpackagesdetailTranspo);
    };
    return {
        init: init
    };

}();
$(document).ready(function () { 
    matchHeightpackagesdetailTranspo.init();
});
// Package details  Tab 



// Package details  Tab
var matchHeightpackagesdetailMeals = function () {
    function init() {
        eventListenerspackagesdetailMeals();
        matchHeightpackagesdetailMeals();
    }
    function eventListenerspackagesdetailMeals() {
        $(window).on('resize', function () {
            matchHeightpackagesdetailMeals();
        });
    }
    function matchHeightpackagesdetailMeals() {
        var groupNamepackagesdetailMeals = $('[data-match-heightpackagesdetailMeals]');
        var groupHeightspackagesdetailMeals = [];

        groupNamepackagesdetailMeals.css('min-height', 'auto');

        groupNamepackagesdetailMeals.each(function () {
            groupHeightspackagesdetailMeals.push($(this).outerHeight());
        });

        var maxHeightpackagesdetailMeals = Math.max.apply(null, groupHeightspackagesdetailMeals);
        groupNamepackagesdetailMeals.css('min-height', maxHeightpackagesdetailMeals);
    };
    return {
        init: init
    };

}();

$(document).ready(function () { 
    matchHeightpackagesdetailMeals.init();
});

// match height for b2b pricing
var matchHeightpackagesdetailB2BPricinig = function () {
    function init() {
        eventListenerspackagesdetailPricinig();
        matchHeightpackagesdetailB2BPricinig();
    }

    function eventListenerspackagesdetailPricinig() {
        jQuery(window).on('resize', function () {
            matchHeightpackagesdetailB2BPricinig();
        });
    }

    function matchHeightpackagesdetailB2BPricinig() {
        var groupNamepackagesdetailPricinig = jQuery('[data-match-heightpackagesdetailB2BPricinig]');
        var groupHeightspackagesdetailPricinig = [];

        groupNamepackagesdetailPricinig.css('min-height', 'auto');

        groupNamepackagesdetailPricinig.each(function () {
            groupHeightspackagesdetailPricinig.push(jQuery(this).outerHeight());
        });

        var maxHeightpackagesdetailPricinig = Math.max.apply(null, groupHeightspackagesdetailPricinig);
        groupNamepackagesdetailPricinig.css('min-height', maxHeightpackagesdetailPricinig);
    };
    return {
        init: init
    };
}();

jQuery(document).ready(function () { 
    matchHeightpackagesdetailB2BPricinig.init();
});

// match height for b2c pricing
var matchHeightpackagesdetailPricinig = function () {
    function init() {
        eventListenerspackagesdetailPricinig();
        matchHeightpackagesdetailPricinig();
    }
    function eventListenerspackagesdetailPricinig() {
        jQuery(window).on('resize', function () {
            matchHeightpackagesdetailPricinig();
        });
    }
    function matchHeightpackagesdetailPricinig() {
        var groupNamepackagesdetailPricinig = $('[data-match-heightpackagesdetailB2CPricinig]');
        var groupHeightspackagesdetailPricinig = [];

        groupNamepackagesdetailPricinig.css('min-height', 'auto');

        groupNamepackagesdetailPricinig.each(function () {
            groupHeightspackagesdetailPricinig.push(jQuery(this).outerHeight());
        });

        var maxHeightpackagesdetailPricinig = Math.max.apply(null, groupHeightspackagesdetailPricinig);
        groupNamepackagesdetailPricinig.css('min-height', maxHeightpackagesdetailPricinig);
    };
    return {
        init: init
    };
}();

jQuery(document).ready(function () { 
    matchHeightpackagesdetailPricinig.init();
});