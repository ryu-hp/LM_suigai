jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
  $(document).ready(function() {
      function fadeAnimation() {
          $('.js-animate').each(function() {
          var elemPos = $(this).offset().top;
          var windowHeight = $(window).height();
          var scrollPos = $(window).scrollTop() + windowHeight - 100;

          if (scrollPos > elemPos) {
              $(this).addClass('is-animated');
          }
          })
      }
      
      // 初回実行
      fadeAnimation();
      
      // スクロールイベントに関数を登録
      $(window).on('scroll', fadeAnimation);
  })
})