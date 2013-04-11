(function() {

// 1フレームは何ミリ秒にするか
var MILLISEC_PER_FRAME = 1000 / 60;

var graph = null;

// アニメーションさせる関数
var animate = function($el, options) {

  var currentVal = 0; // 初めの値
  var valueInChange = 200; // 変化する値
  var duration = 1000; // アニメーションさせる時間
  var elapsedTime = 0; // 過ぎた時間

  var graphLine = graph.createLine(options.color, {
    showDots: false
  });

  // 要素を動かす関数
  var tick = function() {

    // 1000ミリ秒経ってたら最終値をセットして終わり
    if(elapsedTime >= 1000) {
      currentVal = valueInChange;
      $el.css('left', currentVal);
      graphLine.addPoint(1, 1);
      return;
    }

    var elapsedTimeRate = elapsedTime / duration;
    var valueChangeRate = options.easing(elapsedTimeRate);

    // 指定する値 = 変化させる量 * どのくらい変化させるか
    currentVal = valueInChange * valueChangeRate;

    // X = 経過時間割合, Y = 値の変化割合
    graphLine.addPoint(elapsedTimeRate, valueChangeRate);
    //graph.addPoint(elapsedTimeRate, valueChangeRate);

    $el.css('left', currentVal);

    // 1フレーム分の時間を加算
    elapsedTime += MILLISEC_PER_FRAME;

    // 1フレーム後に再び動かす
    setTimeout(tick, MILLISEC_PER_FRAME);

  };

  graph.startDrawing();

  tick(); // 動かし始める

  return {
    graphLine: graphLine
  };

};

// Boxline

var Boxline = function(selector, options) {
  this.$el = $(selector);
  this.$box = this.$el.find('.box');
  this.options = options;
  var self = this;
  this.$el.on('click', 'button', function() {
    self.run();
  });
};
Boxline.prototype.run = function() {
  this.reset();
  var res = animate( this.$box, this.options );
  this._line = res.graphLine;
  return this;
};
Boxline.prototype.reset = function() {
  if(this._line) {
    this._line.remove();
  }
  this.$box.css('left', 0);
  return this;
};

// init

$(function() {

  graph = new Graph({
    width: 200,
    height: 200,
    appendTo: '#graph'
  });

  var boxlines = [];

  var boxline1 = new Boxline('#boxline1', {
    color: '#012326',
    easing: function(elapsedTimeRate) {
      return elapsedTimeRate;
    }
  });
  boxlines.push(boxline1);

  var boxline2 = new Boxline('#boxline2', {
    color: '#1A465C',
    easing: function(elapsedTimeRate) {
      return Math.pow(elapsedTimeRate, 2);
    }
  });
  boxlines.push(boxline2);

  var boxline3 = new Boxline('#boxline3', {
    color: '#FE8333',
    easing: function(elapsedTimeRate) {
      return Math.pow(elapsedTimeRate, 3);
    }
  });
  boxlines.push(boxline3);

  var boxline4 = new Boxline('#boxline4', {
    color: '#FA4913',
    easing: function(elapsedTimeRate) {
      return Math.pow(elapsedTimeRate, 4);
    }
  });
  boxlines.push(boxline4);

  var boxline5 = new Boxline('#boxline5', {
    color: '#FF2151',
    easing: function(elapsedTimeRate) {
      return Math.pow(elapsedTimeRate, 5);
    }
  });
  boxlines.push(boxline5);

  var runAll = function() {
    $.each(boxlines, function(i, boxline) {
      boxline.run();
    });
  };
  var resetAll = function() {
    $.each(boxlines, function(i, boxline) {
      boxline.reset();
    });
    graph.clear();
  };

  $('#run').click(runAll);
  $('#reset').click(resetAll);

});

}());
