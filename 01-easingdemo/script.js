(function() {

  var runDemos = function() {
    $('#easingdemo1 span').animate({ left: 200 }, 1000, 'linear');
    $('#easingdemo2 span').animate({ left: 200 }, 1000, 'swing');
    $('#easingdemo3 span').animate({ left: 200 }, 1000, 'easeInExpo');
    $('#easingdemo4 span').animate({ left: 200 }, 1000, 'easeOutExpo');
  };

  var resetDemos = function() {
    $('.easinglist span').stop().css('left', 0);
  };

  $(function() {
    $('#run').click(runDemos);
    $('#reset').click(resetDemos);
  });

}());

