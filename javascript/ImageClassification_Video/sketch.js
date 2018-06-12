// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using Mobilenet
=== */

// Grab elements, create settings, etc.
var video = document.getElementById('video');

// Create a webcam capture
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    video.src = window.URL.createObjectURL(stream);
    video.play();
  });
}

// Initialize the Image Classifier method with Mobilenet passing the video as the
// second argument and the getClassification function as the third
const classifier = ml5.imageClassifier('Mobilenet', video, getClassification);

// A function that calls the predict method in the classifier
function getClassification() {
  // Call the predict method and use a callback to handle the results
  classifier.predict(function(results) {
    result.innerText = results[0].className;
    probability.innerText = results[0].probability.toFixed(4);
    // Call again to create a loop
    getClassification();
  });

  // Optionally, you can also pass the amount of
  // results as the first argument and the callback as the second
  // classifier.predict(5, function(results) {
  //   result.innerText = results[0].className;
  //   probability.innerText = results[0].probability;
  //   // Call again to create a loop
  //   getClassification();
  // });
}