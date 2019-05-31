let bodypix;
let video;
let segmentation;
let img;

const options = {
    palette: [
        [127, 103, 14], //  leftFace
        [222, 9, 77], //  rightFace
        [17, 223, 92], //  rightUpperLegFront
        [95, 107, 62], //  rightLowerLegBack
        [112, 173, 9], //  rightUpperLegBack
        [189, 161, 46], //  leftLowerLegFront
        [239, 196, 5], //  leftUpperLegFront
        [155, 143, 78], //  leftUpperLegBack
        [134, 165, 84], //  leftLowerLegBack
        [153, 124, 215], //  rightFeet
        [111, 60, 183], //  rightLowerLegFront
        [203, 51, 155], //  leftFeet
        [68, 245, 152], //  torsoFront
        [70, 160, 237], //  torsoBack
        [195, 148, 225], //  rightUpperArmFront
        [165, 160, 237], //  rightUpperArmBack
        [4, 24, 186], //  rightLowerArmBack
        [120, 210, 162], //  leftLowerArmFront
        [141, 253, 217], //  leftUpperArmFront
        [117, 61, 51], //  leftUpperArmBack
        [244, 184, 186], //  leftLowerArmBack
        [57, 162, 173], //  rightHand
        [7, 252, 62], //  rightLowerArmFront
        [47, 180, 5] //  leftHand
    ],
    outputStride: 8, // 8, 16, or 32, default is 16
    segmentationThreshold: 0.3 // 0 - 1, defaults to 0.5 
}

function setup() {
    createCanvas(320, 240);

    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
    // video.hide(); // Hide the video element, and just show the canvas
    bodypix = ml5.bodyPix(video, modelReady)

    // Create a palette - uncomment to test below
    createHSBPalette();
    // createRGBPalette();
    // createSimplePalette();
}

function modelReady() {
    console.log('ready!')
    bodypix.segmentWithParts(gotResults, options)
}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    segmentation = result;

    image(video, 0, 0, width, height)
    image(segmentation.image, 0, 0, width, height)

    bodypix.segmentWithParts(gotResults, options)

}

function createSimplePalette() {
    options.palette = [];
    for (let i = 0; i < 25; i++) {
        let r = floor(random(255));
        let g = floor(random(255));
        let b = floor(random(255));
        options.palette.push([r, g, b])
    }
}

function createHSBPalette() {
    options.palette = [];
    colorMode(HSB)
    for (let i = 0; i < 25; i++) {
        let c = color(random(360), random(100), random(100));
        options.palette.push(c)
    }
}

function createRGBPalette() {
    options.palette = [];
    colorMode(RGB)
    for (let i = 0; i < 25; i++) {
        let c = color(random(255), random(255), random(255));
        options.palette.push(c)
    }
}