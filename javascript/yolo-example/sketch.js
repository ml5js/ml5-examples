let MEDIA_READY_TO_DETECT = false;
let IS_DETECTING = false;
let IS_PAGE_VISIBLE = true;
let IS_TRACK_STOPED = false;
// configs
const cameraconfig = {
    audio: false,
    video: {
        facingMode: 'environment',
        width: {
            ideal: 1280
        },
        height: {
            ideal: 720
        }
    }
}
const tinyyolov2Config = {
    modelURL: 'models/yolov2-tiny/model.json',
    modelSize: 224,
    iouThreshold: 0.5,
    classProbThreshold: 0.5,
}
const yoloLiteConfig = {
    modelURL: 'models/yolov2-lite/model.json',
    modelSize: 224,
    iouThreshold: 0.7,
    classProbThreshold: 0.3,
    anchors:[[1.08,1.19],[3.42,4.41],[6.63,11.38],[9.42,5.11],[16.62,10.52]],
}
const tinyyolov3Config = {
    modelURL: 'models/yolov3-tiny/model.json',
    version: 'v3',
    modelSize: 224,
    iouThreshold: 0.5,
    classProbThreshold: 0.5,
    anchors: [[10, 14],[23, 27],[37, 58],[81, 82],[135, 169],[344, 319]],
    masks: [[3, 4, 5],[0, 1, 2]],
}

visibilityChanged = () => {
    console.log(document.visibilityState)
    if (document.visibilityState === 'visible') {
        IS_PAGE_VISIBLE = true;
        if (IS_TRACK_STOPED) {
            resumeVideoTrack();
            IS_TRACK_STOPED = false;
        }
    } else {
        IS_PAGE_VISIBLE = false;
        stopVideoTrack();
        IS_TRACK_STOPED = true;
        MEDIA_READY_TO_DETECT = false;
    }
}
videoSizeChanged = () => {
    // tf.from fixels needs this with the video element
    videoSource.setAttribute("width", `${videoSource.offsetWidth}px`)
    videoSource.setAttribute("height", `${videoSource.offsetHeight}px`)
    outputCanvas.width = videoSource.offsetWidth
    outputCanvas.height = videoSource.offsetHeight
}
stopVideoTrack = () => {
    let stream = videoSource.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach(function (track) {
        track.stop();
    });
    videoSource.srcObject = null;
    MEDIA_READY_TO_DETECT = false;
}
resumeVideoTrack = () => {
    if (!videoSource.srcObject) {
        setCameraToVideoElement(videoSource).then(() => {
            MEDIA_READY_TO_DETECT = true;
        });
    }

}
clearCanvas = () =>{
    ctx.clearRect(0, 0, outputCanvas.width,outputCanvas.height);
}
toogleDetection = () =>  {
    if (IS_DETECTING) {
        IS_DETECTING = false;
        clearCanvas()
        toogleDetectionBtn.innerHTML = 'Start Detection'
        toogleDetectionBtn.classList.remove('btn-outline-danger')
        toogleDetectionBtn.classList.add('btn-outline-success')
    }
    else{
        IS_DETECTING  = true
        if (MEDIA_READY_TO_DETECT) {
            detect();
            toogleDetectionBtn.innerHTML = 'Stop Detection'
            toogleDetectionBtn.classList.remove('btn-outline-success')
            toogleDetectionBtn.classList.add('btn-outline-danger')
        }

    }
}

loadModel = () =>{
    if (yolo == null ) {
        loadBtn.innerHTML = "Loading...."
        yolo = ml5.YOLO(videoSource, tinyyolov3Config, yoloLoaded);
    }else{
        alert('YOLO is Already Loaded')
    }
}
yoloLoaded = () =>{
    loadBtn.setAttribute('class','btn btn-success')
    loadBtn.innerHTML = "Loaded"
    loadBtn.disabled = true
    toogleDetectionBtn.disabled = false
}
detect = () => {
    stats.begin();
    yolo.detect(function(err, results) {
        clearCanvas()
        yolo.draw(results,outputCanvas)
        stats.end()
        console.log(results)
        if (IS_DETECTING && MEDIA_READY_TO_DETECT) {
         detect();
        }
        else {
         clearCanvas()
        }
    });
  }
//////////////////////////////////ENTRY CODE//////////////////////////////////////////
const loadBtn = document.getElementById('loadBtn')
const toogleDetectionBtn = document.getElementById('detectBtn')


const videoSource = document.getElementById('videoElem')
const outputCanvas = document.getElementById('detection')
const ctx = outputCanvas.getContext('2d');
const controlslayer = document.getElementById("fps-meter-layer")

let yolo = null;
// stats
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
controlslayer.appendChild(stats.dom);
setCameraToVideoElement(videoSource).then(()=>{
    MEDIA_READY_TO_DETECT = true;
})
// handle size changes & visibility;
const resizeObserver = new ResizeObserver(videoSizeChanged).observe(videoSource)
document.addEventListener("visibilitychange",visibilityChanged);
/////////////////////////////////////////////////////////////////////////////////////
