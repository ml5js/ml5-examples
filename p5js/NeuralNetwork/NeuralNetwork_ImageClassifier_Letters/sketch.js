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
    task: 'imageClassification',
    debug: true,
    inputs:[IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
    layers: [{
        type: 'conv2d',
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
    nn.addData({pixelArray:imageArray}, {label: labels});
  })

  // nn.normalizeData();

  const TRAINING_OPTIONS = {
    batchSize: 2,
    epochs: 10,
  }

  nn.train(TRAINING_OPTIONS, finishedTraining)

}


function finishedTraining() {

  console.log("finished training");
  testA.loadPixels();
  const test = Array.from(testA.pixels);
  nn.classify( test, gotResults)

}

function gotResults(err, result) {
  if (err) {
    console.log(err);
    return
  }
  console.log(result);
}