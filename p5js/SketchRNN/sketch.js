// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
SketchRNN
=== */

let model;
let previous_pen = 'down';
let x, y;
let sketch;

function setup() {
  createCanvas(400, 300);
  model = ml5.SketchRNN('cat', modelReady);
  let button = select('#draw');
  button.mousePressed(startDrawing);
}

function startDrawing() {
  x = width / 2;
  y = height / 2;
  background(220);
  model.reset();
  model.generate(gotSketch);
}

function draw() {
  if (sketch) {
    if (previous_pen == 'down') {
      stroke(0);
      strokeWeight(3.0);
      line(x, y, x + sketch.dx, y + sketch.dy);
    }
    x += sketch.dx;
    y += sketch.dy;
    previous_pen = sketch.pen;

    if (sketch.pen !== 'end') {
      sketch = null;
      model.generate(gotSketch);
    }
  } 
}

function gotSketch(err, s) {
  sketch = s;
}

function modelReady() {
  console.log('model ready');
  startDrawing();
}

