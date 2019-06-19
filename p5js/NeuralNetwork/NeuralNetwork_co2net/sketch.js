// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */
let neuralNetwork;
let data;

function preload(){
  data = loadJSON('data/co2stats.json')
}

function prepData(){
  const stats = data.data;
  
  data.stats = {
    x_max:null,
    x_min:null,
    y_max:null,
    y_min:null
  }

  data.training_input = [];
  data.training_target = [];

  data.normalized_input = [];
  data.normalized_target = [];

  // push x and y values
  for(let i = 0; i < stats.length; i++){
    const item = stats[i];
    data.training_input.push(Math.log10(item.population_cdp));
    data.training_target.push(Math.log10(item.scope1_ghg_emissions_tons_co2e));
  }

  data.stats.x_max = max(data.training_input)
  data.stats.x_min = min(data.training_input)
  data.stats.y_max = max(data.training_target)
  data.stats.y_min = min(data.training_target)

  
  data.normalized_input = normalize(data.training_input, data.stats.x_max, data.stats.x_min)
  data.normalized_target = normalize(data.training_target, data.stats.y_max, data.stats.y_min)


}

function normalize(_arr, _max, _min){
  const output = _arr.map(item => {
    return (item - _min) / (_max - _min)
  })

  return output
}

function setup() {
  createCanvas(400, 400);
  background(200)

  // Options for Neural Network
  const options = {
    input: 1,
    output: 1,
    // activation: 'sig'
  };
  // Create Neural Network
  neuralNetwork = ml5.neuralNetwork(options);

  prepData()

  fill(255, 255, 255);
  data.normalized_input.forEach( (item, idx) => {
    const x = mapToCanvas(item, 0, width)
    const y = mapToCanvas(data.normalized_target[idx], height, 0);
    ellipse(x, y, 10, 10)
  })

  // x: population_cdp
  // y: scope1_ghg_emissions_tons_co2e
  // trainModel()

  neuralNetwork.load('model/model.json', function() {
    console.log('model loaded')
    predict(Math.log10(10000));
    predict(Math.log10(100000));
    predict(Math.log10(603500));
    predict(Math.log10(1000000));
    predict(Math.log10(8537673));
    predict(Math.log10(10000000));
  });

}

function mapToCanvas(_val, _min, _max){
  return map(_val, 0, 1, _min, _max);
}

// function draw(){

  

// }

function trainModel() {
  // Add training data
  // push x and y values
  const stats = data.data;

  for(let i = 0; i < data.training_input.length; i++){
    const xs = data.normalized_input[i];
    const ys = data.normalized_target[i];
    // training_input.push(item.population_cdp);
    // training_target.push(item.scope1_ghg_emissions_tons_co2e);
    neuralNetwork.addData([xs],[ys]);
  }

  // for(let i = 0; i < stats.length; i++){
  //   const item = stats[i];
  //   // const xs = data.normalized_input[i];
  //   // const ys = data.normalized_target[i];
  //   // training_input.push(item.population_cdp);
  //   // training_target.push(item.scope1_ghg_emissions_tons_co2e);
  //   neuralNetwork.addData([item.population_cdp], [item.scope1_ghg_emissions_tons_co2e]);
  // }

  // Train
  neuralNetwork.train(4000, whileTraining);
}

// Training callback
function whileTraining(error, progress) {
  if (progress.status == 'training') {
    console.log(progress.epoch, progress.loss);
  } else if (progress.status == 'complete') {
    // Run prediction when complete
    // predict(603500);
    predict(Math.log10(10000));
    predict(Math.log10(100000));
    predict(Math.log10(1000000));
    predict(Math.log10(10000000));
    // predict(Math.log10(1000));
    // predict(Math.log10(10000));
    // predict(Math.log10(100000));

  }
}

function predict(val) {
  let input = [val];
  input = normalize(input, data.stats.x_max, data.stats.x_min)
  neuralNetwork.predict(input, (err, results) => {
    fill(255, 0, 0);
    const x = mapToCanvas(input[0], 0, width );
    const y = mapToCanvas(results.output[0], height,0);
    // console.log(x, y)
    ellipse(x, y, 10, 10)

    console.log(`pop:${Math.pow(10,val)}, emissions:${Math.pow(10,unNormalize(results.output[0]))}`)
  });
  // const output = await neuralNetwork.predict(input);
  // console.log('output: ', output);
}

// function gotResults(error, results) {
//   if (error) console.log(error);
//   if (results) {

//     console.log(results.output);

//     // const unNormalized = results.output.map(item => {
//     //   return (item * data.stats.y_max - data.stats.y_min) + data.stats.y_min;
//     // })

//     // console.log(unNormalized)
//   }
// }


function unNormalize(_item){
      return (_item * (data.stats.y_max - data.stats.y_min)) + data.stats.y_min;
}