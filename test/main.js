class electronicsSimulator {
    constructor() {
        this.exists = 1;
    }
}

if(!(window.matchMedia('(min-resolution: 2dppx)'))) {
    var mobile = false;
} else {
    var mobile = true;
}

var transistorCanvases = document.getElementsByClassName("electronicsSim");

var args = {
    context: new electronicsSimulator(),
    sim: transistorCanvases[0].getContext("2d")
}
window.requestAnimationFrame(function(){renderSim(args)});

function renderSim(args) {
    if(args.context.fillStyle = "white") {
        args.context.fillStyle = "black";
    } else {
        args.context.fillStyle = "white";
    }

    if(args.sim.exists === 1) {
        args.context.fillRect(0, 0, 1000, 1000);
    }
    
    window.requestAnimationFrame(function(){renderSim(args)});
}