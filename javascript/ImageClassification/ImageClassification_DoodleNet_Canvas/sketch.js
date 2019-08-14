// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Canvas Image Classification using DoodleNet
This example uses a callback pattern to create the classifier
=== */

// Initialize the Image Classifier method with DoodleNet.
let classifier;

// A variable to hold the canvas image we want to classify
let canvas;

// Two variable to hold the label and confidence of the result
let label;
let confidence;
let button
let width = 280;
let height = 280;

let pX = null;
let pY = null;
let x = null;
let y = null;

let mouseDown = false;

setup();
async function setup() {
  canvas = await createCanvas(width, height);
  classifier = await ml5.imageClassifier('DoodleNet', onModelReady);
  // Create a canvas with 280 x 280 px

  document.querySelector('canvas').addEventListener('mousemove', onMouseUpdate);
  document.querySelector('canvas').addEventListener('mousedown', onMouseDown);
  document.querySelector('canvas').addEventListener('mouseup', onMouseUp);

  // Create a clear canvas button
  button = document.querySelector("#clearBtn");

  button.addEventListener('click', clearCanvas);
  // Create 'label' and 'confidence' div to hold results
  label = document.querySelector("#label");
  confidence = document.querySelector("#confidence");

  requestAnimationFrame(draw)
}

function onModelReady() {
  console.log('ready!')
}


function clearCanvas() {
  canvas.fillStyle = '#ebedef'
  canvas.fillRect(0, 0, width, height);
}


let request;

function draw() {
  request = requestAnimationFrame(draw)

  if (pX == null || pY == null) {
    pX = x
    pY = y
  }
  x = x
  y = y


  // Set stroke weight to 10
  canvas.lineWidth = 10;
  // Set stroke color to black
  canvas.strokeStyle = "#000000";
  // If mouse is pressed, draw line between previous and current mouse positions
  if (mouseDown === true) {
    canvas.beginPath();
    canvas.lineCap = "round";
    canvas.moveTo(x, y);
    canvas.lineTo(pX, pY);
    canvas.stroke();
  }

  pX = x;
  pY = y;
}



function onMouseDown(e) {
  mouseDown = true;
}

function onMouseUp(e) {
  mouseDown = false;
  classifyCanvas();
}

function onMouseUpdate(e) {
  var pos = getMousePos(document.querySelector('canvas'), e);
  x = pos.x;
  y = pos.y;

}

function getMousePos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}



function classifyCanvas() {
  classifier.classify(canvas, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  // Show the first label and confidence
  label.innerHTML = 'Label: ' + results[0].label;
  confidence.innerHTML = 'Confidence: ' + results[0].confidence.toFixed(4)
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