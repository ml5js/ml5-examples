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
var x, y; // absolute coordinates on the screen of where the pen is
var prevPen = {
  dx: 0,
  dy: 0,
  pen: 'down'
};
var modelLoaded = false;
var runningStep = false;
var initialStroke = true;
const options = {
  temperature: 0.1
}

// Initial Strokes: this create a circle
const initialStrokes = [{
  dx: -4,
  dy: 0,
  pen: "down"
}, {
  dx: -15,
  dy: 9,
  pen: "down"
}, {
  dx: -10,
  dy: 17,
  pen: "down"
}, {
  dx: -1,
  dy: 28,
  pen: "down"
},{
  dx: 14,
  dy: 13,
  pen: "down"
},{
  dx: 12,
  dy: 4,
  pen: "down"
},{
  dx: 22,
  dy: 1,
  pen: "down"
},{
  dx: 14,
  dy: -11,
  pen: "down"
},{
  dx: 5,
  dy: -12,
  pen: "down"
},{
  dx: 2,
  dy: -19,
  pen: "down"
},{
  dx: -12,
  dy: -23,
  pen: "down"
},{
  dx: -13,
  dy: -7,
  pen: "down"
},{
  dx: -14,
  dy: -1,
  pen: "up"
}];

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
  if (modelLoaded) {
    if (prevPen.pen === "end") {
      restart();
    }
  
    if (!runningStep) {
      runningStep = true;
      model.generate(options, initialStroke ? initialStrokes : [], gotResult);
      initialStroke = false;
    }
  }
}

function gotResult(err, result) {
  if (prevPen.pen === "down") {
    stroke(255, 0, 0)
    strokeWeight(3.0);
    line(x, y, x + result.dx, y + result.dy);
  }

  x += result.dx;
  y += result.dy;
  prevPen = result; 
  runningStep = false;
}

function clearScreen() {
  background(255, 255, 255, 255);
  fill(255, 255, 255, 255);
};

// A function to draw the initial strokes
function drawStartingStrokes() {
  for (let i = 0; i < initialStrokes.length; i++) {
    if (initialStrokes[i].pen === 'end') {
      break;
    }
    // only draw on the paper if the pen is touching the paper
    if (initialStrokes[i].pen === 'down') {
      strokeWeight(4.0);
      line(x, y, x + initialStrokes[i].dx, y + initialStrokes[i].dy); // draw line connecting prev point to current point.
    }
    // update the absolute coordinates from the offsets
    x += initialStrokes[i].dx;
    y += initialStrokes[i].dy;
    // update the previous pen's state to the current one we just sampled
    prev_pen = initialStrokes[i];
  }
}

function restart() {
  model.reset();
  x = width / 2.0;
  y = height / 3.0;
  prevPen = {
    dx: 0,
    dy: 0,
    pen: 'down'
  };
  initialStroke = true;
  clearScreen();
  drawStartingStrokes();
}