// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */
let nn;



function setup(){
  createCanvas(400, 400);
  nn = ml5.neuralNetwork(3, 2);

  console.log(nn)

}

// function draw(){
//   background(200)
// }