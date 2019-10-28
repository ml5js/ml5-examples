# ml5 Examples
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)

## Description

This repository contains a collection of  examples using [ml5.js](https://github.com/ml5js/ml5-library). The examples are meant to serve as an introduction to the library and machine learning concepts.

Examples are organized into folders according to their integration with other JavaScript libraries.

For example, the `/p5js` folder holds examples of using [ml5.js](https://github.com/ml5js/ml5-library) with [p5.js](https://p5js.org/). All examples are self-contained and can be run independently. Libraries are loaded through a Content Delivery Network (CDN) and certain examples (indicated in code comments) download a machine learning model from a "cloud" url. This means that ml5 currently relies on an internet connection in order to retrieve pre-trained models (unless they are served locally). 

Instead of using the CDN links to p5 and ml5, you can [download the p5.js libraries here](https://github.com/processing/p5.js/releases) and [ml5 library here](https://github.com/ml5js/ml5-library/releases).

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

ml5.js does not require p5.js, however as ml5.js and p5.js have been designed to play nicely with eachother, most of our examples currently are developed together with p5.js. The following "vanilla" javascript examples showcase the use of ml5 without p5.js.

* [FeatureExtractor_Image_Classification](https://ml5js.github.io/ml5-examples/javascript/FeatureExtractor_Image_Classification)
* [ImageClassification_Video](https://ml5js.github.io/ml5-examples/javascript/ImageClassification_Video)
* [ImageClassification](https://ml5js.github.io/ml5-examples/javascript/ImageClassification)
* [StyleTransfer_Image](https://ml5js.github.io/ml5-examples/javascript/StyleTransfer_Image)
* [PoseNet](https://ml5js.github.io/ml5-examples/javascript/PoseNet)

### p5js

* [CVAE](https://ml5js.github.io/ml5-examples/p5js/CVAE)
* [BodyPix_Image](https://ml5js.github.io/ml5-examples/p5js/BodyPix/BodyPix_Image/)
* [BodyPix_Webcam](https://ml5js.github.io/ml5-examples/p5js/BodyPix/BodyPix_Webcam)
* [BodyPix_Webcam_Parts](https://ml5js.github.io/ml5-examples/p5js/BodyPix/BodyPix_Webcam_Parts)
* [DCGAN](https://ml5js.github.io/ml5-examples/p5js/DCGAN)
* [Sentiment](https://ml5js.github.io/ml5-examples/p5js/Sentiment)
* [UNET](https://ml5js.github.io/ml5-examples/p5js/UNET/UNET_webcam)
* [Word2Vec](https://ml5js.github.io/ml5-examples/p5js/Word2Vec)
* [FeatureExtractor_Image_Classification](https://ml5js.github.io/ml5-examples/p5js/FeatureExtractor/FeatureExtractor_Image_Classification)
* [FeatureExtractor_Image_Regression](https://ml5js.github.io/ml5-examples/p5js/FeatureExtractor/FeatureExtractor_Image_Regression)
* [StyleTransfer_Video](https://ml5js.github.io/ml5-examples/p5js/StyleTransfer/StyleTransfer_Video)
* [StyleTransfer_Image](https://ml5js.github.io/ml5-examples/p5js/StyleTransfer/StyleTransfer_Image)
* [ImageClassification_Video](https://ml5js.github.io/ml5-examples/p5js/ImageClassification/ImageClassification_Video)
* [ImageClassification_VideoScavengerHunt](https://ml5js.github.io/ml5-examples/p5js/ImageClassification/ImageClassification_VideoScavengerHunt)
* [ImageClassification](https://ml5js.github.io/ml5-examples/p5js/ImageClassification/ImageClassification)
* [ImageClassification_VideoSoundTranslate](https://ml5js.github.io/ml5-examples/p5js/ImageClassification/ImageClassification_VideoSoundTranslate)
* [ImageClassification_VideoSound](https://ml5js.github.io/ml5-examples/p5js/ImageClassification/ImageClassification_VideoSound)
* [ImageClassification_MultipleImages](https://ml5js.github.io/ml5-examples/p5js/ImageClassification/ImageClassification_MultipleImages)
* [KNNClassification_VideoSound](https://ml5js.github.io/ml5-examples/p5js/KNNClassification/KNNClassification_VideoSound)
* [KNNClassification_Video](https://ml5js.github.io/ml5-examples/p5js/KNNClassification/KNNClassification_Video)
* [KNNClassification_PoseNet](https://ml5js.github.io/ml5-examples/p5js/KNNClassification/KNNClassification_PoseNet)
* [KNNClassification_VideoSquare](https://ml5js.github.io/ml5-examples/p5js/KNNClassification/KNNClassification_VideoSquare)
* [SketchRNN_basic](https://ml5js.github.io/ml5-examples/p5js/SketchRNN/SketchRNN_basic)
* [SketchRNN_interactive](https://ml5js.github.io/ml5-examples/p5js/SketchRNN/SketchRNN_interactive)
* [PitchDetection_Game](https://ml5js.github.io/ml5-examples/p5js/PitchDetection/PitchDetection_Game)
* [PitchDetection](https://ml5js.github.io/ml5-examples/p5js/PitchDetection/PitchDetection)
* [CharRNN_Interactive](https://ml5js.github.io/ml5-examples/p5js/CharRNN/CharRNN_Interactive)
* [CharRNN_Text](https://ml5js.github.io/ml5-examples/p5js/CharRNN/CharRNN_Text)
* [CharRNN_Text_Stateful](https://ml5js.github.io/ml5-examples/p5js/CharRNN/CharRNN_Text_Stateful)
* [Pix2Pix_callback](https://ml5js.github.io/ml5-examples/p5js/Pix2Pix/Pix2Pix_callback)
* [Pix2Pix_promise](https://ml5js.github.io/ml5-examples/p5js/Pix2Pix/Pix2Pix_promise)
* [YOLO_webcam](https://ml5js.github.io/ml5-examples/p5js/YOLO/YOLO_webcam)
* [YOLO_single_image](https://ml5js.github.io/ml5-examples/p5js/YOLO/YOLO_single_image)
* [PoseNet_image_single](https://ml5js.github.io/ml5-examples/p5js/PoseNet/PoseNet_image_single)
* [PoseNet_webcam](https://ml5js.github.io/ml5-examples/p5js/PoseNet/PoseNet_webcam)
* [PoseNet_part_selection](https://ml5js.github.io/ml5-examples/p5js/PoseNet/PoseNet_part_selection)

## p5.js web editor examples

The p5.js examples can also be run using the [p5.js web editor](https://alpha.editor.p5js.org). We are [in the process of porting](https://github.com/ml5js/ml5-examples/issues/6) and would welcome any contributions!

You can find all of our examples here:
* [ml5 on editor.p5js.org](https://editor.p5js.org/ml5/sketches)

NOTE: not all of the ml5.js examples are currently working on the p5.js web editor. Stay tuned for updates!

## Contributing

See CONTRIBUTING.MD

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://wakatime.com/@barakplasma"><img src="https://avatars0.githubusercontent.com/u/62937?v=4" width="100px;" alt="Michael Salaverry"/><br /><sub><b>Michael Salaverry</b></sub></a><br /><a href="#content-barakplasma" title="Content">🖋</a> <a href="https://github.com/ml5js/ml5-examples/issues?q=author%3Abarakplasma" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://sankeybuilder.com"><img src="https://avatars2.githubusercontent.com/u/1794620?v=4" width="100px;" alt="Rob"/><br /><sub><b>Rob</b></sub></a><br /><a href="https://github.com/ml5js/ml5-examples/issues?q=author%3Aeformx" title="Bug reports">🐛</a> <a href="#question-eformx" title="Answering Questions">💬</a></td>
    <td align="center"><a href="http://pujaa.rajan@gmail.com"><img src="https://avatars3.githubusercontent.com/u/10352446?v=4" width="100px;" alt="Pujaa Rajan"/><br /><sub><b>Pujaa Rajan</b></sub></a><br /><a href="#example-pujaarajan" title="Examples">💡</a> <a href="https://github.com/ml5js/ml5-examples/issues?q=author%3Apujaarajan" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://mcintyre.io"><img src="https://avatars3.githubusercontent.com/u/3719176?v=4" width="100px;" alt="Nick McIntyre"/><br /><sub><b>Nick McIntyre</b></sub></a><br /><a href="https://github.com/ml5js/ml5-examples/commits?author=nickmcintyre" title="Tests">⚠️</a> <a href="https://github.com/ml5js/ml5-examples/issues?q=author%3Anickmcintyre" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!