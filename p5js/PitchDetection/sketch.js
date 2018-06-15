// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Basic Pitch Detection
=== */

// Crepe variables
let crepe;
let mic;
let fft

const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

let frequencyP;

function startPitch() {
  crepe = ml5.pitchDetection('Crepe', getAudioContext(), mic.stream);
}

function setup() {
  noCanvas();
  frequencyP = createP('sing!');
  mic = new p5.AudioIn();
  mic.start(startPitch);
  fft = new p5.FFT();
}

function draw() {
  if (crepe) {
    let pitch = crepe.getResults();
    if (pitch) {
      frequencyP.html(pitch['result']);
    }
  }
}
