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
    task: 'imageClassification',
    inputs: [2,2,4],
    debug:true
  }
  nn = ml5.neuralNetwork(options);

  /**
   * ///////////////////////////
   * ADD DATA
   * ///////////////////////////
   */
  addData();

  nn.train(finishedTraining)

  // /**
  //  * ///////////////////////////
  //  * get information about the data
  //  * ///////////////////////////
  //  */
  // // get the data type for each property
  // nn.neuralNetworkData.createMetadata(nn.neuralNetworkData.data.raw, [2,2,3])

  // /**
  //  * ///////////////////////////
  //  * Prepare data for training
  //  * ///////////////////////////
  //  */

  // const trainingDataUnormalized = nn.prepareForTraining()
  // console.log(trainingDataUnormalized)

  // // normalize
  // const trainingData = nn.normalizeData()
  // console.log(trainingData)
  

  // // create training data tensors

  // const {inputs, outputs} = nn.neuralNetworkData.convertRawToTensors(trainingDataUnormalized);
  // inputs.print();
  // outputs.print();

  // inputs.dispose();
  // outputs.dispose();

}

function finishedTraining(){

  console.log(nn)

}

function addData() {
  const myData = [{
      label: "red-square",
      value: [
        255, 0, 0,255, 255, 0, 0, 255,
        255, 0, 0,255, 255, 0, 0, 255
      ]
    },
    {
      label: "green-square",
      value: [
        0, 255, 0, 255, 0, 255, 0, 255,
        0, 255, 0, 255, 0, 255, 0, 255
      ]
    },
    {
      label: "blue-square",
      value: [
        0, 0, 255,255, 0, 0, 255,255,
        0, 0, 255,255, 0, 0, 255,255
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