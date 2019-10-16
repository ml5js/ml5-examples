let kmeans;
let data = [];

let colorDict;
const imgSize = 40;
let baseImage;

function preload(){
    // img = loadImage('data/brooklyn-aerial.jpg')
    img = loadImage('data/world.jpg')
}

function setup() {
    // colorMode(HSB, 360, 100, 100, 100);

    colorDict = {
        0: [88, 214, 141], // green
        1: [ 202, 207, 210], // grey
        2: [  97, 106, 107 ], // dark grey
        3: [ 44, 62, 80 ], // navy
        4: [ 249, 231, 159 ] // yellow
      }
    
      const options = {
        'k': 3,
        'maxIter': 4,
        'threshold': 0.5,
      };

    //   pixelDensity(0.5);
    createCanvas(200, 200);
    
    img.resize(imgSize, imgSize);

    // image(img, 0,0, width, height)
    // R, G, B, A
    img.loadPixels();

    for (let x = 0; x < imgSize; x++) {
        for (let y = 0; y < imgSize; y++) {
            let off = (y * imgSize + x) * 4;
            const r = img.pixels[off];
            const g = img.pixels[off+1];
            const b = img.pixels[off+2];
            const a = img.pixels[off+3];
            // const newColor = color([r, g, b,a]);
            // console.log(newColor);
            data.push({r, g, b});
        }
    }

    baseImage = select('#baseImage');
    baseImageCtx = baseImage.elt.getContext('2d');
    baseImageCtx.drawImage(img.canvas, 0,0, width, height);
    

    kmeans = ml5.kmeans(data, options, modelReady)
    // textAlign(RIGHT);
}

function modelReady() {
    console.log('ready!')
    // console.log(kmeans);

    const dataset = kmeans.dataset;

    let segmented = createImage(imgSize, imgSize);
    segmented.loadPixels();

    for (let x = 0; x < segmented.width; x++) {
        for (let y = 0; y < segmented.height; y++) {
            let off = (x * imgSize + y);
            const c = colorDict[dataset[off].centroid]
            segmented.set(x, y, color(c) );
        }
    }
    segmented.updatePixels();
    // scale(4)
    image(segmented,0,0, width, height);
    
}