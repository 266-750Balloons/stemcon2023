class computer {
    constructor() {
        this.programMemory = new Array(256).fill(0);
        this.counter = 0;
    }
    #registerA = 0;
    get registerA() {
        return this.#registerA;
    }
    set registerA(value) {
        if(value >= 0 && value < 256) {
            this.#registerA = value;
        } else {
            throw new Error("Number must be in between 0 and 15.")
        }
    }
    #registerB = 0;
    get registerB() {
        return this.#registerB;
    }
    set registerB(value) {
        if(value >= 0 && value < 256) {
            this.#registerB = value;
        } else {
            throw new Error("Number must be in between 0 and 15.")
        }
    }
    #registerC = 0;
    get registerC() {
        return this.#registerC;
    }
    set registerC(value) {
        if(value >= 0 && value < 256) {
            this.#registerC = value;
        } else {
            throw new Error("Number must be in between 0 and 15.")
        }
    }
    #registerD = 0;
    get registerD() {
        return this.#registerD;
    }
    set registerD(value) {
        if(value >= 0 && value < 256) {
            this.#registerD = value;
        } else {
            throw new Error("Number must be in between 0 and 15.")
        }
    }
    #accumulator = 0;
    get accumulator() {
        return this.#accumulator;
    }
    set accumulator(value) {
        this.#accumulator = value % 256;
    }
}
var bob = new computer();

var codeDiv = document.getElementById("code");
var commentDiv = document.getElementById("comment");

var blockValue = document.getElementById("blockValue");
blockValue.addEventListener("change", function() {
    if(blockValue.value > 255) {
        blockValue.value = 255;
    } else if(blockValue.value < 0) {
        blockValue.value = 0;
    }
});

var regAVal = document.getElementById("regA");
regAVal.innerText = bob.registerA;

var regBVal = document.getElementById("regB");
regBVal.innerText = bob.registerB;

var regCVal = document.getElementById("regC");
regCVal.innerText = bob.registerC;

var regDVal = document.getElementById("regD");
regDVal.innerText = bob.registerD;

var regAaccuValVal = document.getElementById("accu");
regAaccuValVal.innerText = bob.accumulator;

var setRegButtons = document.getElementsByClassName("setReg");

setRegButtons[0].addEventListener("click", setRegisterCode("A"));
setRegButtons[1].addEventListener("click", setRegisterCode("B"));
setRegButtons[2].addEventListener("click", setRegisterCode("C"));
setRegButtons[3].addEventListener("click", setRegisterCode("D"));

var addAccuButtons = document.getElementsByClassName("addAccu");

addAccuButtons[0].addEventListener("click", addToAccumulator("A"));
addAccuButtons[1].addEventListener("click", addToAccumulator("B"));
addAccuButtons[2].addEventListener("click", addToAccumulator("C"));
addAccuButtons[3].addEventListener("click", addToAccumulator("D"));

var haltButton = document.getElementById("halt");
haltButton.addEventListener("click", halt);

var clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clear);

var runButton = document.getElementById("run");
runButton.addEventListener("click", run);

function setRegisterCode(register) {
    let finalInstruction = undefined;
    switch(register) {
        case "A":
            finalInstruction = "00000000";
            break;
        case "B":
            finalInstruction = "00000001";
            break;
        case "C":
            finalInstruction = "00000010";
            break;
        case "D":
            finalInstruction = "00000011";
            break;
    }
    return function() {
        binaryString = Number(blockValue.value).toString(2);
        console.log(binaryString);
        while(binaryString.length < 8) {
            binaryString = "0" + binaryString;
        }

        codeDiv.innerText += finalInstruction + "\n" + binaryString + "\n";
        commentDiv.innerText += "Set Register " + register + " to \n" + blockValue.value+"\n";
    }
}

function addToAccumulator(register) {
    let finalInstruction = undefined;
    switch(register) {
        case "A":
            finalInstruction = "00000100";
            break;
        case "B":
            finalInstruction = "00000101";
            break;
        case "C":
            finalInstruction = "00000110";
            break;
        case "D":
            finalInstruction = "00000111";
            break;
    }
    return function() {
        binaryString = Number(blockValue.value).toString(2);
        console.log(binaryString);
        while(binaryString.length < 8) {
            binaryString = "0" + binaryString;
        }

        codeDiv.innerText += finalInstruction + "\n\n";
        commentDiv.innerText += "Add Register " + register + " to \nAccumlator\n";
    }
}

function halt() {

    codeDiv.innerText += "00001000" + "\n";
    commentDiv.innerText += "Halt Program\n";
}

function clear() {
    codeDiv.innerText = "";
    commentDiv.innerText = "";
}

function run() {
    var codes = codeDiv.innerText.split("\n");
    for(var i = 0; i < codes.length; i++) {
        if(codes[i] === "") {
            codes.splice(i, 1);
            i--;
        }
    }
    var numbers = [];
    console.log(numbers);
    for(var i = 0; i < codes.length; i++) {;
        numbers.push(parseInt(codes[i], 2));
    }
    counter = 0;

    let regA = 0;
    let regB = 0;
    let regC = 0;
    let regD = 0;
    let accumulator = 0;

    while(counter < numbers.length) {
        switch(numbers[counter]) {
            case 0:
                regA = numbers[counter + 1];
                counter++;
                break;
            case 1:
                regB = numbers[counter + 1];
                counter++;
                break;
            case 2:
                regC = numbers[counter + 1];
                counter++;
                break;
            case 3:
                regD = numbers[counter + 1];
                counter++;
                break;
            case 4:
                accumulator = (accumulator + regA) % 256;
                break;
            case 5:
                accumulator = (accumulator + regB) % 256;
                break;
            case 6:
                accumulator = (accumulator + regC) % 256;
                break;
            case 7:
                accumulator = (accumulator + regD) % 256;
                break;
            case 8:
                counter = numbers.length;
                break;
        }
        counter++;
        
    }
    regAVal.innerText = regA;
    regBVal.innerText = regB;
    regCVal.innerText = regC;
    regDVal.innerText = regD;
    regAaccuValVal.innerText = accumulator;
}