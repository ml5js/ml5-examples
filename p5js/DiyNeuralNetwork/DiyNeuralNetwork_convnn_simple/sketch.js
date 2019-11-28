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
const IMAGE_WIDTH = 64;
const IMAGE_HEIGHT = 64;
const IMAGE_CHANNELS = 4;

let images;
let testA;
function preload(){
  images = [];
  for(let i = 1; i < 7; i++){
    const a = loadImage(`images/A_0${i}.png`)
    const b = loadImage(`images/B_0${i}.png`)
    images.push({image:a, label: 'a'})
    images.push({image:b, label: 'b'})
  }

  testA = loadImage(`images/A_test.png`)
  
}

function setup() {
    images.forEach(item => item.image.loadPixels())
    console.log(images)
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
      units:2,
      kernelInitializer: 'varianceScaling',
      activation: 'softmax'
    }))

    const BATCH_SIZE = 2;
    // const TRAIN_DATA_SIZE = 5500;
    // const TEST_DATA_SIZE = 1000;

    const inputs = ml5.tf.tidy( () => {
      const imageList = images.map(item => {
        const arr = Array.from(item.image.pixels)
        const min = nn.neuralNetworkData.getMin(arr);
        const max = nn.neuralNetworkData.getMax(arr);

        return nn.neuralNetworkData.normalizeArray(arr, {min, max})
      })
      return ml5.tf.tensor(imageList, [images.length, IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS])
    })
    
    const oneHotLabels = nn.neuralNetworkData.createOneHotEncodings(['a', 'b'])
    const labelList = images.map(item => {
      return oneHotLabels.legend[item.label]
    })
    
    const outputs = ml5.tf.tensor(labelList, [images.length, oneHotLabels.uniqueValues.length])

    inputs.print()
    outputs.print()

    // const [trainXs, trainYs] = ml5.tf.tidy(() => {
    //   const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
    //   return [
    //     d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
    //     d.labels
    //   ];
    // });
  
    // const [testXs, testYs] = ml5.tf.tidy(() => {
    //   const d = data.nextTestBatch(TEST_DATA_SIZE);
    //   return [
    //     d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
    //     d.labels
    //   ];
    // });
  
    // compile the model
    nn.compile({
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']}
    );

    nn.neuralNetwork.train({
      inputs,
      outputs,
      batchSize: BATCH_SIZE,
      // validationData: [inputs, outputs],
      epochs: 30,
      shuffle: false,
      whileTraining: (epoch, loss) => {
        console.log(`epoch:${epoch}, loss: ${loss.loss}`);
      },
    }, finishedTraining)


  function finishedTraining(err, result){

    if(err) {
      console.log(err); 
      return
    }

    testA.loadPixels();
    const normalized = nn.neuralNetworkData.normalizeArray( Array.from(testA.pixels),{min: 0, max:255});
    testATensor = ml5.tf.tensor( [normalized ], [1, IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS])
    
    testATensor.print();
    nn.neuralNetwork.classify(testATensor, {outputs:{label:oneHotLabels}}, (err, result) =>{
      if(err){
        console.log(err);
        return;
      }
      console.log(result);
      testATensor.dispose();
    })

    inputs.dispose();
    outputs.dispose();
    // console.log(doPrediction(nn.neuralNetwork.model, data))
  }


}





// function doPrediction(model, data, testDataSize = 500) {
//   const IMAGE_WIDTH = 28;
//   const IMAGE_HEIGHT = 28;
//   const testData = data.nextTestBatch(testDataSize);
//   const testxs = testData.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
//   const labels = testData.labels.argMax([-1]);
//   const preds = model.predict(testxs).argMax([-1]);
//   const output = {
//     labels: labels.arraySync(),
//     prediction: preds.arraySync()
//   }
//   testxs.dispose();
//   preds.dispose();
//   labels.dispose();
//   return output
// }