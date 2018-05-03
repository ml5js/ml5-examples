// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
YOLO
Real time Object Detection
=== */

let video;
let yolo;
let objects = [];

function setup() {
  createCanvas(640, 410);
  video = createCapture(VIDEO, onVideoLoaded);
  video.hide();
  select('#start').mousePressed(function() {
    detect();
  });
}

function draw() {
  image(video, 0, 0, 640, 410);
  for (let i = 0; i < objects.length; i++) {
    noStroke();
    fill(0, 255, 0);
    text(objects[i].className, objects[i].x*width, objects[i].y*height - 5);
    noFill();
    strokeWeight(4);
    stroke(0,255, 0);
    rect(objects[i].x*width, objects[i].y*height, objects[i].w*width, objects[i].h*height);
  }
}

function onVideoLoaded() {
  yolo = new ml5.YOLO(video.elt);
}

function detect() {
  yolo.detect(function(results){
    objects = results;
    detect();
  });
}
