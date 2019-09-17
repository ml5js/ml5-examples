let nn;

const TRAIN_DATA_PATH = 'data/titanic_train.csv';
const TEST_DATA_PATH = 'data/titanic_test.csv';

let data;
let normalizedData;

function setup() {
  let nn_options = {
    inputs: 3,
    outputs: 2,
    task: 'classification'
  }
  nn = ml5.neuralNetwork(nn_options);

  let data_options = {
    path: TRAIN_DATA_PATH,
    inputKeys: ['age', 'fare', 'is_female'],
    outputKeys: ['survived']
  };
  nn.loadData(data_options, dataLoaded);
}

function dataLoaded(err, results) {
  data = results;
  normalizedData = nn.normalize(data);
  console.log(normalizedData);
  nn.train(normalizedData.inputs, normalizedData.targets, finishedTraining);
}


function finishedTraining(err, results) {
  predict();
}

function predict() {
  const age = floor(random(1, 80))
  const fare = floor(random(0, 500))
  const is_female = floor(random(0, 2))
  // console.log([age, fare, is_female])

  nn.predict([age, fare, is_female], function (err, prediction) {
    console.log(prediction);
    console.log([age, fare, is_female], prediction.output);
  })
}