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
function setup(){
  const options = {
    task:'regression'
  }
  nn = ml5.neuralNetwork(options);
  // create some data
  for(let i = 0; i < 1; i+=0.01){
    // nn.neuralNetworkData.addData({x:i}, {y:i}, {inputLabels:['x'], outputLabels:['y']})
    nn.neuralNetworkData.addData({x:i}, {y:i})
  }  
  // train the model
  nn.train(finishedTraining)
}

function finishedTraining(){
    console.log('done')
    nn.predict([0.25], gotResult)
}

function gotResult(err, result){
    if(err) { console.log(err); return}
    console.log('results', result)
}