
//page-top
//<div id="to-top"><a href="#pagetop">TOPへもどる</a></div>
(function ($) {
   $.fn.myPageScroll = function (options) {
      var target = $(this),
          defaultValue = {
             fixed: false,
             duration: 500,
             easing: 'swing'
          },
          settings = $.extend(defaultValue, options),
          fixed = defaultValue.fixed,
          duration = defaultValue.duration,
          easing = defaultValue.easing;
      target.click(function () {
         target.blur();
         $('html,body')
             .animate({scrollTop: 0}, {duration: duration, easing: easing});
         return false;
      });

      //    #to-top {
      //      position: fixed;
      //      bottom: 13px;
      //      left: auto;
      //      z-index: 100;
      //      clear: both;
      //      a{color: #000;}
      //      margin: 0 0 0 903px;
      //    }
      if (fixed) {
         var $fixed = $('.to-top');
         var mainH = $('header').height();
         var $footer = $('footer');
         var footerHeight = $footer.height();
         var footerStart = $footer.offset().top;
         var footFixed = footerStart -3;//footからの基準
         $fixed.stop().animate({opacity: '0'}, {duration: 0, easing: 'linear'});
         $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            var scrollVisible = scrollTop + $(window).height();
            var scrollPos = $(this).scrollTop();
            if (scrollPos < mainH) {
               $fixed.stop().animate({opacity: '0'}, {duration: duration, easing: easing});
            } else {
               $fixed.stop().animate({opacity: '1'}, {duration: duration, easing: easing});
               //footer固定
              // $fixed.css('position', (scrollVisible > footFixed) ? 'absolute' : 'fixed');
            }
         });
      }
      return this;
   };
})(jQuery);


/*
 *  targetにclass is-onをつける
 *  toggleBodyにclass is-hiddenをつける
 */
(function ($) {
   $.fn.myToggleClass = function (options) {
      var target = $(this),
          defaultValue = {
             toggleBody: $('.toggle-body'), //トグルする箇所
             overlay: $('.menu-overlay'),
             nav: $('dropdown-a'),
             navHeight: false, //ヘッダー分高さ確保
             mediaWidth: 600,
             firstDisplay: false,   //読み込み時にdisplay:none
             toHeader: false
          },
          settings = $.extend(defaultValue, options),
          toggleBody = defaultValue.toggleBody,
          overlay = defaultValue.overlay,
          nav = defaultValue.nav,
          navHeight = defaultValue.navHeight,
          mediaWidth = defaultValue.mediaWidth,
          firstDisplay = defaultValue.firstDisplay,
          toHeader = defaultValue.toHeader;
      $(window).resize(function () {
         var windowW = $(window).width();
         if (windowW > mediaWidth) {
            toggleBody.removeAttr('style');overlay.removeAttr('style');
            target.removeClass('is-toggle--on');
            toggleBody.addClass('is-toggle--hidden');
            if (firstDisplay) {
               $('.is-toggle--hidden' + toggleBody.selector).css({'display': 'none'});
            }
         };
         if (navHeight) {
            if (windowW == mediaWidth) {
               var Hheight = $('header').outerHeight();
               nav.css({
                  'top': Hheight + 'px'
               });
            };
         }
      });
      if (firstDisplay) {
         $('.is-toggle--hidden' + toggleBody.selector).css({'display': 'none'});
      }
      target.bind('click', function () {
         if (toggleBody.hasClass('is-toggle--hidden')) {
            overlay.css({'display': 'block'});
            toggleBody.css({'display': 'none'}).removeClass('is-toggle--hidden').slideDown();
            target.addClass('is-toggle--on');
            $('.js-toggle-icon').removeClass('fa-angle-down').addClass('fa-angle-up');

            if (toHeader) {
               $('html,body').animate({scrollTop: $(target).offset().top - ($('.header').height() * 2)}, {
                  duration: 1000,
                  easing: 'swing'
               });//easeInOutExpo
            }
         } else {
            overlay.removeAttr('style');
            toggleBody.slideUp().addClass('is-toggle--hidden');
            target.removeClass('is-toggle--on');
            $('.js-toggle-icon').removeClass('fa-angle-up').addClass('fa-angle-down');
         }
      });
      return this;
   };
})(jQuery);