// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Get Features as an Array of Numbers using Feature Extraction with MobileNet.
=== */

const img = document.getElementById('img');

// Create a featureExtractor based MobileNet model
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);

// A function to be called when the model has been loaded
function modelLoaded() {
  // Get features of the image
  const features = featureExtractor.getFeatures(img);
  console.log('features: ', features);

  // Convert tensor values to an array
  const values = features.dataSync();
  console.log('values: ', values);
}
