// Porting XOR with tf.js to ml5!
// https://youtu.be/N3ZnNa01BPM

let model;
let resolution = 20;
let cols;
let rows;

function setup() {
  createCanvas(400, 400);
  cols = width / resolution;
  rows = height / resolution;

  let options = {
    inputs: 2,
    outputs: 1,
    learningRate: 0.25
  }
  model = ml5.neuralNetwork(options);

  //model = ml5.neuralNetwork(2, 1);
  model.data.addData([0, 0], [0]);
  model.data.addData([1, 0], [1]);
  model.data.addData([0, 1], [1]);
  model.data.addData([1, 1], [0]);
  model.data.normalize();
  model.train({ epochs: 200 }, whileTraining, finishedTraining);

}


function whileTraining(epoch, loss) {
  console.log(epoch, loss);
}

function finishedTraining() {
  console.log('done!');
  // TODO: Support prediction on multiple rows of input data
  // let xs = [];
  // for (let i = 0; i < cols; i++) {
  //   for (let j = 0; j < rows; j++) {
  //     let x1 = i / cols;
  //     let x2 = j / rows;
  //     xs.push([x1, x2]);
  //   }
  // }
  // model.predict(xs, gotResults);
  model.predict([1, 0], gotResults);
}

function gotResults(error, results) {
  console.log(results);
}

function draw() {
  background(0);
  // ml5.tf.tidy(() => {
  //   // Get the predictions
  //   let ys = model.predict(xs);
  //   let y_values = ys.dataSync();

  let index = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let br = 255; //y_values[index] * 255
      fill(br);
      rect(i * resolution, j * resolution, resolution, resolution);
      fill(255 - br);
      textSize(8);
      textAlign(CENTER, CENTER);
      text(nf(0.5, 1, 2), i * resolution + resolution / 2, j * resolution + resolution / 2)
      //text(nf(y_values[index], 1, 2), i * resolution + resolution / 2, j * resolution + resolution / 2)
      index++;
    }
  }
}