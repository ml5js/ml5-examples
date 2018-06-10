// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using Mobilenet and p5.js
=== */

// Initialize the Image Classifier method with Mobilenet
const classifier = new ml5.ImageClassifier('Mobilenet');

// A variable to hold the image we want to classify
let img;

function setup() {
  noCanvas();
  // Load the image
  img = createImg('images/bird.jpg', imageReady);
  img.size(400, 400);
}

// When the image has been loaded,
// get a prediction for that image
function imageReady() {
  classifier.predict(img, gotResult);
  // You can also specify the amount of classes you want
  // classifier.predict(img, 10, gotResult);
}

// A function to run when we get the results
function gotResult(results) {
  // The results are in an array ordered by probability.
  select('#result').html(results[0].className);
  select('#probability').html(nf(results[0].probability, 0, 2));
}
