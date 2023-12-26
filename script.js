// TODO Don't mix JS and CSS classes

// Variables
let upperDisplay = document.querySelector("[data-upper-display]");
let lowerDisplay = document.querySelector("[data-lower-display]");
const allClearButton = document.querySelector("[data-all-clear-button]");
const clearButton = document.querySelector("[data-clear-button]");
const equalsButton = document.querySelector("[data-equals-button]");
const numberButtons = document.querySelectorAll("[data-number-button]");
const operationButtons = document.querySelectorAll("[data-operation-button]");


class Calculator {
  constructor() {
    this.prevOperand = "";
    this.currentOperand = "";
    this.operator = "";
    this.result = "";
  }

  setup() {
    // Add event listeners to buttons
    numberButtons.forEach(numberButton => {
      numberButton.addEventListener("click", event => {
        // If this were a regular function would `this` be `numberButton`?
        this.currentOperand += event.target.textContent;
        this.updateDisplay();
      });

    });

    operationButtons.forEach(operationButton => {
      operationButton.addEventListener("click", event => {
        if (!this.result) {
          this.prevOperand = this.currentOperand;
          this.currentOperand = "";
        } else {
          this.currentOperand = this.result;
          this.result = "";
          this.prevOperand = "";
        }
        
        this.operator = event.target.textContent;
        this.updateDisplay();
      });
    });

    equalsButton.addEventListener("click", event => {
      // Check if there are two operands and one operator
      if (this.prevOperand && this.operator && this.currentOperand) {
        this.calculate();
        this.updateDisplay();
      } else {
        return;
      }
    });

    allClearButton.addEventListener("click", () => {
      this.prevOperand = "";
      this.currentOperand = "";
      this.operator = "";
      this.result = "";
      this.updateDisplay();
    });

    clearButton.addEventListener("click", () => {
      if (this.currentOperand) {
        this.currentOperand = this.currentOperand.slice(1);
        this.updateDisplay();
      }
    });

  }
  
  calculate() {
    let result;
    switch(this.operator) {
      case "+":
        result = +this.prevOperand + +this.currentOperand;
        this.result = result.toString();
        break;
      case "-": 
        result = +this.prevOperand - +this.currentOperand;
        this.result = result.toString();
        break;
      case "*":
        result = +this.prevOperand * +this.currentOperand;
        this.result = result.toString();
        break;
      case "/":
        if (this.currentOperand === "0") {
          console.log("Division by 0 is not allowed.");
          return;
        }

        result = +this.prevOperand / +this.currentOperand;
        this.result = result.toString();
        break;
      default:
        console.log("Unknown operation");
    }
  }
  
  updateDisplay() {
    if (!this.result) {
      if (!this.prevOperand) {
        lowerDisplay.textContent = this.currentOperand + this.operator;
      } else {
        lowerDisplay.textContent = this.prevOperand + this.operator + this.currentOperand;
      }
    } else {
      upperDisplay.textContent = this.prevOperand + this.operator + this.currentOperand;
      lowerDisplay.textContent = this.result;
    }
  }
}

let calculator = new Calculator();
calculator.setup();
