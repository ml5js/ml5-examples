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

function setup() {
  // Options for Neural Network
  const options = {
    input: 3,
    output: 2,
    activation: 'tanh'
  };
  // Create Neural Network
  neuralNetwork = ml5.neuralNetwork(options);

  // Train the model
  let trainBtn = createButton('Train Model');
  trainBtn.position(10, 50);
  trainBtn.mousePressed(function() {
    trainModel();
  });

  // Predict
  let predictBtn = createButton('Predict');
  predictBtn.position(10, 70);
  predictBtn.mousePressed(function() {
    predict();
  });

  // Save and download the model
  let saveBtn = createButton('Save Model');
  saveBtn.position(10, 90);
  saveBtn.mousePressed(function() {
    neuralNetwork.save();
  });

  // Load the model from local files
  let loadLocalBtn = createButton('Load the model from local files');
  loadLocalBtn.position(10, 110);
  loadLocalBtn.mousePressed(function() {
    neuralNetwork.load('model/model.json', function() {
      console.log('Model Loaded!');
    });
  });

  // Load model
  let loadBtn = select('#load');
  loadBtn.changed(function() {
    neuralNetwork.load(loadBtn.elt.files, function() {
      console.log('Model Loaded!');
    });
  });
}

function trainModel() {
  // Add training data
  const training_input = [-0.6, 1, 0.25];
  const training_target = [0.3, 0.9];
  for (let i = 0; i < 500; i++) {
    neuralNetwork.addData(training_input, training_target);
  }

  // Train
  neuralNetwork.train(20, whileTraining);
}

// Training callback
function whileTraining(error, progress) {
  if (progress.status == 'training') {
    console.log(progress.epoch, progress.loss);
  } else if (progress.status == 'complete') {
    // Run prediction when complete
    predict();
  }
}

function predict() {
  let input = [-0.6, 1, 0.25];
  neuralNetwork.predict(input, gotResults);
  // const output = await neuralNetwork.predict(input);
  // console.log('output: ', output);
}

function gotResults(error, results) {
  if (error) console.log(error);
  if (results) {
    console.log(results.output);
  }
}
