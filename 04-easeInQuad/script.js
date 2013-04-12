(function() {

// 1フレームは何ミリ秒にするか
var MILLISEC_PER_FRAME = 13;

var graph = null;

// アニメーションさせる関数
var animate = function($el) {

  var leftVal = 0; // 初めの値
  var valueInChange = 200; // 変化する値
  var duration = 1000; // アニメーションさせる時間
  var elapsedTime = 0; // 過ぎた時間

  // 要素を動かす関数
  var tick = function() {

    // 1000ミリ秒経ってたら最終値をセットして終わり
    if(elapsedTime >= 1000) {
      leftVal = valueInChange;
      $el.css('left', leftVal);
      return;
    }

    // 経過時間の割合
    var elapsedTimeRate = elapsedTime / duration;
    // 値の変化の割合 = 経過時間の割合の二乗
    var valueChangeRate = Math.pow(elapsedTimeRate, 2);
    // 指定する値 = 変化させる量 * 値の変化の割合
    leftVal = valueInChange * valueChangeRate;

    // X = 経過時間割合, Y = 値の変化割合
    graph.addPoint(elapsedTimeRate, valueChangeRate);

    $el.css('left', leftVal);

    // 1フレーム分の時間を加算
    elapsedTime += MILLISEC_PER_FRAME;

    // 1フレーム後に再び動かす
    setTimeout(tick, MILLISEC_PER_FRAME);

  };

  graph.startDrawing();

  tick(); // 動かし始める

};

$(function() {
  var $box = $('#box');
  graph = new Graph({
    width: 200,
    height: 200,
    appendTo: '#graph'
  });
  $('#run').click(function() {
    animate($box);
  });
  $('#reset').click(function() {
    $box.css('left', 0);
    graph.clear();
  });
});

}());
