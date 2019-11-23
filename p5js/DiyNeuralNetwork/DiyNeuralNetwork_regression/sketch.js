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
let inputs, outputs;

function setup(){

  nn = ml5.diyNeuralNetwork();
  // create a model
  nn.neuralNetwork.createModel('sequential');
  // add some layers
  nn.neuralNetwork.addLayer(nn.createDenseLayer({inputShape: [1]}))
  nn.neuralNetwork.addLayer(nn.createDenseLayer({activation: 'sigmoid'}))
  nn.neuralNetwork.addLayer(nn.createDenseLayer({units: 1, activation: 'sigmoid'}))
  // compile the model
  nn.compile({
    loss: 'meanSquaredError',
    optimizer: ml5.tf.train.adam, 
    metrics: ['accuracy'],
  });

  // create some data
  const inputArr = [];
  const outputArr = [];
  for(let i = 0; i < 1; i+=0.01){
    inputArr.push([i])
    // const offset = i % 2 === 0 ?   Math.floor(Math.random() * 10 ) :  Math.floor(Math.random() * -10 ) 
    outputArr.push([i])
  }
   
  // turn them into tensors
  inputs = ml5.tf.tensor(inputArr, [100, 1]) 
  outputs = ml5.tf.tensor(outputArr, [100, 1])
  
  // train the model
  const training_options = {
    inputs,
    outputs,
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

    inputs.dispose();
    outputs.dispose();

    console.log(nn)
    const testInput = ml5.tf.tensor([[0], [0.25], [0.5], [0.75], [1]])
    
    nn.neuralNetwork.predict(testInput, function(err, result){
      console.log('hi from callback', result)
    })

    // classification.dispose();
    testInput.dispose();

    const dataUrl = 'https://raw.githubusercontent.com/ml5js/ml5-examples/release/p5js/NeuralNetwork/NeuralNetwork_titanic/data/titanic_cleaned.csv'
    nn.neuralNetworkData.loadCSV(dataUrl, ['fare_class',"sex",'age','fare'], ['survived']).then( () => {
      console.log(nn.neuralNetworkData.data.raw);
    })
}