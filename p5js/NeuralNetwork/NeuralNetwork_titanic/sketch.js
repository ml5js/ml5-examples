let neuralNetwork;
let submitButton;

function setup() {
  noCanvas();

  let nnOptions = {
    dataUrl: 'data/titanic_cleaned_withclass.csv',
    inputs: ['fare_class', 'sex', 'age', 'fare'],
    outputs: ['survived'],
    task: 'classification'
  };

  neuralNetwork = ml5.neuralNetwork(nnOptions, modelReady)
  submitButton = select('#submit');
  submitButton.mousePressed(classify);
  submitButton.hide();
}

function modelReady() {
  console.log('classification', neuralNetwork);
  neuralNetwork.data.normalize();

  const trainingOptions = {
    epochs: 50,
    batchSize: 32
  }

  neuralNetwork.train(trainingOptions, whileTraining, finishedTraining);
}

function whileTraining(epoch, loss) {
  console.log(epoch, loss);
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
  //   fare_class: fare_class,
  //   sex: sex
  // };

  let inputs = [fare_class, sex, age, fare];
  neuralNetwork.classify(inputs, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
  } else {
    console.log(results);
    const output = results.output[0][0];

    if (output.confidence > 0.5) {
      select('#result').html('prediction: they died');
    } else {
      select('#result').html('prediction: they lived');
    }

  }
}
