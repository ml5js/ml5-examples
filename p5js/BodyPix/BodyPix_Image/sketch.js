let bodypix;
let segmentation;
let img;

function preload() {
    img = loadImage('data/harriet.jpg');
}

function setup() {
    createCanvas(480, 560);

    // video.hide(); // Hide the video element, and just show the canvas
    bodypix = ml5.bodyPix(modelReady)
    // background(0);
}

function modelReady() {
    console.log('ready!')
    bodypix.segment(img, gotResults)
}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result);
    segmentation = result;

    background(0);

    // console.log(segmentation.maskPerson)
    // TODO: image seems to be repeating 4x
    image(img, 0, 0, width, height)
    image(segmentation.maskBackground, 0, 0, width, height)

}