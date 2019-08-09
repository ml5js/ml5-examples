let faceapi;
let video;
let detections;
let width = 200;
let height = 200;
let canvas;

// by default all options are set to true
const detection_options = {
    withLandmarks: false,
    withExpressions: true,
    withDescriptors: true,
}

async function make() {
    canvas = createCanvas(width, height);

    // load up your video
    video = await getVideo();
    
    // video.hide(); // Hide the video element, and just show the canvas
    faceapi = await ml5.faceApi( video, detection_options, modelReady)
    // textAlign(RIGHT);
}

// call app.map.init() once the DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
    make();
  });

function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    
    faceapi.detect( gotResults)

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


function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    detections = result;

    // Clear part of the canvas
    canvas.fillStyle = "#FFFFFF"
    canvas.fillRect(0,0, width, height);

    if (detections) {
        if (detections.length > 0) {
            const expressions = detections[0].expressions;

            let keys = Object.keys(expressions);      
            for(let i = 0; i < keys.length; i++){
                canvas.font = "10px Arial";
                canvas.fillText(`${keys[i]}:`, 70, i * 20 + 20)
                const val = scale(expressions[keys[i]], 0, 1, 0, width / 2)
                canvas.fillStyle = "#000000"
                canvas.fillRect(80, i*20 + 10, val, 15);
            }
        }

    }
    faceapi.detect( gotResults)
}

function scale (num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }


// Helper Functions
function createCanvas(w, h){
    const canvasElement = document.createElement("canvas"); 
    canvasElement.width  = w;
    canvasElement.height = h;
    document.body.appendChild(canvasElement);
    const canvas = canvasElement.getContext("2d");
    return canvas;
  }