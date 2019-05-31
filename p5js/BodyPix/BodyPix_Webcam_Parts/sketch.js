let bodypix;
let video;
let segmentation;
let img;

const options = {
    outputStride: 8, // 8, 16, or 32, default is 16
    segmentationThreshold: 0.3, // 0 - 1, defaults to 0.5 
    palette: {
        "leftFace": {
            "color": [1, 86, 169]
        },
        "rightFace": {
            "color": [253, 144, 158]
        },
        "rightUpperLegFront": {
            "color": [33, 81, 39]
        },
        "rightLowerLegBack": {
            "color": [131, 36, 128]
        },
        "rightUpperLegBack": {
            "color": [55, 213, 211]
        },
        "leftLowerLegFront": {
            "color": [71, 168, 165]
        },
        "leftUpperLegFront": {
            "color": [143, 68, 233]
        },
        "leftUpperLegBack": {
            "color": [184, 254, 110]
        },
        "leftLowerLegBack": {
            "color": [5, 77, 79]
        },
        "rightFeet": {
            "color": [123, 232, 194]
        },
        "rightLowerLegFront": {
            "color": [34, 249, 217]
        },
        "leftFeet": {
            "color": [176, 249, 74]
        },
        "torsoFront": {
            "color": [9, 200, 165]
        },
        "torsoBack": {
            "color": [193, 219, 156]
        },
        "rightUpperArmFront": {
            "color": [39, 9, 249]
        },
        "rightUpperArmBack": {
            "color": [162, 120, 123]
        },
        "rightLowerArmBack": {
            "color": [43, 213, 217]
        },
        "leftLowerArmFront": {
            "color": [78, 83, 154]
        },
        "leftUpperArmFront": {
            "color": [54, 73, 83]
        },
        "leftUpperArmBack": {
            "color": [208, 200, 164]
        },
        "leftLowerArmBack": {
            "color": [88, 36, 41]
        },
        "rightHand": {
            "color": [55, 5, 128]
        },
        "rightLowerArmFront": {
            "color": [134, 198, 101]
        },
        "leftHand": {
            "color": [65, 234, 109]
        }
    }
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
    Object.keys(options.palette).forEach(part => {
        const r = floor(random(255));
        const g = floor(random(255));
        const b = floor(random(255));
        options.palette[part].color = [r, g, b]
    });
}

function createHSBPalette() {
    colorMode(HSB);
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
    Object.keys(options.palette).forEach(part => {
        const r = floor(random(255));
        const g = floor(random(255));
        const b = floor(random(255));
        const c = color(r, g, b)
        options.palette[part].color = c;
    });
}