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
// function setup(){

const options = {
  // inputs: ['r', 'g', 'b'],
  // outputs: ['label'],
  // dataUrl: 'colorData.json',
  task: 'classification'
}

nn = ml5.diyNeuralNetwork(options);

const modelUrls = {
  model: 'model/model.json',
  metadata: 'model/model_meta.json',
  weights: 'model/model.weights.bin'
}
nn.load(modelUrls, modelLoaded)

function modelLoaded() {

  nn.classify({
    r: 1,
    g: 0,
    b: 0
  }, gotResult)

}

function gotResult(err, result) {
  if (err) {
    console.log('err', err);
    return
  }
  console.log(result)

}
