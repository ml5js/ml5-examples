// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

let classifier;
let video;
let currentWord;
let currentIndex = 0;
let isPlaying = false;
const words = ['banana', 'watch', 'shoe', 'book', 'cellphone', 'keyboard', 'shirt', 'pants', 'cup'];
// Create a new p5.speech object
// You can also control the Language, Rate, Pitch and Volumn of the voice
// Read more at http://ability.nyu.edu/p5.js-speech/
const myVoice = new p5.Speech();

function setup() {
  noCanvas();
  // Create a camera input
  video = createCapture(VIDEO);
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);

  select('#start').mousePressed(() => {
    playNextWord();
  });

  select('#next').mousePressed(() => {
    currentIndex++;
    if (currentIndex >= words.length) {
      currentIndex = 0;
    }
    playNextWord();
  });

  myVoice.onEnd = speechEnded;
}

function playNextWord() {
  isPlaying = true;
  currentWord = words[currentIndex];
  select('#instruction').html(`Go find ${currentWord}!`);
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

function modelReady() {
  // Change the status of the model once its ready
  select('#status').html('Model Loaded');
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.predict(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by probability.
  const result = results[0].className;
  const oneWordRes = result.split(',')[0];
  const top3Res = results.map(r => r.className);
  const ifFound = top3Res.find(r => r.includes(currentWord))
  if (ifFound) {
    isPlaying = false;
    select('#message').html(`You found ${currentWord}!`);
    myVoice.speak(`You found ${currentWord}!`);
  } else {
    select('#message').html(`I see ${oneWordRes}`);
    myVoice.speak(`I see ${oneWordRes}`);
  }
}

function speechEnded() {
  if (isPlaying) classifyVideo();
}
