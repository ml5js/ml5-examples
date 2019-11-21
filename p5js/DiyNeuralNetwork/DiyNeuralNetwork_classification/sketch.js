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
const DEFAULT_LEARNING_RATE = 0.2
function setup(){

  nn = ml5.diyNeuralNetwork();
  // create a model
  nn.neuralNetwork.createModel('sequential');
  // add some layers
  nn.neuralNetwork.addLayer(nn.createDenseLayer({inputShape: [2]}))
  nn.neuralNetwork.addLayer(nn.createDenseLayer({activation: 'sigmoid'}))
  nn.neuralNetwork.addLayer(nn.createDenseLayer({units: 2, activation: 'sigmoid'}))
  // compile the model
  nn.compile();

  // create some data
  const inputArr = [];
  const outputArr = [];
  for(let i = 0; i < 500; i++){
    if(i < 250){
      inputArr.push([1, 1])
      outputArr.push([1, 0])
    } else{
    inputArr.push([0, 0])
    outputArr.push([0, 1])
  }
  }
   
  // turn them into tensors
  inputs = ml5.tf.tensor(inputArr, [500, 2]) 
  outputs = ml5.tf.tensor(outputArr, [500, 2])
  
  // train the model
  const training_options = {
    inputs,
    outputs,
    batchSize: 32,
    epochs: 2,
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
    const testInput = ml5.tf.tensor([[1,1], [0,0]])
    
    nn.neuralNetwork.classify(testInput, function(err, result){
      console.log('hi from callback', result)
    })

    // classification.dispose();
    testInput.dispose();

}