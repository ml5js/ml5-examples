// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Stateful LSTM Text Generation Example using p5.js
This uses a pre-trained model on a corpus of Virginia Woolf
For more models see: https://github.com/ml5js/ml5-data-and-training/tree/master/models/lstm
=== */

let rnn;
let textInput; // handle to text input
let tempSlider; // handle to temperature slider

let modelIsReady = false
let runningInference = false;
let autoGenerating = false;

let currentText = ''; // full generated text

function setup() {
  noCanvas();

  // Create the LSTM Generator passing it the model directory
  rnn = ml5.charRNN('./models/woolf/', modelReady);

  // Grab the DOM elements
  textInput = select('#textInput');
  tempSlider = select('#tempSlider');

  // DOM element events
  select('#reset').mousePressed(onResetButton);
  select('#start').mousePressed(onStartButton);
  select('#stop').mousePressed(onStopButton);
  select('#single').mousePressed(onSingleButton);

  tempSlider.input(updateSliders);
}

// Update the slider values
function updateSliders() {
  select('#temperature').html(tempSlider.value());
}

function modelReady() {
  select('#status').html('Model Loaded ' + new Date().toLocaleString());
  modelIsReady = true;
}

// read and seed with full text from input box
function generateWithFullInputText() {
  currentText = textInput.value();
  generate(currentText, false);
}

// seed with last character of current text, preserving state (stateful LSTM)
function generateWithSingleChar() {
  generate(currentText.slice(-1), true);
}

// update UI with current text
function updateTextUI() {
  select('#result').html(currentText);
}

// clear current text, stop auto generating
function onResetButton() {
  currentText = '';
  updateTextUI();
  autoGenerating = false;
}

// start autogenerating
function onStartButton() {
  if(currentText == '') generateWithFullInputText();
  else generateWithSingleChar();
  autoGenerating = true;
}

// stop auto generating
function onStopButton() {
  autoGenerating = false;
}

// generate a single character
function onSingleButton() {
  if(currentText == '') generateWithFullInputText();
  else generateWithSingleChar();
}

// Generate new text
function generate(seed, stateful) {
   // prevent starting inference if we've already started another instance
   // TODO: is there better JS way of doing this?
  if(!runningInference) {
    runningInference = true;

    // Update the status log
    select('#status').html('Generating...');

    let data = {
      seed: seed,
      temperature: tempSlider.value(),
      length: 1,
      stateful: stateful,
    };

    // Generate text with the lstm
    rnn.generate(data, gotData);

    // When it's done
    function gotData(err, result) {
      if(result) {
        // add output sample to current text
        currentText += result.sample;
        updateTextUI();
      }
      // Update the status log
      status = 'Ready! '
      select('#status').html(status);
      runningInference = false;
    }
  }
}

function draw() {
    if(autoGenerating && modelIsReady) generateWithSingleChar();
}
