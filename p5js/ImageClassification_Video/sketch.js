// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
ImageNet_Camera
Video Camera Classification using p5.js
=== */

// Initialize the ImageNet method with the MobileNet model.
const classifier = new ml5.ImageClassifier('MobileNet');
let video;

function setup() {
  noCanvas();
  // Load the camera and call guess() once it has loaded.
  video = createCapture(VIDEO, guess);
}

// Get a prediction for the current video frame
function guess() {
  classifier.predict(video.elt, 10, gotResult);
}

function gotResult(results) {
  // The results are in an array ordered by probability.
  select('#result').html(results[0].label);
  select('#probability').html(nf(results[0].probability, 0, 2));
  setTimeout(guess, 250);
}
