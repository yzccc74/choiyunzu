// Header size, scroll and top fade in-out
$(document).ready(function(){
    var scrolling = $(window).scrollTop();
    scroll_check();

    $(window).scroll(function(){
        scrolling = $(window).scrollTop();
        console.log(scrolling);
        scroll_check();
    });
    function scroll_check(){
        if(scrolling > 10){
            $("header").addClass("resize");
            $(".scroll, .top").addClass("on");
        }
        if(scrolling < 10){
            $("header").removeClass("resize");
            $(".scroll, .top").removeClass("on");
        }
        if(scrolling > 800){
            $(".box").addClass("line");
        }
        if(scrolling < 800){
            $(".box").removeClass("line");
        }
    };
});

// go top
$(document).ready(function(){
    $(".top").click(function(){
        $("html, body").animate({
            scrollTop : 0
        }, 500);
    });
});