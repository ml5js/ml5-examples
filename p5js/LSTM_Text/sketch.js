// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
LSTM_Simple
Simple LSTM Generator example with p5.js
This uses a pre-trained model on a corpus of Hemingway
=== */

// Create the LSTM Generator passing it the model directory
const lstm = new ml5.LSTMGenerator('models/hemingway/', modelReady);

let textInput;
let lengthSlider;
let tempSlider;
let button;

function modelReady() {
  select('#status').html('Model Loaded');
}

function setup() {
  noCanvas();

  // Grab the DOM elements
  textInput = select('#textInput');
  lengthSlider = select('#lenSlider');
  tempSlider = select('#tempSlider');
  button = select('#generate');

  // DOM element events
  button.mousePressed(generate);
  lengthSlider.input(updateSliders);
  tempSlider.input(updateSliders);

  // Update the slider values
  function updateSliders() {
    select('#length').html(lengthSlider.value())
    select('#temperature').html(tempSlider.value())
  }
}

// Generate new text
function generate() {
  // Update the status log
  select('#status').html('Generating...');

  // Grab the original text
  let original = textInput.value();
  // Make it to lower case
  let txt = original.toLowerCase();

  // Check if there's something to send
  if (txt.length > 0) {
    // This is what the LSTM generator needs
    // Seed text, temperature, length to outputs
    // TODO: What are the defaults?
    let data = {
      seed: txt,
      temperature: tempSlider.value(),
      length: lengthSlider.value()
    };

    // Generate text with the lstm
    lstm.generate(data, gotData);

    // When it's done
    function gotData(result) {
      // Update the status log
      select('#status').html('Ready!');
      select('#result').html(txt + result.generated);
    }
  }
}