// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
Simple Image Classification using p5.js
=== */

// Initialize the Image Classifier method
const classifier = new ml5.ImageClassifier();

let img;

function setup() {
  noCanvas();
  // Load the image
  img = createImg('images/bird.jpg', imageReady);
}

// When the image has been loaded,
// get a prediction for that image
function imageReady() {
  classifier.predict(img.elt, 10, gotResult);
}

// When we get the results
function gotResult(results) {
  // The results are in an array ordered by probability.
  select('#result').html(results[0].className);
  select('#probability').html(nf(results[0].probability, 0, 2));
}
