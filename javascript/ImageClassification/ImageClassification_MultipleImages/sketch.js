// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Multiple Image classification using MobileNet
=== */

// Initialize the Image Classifier method using MobileNet
let classifier;

let img;
let currentIndex = 0;
let allImages = [];
let predictions = [];
let results;

async function setup() {
  classifier = await ml5.imageClassifier('MobileNet');
  data = await fetch('assets/data.json');
  data = await data.json();

  canvas = document.querySelector('#myCanvas');
  ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.fillStyle = "#eee";
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();

  // append images to array
  allImages = appendImages(data.images);


  await Promise.all(
    allImages.map(async (imgPath, idx) => await loadImage(imgPath, idx))
  );

}
setup();



function appendImages(arr) {
  let output = [];
  for (i = 0; i < arr.length; i++) {
    imgPath = arr[i];
    output.push('images/dataset/' + imgPath);
  }
  return output;
}

async function loadImage(imgPath, idx) {
  let imgEl = new Image();
  imgEl.src = imgPath;

  imgEl.onload = async function () {
    ctx.drawImage(imgEl, 0, 0, imgEl.width, imgEl.height);
    
    await classifier.classify(imgEl, (err, res) => {
      if (err) {
        console.log(err, idx);
        return;
      }
      let information = {
        name: imgPath,
        result: res
      };
      
      predictions.push(information)

      if(predictions.length === allImages.length ){
        console.log(predictions)
        savePredictions()
      } else{
        console.log(information)
      }

    })
  }
}




function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {
    type: contentType
  });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}


function savePredictions() {
  predictionsJSON = {
    predictions: predictions
  };
  download(JSON.stringify(predictionsJSON), 'json.txt', 'text/plain');
}