// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses))
}

function draw() {
  image(video, 0, 0, width, height);
  strokeWeight(2)

  // Create a pink ellipse for the nose
  fill(213, 0, 143);
  drawPosition('nose');

  // Create a yellow ellipse for the right eye
  fill(255, 215, 0);
  drawPosition('rightEye');

  // Create a yellow ellipse for the left eye
  fill(255, 215, 0);
  drawPosition('leftEye');
}

function drawPosition(positionName){
  
  // we iterate through all poses in case we have multiple poses
  // then render an ellipse for the pose by the name
  /**
   poses = [{
      "pose":{
        "score":0.36784,
        "keypoints":[ a bunch of k:v, ... ],
        "skeleton":[ a bunch of k:v, ... ],
        "nose": {
          "x": 280.30112659863835,
          "y": 194.88652961198673,
          "confidence": 0.9998577833175659
        },
        "leftEye": {
          "x": 327.33367057843395,
          "y": 147.51913381177326,
          "confidence": 0.9991821646690369
        },
        "rightEye": {
          "x": 243.02517476054908,
          "y": 154.62540914846022,
          "confidence": 0.9997193217277527
        },
        ... all of the body parts as properties of the parent pose object
        }
      }
   */
  poses.forEach(pose => {
    let currentPose = pose.pose;
    let selectedPosition = currentPose[positionName];
    ellipse(selectedPosition.x, selectedPosition.y, 20, 20);
  })
}
