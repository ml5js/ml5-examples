// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
PoseNet using p5.js
=== */

let w = 315;
let h = 315;
let video;
let poseNet;
let poses = [];
let skeletons = [];

function setup() {
  createCanvas(w, h);
  video = createCapture(VIDEO);
  
  // Create a new poseNet method with a single detection
  poseNet = new ml5.PoseNet(video, 'single', gotPoses);
  
  // Hide the video element, and just show the canvas
  video.hide();
  fill(255, 0, 0);
  stroke(255, 0, 0);
}

function draw() {
  image(video, 0, 0, w, h);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for(let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for(let j = 0; j < poses[i].keypoints.length; j++) {
      let keypoint = poses[i].keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for(let i = 0; i < skeletons.length; i++) {
    // For every skeleton, loop through all body connections
    for(let j = 0; j < skeletons[i].length; j++) {
      let partA = skeletons[i][j][0];
      let partB = skeletons[i][j][1];
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

// The callback that gets called every time there's an update from the model
function gotPoses(results) {
  poses = results;
  skeletons = poses.map(pose => poseNet.skeleton(pose.keypoints));
}
