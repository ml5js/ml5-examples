// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Load a pre-trained Sound Classifier using Feature Extraction with SpeechCommands. Built with p5.js
This example uses a callback pattern to create the classifier
=== */

const checkpoint = 'https://storage.googleapis.com/tm-speech-commands/Yining-audio-example';
// You can also load the model from the `models` folder
// In the folder, there should be `metadata.json` and `model.json`
// const checkpoint = `${document.location.href}models`;
const options = {
  probabilityThreshold: 0.5,
  overlapFactor: 0.75
};
// Two variable to hold the label and confidence of the result
let label;
let confidence;

function setup() {
  noCanvas();
  // Extract the already learned features from SpeechCommands18w
  featureExtractor = ml5.featureExtractor('SpeechCommands18w', modelReady);

  // Create 'label' and 'confidence' div to hold results
  label = createDiv('Label: ...');
  confidence = createDiv('Confidence: ...');
}

function modelReady() {
  // Create a new classifier with options using those features
  classifier = featureExtractor.classification(options);
  classifier.load(checkpoint, function() {
    console.log('model loaded');
    classify();
  });
}

// Classify the sound from the microphone.
function classify() {
  classifier.classify(gotResults);
}

// A function to run when we get any errors and the results
function gotResults(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  // Show the first label and confidence
  label.html('Label: ' + results[0].label);
  confidence.html('Confidence: ' + nf(results[0].confidence, 0, 2)); // Round the confidence to 0.01
}
