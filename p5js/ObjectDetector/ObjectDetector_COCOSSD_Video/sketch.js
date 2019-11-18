let video;
let detector;
let detections;

function setup() {
    createCanvas(680, 480);
    
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    detector = ml5.objectDetector('CocoSsd', modelReady)
}


function modelReady(){
  detect();
}

function detect(){
  detector.detect(video, gotResults);
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