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
let legend_prediction;
let legend_actual;
const margins = 40;

// Options for Neural Network
const options = {
  input: 1,
  output: 1,
  // activation: 'sig'
};

function preload(){
  data = loadJSON('data/co2stats.json')
}

function setup() {
  createCanvas(400, 400);
  // background(0, 27, 68);
  background(244, 244, 244);

  // Step 1: Create Neural Network
  neuralNetwork = ml5.neuralNetwork(options);

  // Step 2: Prepare the data
  prepData()

  // Step 3: inspect the data
  inspectData(data.normalized_input, data.normalized_target);

  
  // Step 4A: Inspect the data
  // trainModel()

  // Step 4B: Load a pre-trained model
  // visualize the predictions;
  // the population input needs to be log10 transformed
  neuralNetwork.load('model/model.json', function() {
    console.log('model loaded')

    for(let i = 500; i < 10000000; i*=2){
      predict(Math.log10(i));  
    }
    // vancouver
    predict(Math.log10(603500));
    // NYC
    predict(Math.log10(8537673));
  });

  // add legend;
  legend_prediction = createDiv('prediction').id('prediction-legend').class("legend-item")
  createDiv().parent('#prediction-legend').class('prediction')

  legend_actual =createDiv('actual').id('actual-legend').class("legend-item")
  createDiv().parent('#actual-legend').class('actual')

}

// Inspect the input data
function inspectData(_x, _y){
  fill(204, 204, 204);
  stroke(0, 27, 68);
  for(let i = 0; i < _x.length; i++){
    const xData = _x[i];
    const yData = _y[i];
    const x = mapToCanvas(xData, margins, width - margins)
    const y = mapToCanvas(yData, height - margins, margins);
    ellipse(x, y, 10, 10)
  }

  // y
  stroke(0);
  line(margins, margins, margins, height - margins);
  // x
  stroke(0);
  line(margins, height - margins, width - margins, height - margins);

  
  const xd = width - margins;
  for(let i = margins; i < xd; i+=40){
    push()
    translate(i + margins, height - margins);
    rotate(radians(-90));
    line(0,0, 10, 0);
    rotate(radians(90));
    // text( i , 0, 0)
    pop();
  }

  const yd = height - margins;
  for(let i = 0; i < yd; i+=40){
    push()
    translate(margins, i);
    line(0,0, 10, 0);
    // text( yd - i , 0, 0)
    pop();
  }
  
}

// Train the model
function trainModel() {
  // Add training data
  // push x and y values
  for(let i = 0; i < data.training_input.length; i++){
    const xs = data.normalized_input[i];
    const ys = data.normalized_target[i];
    neuralNetwork.addData([xs],[ys]);
  }
  // Train
  neuralNetwork.train(4000, whileTraining);
}

// Training callback
function whileTraining(error, progress) {
  if (progress.status == 'training') {
    console.log(progress.epoch, progress.loss);
  } else if (progress.status == 'complete') {
    // Run prediction when complete

    for(let i = 10000; i < 10000000; i*=2){
      predict(Math.log10(i));  
    }
  }
}

function predict(val) {
  let input = [val];
  input = normalizeArray(input, data.stats.x_max, data.stats.x_min)
  
  neuralNetwork.predict(input, (err, results) => {
    const x = mapToCanvas(input[0], margins, width - margins );
    const y = mapToCanvas(results.output[0], height - margins, margins);
    predictions.push({x, y,});

    const xUnorm = Math.pow(10,val);
    const yUnorm = Math.pow(10, unNormalize(results.output[0],data.stats.y_min, data.stats.y_max ))
    console.log(`pop:${xUnorm}, emissions:${yUnorm}`)

    displayPredictions(x, y);

  });
}


// show the fitting points
function displayPredictions(_x, _y){
  // show points
  fill(213, 0, 143);
  stroke(255, 128, 204);
  rectMode(CENTER);
  rect(_x, _y, 10, 10)
}

function showFit(){
  if(predictions.length > 2){
    noFill();
    stroke(255, 0, 0);
    beginShape();
    predictions.forEach(item => {
      vertex(item.x, item.y)
    })
    endShape();
  }
}


// Normalize the array
function normalizeArray(_arr, _min, _max){
  const output = _arr.map(item => {
    return normalize(item, _max, _min)
  })

  return output
}

// Normalize value
function normalize(_item, _min, _max){
  return (_item - _min) / (_max - _min)
}

// UnNormalize the value
function unNormalize(_item, _min, _max){
      return (_item * (_max - _min)) + _min;
}

// Translate normalized data to canvas
function mapToCanvas(_val, _min, _max){
  return map(_val, 0, 1, _min, _max);
}


// Prepare the data
function prepData(){
  // get the data array
  const stats = data.data;
  
  // store the x and y stats
  data.stats = {
    x_max:null,
    x_min:null,
    y_max:null,
    y_min:null
  }
  
  // step 1: add data to the training input
  data.training_input = stats.map(item => Math.log10(item.population_cdp))
  data.training_target = stats.map(item => Math.log10(item.scope1_ghg_emissions_tons_co2e))

  // step 2: get the min and max for x and y
  data.stats.x_max = max(data.training_input)
  data.stats.x_min = min(data.training_input)
  data.stats.y_max = max(data.training_target)
  data.stats.y_min = min(data.training_target)
  
  // step 3: get the normalized values
  data.normalized_input = normalizeArray(data.training_input, data.stats.x_max, data.stats.x_min)
  data.normalized_target = normalizeArray(data.training_target, data.stats.y_max, data.stats.y_min)

}