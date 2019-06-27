// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
CVAE example
=== */
let cvae;
let img;
let button;
let dropdown;
let canvas;
let width = 200;
let height = 200;

async function make() {
  canvas = createCanvas(width, height);
  // Create a new instance with pretrained model
  cvae = await ml5.CVAE('model/quick_draw/manifest.json', modelReady);
  
  // Create a generate button
  button = document.createElement('button');
  button.innerHTML = "generate";
  document.body.appendChild(button);
  button.addEventListener('click', generateImage);
}

function generateImage() {
  let label = dropdown.value;
  cvae.generate(label, gotImage);
}

function gotImage(error, result) {
  if(error){
    console.log(error)
    return error
  }
  img = new ImageData(result.raws, 28, 28)
  const canvasElement = document.createElement("canvas"); 
  canvasElement.width  = 28;
  canvasElement.height = 28;
  ctx = canvasElement.getContext('2d');
  ctx.putImageData(img, 0, 0);
  canvas.drawImage(canvasElement, 0, 0, 200, 200);
}

function modelReady() {
  // Create dropdown with all possible labels
  dropdown = document.createElement('select');
  document.body.appendChild(dropdown);

  for (let label of cvae.labels) {
    const option = document.createElement("option");
    option.value = label;
    option.text = label;
    dropdown.appendChild(option);
  }
  generateImage();
}

// call app.map.init() once the DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
  make();
});

// Helper Functions
function createCanvas(w, h){
  const canvasElement = document.createElement("canvas"); 
  canvasElement.width  = w;
  canvasElement.height = h;
  document.body.appendChild(canvasElement);
  const canvas = canvasElement.getContext("2d");
  return canvas;
}