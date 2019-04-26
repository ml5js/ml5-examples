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
    createCanvas(400, 400)
    //load the model
    //we can have multiple pre-trained models (e.g. cats, flowers, etc.), just like SketchRNN
    dcgan = ml5.DCGAN('face', modelReady);

    // //button to generate an image
    button = createButton('generate');
    button.mousePressed(generate);

}

function generate() {
    //the generate function takes an output canvas to draw on
    //and a callback with possible info like time elapsed to generate the image
    dcgan.generate((err, result) => {
        //some callback
        if(err){
            console.log(err);
            return
        }
        image(result.image, 0, 0, 400, 400)
    });
}

function modelReady() {
    console.log(dcgan)
    generate();
}