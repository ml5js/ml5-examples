// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trianed customized model and p5.js
This example uses a callback pattern to create the classifier
=== */

const checkpoint = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/eyeo-test-yining/model.json';
let classifier;
let video;
let resultsP;

function setup() {
  noCanvas();
  // Create a camera input
  video = createCapture(VIDEO);
  // Initialize the Image Classifier method with a pre-trained customized model and the video as the second argument
  classifier = ml5.imageClassifier(checkpoint, video, modelReady);
  // If you would like to load the model from local files
  // classifier = ml5.imageClassifier('model/image-model.json', video, modelReady);
  resultsP = createP('Loading model and video...');
}

function modelReady() {
  console.log('Model Ready');
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by confidence.
  resultsP.html('Label: ' + results[0].label + ' ' + nf(results[0].confidence, 0, 2));
  classifyVideo();
}
