// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
LSTM Generator example with p5.js
This uses a pre-trained model on a corpus of Virginia Woolf
For more models see: https://github.com/ml5js/ml5-data-and-training/tree/master/models/lstm
=== */

let lstm;
let textInput;
let tempSlider;
let button;
let c=undefined;
let h=undefined;
let modelIsReady=false
let runningInference=false;

function setup() {
  noCanvas();

  // Create the LSTM Generator passing it the model directory
  lstm = ml5.LSTMGenerator('./models/woolf/', modelReady);

  // Grab the DOM elements
  textInput = select('#textInput');
  tempSlider = select('#tempSlider');
  button = select('#generate');

  // textInput.value("The meaning of life is ")
  textInput.value("As he w")

  // DOM element events
  button.mousePressed(generateOnce);
  tempSlider.input(updateSliders);
}

// Update the slider values
function updateSliders() {
  select('#temperature').html(tempSlider.value());
}

function modelReady() {
  select('#status').html('Model Loaded ' + new Date().toLocaleString());
  generate(true); // generate on startup seeding full text
  modelIsReady = true;
}

function generateOnce() {
    generate(select('#seedFull').checked()); // generate seeding just last character
}

// Generate new text
function generate(seedFull) {
  runningInference = true;

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
    seed = txt.slice(-1);
    seed = (seedFull ? txt : txt.slice(-1));
    let data = {
      seed: seed,
      temperature: tempSlider.value(),
      length: 1,
      c:c,
      h:h,
    };

    // Generate text with the lstm
    lstm.generate(data, gotData);

    // When it's done
    function gotData(err, result) {
      if(result) {
        console.log(result)
        textInput.value(txt + result.sample);
        c = result.c
        h = result.h
      }
      // Update the status log
      status = 'Ready! '
      status += new Date().toLocaleString()
      status += " | seed: " + seed
      status += " | r: " + result + " | c: " + result.c + " | h: " + result.h;
      select('#status').html(status);
    }
    runningInference = false;
  }
}

function draw() {
    // simulate pressing generate button every frame
    // TODO: this doesn't work, doesn't update UI
    if(select('#autoGenerate').checked() && modelIsReady && !runningInference) generateOnce();
}
