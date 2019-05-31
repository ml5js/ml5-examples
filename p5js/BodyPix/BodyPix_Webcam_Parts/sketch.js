
console.log('bodyPix', ml5.bodyPix);

let bodypix;
let video;
let segmentation;
let img;

const options = {
    palette: [
        [127,103,14],[222,9,77],[17,223,92],[95,107,62],
        [112,173,9],[189,161,46],[239,196,5],[155,143,78],
        [134,165,84],[153,124,215],[111,60,183],[203,51,155],
        [68,245,152],[70,160,237],[195,148,225],[165,160,237],
        [4,24,186],[120,210,162],[141,253,217],[117,61,51],
        [244,184,186],[57,162,173],[7,252,62],[47,180,5]],
    outputStride: 8, // 8, 16, or 32, default is 16
    segmentationThreshold: 0.3 // 0 - 1, defaults to 0.5 
}

function setup(){
    createCanvas(320, 240);

    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
    // video.hide(); // Hide the video element, and just show the canvas
    bodypix = ml5.bodyPix(video, modelReady)

    // // create your own custom rgb color palette 
    // options.palette = [];
    // for(let i = 0; i < 24; i++){
    //     let r = floor(random(255));
    //     let g = floor(random(255));
    //     let b = floor(random(255));
    //     options.palette.push([r, g, b])
    // }
    // console.log(JSON.stringify(options.palette))
}

function modelReady(){
    console.log('ready!')
    bodypix.segmentWithParts(gotResults, options)
}

function gotResults(err, result){
    if(err){
        console.log(err)
        return
    }
    segmentation = result;
    
    image(video, 0,0, width, height)
    image(segmentation.image, 0, 0, width, height)
    
    bodypix.segmentWithParts(gotResults, options)
    
}