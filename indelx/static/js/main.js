/*--------------------------------------------------
Template Name: Aboss;
Description:   eCommerce Bootstrap 4 Template;
Version: 1.0;

NOTE: main.js, All custom script and plugin activation script in this file. 
-----------------------------------------------------

    JS INDEX
    ================================================
    1. Newsletter Popup
    2. Mobile Menu Activation
    3. Tooltip Activation
    4 Checkout Page Activation
    5. Slider Activation
    6. Featured Products Activation
    7. Featured Products Activation
    8. Hot Deal Product Activation
    9. Testmonial Activation
    10. New Products & Best Seller Activation
    11. Brand Logo  Activation
    12. Thumbnail Product activation
    13. Countdown Js Activation
    14. ScrollUp Activation
    15. Sticky-Menu Activation
    16. Nice Select Activation
    17. Price Slider Activation
    18. Home2 Categorie  Activation
    19. Home3 Single Categorie Activation
    20. Second Featured Pro Activation
    21. Blog Activation
    
    
================================================*/

(function ($) {
    "use Strict";
    /*--------------------------
    1. Newsletter Popup
    ---------------------------*/
    // setTimeout(function () {
    //     $('.popup_wrapper').css({
    //         "opacity": "1",
    //         "visibility": "visible"
    //     });
    //     $('.popup_off').on('click', function () {
    //         $(".popup_wrapper").fadeOut(500);
    //     })
    // }, 2500);

    /*----------------------------
    2. Mobile Menu Activation
    -----------------------------*/
    jQuery('.mobile-menu nav').meanmenu({
        meanScreenWidth: "991",
    });

    /*----------------------------
    3. Tooltip Activation
    ------------------------------ */
    // $('.pro-actions a').tooltip({
    //     animated: 'fade',
    //     placement: 'top',
    //     container: 'body'
    // });

    /*----------------------------
    4 Checkout Page Activation
    -----------------------------*/
    $('#showlogin').on('click', function () {
        $('#checkout-login').slideToggle();
    });
    $('#showcoupon').on('click', function () {
        $('#checkout_coupon').slideToggle();
    });
    $('#cbox').on('click', function () {
        $('#cbox_info').slideToggle();
    });
    $('#ship-box').on('click', function () {
        $('#ship-box-info').slideToggle();
    });

    /*----------------------------
    5. Slider Activation
    -----------------------------*/
    $(".slider-activation").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        autoplay: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplayTimeout: 10000,
        items: 1,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        dots: true,
        autoHeight:true,
        lazyLoad: true,
        responsive: {
            0: {
                items: 1
            },
            1920: {
                items: 1
            }
        }
    });

    /*----------------------------------------------------
    6. Featured Products Activation
    -----------------------------------------------------*/
    $('.featured-pro-active')
        .on('changed.owl.carousel initialized.owl.carousel', function (event) {
            $(event.target)
                .find('.owl-item').removeClass('last')
                .eq(event.item.index + event.page.size - 1).addClass('last');
        }).owlCarousel({
            loop: false,
            nav: false,
            dots: true,
            smartSpeed: 300,
            margin: 0,
            responsive: {
                0: {
                    items: 1,
                    autoplay: true,
                    smartSpeed: 100
                },
                500: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        })
    
    /*----------------------------------------------------
    7. Featured Products Activation
    -----------------------------------------------------*/
    $('.featured-pro-active-two')
        .on('changed.owl.carousel initialized.owl.carousel', function (event) {
            $(event.target)
                .find('.owl-item').removeClass('last')
                .eq(event.item.index + event.page.size - 1).addClass('last');
        }).owlCarousel({
            loop: false,
            nav: false,
            dots: true,
            smartSpeed: 300,
            margin: 0,
            responsive: {
                0: {
                    items: 1,
                    autoplay: true,
                    smartSpeed: 100
                },
                500: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 3
                }
            }
        })
    
    /*----------------------------------------------------
    8. Hot Deal Product Activation
    -----------------------------------------------------*/
    $('.deal-pro-active').owlCarousel({
        loop: false,
        nav: true,
        dots: true,
        smartSpeed: 500,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        margin: 0,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
                smartSpeed: 300
            },
            480: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    })
    
    /*----------------------------------------------------
    9. Testmonial Activation
    -----------------------------------------------------*/
    $('.testmonial-active').owlCarousel({
        loop: false,
        nav: false,
        dots: true,
        smartSpeed: 500,
        margin: 0,
        items: 1
    })
    /*----------------------------------------------------
    10. New Products & Best Seller Activation
    -----------------------------------------------------*/
    $('.new-pro-active').owlCarousel({
            loop: false,
            nav: false,
            dots: true,
            smartSpeed: 500,
            margin: 0,
            items: 1
        })
    
    /*----------------------------------------------------
    11. Brand Logo  Activation
    -----------------------------------------------------*/
    $('.brand-logo-active').owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        smartSpeed: 500,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        margin: 20,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
                smartSpeed: 300
            },
            340: {
                items: 2
            },
            480: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    })
    
    /*-------------------------------------
    12. Thumbnail Product activation
    --------------------------------------*/
    $('.thumb-menu').owlCarousel({
        loop: false,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        margin: 15,
        smartSpeed: 1000,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 3,
                autoplay: true,
                smartSpeed: 300
            },
            768: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    })
    $('.thumb-menu a').on('click', function () {
        $('.thumb-menu a').removeClass('active');
    })
    
    /*----------------------------
    13. Countdown Js Activation
    -----------------------------*/
    $('[data-countdown]').each(function () {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            $this.html(event.strftime('<div class="count"><p>%D</p> <span>Days</span></div><div class="count"><p>%H</p> <span>Hours</span></div><div class="count"><p>%M</p> <span>Minutes</span></div><div class="count"> <p>%S</p> <span>Seconds</span></div>'));
        });
    });

    /*----------------------------
    14. ScrollUp Activation
    -----------------------------*/
    $.scrollUp({
        scrollName: 'scrollUp', // Element ID
        topDistance: '550', // Distance from top before showing element (px)
        topSpeed: 1000, // Speed back to top (ms)
        animation: 'fade', // Fade, slide, none
        scrollSpeed: 900,
        animationInSpeed: 1000, // Animation in speed (ms)
        animationOutSpeed: 1000, // Animation out speed (ms)
        scrollText: '<i class="fa fa-angle-double-up" aria-hidden="true"></i>', // Text for element
        activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
    });

    /*----------------------------
    15. Sticky-Menu Activation
    ------------------------------ */
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.header-sticky').addClass("sticky");
        } else {
            $('.header-sticky').removeClass("sticky");
        }
    });
    
    /*----------------------------
    16. Nice Select Activation
    ------------------------------ */
    $('select').niceSelect();
    
    /*----------------------------
    17. Price Slider Activation
    -----------------------------*/
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 100,
        values: [0, 85],
        slide: function (event, ui) {
            $("#amount").val("$" + ui.values[0] + "  $" + ui.values[1]);
        }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) +
        "  $" + $("#slider-range").slider("values", 1));
    
    /*----------------------------------------------------
    18. Home2 Categorie  Activation
    -----------------------------------------------------*/
    $('.categorie-acitve').owlCarousel({
        loop: false,
        nav: false,
        dots: true,
        smartSpeed: 500,
        margin: 0,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
                smartSpeed: 100
            },
            480: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    })

    /*----------------------------------------------------
    19. Home3 Single Categorie Activation
    -----------------------------------------------------*/
    $('.single-img-categorie-active').owlCarousel({
        loop: false,
        nav: false,
        dots: true,
        smartSpeed: 500,
        margin: 0,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
                smartSpeed: 100
            },
            480: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    })
    
    /*----------------------------------------------------
    20. Second Featured Pro Activation
    -----------------------------------------------------*/
    $('.second-featured-pro-active')
        .on('changed.owl.carousel initialized.owl.carousel', function (event) {
            $(event.target)
                .find('.owl-item').removeClass('last')
                .eq(event.item.index + event.page.size - 1).addClass('last');
        }).owlCarousel({
            loop: false,
            nav: false,
            dots: true,
            smartSpeed: 500,
            margin: 0,
            responsive: {
                0: {
                    items: 1,
                    autoplay: true,
                     smartSpeed: 100
                },
                500: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                },
                1200: {
                    items: 5
                }
            }
        })
    /*-------------------------------
    21. Blog Activation
    ---------------------------------*/
    $('.blog-activation').owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        smartSpeed: 500,
        margin: 30,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
                smartSpeed: 100
            },
            576: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    })
})(jQuery);