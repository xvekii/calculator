const btns = document.querySelectorAll("button");

const inputs = {
  operator: null,
  firstNumber: null,
  secondNumber: null,
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


btns.forEach(function(e) {
  e.addEventListener("click", (event) => {
    // If class of the button is a number, then store in a variable
    // Before clicking the operator keep concat numbers - function?
    // After clicking operator, update first number
    // After clicking = or * / etc., update second number

    // inputs.firstNumber = event.target.textContent;
    // console.log(inputs.firstNumber);
    // console.log(inputs);
  });
});