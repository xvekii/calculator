const btns = document.querySelectorAll("button");
const btnsMainCont = document.querySelector(".buttons-main-container");
const funcBtns = document.querySelectorAll(".funct-btn");
let resultSpan = document.querySelector(".result-span");
const decimalBtn = document.querySelector(".decimal");
const acBtn = document.querySelector(".ac-btn");

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
  newNum2Arr: [], 
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


btnsMainCont.addEventListener("click", (event) => {
  let selected = event.target;
  
  if (selected.textContent === "±" && temp.num1Arr.length === 0) {
    temp.num1Arr.push("-");
    updateScreen(temp.num1Arr);
  } else if (selected.textContent === "±" && temp.num2Arr.length === 0) {
    temp.num2Arr.push("-");
  }

  if (selected.classList.contains("num")) {
    toggleFuncBtns(true);
    
    // Temporarily store first number digits and show them on the screen
    if (inputs.operator === null) {
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
    updateScreen(temp.num1Arr.join(""));
    
  } else if (selected.classList.contains("funct-btn") && funcBtnsEnabled == true) {
    decimalBtn.disabled = false;
    inputs.operator = selected.textContent;
    
    // Store first number to inputs after clicking funct btn
    inputs.firstNumber = +temp.num1Arr.join("");
    console.log(`in.first: ${inputs.firstNumber }`);
    // temp.num1Arr = [];
    
    updateScreen(inputs.firstNumber + inputs.operator);
    funcBtnsEnabled = false;
  }

  if (selected.classList.contains("num") && inputs.firstNumber != null) {
    temp.num2Arr.push(selected.textContent);
    updateScreen(inputs.firstNumber + inputs.operator + temp.num2Arr.join(""));

    inputs.secondNumber = +temp.num2Arr.join("");
    console.log(`2nd num: ${temp.num2Arr}`);
  }
  
  if (selected.classList.contains("equal-btn") && inputs.firstNumber != null && inputs.secondNumber != null) {
    temp.result = operate(inputs.operator, inputs.firstNumber, inputs.secondNumber);
    
    if (isFloat(temp.result)) {
      if (temp.result.toString().length > 7) {
        temp.result = Number.parseFloat(temp.result).toPrecision(7);
      }
      updateScreen(temp.result);
      console.log(`Float: ${temp.result}`);
    } else {
      updateScreen(temp.result);
      console.log(`Integer: ${temp.result}`);
    }
    console.log(`in.first: ${inputs.firstNumber }`);
  }

  // if (selected.classList.contains("funct-btn") && inputs.secondNumber != null && inputs.operator != null) {
  //   temp.operator = selected.textContent;
  //   temp.result = operate(inputs.operator, inputs.firstNumber, inputs.secondNumber);
  //   updateScreen(temp.result);
  
  // }

  });
