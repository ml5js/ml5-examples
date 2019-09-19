let nn;
let submitButton;
let nnOptions = {
  dataUrl: 'data/titanic_train-experimental.csv',
  inputs: ['age', 'fare', 'is_female'],
  outputs: ['survived_string'],
  task: 'classification',
  epochs: 50,
  batchSize: 16
};

function setup(){
  nn = ml5.neuralNetwork(nnOptions, modelReady)
  
  submitButton = select('#submit');
  submitButton.mousePressed(predict);
  // submitButton.hide();

}


function modelReady(){
  console.log('classification', nn);
  nn.data.shuffle();
  nn.data.normalize();
  nn.train(finishedTraining);
}

function whileTraining(){
  console.log('training...')
}

function finishedTraining(){
  console.log('done!')
  predict()
}

function predict() {
  let age = parseInt(select('#age').value());
  let fare = parseInt(select('#fare').value());
  // TODO: allow for string labels
  let is_female = parseInt(select('#is_female').value());

  let inputs = [age, fare, is_female];
  nn.predict(inputs, function (err, results) {
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


// /////////////////////////////////////////////

// let classifier;
// let data;
// let normalizedData;
// let submitButton;

// function setup() {
//   // Create a classification neural network


//   // | age   | fareclass | status |
//   // ------------------------------
//   // | 50    | "first"   | "lived"  -> 50 0 0 1 * 1 0
//   // | 25    | "second"  | "died"   -> 25 0 1 0 * 0 1
//   // | 20    | "third"   | "lived"  -> 20 1 0 0 * 1 0

//   let nnOptions = {
//     data: 'data/titanic_train.csv',
//     inputs: ['age', 'fareclass' ],
//     outputs: ['status'],
//     task: 'classification'
//   };

//   ///////////
//   let nnOptions = {
//     data: 'data/titanic_train.csv',
//     inputs: ['age', 'fare', 'is_female'],
//     outputs: ['survived'],
//     task: 'classification'
//     // batchSize: 32,
//     // epochs: 100
//   };
//   // TODO: debug tf.vis off by default?
//   let classifier = ml5.neuralNetwork(nnOptions);


//   // classifier.data.map('fare', val => val / valMax);
//   classifier.data.normalize();
//   classifier.data.shuffle();

//   classifier.train(whileTraining, finishedTraining);


//   let nnOptions = {
//     inputs: 2,
//     outputs: 1
//   };
//   // let nnOptions = {
//   //   inputs: ['mousexpos','mouseypos'],
//   //   outputs: ['note']
//   // };


//   // TODO: debug tf.vis off by default?
//   let nn = ml5.neuralNetwork(nnOptions);
//   classifier.data.add([mouseX, mouseY, value]);
//   classifier.data.add([mouseX, mouseY], [value]);


//   // classifier.data.add({
//   //   mousexpos: mouseX,
//   //   mouseypos: mouseY,
//   //   note: 'A' 
//   // });


//   classifier.train(whileTraining, finishedTraining);



//   // let nnOptions = {
//   //   inputs: 3,
//   //   outputs: 2,
//   //   task: 'classification',
//   //   // batchSize: 32,
//   //   // epochs: 100
//   // };
//   // // TODO: debug tf.vis off by default?
//   // classifier = ml5.neuralNetwork(nnOptions);

//   // // Load data from a CSV into it
//   // let dataOptions = {
//   //   dataUrl: 'data/titanic_train.csv',
//   //   inputKeys: ['age', 'fare', 'is_female'],
//   //   outputKeys: ['survived']
//   // };
//   // classifier.loadData(dataOptions, dataLoaded);

//   submitButton = select('#submit');
//   submitButton.mousePressed(predict);
//   submitButton.hide();

// }

// function dataLoaded(err, results) {
//   data = results;
//   classifier.shuffle(data)
//   normalizedData = classifier.normalize(data);
//   console.log(normalizedData);
//   // TODO: epochs could probably be specified here?
//   // TODO: ml5 is auto printing loss to console, should have an option epoch event here?
//   classifier.train(normalizedData.inputs, normalizedData.targets, finishedTraining);
// }

// function finishedTraining(err, results) {
//   console.log('training complete');
//   submitButton.show();
//   select('#result').html('training complete.');
// }

// function predict() {
//   let age = parseInt(select('#age').value());
//   let fare = parseInt(select('#fare').value());
//   // TODO: allow for string labels
//   let is_female = parseInt(select('#is_female').value());

//   let inputs = [age, fare, is_female];
//   classifier.predict(inputs, function (err, results) {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(results);
//       if (results.output[0] > 0.5) {
//         select('#result').html('prediction: they died');
//       } else {
//         select('#result').html('prediction: they lived');
//       }
//       // TODO:
//       // This would only work for classification but maybe we should reformat the output into
//       // sorted labels and confidence scores?
//       // console.log(results[0].label);
//       // console.log(results[0].confidence);
//     }
//   });
// }