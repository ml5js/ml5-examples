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

let lstm;
let textInput; // handle to text input
let tempSlider; // handle to temperature slider

let modelIsReady = false
let runningInference = false;
let autoGenerating = false;

let currentText = ''; // full generated text

let canvasHeight = 100;

function setup() {
  inputCanvas = createCanvas(windowWidth, canvasHeight);
  inputCanvas.parent('canvasContainer');

  // Create the LSTM Generator passing it the model directory
  lstm = ml5.LSTMGenerator('./models/woolf/', modelReady);

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

function windowResized() {
  resizeCanvas(windowWidth, canvasHeight);
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
  if(currentText == '') {
    generateWithFullInputText();
  } else {
    generateWithSingleChar();
  }
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
    lstm.generate(data, gotData);

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
  background(230);
  if(modelIsReady) {
    if(autoGenerating) generateWithSingleChar();

    // if we have probabilities, and same number as vocabulary...
    if(lstm.probabilities.length > 0) {
      if(lstm.probabilities.length == lstm.vocabSize) {
        barWidth = width/lstm.vocabSize;
        maxBarHeight = height - 15;

        // loop through all probabilities and draw
        let hiProbColor = color(255, 0, 0);  // color for high probabilities
        let loProbColor = color(100, 150, 255);  // color for high probabilities
        textSize(10);
        for(let i = 0; i < lstm.vocabSize; i++) {
          let prob = lstm.probabilities[i];
          let char = Object.keys(lstm.vocab).find(key => lstm.vocab[key] === i);
          let x = i * (width - barWidth) / (lstm.vocabSize - 1);
          fill(lerpColor(loProbColor, hiProbColor, prob));
          rect(x, maxBarHeight, barWidth, -prob * maxBarHeight);
          fill(0, 255);
          text(char, x + 1, height - 5);
        }

        // if mouse is over canvas...
        if(mouseY > 0 && mouseY < height) {
          // draw character for probability under mouse
          let i = Math.floor(mouseX / barWidth); // index of probability bin under mouse
          textSize(32);
          fill(0, 255);
          let char = Object.keys(lstm.vocab).find(key => lstm.vocab[key] === i);
          text(char, mouseX + 5, mouseY);

          // draw rectangle stroke around probability bin under mouse
          noFill();
          let x = i * (width - barWidth) / (lstm.vocabSize - 1);
          rect(x, 0, barWidth, height);
        }
      } else {
        console.log('WARNING: lstm.probabilities.length != lstm.vocabSize. How is that possible!?', lstm.probabilities.length, lstm.vocabSize)
      }
    }
  }
}
