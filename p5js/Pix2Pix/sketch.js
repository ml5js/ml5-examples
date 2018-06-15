// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Pix2pix Edges2Pikachu example with p5.js
This uses a pre-trained model on Pikachu images
For more models see: https://github.com/ml5js/ml5-data-and-training/tree/master/models/pix2pix
=== */

const SIZE = 256;
let inputImg, inputCanvas, outputContainer, statusMsg;

const pix2pix = ml5.pix2pix('/models/edges2pikachu_AtoB.pict', modelLoaded);

function setup() {
  // Create canvas
  inputCanvas = createCanvas(SIZE, SIZE);
  inputCanvas.class('border-box').parent('canvasContainer');

  // Selcect output div container
  outputContainer = select('#output');
  statusMsg = select('#status');

  // Display initial input image
  inputImg = loadImage('images/input.png', drawImage);


  // Set stroke to black
  stroke(0);
  pixelDensity(1);
}

// Draw on the canvas when mouse is pressed
function draw() {
  if (mouseIsPressed) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

// A function to be called when the models have loaded
function modelLoaded() {
  if (!statusMsg) statusMsg = select('#status');
  statusMsg.html('Model Loaded!');
}

function drawImage() {
  image(inputImg, 0, 0);
}

// Clear the canvas
function clearCanvas() {
  background(255);
}

function transfer() {
  // Update status message
  statusMsg.html('Applying Style Transfer...!');

  // Select canvas DOM element
  let canvasElement = document.getElementById('defaultCanvas0');
  // Apply pix2pix transformation
  pix2pix.transfer(canvasElement, function(result) {
    // Clear output container
    outputContainer.html('');
    // Create an image based result
    createImg(result.src).class('border-box').parent('output');
  });

  statusMsg.html('Done!');
}
