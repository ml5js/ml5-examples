let nn;
let submitButton;

function setup() {
  noCanvas();

  let nnOptions = {
    dataUrl: 'data/titanic_cleaned.csv',
    inputs: ['fare_class','sex', 'age', 'fare'],
    outputs: ['survived'],
    task: 'classification',
    debug: true
  };

  nn = ml5.diyNeuralNetwork(nnOptions, modelReady)
  submitButton = select('#submit');
  submitButton.mousePressed(classify);
  submitButton.hide();
}

function modelReady() {
  nn.normalizeData();
  console.log(nn)
  nn.train({ epochs: 10 }, whileTraining, finishedTraining);
}

function whileTraining(epoch, logs) {
  console.log(`Epoch: ${epoch} - loss: ${logs.loss.toFixed(2)}`);
}

function finishedTraining() {
  console.log('done!');
  submitButton.show();
  classify();
}

// TODO: normalize and encode values going into predict?
function classify() {
  let age = parseInt(select('#age').value());
  let fare = parseInt(select('#fare').value());
  let fare_class = select('#fare_class').value();
  let sex = select('#sex').value();

  // let inputs = {
  //   age: age,
  //   fare: fare,
  //   fare_class: 'first', // [0,1,0],
  //   sex: 'female', //[0,1]
  // };

  // let inputs = [0,1,0, 0, 1, 0.25, 1];
  let inputs = ['first','female', age, fare]
  nn.classify(inputs, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
  } else {
    console.log(results);
    select('#result').html(`prediction: ${results[0].label}`);
  }
}
