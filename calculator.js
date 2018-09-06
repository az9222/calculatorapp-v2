let runningTotal = 0; //the total so far..what's actually being calculated thus far
let buffer = "0"; //as a user types in numbers, we want to keep track of what is being typed in...waiting for user's input..basically whats on the screen
let previousOperator; //if I do 12 + 3, + is what I previously pressed. I need to keep track of what they previously pressed.
const screen = document.querySelector(".screen");

document.querySelector(".calculator-buttons").addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
})

function buttonClick(value){
    if (isNaN(parseInt(value))){ //if i press any of the non-numbers
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
}

function handleSymbol (value) {
    switch (value) {
        case 'C':
            buffer = "0";
            runningTotal  = 0;
            previousOperator = null;
            break;
        case "=":
            if (previousOperator === null) {
                return; //if there's nothing on the calculator and you click =, nothing happens
            }
            flushOperation(parseInt(buffer));  //so if you have 1+2+ you're holding + in the background. we're applying previous operation.
            previousOperator = null; 
            buffer = "" + runningTotal; //next time i call rerender, the buffer 
            // runningTotal = 0;
            break;
        case "←": 
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length-1); //technique to remove single value at end
            }
            break;
        default: //default thing to do if none of the cases match
            handleMath(value);
            break;
    }
    rerender();
}

function handleNumber (value) { //?!?!?!?!
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
  rerender();
}

function handleMath(value) {  //?!?!?!?
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer); 
    }
    previousOperator = value; //???
    buffer = "0"; //???
}

function flushOperation (intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer; 
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    } else if (previousOperator === "÷") {
        runningTotal /= intBuffer;
    }
}

function rerender() {
    screen.innerText = buffer; //updates the screen's inner text with buffer (whatever you're typing in)
}

