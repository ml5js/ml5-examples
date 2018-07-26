// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Multiple Image classification using MobileNet and p5.js
=== */

// Initialize the Image Classifier method using MobileNet
const classifier = ml5.imageClassifier('MobileNet', modelReady);

let img;
let currentIndex = 0;
let allImages = [];
let display = true;
let displayTime = 750;
let predictions = [];

function preload() {
  data = loadJSON('assets/data.json');
}

function setup() {
  noCanvas();
  appendImages();
  img = createImg(allImages[0], imageReady);
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function appendImages() {
  for (i = 0; i < data.images.length; i++) {
    imgPath = data.images[i];
    allImages.push('images/dataset/' + imgPath);
  }
}

function drawNextImage() {
  img.attribute('src', allImages[currentIndex], imageReady);
}

// When the image has been loaded,
// get a prediction for that image
function imageReady() {
  classifier.predict(img, gotResult);
}

function savePredictions() {
  predictionsJSON = {
    "predictions": predictions
  }
  saveJSON(predictionsJSON, 'predictions.json');
}

function removeImage() {
  currentIndex++;
  if (currentIndex <= allImages.length - 1) {
    drawNextImage();
  } else {
    savePredictions();
  }
}

// When we get the results
function gotResult(err, results) {
  // If there is an error, show in the console
  if (err) {
    console.error(err);
  }

  information = {
    "name": allImages[currentIndex],
    "result": results,
  }
  predictions.push(information);
  if (display) {
    // The results are in an array ordered by probability.
    select('#result').html(results[0].className);
    select('#probability').html(nf(results[0].probability, 0, 2));
    // Can be changed with the displayTime variable.
    setTimeout(removeImage, displayTime);
  } else {
    removeImage();
  }
}
