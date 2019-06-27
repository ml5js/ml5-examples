// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
DCGAN example
=== */

let dcgan;
let button;
let canvas;

async function make() {
  canvas = createCanvas(200, 200);

  dcgan = await ml5.DCGAN('model/geo/manifest.json');

  // Button to generate an image
  // Create a generate button
  button = document.createElement('button');
  button.innerHTML = "generate";
  document.body.appendChild(button);
  button.addEventListener('click', generate);

  // generate an image on load
  generate()
}

// call app.map.init() once the DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
  make();
});

function generate() {
  // Generate function receives a callback for when image is ready
  dcgan.generate(displayImage);
}

function displayImage(err, result) {
  if (err) {
    console.log(err);
    return;
  }
  img = new ImageData(result.raw, 64, 64)
  const canvasElement = document.createElement("canvas"); 
  canvasElement.width  = 64;
  canvasElement.height = 64;
  ctx = canvasElement.getContext('2d');
  ctx.putImageData(img, 0, 0);
  canvas.drawImage(canvasElement, 0, 0, 200, 200);
}

// Helper Functions
function createCanvas(w, h){
  const canvasElement = document.createElement("canvas"); 
  canvasElement.width  = w;
  canvasElement.height = h;
  document.body.appendChild(canvasElement);
  const canvas = canvasElement.getContext("2d");
  return canvas;
}