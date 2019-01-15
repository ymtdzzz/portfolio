$(function() {

  // ヘッダーのナビゲーションのアニメーション
  var duration = 300;

  $('.nav-item a').on('mouseover', function() {
    $(this).stop(true).animate({
      borderBottomColor: 'red',
      borderBottomWidth: '5px',
      color: 'red'
    }, duration, 'easeOutExpo');
  })
  .on('mouseout a', function() {
    $(this).stop(true).animate({
      borderBottomColor: 'white',
      borderBottomWidth: '1px',
      color: 'white'
    }, duration, 'easeOutExpo');
  });

  // ヘッダーのナビゲーション押下時の動作
  $('.nav-item a').smoothScroll({
    // アニメーション終了後にURLのハッシュを更新する
    easing: 'easeOutExpo',
    speed: 1000,
    afterScroll: function() {
      location.hash = $(this).attr('href');
    }
  });
  
  // ヘッダーの矢印押下時の動作
  $('.header-button a').smoothScroll({
    easing: 'easeOutExpo',
    speed: 800,
    afterScroll: function() {
      location.hash = $(this).attr('href');
    }
  });
  
  $('.header-button a').on('mouseover', function() {
    $(this).stop(true).animate({
      top: '+=12px'
    }, 300);
  }).on('mouseout', function() {
    $(this).stop(true).animate({
      top: ''
    }, 300);
  });

  // Sticky Header
  $('.header-nav').each(function() {
    var $window = $(window),
        $header = $(this),

        // ヘッダーのクローン生成
        $headerClone = $header.contents().clone(),
        // ヘッダーのクローンのコンテナー
        $headerCloneContainer = $('<div class="header-nav-clone"></div>'),
        // 上辺からヘッダー底辺までの距離
        threshold = $header.offset().top + $header.outerHeight();

    // コンテナーにヘッダーのクローン挿入
    $headerCloneContainer.append($headerClone);
    // コンテナーをbodyの最後に挿入
    $headerCloneContainer.appendTo('body');
    
    // スクロール時に処理を実行する（負担軽減付）
    $window.on('scroll', $.throttle(1000 / 15, function() {
      if ($window.scrollTop() > threshold) {
        $headerCloneContainer.addClass('visible');
      } else {
        $headerCloneContainer.removeClass('visible');
      }
    }));

    $window.trigger('scroll');
  });

  // メッセージ送信ボタンのアニメーション
  $('.contact-submit').on('mouseover', function() {
    $(this).stop(true).animate({
      backgroundColor: 'black',
      color: 'white'
    }, duration, 'easeOutExpo');
  }).on('mouseout', function() {
    $(this).stop(true).animate({
      backgroundColor: 'transparent',
      color: 'black'
    });
  });

  // スライドショー||--------------------------------------
  $('.work-slideshow').each(function() {
    // 変数の宣言
    var $container = $(this),
        $slideGroup = $container.find('.slideshow-slides'),
        $slides = $slideGroup.find('.slide'),
        $nav = $container.find('.slideshow-nav'),
        $indicator = $container.find('.slideshow-indicator'),

        slideCount = $slides.length,
        indicatorHTML = '',
        currentIndex = 0,
        duration = 500,
        easing = 'easeInOutExpo',
        interval = 7500,
        timer;

    // HTML要素の配置
    $slides.each(function(i) {
      $(this).css({ left: 100 * i  + '%' });
      indicatorHTML += '<a href="#">' + '</a>';
    });

    $indicator.html(indicatorHTML);

    // 関数の定義
    // 任意のスライドを選択する
    function goToSlide(index) {
      $slideGroup.animate({ left: -100 * index + '%' }, duration, easing);
      currentIndex = index;
      updateNav();
    }

    // ナビゲーションボタンの表示切り替え
    function updateNav() {
      var $navPrev = $nav.find('.prev'),
          $navNext = $nav.find('.next');

      if (currentIndex === 0) {
        $navPrev.addClass('disabled');
      } else {
        $navPrev.removeClass('disabled');
      }
      if (currentIndex === slideCount - 1) {
        $navNext.addClass('disabled');
      } else {
        $navNext.removeClass('disabled');
      }
      // 現在のスライドに対応するインジケーターを無効にする
      $indicator.find('a').removeClass('active')
        .eq(currentIndex).addClass('active');
    }

    // タイマーの開始
    function startTimer() {
      timer = setInterval(function() {
        var nextIndex = (currentIndex + 1) % slideCount;
        goToSlide(nextIndex);
      }, interval);
    }

    // タイマーの停止
    function stopTimer() {
      clearInterval(timer);
    }

    // イベントの登録
    // ナビゲーションの動作
    $nav.on('click', 'a', function(event) {
      event.preventDefault();
      if ($(this).hasClass('prev')) {
        goToSlide(currentIndex - 1);
      } else {
        goToSlide(currentIndex + 1);
      }
    });
    // インジケーターの動作
    $indicator.on('click', 'a', function(event) {
      event.preventDefault();
      if (!$(this).hasClass('active')) {
        goToSlide($(this).index());
      }
    });
    // マウスが乗ったらタイマー停止
    $container.on({
      mouseenter: stopTimer,
      mouseleave: startTimer
    });

    // スライドショー開始
    goToSlide(currentIndex);

    // タイマーの開始
    startTimer();
  });

  // ヘッダー(clone)のナビゲーション押下時の動作
  $('.header-nav-clone a').smoothScroll({
    // アニメーション終了後にURLのハッシュを更新する
    easing: 'easeOutExpo',
    speed: 1000,
    afterScroll: function() {
      location.hash = $(this).attr('href');
    }
  });
});