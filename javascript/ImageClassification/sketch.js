// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Simple Image Classification using Mobilenet
=== */

const image = document.getElementById('image'); // The image we want to classify
const result = document.getElementById('result'); // The result tag in the HTML
const probability = document.getElementById('probability'); // The probability tag in the HTML

// Initialize the Image Classifier method with Mobilenet
const classifier = new ml5.ImageClassifier('Mobilenet');

// Make a prediction with the selected image
// This will return an array with a default of 10 options with their probabilities
classifier.predict(image, function(results) {
  result.innerText = results[0].className;
  probability.innerText = results[0].probability.toFixed(4);
});

// Optionally, you can give it a number of responses you want as the second argument and then callback
// classifier.predict(image, 5 ,function(results) {
//   result.innerText = results[0].className;
//   probability.innerText = results[0].probability;
// });