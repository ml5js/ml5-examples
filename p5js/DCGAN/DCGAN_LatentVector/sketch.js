// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
DCGAN example
=== */

let dcgan;
// vector 1
let a = [];
// vector 2
let b = [];
// vector to interpolate between 1 and 2
let c = [];
// counter variable
let x = 0;

function preload() {
    dcgan = ml5.DCGAN('model/geo/manifest.json');
}

function setup() {
    createCanvas(600, 600);

    // create 2 arrays to hold random values for our latent vector
    for (let i = 0; i < 128; i++) {
        a[i] = Math.random() * 2 - 1;
        b[i] = Math.random() * 2 - 1;
    }

    // generate an image on load
    generate()
}


function generate() {
    // fill the latent vector with the interpolation between a and b
    for (let i = 0; i < 128; i++) {
        c[i] = lerp(a[i], b[i], x);
    }

    dcgan.generate(displayImage, c);
}

function displayImage(err, result) {
    if (err) {
        console.log(err);
        return;
    }
    image(result.image, 0, 0, width, height);
    generate();

    // check to see if x is greater than 1, if so create a new a and b 
    if (x > 1) {
        for (let i = 0; i < 128; i++) {
            a[i] = b[i];
            b[i] = randomGaussian();
        }
        x = 0;
    }
    // increment the x to cycle through the latent vector
    x += 0.1;
}