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

const options = {
  task:'regression',
  inputs: 1,
  outputs: 1,
  debug: true
}

function setup(){
  createCanvas(400, 400);
  nn = ml5.neuralNetwork(options);


  console.log(nn)
  // createTrainingData();
  // nn.data.normalize();

  // const trainingOptions={
  //   batchSize: 24,
  //   epochs: 10
  // }
  
  // nn.train(trainingOptions,finishedTraining); // if you want to change the training options
}

async function finishedTraining(){
 
  await Promise.all(
    [...new Array(400).fill(null).map( async (item, idx) =>  {
      let results = await nn.predict([idx]);
      let prediction = results.outputs
      let x = idx
      let y = prediction.value
      fill(255, 0, 0);
      rectMode(CENTER);
      rect(x, y, 10, 10);
    })]
  )

  
}

function createTrainingData(){
  for(let i = 0; i < width; i+=10){
    const iters = floor(random(5, 20))
    const spread = 50;
    for(let j = 0; j < iters; j++){
      let data = [i, height - i + floor(random(-spread, spread))]
      fill(0, 0, 255);
      ellipse(data[0], data[1], 10, 10)
      nn.data.addData([data[0]], [data[1]])
    }
    
  }
}
