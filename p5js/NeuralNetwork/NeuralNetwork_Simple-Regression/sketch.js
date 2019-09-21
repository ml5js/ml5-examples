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
  nn = ml5.neuralNetwork(1, 1);


  console.log(nn)
  createTrainingData();
  nn.data.normalize();

  const trainingOptions={
    batchSize: 24,
    epochs: 200
  }
  
  // nn.train(trainingOptions,finishedTraining); // if you want to change the training options
  nn.train(finishedTraining); // use the default training options
}

function finishedTraining(){
  for(let i = 0; i < 1; i+= 0.1){
    nn.predict([i], (err, results) => {
      let prediction = results.output[0]
      let x = map(i, 0, 1, 0, width)
      let y = map(prediction, 0, 1, 0, width)
      fill(255, 0, 0);
      rectMode(CENTER);
      rect(x, y, 10, 10);
    })
  }
  
}

function createTrainingData(){
  for(let i = 0; i < width; i+=10){
    const iters = floor(random(5, 20))
    const spread = 50;
    for(let j = 0; j < iters; j++){
      
      let data = [{input0: i}, {output0: height - i + floor(random(-spread, spread)) }]
      fill(0, 0, 255);
      ellipse(data[0].input0, data[1].output0, 10, 10)
      nn.data.addData(data[0], data[1])
    }
    
  }
}

// function draw(){
//   background(200)
  
// }