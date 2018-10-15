// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
KNN Classification on Webcam Images with mobileNet. Built with p5.js
=== */
let video;
let featureExtractor;
// Create a KNN classifier
const knnClassifier = ml5.KNNClassifier();

function setup() {
  noCanvas();
  // Create a video element
  video = createCapture(VIDEO);
  // Append it to the videoContainer DOM element
  video.parent('videoContainer');
  // Create a featureExtractor that can extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  // Create the UI buttons
  createButtons();
}

function modelReady(){
  select('#status').html('FeatureExtractor(mobileNet model) Loaded')
}

// Add the current frame from the video to the classifier
function addExample(label) {
  // Get the features of the input video
  const features = featureExtractor.infer(video);
  // You can also pass in an optional endpoint, defaut to 'conv_preds'
  // const features = featureExtractor.infer(video, 'conv_preds');
  // You can list all the endpoints by calling the following function
  // console.log('All endpoints: ', featureExtractor.mobilenet.endpoints)

  // Add an example with a label to the classifier
  knnClassifier.addExample(features, label);
  updateExampleCounts();
}

// Predict the current frame.
function predictClass() {
  // Get the total number of classes from knnClassifier
  const numClasses = knnClassifier.getNumClasses();
  if (numClasses <= 0) {
    console.error('There is no examples in any class');
    return;
  }
  // Get the features of the input video
  const features = featureExtractor.infer(video);

  // Use knnClassifier to predict which class do these features belong to
  // You can pass in a callback function `gotResults` to knnClassifier.predictClass function
  knnClassifier.predictClass(features, gotResults);
  // You can also pass in an optional K value, K default to 3
  // knnClassifier.predictClass(features, 3, gotResults);

  // You can also use the following async/await function to call knnClassifier.predictClass
  // Remember to add `async` before `function predictClass()`
  // const res = await knnClassifier.predictClass(features);
  // gotResults(null, res);
}

// A util function to create UI buttons
function createButtons() {
  // When the A button is pressed, add the current frame
  // from the video with a label of "rock" to the classifier
  buttonA = select('#addClassRock');
  buttonA.mousePressed(function() {
    addExample('Rock');
  });

  // When the B button is pressed, add the current frame
  // from the video with a label of "paper" to the classifier
  buttonB = select('#addClassPaper');
  buttonB.mousePressed(function() {
    addExample('Paper');
  });

  // When the C button is pressed, add the current frame
  // from the video with a label of "scissor" to the classifier
  buttonC = select('#addClassScissor');
  buttonC.mousePressed(function() {
    addExample('Scissor');
  });

  // Reset buttons
  resetBtnA = select('#resetRock');
  resetBtnA.mousePressed(function() {
    clearClass(0);
  });
	
  resetBtnB = select('#resetPaper');
  resetBtnB.mousePressed(function() {
    clearClass(1);
  });
	
  resetBtnC = select('#resetScissor');
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
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }

  if (result.confidencesByLabel) {
    const confideces = result.confidencesByLabel;
    if (result.classLabel) {
      select('#result').html(result.classLabel);
      select('#confidence').html(`${confideces[result.classLabel] * 100} %`);
    }

    select('#confidenceRock').html(`${confideces['Rock'] ? confideces['Rock'] * 100 : 0} %`);
    select('#confidencePaper').html(`${confideces['Paper'] ? confideces['Paper'] * 100 : 0} %`);
    select('#confidenceScissor').html(`${confideces['Scissor'] ? confideces['Scissor'] * 100 : 0} %`);
  }

  predictClass();
}

// Update the example count for each class	
function updateExampleCounts() {
  const counts = knnClassifier.getClassExampleCountByLabel();

  select('#exampleRock').html(counts['Rock'] || 0);
  select('#examplePaper').html(counts['Paper'] || 0);
  select('#exampleScissor').html(counts['Scissor'] || 0);
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
