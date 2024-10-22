const btns = document.querySelectorAll("button");
const funcBtns = document.querySelectorAll(".funct-btn");
let resultSpan = document.querySelector(".result-span");

let funcBtnsEnabled = false;

const inputs = {
  operator: null,
  firstNumber: null,
  secondNumber: null,
}

const temp = {
  num1Arr: [],
  num2Arr: [], 
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
      // Concat numbers into array else block function btns
      // Before clicking the operator keep concat numbers - function?
      
      // Temporarily store first number digits and show them on the screen
      temp.num1Arr.push(event.target.textContent);
      resultSpan.textContent = Number(temp.num1Arr.join(""));
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