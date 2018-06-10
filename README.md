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

## p5.js web editor examples

The p5.js examples can also be run using the [p5.js web editor](https://alpha.editor.p5js.org). We are [in the process of porting](https://github.com/ml5js/ml5-examples/issues/6) and would welcome any contributions!

* [PoseNet Example](https://alpha.editor.p5js.org/ml5/sketches/B1uDXDugX)
* [YOLO Example](https://alpha.editor.p5js.org/ml5/sketches/HyKg7DOe7)

## Contributing

See CONTRIBUTING.MD
