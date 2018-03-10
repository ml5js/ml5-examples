/* ===
ML5 Example
05_Fast_Style_Transfer_Simple
Fast Style Transfer Simple Example with p5.js
This uses a pre-trained model of The Great Wave off Kanagawa and Udnie (Young American Girl, The Dance)
=== */

let inputImg;
let outputOne;
let outputTwo;

// Create two Fast Style methods with different pre-trained models
const fs1 = new ml5.FastStyle('models/wave', modelLoaded1);
const fs2 = new ml5.FastStyle('models/udnie', modelLoaded2);

function setup() {
  noCanvas();
  inputImg = select('#inputImg').elt;
  outputOne = select('#resultImgOne').elt;
  outputTwo = select('#resultImgTwo').elt;
}

// A function to be called when the models has been loaded
function modelLoaded1() {
  const result = fs1.transfer(inputImg);
  outputOne.append(result);
}

function modelLoaded2() {
  const result = fs2.transfer(inputImg);
  outputTwo.append(result);
}