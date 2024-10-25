const btns = document.querySelectorAll("button");
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

  clear() {
    for (const key in this) {
      if (Array.isArray(this[key])) {
        this[key] = [];
      }
    }
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

function operate(operator, firstNum, secondNum) {  
  // Calls one of the above functions on the numbers
}


acBtn.addEventListener("click", () => {
  inputs.clear();
  temp.clear();
  resultSpan.textContent = "0";
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

btns.forEach(function(e) {
  e.addEventListener("click", (event) => {
    // If class of the button is a number, then store in a variable
    if (e.classList.contains("num")) {
      toggleFuncBtns(true);
      
      // Temporarily store first number digits and show them on the screen
      temp.num1Arr.push(event.target.textContent);

      // Make sure . can't be used twice in a number
      if (event.target.textContent === ".") {
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

      resultSpan.textContent = temp.num1Arr.join("");
      console.log(temp.num1Arr);
      
      // If operator is clicked, store into inputs.firstNumber
      // After clicking operator, update first number
      // After clicking = or * / etc., store second number
    } else if (e.classList.contains("funct-btn") && funcBtnsEnabled == true) {
      
      console.log(inputs.firstNumber);
      console.log(typeof inputs.firstNumber);
    }
    

    // inputs.firstNumber = event.target.textContent;
    // console.log(inputs.firstNumber);
    // console.log(inputs);
  });
});