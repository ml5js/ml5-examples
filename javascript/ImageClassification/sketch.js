// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Simple Image Classification using MobileNet
This example uses promises to create the classifier
=== */

const image = document.getElementById('image'); // The image we want to classify
const result = document.getElementById('result'); // The result tag in the HTML
const probability = document.getElementById('probability'); // The probability tag in the HTML

// Initialize the Image Classifier method with MobileNet
ml5.imageClassifier('MobileNet')
  .then(classifier => classifier.predict(image))
  .then(results => {
    result.innerText = results[0].className;
    probability.innerText = results[0].probability.toFixed(4);
  });
