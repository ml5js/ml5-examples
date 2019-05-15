# ml5 Examples

## Description

This repository contains a collection of  examples using [ml5.js](https://github.com/ml5js/ml5-library). The examples are meant to serve as an introduction to the library and machine learning concepts.

Examples are organized into folders according to their integration with other JavaScript libraries.

For example, the `/p5js` folder holds examples of using [ml5.js](https:/ml5js.github.io) with [p5.js](https://p5js.org/). All examples are self-contained and can be run independently. Libraries are loaded through a Content Delivery Network (CDN) and certain examples (indicated in code comments) download a machine learning model from a "cloud" url.

If you need to run the examples offline you can [download the p5.js libraries here](https://p5js.org/download/) and [ml5 library here](https://github.com/ml5js/ml5-library/releases).

## Usage

Download or clone this repository:
```
git clone https://github.com/ml5js/ml5-examples.git
```

Change directory into the new folder and start a server.
An easy way to start a server is with python. If you are have python 2:
```
cd ml5-examples
python -m SimpleHTTPServer
```
If you are have python 3:
```
cd ml5-examples
python -m http.server
```

If you don't know how to start a server, check [this](https://github.com/processing/p5.js/wiki/Local-server) guide.

## Examples Index

Below is the current `release` examples index:

### javascript

### p5js

* [Word2Vec](/ml5-examples/p5js/Word2Vec)
* [FeatureExtractor_Image_Classification](/ml5-examples/p5js/FeatureExtractor/FeatureExtractor_Image_Classification)
* [FeatureExtractor_Image_Regression](/ml5-examples/p5js/FeatureExtractor/FeatureExtractor_Image_Regression)
* [StyleTransfer_Video](/ml5-examples/p5js/StyleTransfer/StyleTransfer_Video)
* [StyleTransfer_Image](/ml5-examples/p5js/StyleTransfer/StyleTransfer_Image)
* [ImageClassification_Video](/ml5-examples/p5js/ImageClassification/ImageClassification_Video)
* [ImageClassification_VideoScavengerHunt](/ml5-examples/p5js/ImageClassification/ImageClassification_VideoScavengerHunt)
* [ImageClassification_VideoSoundTranslate](/ml5-examples/p5js/ImageClassification/ImageClassification_VideoSoundTranslate)
* [ImageClassification_VideoSound](/ml5-examples/p5js/ImageClassification/ImageClassification_VideoSound)
* [ImageClassification_MultipleImages](/ml5-examples/p5js/ImageClassification/ImageClassification_MultipleImages)
* [KNNClassification_VideoSound](/ml5-examples/p5js/KNNClassification/KNNClassification_VideoSound)
* [KNNClassification_Video](/ml5-examples/p5js/KNNClassification/KNNClassification_Video)
* [KNNClassification_PoseNet](/ml5-examples/p5js/KNNClassification/KNNClassification_PoseNet)
* [KNNClassification_VideoSquare](/ml5-examples/p5js/KNNClassification/KNNClassification_VideoSquare)
* [SketchRNN_basic](/ml5-examples/p5js/SketchRNN/SketchRNN_basic)
* [SketchRNN_interactive](/ml5-examples/p5js/SketchRNN/SketchRNN_interactive)
* [PitchDetection_Game](/ml5-examples/p5js/PitchDetection/PitchDetection_Game)
* [PitchDetection](/ml5-examples/p5js/PitchDetection/PitchDetection)
* [CharRNN_Interactive](/ml5-examples/p5js/CharRNN/CharRNN_Interactive)
* [CharRNN_Text](/ml5-examples/p5js/CharRNN/CharRNN_Text)
* [CharRNN_Text_Stateful](/ml5-examples/p5js/CharRNN/CharRNN_Text_Stateful)
* [Pix2Pix_callback](/ml5-examples/p5js/Pix2Pix/Pix2Pix_callback)
* [Pix2Pix_promise](/ml5-examples/p5js/Pix2Pix/Pix2Pix_promise)
* [YOLO_webcam](/ml5-examples/p5js/YOLO/YOLO_webcam)
* [YOLO_single_image](/ml5-examples/p5js/YOLO/YOLO_single_image)
* [images](/ml5-examples/p5js/YOLO/YOLO_single_image/images)
* [PoseNet_image_single](/ml5-examples/p5js/PoseNet/PoseNet_image_single)
* [data](/ml5-examples/p5js/PoseNet/PoseNet_image_single/data)
* [PoseNet_webcam](/ml5-examples/p5js/PoseNet/PoseNet_webcam)
* [PoseNet_part_selection](/ml5-examples/p5js/PoseNet/PoseNet_part_selection)


## p5.js web editor examples

The p5.js examples can also be run using the [p5.js web editor](https://alpha.editor.p5js.org). We are [in the process of porting](https://github.com/ml5js/ml5-examples/issues/6) and would welcome any contributions!

* [PoseNet Example](https://alpha.editor.p5js.org/ml5/sketches/B1uDXDugX)
* [YOLO Example](https://alpha.editor.p5js.org/ml5/sketches/HyKg7DOe7)

## Contributing

See CONTRIBUTING.MD
