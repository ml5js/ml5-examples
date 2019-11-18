let video;
let objectDetector;
let detections;

function setup() {
    createCanvas(680, 480);
    
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    objectDetector = ml5.objectDetector('CocoSsd', {}, modelReady)
    // This would also work
    // objectDetector = ml5.objectDetector('YOLO', capture, {}, () => {
    //     console.log('objectDetector with YOLO loaded')
    //     isModelReady = true;
    // })

    frameRate(10);
}


function modelReady(){
  detect();
}

function detect(){
  objectDetector.detect(video, gotResults);
}

function gotResults(err, results){
  if(err){
    console.log(err);
    return
  }

  console.log(results);

  detect();
}

function draw() {
    if (detections) {
        image(video, 0, 0, width, height);
        
    } 
}