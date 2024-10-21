const btns = document.querySelectorAll("button");
const funcBtns = document.querySelectorAll(".funct-btn")

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

function enableFuncBtns() {
  funcBtns.forEach(btn => {
    btn.disabled = false; 
  });
}

btns.forEach(function(e) {
  e.addEventListener("click", (event) => {
    // If class of the button is a number, then store in a variable
    if (e.classList.contains("num")) {
      // Concat numbers into array else block function btns
      // Before clicking the operator keep concat numbers - function?
      
      temp.num1Arr.push(event.target.textContent);
      console.log(temp.num1Arr);
      
      // If operator is clicked, store into inputs.firstNumber
      // After clicking operator, update first number
      // After clicking = or * / etc., store second number
    } else if (e.classList.contains("funct-btn")) {
      inputs.firstNumber = Number(temp.num1Arr.join(""));
      console.log(inputs.firstNumber);
      console.log(typeof inputs.firstNumber);
    }
    

    // inputs.firstNumber = event.target.textContent;
    // console.log(inputs.firstNumber);
    // console.log(inputs);
  });
});