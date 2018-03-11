/* ===
ML5 Example
05_Fast_Style_Transfer_Simple
Fast Style Transfer Simple Example with p5.js
This uses a pre-trained model of The Great Wave off Kanagawa and Udnie (Young American Girl, The Dance)
=== */

let inputImg;
let resultImg1;
let resultImg2;
let statusMsg;
let transferBtn;

// Create two Fast Style methods with different pre-trained models
const fs1 = new ml5.FastStyle('models/wave', modelLoaded);
const fs2 = new ml5.FastStyle('models/udnie', modelLoaded);

function setup() {
  noCanvas();
  // Status Msg
  statusMsg = createP('Loading Models...');
  
  // Transfer Button
  transferBtn = createButton('Transfer!');
  transferBtn.mousePressed(transferImages);

  // Input Image
  createP('Input Image:');
  inputImg = createImg('img/patagonia.jpg');

  // Style A
  createP('Style A: The Great Wave off Kanagawa, 1829 - Katsushika Hokusai');
  createImg('img/wave.jpg');
  resultImg1 = createImg('');

  // Style B
  createP('Style B:Udnie (Young American Girl, The Dance), 1913 - Francis Picabia');
  createImg('img/udnie.jpg');
  resultImg2 = createImg('');
  
}

// A function to be called when the models have loaded
function modelLoaded() {
  // Check if both models are loaded
  if(fs1.ready && fs2.ready){
    statusMsg.html('Ready!')
  }
}

// Apply the transfer to both images!
function transferImages() {
  statusMsg.html('Applying Style Transfer...!');

  var styleA = fs1.transfer(inputImg.elt);
  resultImg1.elt.src = styleA.src;

  var styleB = fs2.transfer(inputImg.elt);
  resultImg2.elt.src = styleB.src;

  statusMsg.html('Done!');
}