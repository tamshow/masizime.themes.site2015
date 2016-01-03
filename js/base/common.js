var tooljs = {};

//img - svg
tooljs.imgSvg = function () {
  if (!Modernizr.svg) {
      _.each($('img'), function (element, index) {
         element.src = element.src.replace('.svg', '.png');
      });
      _.each($('*'), function (element, index) {
         var url = $(element).css("background-image").replace('.svg', '.png');
         $(element).css("background-image", url);
    });
  };
};

//sptel
tooljs.spTel = function () {
   if (Modernizr.touch) {
      $('.js-tel-link').each(function () {
         var strTel = $(this).text();
         $(this).html($('<a>').attr('href', 'tel:' + strTel.replace(/-/g, '')).append(strTel + '</a> '));
      });
      $('.js-map-link').each(function () {
         var strMap = $(this).text();
         $(this).html($('<a>').attr('href', 'maps:' + 'q=' + strMap.replace(/-/g, '')).append(strMap + '</a> '));
       });
  }
};

//spホバー
tooljs.spHover = function () {
   if (Modernizr.touch) {
      $('.js-sp-hover').on({
         'touchstart': function () {
            $(this).addClass('sp-hover');
         },
         'touchend': function () {
            $(this).removeClass('sp-hover');
         }
    });
  }
};

// リンク付き画像フェード
tooljs.linkOpacity = function () {
   if (!Modernizr.touch) {
      $(function () {
         $("a img").hover(
             function () {
                $(this).fadeTo(150, 0.5);
             },
             function () {
                $(this).fadeTo(150, 1);
             }
         );
      });
   }
}


// リストの数が偶数か奇数か
tooljs.listEndOddEven = function () {
   $('.js-list-end-oddEven').each(function (i) {
      var num = $("li", this).length;
      if (num % 2 == 0) {
         //偶数
         $("li:last-child", this).addClass('end-even');
      }
      else {
         //奇数
         $("li:last-child", this).addClass('end-odd');
      }
   });
}
//window load時
//-----------------------------------
$(window).load(function () {

});

//リサイズされたら
//-----------------------------------
$(window).resize(function () {

});

//document ready時
//-----------------------------------
$(document).ready(function () {

   tooljs.imgSvg();
   tooljs.spTel();
   tooljs.spHover();
   //tooljs.linkOpacity();
   //toggleClass
   $('.h-dropdown__toggle').myToggleClass({
      toggleBody: $('.h-dropdown__body')
   });

   $('.js-sp-dropdown__title').myToggleClass({
      toggleBody: $('.js-sp-dropdown__body')
   });

   //toggleClass
   $('.f-dropdown__toggle').myToggleClass({
      toggleBody: $('.f-dropdown__body'),
      toHeader: true
   });

   //ページトップへ
   if ($('.js-to-top').length) {
      $(".js-to-top a").myPageScroll({
         fixed: true,
         duration: 500,
         easing: "swing"
      });
   };


   if (Modernizr.touch) {
      $('.js-widget-title').parent().find('ul').css({
         'display': 'none'
      })
      $('.js-widget-title').css({
         'cursor': 'pointer'
      }).bind('click', function (e) {
         $(this).parent().find('ul').slideToggle('fast');
         //$('html,body').animate({scrollTop: $(this).offset().top - ($('.header').height() * 2)}, {
         $('html,body').animate({scrollTop: $(this).offset().top }, {
            duration: 1000,
            easing: 'easeInOutExpo'
         });

      });
   };




   cellHeight();
   //リサイズ
   $(window).resize(function(){
      cellHeight();
   });

   function cellHeight(){
      // if (Modernizr.touch) {
      if ($('.js-cell-th').length) {
         $('.js-cell-th').addClass('is-cell-th--sm');
         $('.js-cell-td').addClass('is-cell-td--sm');
         _.each($('.js-cell-th'), function (element, index) {
            var h = $(element).next().height();
            $(element).height(h);
         });
      }
      //}
   }

   //ユニットの配置:右を連続した場合にclearHiddenが入るのを消す
   $(".clearHidden").each(function () {
      $(this).next().hasClass("column-image-right") && $(this).prev().hasClass("column-image-right") && $(this).remove()
   });
});
