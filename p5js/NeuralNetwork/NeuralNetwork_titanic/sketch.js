let nn;

const TRAIN_DATA_PATH = 'data/titanic_train.csv';
const TEST_DATA_PATH = 'data/titanic_test.csv';
let data;
let normalizedData;
let nn_options = {
    inputs:3,
    outputs:2,
    outputKeys: ['survived'],
    inputKeys: ['age', 'fare', 'is_female'],
    task: 'classification'
}
function setup(){
    nn = ml5.neuralNetwork(nn_options);
    
    nn.loadData(TRAIN_DATA_PATH, dataLoaded);

    
    noLoop();
}

function dataLoaded(err, results){
    data = results
    normalizedData = nn.normalize(data);

    nn.train(normalizedData.inputs, normalizedData.labels, finishedTraining)
}


function finishedTraining(err, results){
    predict();
}

function predict(){
    const age = floor( random(1, 80) ) 
    const fare = floor( random(0, 500) )
    const is_female = floor( random(0, 2) )
    // console.log([age, fare, is_female])

    nn.predict([age, fare, is_female], function(err, prediction){
        console.log([age, fare, is_female],prediction.output)
    })
}