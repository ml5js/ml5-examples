let faceapi;
let video;
let detections;
let img;

const options = {
    outputStride: 8, // 8, 16, or 32, default is 16
    segmentationThreshold: 0.3 // 0 - 1, defaults to 0.5 
}

function setup() {
    createCanvas(480, 360);

    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
    // video.hide(); // Hide the video element, and just show the canvas
    faceapi = ml5.faceApi(video, modelReady)
    textAlign(RIGHT);
}

function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    faceapi.classifyExpressionsMultiple(gotResults)

}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    detections = result;

    // background(220);
    background(255);
    if (detections) {
        if (detections.length > 0) {
            // console.log(detections)
            // drawBox(detections)
            drawLandmarks(detections)
        }

    }
    faceapi.classifyExpressionsMultiple(gotResults)
}

function drawBox(detections){
    const {alignedRect} = detections[0]
    const {_x, _y, _width, _height} = alignedRect._box;
    noFill();
    stroke(255, 0, 0)
    strokeWeight(2)
    rectMode(CENTER);
    rect(_x, _y, _width, _height)
}

function drawLandmarks(detections){
    const {landmarks} = detections[0]
    const {alignedRect} = detections[0]
    const {_width, _height} = alignedRect._box;


    const mouth = landmarks.getMouth()
    const nose = landmarks.getNose()
    const leftEye = landmarks.getLeftEye()
    const leftEyeBrow = landmarks.getLeftEyeBrow()
    const rightEye = landmarks.getRightEye()
    const rightEyeBrow = landmarks.getRightEyeBrow()
    
    noFill();
    stroke(0, 0, 0)
    strokeWeight(2)
    
    push()
    // correct the landmarks position using the bounding box
    translate(-_width/2, -_height/2)

    // mouth
    beginShape();
    mouth.forEach(item => {
        vertex(item._x, item._y)
    })
    endShape(CLOSE);

    // nose
    beginShape();
    nose.forEach(item => {
        vertex(item._x, item._y)
    })
    endShape(CLOSE);

    // left eye
    beginShape();
    leftEye.forEach(item => {
        vertex(item._x, item._y)
    })
    endShape(CLOSE);

    // right eye
    beginShape();
    rightEye.forEach(item => {
        vertex(item._x, item._y)
    })
    endShape(CLOSE);

    // right eyebrow
    beginShape();
    rightEyeBrow.forEach(item => {
        vertex(item._x, item._y)
    })
    endShape();

    // left eye
    beginShape();
    leftEyeBrow.forEach(item => {
        vertex(item._x, item._y)
    })
    endShape();

    pop();

    


}