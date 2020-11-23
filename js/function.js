/*!
 *
 * Evgeniy Ivanov - 2018
 * busforward@gmail.com
 * Skype: ivanov_ea
 *
 */

import LocomotiveScroll from 'locomotive-scroll';


// scroll.destroy();

var app = {
    pageScroll: '',
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= app.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= app.mdWidth && $(window).width() < app.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= app.smWidth && $(window).width() < app.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < app.smWidth; } // < 768
function isIOS() { return app.iOS(); } // for iPhone iPad iPod
function isTouch() { return app.touchDevice(); } // for touch device

if (!isXsWidth()) {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        // repeat: true
    });

}

$(document).ready(function() {
    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	// Запрет "отскока" страницы при клике по пустой ссылке с href="#"
	$('[href="#"]').click(function(event) {
		event.preventDefault();
	});

    // Inputmask.js
    // $('[name=tel]').inputmask("+9(999)999 99 99",{ showMaskOnHover: false });
    // formSubmit();

    // checkOnResize();

    mouseMoveParallax();

    // let wowOffset = $(window).height() / 4;
    //
    // let wow = new WOW({
    //     boxClass:     'wow',
    //     animateClass: 'slideUp', // animation css class (default is animated)
    //     offset:       wowOffset,          // distance to the element when triggering the animation (default is 0)
    // });
    // wow.init();
    //
    //
    // let wow2 = new WOW({
    //     boxClass:     'wow2',      // animated element css class (default is wow)
    //     animateClass: 'bounceUp', // animation css class (default is animated)
    //     offset:       wowOffset,          // distance to the element when triggering the animation (default is 0)
    // });
    // wow2.init();

    scroll.init();
    setTimeout(function () {
        scroll.update();
    }, 100);

    // name - call name (data-scroll-call)
    // state - enter or exit
    // el - object
    //
    scroll.on('call', (name, state, el) => {
        // Using modularJS
        // this.call(...func);
        // Using jQuery events
        // 'title' === console.log(name, state, el);
        switch (name) {
            case 'title':
                // state = "enter" ? $(el.target).addClass('show') : $(el.target).removeClass('show');
                if (state == "enter") {
                    $(el.target).addClass('show')
                    console.log(state);
                } else {
                    $(el.target).removeClass('show')
                    console.log(state);
                }
                break;
            default:

        }
        // 'title' === if (state == 'enter') : $(el).addClass('activ') ? $(el).removeClass('activ');
        // 'title' === scroll.update();

        // $(el).trigger('title');
        // Or do it your own way 😎
    });

    scroll.on('scroll', obj => {
        // Using modularJS
        // this.call(...func);
        // Using jQuery events
        // console.log(obj);
        // $(document).trigger(func);
        // Or do it your own way 😎
    });


});


function parallax() {
    if (isXsWidth()) return false;
    let item = $('.parallaxItem');
    var el = document.querySelector('body');
    app.pageFs = window.getComputedStyle(el, null).getPropertyValue('font-size').replace('px', '')*1;
    let top = $(window).scrollTop()/app.pageFs;
    let speed;

    // console.log(app.pageFs);
    item.each(function(index, el) {
        top = $(window).scrollTop()/app.pageFs;
        speed = $(this).data('speed');
        $(el).attr('style', 'transform: translateY(-'+(top*speed/10)+'em)');
    });
}

function mouseMoveParallax() {
    let wrapper = $('.parallaxBox');
    let item = wrapper.find('.parallaxMouse');
    let speed = 0;
    let offsetX;
    let offsetY;

    if (isXsWidth()) return false;

    wrapper.on('mousemove', function(even) {
        // console.log(even.screenX);
        // console.log(even.clientX - $(window).width() / 2);
        offsetX = -(even.clientX - $(window).width() / 2);
        offsetY = -(even.clientY - $(window).width() / 2);

        if (isXsWidth()) {
            item.removeAttr('style');
        } else {
            item.each(function(index, el) {
                speed = $(el).data('speed');
                $(el).attr('style', 'transform: translate3d('+(offsetX*speed/1000)+'em, '+(offsetY*speed/1000)+'em , 0)');
            });
        }

    });

    wrapper.on('mouseleave', function(even) {
        item.each(function(index, el) {
            speed = $(el).data('speed');
            $(el).attr('style', 'transform: translate3d(0, 0 , 0)');
        });
    });
}


$(window).resize(function(event) {
    let windowWidth = $(window).width();
    // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    if (app.resized == windowWidth) { return; }
    app.resized = windowWidth;

	// checkOnResize();
});

function checkOnResize() {
    // fontResize();
}


// Проверка направления прокрутки вверх/вниз
function checkDirectionScroll() {
    var tempScrollTop, currentScrollTop = 0;

    $(window).scroll(function(){
        currentScrollTop = $(window).scrollTop();

        if (tempScrollTop < currentScrollTop ) {
            app.pageScroll = "down";
        } else if (tempScrollTop > currentScrollTop ) {
            app.pageScroll = "up";
        }
        tempScrollTop = currentScrollTop;

    });
}
checkDirectionScroll();

var preview = {
    id: 453297786,
    title: false,
};

var player1 = new Vimeo.Player('short-video', preview);

$('#previwe').on('show.bs.modal', function() {
    player1.play();
});

$('#previwe').on('hide.bs.modal', function() {
    player1.pause();
});


function playVideo(box) {
    let section = $(box),
        fullscr = $('.video__play'),
        preview = {
            id: 453260382,
            title: false,
        },
        player;




    // $(window).scroll(function(){
    //     top = $(window).scrollTop();
    //     start = section.offset().top - 100;
    //
    //     if (top > start && top < (start + section.height())) {
    //         if (played === false) {
    //             player.play();
    //             played = true;
    //             player.setVolume(0);
    //             console.log('play');
    //         }
    //     } else {
    //         played = false;
    //         player.pause();
    //         console.log('pause');
    //     }
    // });


    fullscr.on('click', function(e) {
        player = new Vimeo.Player('video', preview);
        player.play();
        fullscr.hide();
    });


    // player.on('fullscreenchange', function(e) {
    //     console.log(e.fullscreen);
    //     if (e.fullscreen) {
    //         player.setVolume(1);
    //     } else {
    //         player.setVolume(0);
    //     }
    // });

}

playVideo('#final');
