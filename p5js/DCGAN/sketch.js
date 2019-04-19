// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
DCGAN example
=== */
let dcgan;
let outputCanvas; 
let button; 
let statusMsg;

function setup() {

    //load the model
    //we can have multiple pre-trained models (e.g. cats, flowers, etc.), just like SketchRNN
    dcgan = ml5.DCGAN('people', modelReady);

    

    // //status message
    // statusMsg = createP('status');

    // //button to generate an image
    // button = createButton('generate');
    // button.mousePressed(generate);

    // //canvas for the output image
    // outputCanvas = select('#canvas');
}

function generate() {
    //the generate function takes an output canvas to draw on
    //and a callback with possible info like time elapsed to generate the image
    dcgan.generate(outputCanvas, (err, result) => {
        //some callback
        if(err){
            console.log(err);
            return
        }
        console.log(result)
    });
}

function modelReady() {
    console.log(dcgan)
    // select('#status').html('model ready');
    // generate();
}