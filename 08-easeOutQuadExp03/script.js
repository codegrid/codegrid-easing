$(function() {

  var graph = new Graph({
    width: 200,
    height: 200,
    appendTo: '#graph'
  });

  graph.startDrawing();

  var x = 0;
  var y = 0;

  while(true) {
    y = Math.pow(x, 2);
    y = 1 - Math.pow(1 - x, 2);
    graph.addPoint(x, y);
    x += 0.05;
    if(x > 1.1) {
      break;
    }
  }

});
