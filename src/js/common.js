$(document).ready(function () {
  slider();
  lazy();
  nav();
  timerMain();
  mask();
  popup();
  modalMagnificBasket();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});

//global variables
var innerWidth = $('body').innerWidth();


//lazy
function lazy() {
  $(".lazy").Lazy({
    visibleOnly: true,
    threshold: '',
    effect: 'fadeIn',
    effectTime: '300'
  });
}

//mobile nav
function nav() {
  var navButton = $('.mobile-button, .mobile-nav__close'),
      nav = $('.mobile-nav'),
      overlay = $('.header__overlay');

  navButton.click(function(event) {
    event.preventDefault();
    nav.toggleClass('mobile-nav_active');
    stateCheck();
  })

  function stateCheck() {
    if(nav.hasClass('mobile-nav_active')) {
      navButton.addClass('mobile-button_active');
      overlay.fadeIn(300);
      scrollLock.hide($("body"));
      $('body').css('overflow', 'hidden')
    } else {
      navButton.removeClass('mobile-button_active');
      overlay.fadeOut(300);
      scrollLock.show($("body"));
      $('body').css('overflow', 'visible')
    }
  }
  $(window).resize(function () {
    if(innerWidth>768) {
      nav.removeClass('mobile-nav_active');
      stateCheck();
    }
  });
}
//timer
function timerMain() {
  $('[data-countdown]').each(function() {
    var $this = $(this), finalDate = $(this).data('countdown');
    $this.countdown(finalDate, function(event) {
      $this.html(event.strftime(''
      + '<div><span>%d</span> Дней</div>'
      + '<div><span>%H</span> Часов</div>'
      + '<div><span>%M</span> Минут</div>'
      + '<div><span>%S</span> Секунд</div>'));
    });
  });
}
//gallery-slider
function slider() {
  var sliderNum = 0,
      navsliderNum = 0;
  $('.catalogue-block__slider').each( function() {
    sliderNum++;
    $(this).addClass( 'slider-' + sliderNum ).slick({
      arrows: true,
      asNavFor: '.nav-slider-' + sliderNum,
      slidesToScroll: 1,
      slidesToShow: 1,
    });
  });
  $('.catalogue-block__nav-slider').each( function() {
    navsliderNum++;
    $(this).addClass( 'nav-slider-' + navsliderNum ).slick({
      arrows: false,
      asNavFor: '.slider-' + navsliderNum,
      slidesToScroll: 1,
      infinite: true,
      slidesToShow: 4,
      focusOnSelect: true
    });
  });
}
//mask
function mask() {
  jQuery(function($){
    $(".phone").mask("9 (999) 99-9999");
 });
}
//popup
function popup() {
  $('.popup').magnificPopup(
  );
}
function modalMagnificBasket() {
	$('.popup_link').magnificPopup({
		closeBtnInside: false,
		midClick: true,
    fixedContentPos: true,
    removalDelay: 300,
    mainClass: 'mfp-fade',
    showCloseBtn: true
  });
  $('.popup-youtube').magnificPopup({
    disableOn: 576,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 300,
    preloader: false,
    fixedContentPos: true,
    closeBtnInside: false,
    showCloseBtn: true
  });
  $('.popup-close').on('click', function() {
    $.magnificPopup.close();
  });
}