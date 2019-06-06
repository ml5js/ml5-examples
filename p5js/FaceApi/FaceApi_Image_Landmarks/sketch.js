let faceapi;
let img;
let detections;

// by default all options are set to true
const detection_options = {
    withFaceLandmarks: true,
    withFaceExpressions: false,
    withFaceDescriptors: false,
}

function preload(){
    img = loadImage('assets/frida.jpg')
}

function setup() {
    createCanvas(200, 200);
    img.resize(width, height);

    faceapi = ml5.faceApi(detection_options, modelReady)
    textAlign(RIGHT);
}

function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    faceapi.detect(img, gotResults)

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
    image(img, 0,0, width, height)
    if (detections) {
        if (detections.length > 0) {
            // console.log(detections)
            drawBox(detections)
            drawLandmarks(detections)
        }

    }
}

function drawBox(detections){
    const {alignedRect} = detections[0]
    const {_x, _y, _width, _height} = alignedRect._box;
    noFill();
    stroke(255, 0, 0)
    strokeWeight(2)
    rect(_x, _y, _width, _height)
}

function drawLandmarks(detections){
    const {landmarks} = detections[0];
    const mouth = landmarks.getMouth();
    const nose = landmarks.getNose();
    const leftEye = landmarks.getLeftEye();
    const leftEyeBrow = landmarks.getLeftEyeBrow();
    const rightEye = landmarks.getRightEye();
    const rightEyeBrow = landmarks.getRightEyeBrow();
    
    noFill();
    stroke(0, 0, 0)
    strokeWeight(2)
    
    push()
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