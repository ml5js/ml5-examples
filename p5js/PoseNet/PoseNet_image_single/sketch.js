let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 360);

  img = createImg('data/runner.jpg', modelReady);
  img.size(width, height);

  let options = {
    imageScaleFactor: 1,
    minConfidence: 0.1
  }

  poseNet = ml5.poseNet(modelReady,options);
  
  img.hide();
  frameRate(1);
}

function modelReady() {
  select('#status').html('Model Loaded');

  poseNet.singlePose(img).then( res =>{
    poses = res
  }).catch(err => {
    console.log(err);
    return err;
  });
}

function draw() {
  if(poses.length > 0){
    image(img, 0, 0, width, height);
    drawSkeleton(poses)
    drawKeypoints(poses)
    noLoop();
  }
  
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        // fill(255);
        // noStroke();
        fill(255);
        stroke(20)
        strokeWeight(4);
        // console.log(round(keypoint.position.x), round(keypoint.position.y))
        ellipse( round(keypoint.position.x), round(keypoint.position.y), 8, 8);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255);
      // stroke(255);
      strokeWeight(1);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
