// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
Webcam Classification
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

// Create the classifier and passing the video as the
// first argument and the getClassification function as the second
const classifier = new ml5.ImageClassifier(video, getClassification);

// A function that calls the predict method in the classifier
function getClassification() {
  // Call the predict method and use a callback to handle the results
  classifier.predict(function(results) {
    result.innerText = results[0].className;
    probability.innerText = results[0].probability;
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