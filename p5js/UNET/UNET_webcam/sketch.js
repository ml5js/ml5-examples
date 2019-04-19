// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
UNET example using p5.js
=== */

let video;
let uNet;
let segmentation;

// load uNet model
function preload(){
  uNet = ml5.uNet('face')
}

function setup() {
  createCanvas(640, 480);

  // load up your video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); // Hide the video element, and just show the canvas

  // initial segmentation
  uNet.segment(video, gotResult);

  // Set lower frame rate for segmentation
  frameRate(5)
}

function gotResult(error, result) {
  // if there's an error return it
  if(error) return error;
  // set the result to the global segmentation variable
  segmentation = result;
}

function draw() {
  // only draw to the canvas if there's a result
  if(segmentation){
    image(segmentation.image, 0, 0, width, height)
    uNet.segment(video, gotResult);
  } else {
    text("Loading Model...", width/2, height/2)
  }

}