// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
Image Classifier with Transfer Learning example with p5.js
=== */

let featureExtractor;
let regressor;
let video;
let loss;
let slider;
let addSample;
let samples = 0;
let positionX = 140;

function setup() {
  createCanvas(340, 280);
  // Create a video element
  video = createCapture(VIDEO);
  // Append it to the videoContainer DOM element
  video.hide();
  // Extract the features from Mobilenet
  featureExtractor = ml5.featureExtractor('Mobilenet', modelReady);
  // Create a new regressor using those features and give the video we want to use
  regressor = featureExtractor.regression(video);
  // Create the UI buttons
  createButtons();
  noStroke();
  fill(255, 0, 0);
}

function draw() {
  image(video, 0, 0, 340, 280);
  rect(positionX, 120, 50, 50);
}

// A function to be called when the model has been loaded
function modelReady() {
  select('#loading').html('Model loaded!');
}

// Classify the current frame.
function predict() {
  regressor.predict(gotResults);
}

// A util function to create UI buttons
function createButtons() {
  slider = select('#slider');
  // When the Dog button is pressed, add the current frame
  // from the video with a label of "dog" to the classifier
  addSample = select('#addSample');
  addSample.mousePressed(function() {
    regressor.addImage(slider.value());
    select('#amountOfSamples').html(samples++);
  });

  // Train Button
  train = select('#train');
  train.mousePressed(function() {
    regressor.train(function(lossValue) {
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
  positionX = map(result, 0, 1, 0, width);
  slider.value(result);
  predict();
}