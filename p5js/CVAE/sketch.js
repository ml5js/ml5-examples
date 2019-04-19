// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
CVAE example using p5.js
=== */
let cvae;

function setup() {
    createCanvas(640, 480);
    
    //Create a new instance with pretrained model
    cvae = ml5.CVAE('./model/quick_draw/manifest.json', modelLoaded)
}

// when mouse moved and the offset is greater than 20 we re-generate a new image
function mouseMoved() {
    if (Math.abs(mouseX - pmouseX) >= 20 && cvae.ready) {
        cvae.generate(cvae.labels[0], (err, res) => {
            image(res.image, 0, 0)
        });
    }
}


function modelLoaded() {
    cvae.generate(cvae.labels[0], (err, res) => {
        image(res.image, 0, 0)
    });
    
}