//スクロールして要素が出現すると表示
//IDを指定する
(function ($) {
   $.fn.elementScrollIn = function (options) {
      var target = $(this),
          defaultValue = {
             visibleOne: false, //1回表示すると消えない
             offset: 0,          //開始位置ずらす
             // elmId:'#hs',      //使わないページでエラーになるので使うページにはIDを
             funcIn: {},         //後から追加しようと思ってる
             funcOut: {}         //後から追加しようと思ってる
          },
          settings = $.extend(defaultValue, options);
      var targetId = target.get(0);
      if (targetId !== undefined) {
         var targetTop = target.offset().top,
             visibleOne = defaultValue.visibleOne,
             elmId = defaultValue.elmId,
             offset = defaultValue.offset,
             winHeight = $(window).height();
         $(window).bind('load scroll', function () {
            if ($(window).scrollTop() > (targetTop - winHeight + offset)) {
               target.addClass('is-on')
                   .fadeIn(2000);
            } else {
               target.removeClass('is-on')
                   .fadeOut();
            }
         });
      }
      return this;
   };
})(jQuery);


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
         var footFixed = footerStart;//footからの基準
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
               //$fixed.css('position', (scrollVisible > footFixed) ? 'absolute' : 'fixed');
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
             nav: $('dropdown-a'),
             navHeight: false, //ヘッダー分高さ確保
             mediaWidth: 600,
             firstDisplay: false,   //読み込み時にdisplay:none
             toHeader: false
          },
          settings = $.extend(defaultValue, options),
          toggleBody = defaultValue.toggleBody,
          nav = defaultValue.nav,
          navHeight = defaultValue.navHeight,
          mediaWidth = defaultValue.mediaWidth,
          firstDisplay = defaultValue.firstDisplay,
          toHeader = defaultValue.toHeader;
      $(window).resize(function () {
         var windowW = $(window).width();
         if (windowW > mediaWidth) {
            toggleBody.removeAttr('style');
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
            toggleBody.slideUp().addClass('is-toggle--hidden');
            target.removeClass('is-toggle--on');
            $('.js-toggle-icon').removeClass('fa-angle-up').addClass('fa-angle-down');
         }
      });
      return this;
   };
})(jQuery);


(function ($) {
   $.fn.hoverImgMove = function (options) {
      var target = $(this),
          targetImg = $(this).find('img'),
          defaultValue = {
             movePos: 'top',
             onMove: '16px',
             offMove: '0px',
             onTime: 600,
             offTime: 400,
             onEase: 'swing',//easeInOutBack
             offEase: 'swing'//easeOutBounce
          },
          settings = $.extend(defaultValue, options),
          movePos = defaultValue.movePos,
          onMove = defaultValue.onMove,
          offMove = defaultValue.offMove,
          onTime = defaultValue.onTime,
          offTime = defaultValue.offTime,
          onEase = defaultValue.onEase,
          offEase = defaultValue.offEase,
          onAnim = {},
          offAnim = {};
       onAnim[movePos] = '-' + onMove;
       offAnim[movePos] = offMove;

      target.bind('mouseover', function () {
         $(this).find('img').stop().animate(onAnim, onTime, onEase).css({'position': 'relative'});
      });
      target.bind('mouseout', function () {
         $(this).find('img').stop().animate(offAnim, offTime, offEase);
      });
      return this;
   };
})(jQuery);


(function ($) {
   $.fn.hoverMove = function (options) {
      var target = $(this),
      //targetImg =  $(this).find('img'),
          defaultValue = {
             movePos: 'top',
             onMove: '16px',
             offMove: '0px',
             onTime: 600,
             offTime: 400,
             onEase: 'swing',//easeInOutBack
             offEase: 'swing'//easeOutBounce
          },
          settings = $.extend(defaultValue, options),
          movePos = defaultValue.movePos,
          onMove = defaultValue.onMove,
          offMove = defaultValue.offMove,
          onTime = defaultValue.onTime,
          offTime = defaultValue.offTime,
          onEase = defaultValue.onEase,
          offEase = defaultValue.offEase,
          onAnim = {},
          offAnim = {};
      onAnim[movePos] = '-' + onMove;
      offAnim[movePos] = offMove;

      target.bind('mouseover', function () {
         $(this).stop().animate(onAnim, onTime, onEase);
      });
      target.bind('mouseout', function () {
         $(this).stop().animate(offAnim, offTime, offEase);
      });
      return this;
   };
})(jQuery);
