let faceapi;
let video;
let detections;
let width = 360;
let height = 276;
let canvas, ctx;

// by default all options are set to true
const detection_options = {
    withLandmarks: false,
    withExpressions: true,
    withDescriptors: true,
}

async function make() {
    canvas = createCanvas(width, height);
    ctx = canvas.getContext('2d');
    // load up your video
    video = await getVideo();

    // video.hide(); // Hide the video element, and just show the canvas
    faceapi = await ml5.faceApi(video, detection_options, modelReady)
}

// call app.map.init() once the DOM is loaded
window.addEventListener('DOMContentLoaded', function () {
    make();
});

function modelReady() {
    console.log('ready!')
    console.log(faceapi)

    faceapi.detect(gotResults)

}


// Helper Functions
async function getVideo() {
    // Grab elements, create settings, etc.
    const videoElement = document.createElement('video');
    videoElement.setAttribute("style", "display: inline-block;");
    videoElement.width = width;
    videoElement.height = height;
    document.body.appendChild(videoElement);

    // Create a webcam capture
    const capture = await navigator.mediaDevices.getUserMedia({
        video: true
    })
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
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, width, height);
    ctx.textAlign = "right";

    if (detections) {
        if (detections.length > 0) {
            const expressions = detections[0].expressions;

            let keys = Object.keys(expressions);
            for (let i = 0; i < keys.length; i++) {
                ctx.fillStyle = "#000000"
                ctx.font = "10px Arial";
                ctx.fillText(`${keys[i]}:`, 70, i * 20 + 20)
                const val = scale(expressions[keys[i]], 0, 1, 0, width / 2)

                ctx.fillRect(80, i * 20 + 10, val, 15);
            }
        }

    }
    faceapi.detect(gotResults)
}

function scale(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


// Helper Functions
function createCanvas(w, h) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    document.body.appendChild(canvas);
    return canvas;
}