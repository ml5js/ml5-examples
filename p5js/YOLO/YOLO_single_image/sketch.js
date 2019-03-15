// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
// Create a YOLO method
const yolo = ml5.YOLO(modelReady);
let img;
let objects = [];
let status;

function setup() {

  createCanvas(400, 266);
  img = createImg('images/turtle.png', imageReady);
  img.hide();
  img.size(400, 266);
}

// Change the status when the model loads.
function modelReady() {
  console.log("model Ready!")
  status = true;
  document.querySelector('#status').innerHTML = 'Model Loaded'
}

// When the image has been loaded,
// get a prediction for that image
function imageReady() {
  yolo.detect(img, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(err, results) {
  if (err) {
    console.error(err);
  }
  objects = results.slice(0);
}


function draw() {
  // image(video, 0, 0, width, height);
  if (status != undefined) {
    image(img, 0, 0)

    for (let i = 0; i < objects.length; i++) {
      noStroke();
      fill(0, 255, 0);
      text(objects[i].className, objects[i].x * width, objects[i].y * height - 5);
      noFill();
      strokeWeight(4);
      stroke(0, 255, 0);
      rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
    }
  }
}