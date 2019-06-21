let bodypix;
let segmentation;
let img;
let canvas;
let width = 480;
let height = 560;

async function make() {
    img = new Image();
    img.src = 'data/harriet.jpg'
    
    bodypix = await ml5.bodyPix()
    segmentation = await bodypix.segment(img);

    canvas = createCanvas(width, height);
    canvas.drawImage(img, 0,0);
    canvas.putImageData(segmentation.maskBackground, 50, 50);

}

// call app.map.init() once the DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
    make();
});

function createCanvas(w, h){
    const canvasElement = document.createElement("canvas"); 
    canvasElement.width  = w;
    canvasElement.height = h;
    document.body.appendChild(canvasElement);
    const canvas = canvasElement.getContext("2d");
    return canvas;
}