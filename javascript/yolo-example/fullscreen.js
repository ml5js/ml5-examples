//exit full screen
let IS_APP_ON_FULL_SCREEN =false
const app = document.getElementById("app-wrap")
const videowrapper = document.getElementById("demo-wrap")
const controlswrapper = document.getElementById("controls-wrap")

if (app.addEventListener) {
    app.addEventListener('webkitfullscreenchange', fullScreenHandler, false);
    app.addEventListener('mozfullscreenchange', fullScreenHandler, false);
    app.addEventListener('fullscreenchange', fullScreenHandler, false);
    app.addEventListener('MSFullscreenChange', fullScreenHandler, false);
}

document.addEventListener("keydown", e => {
    if (e.key == "F11") {
        e.preventDefault()
        app.requestFullscreen();
    }
});

toogleFullscreen = () => {
    app.requestFullscreen();
} 



function fullScreenHandler() {
    // If there's an element in fullscreen, exit
    // Otherwise, enter it
    if (!IS_APP_ON_FULL_SCREEN) {
        // let app = document.getElementById("app")
        // app.requestFullscreen();
        appEnterFullscreen();
        IS_APP_ON_FULL_SCREEN = true
    } else {
        appExitFullscreen();
        IS_APP_ON_FULL_SCREEN = false;
    }
}

function appExitFullscreen() {
    app.classList.remove('app-wrap-fullscreen')
    videowrapper.classList.remove('demo-wrap-fullscreen')
    controlswrapper.classList.remove('controls-wrap-fullscreen')

}

function appEnterFullscreen() {
    window.scrollTo(0, 0);
    app.classList.add('app-wrap-fullscreen')
    videowrapper.classList.add('demo-wrap-fullscreen')
    controlswrapper.classList.add('controls-wrap-fullscreen')

}