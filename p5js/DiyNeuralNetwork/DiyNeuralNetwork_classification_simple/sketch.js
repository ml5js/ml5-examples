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
  nn = ml5.diyNeuralNetwork(options);
  addData();
  // nn.normalizeData();
  nn.train(finishedTraining)
  
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
    
    // nn.addData({x: xVal, y: yVal}, {label: labelVal})
    nn.addData([xVal, yVal],[labelVal])
  }
}

function finishedTraining(){
    console.log('done')
    
    // nn.classify({x:0, y:250}, function(err, result){
    //   if(err){
    //     console.log(err)
    //     return;
    //   }
    //   console.log('hi from callback', result)
    // })

    nn.classify([0, 250], function(err, result){
      if(err){
        console.log(err)
        return;
      }
      console.log('hi from callback', result)
    })
}