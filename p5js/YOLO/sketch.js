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
  createCanvas(416, 416);
  video = createCapture(VIDEO, onVideoLoaded);
  video.hide();
  noFill();
}

function draw() {
  image(video, 0, 0);
  objects.forEach(function(object) {
    rect(object.x, object.y, object.w, object.h);
  });

}

function onVideoLoaded() {
  yolo = new ml5.YOLO(video.elt);
  // setInterval(function(){
  //   detect();
  // }, 200);
  detect();
}

function detect() {
  yolo.detect((results) => {
    objects = results;
    console.log(results);
  });
}
