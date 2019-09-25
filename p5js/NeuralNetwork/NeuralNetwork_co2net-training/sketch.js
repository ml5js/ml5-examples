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

let inputMeta;
let outputMeta;

// Options for Neural Network
const options = {
  inputs: ['population_cdp'],
  outputs: ['scope1_ghg_emissions_tons_co2e'],
  dataUrl:'data/co2stats.csv',
  task:'regression',
  debug: true
};


function setup() {
  createCanvas(400, 400);
  // background(0, 27, 68);
  background(244, 244, 244);

  // Step 1: Create Neural Network
  nn = ml5.neuralNetwork(options, modelLoaded);

}

function modelLoaded(){
  console.log(nn.data);
  // co2 data and population can be log10 transformed
  // nn.data.data = nn.data.data.map( item => {
  //   item.xs.population_cdp = Math.log10(item.xs.population_cdp)
  //   item.ys.scope1_ghg_emissions_tons_co2e = Math.log10(item.ys.scope1_ghg_emissions_tons_co2e) 
  //   return item;
  // })
  nn.data.normalize();

  const trainingOptions = {
    epochs: 50,
    batchSize:24
  }
  nn.train(trainingOptions, finishedTraining)
}

async function finishedTraining(){
  inputMeta = nn.data.meta.inputTypes[0]
  outputMeta = nn.data.meta.outputTypes[0]

  nn.data.data.forEach( item => {
    const normx = map(item.xs.population_cdp,  inputMeta.min, inputMeta.max, 0, width);
    const normy = map(item.ys.scope1_ghg_emissions_tons_co2e, outputMeta.min, outputMeta.max, height, 0);
    fill(0,255,255);
    ellipse(normx, normy, 4, 4);
  })

  await Promise.all(
    [
      100,
      50000,
      100000,
      500000,
      2500000,
      5000000,
      10000000,
      15000000,
    ].map( (val, idx) => predict(val) )
  )  

  
}

async function predict(val){
    // const input  = Math.log10(val);
    const input = val
    const prediction = await nn.predict([input]);
    const output = {x: val, y: prediction.values.value}
    const x = map(output.x,  inputMeta.min, inputMeta.max, 0, width);
    const y = map(output.y, outputMeta.min, outputMeta.max, height, 0);


    rectMode(CENTER);
    fill(255,0,0);
    rect(x, y, 6, 6);
    text(`pop:${output.x}`, x, y)
    text(`tons_co2e:${output.y}`, x, y+10)

    
}


