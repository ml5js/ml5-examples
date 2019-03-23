

/**
 * Element.requestFullScreen() polyfill
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!Element.prototype.requestFullscreen) {
	Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen;
}
/////////////

setCameraToVideoElement = async (VElement) => {
    if (navigator.mediaDevices.getUserMedia) {
        return navigator.mediaDevices.getUserMedia(cameraconfig)
            .then(function (stream) {
                VElement.srcObject = stream;
            })
            .catch(function (error) {
                console.log("Something went wrong!");
                console.error(error);
            });
    }
}

