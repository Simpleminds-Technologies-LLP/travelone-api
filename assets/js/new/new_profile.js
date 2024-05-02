(function($){

	'use strict';

    function reInitWishlistSlickSlider(){
        $('.imageSlider').slick('setPosition');
    }

	jQuery(document).ready(function () {

        $(document).on('shown.bs.tab', 'button[data-bs-toggle="tab"]', function (e) {
            switch (e.target.id){
                case "nav-about-tab": {
                    /* Future Travel Details Readmore click show more data js */
                    jQuery('.futureTravel_details  .read_more_fature').readmore({
                        speed: 300,
                        collapsedHeight: 250,
                        moreLink: '<p><a href="#" class="readmore_anchor_btn">Read more...</a></p>',
                        lessLink: '<p><a href="#" class="readmore_anchor_btn">Read less</a></p>',
                        heightMargin: 16
                    });

                    /* Readmore click show more data js */
                    jQuery('.protocolsRightsec  .read_more').readmore({
                        speed: 300,
                        collapsedHeight: 440,
                        moreLink: '<p><a href="#" class="readmore_anchor_btn">Read more...</a></p>',
                        lessLink: '<p><a href="#" class="readmore_anchor_btn">Read less</a></p>',
                        heightMargin: 16
                    });

                    var galleryThumbs = new Swiper(".gallery-thumbs", {
                        centeredSlides: true,
                        centeredSlidesBounds: false,
                        slideToClickedSlide: true,
                        direction: "horizontal",
                        spaceBetween: 10,
                        slidesPerView: 4,
                        freeMode: false,
                        loop: true,
                        watchSlidesVisibility: true,
                        watchSlidesProgress: true,
                        watchOverflow: true,
                        
                        breakpoints: {
                            480: {
                                direction: "vertical",
                                slidesPerView: 4
                            }
                        }
                    });
                    var galleryTop = new Swiper(".gallery-top", {
                        direction: "horizontal",
                        slidesPerView: 1,
                        centeredSlides: true,
                        spaceBetween: 10,
                        loop: true,
                        autoplay: {
                            delay: 3000,
                        },
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        },
                        a11y: {
                            prevSlideMessage: "Previous slide",
                            nextSlideMessage: "Next slide",
                        },
                        keyboard: {
                            enabled: true,
                        },
                        thumbs: {
                            swiper: galleryThumbs
                        }
                    });
                    /*galleryTop.on("slideChangeTransitionStart", function () {
                        galleryThumbs.slideTo(galleryTop.activeIndex);
                    });
                    galleryThumbs.on("transitionStart", function () {
                        galleryTop.slideTo(galleryThumbs.activeIndex);
                    });*/

                    //galleryTop.controller.control = galleryThumbs;
                    //galleryThumbs.controller.control = galleryTop;
                    
                    break;
                }

                case 'nav-wishlist-tab': {
                    reInitWishlistSlickSlider();
                }
                case "nav-tours-tab": {
                    reInitWishlistSlickSlider();
                    break;
                }
            }
        });

		

        /* Travelone after section ul li nav active class add js */
        $('.shopNavMenuUL li a').click(function () {
            $('li a').removeClass("active");
            $(this).addClass("active");
        });

    });

    

    // jQuery Plugin: http://flaviusmatis.github.io/simplePagination.js/
    var items = $(".customerReviewsShopRight .reviewsCustomerSecCard");
    var numItems = items.length;
    var perPage = 1;

    items.slice(perPage).hide();

    /*$('#pagination-container').pagination({
        items: numItems,
        itemsOnPage: perPage,
        prevText: "&laquo;",
        nextText: "&raquo;",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide().slice(showFrom, showTo).show();
        }
    });*/

    $('.nav-tabs-profile .nav-item > .nav-link').on('click', function(e){
        if($(window).width() < 768 ){
             $('html, body').animate({
                scrollTop: $('.profile-tab-content').offset().top - 90
            }, 500);
         }
    });

    $(document).on('click', '.toggleFilterSidebar', function(e){
        e.preventDefault();
        $('#collapseFilters').toggleClass('show');
    });

})(jQuery);