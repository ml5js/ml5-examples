let MEDIA_READY_TO_DETECT = false;
let IS_DETECTING = false;
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
const yoloConfig = {
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
        yolo = ml5.YOLO(videoSource, yoloLiteConfig, yoloLoaded);
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
    yolo.detect(function(err, results) {
        clearCanvas()
        yolo.draw(results,outputCanvas)
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
let yolo = null;
setCameraToVideoElement(videoSource).then(()=>{
    MEDIA_READY_TO_DETECT = true;
})
// handle size changes & visibility;
const resizeObserver = new ResizeObserver(videoSizeChanged).observe(videoSource)
document.addEventListener("visibilitychange",visibilityChanged);
/////////////////////////////////////////////////////////////////////////////////////


