const display = document.querySelector('.display');
const upperDisplay = document.querySelector(".calculation-first-part");
const lowerDisplay = document.querySelector(".current-operand");

const numberButtons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".operation-button");
const equalsButton = document.querySelector(".equals-button");
const allClearButton = document.querySelector(".all-clear-button");
const clearButton = document.querySelector(".clear-button");

numberButtons.forEach(numberButton => {
  numberButton.addEventListener("click", event => {
    if (!operator) {
      currentOperand += event.target.textContent;
    } else {
      prevOperand = currentOperand;
      currentOperand = "";
      currentOperand += event.target.textContent;
    }
    lowerDisplay.textContent = currentOperand;
    upperDisplay.textContent = prevOperand;
  });
});

operationButtons.forEach(operationButton => {
  operationButton.addEventListener("click", (event) => {
    if (!currentOperand) {
      return;
    }

    operator = event.target.textContent;
    lowerDisplay.textContent += event.target.textContent;
  });
});

equalsButton.addEventListener("click", event => {
  console.log(event.target.textContent)
});

allClearButton.addEventListener("click", event => {
  lowerDisplay.textContent = "";
  upperDisplay.textContent = "";
});

clearButton.addEventListener("click", event => {
  lowerDisplay.textContent = lowerDisplay.textContent.slice(0, -1);
});

let currentOperand = "";
let operator = "";
let prevOperand = "";


