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

  //
  resultImg = createImg('');
  resultImg.hide();

  // 
  select('#startStop').mousePressed(startStop);

  // 
  style = new ml5.StyleTransfer('models/udnie', video, modelLoaded);
}

function draw(){
  if (isTransfering) {
    image(resultImg, 0, 0, 300, 300);
  } else {
    image(video, 0, 0, 300, 300);
  }
}

function modelLoaded() {
  select('#status').html('Model Loaded');
}

function startStop() {
  if (isTransfering) {
    select('#startStop').html('Start');
  } else {
    select('#startStop').html('Stop');
    style.transfer(gotResult); 
  }
  isTransfering = !isTransfering;
}

function gotResult(img) {
  resultImg.attribute('src', img.src);
  if (isTransfering) {
    style.transfer(gotResult); 
  }
}
