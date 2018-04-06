/* ===
ML5 Example
ImageNet_Simple
Simple Image Classification using p5.js
=== */

// Initialize the ImageNet method with the MobileNet model.
const classifier = new ml5.ImageClassifier('MobileNet');

let img;
let currentIndex = 0;
let allImages = [];
let display = true;
let displayTime = 750;
let predictions = [];

function appendImages() {
  for (i = 0; i < data.images.length; i++) {
    imgPath = data.images[i];
    allImages.push(getImagePath(imgPath));
  }
}

function preload() {
  data = loadJSON('/assets/data.json');
}

function getImagePath(imgPath) {
  fullPath = 'images/dataset/';
  fullPath = fullPath + imgPath;
  return fullPath
}

function drawNextImage() {
  img.attribute('src', allImages[currentIndex], imageReady);
}

function setup() {
  noCanvas();
  appendImages();
  img = createImg(allImages[0], imageReady);
}


// When the image has been loaded,
// get a prediction for that image
function imageReady() {
  classifier.predict(img.elt, 10, gotResult);
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
function gotResult(results) {
  information = {
    "name": allImages[currentIndex],
    "result": results,
  }
  predictions.push(information);

  if (display) {
    // The results are in an array ordered by probability.
    select('#result').html(results[0].label);
    select('#probability').html(nf(results[0].probability, 0, 2));
    // Can be changed with the displayTime variable.
    setTimeout(removeImage, displayTime);
  } else {
    removeImage();
  }
}