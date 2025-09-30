jQuery(function ($) {
  var sc = document.querySelector('.body-wrapper');
  if (!('IntersectionObserver' in window) || !sc) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-animated');
        io.unobserve(e.target); // 1回で監視解除
      }
    });
  }, {
    root: sc,                 // ← ルートをスクロールコンテナに
    rootMargin: '0px 0px -100px 0px',
    threshold: 0
  });

  document.querySelectorAll('.js-animate').forEach(function (el) {
    io.observe(el);
  });
  
  // 初期状態の設定
  $('.accordion-item__content').hide(); // 全て閉じる
  var $first = $('.accordion-item').first();
  $first.addClass('is-open');
  $first.find('.accordion-item__content').show(); // 最初だけ開く
  // トグル
  $('.accordion-item__head').on('click', function () {
    var $item = $(this).closest('.accordion-item');
    $item.toggleClass('is-open');
    $item.find('.accordion-item__content').stop(true, true).slideToggle(250);
  });
});
