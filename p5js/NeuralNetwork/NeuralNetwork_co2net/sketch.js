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
  // console.log(nn.data.data.raw);
  // co2 data and population can be log10 transformed
  // nn.data.data = nn.data.data.map( item => {
  //   item.xs.population_cdp = Math.log10(item.xs.population_cdp)
  //   item.ys.scope1_ghg_emissions_tons_co2e = Math.log10(item.ys.scope1_ghg_emissions_tons_co2e) 
  //   return item;
  // })
  nn.normalize();

  const trainingOptions = {
    epochs: 50,
    batchSize:12
  }
  nn.train(trainingOptions, finishedTraining)
}

async function finishedTraining(){
  inputMin = nn.data.data.inputMin;
  inputMax = nn.data.data.inputMax;
  outputMin = nn.data.data.outputMin;
  outputMax = nn.data.data.outputMax;
  

  nn.data.data.raw.forEach( item => {
    const normx = map(item.xs.population_cdp,  inputMin[0], inputMax[0], 0, width);
    const normy = map(item.ys.scope1_ghg_emissions_tons_co2e, outputMin[0], outputMax[0], height, 0);
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
    const output = {x: val, y: prediction.output.value}
    const x = map(output.x,  inputMin[0], inputMax[0], 0, width);
    const y = map(output.y, outputMin[0], outputMax[0], height, 0);

    console.log(output)

    rectMode(CENTER);
    fill(255,0,0);
    rect(x, y, 6, 6);
    text(`pop:${output.x}`, x, y)
    text(`tons_co2e:${output.y}`, x, y+10)

    
}


