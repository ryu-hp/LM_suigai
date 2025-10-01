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

  // bottom-fixの表示制御用のIntersectionObserver
  var kvSection = document.querySelector('#kv');
  var bottomFix = document.querySelector('.bottom-fix');
  
  if (kvSection && bottomFix) {
    // 初期状態では非表示
    bottomFix.style.display = 'none';
    
    var kvObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // KVが画面内にある時は bottom-fix を非表示
          bottomFix.style.display = 'none';
        } else {
          // KVが画面外にある時は bottom-fix を表示
          bottomFix.style.display = 'block';
        }
      });
    }, {
      root: sc,
      rootMargin: '0px',
      threshold: 0
    });
    
    kvObserver.observe(kvSection);
  }
  
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
