let faceapi;
let video;
let detections;

// by default all options are set to true
const detection_options = {
    withLandMarks: false,
    withFaceExpressions: true,
    withFaceDescriptors: false,
}

function setup() {
    createCanvas(400, 240);

    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
    // video.hide(); // Hide the video element, and just show the canvas
    faceapi = ml5.faceApi( video, detection_options, modelReady)
    textAlign(RIGHT);
}

function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    
    faceapi.detect( gotResults)

}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    detections = result;

    background(255);
    if (detections) {
        if (detections.length > 0) {
            const expressions = detections[0].expressions;

            let keys = Object.keys(expressions);      
            for(let i = 0; i < keys.length; i++){
                fill(0)
                textSize(12)
                text(`${keys[i]}:`, 70, i * 20 + 20)
                const val = map(expressions[keys[i]], 0, 1, 0, width / 2)
                rect(80, i * 20 + 10, val, 15)
            }
        }

    }
    faceapi.detect( gotResults)
}