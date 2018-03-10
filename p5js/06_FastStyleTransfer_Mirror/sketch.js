/* ===
ML5 Example
06_Fast_Style_Transfer_Mirror
Fast Style Transfer Mirror Example with p5.js
This uses a pre-trained model of The Great Wave off Kanagawa and Udnie (Young American Girl, The Dance)
=== */

let fastStyle;
let video;
let modelReady = false;
let cameraReady = false;
let startPredict = false;
let resultImg;

function setup() {
  createCanvas(300, 300).parent('canvasContainer');
  pixelDensity(1);
  background(0);
  video = createCapture(VIDEO, cameraLoaded);
  resultImg = createImg('');
  resultImg.hide();
  video.size(200, 200);
  video.hide();
  fastStyle = new ml5.FastStyle('models/udnie', modelLoaded);
}

function draw(){
  image(resultImg, 0, 0, 300, 300);
}

function cameraLoaded() {
  cameraReady = true;
}

function modelLoaded() {
  modelReady = true;
}

function togglePredicting() {
  startPredict = !startPredict;
  if(startPredict){
    select('#controlBtn').html('Stop');
    predict();
  } else {
    select('#controlBtn').html('Start');
  }

}

function predict() {
  if(cameraReady && modelReady && startPredict) {
    const result = fastStyle.transfer(video.elt);
    resultImg.elt.src = result.src
    image(resultImg, 0, 300, 300);
    setTimeout(() => predict(), 500);
  }
}
