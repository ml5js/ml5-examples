// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */
let nn;
// let inputs, outputs;

const options = {
  inputs: ['x'],
  outputs: ['y'],
  task:'regression'
}

function setup(){

  nn = ml5.diyNeuralNetwork(options);
  
  // create some data
  for(let i = 0; i < 1; i+=0.01){
    nn.neuralNetworkData.addData({x:i}, {y:i}, {inputLabels:['x'], outputLabels:['y']})
  }

  nn.createMetaDataFromData();
  nn.warmUp();
  nn.normalizeData();

  // create a model
  nn.neuralNetwork.createModel('sequential');
  // add some layers
  nn.neuralNetwork.addLayer(nn.createDenseLayer({inputShape: [nn.neuralNetworkData.meta.inputUnits]}))
  nn.neuralNetwork.addLayer(nn.createDenseLayer({activation: 'sigmoid'}))
  nn.neuralNetwork.addLayer(nn.createDenseLayer({units: nn.neuralNetworkData.meta.outputUnits, activation: 'sigmoid'}))
  // compile the model
  nn.compile({
    loss: 'meanSquaredError',
    optimizer: ml5.tf.train.adam, 
    metrics: ['accuracy'],
  });

  
  
  // train the model
  const training_options = {
    batchSize: 32,
    epochs: 10,
    whileTraining: (epoch, loss) => {
      console.log(`epoch:${epoch}, loss: ${loss.loss}`);
    }
  }
  nn.train(training_options, finishedTraining)
  
}

function finishedTraining(){
    console.log('done')

    
    nn.predict([0.25], gotResult)

}

function gotResult(err, result){

    if(err) {
      console.log(err)
      return
    }
    console.log('hi from callback', result)

}