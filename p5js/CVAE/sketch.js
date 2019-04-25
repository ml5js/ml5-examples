// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
CVAE example using p5.js
=== */
let cvae;
let labelP;
let button;

// Note CVAE not working in preload?
// function preload() {
// }

function setup() {
  createCanvas(200, 200);
  // Create a new instance with pretrained model
  cvae = ml5.CVAE('model/quick_draw/manifest.json', modelReady);
  labelP = createP('apple');
  button = createButton('generate');
  button.mousePressed(generateImage);
}

function gotImage(error, result) {
  image(result.image, 0, 0, width, height);
}

function modelReady() {
  // All the possible labeles
  console.log(cvae.labels);
  cvae.generate('apple', gotImage);
}

function generateImage() {
  let label = random(cvae.labels);
  labelP.html(label);
  cvae.generate(label, gotImage);
}
