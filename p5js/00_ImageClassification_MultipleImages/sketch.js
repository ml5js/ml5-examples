/* ===
ML5 Example
00_ImageNet_Simple
Simple Image Classification using p5.js
=== */

// Initialize the ImageNet method with the MobileNet model.
const classifier = new ml5.ImageClassifier('MobileNet');

let img;
current_index = 0;
all_images = []
display = false;
predictions = []

function append_images(){
    for (var item in data.all_images){
        for (var i in data.all_images[item]){
            img_path = data.all_images[item][i];
            all_images.push(get_image_path(item, img_path));
        }
    }
}

function preload(){
    data = loadJSON('assets/data.json', append_images);
}

function get_image_path(category, img_path){
    full_path = 'images/landscapes_small/';
    full_path = full_path + category + '/' + img_path;
    return full_path
}

function draw_next_image(){
    img = createImg(all_images[current_index], imageReady);
}

function setup() {
    noCanvas();
    draw_next_image();
}

// When the image has been loaded,
// get a prediction for that image
function imageReady() {
  classifier.predict(img.elt, 10, gotResult);
}

function savePredictions(){
    predictions_JSON = {"predictions": predictions}
    saveJSON(predictions_JSON, 'predictions.json');
}

function removeImage(){
    img.remove();
    current_index++;
    console.log(current_index);
    if (current_index <= all_images.length-1){
        draw_next_image();
    }else{
        savePredictions();
    }
}

// When we get the results
function gotResult(results) {
    information = {
        "name": all_images[current_index],
        "result": results[0].label,
        "probability": nf(results[0].probability, 0, 2)
    }
    predictions.push(information);

  if (display){
    // The results are in an array ordered by probability.
    select('#result').html(results[0].label);
    select('#probability').html(nf(results[0].probability, 0, 2));
    setTimeout(removeImage, 1000);
  }else{
    removeImage();
  }
}
