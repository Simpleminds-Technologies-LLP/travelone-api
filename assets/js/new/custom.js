$('.responsive').slick({
  arrows: true,
  dots: false,
  speed: 1500,
  centerMode: false,
  centerPadding: '60px',
  slidesToShow: 5,
  slidesToScroll: 5,
  infinite:false,
  responsive: [
    {
      breakpoint:1200,
      speed: 2000,
      settings: {
        arrows: false,
        dots: true,
        centerMode: false,
        centerPadding: '40px',
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true
      }
    },
    {
      breakpoint: 992,
      speed: 2000,
      settings: {
        arrows: false,
        dots: true,
        centerMode: false,
        centerPadding: '40px',
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true
      }
    },
    {
      breakpoint: 768,
      speed: 2000,
      settings: {
        arrows: false,
        dots: true,
        centerMode: false,
        centerPadding: '40px',
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 480,
      speed: 2000,
      settings: {
        arrows: false,
        dots: true,
        centerMode: false,
        centerPadding: '40px',
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ]
});

/* tranding deals  js */
$('.responsive1').slick({
  arrows: true,
  dots: false,
  infinite: false,
  speed: 1500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1200,
      speed: 2000,
      settings: {
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        arrows: false
      }
    },
    {
      breakpoint: 1024,
      speed: 2000,
      settings: {
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        arrows: false,
      }
    },
    {
      breakpoint: 992,
      speed: 2000,
      settings: {
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        arrows: false,
      }
    },
    {
      breakpoint: 768,
      speed: 2000,
      settings: {
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        arrows: false,
      }
    },
    {
      breakpoint:767,
      speed: 2000,
      settings: {
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        arrows: false,
      }
    },
    {
      breakpoint:600,
      speed: 2000,
      settings: {
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        arrows: false,
      }
    },
    {
      breakpoint: 501,
      speed: 2000,
      settings: {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});


/* nav dropdown  js */
// DOM ready
$(function() {
 
  // Create the dropdown base
  $("<select />").appendTo("nav.navDrop");

  // Create default option "Go to..."
  $("<option />", {
    "selected": "selected",
    "value"   : "",
    "text"    : "Special Deals"
  }).appendTo("nav.navDrop select");

  // Populate dropdown with menu items
  $("nav.navDrop a").each(function() {
    var el = $(this);
    $("<option />", {
      "value"   : el.attr("href"),
      "text"    : el.text()
    }).appendTo("nav.navDrop select");
  });

   // To make dropdown actually work
   // To make more unobtrusive: https://css-tricks.com/4064-unobtrusive-page-changer/
  $("nav.navDrop select").change(function() {
    window.location = $(this).find("option:selected").val();
  });

});



/* listing page slider */
$('.listing-slider').slick({
  arrows:false,
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
        arrows:false,
        dots: false
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 7,
        infinite: false,        
        arrows:false,
        dots: true
      }
    },
    {
      breakpoint:768,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,        
        arrows:false,
        dots: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow:4,
        slidesToScroll: 4,
        infinite: false,        
        arrows:false,
        dots: true
      }
    }
    
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});


/* listing slider review */


/**
 * listing tours
 */
jQuery('.listing-review').slick({
    arrows        : false,
    dots          : true,
    infinite      : false,
    speed         : 300,
    slidesToShow  : 4,
    slidesToScroll: 4,
    responsive    : [
        {
            breakpoint: 1200,
            settings  : {
                dots          : true,
                slidesToShow  : 3,
                slidesToScroll: 1,
                infinite      : false,
                arrows        : false
            }
        },
        {
            breakpoint: 1024,
            settings  : {
                dots          : true,
                slidesToShow  : 3,
                slidesToScroll: 1,
                infinite      : false,
                arrows        : false,
                autoplay      : true
            }
        },
        {
            breakpoint: 992,
            settings  : {
                dots          : true,
                slidesToShow  : 2,
                slidesToScroll: 1,
                infinite      : false,
                arrows        : false,
                autoplay      : true
            }
        },
        {
            breakpoint: 768,
            settings  : {
                dots          : true,
                slidesToShow  : 2,
                slidesToScroll: 1,
                infinite      : false,
                arrows        : false,
                autoplay      : true
            }
        },
        {
            breakpoint: 577,
            settings  : {
                dots          : true,
                slidesToShow  : 1,
                slidesToScroll: 1,
                infinite      : false,
                arrows        : false,
                autoplay      : true
            }
        }
    ]
});

/**
 * viator compare similar experiences
 */
jQuery('.compare-review').slick({
    arrows        : false,
    dots          : true,
    infinite      : false,
    speed         : 300,
    slidesToShow  : 3,
    slidesToScroll: 3,
    responsive    : [
        {
            breakpoint: 1200,
            settings: {
                dots          : true,
                slidesToShow  : 3,
                slidesToScroll: 1,
                infinite      : false,
                arrows        : false
            }
        },
        {
            breakpoint: 1024,
            settings: {
                dots          : true,
                slidesToShow  : 3,
                slidesToScroll: 1,
                infinite      : false,
                arrows        : false,
                autoplay      : true
            }
        },
        {
            breakpoint: 992,
            settings  : {
                dots          : true,
                slidesToShow  : 2,
                slidesToScroll: 1,
                infinite      : false,
                arrows        : false,
                autoplay      : true
            }
        },
        {
            breakpoint: 768,
            settings  : {
                dots          : true,
                slidesToShow  : 2,
                slidesToScroll: 1,
                infinite      : false,
                arrows        : false,
                autoplay      : true
            }
        },
        {
            breakpoint: 577,
            settings: {
                dots          : true,
                slidesToShow  : 1,
                slidesToScroll: 1,
                infinite      : false,
                arrows        : false,
                autoplay      : true
            }
        }
    ]
});


$('.imageSlider').slick({
  arrows: true,
  dots: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1, 
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
      }
    },
    {breakpoint: 1024,
      settings: {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
      }
    },
    {
      breakpoint: 992,
      settings: {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
      }
    },
    {
      breakpoint: 768,
      settings: {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
      }
    },
    {
      breakpoint:767,
      settings: {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
      }
    },
    {
      breakpoint: 480,
      settings: {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});




/*  checkbox only one selected  */

  function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('price-name')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}


/*  checkbox only one selected */




/* show hide div */

$(document).ready(function(){

$(".ShowMoreAnch #showMore").click(function(){
  $("#showmoreActive").toggleClass("active");
});

  
$(".ShowMoreAnch #showMore1").click(function(){
  $("#showmoreActive1").toggleClass("active");
});

 
$(".ShowMoreAnch #showMore2").click(function(){
  $("#showmoreActive2").toggleClass("active");
});

 
$(".ShowMoreAnch #showMore3").click(function(){
  $("#showmoreActive3").toggleClass("active");
});


});



/* clone duplicate row */
$(document).ready(function(){

  $('#but_add').click(function(){
 
   // Create clone of <div class='input-form-loadmore'>
   var newel = $('.input-form-loadmore .mobile-wd-half:last').clone();
 
   // Add after last <div class='input-form-loadmore'>
   $(newel).insertAfter(".input-form-loadmore .mobile-wd-half:last");
  });
 
 
 });



/* back to top arrows */
// Back to top
var amountScrolled = 200;
var amountScrolledNav = 25;

$(window).scroll(function() {
  if ( $(window).scrollTop() > amountScrolled ) {
    $('button.back-to-top').addClass('show');
  } else {
    $('button.back-to-top').removeClass('show');
  }
});

$('button.back-to-top').click(function() {
  $('html, body').animate({
    scrollTop: 0
  }, 800);
  return false;
});

/* listing details page slider */
var previousButton, nextButton;
var rotationButton, pauseContainer, resumeContainer;
var slidesContainer, slides;
var dots;

window.addEventListener('DOMContentLoaded', function(e) {
  previousButton = document.querySelector('.carousel .previous-button');
  nextButton = document.querySelector('.carousel .next-button');
  
  rotationButton = document.querySelector('.carousel .rotation-button');
  pauseContainer = document.querySelector('.carousel .rotation-button .pause-container');
  resumeContainer = document.querySelector('.carousel .rotation-button .resume-container');
  
  slidesContainer = document.querySelector('.carousel .slides');
  slides = document.querySelectorAll('.carousel .slides .slide');

  /**
    When Slick Slider loads, set up the slide dots correctly.
  */
  $('.carousel .slides').on('init', function(e, slick) {
    // Ensure all the non-visible slides and their content are impossible to reach by keyboard
    hideNonVisibleSlides();
    
    // Retreive references to all the slide dot DOM elements
    dots = document.querySelectorAll('.carousel .slick-dots li button');
    
    // Give the first slide dot `aria-current="true"` on load
    dots[0].setAttribute('aria-current', true);
    
    dots.forEach(function(dot, index) {
      // Indicate the action the button will invoke to make it clear that these are controls, not slides themselves
      dot.innerText = 'Go to slide ' + (index + 1);
      
      // Disable autoplay as soon as a user activates a slide dot
      dot.addEventListener('click', function(e) {
        disableAutoplay();
      });
    });
  });
  
  /**
    Before each slide transition, make each slide visible and update the current slide dot
  */
  $('.carousel .slides').on('beforeChange', function(e, slick, currentSlide, nextSlide) {
    // Make each slide visible during the transition animation
    slides.forEach(function(slide) {
      slide.classList.remove('is-hidden');
    });

    // Move the active dot indicator before animation for a "snappier" feel
    dots.forEach(function(dot) {
      dot.removeAttribute('aria-current');
    });
    
    // Indicate which slide is active through the slide dots
    dots[nextSlide].setAttribute('aria-current', true);
  });
  
  /**
    After each slide transition, hide all newly-non-visible slides and make focusable content in the new "current" slide reachable
  */
  $('.carousel .slides').on('afterChange', function(e, slick, currentSlide) {
    // Ensure newly non-visible slides are fully hidden from all users
    hideNonVisibleSlides();
    
    // Allow interactive elements on the new current slide to receive keyboard focus
    slides[currentSlide].querySelectorAll('a, button').forEach(function(element) {
      element.removeAttribute('tabindex');
    });
  });
  
  /**
    Initialize Slick Slider with recommended configuration options
  */
  $('.carousel .slides').slick({
    // The default dots markup is pretty good, though we will need to tweak them in the `init` and `afterChange` event handlers.
    dots: true,
    
    // This removes the inappropriate tabpanel and tab roles and disables arrow key navigation.
    // NOTE: if you want to use arrow key navigation, you should implement that separately without enabling this option. The usability benefits of key navigation don't outweigh the accessibility impact of the tab implementation.
    accessibility: false,
    
    // Many hero banners auto-rotate, so this demo will too.
    autoplay: true,
    autoplaySpeed: 7000,
    
    // Use highly-accessible custom elements from the DOM for prev/next buttons.
    // NOTE: You can also define the elements here as strings, if you prefer
    prevArrow: document.querySelector('.carousel .previous-button'),
    nextArrow: document.querySelector('.carousel .next-button')
  });
  
  // Disable autoplay as soon as the user activates either the Previous or Next button
  previousButton.addEventListener('click', function(e) {
    disableAutoplay();
  });
  
  nextButton.addEventListener('click', function(e) {
    TransitionRunning = true;
    disableAutoplay();
  });
  
  // Toggle autoplay when the pause/resume button is activated
  rotationButton.addEventListener('click', function(e) {
    toggleAutoplay();
  });
});


/**
  Fully hide non-visible slides for all users when they exit the view.
*/
function hideNonVisibleSlides() {
  var hiddenSlides = document.querySelectorAll('.carousel .slides .slide[aria-hidden="true"]');

  hiddenSlides.forEach(function(slide) {
    // Hide each slide using `visibility: hidden` to be extra-sure
    slide.classList.add('is-hidden');

    // Prevent any interactive element on non-visible slides from receiving keyboard focus
    slide.querySelectorAll('a, button').forEach(function(element) {
      element.setAttribute('tabindex', -1);
    });
  });
}



/**
  Disable or enable built-in Slick Slider autoplay
*/
function toggleAutoplay() {
  var autoplayEnabled = $('.carousel .slides').slick('slickGetOption', 'autoplay');

  if(autoplayEnabled) {
    disableAutoplay();
  } else {
    enableAutoplay();
  }
}

function disableAutoplay() {
  // Disable autoplay and stop Slick from rotating
  $('.carousel .slides').slick('slickSetOption', 'autoplay', false);
  $('.carousel .slides').slick('slickPause');

  // Switch the rotation button icon to "resume"
  pauseContainer.classList.remove('is-visible');
  resumeContainer.classList.add('is-visible');
}

function enableAutoplay() {
  // Enable autoplay and get rotation started again
  $('.carousel .slides').slick('slickSetOption', 'autoplay', true);
  $('.carousel .slides').slick('slickPlay');

  // Switch the rotation button icon to "pause"
  pauseContainer.classList.add('is-visible');
  resumeContainer.classList.remove('is-visible');
}
/* listing details page slider */



/* details page 4 box slide js */
$('.fourboxSlider').slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        infinite: false,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

// tour details page package slider
jQuery('.multiple-items').slick({
    infinite      : false,
    slidesToShow  : 3,
    slidesToScroll: 3,
    dot           :false,
    arrows        :true,
    responsive    : [
        {
            breakpoint: 1276,
            settings: {
                slidesToShow: 2,
                slidesToScroll:2,
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

jQuery(document).ready(function() {
    jQuery(".close").click(function() {
        jQuery(".modal.blogPage").modal('hide');
    });
});

/* Pre loader js 22-9-22 */
$(document).ready(function(){   
  window.setTimeout('fadeout();', 100);  
});
function fadeout(){
  $('#loader').delay(100).fadeOut('slow', function() {
     $('.notLoaded').removeClass('notLoaded');
  });
}
/* Pre loader js 22-9-22 */




/* header menu active class in on click event */
        $(document).ready(function(){
        $('.megamenuHeader ul li').click(function(){
            $('li').removeClass("active");
            $(this).addClass("active");
        });
        });
/* header  menu active class in on click event */


/*  cookies js home page */
       
    jQuery('.icon-close').on('click', function () {
        $('.cookies-warning').hide()
    })        

/*  cookies js home page */