let neuralNetwork;
let submitButton;

let rSlider, gSlider, bSlider;
let labelP;
let lossP;

function setup() {
  // Crude interface
  lossP = createP('loss');

  createCanvas(100, 100);

  labelP = createP('label');

  rSlider = createSlider(0, 255, 255);
  gSlider = createSlider(0, 255, 0);
  bSlider = createSlider(0, 255, 255);

  let nnOptions = {
    inputs: ['r', 'g', 'b'],
    outputs: ['label'],
    task: 'classification',
    debug: true
  };
  neuralNetwork = ml5.neuralNetwork(nnOptions);
  neuralNetwork.load('model/model.json', modelReady);
}

function modelReady() {
  console.log('model loaded!')
  classify();
};


function classify() {
  let inputs = {
    r: rSlider.value(),
    g: gSlider.value(),
    b: bSlider.value()
  }
  neuralNetwork.classify(inputs, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    labelP.html(`label:${results[0].label}, confidence: ${results[0].confidence.toFixed(2)}`);
    classify();
  }
}

function draw() {
  background(rSlider.value(), gSlider.value(), bSlider.value());
}