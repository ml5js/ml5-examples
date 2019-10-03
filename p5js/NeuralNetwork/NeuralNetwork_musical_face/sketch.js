let faceapi;
let video;
let detections;

let faceBrain;
let osc;
let trained = false;
let collecting = false;


function setup() {
  createCanvas(360, 270);
  video = createCapture(VIDEO);
  video.size(width, height);
  // video.hide();

  const faceOptions = {
    withLandmarks: true,
    withExpressions: false,
    withDescriptors: false,
  }
  faceapi = ml5.faceApi(video, faceOptions, modelReady);

  const options = {
    inputs: 68 * 2,
    outputs: 1,
    hiddenUnits: 68,
    learningRate: 0.01,
    debug: true,
  }
  faceBrain = ml5.neuralNetwork(options);
  select('#collectData').mousePressed(collectData);
  select('#train').mousePressed(trainModel);

  osc = new p5.Oscillator();
  osc.setType('sine');
}

function modelReady() {
  faceapi.detect(gotResults);
}

function gotResults(err, result) {
  if (err) {
    console.log(err);
    return;
  }
  detections = result;
  faceapi.detect(gotResults);
}

function draw() {
  background(0);
  if (detections && detections.length > 0) {
    let points = detections[0].landmarks.positions;
    for (let i = 0; i < points.length; i++) {
      stroke(161, 95, 251);
      strokeWeight(4);
      point(points[i]._x, points[i]._y);
    }
  }
  if (collecting) {
    let freq = select('#frequency_slider').value();
    select('#training_freq').html(freq);
    osc.freq(freq);
    let inputs = getInputs();
    if (inputs) {
      faceBrain.data.addData(inputs, [parseFloat(freq)]);
    }
  }
}

function getInputs() {
  if (detections && detections.length > 0) {
    let points = detections[0].landmarks.positions;
    let inputs = [];
    for (let i = 0; i < points.length; i++) {
      inputs.push(points[i]._x);
      inputs.push(points[i]._y);
    }
    return inputs;
  }
}

function collectData() {
  osc.start();
  osc.amp(5);
  collecting = true;
}

function trainModel() {
  collecting = false;
  osc.amp(0);
  faceBrain.data.normalize();
  const trainingOptions = {
    epochs: 50
  }
  faceBrain.train(trainingOptions, finishedTraining);
}

function finishedTraining() {
  console.log('done');
  osc.amp(0.5);
  predict();
}

function predict() {
  let inputs = getInputs();
  faceBrain.predict(inputs, gotFrequency);
}

function gotFrequency(error, results) {
  if (error) {
    console.error(error);
  } else {
    frequency = parseFloat(results.outputs.value);
    osc.freq(frequency);
    select('#prediction').html(frequency.toFixed(2));
    predict();
  }
}
