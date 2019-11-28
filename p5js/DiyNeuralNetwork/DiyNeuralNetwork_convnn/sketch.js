// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */
let nn;
const IMAGE_WIDTH = 28;
const IMAGE_HEIGHT = 28;
const IMAGE_CHANNELS = 1;
const classNames = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

let data;
async function loadData(){
  data = new MnistData();
  await data.load();
  return data
}

function setup() {

  loadData().then((data) => {
    console.log(data);
    
    const options = {
      task: 'classification'
    }

    nn = ml5.diyNeuralNetwork(options);
    // add some layers
    // conv
    nn.addLayer(nn.createConv2dLayer({
      inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
    }))
    // max pooling
    nn.addLayer(
      ml5.tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]})
    )
    // conv
    nn.addLayer(nn.createConv2dLayer({
      filters: 16,
      activation: 'relu',
      kernelInitializer: 'varianceScaling'
    }))
    // max pooling
    nn.addLayer(
      ml5.tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]})
    )
    nn.addLayer(ml5.tf.layers.flatten());
  
    // dense layer
    nn.addLayer(nn.createDenseLayer({
      units:10,
      kernelInitializer: 'varianceScaling',
      activation: 'softmax'
    }))

    const BATCH_SIZE = 512;
    const TRAIN_DATA_SIZE = 5500;
    const TEST_DATA_SIZE = 1000;

    const [trainXs, trainYs] = ml5.tf.tidy(() => {
      const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
      return [
        d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
        d.labels
      ];
    });
  
    const [testXs, testYs] = ml5.tf.tidy(() => {
      const d = data.nextTestBatch(TEST_DATA_SIZE);
      return [
        d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
        d.labels
      ];
    });
  
    // compile the model
    nn.compile({
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']}
    );

    // nn.neuralNetwork.train({
    //   inputs: trainXs, 
    //   outputs: trainYs,
    //   batchSize: BATCH_SIZE,
    //   validationData: [testXs, testYs],
    //   epochs: 10,
    //   shuffle: true,
    //   whileTraining: (epoch, loss) => {
    //     console.log(`epoch:${epoch}, loss: ${loss.loss}`);
    //   },
    // }, finishedTraining)

  })

  function finishedTraining(err, result){

    if(err) console.log(err);
    console.log(result)

    console.log(doPrediction(nn.neuralNetwork.model, data))
  }

  
}





function doPrediction(model, data, testDataSize = 500) {
  const IMAGE_WIDTH = 28;
  const IMAGE_HEIGHT = 28;
  const testData = data.nextTestBatch(testDataSize);
  const testxs = testData.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
  const labels = testData.labels.argMax([-1]);
  const preds = model.predict(testxs).argMax([-1]);
  const output = {
    labels: labels.arraySync(),
    prediction: preds.arraySync()
  }
  testxs.dispose();
  preds.dispose();
  labels.dispose();
  return output
}