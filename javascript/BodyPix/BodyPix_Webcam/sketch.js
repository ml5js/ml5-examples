let bodypix;
let segmentation;
let video;
let canvas;
let width = 480;
let height = 360;

const options = {
    outputStride: 8, // 8, 16, or 32, default is 16
    segmentationThreshold: 0.3 // 0 - 1, defaults to 0.5 
}

async function make() {
    // get the video
    video = await getVideo();
    // load bodyPix with video
    bodypix = await ml5.bodyPix(video)
    // create a canvas to draw to
    canvas = createCanvas(width, height);
    // run the segmentation on the video, handle the results in a callback
    bodypix.segment(gotImage, options);
}

// when the dom is loaded, call make();
window.addEventListener('DOMContentLoaded', function() {
    make();
});


function gotImage(err, result){
    canvas.drawImage(video, 0, 0);
    canvas.putImageData(result.maskBackground, 0, 0);
    bodypix.segment(gotImage, options);
}

// Helper Functions
async function getVideo(){
    // Grab elements, create settings, etc.
    const videoElement = document.createElement('video');
    videoElement.setAttribute("style", "display: none;"); 
    videoElement.width = width;
    videoElement.height = height;
    document.body.appendChild(videoElement);

    // Create a webcam capture
    const capture = await navigator.mediaDevices.getUserMedia({ video: true })
    videoElement.srcObject = capture;
    videoElement.play();

    return videoElement
}

function createCanvas(w, h){
    const canvasElement = document.createElement("canvas"); 
    canvasElement.width  = w;
    canvasElement.height = h;
    document.body.appendChild(canvasElement);
    const canvas = canvasElement.getContext("2d");
    return canvas;
}