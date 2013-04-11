// 1フレームは何ミリ秒にするか
var MILLISEC_PER_FRAME = 1000 / 60;

// アニメーションさせる関数
var animate = function($el) {

  var currentVal = 0; // 初めの値
  var valueInChange = 200; // 変化する値
  var duration = 1000; // アニメーションさせる時間
  var elapsedTime = 0; // 過ぎた時間

  // 要素を動かす関数
  var tick = function() {

    // 1000ミリ秒経ってたら最終値をセットして終わり
    if(elapsedTime >= 1000) {
      currentVal = valueInChange;
      $el.css('left', currentVal);
      return;
    }

    // 現在の値 = 変化させる値 * どのくらい時間が経ったかの割合
    var elapsedTimeRate = elapsedTime / duration;
    currentVal = valueInChange * elapsedTimeRate;

    $el.css('left', currentVal);

    // 1フレーム分の時間を加算
    elapsedTime += MILLISEC_PER_FRAME;

    // 1フレーム後に再び動かす
    setTimeout(tick, MILLISEC_PER_FRAME);

  };

  tick(); // 動かし始める

};

$(function() {
  var $box = $('#box');
  $('#run').click(function() {
    animate($box);
  });
  $('#reset').click(function() {
    $box.css('left', 0);
  });
});
