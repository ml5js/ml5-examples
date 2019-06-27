// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Real time Object Detection using YOLO
=== */

let yolo;
let status;
let objects = [];
let canvas;
let width = 640;
let height = 420;

async function make() {
    img = new Image();
    img.src = 'images/cat2.JPG';
    img.width = width;
    img.height = height;

    yolo = await ml5.YOLO(startDetecting)

    canvas = createCanvas(width, height);
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
  yolo.detect(img, function(err, results) {
    if(err){
      console.log(err);
      return
    }
    objects = results;

    if(objects){
      draw();
    }
  });
}

function draw(){
    // Clear part of the canvas
    canvas.fillStyle = "#000000"
    canvas.fillRect(0,0, width, height);

    canvas.drawImage(img, 0, 0);
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


function createCanvas(w, h){
    const canvasElement = document.createElement("canvas"); 
    canvasElement.width  = w;
    canvasElement.height = h;
    document.body.appendChild(canvasElement);
    const canvas = canvasElement.getContext("2d");
    return canvas;
}