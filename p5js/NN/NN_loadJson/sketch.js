// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */
let nn;

function setup() {

  const options = {
    task: 'classification',
    dataUrl: 'data/colorData.json',
    inputs: ['r', 'g', 'b'],
    outputs: ['label'],
    debug:true
  }
  nn = ml5.neuralNetwork(options, dataLoaded);


}

function dataLoaded(){

  nn.train({batchSize: 32},finishedTraining)
}

function finishedTraining(err, res){
  console.log(nn);
}