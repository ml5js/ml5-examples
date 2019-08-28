// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
SketchRNN
=== */

// The SketchRNN model
let model;
// Start by drawing
let previous_pen = 'down';
// Current location of drawing
let pX = null;
let pY = null;
let x = null;
let y = null;
let mouseX = null;
let mouseY = null;
// The current "stroke" of the drawing
let strokePath;
let seedStrokes = [];
let button;
// Storing a reference to the canvas
let canvas;

let width = 640;
let height = 480;

let mouseDown = false;

async function setup() {
  canvas = createCanvas(640, 480);
  // Load the model
  // See a list of all supported models: https://github.com/ml5js/ml5-library/blob/master/src/SketchRNN/models.js
  model = await ml5.sketchRNN('cat', modelReady);

  // Button to start drawing
  button = document.querySelector('#clearBtn');
  button.addEventListener('click', clearDrawing);

  document.querySelector('canvas').addEventListener('mousemove', onMouseUpdate);
  document.querySelector('canvas').addEventListener('mousedown', onMouseDown);
  document.querySelector('canvas').addEventListener('mouseup', onMouseUp);

  requestAnimationFrame(draw);
}
setup();

// The model is ready
function modelReady() {
  // sketchRNN will begin when the mouse is released
  document.querySelector('canvas').addEventListener('mouseup', startSketchRNN);
}

// Reset the drawing
function clearDrawing() {
  clearCanvas();
  // clear seed strokes
  seedStrokes = [];
  // Reset model
  model.reset();
}

// sketchRNN takes over
function startSketchRNN() {
  // Start where the mouse left off
  x = mouseX;
  y = mouseY;
  // Generate with the seedStrokes
  model.generate(seedStrokes, gotStroke);
}



function draw() {
  requestAnimationFrame(draw);
  if (pX == null || pY == null) {
    pX = mouseX
    pY = mouseY
  }  

  if (mouseDown) {
    // Set stroke weight to 10
    canvas.lineWidth = 10;
    // Set stroke color to black
    canvas.strokeStyle = "#000000";
    // If mouse is pressed, draw line between previous and current mouse positions
    canvas.beginPath();
    canvas.lineCap = "round";
    canvas.moveTo(mouseX, mouseY);
    canvas.lineTo(pX, pY);
    canvas.stroke();


    // Create a "stroke path" with dx, dy, and pen
    let userStroke = {
      dx: mouseX - pX,
      dy: mouseY - pY,
      pen: 'down'
    };
    // Add to the array
    seedStrokes.push(userStroke);
  }

  // If something new to draw
  if (strokePath) {
    // If the pen is down, draw a line
    if (previous_pen == 'down') {
      canvas.beginPath();
      canvas.lineCap = "round";
      canvas.moveTo(x, y);
      canvas.lineTo(x + strokePath.dx, y + strokePath.dy);
      canvas.stroke();
    }
    // Move the pen
    x += strokePath.dx;
    y += strokePath.dy;
    // The pen state actually refers to the next stroke
    previous_pen = strokePath.pen;

    // If the drawing is complete
    if (strokePath.pen !== 'end') {
      strokePath = null;
      model.generate(gotStroke);
    }
  }
  
  // set the new pX and pY
  pX = mouseX;
  pY = mouseY;
}

// A new stroke path
function gotStroke(err, s) {
  strokePath = s;
}

function createCanvas(w, h) {
  const canvasElement = document.createElement("canvas");
  canvasElement.width = w;
  canvasElement.height = h;
  document.body.appendChild(canvasElement);
  const canvas = canvasElement.getContext("2d");
  canvas.fillStyle = '#ebedef'
  canvas.fillRect(0, 0, width, height);
  return canvas;
}

function clearCanvas() {
  canvas.fillStyle = '#ebedef'
  canvas.fillRect(0, 0, width, height);
}

function onMouseDown(e) {
  mouseDown = true;
}

function onMouseUp(e) {
  mouseDown = false;
}

function onMouseUpdate(e) {
  var pos = getMousePos(document.querySelector('canvas'), e);
  mouseX = pos.x;
  mouseY = pos.y;
}

function getMousePos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}
