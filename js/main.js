'use strict'

let ISHOME = false,
    ISPC = false,
    ISMB = false,
    cent = '',
    topBtn = '';


if( location.pathname == '/public/index.html' ||
    location.pathname == '/public/' ||
    location.pathname == '/index.html' ||
    location.pathname == '/') {

    ISHOME = true
}


if(browserRedirect() == 'PC') {
    ISPC = true;
} else {
    ISMB = true;
}

// console.log(ISPC)
// console.log(ISMB)
// Event bindings and Function invoking
$(document).ready(() => {
    let TOC = $('#table-of-contents');

    $('body').addClass('animated fadeIn slow');     // Add animate effects.
    $('.title').click(toggleColor);                 // Toggle color of site.

    createNavButton();                              // Create nav button.
    topBtn = createTopButton();                     // Create top button.
    $(window).scroll(scrollToTop);                  // Calculate the scroll top distance.

    // Listen touch event in moblie
    $('body').on('touchstart', touchStart);
    $('body').on('touchend', touchEnd);

    if(TOC) TOC.click(hideDir);                     // Hide directory when click it of Mobile.
    if(TOC && ISPC) {          // Auto adjust TOC width to avoid it hover the main contents.
        let t_w = '' + -parseInt(TOC.width() / $(document).width() * 100) + '%';
        TOC.css('left', t_w)
        TOC.mouseenter(() => TOC.css('left', 0) );
        TOC.mouseleave(() => TOC.css('left', t_w) );
    }

    // Customize home page style
    if(ISHOME) {                                    // Hide nav and top button in index page.

        if(TOC)   TOC.css('display', 'none');       // Hide table of contents.
        $('.top-btn').css('display', 'none');       // Hide top button.
        $('.nav-btn').css('display', 'none');       // Hide nav button.

        // Set table background
        $('table').css({
            background: 'rgba(255, 255, 255, 0.86)'
        })

        // Customize table showwing
        $('tbody').hide();
        $('thead').css({'border-bottom': '2px solid #E69'});
        $('thead').each(function() {
            if(ISPC) {
                $(this).parent().hover(function() {
                    $(this).find('tbody').fadeToggle();
                })
            } else {
                $(this).parent().click(function() {
                    $(this).find('tbody').fadeToggle();
                })
            }
        })
        $('thead th').css({ 'min-width': '1.6rem' });
    }

    $('.validation').html('<div id="license-note">&copy xuchengpeng <a href="http://www.gnu.org/software/emacs/">Emacs</a> 29.x (<a href="https://orgmode.org">Org</a> mode 9.x)</div>'); // Update copyright.
    $('.timestamp-wrapper').parent().css({ 'color': '#666', 'font-size': '.14rem' }); // Update timestamp style.

    // Listen mousewheel event
    // Firefox
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    // IE
    window.addEventListener('mousewheel', scrollFunc);
    document.addEventListener('mousewheel', scrollFunc);
})


// Resolve current theme color.
let isDark = 'false';

if (localStorage.getItem('isDark') == 'true') {
    toggleColor();
}



/**
 * Encapsulation darkreader and bind it to title.
 *
 * DarkReader - https://github.com/darkreader/darkreader
 */
function toggleColor() {

    if (isDark === 'false') {
        DarkReader.enable({
            brightness: 100,
            contrast: 90,
            sepia: 10
        });

        isDark = 'true';
        localStorage.setItem('isDark', isDark);
    } else {

        DarkReader.disable();

        isDark = 'false';
        localStorage.setItem('isDark', isDark);

        location.reload();
    }
}



/**
 * Diff device type.
 * @returns {String} Current device.
 */
function browserRedirect() {
    let sUserAgent = navigator.userAgent.toLowerCase();
    let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    let bIsMidp = sUserAgent.match(/midp/i) == "midp";
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    let bIsAndroid = sUserAgent.match(/android/i) == "android";
    let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        return 'MB';
    } else {
        return 'PC';
    }
}


/**
 * Hide directory when click it.
 */
// TODO hideDir
function hideDir() {
    if(ISMB) {

        let ele = document.getElementById('table-of-contents');
        let _opacity = getComputedStyle(ele).opacity

        if(_opacity == 1) {
            ele.style.top = '-380px'
            ele.style.opacity = 0;
        } else {
            ele.style.top = '0px'
            ele.style.opacity = 1;
        }
    }
}


/**
 * Create a button of scrolling to top.
 */
function scrollToTop() {

    let totalH = $(document).height();                      // page height
    let clientH = $(window).height();                       // view height
    let scrollH = $(document).scrollTop();                  // scroll height

    let _cent = parseInt((scrollH / (totalH - clientH)) * 100);
    _cent = ('' + _cent).length < 2 ? '0' + _cent : _cent;
    cent = _cent + '% ↑';
    topBtn.innerHTML = cent;
}



/**
 * Create a element.
 */
function createTopButton() {
    let _btn = document.createElement('div');
    _btn.innerHTML = 'TOP ↑';
    _btn.setAttribute('class', 'top-btn');
    _btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });    // instant, smooth, auto
    });
    document.body.appendChild(_btn);
    return _btn;
}


/**
 * Create nav link, e.g. back Home.
 */
function createNavButton() {

    $('<div></div>')
        .text('IDX ←')
        .addClass('nav-btn')
        .appendTo('body')
        .click(() => {
            location.href = './index.html';
            // history.go(-1);
        });
}


/**
 * Scroll listener
 */
function scrollFunc (e) {
    e = e || window.event;
    if (e.wheelDelta) {         // For IE&Chrome

        if (e.wheelDelta > 0) { // ↑
            _showNav();
            setTimeout(() => { _hideNav(); }, 1000);
        }

        if (e.wheelDelta < 0) { // ↓
            _showNav();
            setTimeout(() => { _hideNav(); }, 1000);
        }
    } else if (e.detail) {      // For Firefox

        if (e.detail > 0) {     // ↑
            _showNav();
            setTimeout(() => { _hideNav(); }, 1000);
        }

        if (e.detail < 0) {     // ↓
            _showNav();
            setTimeout(() => { _hideNav(); }, 1000);
        }
    }
}



/**
 * Touch listener of mobile
 */
let startY = 0;                         // init touch-point coordinates

function touchStart(e) {
    let touch = e.touches[0];           // get the first touch point
    let y = touch.pageY;

    startY = y;                         // set init y point
}

function touchEnd(e) {
    let touch = e.changedTouches[0];    // get the first touch point
    let y = touch.pageY;

    // Judge which direction to move
    if (y - startY < 0) {               // ↑
        _showNav();
        setTimeout(() => { _hideNav() }, 1000);
    } else {                            // ↓
        _showNav();
        setTimeout(() => { _hideNav() }, 1000);
    }
}

// Plus opacity
function _showNav() {
    if (ISMB) {
        $('.top-btn').css('opacity', '0.9');
        $('.nav-btn').css('opacity', '0.9');
    } else {
        $('.top-btn').addClass('nav-show-hide');
        $('.nav-btn').addClass('nav-show-hide');
    }
}


// Reduce opaciry
function _hideNav() {
    if (ISMB) {
        $('.top-btn').css('opacity', '0.1');
        $('.nav-btn').css('opacity', '0.1');
    } else {
        $('.top-btn').removeClass('nav-show-hide');
        $('.nav-btn').removeClass('nav-show-hide');

    }
}

/**
 * DIR -- Highlight current headline
 */

// Re-construct <a> of '#table-of-contents'
$(document).ready(function() {
    let _links = $('#text-table-of-contents a')

    _links.each(function() {
        let _class = $(this).attr('href').split('#')[1]
        $(this).addClass('links ' + _class)
    })

    $.each([2, 3, 4, 5, 6], function(index, val) {

        if($('.outline-' + val)) {
            let _outlines = $('.outline-' + val)

            _outlines.each(function() {
                $(this).addClass('outline')
            })
        }
    })
})

// Scroll
$(window).scroll(function () {
    var $sections = $('.outline');              // get all content blocks
    var currentScroll = $(this).scrollTop();    // height of window scroll
    var $currentSection;                        // current content block

    var _arrTop = [];                           // just for getting the distance from the first headline to top

    $sections.each(function () {
        var divPosition = $(this).offset().top;

        _arrTop.push(divPosition)

        if (divPosition - 1 < currentScroll) {
            $currentSection = $(this);
        }


        // Avoid there no block at current height
        if(currentScroll >= _arrTop[0]) {

            let _id = $currentSection.attr('id')

            let _idArr = _id.split('-');
            _id = _idArr[_idArr.length - 1]

            $('.links').removeClass('link-active')
            $('.' + _id).addClass('link-active')
        }
    })

});
