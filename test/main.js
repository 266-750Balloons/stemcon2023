class node {
    constructor() {
        
    }
}
class component {
    constructor() {
        this.nodes = [];
    }
}
class electronicsSimulator {
    constructor(json="") {
        this.components = [];
        if(json !== "") {
            let parsedJSON = json.parse(json);

        }
    }
}

if(!(window.matchMedia('(min-resolution: 2dppx)'))) {
    var mobile = false;
} else {
    var mobile = true;
}

var transistorCanvases = document.getElementsByClassName("electronicsSim");

var context = transistorCanvases[0].getContext("2d");
