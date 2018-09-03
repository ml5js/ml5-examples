// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
KNN Classification on Webcam Images with mobileNet. Built with p5.js
=== */

const labels = ['A', 'B', 'C'];
let video;
let featureExtractor;
let knnClassifier;

function setup() {
  noCanvas();
  // Create a video element
  video = createCapture(VIDEO);
  // Append it to the videoContainer DOM element
  video.parent('videoContainer');
  // Create a featureExtractorthat can extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  // Create a KNN classifier
  knnClassifier = ml5.KNNClassifier();
  // Create the UI buttons
  createButtons();
}

function modelReady(){
  console.log('FeatureExtractor(mobileNet model) loaded')
}

// Add the current frame from the video to the classifier
function addExample(classIndex) {
  // Get the features of the input video
  const features = featureExtractor.getFeatures(video);
  knnClassifier.addExample(features, classIndex);
  updateExampleCounts();
}

// Predict the current frame.
async function predictClass() {
  const numClasses = knnClassifier.getNumClasses();
  if (numClasses <= 0) {
    console.log('There is no examples in any class');
    return;
  }
  // Get the features of the input video
  let features = featureExtractor.getFeatures(video);
  let res = await knnClassifier.predictClass(features);
  gotResults(res);
}

// A util function to create UI buttons
function createButtons() {
  // When the A button is pressed, add the current frame
  // from the video with a label of "a" to the classifier
  buttonA = select('#addClassA');
  buttonA.mousePressed(function() {
    addExample(0);
  });

  // When the B button is pressed, add the current frame
  // from the video with a label of "b" to the classifier
  buttonB = select('#addClassB');
  buttonB.mousePressed(function() {
    addExample(1);
  });

  // When the C button is pressed, add the current frame
  // from the video with a label of "c" to the classifier
  buttonC = select('#addClassC');
  buttonC.mousePressed(function() {
    addExample(2);
  });

  // Reset buttons
  resetBtnA = select('#resetA');
  resetBtnA.mousePressed(function() {
    clearClass(0);
  });
	
  resetBtnB = select('#resetB');
  resetBtnB.mousePressed(function() {
    clearClass(1);
  });
	
  resetBtnC = select('#resetC');
  resetBtnC.mousePressed(function() {
    clearClass(2);
  });

  // Predict button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(predictClass);

  // Clear all classes button
  buttonClearAll = select('#clearAll');
  buttonClearAll.mousePressed(clearAllClasses);

  // Load saved classifier dataset
  buttonSetData = select('#load');
  buttonSetData.mousePressed(loadDataset);

  // Get classifier dataset
  buttonGetData = select('#save');
  buttonGetData.mousePressed(saveDataset);
}

// Show the results
function gotResults(result) {
  const confideces = result.confidences;
  select('#result').html(labels[result.classIndex]);
  select('#confidence').html(`${confideces[result.classIndex] * 100} %`);

  select('#confidenceA').html(`${confideces[0] ? confideces[0] * 100 : 0} %`);
  select('#confidenceB').html(`${confideces[1] ? confideces[1] * 100 : 0} %`);
  select('#confidenceC').html(`${confideces[2] ? confideces[2] * 100 : 0} %`);
  
  // Call predictClass function again after 0.5 second
  setTimeout(function(){
    predictClass();
  }, 500);
}

// Update the example count for each class	
function updateExampleCounts() {
  const counts = knnClassifier.getClassExampleCount();
  select('#exampleA').html(counts[0] || 0);
  select('#exampleB').html(counts[1] || 0);
  select('#exampleC').html(counts[2] || 0);
}

// Clear the examples in one class
function clearClass(classIndex) {
  knnClassifier.clearClass(classIndex);
  updateExampleCounts();
}

// Clear all the examples in all classes
function clearAllClasses() {
  knnClassifier.clearAllClasses();
  updateExampleCounts();
}

// Save dataset as myKNNDataset.json
function saveDataset() {
  knnClassifier.saveDataset('myKNNDataset');
}

// Load dataset to the classifier
function loadDataset() {
  knnClassifier.loadDataset('./myKNNDataset.json', updateExampleCounts);
}
