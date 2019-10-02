let notePlayer;
let playing = false;
let frequency;
let osc;

function setup() {
  createCanvas(400, 400).mousePressed(addData);;
  const options = {
    inputs: 2,  // what about allowing ['x', 'y']?
    outputs: 1, // what about allowing ['x', 'y']?
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
  notePlayer.data.addData([mouseX, mouseY], [parseFloat(freq)]);
}

function trainModel() {
  notePlayer.normalize();
  const trainingOptions = {
    batchSize: 24,
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

function gotFrequency(error, results) {
  if (error) {
    console.error(error);
  } else {
    frequency = parseFloat(results.output[0].value);
    console.log(results);
    select('#prediction').html(frequency.toFixed(2));
    osc.freq(parseFloat(frequency));
    notePlayer.predict([mouseX, mouseY], gotFrequency);
  }
}

