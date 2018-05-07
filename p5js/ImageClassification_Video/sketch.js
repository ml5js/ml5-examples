// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
Webcam Classification using p5.js
=== */

// Initialize the Image Classifier method.
let classifier;
let video;

function setup() {
  noCanvas();
  // Load the camera and call guess() once it has loaded.
  video = createCapture(VIDEO, onVideoLoaded);
}

// When the video is loaded
function onVideoLoaded() {
  // Create the classifier
  classifier = new ml5.ImageClassifier(video);
  // Call the guess function
  guess();
}

// Get a prediction for the current video frame
function guess() {
  classifier.predict(10, gotResult);
}

// When we get a result
function gotResult(results) {
  // The results are in an array ordered by probability.
  select('#result').html(results[0].className);
  select('#probability').html(nf(results[0].probability, 0, 2));
  guess();
}
