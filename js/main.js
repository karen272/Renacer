/* ===================================================================
 * Hesed 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    const cfg = {
                scrollDuration : 800, // smoothscroll duration
                mailChimpURL   : ''   // mailchimp url
                };
    const $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    const doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            // force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');

        });
    };


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = $('.header-menu-toggle');
        const nav = $('.header-nav-wrap');

        toggleButton.on('click', function(event){
            event.preventDefault();

            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $WIN.on('resize', function() {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        nav.find('a').on("click", function() {

            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.slideToggle(); 
            }
        });

    };


   /* Alert Boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };

    
   /* Smooth Scrolling
    * ------------------------------------------------------ */
    const ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            const target = this.hash;
            const $target = $(target);
            
            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


   /* Back to Top
    * ------------------------------------------------------ */
    const ssBackToTop = function() {
        
        const pxShow      = 500;
        const $goTopButton = $(".ss-go-top")

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) $goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                if(!$goTopButton.hasClass('link-is-visible')) $goTopButton.addClass('link-is-visible')
            } else {
                $goTopButton.removeClass('link-is-visible')
            }
        });
    };


   /* History Carousel
    * ------------------------------------------------------ */
    const ssHistoryCarousel = function() {
        
        const $carousel = $('.history-carousel');
        if ($carousel.length === 0) return;

        const $slides = $carousel.find('.carousel-slide');
        const $dots = $carousel.find('.carousel-dots .dot');
        const $prevBtn = $carousel.find('.carousel-btn.prev');
        const $nextBtn = $carousel.find('.carousel-btn.next');
        
        let currentSlide = 0;
        const totalSlides = $slides.length;

        // Función para mostrar un slide específico
        function showSlide(index) {
            // Asegurar que el índice esté dentro del rango
            if (index >= totalSlides) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = totalSlides - 1;
            } else {
                currentSlide = index;
            }

            // Ocultar todos los slides
            $slides.removeClass('active');
            $dots.removeClass('active');

            // Mostrar el slide actual
            $slides.eq(currentSlide).addClass('active');
            $dots.eq(currentSlide).addClass('active');
        }

        // Botón siguiente
        $nextBtn.on('click', function(e) {
            e.preventDefault();
            showSlide(currentSlide + 1);
        });

        // Botón anterior
        $prevBtn.on('click', function(e) {
            e.preventDefault();
            showSlide(currentSlide - 1);
        });

        // Dots navigation
        $dots.on('click', function() {
            const slideIndex = $(this).data('slide');
            showSlide(slideIndex);
        });

        // Auto-play
        let autoPlayInterval = setInterval(function() {
            showSlide(currentSlide + 1);
        }, 5000);

        // Pausar auto-play al hacer hover
        $carousel.on('mouseenter', function() {
            clearInterval(autoPlayInterval);
        });

        // Reanudar auto-play al salir del hover
        $carousel.on('mouseleave', function() {
            autoPlayInterval = setInterval(function() {
                showSlide(currentSlide + 1);
            }, 5000);
        });

        // Pausar auto-play al hacer clic en controles
        $prevBtn.add($nextBtn).add($dots).on('click', function() {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(function() {
                showSlide(currentSlide + 1);
            }, 5000);
        });
    };


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssAlertBoxes();
        ssSmoothScroll();
        ssBackToTop();
        ssHistoryCarousel();

    })();

})(jQuery);