// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
A piano using pitch Detection with CREPE
=== */

// Crepe variables
let crepe;
const voiceLow = 100;
const voiceHigh = 500;
let audioStream;
let fft;

// Keyboard variables
const cornerCoords = [10, 40];
const rectWidth = 90;
const rectHeight = 300;
const keyRatio = 0.58;
const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Text variables
let currentNote = '';
let currentText = '';
let currentFreq = '';
const textCoordinates = [(rectWidth * 8) + cornerCoords[0], 150]


function createCrepe() {
  crepe = ml5.Crepe(getAudioContext(), audioStream.stream);
  loop();
}

function getNoteFromMidiNum(midiNum) {
  let note = scale[midiNum % 12];
  return note;
}

function setup() {
  createCanvas(1200, 400);
  noLoop();
  audioStream = new p5.AudioIn(function(err) {
    console.error(err);
  });
  audioStream.start(createCrepe, function(err) {
    console.error(err);
  });
  fft = new p5.FFT();
}

function parse(result) {
  let splitResult = result.split(" Hz");
  return float(splitResult[0])
}

function drawKeyboard() {
  background(255);
  let whiteKeyCounter = 0;
  strokeWeight(2);
  stroke(50);
  // Wite keys
  for (let i = 0; i < scale.length; i++) {
    if (scale[i].indexOf('#') == -1) {
      if (scale[i] == currentNote) {
        fill(200);
      } else {
        fill(255);
      }
      rect(cornerCoords[0] + (whiteKeyCounter * rectWidth), cornerCoords[1], rectWidth, rectHeight);
      whiteKeyCounter++;
    }
  }
  whiteKeyCounter = 0;

  // Black keys
  for (let i = 0; i < scale.length; i++) {
    if (scale[i].indexOf('#') > -1) {
      if (scale[i] == currentNote) {
        fill(100);
      } else {
        fill(0);
      }
      rect(cornerCoords[0] + (whiteKeyCounter * rectWidth) - (rectWidth / 3), cornerCoords[1], rectWidth * keyRatio, rectHeight * keyRatio);
    } else {
      whiteKeyCounter++;
    }
  }
}

function drawText() {
  fill(50);
  noStroke();
  textSize(18);
  text("Make a noise (i.e. sing, hum, whistle, play an instrument) to have the detector predict your pitch!", 10, 30);
  textSize(32);
  text(currentText, textCoordinates[0], textCoordinates[1]);
  if (currentNote != '') {
    text("NOTE: " + currentNote, rectWidth * 8 + cornerCoords[0], (windowHeight / 2));
    text("FREQUENCY: " + currentFreq + " Hz", rectWidth * 8 + cornerCoords[0], (windowHeight / 2) + 50);
  }
}

function draw() {
  drawKeyboard();
  if (!crepe) {
    console.log("Crepe not yet initialized");
    return;
  }
  let results = crepe.getResults();
  if (results) {
    if (results['result'] == "no voice") {
      currentText = 'No input detected';
      currentNote = '';
    } else {
      result = parse(results['result']);
      currentText = 'Input detected';
      currentFreq = result;
      let midiNum = freqToMidi(result);
      currentNote = getNoteFromMidiNum(midiNum);
    }
  }
  drawText();
}
