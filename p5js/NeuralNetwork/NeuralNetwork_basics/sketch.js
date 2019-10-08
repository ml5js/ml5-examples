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

function setup() {
  // Options for Neural Network
  const options = {
    inputs: 3,
    outputs: 2,
    task: 'regression',
    debug:true
  };
  // Create Neural Network
  nn = ml5.neuralNetwork(options);

  trainModel();

  // Train the model
  let trainBtn = createButton('Train Model');
  trainBtn.position(10, 50);
  trainBtn.mousePressed(function () {
    trainModel();
  });

  // Predict
  let predictBtn = createButton('Predict');
  predictBtn.position(10, 70);
  predictBtn.mousePressed(function () {
    predict();
  });

  // Save and download the model
  let saveBtn = createButton('Save Model');
  saveBtn.position(10, 90);
  saveBtn.mousePressed(function () {
    nn.save();
  });

  // Load the model from local files
  let loadLocalBtn = createButton('Load the model from local files');
  loadLocalBtn.position(10, 110);
  loadLocalBtn.mousePressed(function () {
    nn.load('model/model.json', function () {
      console.log('Model Loaded!');
    });
  });

  // Load model
  let loadBtn = select('#load');
  loadBtn.changed(function () {
    nn.load(loadBtn.elt.files, function () {
      console.log('Model Loaded!');
    });
  });
}

function trainModel() {
  // Add training data
  // const training_input = [-0.6, 1, 0.25];
  // const training_target = [0.3, 0.9];
  let a, b, c;
  let training_target;
  for (let i = 0; i < 500; i++) {
    if (i % 2) {
      a = Math.random(0, 0.16);
      b = Math.random(0.16, 0.32);
      c = Math.random(0.32, 0.5);
      training_target = [0, 0]
    } else {
      a = Math.random(0.5, 0.66);
      b = Math.random(0.66, 0.82);
      c = Math.random(0.82, 1);
      training_target = [1, 1]
    }

    const training_input = [a, b, c];
    // const training_target = [0, 1];

    // nn.data.addData(
    //   {
    //     input0: training_input[0],
    //     input1: training_input[1],
    //     input2: training_input[2],
    //   },
    //   {
    //     output0: training_target[0],
    //     output1: training_target[1],
    //   });

    nn.addData(training_input, training_target)

  }

  const trainingOptions = {
    epochs: 32,
    batchSize: 12
  }
  // Train
  nn.normalizeData();
  nn.train(trainingOptions, finishedTraining);
}

// Training callback
function finishedTraining() {
  predict();
}

function predict() {
  const a = 0.1;
  const b = 0.2;
  const c = 0.4;
  const input = [a, b, c];
  // we should expect [0,0]
  nn.predict(input, gotResults);

}

function gotResults(error, results) {
  if (error) console.log(error);
  if (results) {
    console.log(results);
    results.tensor.print()
  }
}