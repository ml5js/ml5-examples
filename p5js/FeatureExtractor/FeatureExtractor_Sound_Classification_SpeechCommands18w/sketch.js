// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Sound Classification using Feature Extraction with SpeechCommands. Built with p5.js
This example uses a callback pattern to create the classifier
=== */

let featureExtractor;
let classifier;
let loss;
let redExamples = 0;
let greenExamples = 0;
let backgroundExamples = 0;
// Two variable to hold the label and confidence of the result
let label;
let confidence;

function setup() {
  noCanvas();

  // Extract the already learned features from SpeechCommands18w
  featureExtractor = ml5.featureExtractor('SpeechCommands18w', modelReady);

  // Set up the UI buttons
  setupButtons();
}

function modelReady() {
  // Create a new classifier with options using those features
  const options = {
    probabilityThreshold: 0.5,
    overlapFactor: 0.75
  };
  classifier = featureExtractor.classification(options);
}

// Classify the sound from the microphone.
function classify() {
  classifier.classify(gotResults);
}

// A util function to create UI buttons
function setupButtons() {
  // When the Red button is pressed, add the current sound from the microphone
  // with a label of "red" to the classifier
  let buttonA = select('#redButton');
  buttonA.mousePressed(function() {
    classifier.addExample('red');
    select('#amountOfRedExamples').html(redExamples++);
  });

  // When the Green button is pressed, add the current sound from the microphone
  // with a label of "green" to the classifier
  let buttonB = select('#greenButton');
  buttonB.mousePressed(function() {
    classifier.addExample('green');
    select('#amountOfGreenExamples').html(greenExamples++);
  });

  // When the Background button is pressed, add the current sound from the microphone
  // with a label of "background" to the classifier
  let buttonC = select('#backgroundButton');
  buttonC.mousePressed(function() {
    classifier.addExample('background');
    select('#amountOfBackgroundExamples').html(backgroundExamples++);
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
  buttonPredict.mousePressed(classify);

  // Save model
  saveBtn = select('#save');
  saveBtn.mousePressed(function() {
    classifier.save();
  });
}

// Show the results
function gotResults(err, results) {
  // Display any error
  if (err) {
    console.error(err);
  }
  if (results && results[0]) {
    select('#result').html(results[0].label);
    select('#confidence').html(results[0].confidence.toFixed(2) * 100 + '%');
  }
}
