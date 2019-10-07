// Video and PoseNet
let video;
let poseNet;
let poses = [];

// Neural Network
let brain;

// Interface
let dataButton;
let dataLabel;
let trainButton;
let classificationP;

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();

  classificationP = createP('waiting to train model');

  // The interface
  dataLabel = createSelect();
  dataLabel.option('A');
  dataLabel.option('B');

  dataButton = createButton('add example');
  dataButton.mousePressed(addExample);


  trainButton = createButton('train model');
  trainButton.mousePressed(trainModel);

  // Create the model
  let options = {
    inputs: 34,
    outputs: 2,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
}

// Train the model
function trainModel() {
  brain.normalizeData();
  let options = {
    epochs: 25
  }
  brain.train(options, finishedTraining);
}

// Begin prediction
function finishedTraining() {
  classify();
}

// Classify
function classify() {
  if (poses.length > 0) {
    let inputs = getInputs();
    brain.classify(inputs, gotResults);
  }
}

function gotResults(error, results) {
  //  Log output
  // console.log(results);
  classificationP.html(`${results[0].label} (${floor(results[0].confidence * 100)})%`);
  // Classify again
  classify();
}

function getInputs() {
  let keypoints = poses[0].pose.keypoints;
  let inputs = [];
  for (let i = 0; i < keypoints.length; i++) {
    inputs.push(keypoints[i].position.x);
    inputs.push(keypoints[i].position.y);
  }
  return inputs;
}

//  Add a training example
function addExample() {
  if (poses.length > 0) {
    let inputs = getInputs();
    let target = dataLabel.value();
    brain.addData(inputs, [target]);
  }
}

// PoseNet ready
function modelReady() {
  console.log('model loaded');
}

// Draw PoseNet
function draw() {
  image(video, 0, 0, width, height);
  strokeWeight(2);
  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    let pose = poses[0].pose;
    for (let i = 0; i < pose.keypoints.length; i++) {
      fill(213, 0, 143);
      noStroke();
      ellipse(pose.keypoints[i].position.x, pose.keypoints[i].position.y, 8);
    }
  }
}