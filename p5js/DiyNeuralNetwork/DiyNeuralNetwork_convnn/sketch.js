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
const IMAGE_WIDTH = 28;
const IMAGE_HEIGHT = 28;
const IMAGE_CHANNELS = 1;

function setup() {

  nn = ml5.diyNeuralNetwork();
  // create a model
  nn.neuralNetwork.createModel('sequential');
  // add some layers
  // conv
  nn.neuralNetwork.addLayer(nn.createConv2dLayer({
    inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
  }))
  // max pooling
  nn.neuralNetwork.addLayer(
    ml5.tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]})
  )
  // conv
  nn.neuralNetwork.addLayer(nn.createConv2dLayer({
    filters: 16,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }))
  // max pooling
  nn.neuralNetwork.addLayer(
    ml5.tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]})
  )
  nn.neuralNetwork.addLayer(ml5.tf.layers.flatten());

  // dense layer
  nn.neuralNetwork.addLayer(nn.createDenseLayer({
    units:10,
    kernelInitializer: 'varianceScaling',
    activation: 'softmax'
  }))

  // compile the model
  nn.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']}
  );

}