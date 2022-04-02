$(document).ready(function(){
	var page_wrap = $(".scrollLayout"); // 홈페이지 전체를 감싸는 영역의 이름
	var page_name = $(".fullpage");
	var page_inner_name = $(".cts_wrapper"); // 위아래 가운데 배치될 영역의 이름
	var page_css = "on"; // 각 섹션이 보일때 추가될 class명
	var window_h = $(window).height();
	var window_w = $(window).width();
	var index_wrap_name = $("aside"); // 퀵메뉴의 이름
	var index_name = $("aside ul li"); // 퀵메뉴 하나의 이름
	//var index_length = index_name.length;
	var index_css = "on"; // 퀵메뉴에 현재 메뉴에 추가되는 클래스명 
	var mobile_size = 640; //모바일에서도 패럴랙스가 적용되므로 의미없는 값
	var footer_use = true;//footer의 존재여부 (true - 존재함, false - 존재하지 않음)
	var footer_name = $("footer");//footer이름
	var footer_use_h;//footer의 높이값
	var header_name = $("header"); //header의 이름
	var header_fix_use = false;//header에 fixed를 준 경우 (만약 absolute나 주지 않은 경우는 false을 줘야 한다.)
	var header_fix_h;//header의 높이값 
	var page_index = 1;//현재 페이지번호
	var prev_index;
	var page_total;

	page_h();
	page_total = page_name.length;
	prev_index = page_total;
	index_labeling();
	index_reset();

	if(footer_use == true){
		footer_name.css("z-index",1);
	}
	
	function index_reset(){
		if(page_index<page_total){
			for(i=0;i<page_total;i++){
				page_name.eq(i).css("z-index",page_total-i+1);
			}
			page_name.eq(page_index-1).css("z-index",page_total+2);
		}
	}

	function index_labeling(){
		page_name.removeClass("on");
		page_name.eq(page_index-1).addClass("on pointer");
		setTimeout(function(){(page_name).removeClass("pointer");}, 1500);
		index_name.removeClass(index_css);
		index_name.eq(page_index-1).addClass(index_css);
		
		index_wrap_name.removeClass();
		index_wrap_name.addClass("sec"+page_index);
		header_name.removeClass();
		header_name.addClass("sec"+page_index);
	}

	function page_h(){
		page_name.height(window_h);
		page_wrap.height(window_h);
	}

	function inner_padding(){
		for(var i=0;i<page_total;i++){
			if(header_fix_use == true){
				page_name.eq(i).find(page_inner_name).css("padding-top", ((window_h  - page_name.eq(i).find(page_inner_name).height() - header_fix_h)/2)+header_fix_h);
			}else{
				page_name.eq(i).find(page_inner_name).css("padding-top", (window_h  - page_name.eq(i).find(page_inner_name).height())/2);
			}
		}
	}

	$(window).resize(function(){
		window_w = $(window).width();
		window_h = $(window).height();
		header_fix_h = header_name.height();
		footer_use_h = footer_name.height();
		page_h();
		index_labeling();
		inner_padding();
	})

	$(window).load(function(){
		header_fix_h = header_name.height();
		footer_use_h = footer_name.height();
		index_labeling();
		inner_padding();
	});

	$(index_name).on("click", function(){
		if($(this).index()+1 != page_index){
			prev_index = page_index;
			page_index = $(this).index()+1;
			if(Math.abs(page_index-prev_index) > 1){
				page_name.eq(page_index-1).css("z-index",page_total+2);
				page_name.eq(prev_index-1).css("z-index",page_total+2);
			}
			if(prev_index>page_total){
				if(page_index == page_total){
					page_name.eq(page_index-1).css("top",-footer_use_h+"px");
					footer_name.animate({
						top : window_h+"px"
					},1000,"easeOutQuint", index_reset);
					page_name.eq(page_index-1).animate({
						top : 0
					},1000,"easeOutQuint");
				}else{
					page_name.eq(page_index-1).css("z-index",page_total+3);
					page_name.eq(page_index-1).css("top",-window_h+"px");
					page_name.eq(page_total-1).css("top",-footer_use_h+"px");
					footer_name.animate({
						top : window_h+"px"
					},800,"easeOutQuint");
					page_name.eq(page_total-1).animate({
						top : 0
					},800,"easeOutQuint");
					page_name.eq(page_index-1).delay(300).animate({
						top : 0
					},800,"easeOutQuint", index_reset);
				}
			}else{
				if(page_index>prev_index){//아래로 스크롤
					page_name.eq(page_index-1).css("top",window_h+"px");
					page_name.eq(prev_index-1).animate({
						top : - window_h+"px"
					},1000,"easeOutQuint", index_reset);
					page_name.eq(page_index-1).animate({
						top : 0
                    },1000,"easeOutQuint");
				}else{//위로 스크롤
					page_name.eq(page_index-1).css("top",-window_h+"px");
					page_name.eq(prev_index-1).animate({
						top : window_h+"px"
					},1000,"easeOutQuint", index_reset);
					page_name.eq(page_index-1).animate({
						top : 0
                    },1000,"easeOutQuint");
				}
			}
			index_labeling();
		}
	});

	//마우스 스크롤을 감지해서 한페이지씩 이동
	$("html, body").on("mousewheel DOMMouseScroll", function scroll_check(e){
		if(window_w > mobile_size){
			var E = e.originalEvent;
			var delta = 0;
			if (E.detail) {
				delta = E.detail * -40;
			}else{
				delta = E.wheelDelta;
            };
			$("html, body").off("mousewheel DOMMouseScroll");
			$("html, body").on("mousewheel DOMMouseScroll", function(e){
				e.preventDefault();
				e.stopPropagation();
				return false;
			},function(){passive: false});


			if(delta > 0){//위로 스크롤
				if((page_index > page_total)&&(footer_use == true)){//footer에 간경우
					prev_index = page_index;
					page_index = page_total;
				}else if(page_index > 1){
					prev_index = page_index;
                    page_index--;
				}else{
					prev_index = page_index;
					page_index = 1;
				}
            }else{//아래로 스크롤
				if(page_index<page_total){
					prev_index = page_index;
					page_index++;
				}else if((page_index<page_total+1)&&(page_index!=prev_index)&&(footer_use == true)){
					prev_index = page_index;
					page_index++;
				}else{
                    prev_index = page_index;
				}
			}
			if((page_index != prev_index)&&(page_index <= page_total)&&(prev_index <= page_total)){//일반 움직임.
				if(page_index>prev_index){//아래로 내려갈때
					page_name.eq(page_index-1).css("top",window_h+"px");
					page_name.eq(prev_index-1).animate({
						top : - window_h+"px"
					},1000,"easeOutQuint");
					page_name.eq(page_index-1).animate({
						top : 0
					},1000,"easeOutQuint", function(){$("html, body").off();$("html, body").on("mousewheel DOMMouseScroll", scroll_check); $("html, body").stop();index_reset();});
				}else{//위로 올라갈때
					page_name.eq(page_index-1).css("top",-window_h+"px");
					page_name.eq(prev_index-1).animate({
						top : window_h+"px"
					},1000,"easeOutQuint");
					page_name.eq(page_index-1).animate({
						top : 0
					},1000,"easeOutQuint", function(){$("html, body").off();$("html, body").on("mousewheel DOMMouseScroll", scroll_check); $("html, body").stop();index_reset();});
				}
				index_labeling();
			}else if((page_index > page_total)||(prev_index > page_total)){//footer가 올라오는 animation
				footer_name.css("z-index",page_total+2);
				if(page_index > prev_index){//footer가 나타나는 효과
					footer_name.css("top",window_h+"px");
					page_name.eq(prev_index-1).animate({
						top : - footer_use_h+"px"
					},1000,"easeOutQuint");
					footer_name.animate({
						top : window_h - footer_use_h+"px"
					},1000,"easeOutQuint", function(){$("html, body").off();$("html, body").on("mousewheel DOMMouseScroll", scroll_check); $("html, body").stop();index_reset();});
				}else if(page_index < prev_index){//footer가 사라지는 효과
					page_name.eq(page_index-1).css("top",-footer_use_h+"px");
					footer_name.animate({
						top : window_h+"px"
					},1000,"easeOutQuint");
					page_name.eq(page_index-1).animate({
						top : 0
					},1000,"easeOutQuint", function(){$("html, body").off();$("html, body").on("mousewheel DOMMouseScroll", scroll_check); $("html, body").stop();index_reset();footer_name.css("z-index",1);});
				}else{
					$("html, body").off();$("html, body").on("mousewheel DOMMouseScroll", scroll_check); $("html, body").stop();
				}
				index_labeling();
			}else{
				$("html, body").off();$("html, body").on("mousewheel DOMMouseScroll", scroll_check); $("html, body").stop();
			}
		}
	});


	var obj_drag = false;
	var startY = null;
	var prevY = null;
	var currY = null;
	//var moveY = null;
	//var afterY = null;
	var evt = null;
	//터치를 인색해서 한페이지씩 이동 
	$("html, body").on("touchstart", function(a){
		obj_drag = true;
		evt = a.originalEvent;
		currY = evt.touches[0].pageY
		startY = evt.touches[0].pageY;
		$("html, body").on("touchmove", function(b){
			if(obj_drag ==  true){
				evt = b.originalEvent;
				prevY = currY;
				currY = evt.touches[0].pageY;
				moveY = prevY - currY;
			}
		});
	});
	$(document).on("touchend", function(){
		if((obj_drag == true) && (Math.abs(startY) != (Math.abs(currY)))){
			//console.log(currY-startY);
			page_count(currY-startY);
			
		}
	});

	var direct;
	function page_count(direct){
		//console.log(direct);
		if(direct > 0){//위로 스크롤
			if((footer_use == true)&&(page_index>page_total)){
				prev_index = page_index;
				page_index--;
				//console.log("footer빠이빠이"+page_index);
				page_name.eq(page_index-1).css("top",-footer_use_h+"px");
				footer_name.animate({
					top : window_h+"px"
				},1000,"easeOutQuint");
				page_name.eq(page_index-1).animate({
					top : 0
				},1000,"easeOutQuint", function(){index_reset();footer_name.css("z-index",1);});
			}else if(page_index>1){
				prev_index = page_index;
				page_index--;
				//console.log(page_index);
				page_name.eq(page_index-1).css("top",-window_h+"px");
				page_name.eq(prev_index-1).animate({
					top : window_h+"px"
				},1000,"easeOutQuint");
				page_name.eq(page_index-1).animate({
					top : 0
				},1000,"easeOutQuint", index_reset);
			}
		}else{//아래로 스크롤
			if(page_index<page_total){
				prev_index = page_index;
				page_index++;
				//console.log(page_index);
				page_name.eq(page_index-1).css("top",window_h+"px");
				page_name.eq(prev_index-1).animate({
					top : - window_h+"px"
				},1000,"easeOutQuint");
				page_name.eq(page_index-1).animate({
					top : 0
                },1000,"easeOutQuint", index_reset);
			}else if((footer_use == true)&&(page_index==page_total)){
				footer_name.css("z-index",page_total+2);
				prev_index = page_index;
				page_index++;
				//console.log("footer다"+page_index);
				footer_name.css("top",window_h+"px");
				page_name.eq(prev_index-1).animate({
					top : - footer_use_h+"px"
				},1000,"easeOutQuint");
				footer_name.animate({
					top : window_h - footer_use_h+"px"
				},1000,"easeOutQuint", function(){index_reset});
            }
		}
		index_labeling();
	}
});


// 텍스트타이핑
function autoType(elementClass, typingSpeed){
	var thhis = $(elementClass);
	thhis.css({
	  "position": "relative",
	  "display": "inline-block"
	});
	thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
	thhis = thhis.find(".text-js");
	var text = thhis.text().trim().split('');
	var amntOfChars = text.length;
	var newString = "";
	thhis.text("|");
	setTimeout(function(){
	  thhis.css("opacity",1);
	  thhis.prev().removeAttr("style");
	  thhis.text("");
	  for(var i = 0; i < amntOfChars; i++){
		(function(i,char){
		  setTimeout(function() {        
			newString += char;
			thhis.text(newString);
		  },i*typingSpeed);
		})(i+1,text[i]);
	  	}
	}, 0);
}
$(document).ready(function(){
	// Now to start autoTyping just call the autoType function with the 
	// class of outer div
	// The second paramter is the speed between each letter is typed.   
	autoType(".type-js",90);
});
$(document).ready(function() {
	$('.has-animation').each(function(index) {
	//   $(this).delay($(this).data('delay')).queue(function(){
		$(this).addClass('animate-in');
	//   });
	});
});


// 메인텍스트타이핑 구동시 스크롤이벤트고정
// $(document).ready(function(){
// 	$('section').on('scroll touchmove mousewheel', function(e) {
// 		e.preventDefault();
// 		e.stopPropagation();
// 		return false;
// 	});
// 	setTimeout(function(){
// 		$('section').off('scroll touchmove mousewheel');
// 	}, 2500);
// });


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


// 버튼클릭이벤트
$(document).ready(function(){
	$("section .bt, .sec02 .bt").click(function(){
		$(this).addClass("on");
	})
});