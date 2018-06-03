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
  // Create a camera input
  video = createCapture(VIDEO);
  // Create the classifier with the video element
  classifier = new ml5.ImageClassifier(video);
  // Call the classifyFrame function to start classifying the video
  classifyFrame();
}

// Get a prediction for the current video frame
function classifyFrame() {
  classifier.predict(gotResult);
  // You can also specify the amount of classes detected you want
  // classifier.predict(10, gotResult)
}

// When we get a result
function gotResult(results) {
  // The results are in an array ordered by probability.
  select('#result').html(results[0].className);
  select('#probability').html(nf(results[0].probability, 0, 2));
  classifyFrame();
}