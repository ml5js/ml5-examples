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
// let img;

function setup() {
  createCanvas(640, 480);

  // load up your video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); // Hide the video element, and just show the canvas

  // using video
  uNet = ml5.uNet('face', video, modelReady);

  // add an image to the dom to mirror the unet results to
  // img = createImg('');
  // img.size(width, height)
  
}

function modelReady() {
  select('#status').html('Model Loaded');
  
  // apply the segmentation on the video
  uNet.segment(video, gotResult);
}

function gotResult(error, result) {
  // if there's an error return it
  if(error) return error;

  // set the result to the global segmentation variable
  segmentation = result;
  // // set the src of our image to the result
  // img.elt.src = result.src;

  // use the loadImage function to convert base64 src to 
  // p5 image then render that on the canvas
  // using the renderImage() function
  loadImage(segmentation.src, renderImage);
}

// callback that takes the segmented result from uNet and 
// renders to canvas
function renderImage(segmentedImage){
  image(segmentedImage, 0, 0, width, height)
}

function draw() {
  // only draw to the canvas if there's a result
  
  if(segmentation){
    uNet.segment(video, gotResult);
  } else {
    text("image processing...", width/2, height/2)
  }
  

}