

let pixelBrain;
let video;


let ready = false;
let w;

function setup() {
  createCanvas(200, 200);
  video = createCapture(VIDEO, videoReady);
  let res = 10;
  video.size(res, res);
  video.hide();
  let totalPixels = res * res * 3;
  const options = {
    inputs: totalPixels,
    outputs: 1,
    hiddenUnits: floor(totalPixels / 2),
    activationHidden: 'relu',
    learningRate: 0.01,
    debug: true,
  }
  pixelBrain = ml5.neuralNetwork(options);
  select('#addExample').mousePressed(addExample);
  select('#train').mousePressed(trainModel);
  w = width / res;
}

function videoReady() {
  ready = true;
}

function draw() {
  background(0);
  if (ready) {
    video.loadPixels();
    for (let x = 0; x < video.width; x++) {
      for (let y = 0; y < video.height; y++) {
        let index = (x + y * video.width) * 4;
        let r = video.pixels[index + 0];
        let g = video.pixels[index + 1];
        let b = video.pixels[index + 2];
        noStroke();
        fill(r, g, b);
        rect(x * w, y * w, w, w);
      }
    }
  }

}

function getInputs() {
  video.loadPixels();
  let inputs = [];
  for (let i = 0; i < video.width * video.height; i++) {
    let index = i * 4;
    inputs.push(video.pixels[index + 0]);
    inputs.push(video.pixels[index + 1]);
    inputs.push(video.pixels[index + 2]);
  }
  return inputs;
}

function addExample() {
  let freq = select('#frequency').value();
  video.loadPixels();
  let inputs = getInputs();
  pixelBrain.data.addData(inputs, [parseFloat(freq)]);
}

function trainModel() {
  pixelBrain.data.normalize();
  const trainingOptions = {
    epochs: 100
  }
  pixelBrain.train(trainingOptions, finishedTraining);
}

function finishedTraining() {
  console.log('done');
  predict();
}

function predict() {
  let inputs = getInputs();
  pixelBrain.predict(inputs, gotFrequency);
}

function gotFrequency(error, results) {
  if (error) {
    console.error(error);
  } else {
    frequency = parseFloat(results.outputs.value);
    console.log(results);
    select('#prediction').html(frequency.toFixed(2));
    // osc.freq(parseFloat(frequency));
    predict();
  }
}

