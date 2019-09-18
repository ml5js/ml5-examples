let classifier;
let data;
let normalizedData;
let submitButton;

function setup() {
  // Create a classification neural network
  let nnOptions = {
    inputs: 3,
    outputs: 2,
    task: 'classification',
  };
  // TODO: debug tf.vis off by default?
  classifier = ml5.neuralNetwork(nnOptions);

  // Load data from a CSV into it
  let dataOptions = {
    dataUrl: 'data/titanic_train.csv',
    inputKeys: ['age', 'fare', 'is_female'],
    outputKeys: ['survived']
  };
  classifier.loadData(dataOptions, dataLoaded);

  submitButton = select('#submit');
  submitButton.mousePressed(predict);
  submitButton.hide();

}

function dataLoaded(err, results) {
  data = results;
  normalizedData = classifier.normalize(data);
  console.log(normalizedData);
  // TODO: epochs could probably be specified here?
  // TODO: ml5 is auto printing loss to console, should have an option epoch event here?
  classifier.train(normalizedData.inputs, normalizedData.targets, finishedTraining);
}

function finishedTraining(err, results) {
  console.log('training complete');
  submitButton.show();
  select('#result').html('training complete.');
}

function predict() {
  let age = parseInt(select('#age').value());
  let fare = parseInt(select('#fare').value());
  // TODO: allow for string labels
  let is_female = parseInt(select('#is_female').value());

  let inputs = [age, fare, is_female];
  classifier.predict(inputs, function (err, results) {
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
  });
}