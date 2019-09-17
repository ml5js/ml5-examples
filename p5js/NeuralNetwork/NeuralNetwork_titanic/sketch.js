let nn;

const TRAIN_DATA_PATH = 'data/titanic_train.csv';
const TEST_DATA_PATH = 'data/titanic_test.csv';
let data;

let nn_options = {
    inputs:3,
    outputs:2,
    outputKeys: ['survived'],
    inputKeys: ['age', 'fare', 'is_female'],
    task: 'classification'
}
function setup(){
    nn = ml5.neuralNetwork(nn_options);
    
    nn.loadData(TRAIN_DATA_PATH, function(err, results){
        data = results;
        
        console.log(data);
    });

    
    noLoop();
}

