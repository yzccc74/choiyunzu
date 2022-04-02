// BG moving (only PC)
$(document).ready(function(){
    var lFollowX = 0,
        lFollowY = 0,
        x = 0,
        y = 0,
        friction = 1 / 30;
        
    function moveBackground() {
        x += (lFollowX - x) * friction;
        y += (lFollowY - y) * friction;
    
        translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';
    
        $('.bg').css({
            '-webit-transform': translate,
            '-moz-transform': translate,
            'transform': translate });
    
        window.requestAnimationFrame(moveBackground);
    }
    
    if ($(window).width() > 1024){
        $(window).on('mousemove click', function (e) {
        
        var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
        var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
        lFollowX = 20 * lMouseX / 50; // 100 : 12 = lMouxeX : lFollow
        lFollowY = 10 * lMouseY / 50;
        
        });
    }
    
    moveBackground();
});


// Enter (only PC)
$(document).ready(function(){
    var scrollPosition = $(".sec01").offset().top;
    $(".visual .bt").click(function(){
        $("html, body").animate({
            scrollTop : scrollPosition
        }, 500);
    });
});


// Menu click scroll
$(document).ready(function () {
    $(document).on("scroll", onScroll);
    //smoothscroll
    $('.scroll-nav').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        console.log('click');
    
        $('.scroll-nav').each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
    
        var target = this.hash,
        menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2 },
        500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});


// Menu bar (scroll시)
function onScroll(){
    var scrollPos = $(document).scrollTop();
    $('.scroll-nav').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top -630 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.scroll-nav').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}


// About : scroll or click typo event (only 1 time)
$(document).ready(function(){
    var scrolling = $(window).scrollTop();
    scroll_check();

    $(window).scroll(function(){
        scrolling = $(window).scrollTop();
        console.log(scrolling);
        scroll_check();
    });
    function scroll_check(){
        var scrollabout = $(".sec01").scrollTop();
        if(scrolling > scrollabout){
            $(".sec01").addClass("on");
        }
    };
});


// Mobile header
$(document).ready(function(){
    if ($(window).width() < 1025) {
        // var scrolling = $(window).scrollTop();
        // scroll_check();

        $(window).scroll(function(){
            scrolling = $(window).scrollTop();
            console.log(scrolling);
            scroll_check();
        });
        function scroll_check(){
            // var scrollabout = $(".sec01").scrollTop();
            if(scrolling > 500){
                $("header").css("background", "rgba(255,255,255,0.98)");
            }
            else {
                $("header").css("background", "none");
            }
        };
    }
});


// Mobile menu
$(document).ready(function() {
    $(".mbt").click(function() {
      $(".mbt").toggleClass("open");
      $(".menu").toggleClass("open");
    });
});


// Swiper
$(document).ready(function(){
    if ($(window).width() < 768) {
        var swiper = new Swiper('.swiper-container.s01', {
            loop: true,
            autoplay: {
                delay: 2800,
                disableOnInteraction: false,
            },
        });
    }
    var swiper = new Swiper('.swiper-container.s02', {
        loop: true,
        autoplay: {
            delay: 2800,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true,
        },
    });
});


// Project hover
$('.sec03 ul > li').hover(function () {
    $(this).children('.hide_card').addClass("on");
}, function() {
    $('.sec03 ul > li').children('.hide_card').removeClass("on");
});

// Contact input
$('.js-input').keyup(function () {
    if ($(this).val()) {
      $(this).addClass('not-empty');
    } else {
      $(this).removeClass('not-empty');
    }
});