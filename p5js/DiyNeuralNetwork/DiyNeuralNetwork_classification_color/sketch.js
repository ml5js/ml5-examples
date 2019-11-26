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
// function setup(){

const options = {
  inputs: ['r', 'g', 'b'],
  outputs: ['label'],
  dataUrl: 'colorData.json',
  task: 'classification'
}

nn = ml5.diyNeuralNetwork(options, dataLoaded);

function dataLoaded() {
  // prep your data
  nn.normalizeData();

  // create a model
  nn.neuralNetwork.createModel('sequential');
  // get the inputUnits and outputUnits
  const {
    inputUnits,
    outputUnits
  } = nn.neuralNetworkData.meta
  // add some layers
  nn.neuralNetwork.addLayer(nn.createDenseLayer({
    inputShape: [inputUnits]
  }))
  // nn.neuralNetwork.addLayer(nn.createDenseLayer({
  //   activation: 'sigmoid'
  // }))
  nn.neuralNetwork.addLayer(nn.createDenseLayer({
    units: outputUnits,
    activation: 'sigmoid'
  }))
  // compile the model
  // compile(options, learningRate)
  nn.compile({
    loss: 'meanSquaredError',
    optimizer: ml5.tf.train.adam,
    metrics: ['accuracy'],
  }, 0.25);

  nn.train({
    epochs: 10,
    batchSize: 32,
    validationSplit: 0.1,
    whileTraining: function (epoch, loss) {
      console.log(epoch, loss.loss)
    }
  }, finishedTraining)

}

function finishedTraining() {

  console.log(ml5.tf.memory())
  console.log(nn, 'training done!')

  nn.classify({
    r: 1,
    g: 0,
    b: 0
  }, gotResult)

  nn.classify([1, 0, 0], gotResult)

}

function gotResult(err, result) {
  if (err) {
    console.log('err', err);
    return
  }
  console.log(result)

  // const vals = Object.entries(nn.neuralNetworkData.meta.outputs.label.legend);
  // vals.forEach((item, idx) => {
  //   console.log(`label:${item[0]}, confidence:${result[0][idx]}`);
  // })


  console.log(ml5.tf.memory())
}

// nn.neuralNetworkData.loadJSON('colorData.json', ['r', 'g', 'b'], ['label']).then(() => {

// })




// const inputArr = [];
// const outputArr = [];
// nn.neuralNetworkData.data.raw.forEach( row => {
//   // get xs
//   // const xs = ['r', 'g', 'b'].map(k => row.xs[k]);
//   const xs = Object.keys(nn.neuralNetworkData.meta.inputs).map(k => {
//     if(nn.neuralNetworkData.meta.inputs[k].legend){
//       return nn.neuralNetworkData.meta.inputs[k].legend[row.xs[k]]
//     }
//     return row.xs[k]
//   });
//   inputArr.push(...xs)

//   // get ys
//   const ys = Object.keys(nn.neuralNetworkData.meta.outputs).map(k =>  {
//     if(nn.neuralNetworkData.meta.outputs[k].legend){
//       return nn.neuralNetworkData.meta.outputs[k].legend[row.ys[k]]
//     }
//     return row.ys[k]
//   })
//   outputArr.push(...ys)

// })
// const inputs = ml5.tf.tensor(inputArr, [nn.neuralNetworkData.data.raw.length, inputUnits])
// const outputs = ml5.tf.tensor(outputArr, [nn.neuralNetworkData.data.raw.length, outputUnits])


// train the model
// const training_options = {
//   inputs,
//   outputs,
//   batchSize: 32,
//   epochs: 10,
//   whileTraining: (epoch, loss) => {
//     console.log(`epoch:${epoch}, loss: ${loss.loss}`);
//   }
// }
// nn.train(training_options, finishedTraining)

// }

// function finishedTraining(){
//     console.log('done')

//     inputs.dispose();
//     outputs.dispose();

//     console.log(nn)
//     const testInput = ml5.tf.tensor([[0], [0.25], [0.5], [0.75], [1]])

//     nn.neuralNetwork.predict(testInput, function(err, result){
//       console.log('hi from callback', result)
//     })

//     // classification.dispose();
//     testInput.dispose();

//     const dataUrl = 'https://raw.githubusercontent.com/ml5js/ml5-examples/release/p5js/NeuralNetwork/NeuralNetwork_titanic/data/titanic_cleaned.csv'
//     nn.neuralNetworkData.loadCSV(dataUrl, ['fare_class',"sex",'age','fare'], ['survived']).then( () => {
//       console.log(nn.neuralNetworkData.data.raw);
//     })
// }