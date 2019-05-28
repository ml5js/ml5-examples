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

function setup() {
  createCanvas(400, 400);
  // load DCGAN and send in URL path to a JSON file with the pre-trained model info 
  dcgan = ml5.DCGAN('model/face/manifest.json', modelReady);
  // Button to generate an image
  button = createButton('generate');
  button.mousePressed(generate);
  // Hiding button until model is ready
  button.hide();
}

function generate() {
  // Generate function receives a callback for when image is ready
  dcgan.generate(displayImage);
}

function displayImage(err, result) {
  if (err) {
    console.log(err);
    return;
  }
  image(result.image, 0, 0, 400, 400);
}

function modelReady() {
  console.log('model is ready');
  button.show();
  generate();
}