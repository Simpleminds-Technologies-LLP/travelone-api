   /*==============   Itinary Tab Equals Hieght JS      =================== */

     // Details Page Itinary tab Sightseeing Tour Section Content box Height Fixed Js 
     var matchHeight02 = function () {
        function init() {
            eventListener02();
            matchHeight02();
        }
        function eventListener02() {
            $(window).on('resize', function () {
                matchHeight02();
            });
        }
        function matchHeight02() {
            var groupName02 = $('[data-match-height02]');
            var groupHeights02 = [];

            groupName02.css('min-height', 'auto');

            groupName02.each(function () {
                groupHeights02.push($(this).outerHeight());
            });

            var maxHeight02 = Math.max.apply(null, groupHeights02);
            groupName02.css('min-height', maxHeight02);
        };
        return {
            init: init
        };

    }();
    $(document).ready(function () { 
        matchHeight02.init();
    });
    // Details Page Itinary tab  Sightseeing Tour Section Content box Height Fixed Js 


     // Details Page Itinary tab Activities Section Content box Height Fixed Js 
     var matchHeight03 = function () {
        function init() {
            eventListener03();
            matchHeight03();
        }
        function eventListener03() {
            $(window).on('resize', function () {
                matchHeight03();
            });
        }
        function matchHeight03() {
            var groupName03 = $('[data-match-height03]');
            var groupHeights03 = [];

            groupName03.css('min-height', 'auto');

            groupName03.each(function () {
                groupHeights03.push($(this).outerHeight());
            });

            var maxHeight03 = Math.max.apply(null, groupHeights03);
            groupName03.css('min-height', maxHeight03);
        };
        return {
            init: init
        };

    }();
    $(document).ready(function () { 
        matchHeight03.init();
    });
    // Details Page Itinary tab Activities  Section Content box Height Fixed Js 


     // Details Page Itinary tab title Section Content box Height Fixed Js 
     var matchHeighttitle = function () {
        function init() {
            eventListenertitle();
            matchHeighttitle();
        }
        function eventListenertitle() {
            $(window).on('resize', function () {
                matchHeighttitle();
            });
        }
        function matchHeighttitle() {
            var groupNametitle = $('[data-match-heighttitle]');
            var groupHeightstitle = [];

            groupNametitle.css('min-height', 'auto');

            groupNametitle.each(function () {
                groupHeightstitle.push($(this).outerHeight());
            });

            var maxHeighttitle = Math.max.apply(null, groupHeightstitle);
            groupNametitle.css('min-height', maxHeighttitle);
        };
        return {
            init: init
        };

    }();
    $(document).ready(function () { 
        matchHeighttitle.init();
    });
    // Details Page Itinary tab title  Section Content box Height Fixed Js 



     // Details Page Itinary tab Transportation Section Content box Height Fixed Js 
     var matchHeighttranspo = function () {
        function init() {
            eventListenertranspo();
            matchHeighttranspo();
        }
        function eventListenertranspo() {
            $(window).on('resize', function () {
                matchHeighttranspo();
            });
        }
        function matchHeighttranspo() {
            var groupNametranspo = $('[data-match-heighttranspo]');
            var groupHeightstranspo = [];

            groupNametranspo.css('min-height', 'auto');

            groupNametranspo.each(function () {
                groupHeightstranspo.push($(this).outerHeight());
            });

            var maxHeighttranspo = Math.max.apply(null, groupHeightstranspo);
            groupNametranspo.css('min-height', maxHeighttranspo);
        };
        return {
            init: init
        };

    }();
    $(document).ready(function () { 
        matchHeighttranspo.init();
    });
    // Details Page Itinary tab Transportation  Section Content box Height Fixed Js 


     // Details Page Itinary tab Stay room category Section Content box Height Fixed Js 
     var matchHeightstayroom = function () {
        function init() {
            eventListenerstayroom();
            matchHeightstayroom();
        }
        function eventListenerstayroom() {
            $(window).on('resize', function () {
                matchHeightstayroom();
            });
        }
        function matchHeightstayroom() {
            var groupNamestayroom = $('[data-match-heightstayroom]');
            var groupHeightsstayroom = [];

            groupNamestayroom.css('min-height', 'auto');

            groupNamestayroom.each(function () {
                groupHeightsstayroom.push($(this).outerHeight());
            });

            var maxHeightstayroom = Math.max.apply(null, groupHeightsstayroom);
            groupNamestayroom.css('min-height', maxHeightstayroom);
        };
        return {
            init: init
        };

    }();
    $(document).ready(function () { 
        matchHeightstayroom.init();
    });
    // Details Page Itinary tab Stay room category  Section Content box Height Fixed Js 


     // Details Page Itinary tab Meals Section Content box Height Fixed Js 
     var matchHeightmeals = function () {
        function init() {
            eventListenermeals();
            matchHeightmeals();
        }
        function eventListenermeals() {
            $(window).on('resize', function () {
                matchHeightmeals();
            });
        }
        function matchHeightmeals() {
            var groupNamemeals = $('[data-match-heightmeals]');
            var groupHeightsmeals = [];

            groupNamemeals.css('min-height', 'auto');

            groupNamemeals.each(function () {
                groupHeightsmeals.push($(this).outerHeight());
            });

            var maxHeightmeals = Math.max.apply(null, groupHeightsmeals);
            groupNamemeals.css('min-height', maxHeightmeals);
        };
        return {
            init: init
        };

    }();
    $(document).ready(function () { 
        matchHeightmeals.init();
    });
    // Details Page Itinary tab Meals  Section Content box Height Fixed Js 



     // Details Page Itinary tab Inter-city Transportation Section Content box Height Fixed Js 
     var matchHeightintercitytranspo = function () {
        function init() {
            eventListenerintercitytranspo();
            matchHeightintercitytranspo();
        }
        function eventListenerintercitytranspo() {
            $(window).on('resize', function () {
                matchHeightintercitytranspo();
            });
        }
        function matchHeightintercitytranspo() {
            var groupNameintercitytranspo = $('[data-match-heightintercitytranspo]');
            var groupHeightsintercitytranspo = [];

            groupNameintercitytranspo.css('min-height', 'auto');

            groupNameintercitytranspo.each(function () {
                groupHeightsintercitytranspo.push($(this).outerHeight());
            });

            var maxHeightintercitytranspo = Math.max.apply(null, groupHeightsintercitytranspo);
            groupNameintercitytranspo.css('min-height', maxHeightintercitytranspo);
        };
        return {
            init: init
        };

    }();
    $(document).ready(function () { 
        matchHeightintercitytranspo.init();
    });
    // Details Page Itinary tab Inter-city Transportation  Section Content box Height Fixed Js 

/*==============   Itinary Tab Equals Hieght JS      =================== */




/*==============   Packages Tab Equals Hieght JS      =================== */

    // City Breakup
    var matchHeightpackcity = function () {
        function init() {
            eventListenerpackcity();
            matchHeightpackcity();
        }
        function eventListenerpackcity() {
            $(window).on('resize', function () {
                matchHeightpackcity();
            });
        }
        function matchHeightpackcity() {
            var groupNamepackcity = $('[data-match-heightpackcity]');
            var groupHeightspackcity = [];

            groupNamepackcity.css('min-height', 'auto');

            groupNamepackcity.each(function () {
                groupHeightspackcity.push($(this).outerHeight());
            });

            var maxHeightpackcity = Math.max.apply(null, groupHeightspackcity);
            groupNamepackcity.css('min-height', maxHeightpackcity);
        };
        return {
            init: init
        };

    }();
    $(document).ready(function () { 
        matchHeightpackcity.init();
    });
    // City Breakup


    // Stay
    var matchHeightpackstay = function () {
        function init() {
            eventListenerpackstay();
            matchHeightpackstay();
        }
        function eventListenerpackstay() {
            $(window).on('resize', function () {
                matchHeightpackstay();
            });
        }
        function matchHeightpackstay() {
            var groupNamepackstay = $('[data-match-heightpackstay]');
            var groupHeightspackstay = [];

            groupNamepackstay.css('min-height', 'auto');

            groupNamepackstay.each(function () {
                groupHeightspackstay.push($(this).outerHeight());
            });

            var maxHeightpackstay = Math.max.apply(null, groupHeightspackstay);
            groupNamepackstay.css('min-height', maxHeightpackstay);
        };
        return {
            init: init
        };

    }();
    $(document).ready(function () { 
        matchHeightpackstay.init();
    });
    // Stay


    // Sightseeing Tour / Activities
    var matchHeightpacksighttour = function () {
        function init() {
            eventListenerpacksighttour();
            matchHeightpacksighttour();
        }
        function eventListenerpacksighttour() {
            $(window).on('resize', function () {
                matchHeightpacksighttour();
            });
        }
        function matchHeightpacksighttour() {
            var groupNamepacksighttour = $('[data-match-heightpacksighttour]');
            var groupHeightspacksighttour = [];

            groupNamepacksighttour.css('min-height', 'auto');

            groupNamepacksighttour.each(function () {
                groupHeightspacksighttour.push($(this).outerHeight());
            });

            var maxHeightpacksighttour = Math.max.apply(null, groupHeightspacksighttour);
            groupNamepacksighttour.css('min-height', maxHeightpacksighttour);
        };
        return {
            init: init
        };

    }();
    $(document).ready(function () { 
        matchHeightpacksighttour.init();
    });
    // Sightseeing Tour / Activities


    // Transportation  Tab
     var matchHeight01 = function () {
        function init() {
            eventListeners01();
            matchHeight01();
        }
        function eventListeners01() {
            $(window).on('resize', function () {
                matchHeight01();
            });
        }
        function matchHeight01() {
            var groupName01 = $('[data-match-height01]');
            var groupHeights01 = [];

            groupName01.css('min-height', 'auto');

            groupName01.each(function () {
                groupHeights01.push($(this).outerHeight());
            });

            var maxHeight01 = Math.max.apply(null, groupHeights01);
            groupName01.css('min-height', maxHeight01);
        };
        return {
            init: init
        };

    }();
    $(document).ready(function () { 
        matchHeight01.init();
    });
    // Transportation  Tab 


    // Meals
    var matchHeightpackmeals = function () {
        function init() {
            eventListenerpackmeals();
            matchHeightpackmeals();
        }
        function eventListenerpackmeals() {
            $(window).on('resize', function () {
                matchHeightpackmeals();
            });
        }
        function matchHeightpackmeals() {
            var groupNamepackmeals = $('[data-match-heightpackmeals]');
            var groupHeightspackmeals = [];

            groupNamepackmeals.css('min-height', 'auto');

            groupNamepackmeals.each(function () {
                groupHeightspackmeals.push($(this).outerHeight());
            });

            var maxHeightpackmeals = Math.max.apply(null, groupHeightspackmeals);
            groupNamepackmeals.css('min-height', maxHeightpackmeals);
        };
        return {
            init: init
        };

    }();
    $(document).ready(function () { 
        matchHeightpackmeals.init();
    });
    // Meals


     // Guest Nationality
     var matchHeightpackguest = function () {
        function init() {
            eventListenerpackguest();
            matchHeightpackguest();
        }
        function eventListenerpackguest() {
            $(window).on('resize', function () {
                matchHeightpackguest();
            });
        }
        function matchHeightpackguest() {
            var groupNamepackguest = $('[data-match-heightpackguest]');
            var groupHeightspackguest = [];

            groupNamepackguest.css('min-height', 'auto');

            groupNamepackguest.each(function () {
                groupHeightspackguest.push($(this).outerHeight());
            });

            var maxHeightpackguest = Math.max.apply(null, groupHeightspackguest);
            groupNamepackguest.css('min-height', maxHeightpackguest);
        };
        return {
            init: init
        };

    }();
    $(document).ready(function () { 
        matchHeightpackguest.init();
    });
    // Guest Nationality



      // Price Per Person
      var matchHeightpackprice = function () {
        function init() {
            eventListenerpackprice();
            matchHeightpackprice();
        }
        function eventListenerpackprice() {
            $(window).on('resize', function () {
                matchHeightpackprice();
            });
        }
        function matchHeightpackprice() {
            var groupNamepackprice = $('[data-match-heightpackprice]');
            var groupHeightspackprice = [];

            groupNamepackprice.css('min-height', 'auto');

            groupNamepackprice.each(function () {
                groupHeightspackprice.push($(this).outerHeight());
            });

            var maxHeightpackprice = Math.max.apply(null, groupHeightspackprice);
            groupNamepackprice.css('min-height', maxHeightpackprice);
        };
        return {
            init: init
        };

    }();
    $(document).ready(function () { 
        matchHeightpackprice.init();
    });
    // Price Per Person


      // Price Per Person button
      var matchHeightpackbtn = function () {
        function init() {
            eventListenerpackbtn();
            matchHeightpackbtn();
        }
        function eventListenerpackbtn() {
            $(window).on('resize', function () {
                matchHeightpackbtn();
            });
        }
        function matchHeightpackbtn() {
            var groupNamepackbtn = $('[data-match-heightpackbtn]');
            var groupHeightspackbtn = [];

            groupNamepackbtn.css('min-height', 'auto');

            groupNamepackbtn.each(function () {
                groupHeightspackbtn.push($(this).outerHeight());
            });

            var maxHeightpackbtn = Math.max.apply(null, groupHeightspackbtn);
            groupNamepackbtn.css('min-height', maxHeightpackbtn);
        };
        return {
            init: init
        };

    }();
    $(document).ready(function () { 
        matchHeightpackbtn.init();
    });
    // Price Per Person button


      // Main title packages
      var matchHeightpackmaintitle = function () {
        function init() {
            eventListenerpackmaintitle();
            matchHeightpackmaintitle();
        }
        function eventListenerpackmaintitle() {
            $(window).on('resize', function () {
                matchHeightpackmaintitle();
            });
        }
        function matchHeightpackmaintitle() {
            var groupNamepackmaintitle = $('[data-match-heightpackmaintitle]');
            var groupHeightspackmaintitle = [];

            groupNamepackmaintitle.css('min-height', 'auto');

            groupNamepackmaintitle.each(function () {
                groupHeightspackmaintitle.push($(this).outerHeight());
            });

            var maxHeightpackmaintitle = Math.max.apply(null, groupHeightspackmaintitle);
            groupNamepackmaintitle.css('min-height', maxHeightpackmaintitle);
        };
        return {
            init: init
        };

    }();
    $(document).ready(function () { 
        matchHeightpackmaintitle.init();
    });
    // Main title packages


/**
 * compare package same height (days wise)
 */
// Main title packages
jQuery(document).ready(function () {
    matchHeightComparePackageDays.init();
});

var matchHeightComparePackageDays = function () {
    function init() {
        eventListenerpackmaintitle();
        matchHeightComparePackageDays('heightPackageGroup_1');
        matchHeightComparePackageDays('heightPackageGroup_2');
        matchHeightComparePackageDays('heightPackageGroup_3');
        matchHeightComparePackageDays('heightPackageGroup_4');
        matchHeightComparePackageDays('heightPackageGroup_5');
        matchHeightComparePackageDays('heightPackageGroup_6');
        matchHeightComparePackageDays('heightPackageGroup_7');
        matchHeightComparePackageDays('heightPackageGroup_8');
        matchHeightComparePackageDays('heightPackageGroup_9');
    }

    function eventListenerpackmaintitle() {
        jQuery(window).on('resize', function () {
            matchHeightComparePackageDays('heightPackageGroup_1');
            matchHeightComparePackageDays('heightPackageGroup_2');
            matchHeightComparePackageDays('heightPackageGroup_3');
            matchHeightComparePackageDays('heightPackageGroup_4');
            matchHeightComparePackageDays('heightPackageGroup_5');
            matchHeightComparePackageDays('heightPackageGroup_6');
            matchHeightComparePackageDays('heightPackageGroup_7');
            matchHeightComparePackageDays('heightPackageGroup_8');
            matchHeightComparePackageDays('heightPackageGroup_9');
        });
    }

    function matchHeightComparePackageDays(city_element) {
        var groupHeightspackmaintitle = [];
        var sameHeightForPackageCity  = jQuery('[data-match-' + city_element + ']');
        sameHeightForPackageCity.css('min-height', 'auto');
        sameHeightForPackageCity.each(function () {
            groupHeightspackmaintitle.push(jQuery(this).outerHeight());
        });
        var maxHeightpackmaintitle = Math.max.apply(null, groupHeightspackmaintitle);
        sameHeightForPackageCity.css('min-height', maxHeightpackmaintitle);
    };
    
    return {
        init: init
    };
}();