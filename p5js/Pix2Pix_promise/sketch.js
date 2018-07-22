// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Pix2pix Edges2Pikachu example with p5.js using promises
This uses a pre-trained model on Pikachu images
For more models see: https://github.com/ml5js/ml5-data-and-training/tree/master/models/pix2pix
=== */

// The pre-trained Edges2Pikachu model is trained on 256x256 images
// So the input images can only be 256x256 or 512x512, or multiple of 256
const SIZE = 256;
let inputImg, inputCanvas, outputContainer, statusMsg, pix2pix;

function setup() {
  // Create a canvas
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

// Draw the input image to the canvas
function drawImage() {
  image(inputImg, 0, 0);

  // After input image is loaded, initialize a pix2pix method with a pre-trained model
  ml5.pix2pix('models/edges2pikachu_AtoB.pict')
    .then(model => {
      pix2pix = model;

      // Show 'Model Loaded!' message
      statusMsg.html('Model Loaded!');

      // Call transfer function after the model is loaded
      transfer();
    })
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
  pix2pix.transfer(canvasElement)
    .then(result => {
      // Clear output container
      outputContainer.html('');
      // Create an image based result
      createImg(result.src).class('border-box').parent('output');
      // Show 'Done!' message
      statusMsg.html('Done!');
    });
}
