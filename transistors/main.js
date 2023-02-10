var transistorsims = document.getElementsByClassName('transistorsim');
if(!(window.matchMedia('(min-resolution: 2dppx)'))) {
    var mobile = false;
} else {
    var mobile = true;
}

function setTransistorSimCanvasSize() {
    if(mobile == false) {
        console.log("return here");
    }
}