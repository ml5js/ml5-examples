// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
CVAE example using p5.js
=== */
let cvae;
let button;
let dropdown;

// function preload() {
//   cvae = ml5.CVAE('model/quick_draw/manifest.json');
// }

function setup() {
  createCanvas(200, 200);
  // Create a new instance with pretrained model
  cvae = ml5.CVAE('model/quick_draw/manifest.json', modelReady);

  // Create a generate button
  button = createButton('generate');
  button.mousePressed(generateImage);
  background(0);
}

function gotImage(error, result) {
  image(result.image, 0, 0, width, height);
}

function modelReady() {
  // Create dropdown with all possible labels
  dropdown = createSelect();
  for (let label of cvae.labels) {
    dropdown.option(label);
  }
}

function generateImage() {
  let label = dropdown.value();
  cvae.generate(label, gotImage);
}
