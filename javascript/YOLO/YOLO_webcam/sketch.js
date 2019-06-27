// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Real time Object Detection using YOLO and p5.js
=== */

// let video;
// let yolo;
// let status;
// let objects = [];

// function setup() {
//   createCanvas(320, 240);
//   video = createCapture(VIDEO);
//   video.size(320, 240);

//   // Create a YOLO method
//   yolo = ml5.YOLO(video, startDetecting);

//   // Hide the original video
//   video.hide();
//   status = select('#status');
// }

// function draw() {
//   image(video, 0, 0, width, height);
//   for (let i = 0; i < objects.length; i++) {
//     noStroke();
//     fill(0, 255, 0);
//     text(objects[i].label, objects[i].x * width, objects[i].y * height - 5);
//     noFill();
//     strokeWeight(4);
//     stroke(0, 255, 0);
//     rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
//   }
// }

// function startDetecting() {
//   status.html('Model loaded!');
//   detect();
// }

// function detect() {
//   yolo.detect(function(err, results) {
//     objects = results;
//     detect();
//   });
// }



let yolo;
let status;
let objects = [];
let video;
let canvas;
let width = 480;
let height = 360;

async function make() {
    // get the video
    video = await getVideo();
    // load bodyPix with video
    yolo = await ml5.YOLO(video, startDetecting)
    // create a canvas to draw to
    canvas = createCanvas(width, height);
    // run the segmentation on the video, handle the results in a callback
}

// when the dom is loaded, call make();
window.addEventListener('DOMContentLoaded', function() {
    make();
});

function startDetecting(){
  console.log('model ready')
  detect();
}

function detect() {
  yolo.detect(function(err, results) {
    if(err){
      console.log(err);
      return
    }
    objects = results;

    if(objects){
      draw();
    }
    
    detect();
  });
}

function draw(){
    // Clear part of the canvas
    canvas.fillStyle = "#000000"
    canvas.fillRect(0,0, width, height);

    canvas.drawImage(video, 0, 0);
    for (let i = 0; i < objects.length; i++) {
      
      canvas.font = "16px Arial";
      canvas.fillStyle = "green";
      canvas.fillText(objects[i].label, objects[i].x * width + 4, objects[i].y * height + 16); 

      canvas.beginPath();
      canvas.rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
      canvas.strokeStyle = "green";
      canvas.stroke();
      canvas.closePath();
    }
}

// Helper Functions
async function getVideo(){
    // Grab elements, create settings, etc.
    const videoElement = document.createElement('video');
    videoElement.setAttribute("style", "display: none;"); 
    videoElement.width = width;
    videoElement.height = height;
    document.body.appendChild(videoElement);

    // Create a webcam capture
    const capture = await navigator.mediaDevices.getUserMedia({ video: true })
    videoElement.srcObject = capture;
    videoElement.play();

    return videoElement
}

function createCanvas(w, h){
    const canvasElement = document.createElement("canvas"); 
    canvasElement.width  = w;
    canvasElement.height = h;
    document.body.appendChild(canvasElement);
    const canvas = canvasElement.getContext("2d");
    return canvas;
}