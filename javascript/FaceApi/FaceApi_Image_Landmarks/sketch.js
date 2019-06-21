let faceapi;
let img;
let detections;
let width = 200;
let height = 200;
let canvas;

// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withExpressions: false,
    withDescriptors: false,
}



async function make(){
    img = new Image();
    img.src = 'assets/frida.jpg';
    img.width = width;
    img.height = height;

    canvas = createCanvas(width, height);

    faceapi = await ml5.faceApi(detection_options, modelReady)
    
    // faceapi.detectSingle(img, gotResults)

}
// call app.map.init() once the DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
    make();
  });


function modelReady() {
    console.log('ready!')
    faceapi.detectSingle(img, gotResults)
}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    detections = result;

    canvas.drawImage(img, 0,0, width, height);

    if (detections) {
        console.log(detections)
        drawBox(detections)
        drawLandmarks(detections)
    }
}

function drawBox(detections){
    const alignedRect = detections.alignedRect;
    const {_x, _y, _width, _height} = alignedRect._box;
    // canvas.fillStyle = 'none';
    canvas.rect(_x, _y, _width, _height);
    canvas.strokeStyle = "#a15ffb";
    canvas.stroke();
}

function drawLandmarks(detections){
    // mouth
    canvas.beginPath();
    detections.parts.mouth.forEach( (item, idx) => {
        if(idx = 0){
            canvas.moveTo(item._x, item._y);
        } else {
            canvas.lineTo(item._x, item._y);
        }
    })
    canvas.closePath();
    canvas.stroke();

    // nose
    canvas.beginPath();
    detections.parts.nose.forEach( (item, idx) => {
        if(idx = 0){
            canvas.moveTo(item._x, item._y);
        } else {
            canvas.lineTo(item._x, item._y);
        }
    })
    canvas.stroke();

    // // left eye
    canvas.beginPath();
    detections.parts.leftEye.forEach( (item, idx) => {
        if(idx = 0){
            canvas.moveTo(item._x, item._y);
        } else {
            canvas.lineTo(item._x, item._y);
        }
    })
    canvas.closePath();
    canvas.stroke();

    // // right eye
    canvas.beginPath();
    detections.parts.rightEye.forEach( (item, idx) => {
        if(idx = 0){
            canvas.moveTo(item._x, item._y);
        } else {
            canvas.lineTo(item._x, item._y);
        }
    })
    
    canvas.closePath();
    canvas.stroke();

    // // right eyebrow
    canvas.beginPath();
    detections.parts.rightEyeBrow.forEach( (item, idx) => {
        if(idx = 0){
            canvas.moveTo(item._x, item._y);
        } else {
            canvas.lineTo(item._x, item._y);
        }
    })
    canvas.stroke();
    // canvas.closePath();

    
    // // left eyeBrow
    canvas.beginPath();
    detections.parts.leftEyeBrow.forEach( (item, idx) => {
        if(idx = 0){
            canvas.moveTo(item._x, item._y);
        } else {
            canvas.lineTo(item._x, item._y);
        }
    })
    // canvas.closePath();

    canvas.strokeStyle = "#a15ffb";
    canvas.stroke();

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