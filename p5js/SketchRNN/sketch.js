// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
SketchRNN
=== */

var model;
var dx, dy; // offsets of the pen strokes, in pixels
var pen_down, pen_up, pen_end; // keep track of whether pen is touching paper
var x, y; // absolute coordinates on the screen of where the pen is
var prevPen = [1, 0, 0]; // group all p0, p1, p2 together
var temperature = 0.1; // controls the amount of uncertainty of the model
var modelLoaded = false;
var runningStep = false;
var initialStroke = true;



// Initial Strokes: this create a circle


// var initialStroke = [{
//   dx: -4,
//   dy: 0
//   pen: "down"
// }, {
//   dx: -4,
//   dy: 0
//   pen: "down"
// }, {
//   dx: -4,
//   dy: 0
//   pen: "down"
// }]

var initialStrokes = [
  [-4, 0, 1, 0, 0],
  [-15, 9, 1, 0, 0],
  [-10, 17, 1, 0, 0],
  [-1, 28, 1, 0, 0],
  [14, 13, 1, 0, 0],
  [12, 4, 1, 0, 0],
  [22, 1, 1, 0, 0],
  [14, -11, 1, 0, 0],
  [5, -12, 1, 0, 0],
  [2, -19, 1, 0, 0],
  [-12, -23, 1, 0, 0],
  [-13, -7, 1, 0, 0],
  [-14, -1, 0, 1, 0]
];

function setup() {
  createCanvas(500, 500);
  model = new ml5.SketchRNN('windmill', modelReady)
}

function modelReady() {
  select('#status').html('Model Loaded');
  modelLoaded = true;
  restart();
}

function draw() {
  if (!modelLoaded) {
    return;
  }
  // if (previous.pen === "end") {
  if (prevPen[2] === 1) {
    restart();
  }

  if (!runningStep) {
    runningStep = true;
    model.generate({ temperature }, initialStroke ? initialStrokes : [], gotResult);
    initialStroke = false;
  }
}

function gotResult(err, result) {
  
  [dx, dy, pen_down, pen_up, pen_end] = result;
  // if (previous.pen === "down") 
  if (prevPen[0] == 1) {
    stroke(255, 0, 0)
    strokeWeight(3.0);
    // line(x, y, x + result.dx, y + result.dy);
    line(x, y, x + dx, y + dy);
  }

  x += dx;
  y += dy;
  // previous = result; 
  prevPen = [pen_down, pen_up, pen_end];

  runningStep = false;
}

function clearScreen() {
  background(255, 255, 255, 255);
  fill(255, 255, 255, 255);
};

// A function to draw the initial strokes
function drawStartingStrokes() {
  for (let i = 0; i < initialStrokes.length; i++) {
    [dx, dy, pen_down, pen_up, pen_end] = initialStrokes[i];

    if (prevPen[2] == 1) {
      break;
    }

    // only draw on the paper if the pen is touching the paper
    if (prevPen[0] == 1) {
      strokeWeight(4.0);
      line(x, y, x + dx, y + dy); // draw line connecting prev point to current point.
    }

    // update the absolute coordinates from the offsets
    x += dx;
    y += dy;

    // update the previous pen's state to the current one we just sampled
    prev_pen = [pen_down, pen_up, pen_end];
  }
}

function restart() {
  model.reset();

  x = width / 2.0;
  y = height / 3.0;

  prevPen = [1, 0, 0];
  initialStroke = true;

  clearScreen();
  drawStartingStrokes();
}