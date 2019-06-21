let faceapi;
let video;
let detections;
let width = 360;
let height = 280;
let canvas;

// relative path to your models from window.location.pathname
const detection_options = {
    withLandmarks: true,
    withExpressions: false,
    withDescriptors: false,
    Mobilenetv1Model: 'models',
    FaceLandmarkModel: 'models',
    FaceRecognitionModel: 'models',
    FaceExpressionModel: 'models',
}

async function make(){
    
    // get the video
    video = await getVideo();

    canvas = createCanvas(width, height);

    faceapi = ml5.faceApi(video, detection_options, modelReady)

}
// call app.map.init() once the DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
    make();
  });


function modelReady() {
    console.log('ready!')
    faceapi.detect(gotResults)
}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    
    // console.log(result)
    detections = result;

    // Clear part of the canvas
    canvas.fillStyle = "#000000"
    canvas.fillRect(0,0, width, height);

    canvas.drawImage(video, 0,0, width, height);

    if (detections) {
        if(detections.length > 0){
            drawBox(detections)
            drawLandmarks(detections)
        }
    }
    faceapi.detect(gotResults)
}

function drawBox(detections){
    
    for(let i = 0; i < detections.length; i++){
        const alignedRect = detections[i].alignedRect;
        const x = alignedRect._box._x
        const y = alignedRect._box._y
        const boxWidth = alignedRect._box._width
        const boxHeight  = alignedRect._box._height
        
        canvas.beginPath();
        canvas.rect(x, y, boxWidth, boxHeight);
        canvas.strokeStyle = "#a15ffb";
        canvas.stroke();
        canvas.closePath();
    }
    
}


function drawLandmarks(detections){

    for(let i = 0; i < detections.length; i++){
        const mouth = detections[i].parts.mouth; 
        const nose = detections[i].parts.nose;
        const leftEye = detections[i].parts.leftEye;
        const rightEye = detections[i].parts.rightEye;
        const rightEyeBrow = detections[i].parts.rightEyeBrow;
        const leftEyeBrow = detections[i].parts.leftEyeBrow;

        drawPart(mouth, true);
        drawPart(nose, false);
        drawPart(leftEye, true);
        drawPart(leftEyeBrow, false);
        drawPart(rightEye, true);
        drawPart(rightEyeBrow, false);

    }

}

function drawPart(feature, closed){
    
    canvas.beginPath();
    for(let i = 0; i < feature.length; i++){
        const x = feature[i]._x;
        const y = feature[i]._y;
        
        if(i === 0){
            canvas.moveTo(x, y);
        } else {
            canvas.lineTo(x, y);
        }
    }

    if(closed === true){
        canvas.closePath();
    }
    canvas.stroke();
    
    
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