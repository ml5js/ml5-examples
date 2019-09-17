let nn;

let nn_options = {
    inputs:3,
    outputs:2,
    task: 'classification'
}
function setup(){
    nn = ml5.neuralNetwork(nn_options)
    console.log(nn);
    noLoop();
}

