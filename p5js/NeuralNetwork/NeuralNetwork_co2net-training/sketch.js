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
let predictions = [];
// const margins = 40;

// const population = [
//   100, 
//   10000,
//   100000,
//   1000000,
//   10000000,
//   20000000,
//   30000000
// ]

const population = [
  0.1, 
  0.2,
  0.3,
  0.4,
  0.5,
  0.6,
  0.7
]



// Options for Neural Network
const options = {
  inputs: ['population_cdp'],
  outputs: ['scope1_ghg_emissions_tons_co2e'],
  dataUrl:'data/co2stats.csv',
  task:'regression',
  epochs: 300,
  batchSize:24
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
  // nn.data.data = nn.data.data.map( item => {
  //   item.xs.population_cdp = Math.log10(item.xs.population_cdp)
  //   item.ys.scope1_ghg_emissions_tons_co2e = Math.log10(item.ys.scope1_ghg_emissions_tons_co2e) 
  //   return item;
  // })
  nn.data.normalize();
  nn.train(finishedTraining)
}

// function dataLoaded(err, results){
//   data = results
//   normalizedData = neuralNetwork.normalize(data);
//   console.log(normalizedData)

//   neuralNetwork.train(normalizedData.inputs, normalizedData.labels, finishedTraining)
// }


function finishedTraining(){
  predict( population[0] );
  predict( population[1] );
  predict( population[2] );
  predict( population[3] );
  predict( population[4] );
  predict( population[5] );
  predict( population[6] );
}

async function predict(val){

    // nn.predict([val], function (err, results) {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log(results);
    //     prediction = results
    //     console.log(val, nn.data.unNormalize(prediction.tensor) )
    //     // predict(population[1])
    //   }
    // })
    // const normInput = nn.data.normalizeOne([val]);


    const prediction = await nn.predict([val]);
    const output = {x: val, y: prediction.output[0]}
    predictions.push(output);

    console.log(output)

    const x = map(output.x,  0, 1, 0, width);
    const y = map(output.y, 0, 1, height, 0);
  
    ellipse(x, y, 20, 20);
}


