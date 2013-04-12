// 1フレームは何ミリ秒にするか
var MILLISEC_PER_FRAME = 13;

// アニメーションさせる関数
var animate = function($el) {

  var leftVal = 0; // left値
  var valueInChange = 200; // 変化させるleft値
  var duration = 1000; // トータル時間
  var elapsedTime = 0; // 過ぎた時間

  // 要素を動かす関数
  var tick = function() {

    // 1000ミリ秒経ってたら最終値をセットして終わり
    if(elapsedTime >= 1000) {
      leftVal = valueInChange;
      $el.css('left', leftVal);
      return;
    }

    // 経過時間の割合 = 経過時間 / トータル時間
    var elapsedTimeRate = elapsedTime / duration;
    // 現在の値 = 変化させるleft値 * 経過時間の割合
    leftVal = valueInChange * elapsedTimeRate;

    // 要素のスタイルを更新
    $el.css('left', leftVal);

    // 1フレーム分の時間を経過時間に加算
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
