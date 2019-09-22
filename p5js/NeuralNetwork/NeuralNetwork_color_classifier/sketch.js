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
    // TODO: handle JSON data
    // How to specify where the array of data is?
    // In this case it's in a property called "entries"
    dataUrl: 'data/colorData_small.json',
    inputs: ['r', 'g', 'b'],
    outputs: ['label'],
    task: 'classification'
  };
  neuralNetwork = ml5.neuralNetwork(nnOptions, modelReady)
}

function modelReady() {
  console.log('classification', neuralNetwork);

  neuralNetwork.data.normalize();
  const trainingOptions = {
    epochs: 50,
    batchSize: 32
  }
  neuralNetwork.train(trainingOptions, finishedTraining);
  // Support a "while training" callback per epoch?
  // neuralNetwork.train(trainingOptions, whileTraining, finishedTraining);
}

// TODO: report progress to while training callback
function whileTraining(epoch, loss) {
  console.log(epoch, loss);
  lossP.html(loss);
}

function finishedTraining() {
  console.log('done!');
  classify();
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
    console.log(results);
    // TODO: Get label in results
    // labelP.html(results[0].label);
  }
}

function draw() {
  background(rSlider.value(), gSlider.value(), bSlider.value());
}