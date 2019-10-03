let notePlayer;
let playing = false;
let frequency;
let osc;

function setup() {
  createCanvas(400, 400).mousePressed(addData);;
  const options = {
    inputs: 2,  // TODO: support ['x', 'y']
    outputs: 1, // TODO: support ['freq]
    debug: true,
  }
  background(0);
  notePlayer = ml5.neuralNetwork(options);
  select('#train').mousePressed(trainModel);
}

function addData() {

  let freq = select('#frequency').value();
  stroke(255);
  noFill();
  ellipse(mouseX, mouseY, 32);
  fill(255);
  textSize(16);
  console.log(freq);
  textAlign(CENTER, CENTER);
  text(freq, mouseX, mouseY);
  // TODO: support notePlayer.data.addData({x: mouseX, y: mouseY}, [parseFloat(freq)]);
  notePlayer.data.addData([mouseX, mouseY], [parseFloat(freq)]);
}

function trainModel() {
  notePlayer.normalizeData();
  const trainingOptions = {
    epochs: 20
  }
  notePlayer.train(trainingOptions, finishedTraining);
}

function finishedTraining() {
  console.log('done');
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.amp(0.5);
  osc.freq(440);
  osc.start();
  notePlayer.predict([mouseX, mouseY], gotFrequency);
}

function gotFrequency(error, outputs) {
  if (error) {
    console.error(error);
    return;
  }
  frequency = parseFloat(outputs[0].value);
  select('#prediction').html(frequency.toFixed(2));
  osc.freq(parseFloat(frequency));
  notePlayer.predict([mouseX, mouseY], gotFrequency);
}

