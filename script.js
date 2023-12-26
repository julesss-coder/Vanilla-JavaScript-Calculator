// TODO Don't mix JS and CSS classes

// Variables
let upperDisplay = document.querySelector("[data-upper-display]");
let lowerDisplay = document.querySelector("[data-lower-display]");
const allClearButton = document.querySelector("[data-all-clear-button]");
const clearButton = document.querySelector("[data-clear-button]");
const equalsButton = document.querySelector("[data-equals-button]");
const numberButtons = document.querySelectorAll("[data-number-button]");
const operationButtons = document.querySelectorAll("[data-operation-button]");

// TODO: Get rid of `result`
// DRY clear()

class Calculator {
  constructor() {
    this.clear();
    this.setup();
  }

  clear() {
    this.prevOperand = "";
    this.currentOperand = "";
    this.operator = "";
    this.result = "";
  }

  // TODO call clear and setup() in constructor
  setup() {
    // Add event listeners to buttons
    numberButtons.forEach(numberButton => {
      numberButton.addEventListener("click", event => {
        // If this were a regular function would `this` be `numberButton`?
        if (!this.result) {
          this.currentOperand += event.target.textContent;
        } else {
          this.result += event.target.textContent;
        }
        this.updateDisplay();
      });

    });

    //Was wenn mehrere Operationen ohne = aneinander gekettet werden?
    operationButtons.forEach(operationButton => {
      operationButton.addEventListener("click", event => {
        if (!this.currentOperand) {
          console.log("Illegal operation");
          return;
        }

        if (!this.result) {
          this.prevOperand = this.currentOperand;
          this.currentOperand = "";
        } else if (this.result) {
          this.prevOperand = this.result;
          this.result = "";
          this.currentOperand = "";
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
      this.clear();
      this.updateDisplay();
    });

    clearButton.addEventListener("click", () => {
      if (!this.result) {
        if (this.currentOperand) {
          this.currentOperand = this.currentOperand.slice(1);
          this.updateDisplay();
        }
      } else {
        this.result = this.result.slice(1);
        this.updateDisplay();

      }
    });

  }

  calculate() {
    let result;
    switch (this.operator) {
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
      case "÷":
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

  // TODO Does not work - what do I want to happen?
  updateDisplay() {
    // if no result
    if (!this.result) {
      // Case 1: current Operand, but no operator, no prev operand
      lowerDisplay.textContent = this.prevOperand + this.operator + this.currentOperand;
      upperDisplay.textContent = this.result;
    } else {
      upperDisplay.textContent = this.prevOperand + this.operator + this.currentOperand;
      lowerDisplay.textContent = this.result;
    }
    // Case 2: Current operand and operator
    lowerDisplay.textContent = this.currentOperand + this.operator;
    console.log("prevOperand: ", this.prevOperand);
    console.log("operator: ", this.operator);
    console.log("current operand: ", this.currentOperand);
    console.log("result: ", this.result);
  }
}

let calculator = new Calculator();
