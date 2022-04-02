// Navigation
$(document).ready(function(){
    if($(window).width() > 1280) {
        /* 서브메뉴 open & close */
        $(".gnb > a").mouseover(function(){
            var idmenu = $(this).data("id");
            $(".sub_gnb").removeClass("on");
            $(".sub_gnb[id=" +idmenu+ "]").addClass("on");
        });
        $(".gnball").mouseleave(function(){
            $(".sub_gnb").removeClass("on");
        });
        // 서브메뉴 호버시 GNB 메뉴 보더유지
        $(".sub_gnb").hover(function(){
            var menu = $(this).attr("id");
            $(".gnb > a[data-id=" +menu+ "]").toggleClass("on");
        });
        // 서브하위메뉴 on
        $(".sub_sub_gnb > ul").hover(function(){
            $(this).children("li").toggleClass("on");
        });
    }
    // Mobile Navigation
    $(".m_sub").hide();
    if($(window).width() < 1281) {
        // 네비게이션 open & close
        $(".mbt").click(function(){
            $(".topmenu, nav, section").addClass("on");
        });
        $(".close").click(function(){
            $(".topmenu, nav, section, .gnb > a").removeClass("on");
            $(".m_sub").hide();
        });
        /* 서브메뉴 slide down */
        var gnbmenu = $(".gnb > a");
        gnbmenu.click(function(){
            $(this).toggleClass("on");
            gnbmenu.not(this).removeClass("on");
            $(this).siblings().slideToggle(300);
            gnbmenu.not(this).siblings().slideUp(300);
            $(".m_sub, .m_sub > li, .m_sub_sub").removeClass("on");
            return false;
        });
        // 서브하위메뉴 open
        var submenu = $(".m_sub > li");
        submenu.click(function(){
            $(this).toggleClass("on");
            submenu.not(this).removeClass("on");
            $(this).siblings().toggleClass("on");
            submenu.not(this).siblings().removeClass("on");
            $(this).parent().toggleClass("on");
            submenu.not(this).parent().removeClass("on");
        });
    }
});


// 서브페이지 LNB
$(document).ready(function(){
    // LNB open
    $(".lnb_sub > li").click(function(){
        $(this).toggleClass("on");
        $(".lnb_sub > li").not(this).removeClass("on");
        $(this).siblings().toggleClass("on");
        $(".lnb_sub > li").not(this).siblings().removeClass("on");
    });
    // LNB하위메뉴 open
    $(".lnb_sub_sub > li").click(function(){
        $(this).toggleClass("on");
        $(".lnb_sub_sub > li").not(this).removeClass("on");
        $(this).next("ul").toggleClass("on");
        $(".lnb_sub_sub > li").not(this).next("ul").removeClass("on");
    });
});


// Quick menu
$(document).ready(function(){
    $("aside .quick").click(function(){
        $("aside ul").toggleClass("on");
    })
});


// Tab menu
$(document).ready(function(){
    $(".tab > ul > li").click(function(){
        $(".tab > ul > li").removeClass('on');
        $(".tab .conBox").removeClass('on');
        $(this).addClass('on');
        $("#"+$(this).data('id')).addClass('on');
    });
    if($(window).width() < 1281) {
        $(".m_tabmenu").click(function(){
            $(".tab > ul").toggleClass("on");
            $(".tab > ul > li").click(function(){
                $(".tab > ul").removeClass("on");
            });
        });
    }
});


// Swipers
$(document).ready(function(){
    var swiper = new Swiper('.swiper-container.swiper1', {
        slidesPerView: 1,
        loop: true,
        speed: 800,
        effect: 'fade',
        autoplay: {
            delay: 2600,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    var swiper = new Swiper('.swiper-container.swiper2', {
        scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
        },
    });
    var swiper = new Swiper('.swiper-container.swiper3', {
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
    });
    if($(window).width() < 1281) {
        var swiper = new Swiper('.swiper-container.swiper4_m', {
            autoplay: {
                delay: 1600,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    slidesPerGroup: 2,
                    loop: true,
                    loopFillGroupWithBlank: true,
                    autoplay: {
                        delay: 1600,
                        disableOnInteraction: false,
                    },
                },
            }
        });
    };
});

// Swipers in tabs
$('.nav-tabs').click(function(){
    if($('.swiper5').parent().parent().hasClass("on")) {
        var swiper = new Swiper('.swiper-container.swiper5', {
            slidesPerView: 1,
            breakpoints: {
                641: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    centeredSlides: true,
                    grabCursor: true,
                }
            }
        });
    }
    if($('.swiper6').parent().parent().hasClass("on")) {
        var swiper = new Swiper('.swiper-container.swiper6', {
            slidesPerView: 1,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 1900,
                disableOnInteraction: false,
            },
            breakpoints: {
                641: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    grabCursor: true,
                }   
            }
        });
    }
});

// Map in tabs
$('.nav-tabs').click(function(){
    if($('#daumRoughmapContainer1590540760905').parents('.conBox').hasClass("on")) {
        var mapContainer = document.getElementById('daumRoughmapContainer1590540760905'), // 지도를 표시할 div 
            mapOption = { 
                center: new kakao.maps.LatLng(37.574253, 126.976826), // 지도의 중심좌표
                level: 4 // 지도의 확대 레벨
        };
        
        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        $('.wrap_btn_zoom').hide();

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        var mapTypeControl = new kakao.maps.MapTypeControl();
        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        var markerPosition  = new kakao.maps.LatLng(37.576130, 126.976865);          
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        function relayout() {
            // 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있습니다
            // 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출해야 합니다 
            // window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됩니다
            map.relayout();
        }
    }
});