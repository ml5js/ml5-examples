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
const IMAGE_WIDTH = 64;
const IMAGE_HEIGHT = 64;
const IMAGE_CHANNELS = 4;

let images;
let testA;

function preload() {
  images = [];
  for (let i = 1; i < 7; i++) {
    const a = loadImage(`images/A_0${i}.png`)
    const b = loadImage(`images/B_0${i}.png`)
    images.push({
      image: a,
      label: 'a'
    })
    images.push({
      image: b,
      label: 'b'
    })
  }

  testA = loadImage(`images/A_test.png`)

}

function setup() {
  // load the pixels for each image to get a flat pixel array
  images.forEach(item => item.image.loadPixels())

  const options = {
    task: 'classification',
    debug: true,
    layers: [{
        type: 'conv2d',
        inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS], // for image classifcation this is necessary 
        kernelSize: 5,
        filters: 8,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling'
      },
      {
        type: 'maxPooling2d',
        poolSize: [2, 2],
        strides: [2, 2]
      },
      {
        type: 'conv2d',
        filters: 16,
        kernelSize: 5,
        filters: 8,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling'
      },
      {
        type: 'maxPooling2d',
        poolSize: [2, 2],
        strides: [2, 2]
      },
      {
        type: 'flatten'
      },
      {
        type: 'dense',
        // units:2, // will be handled by the neural net class
        kernelInitializer: 'varianceScaling',
        activation: 'softmax'
      }
    ]
  }

  // construct the neural network
  nn = ml5.neuralNetwork(options);

  // add data
  images.forEach(item => {
    const imageArray = Array.from(item.image.pixels);
    const labels = item.label;
    nn.neuralNetworkData.addImageData(imageArray, {
      label: labels
    });
  })

  nn.normalizeData();

  const TRAINING_OPTIONS = {
    batchSize: 2,
    onImageData: true,
    // validationData: [inputs, outputs],
    epochs: 10,
    shuffle: false,
  }

  nn.train(TRAINING_OPTIONS, finishedTraining)

}


function finishedTraining(err, result) {

  if (err) {
    console.log(err);
    return
  }

  console.log("finished training");

  nn.classifyImage(testA.pixels, gotResult)

}

function gotResult(err, result) {
  if (err) {
    console.log(err);
    return
  }
  console.log(result);
}