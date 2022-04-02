// 네비게이션
$(document).ready(function(){
	// 메뉴버튼
	$(".mbt").click(function(){
		$(".mbt").toggleClass('active');
		$("nav, section, footer").toggleClass('active');
		// 초기화
		$(".snb").hide();
		$(".gnbMenu .title").removeClass("on");
	});
	// nav여백클릭시슬라이드메뉴닫기
	// $("nav").click(function(){
	// 	$(".gnbMenu .title").removeClass("on");
	// 	$(".gnbMenu .title").next().slideUp(300);
	// });
	// 아코디언메뉴
	$(".gnbMenu .title").click(function(){
		$(this).toggleClass("on");
		$(".gnbMenu .title").not(this).removeClass("on");
		$(this).next().slideToggle(300);
		$(".gnbMenu .title").not(this).next().slideUp(300);
		return false;
	});
});


// 비쥬얼텍스트, 마우스애니메이션 show and hide
$(document).ready(function(){
    var scrolling = $(window).scrollTop();
    scroll_check();

    $(window).scroll(function(){
        scrolling = $(window).scrollTop();
        console.log(scrolling);
        scroll_check();
    });
    function scroll_check(){
        if (scrolling > 1000) {
            $(".visual .title, .visual .location, .mouse, .mouse span").hide();
        }
        else {
            $(".visual .title, .visual .location, .mouse, .mouse span").show();
        }
    };
});


// 모바일 히스토리 액티브
$(document).ready(function(){
    $(".art2 .box ul").click(function(){
        $(this).toggleClass("active");
        $(this).children().toggleClass("active");
    })
});