const btns = document.querySelectorAll("button");
const btnsMainCont = document.querySelector(".buttons-main-container");
const funcBtns = document.querySelectorAll(".funct-btn");
let resultSpan = document.querySelector(".result-span");
const decimalBtn = document.querySelector(".decimal");
const acBtn = document.querySelector(".ac-btn");
const delBtn = document.querySelector(".del-btn");
const numBtns = document.querySelectorAll(".num");

toggleNumBtns(true);
let funcBtnsEnabled = false;

const inputs = {
  operator: null,
  firstNumber: null,
  secondNumber: null,

  clear() {
    for (const key in this) {
      if (typeof this[key] !== "function") {
        this[key] = null;
      }
    }
  }
}

const temp = {
  num1Arr: [],
  num2Arr: [],
  operator: null,
  result: null,

  clear() {
    for (const key in this) {
      if (Array.isArray(this[key])) {
        this[key] = [];
      }
    }
    this.result = null;
    this.operator = null;
  }
}


function add(firstNum, secondNum) {
  return firstNum + secondNum;
}

function subtract(firstNum, secondNum) {
  return firstNum - secondNum;
}

function multiply(firstNum, secondNum) {
  return firstNum * secondNum;
}

function divide(firstNum, secondNum) {
  return firstNum / secondNum;
}

function percentage(firstNum, secondNum) {
  if (secondNum === 0) return 0;
  return (firstNum * 100) / secondNum;
}

function isFloat(num) {
  return typeof num === "number" && !Number.isInteger(num);
}

function operate(operator, firstNum, secondNum) {  
  // Calls one of the above functions on the numbers
  let operationResult = 0;
  switch (operator) {
    case "+":
      operationResult = add(firstNum, secondNum);
      break;
    case "-":
      operationResult = subtract(firstNum, secondNum);
      break;
    case "*":
      operationResult = multiply(firstNum, secondNum);
      break;
    case "/":
      operationResult = divide(firstNum, secondNum);
      break;
    case "%":
      operationResult = percentage(firstNum, secondNum);
      break;
    default:
      console.log(`Error: ${operator}`);
  }
  if (isFloat(operationResult)) {
    decimalBtn.disabled = false;
  }
  return operationResult;
}

function updateScreen(content) {
  resultSpan.textContent = content;
}

acBtn.addEventListener("click", () => {
  inputs.clear();
  temp.clear();
  updateScreen("0");
  decimalBtn.disabled = false;
  toggleNumBtns(true);
});

funcBtns.forEach(btn => {
  btn.disabled = true; 
});

function toggleFuncBtns(enable) {
  funcBtnsEnabled = enable;
  funcBtns.forEach(btn => {
    btn.disabled = !enable; 
  });
}

function toggleNumBtns(enable) {
  numBtns.forEach(btn => {
    btn.disabled = !enable;
  });
}

delBtn.addEventListener("click", () => {
  if (temp.num1Arr.length > 0 && inputs.operator === null && temp.num2Arr.length === 0) {
    temp.num1Arr.pop();
    updateScreen(temp.num1Arr.length > 0 ? temp.num1Arr.join("") : "0");
    inputs.firstNumber = temp.num1Arr;

    if (resultSpan.textContent == "0") {
      inputs.clear();
      temp.clear();
    }
    
  } else if (temp.num1Arr.length > 0 && inputs.operator != null && temp.operator === null && temp.num2Arr.length === 0) {
    inputs.operator = null;
    updateScreen(temp.num1Arr.join(""));
  } else if (temp.num1Arr.length > 0 && inputs.firstNumber != null && temp.num2Arr.length > 0 && inputs.operator != null) {
    temp.num2Arr.pop();
    updateScreen(inputs.firstNumber + inputs.operator + temp.num2Arr.join(""));
    inputs.secondNumber = temp.num2Arr;
  } 
});

btnsMainCont.addEventListener("click", (event) => {
  let selected = event.target;

  if (selected.textContent === "±" && temp.num1Arr.length === 0) {
    temp.num1Arr.push("-");
    updateScreen(temp.num1Arr);
  } else if (selected.textContent === "±" && temp.num2Arr.length === 0) {
    temp.num2Arr.push("-");
    updateScreen(temp.num2Arr);
  }

  if (selected.classList.contains("num")) {
    toggleFuncBtns(true);
    
    // Temporarily store first number digits and show them on the screen
    if (inputs.operator === null && inputs.firstNumber === null) {
      temp.num1Arr.push(selected.textContent);
    }

    // Make sure . can't be used twice in a number
    if (selected.textContent === ".") {
      decimalBtn.disabled = true;
    }

    if (temp.num1Arr[0] === ".") {
      temp.num1Arr.unshift("0");
      decimalBtn.disabled = true;
    }
    
    if (temp.num1Arr[0] === "0" && temp.num1Arr[1] === "0") {
      temp.num1Arr.pop();
    }

    if (temp.num1Arr.length == 2 && temp.num1Arr[0] === "0") {
      temp.num1Arr.shift();
    }

    // Second number decimal handling in case there's . in the first place
    if (temp.num2Arr[0] === ".") {
      temp.num2Arr.unshift("0");
      decimalBtn.disabled = true;
    }
    
    if (temp.num2Arr[0] === "0" && temp.num2Arr[1] === "0") {
      temp.num2Arr.pop();
    }

    if (temp.num2Arr.length == 2 && temp.num2Arr[0] === "0") {
      temp.num2Arr.shift();
    }
    
    updateScreen(temp.num1Arr.join(""));
    
  } else if (selected.classList.contains("funct-btn") && funcBtnsEnabled == true && inputs.firstNumber === null) {
    decimalBtn.disabled = false;
    
    // Store first number to inputs after clicking funct btn
    inputs.firstNumber = +temp.num1Arr.join("");

    if (inputs.operator === null) {
      inputs.operator = selected.textContent;
      updateScreen(inputs.firstNumber + inputs.operator);
      console.log(`Inputs operator: ${inputs.operator}`)
    } else {
      // Add temp.op clearing if operation completed?
      temp.operator = selected.textContent;
      updateScreen(inputs.firstNumber + temp.operator);
      console.log(`Temp operator: ${temp.operator}`)
    }
    
    console.log(`1st: ${inputs.firstNumber }`);
    
    funcBtnsEnabled = false;
  }

  if (selected.classList.contains("funct-btn") && temp.num1Arr.length > 0 && temp.num2Arr.length === 0 && inputs.operator === null) {
    inputs.operator = selected.textContent;
    updateScreen(inputs.firstNumber + inputs.operator);
    console.log(`op: ${inputs.operator}`);
  }

  if (selected.classList.contains("num") && inputs.firstNumber != null) {
    temp.num2Arr.push(selected.textContent);
    updateScreen(inputs.firstNumber + inputs.operator + temp.num2Arr.join(""));

    inputs.secondNumber = +temp.num2Arr.join("");
    console.log(`2nd: ${inputs.secondNumber }`);
  }
  
  if ((selected.classList.contains("equal-btn") || selected.classList.contains("funct-btn")) && inputs.firstNumber != null && inputs.secondNumber != null) {
    if (selected.classList.contains("funct-btn") && inputs.operator != null) {
      toggleNumBtns(true);
      temp.operator = selected.textContent;
      temp.result = operate(inputs.operator, inputs.firstNumber, inputs.secondNumber);
      inputs.operator = temp.operator;
      inputs.firstNumber = temp.result;
      
      inputs.secondNumber = null;
      temp.num2Arr = [];
      updateScreen(inputs.firstNumber + temp.operator + temp.num2Arr.join(""));
    } else if (selected.classList.contains("funct-btn") && inputs.operator === null) {
      toggleNumBtns(true);
      inputs.operator = selected.textContent;
      temp.result = operate(inputs.operator, inputs.firstNumber, inputs.secondNumber);
      updateScreen(inputs.firstNumber + inputs.operator + temp.num2Arr.join(""));
    } else if (selected.classList.contains("equal-btn")) {
      toggleNumBtns(false);
      temp.result = operate(inputs.operator, inputs.firstNumber, inputs.secondNumber);
      updateScreen(inputs.firstNumber + temp.operator + temp.num2Arr.join(""));
    }

    if (isFloat(temp.result)) {
      if (temp.result === Infinity) {
        updateScreen("Ho! Ho! Ho!");
      } else {
        if (temp.result.toString().length > 7) {
          temp.result = Number.parseFloat(temp.result).toPrecision(7);
        }
        updateScreen(temp.result);
        console.log(`Float: ${temp.result}`);
      }
    } else {
      updateScreen(temp.result);
      console.log(`Int result: ${temp.result}`);
    }
    
    console.log(`in.first: ${inputs.firstNumber }`);
    console.log(`in.second: ${inputs.secondNumber }`);
  }
  });
