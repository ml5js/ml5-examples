// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
Fast_Style_Transfer_Simple
Fast Style Transfer Simple Example with p5.js
This uses a pre-trained model of The Great Wave off Kanagawa and Udnie (Young American Girl, The Dance)
=== */

let inputImg;
let statusMsg;
let transferBtn;

// Create two Fast Style methods with different pre-trained models
const style1 = new ml5.StyleTransfer('models/wave', modelLoaded);
const style2 = new ml5.StyleTransfer('models/udnie', modelLoaded);

function setup() {
  noCanvas();
  // Status Msg
  statusMsg = select('#statusMsg');

  // Get the input image
  inputImg = select('#inputImg');

  // Transfer Button
  transferBtn = select('#transferBtn')
  transferBtn.mousePressed(transferImages);
}

// A function to be called when the models have loaded
function modelLoaded() {
  // Check if both models are loaded
  if(style1.ready && style2.ready){
    statusMsg.html('Ready!')
  }
}

// Apply the transfer to both images!
function transferImages() {
  statusMsg.html('Applying Style Transfer...!');

  var styleA = style1.transfer(inputImg.elt);
  createImg(styleA.src).parent('styleA');

  var styleB = style2.transfer(inputImg.elt);
  createImg(styleB.src).parent('styleB');

  statusMsg.html('Done!');
}