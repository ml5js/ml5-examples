// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
KNN_Image
KNN Image Classifier example with p5.js
=== */

let knn;
let video;

function setup() {
  noCanvas();
  video = createCapture(VIDEO).parent('videoContainer');
  // Create a KNN Image Classifier
  knn = new ml5.KNNImageClassifier(2, 1, modelLoaded, video.elt);
  createButtons();
}

function createButtons() {
  // Save and Load buttons
  save = select('#save');
  save.mousePressed(function() {
    knn.save('test');
  });

 load = select('#load');
 load.mousePressed(function() {
    knn.load('KNN-preload.json', updateExampleCounts);
  });


  // Train buttons
  buttonA = select('#buttonA');
  buttonA.mousePressed(function() {
    train(1);
  });

  buttonB = select('#buttonB');
  buttonB.mousePressed(function() {
    train(2);
  });

  // Reset buttons
  resetBtnA = select('#resetA');
  resetBtnA.mousePressed(function() {
    clearClass(1);
    updateExampleCounts();
  });

  resetBtnB = select('#resetB');
  resetBtnB.mousePressed(function() {
    clearClass(2);
    updateExampleCounts();
  });

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(predict);
}

// A function to be called when the model has been loaded
function modelLoaded() {
  select('#loading').html('Model loaded!');
}

// Train the Classifier on a frame from the video.
function train(category) {
  let msg;
  if (category == 1) {
    msg = 'A';
  } else if (category == 2) {
    msg = 'B';
  }
  select('#training').html(msg);
  knn.addImageFromVideo(category);
  updateExampleCounts();
}

// Predict the current frame.
function predict() {
  knn.predictFromVideo(gotResults);
}

// Show the results
function gotResults(results) {
  let msg;

  if (results.classIndex == 1) {
    msg = 'A';
  } else if (results.classIndex == 2) {
    msg = 'B';
  }
  select('#result').html(msg);

  // Update confidence
  select('#confidenceA').html(results.confidences[1]);
  select('#confidenceB').html(results.confidences[2]);

  setTimeout(function(){
    predict();
  }, 50);
}

// Clear the data in one class
function clearClass(classIndex) {
  knn.clearClass(classIndex);
}

// Update the example count for each class
function updateExampleCounts() {
  let counts = knn.getClassExampleCount();
  select('#exampleA').html(counts[1]);
  select('#exampleB').html(counts[2]);
}