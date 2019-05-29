
console.log('bodyPix', ml5.bodyPix);

let bodypix;
let video;
let segmentation;
let img;
function setup(){
    createCanvas(320, 240);

    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
    // video.hide(); // Hide the video element, and just show the canvas
    bodypix = ml5.bodyPix(video, modelReady)
    // background(0);
}

function modelReady(){
    console.log('ready!')
    console.log(bodypix)
    bodypix.segmentWithParts(video, gotResults)
}

function gotResults(err, result){
    if(err){
        console.log(err)
        return
    }
    segmentation = result;
    // background(0);
    image(video, 0,0, width, height)
    image(segmentation.image, 0, 0, width, height)
    

    bodypix.segmentWithParts(video, gotResults)
    
}