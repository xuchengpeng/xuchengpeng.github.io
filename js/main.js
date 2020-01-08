'use strict'

let cent = ''
let topBtn = ''

// Event bindings and Function invoking.
window.onload = () => {

    // Add animate effects.
    document.body.setAttribute('class', 'animated fadeIn slow'); 

    // Toggle color of site.
    // document.querySelector('.title').onclick = toggleColor;
    document.querySelector('.title').addEventListener('click', toggleColor);

    // Hide directory when click it of Mobile.
    if(document.getElementById('table-of-contents')) {
        document.getElementById('table-of-contents').addEventListener('click', hideDir);
    }

    // Calculate the scroll top distance.
    window.addEventListener('scroll', scrollToTop);

    
    // To top.
    topBtn = createTopButton();
    // Set home nav.
    createNav();   

    // Show nav and top button exclude index page.
    if(location.pathname == '/public/index.html' || location.pathname == '/index.html' || location.pathname == '/') {

        if(document.getElementById('table-of-contents')) {
            document.getElementById('table-of-contents').style.display = 'none';
        }
        document.getElementsByClassName('top-btn')[0].style.display = 'none';
        document.getElementsByClassName('nav-btn')[0].style.display = 'none';
    }


    // Update copyright.
    let copyright = document.getElementsByClassName('validation')[0];
    copyright.innerHTML = '<div id="license-note">&copy xuchengpeng <a href="http://www.gnu.org/software/emacs/">Emacs</a> 26.3 (<a href="https://orgmode.org">Org</a> mode 9.3.1)</div>'


    // Update timestamp style. Now in CSS, it cannont be completed.
    let todoArr = document.getElementsByClassName('timestamp-wrapper');
    Array.prototype.forEach.call(todoArr, item => {
        item.parentNode.style = 'color: #666; font-size: .14rem;'
    })


    // Listen touch event in moblie
    let touchBody = document.getElementsByTagName('body')[0];
    touchBody.addEventListener('touchstart', touchStart);
    touchBody.addEventListener('touchend', touchEnd);


    // Listen mousewheel event
    // Firefox
    if (document.addEventListener) {                             
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    // IE
    window.addEventListener('mousewheel', scrollFunc);
    document.addEventListener('mousewheel', scrollFunc);
  
}




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
function hideDir() {
    if(browserRedirect() == 'MB') {

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
    // console.log('scroll to top.......')
    // Page height.
    let totalH = document.documentElement.scrollHeight;
    // View height.
    let clientH = document.documentElement.clientHeight;
    // Scroll height.
    let scrollH = document.documentElement.scrollTop;


    // Adapt into webkit core, for Mobile browser
    if(browserRedirect() == 'MB') {

        totalH = document.body.scrollHeight;
        // View height.
        clientH = document.documentElement.clientHeight;
        // Scroll height.
        scrollH = document.body.scrollTop; 
    }

    // console.log(totalH)
    // console.log(clientH)
    // console.log(scrollH)

    let _cent = parseInt((scrollH / (totalH - clientH)) * 100);
    _cent = ('' + _cent).length < 2 ? '0' + _cent : _cent;

    cent = _cent + '% ↑';

    topBtn.innerHTML = cent;
}



/**
 * Create a element.
 */
function createTopButton() {
    let topBtn = document.createElement('div');
    
    topBtn.innerHTML = 'TOP ↑';
    topBtn.setAttribute('class', 'top-btn');
    topBtn.addEventListener('click', _toTop);
    document.body.appendChild(topBtn);
    return topBtn;   
}

function _toTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });    // instant, smooth, auto
}



/**
 * Create nav link, e.g. back Home.
 */
function createNav() {
    let _btn = document.createElement('div');

    _btn.innerHTML = 'IDX ←';
    _btn.setAttribute('class', 'nav-btn');
    _btn.addEventListener('click', _toHome);
    // document.getElementById('content').appendChild(_btn);
    document.body.appendChild(_btn);
}

function _toHome() {
    location.href = './index.html';
    // history.go(-1);
}



/**
 * Scroll listener
 */
function scrollFunc (e) {
    e = e || window.event;
    if (e.wheelDelta) {         // For IE&Chrome
        if (e.wheelDelta > 0) { // ↑ 
            _showNav();

            setTimeout(() => {
                _hideNav();
            }, 1000)
        }
        if (e.wheelDelta < 0) { // ↓

            _showNav();

            setTimeout(() => {
                _hideNav();
            }, 1000)
        }
    } else if (e.detail) {      // For Firefox
        if (e.detail > 0) {     // ↑
            _showNav();

            setTimeout(() => {
                _hideNav();
            }, 1000)

        }
        if (e.detail < 0) {     // ↓
            _showNav();

            setTimeout(() => {
                _hideNav();
            }, 1000)
        }
    }
}



/**
 * Touch listener of mobile
 */
// Init touch-point coordinates
let startX = 0,
    startY = 0;

// Touch start
function touchStart(e) {
    // console.log('touch start....')

    let touch = e.touches[0];   // get the first touch point
    let x = touch.pageX,
        y = touch.pageY;

    // Set init point
    startX = x;
    startY = y;
}

// Touch end
function touchEnd(e) {
    // console.log('touch end....')

    let touch = e.changedTouches[0];    // get the first touch point
    let x = touch.pageX,
        y = touch.pageY;

    // Judge which direction to move
    if (y - startY < 0) {               // ↑
        _showNav();
        
        setTimeout(() => {
            _hideNav()
        }, 1000)
    } else {                            // ↓
        _showNav();
        
        setTimeout(() => {
            _hideNav()
        }, 1000)
    }
}

// Plus opacity
function _showNav() {

    if (browserRedirect() == 'MB') {
        document.getElementsByClassName('top-btn')[0].style.opacity = '0.9';
        document.getElementsByClassName('nav-btn')[0].style.opacity = '0.9';
    } else {
        document.getElementsByClassName('top-btn')[0].classList.add('nav-show-hide');
        document.getElementsByClassName('nav-btn')[0].classList.add('nav-show-hide');
    }
}


// Reduce opaciry
function _hideNav() {

    if (browserRedirect() == 'MB') {
        document.getElementsByClassName('top-btn')[0].style.opacity = '0.1';
        document.getElementsByClassName('nav-btn')[0].style.opacity = '0.1';
      
    } else {
        document.getElementsByClassName('top-btn')[0].classList.remove('nav-show-hide');
        document.getElementsByClassName('nav-btn')[0].classList.remove('nav-show-hide');    
    }
}
