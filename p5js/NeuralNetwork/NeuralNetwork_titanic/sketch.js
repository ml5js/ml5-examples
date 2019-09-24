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
  //submitButton.mousePressed(classify);
  submitButton.hide();
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

  // TODO: Support inputs same as data formats: ['fare_class', 'sex', 'age', 'fare'],
  // TODO: Autonormalize or more likely include extra step of normalizaton
  // let inputs = [fare_class, sex, age, fare,];

  // Evenutally also support objects
  // let inputs = {
  //   age: 32,
  //   fare: 100,
  //   fare_class: 'first',
  //   sex: 'female'
  // };

  // For testing now
  let inputs = [0.32, 0.7, 0, 0, 1, 0, 1];
  neuralNetwork.classify(inputs, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
  } else {
    console.log(results);
    if (results.output[0] > 0.5) {
      select('#result').html('prediction: they died');
    } else {
      select('#result').html('prediction: they lived');
    }
    // TODO:
    // This would only work for classification but maybe we should reformat the output into
    // sorted labels and confidence scores?
    // console.log(results[0].label);
    // console.log(results[0].confidence);
  }
}
