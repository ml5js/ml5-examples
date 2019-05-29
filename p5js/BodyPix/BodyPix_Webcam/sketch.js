
console.log('bodyPix', ml5.bodyPix);

let bodypix;
let video;
function setup(){
    createCanvas(640, 480);

    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide(); // Hide the video element, and just show the canvas
    bodypix = ml5.bodyPix(video, modelReady)
    
}

function modelReady(){
    console.log('ready!')
}

function draw(){
    background(200);

}