$(document).ready(function () {
  lazy();
  timerMain();
  slider();
  nav();
  mask();
  popup();
  modalMagnificBasket();
  landingScroll();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});

//global variables
var innerWidth = $('body').innerWidth();
var mobileLink = $(".mobile-nav__link");


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
  mobileLink.click(function() {
    nav.removeClass('mobile-nav_active');
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

  $('.catalogue-block__slider').each( function() {
    $(this).slick({
      arrows: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      lazyLoad: 'ondemand',
      dots: true
    });
  });
  pag();

  $('.catalogue-block__slider').on('swipe', function(){
    pag();
  });

  $('.catalogue-block__nav-slider .catalogue-block__slide').children().click(function() {
    var index = $(this).parent().index();
    $(this).parents('.catalogue-block').find('.catalogue-block__slider').slick('slickGoTo', index);
    pag();
  });

  //custom pagination
  function pag() {
    $(".slick-dots li").each(function() {
      if($(this).hasClass("slick-active")) {
        $(this).parents('.catalogue-block').find('.catalogue-block__nav-slider .catalogue-block__slide').removeClass("catalogue-block__slide_active");
        $(this).parents('.catalogue-block').find('.catalogue-block__nav-slider .catalogue-block__slide').eq($(this).index()).addClass("catalogue-block__slide_active");
      }
    });
  }

  $(".catalogue-block .slick-arrow").on('click', function(){
    setTimeout(function(){
      pag();
    }, 100);
  });

  //догрузка изображений при перелистывании
  $('.catalogue-block__slider').on('afterChange', function(){
    lazy();
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
}
function modalMagnificBasket() {
	$('.popup_link').magnificPopup({
		closeBtnInside: false,
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
}
//якорные ссылки
function landingScroll() {
  var headerHeight = $(".header").height();
  var body = $("body");
  var scrollLink = $('.scroll-link')
  var desctopLink = $(".nav__link");

  function scroll() {
    if(body.hasClass("in-scroll")) {} else {
      scrollLink.each(function () {
        var window_top = $(window).scrollTop();
        var div_1 = $(this).attr('href');
        if($(div_1).length > 0) {
          var div_top = $(div_1).offset().top;
          var blockHeight = $(div_1).height();
          if (window_top > (div_top - headerHeight) && window_top < (div_top - headerHeight) + blockHeight){
            $('.nav__item').find('a').removeClass('scroll-link_active');
            $('.nav__item').find('a[href="'+div_1+'"]').addClass('scroll-link_active');
          } else {
            $('.nav__item').find('a[href="'+div_1+'"]').removeClass('scroll-link_active');
          };
        }
      });
    }
  }
  $(window).scroll(function(){
    scroll();
  });
  scrollLink.click(function (event) {
    var id  = $(this).attr('href'),
        top = $(id).offset().top - headerHeight + 1;
    event.preventDefault();
    scrollLink.removeClass('nav__link_active');
    $(this).addClass('nav__link_active');

    if (mobileLink.is(event.target)) {
      setTimeout(function() {
        $('body,html').animate({scrollTop: top}, 400);
      }, 300)
    } else if (desctopLink.is(event.target)) {
      $('body,html').animate({scrollTop: top}, 400);
      body.addClass("in-scroll");
      setTimeout(function() {
        body.removeClass("in-scroll");
      }, 400)
    }
  })
}