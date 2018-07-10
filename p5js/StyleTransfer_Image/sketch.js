// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Style Transfer Image Example using p5.js
This uses a pre-trained model of The Great Wave off Kanagawa and Udnie (Young American Girl, The Dance)
=== */

let inputImg;
let statusMsg;
let transferBtn;

// Create two Style methods with different pre-trained models
let style1;
let style2;

function setup() {
  noCanvas();
  // Status Msg
  statusMsg = select('#statusMsg');

  // Get the input image
  inputImg = select('#inputImg');

  // Transfer Button
  transferBtn = select('#transferBtn')
  transferBtn.mousePressed(transferImages);

  style1 = ml5.styleTransfer('models/wave', modelLoaded);
  style2 = ml5.styleTransfer('models/udnie', modelLoaded);
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
  console.log(inputImg.elt);
  style1.transfer(inputImg, function(err, result) {
    createImg(result.src).parent('styleA');
  });

  style2.transfer(inputImg, function(err, result) {
    createImg(result.src).parent('styleB');
  });

  statusMsg.html('Done!');
}