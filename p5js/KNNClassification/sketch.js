// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
KNN Classification on Webcam Images with mobileNet. Built with p5.js
=== */

const K = 3;
let mobileNet;
let knnClassifier;
let video;
let aExamples = 0;
let bExamples = 0;
let cExamples = 0;

function setup() {
  noCanvas();
  // Create a video element
  video = createCapture(VIDEO);
  // Append it to the videoContainer DOM element
  video.parent('videoContainer');
  // Extract the already learned features from MobileNet
  mobileNet = ml5.imageClassifier('MobileNet');
  // Create a KNN classifier
  knnClassifier = ml5.KNNClassifier();
  // Create the UI buttons
  createButtons();
}

function getVideoFeatures() {
  return mobileNet.getFeatures(video);
}

// Add the current frame from the video to the classifier
function addExample(classIndex) {
  // Get the features of the input video
  let features = getVideoFeatures();
  knnClassifier.addExample(features, classIndex);
}

// Predict the current frame.
async function predictClass() {
  // Get the features of the input video
  let features = getVideoFeatures();
  let res = await knnClassifier.predictClass(features, K);
  gotResults(res);
}

// A util function to create UI buttons
function createButtons() {
  // When the A button is pressed, add the current frame
  // from the video with a label of "a" to the classifier
  buttonA = select('#aButton');
  buttonA.mousePressed(function() {
    addExample(0);
    select('#amountOfAExamples').html(aExamples++);
  });

  // When the B button is pressed, add the current frame
  // from the video with a label of "b" to the classifier
  buttonB = select('#bButton');
  buttonB.mousePressed(function() {
    addExample(1);
    select('#amountOfBExamples').html(bExamples++);
  });

  // When the C button is pressed, add the current frame
  // from the video with a label of "c" to the classifier
  buttonC = select('#cButton');
  buttonC.mousePressed(function() {
    addExample(2);
    select('#amountOfCExamples').html(cExamples++);
  });

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(predictClass);
}

// Show the results
function gotResults(result) {
  select('#result').html(result.classIndex);
  select('#confidence').html(`${result.confidences[result.classIndex] * 100} %`);
  
  // Call predictClass function again after 0.5 second
  setTimeout(function(){	
    predictClass();
  }, 500);
}
