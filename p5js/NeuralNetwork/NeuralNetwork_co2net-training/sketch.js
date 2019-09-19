// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
// x: population_cdp
// y: scope1_ghg_emissions_tons_co2e
=== */
let nn;
let data;


// Options for Neural Network
const options = {
  inputs: ['population_cdp'],
  outputs: ['scope1_ghg_emissions_tons_co2e'],
  dataUrl:'data/co2stats.csv',
  task:'regression',
};


function setup() {
  createCanvas(400, 400);
  // background(0, 27, 68);
  background(244, 244, 244);

  console.log('hello!')
  // Step 1: Create Neural Network
  nn = ml5.neuralNetwork(options, modelLoaded);

}

function modelLoaded(){
  console.log(nn.data);
  nn.data.shuffle();
  // co2 data and population can be log10 transformed
  nn.data.data = nn.data.data.map( item => {
    item.xs.population_cdp = Math.log10(item.xs.population_cdp)
    item.ys.scope1_ghg_emissions_tons_co2e = Math.log10(item.ys.scope1_ghg_emissions_tons_co2e) 
    return item;
  })
  nn.data.normalize();

  const trainingOptions = {
    epochs: 50,
    batchSize:24
  }
  nn.train(trainingOptions, finishedTraining)
}

function finishedTraining(){
  Promise.all(
    [...new Array(100).fill(null).map( (val, idx) => predict(idx*0.01) ) ]
  )  
}

async function predict(val){


    const prediction = await nn.predict([val]);
    const output = {x: val, y: prediction.output[0]}
    console.log(output)

    const x = map(output.x,  0, 1, 0, width);
    const y = map(output.y, 0, 1, height, 0);
  
    ellipse(x, y, 20, 20);
}


