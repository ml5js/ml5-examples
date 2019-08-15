// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using DoodleNet
This example uses a callback pattern to create the classifier
=== */

// Initialize the Image Classifier method with DoodleNet.
let classifier;

// A variable to hold the Webcam video we want to classify
let video;

// Two variable to hold the label and confidence of the result
let label;
let confidence;
let canvas;
let ctx;

async function setup() {
  // Create a 'label' and 'confidence' div to hold results
  label = document.querySelector('#label');
  confidence = document.querySelector('#confidence');
  // Create a camera input
  video = document.querySelector('#myvideo');
  const stream = await navigator.mediaDevices.getUserMedia({ video: true  })
  video.height = 280;
  video.width = 280;
  video.srcObject = stream;
  video.play();

  classifier = await ml5.imageClassifier('DoodleNet', video);

  classifyVideo();
  
}
setup();


// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(gotResult);
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  // Show the first label and confidence
  label.innerHTML =  results[0].label;
  confidence.innerHTML =  results[0].confidence.toFixed(4); // Round the confidence to 0.01
  // Call classifyVideo again
  classifyVideo();
}
