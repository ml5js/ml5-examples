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
  poses.forEach(pose => {
    pose.keypoints.forEach(e => {
      if (e.score > 0.2) {
        ellipse(e.position.x, e.position.y, 10, 10);
      }
    })
  });
}

// A function to draw the skeletons
function drawSkeleton() {
  skeletons.forEach(skeleton => {
    skeleton.forEach(parts => {
      let x1 = parts[0].position.x;
      let y1 = parts[0].position.y;
      let x2 = parts[1].position.x;
      let y2 = parts[1].position.y;
      line(x1, y1, x2, y2);
    });
  });
}

// The callback that gets called every time there's an update from the model
function gotPoses(results) {
  poses = results;
  skeletons = poses.map(pose => poseNet.skeleton(pose.keypoints));
}
