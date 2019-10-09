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
    normalizationOptions: {
      inputMax: [255, 255, 255],
      inputMin: [0, 0, 0],
      outputMax: [1, 1, 1, 1, 1, 1, 1, 1, 1],
      outputMin: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    debug: true
  };
  neuralNetwork = ml5.neuralNetwork(nnOptions);
  neuralNetwork.load('model/model.json', modelReady);
}

function modelReady() {
  console.log('model loaded!')
  neuralNetwork.data.meta.inputs = {
    r: {
      dtype: 'number'
    },
    g: {
      dtype: 'number'
    },
    b: {
      dtype: 'number'
    }
  }
  neuralNetwork.data.meta.outputUnits = 9;
  neuralNetwork.data.meta.outputs = {
    label: {
      dtype: 'string',
      uniqueValues: ["green-ish", "pink-ish", "orange-ish", "blue-ish", "brown-ish", "red-ish", "yellow-ish", "purple-ish", "grey-ish"],
      legend: {
        "green-ish": [1, 0, 0, 0, 0, 0, 0, 0, 0],
        "pink-ish": [0, 1, 0, 0, 0, 0, 0, 0, 0],
        "orange-ish": [0, 0, 1, 0, 0, 0, 0, 0, 0],
        "blue-ish": [0, 0, 0, 1, 0, 0, 0, 0, 0],
        "brown-ish": [0, 0, 0, 0, 1, 0, 0, 0, 0],
        "red-ish": [0, 0, 0, 0, 0, 1, 0, 0, 0],
        "yellow-ish": [0, 0, 0, 0, 0, 0, 1, 0, 0],
        "purple-ish": [0, 0, 0, 0, 0, 0, 0, 1, 0],
        "grey-ish": [0, 0, 0, 0, 0, 0, 0, 0, 1]
      }
    },

  }

  classify();
};


function classify() {
  let inputs = {
    r: rSlider.value(),
    g: gSlider.value(),
    b: bSlider.value()
  }
  neuralNetwork.classify({r:inputs.r, g:inputs.g, b:inputs.b}, gotResults);
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