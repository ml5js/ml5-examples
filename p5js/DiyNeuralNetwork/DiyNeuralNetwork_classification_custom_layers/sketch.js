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

function setup(){
  
  const options = {
    task:'classification'
  }


  let options = {
    layers: [
      {type: 'convolutional', inputs: video.width*video.height*4}, 
      {type: 'maxpooling'}, 
      {type: 'flatten'},
      {type: 'dense'}
    ],
    
  }
  nn = ml5.neuralNetwork(options);

  nn.addImageData(video, 'pose1');
  nn.addData(video.pixels, 'pose1');

  nn.classifyImage(video, gotResults);
  nn.classify(video.pixels, gotResults);
  
  // add your data
  addData();
  // normalize it
  nn.normalizeData();
  
  // create metadata from the data
  nn.createMetaDataFromData();
  // create the training data and prepare for training
  nn.warmUp();
  // setup your nn architecture based on the inputUnits and outputUnits
  const {inputUnits, outputUnits} = nn.neuralNetworkData.meta;
  nn.addLayer(nn.createDenseLayer({inputShape: [inputUnits]}))
  nn.addLayer(nn.createDenseLayer({activation: 'sigmoid'}))
  nn.addLayer(nn.createDenseLayer({units: outputUnits, activation: 'sigmoid'}))

  
  // train the model
  const training_options = {
    batchSize: 32,
    epochs: 10
  }
  nn.train(training_options, finishedTraining)
  
}

function addData(){
  for(let i = 0; i < 500; i++){
    
    let xVal, labelVal;
    if(i < 250){
      xVal = i
      labelVal = "a"
    } else {
      xVal = i
      labelVal = "b"
    }
    const yVal = Math.floor(Math.random()*500);
    
    nn.addData({x: xVal, y: yVal}, {label: labelVal})
  }
}

function finishedTraining(){
    console.log('done')
    
    nn.classify({x:0, y:0.5}, function(err, result){
      if(err){
        console.log(err)
        return;
      }
      console.log('hi from callback', result)
    })
}