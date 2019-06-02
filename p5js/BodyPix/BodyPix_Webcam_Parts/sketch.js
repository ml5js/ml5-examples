let bodypix;
let video;
let segmentation;
let img;

const options = {
    outputStride: 8, // 8, 16, or 32, default is 16
    segmentationThreshold: 0.3, // 0 - 1, defaults to 0.5 
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
    options.palette = bodypix.config.palette;
    Object.keys(bodypix.palette).forEach(part => {
        const r = floor(random(255));
        const g = floor(random(255));
        const b = floor(random(255));
        options.palette[part].color = [r, g, b]
    });
}

function createHSBPalette() {
    colorMode(HSB);
    options.palette = bodypix.config.palette;
    Object.keys(options.palette).forEach(part => {
        const h = floor(random(360));
        const s = floor(random(100));
        const b = floor(random(100));
        const c = color(h, s, b)
        options.palette[part].color = c;
    });
}

function createHSBPalette() {
    colorMode(RGB);
    options.palette = bodypix.config.palette;
    Object.keys(options.palette).forEach(part => {
        const r = floor(random(255));
        const g = floor(random(255));
        const b = floor(random(255));
        const c = color(r, g, b)
        options.palette[part].color = c;
    });
}