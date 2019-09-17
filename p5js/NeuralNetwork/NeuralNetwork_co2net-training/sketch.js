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
let neuralNetwork;
let data;
let predictions = [];
const margins = 40;

// Options for Neural Network
const options = {
  inputs: 1,
  outputs: 1,
  inputKeys: ['population_cdp'],
  outputKeys: ['scope1_ghg_emissions_tons_co2e']
  // activation: 'sig'
};

const DATA_URL = 'data/co2stats.csv'

function setup() {
  createCanvas(400, 400);
  // background(0, 27, 68);
  background(244, 244, 244);

  // Step 1: Create Neural Network
  neuralNetwork = ml5.neuralNetwork(options);

  // Step 2: Prepare the data
  neuralNetwork.loadData(DATA_URL, dataLoaded);
  // prepData()

  // Step 3: inspect the data
  // inspectData(data.normalized_input, data.normalized_target);

  // Step 4A: Inspect the data
  // trainModel()

  // Step 4B: Load a pre-trained model
  // visualize the predictions;
  // the population input needs to be log10 transformed
  // neuralNetwork.load('model/model.json', function() {
  //   console.log('model loaded')

  //   for(let i = 500; i < 10000000; i*=2){
  //     predict(Math.log10(i));  
  //   }
  //   // vancouver
  //   predict(Math.log10(603500));
  //   // NYC
  //   predict(Math.log10(8537673));
  // });

}

function dataLoaded(err, results){
  data = results
  normalizedData = neuralNetwork.normalize(data);
  console.log(normalizedData)

  neuralNetwork.train(normalizedData.inputs, normalizedData.labels, finishedTraining)
}


function finishedTraining(err, results){
  predict();
}

function predict(){
  const population = 1000

  neuralNetwork.predict([population], function(err, prediction){
      console.log(population, prediction.output)
  })
}

// // Inspect the input data
// function inspectData(_x, _y){
//   fill(204, 204, 204);
//   stroke(0, 27, 68);
//   for(let i = 0; i < _x.length; i++){
//     const xData = _x[i];
//     const yData = _y[i];
//     const x = mapToCanvas(xData, margins, width - margins)
//     const y = mapToCanvas(yData, height - margins, margins);
//     ellipse(x, y, 10, 10)
//   }

//   // create axes
//   createAxes();
  
// }

// function createAxes(){
//   // y
//   stroke(0);
//   line(margins, margins, margins, height - margins);
//   // x
//   stroke(0);
//   line(margins, height - margins, width - margins, height - margins);
  
//   fill(0)
//   for(let i = 0.1; i <= 1; i+=0.1){
//     push()
//     const x = mapToCanvas(i, margins, width - margins)
//     const y = height - margins;
//     translate(x, y);
//     rotate(radians(-90));
//     stroke(0);
//     line(0,0, 10, 0);
//     // rotate(radians(90));
//     textAlign(RIGHT)
//     const val = nfc(unNormalize(i, data.stats.x_min, data.stats.x_max), 1)
//     noStroke();
//     text( val, -2, 4)
//     pop();
//   }

//   for(let i = 0.1; i <= 1; i+=0.1){
//     push()
//     const x = margins;
//     const y = mapToCanvas(i, height-margins, margins)
//     translate(x, y);
//     stroke(0);
//     line(0,0, 10, 0);
//     // rotate(radians(90));
//     textAlign(RIGHT)
//     const val = nfc(unNormalize(i, data.stats.y_min, data.stats.y_max), 1)
//     noStroke();
//     text( val, -2, 4)
//     pop();
//   }
// }

// // Train the model
// function trainModel() {
//   // Add training data
//   // push x and y values
//   for(let i = 0; i < data.training_input.length; i++){
//     const xs = data.normalized_input[i];
//     const ys = data.normalized_target[i];
//     neuralNetwork.addData([xs],[ys]);
//   }
//   // Train
//   neuralNetwork.train(4000, whileTraining);
// }

// // Training callback
// function whileTraining(error, progress) {
//   if (progress.status == 'training') {
//     console.log(progress.epoch, progress.loss);
//   } else if (progress.status == 'complete') {
//     // Run prediction when complete

//     for(let i = 10000; i < 10000000; i*=2){
//       predict(Math.log10(i));  
//     }
//   }
// }

// function predict(val) {
//   let input = [val];
//   input = normalizeArray(input, data.stats.x_max, data.stats.x_min)
  
//   neuralNetwork.predict(input, (err, results) => {
//     const x = mapToCanvas(input[0], margins, width - margins );
//     const y = mapToCanvas(results.output[0], height - margins, margins);
//     predictions.push({x, y,});

//     const xUnorm = Math.pow(10,val);
//     const yUnorm = Math.pow(10, unNormalize(results.output[0],data.stats.y_min, data.stats.y_max ))
//     console.log(`pop:${xUnorm}, emissions:${yUnorm}`)

//     displayPredictions(x, y);

//   });
// }


// // show the fitting points
// function displayPredictions(_x, _y){
//   // show points
//   fill(213, 0, 143);
//   stroke(255, 128, 204);
//   rectMode(CENTER);
//   rect(_x, _y, 10, 10)
// }

// function showFit(){
//   if(predictions.length > 2){
//     noFill();
//     stroke(255, 0, 0);
//     beginShape();
//     predictions.forEach(item => {
//       vertex(item.x, item.y)
//     })
//     endShape();
//   }
// }


// // Normalize the array
// function normalizeArray(_arr, _min, _max){
//   const output = _arr.map(item => {
//     return normalize(item, _max, _min)
//   })

//   return output
// }

// // Normalize value
// function normalize(_item, _min, _max){
//   return (_item - _min) / (_max - _min)
// }

// // UnNormalize the value
// function unNormalize(_item, _min, _max){
//       return (_item * (_max - _min)) + _min;
// }

// // Translate normalized data to canvas
// function mapToCanvas(_val, _min, _max){
//   return map(_val, 0, 1, _min, _max);
// }


// // Prepare the data
// function prepData(){
//   // get the data array
//   const stats = data.data;
  
//   // store the x and y stats
//   data.stats = {
//     x_max:null,
//     x_min:null,
//     y_max:null,
//     y_min:null
//   }
  
//   // step 1: add data to the training input
//   data.training_input = stats.map(item => Math.log10(item.population_cdp))
//   data.training_target = stats.map(item => Math.log10(item.scope1_ghg_emissions_tons_co2e))

//   // step 2: get the min and max for x and y
//   data.stats.x_max = max(data.training_input)
//   data.stats.x_min = min(data.training_input)
//   data.stats.y_max = max(data.training_target)
//   data.stats.y_min = min(data.training_target)
  
//   // step 3: get the normalized values
//   data.normalized_input = normalizeArray(data.training_input, data.stats.x_max, data.stats.x_min)
//   data.normalized_target = normalizeArray(data.training_target, data.stats.y_max, data.stats.y_min)

// }