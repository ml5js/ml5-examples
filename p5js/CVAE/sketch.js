// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
CVAE example using p5.js
=== */
let cvae;
let labelElement;
let generatedImage;
let labelToDraw = 0; // apple

function setup() {
    createCanvas(400, 400);

    labelName = createP('')
    //Create a new instance with pretrained model
    cvae = ml5.CVAE('./model/quick_draw/manifest.json', generateImage)
}

// Generate a new image on mouseMoved()
function mouseMoved() {
    generateImage()
}

function keyPressed(){
    if(keyCode === UP_ARROW && labelToDraw < cvae.labels.length - 1){
        labelToDraw++;
        generateImage()
    }
    if(keyCode === DOWN_ARROW && labelToDraw > 0){
        labelToDraw--;
        generateImage()
    }
}

function generateImage() {
    // label 6: apple
    cvae.generate(cvae.labels[labelToDraw], (err, res) => {
        generatedImage = res.image;
    });
}

function draw() {
    background(200)
    if (generatedImage) {
        labelName.html(cvae.labels[labelToDraw])
        image(generatedImage, 0, 0, height, height)

    }

}