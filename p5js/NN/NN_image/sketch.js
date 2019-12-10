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

  /**
   * ///////////////////////////
   * ADD DATA
   * ///////////////////////////
   */
  addData();

  /**
   * ///////////////////////////
   * get information about the data
   * ///////////////////////////
   */
  
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

  // calculate the input units from the data
  nn.neuralNetworkData.getDataUnits(nn.neuralNetworkData.data.raw, [2,2, 3]);
  console.log(nn.neuralNetworkData.meta)






}

function addData() {
  const myData = [{
      label: "red-square",
      value: [
        255, 0, 0, 255, 0, 0,
        255, 0, 0, 255, 0, 0
      ]
    },
    {
      label: "green-square",
      value: [
        0, 255, 0, 0, 255, 0,
        0, 255, 0, 0, 255, 0
      ]
    },
    {
      label: "blue-square",
      value: [
        0, 0, 255, 0, 0, 255,
        0, 0, 255, 0, 0, 255
      ]
    }

  ]

  // method 1
  myData.forEach(item => {
    const xInputObj = {
      pixelArray: item.value
    }

    const yInputObj = {
      label: item.label
    }
    nn.addData(xInputObj, yInputObj)
  })

  // method 2
  myData.forEach(item => {
    nn.addData([item.value], [item.label], {
      inputLabels: ['pixelArray'],
      outputLabels: ['label']
    })
  })

  console.log(nn.neuralNetworkData.data)
}