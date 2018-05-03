// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
Image Classifier with Transfer Learning example with p5.js
=== */

let classifier;
let video;
let loss;
let dogImages = 0;
let catImages = 0;

// Default options for training
const options = {
  learningRate: 0.0001,
  hiddenUnits: 100,
  epochs: 20,
  numClasses: 2,
  batchSize: 0.4,
};

function setup() {
  noCanvas();
  // Create a video element
  video = createCapture(VIDEO, onVideoLoaded);
  // Append it to the videoContainer DOM element
  video.parent('videoContainer');
  // Create the UI buttons
  createButtons();
}

// When the video is loaded, 
function onVideoLoaded() {
  // Create the image classifier with the video and training options
  classifier = new ml5.ImageClassifier(video.elt, options, modelLoaded);
}

// A function to be called when the model has been loaded
function modelLoaded() {
  select('#loading').html('Model loaded!');
}

// Add the current frame from the video to the classifier
function addImage(label) {
  classifier.addImage(label);
}

// Predict the current frame.
function predict() {
  classifier.predict(gotResults);
}

// A util function to create UI buttons
function createButtons() {
  // Add image as cat class
  buttonA = select('#buttonA');
  buttonA.mousePressed(function() {
    addImage('cat');
    select('#exampleA').html(catImages++);
  });

  // Add image as dog class
  buttonB = select('#buttonB');
  buttonB.mousePressed(function() {
    addImage('dog');
    select('#exampleB').html(dogImages++);
  });

  // Train Button
  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Done Training! Final Loss: ' + loss);
      }
    });
  });

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(predict);
}

// Show the results
function gotResults(result) {
  select('#result').html(result);
  setTimeout(function(){
    predict();
  }, 50);
}