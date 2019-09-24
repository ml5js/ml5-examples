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

  // Support a "while training" callback per epoch?
  // neuralNetwork.train(trainingOptions, whileTraining, finishedTraining);
}

// TODO: report progress to while training callback
function whileTraining(epoch, loss) {
  lossP.html(`Epoch: ${epoch} - loss: ${loss}`);
}

function finishedTraining(anything) {
  console.log('done!');
}

function classify() {
  let inputs = {
    r: rSlider.value() / 255,
    g: gSlider.value() / 255,
    b: bSlider.value() / 255
  }
  neuralNetwork.classify([inputs.r, inputs.g, inputs.b], gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    // Temporary manual way of retrieving label
    let labelList = [
      'red-ish',
      'green-ish',
      'blue-ish',
      'orange-ish',
      'yellow-ish',
      'pink-ish',
      'purple-ish',
      'brown-ish',
      'grey-ish'
    ];
    let index = results.output.indexOf(Math.max(...results.output));
    labelP.html(labelList[index]);
    classify();

    // TODO: Get label in results
    // labelP.html(results[0].label);
  }
}

function draw() {
  background(rSlider.value(), gSlider.value(), bSlider.value());
}