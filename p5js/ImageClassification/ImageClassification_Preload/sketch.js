// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

// A variable to hold the Image Classifier
let classifier;

// A variable to hold the image we want to classify
let img;

function preload() {
  // Initialize the Image Classifier method with MobileNet.
  classifier = ml5.imageClassifier('MobileNet');
  // Set Status after the model is loaded
  select('#status').html('Model Loaded');
  // Load the image
  img = loadImage('bird.jpg');
}

function setup() {
  noCanvas();
  classifier.classify(img, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(err, results) {
  // Display error in the console
  if (err) {
    console.error(err);
  }
  // The results are in an array ordered by confidence.
  select('#result').html(results[0].label);
  select('#probability').html(nf(results[0].confidence, 0, 2));
}
