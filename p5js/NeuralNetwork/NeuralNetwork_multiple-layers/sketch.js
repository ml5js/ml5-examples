let nn;
const nn_options = {
    inputs: 1,
    outputs: 1,
    layers: [
        ml5.tf.layers.dense({
            units: 16,
            inputShape: [1],
            activation: 'relu',
        }),
        ml5.tf.layers.dense({
            units: 16,
            activation: 'sigmoid',
        }),
        ml5.tf.layers.dense({
            units: 1,
            activation: 'sigmoid',
        })
    ],
    debug: true
}

function setup() {
    createCanvas(400, 400);
    background(240);
    nn = ml5.neuralNetwork(nn_options);
    console.log(nn);
    createTrainingData();

    nn.normalizeData();
    const train_options = {
        epochs: 32
    }
    nn.train(train_options, finishedTraining);
}

function finishedTraining(){

    nn.predict([10], function(err, result){
        if(err){
            console.log(err);
            return
        }
        console.log(result)
    })

    nn.predict([390], function(err, result){
        if(err){
            console.log(err);
            return
        }
        console.log(result)
    })
}

function createTrainingData(){
    for(let i = 0; i < 400; i++){
        if(i%2){
            const x = floor(random(0, width/2));
            nn.addData([x], [0])
        }else {
            const x = floor(random(width/2, width));
            nn.addData([x], [1])
        }
    }
    
}

// function draw(){

// }
