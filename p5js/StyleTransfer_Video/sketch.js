// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Style Transfer Mirror Example using p5.js
This uses a pre-trained model of The Great Wave off Kanagawa and Udnie (Young American Girl, The Dance)
=== */

let fastStyle;
let video;
let isTransfering = false;
let resultImg;

function setup() {
  createCanvas(300, 300).parent('canvasContainer');

  video = createCapture(VIDEO);
  video.hide();

  // The results image from the style transfer
  resultImg = createImg('');
  resultImg.hide();

  // The button to start and stop the transfer process
  select('#startStop').mousePressed(startStop);

  // Create a new Style Transfer method with a defined style.
  // We give the video as the second argument
  style = ml5.styleTransfer('models/udnie', video, modelLoaded);
}

function draw(){
  // Switch between showing the raw camera or the style
  if (isTransfering) {
    image(resultImg, 0, 0, 300, 300);
  } else {
    image(video, 0, 0, 300, 300);
  }
}

// A function to call when the model has been loaded.
function modelLoaded() {
  select('#status').html('Model Loaded');
}

// Start and stop the transfer process
function startStop() {
  if (isTransfering) {
    select('#startStop').html('Start');
  } else {
    select('#startStop').html('Stop');
    // Make a transfer using the video
    style.transfer(gotResult); 
  }
  isTransfering = !isTransfering;
}

// When we get the results, update the result image src
function gotResult(img) {
  resultImg.attribute('src', img.src);
  if (isTransfering) {
    style.transfer(gotResult); 
  }
}
