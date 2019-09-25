let neuralNetwork;
let submitButton;

let rSlider, gSlider, bSlider;
let labelP;
let lossP;

function setup() {
  createCanvas(100, 100);
  // Crude interface

  labelP = createP('label');
  lossP = createP('loss');

  rSlider = createSlider(0, 255, 255);
  gSlider = createSlider(0, 255, 0);
  bSlider = createSlider(0, 255, 255);

  let nnOptions = {
    dataUrl: 'data/colorData.json',
    inputs: ['r', 'g', 'b'],
    outputs: ['label'],
    task: 'classification'
  };
  neuralNetwork = ml5.neuralNetwork(nnOptions, modelReady);
}

function modelReady() {
  neuralNetwork.data.normalize();
  const trainingOptions = {
    epochs: 20,
    batchSize: 64
  }
  neuralNetwork.train(trainingOptions, finishedTraining);

  // Start guessing while training!
  classify();

  neuralNetwork.train(trainingOptions, whileTraining, finishedTraining);
}

function whileTraining(epoch, loss) {
  lossP.html(`Epoch: ${epoch} - loss: ${loss.loss}`);
}

function finishedTraining(anything) {
  console.log('done!');
}

function classify() {
  let inputs = {
    r: rSlider.value(),
    g: gSlider.value(),
    b: bSlider.value()
  }
  neuralNetwork.classify([inputs.r, inputs.g, inputs.b], gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    const output = results.output[0][0]
    labelP.html(`label:${output.label}, confidence: ${output.confidence}`);
    classify();
  }
}

function draw() {
  background(rSlider.value(), gSlider.value(), bSlider.value());
}