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

function setup() {

  const options = {
    task: 'classification'
  }
  nn = ml5.neuralNetwork(options);

  // add data
  addData();


  // get the data type for each property
  nn.neuralNetworkData.getDTypesFromData(nn.neuralNetworkData.data.raw);
  console.log(nn.neuralNetworkData.meta.inputs)
  console.log(nn.neuralNetworkData.meta.outputs)
  // get the stats - min, max
  nn.neuralNetworkData.getDataStats(nn.neuralNetworkData.data.raw);
  console.log(nn.neuralNetworkData.meta.inputs)
  console.log(nn.neuralNetworkData.meta.outputs)

  // onehot encode 
  nn.neuralNetworkData.getDataOneHot(nn.neuralNetworkData.data.raw);
  console.log(nn.neuralNetworkData.meta.inputs)
  console.log(nn.neuralNetworkData.meta.outputs)

}

function addData() {
  /**
   * ///////////////////////////////////
   * Add Data
   * ///////////////////////////////////
   */

  const myData = [{
      label: "red",
      r: 255,
      g: 0,
      b: 0
    },
    {
      label: "green",
      r: 0,
      g: 255,
      b: 0
    },
    {
      label: "blue",
      r: 0,
      g: 0,
      b: 255
    }
  ];

  // method 1: passing json and grabbing labels from the json keys
  myData.forEach(item => {
    const xInputObj = {
      r: item.r,
      g: item.g,
      b: item.b
    }

    const yInputObj = {
      color: item.label,
    }

    nn.addData(xInputObj, yInputObj);
  })


  // method 2: explicity setting labels
  myData.forEach(item => {
    nn.addData([item.r, item.g, item.b], [item.label], {
      inputLabels: ['r', 'g', 'b'],
      outputLabels: ['color']
    })
  })

}