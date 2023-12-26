// TODO Don't mix JS and CSS classes

// Variables
let upperDisplay = document.querySelector("[data-upper-display]");
let lowerDisplay = document.querySelector("[data-lower-display]");
const allClearButton = document.querySelector("[data-all-clear-button]");
const clearButton = document.querySelector("[data-clear-button]");
const equalsButton = document.querySelector("[data-equals-button]");
const numberButtons = document.querySelectorAll("[data-number-button]");
const operationButtons = document.querySelectorAll("[data-operation-button]");

// V1: Implement without upper display
// TODO Implement operation chaining
class Calculator {
  constructor() {
    this.clear();
    this.setup();
  }

  clear() {
    this.prevOperand = "";
    this.currentOperand = "";
    this.operator = "";
  }

  setup() {
    numberButtons.forEach(numberButton => {
      numberButton.addEventListener("click", event => {
        // If this were a regular function would `this` be `numberButton`?
          let numberInput = event.target.textContent;
          if (!this.operator) {
            this.currentOperand += numberInput;
          } else if (this.operator && this.currentOperand) {
            this.prevOperand = this.currentOperand;
            this.currentOperand = numberInput;
          } else if (this.prevOperand && this.operator && !this.currentOperand) {
            this.currentOperand += numberInput;
          }

          this.updateDisplay();
      });

    });

    operationButtons.forEach(operationButton => {
      operationButton.addEventListener("click", event => {
        if (!this.currentOperand) {
          console.log("Illegal operation");
          return;
        }

        this.operator = event.target.textContent;
        this.updateDisplay();
      });
    });

    equalsButton.addEventListener("click", event => {
      if (this.prevOperand && this.operator && this.currentOperand) {
        this.calculate();
        this.updateDisplay();
      } else {
        console.log("Illegal operation");
        return;
      }
    });

    allClearButton.addEventListener("click", () => {
      this.clear();
      this.updateDisplay();
    });

    clearButton.addEventListener("click", () => {
      if (!this.prevOperand && !this.operator && this.currentOperand) {
        this.currentOperand = this.currentOperand.slice(1);
      } else if (!this.prevOperand && this.operator && this.currentOperand) {
        this.operator = "";
      } else if (this.prevOperand && this.operator && this.currentOperand) {
        this.currentOperand = this.currentOperand.slice(1);
      } else if (this.prevOperand && this.operator) {
        this.operator = "";
      } else if (this.prevOperand) {
        this.prevOperand = this.prevOperand.slice(1);
      }

      this.updateDisplay();
    });

  }

  calculate() {
    let result = null;
    switch (this.operator) {
      case "+":
        result = +this.prevOperand + +this.currentOperand;
        break;
      case "-":
        result = +this.prevOperand - +this.currentOperand;
        break;
      case "*":
        result = +this.prevOperand * +this.currentOperand;
        break;
      case "÷":
        if (this.currentOperand === "0") {
          console.log("Division by 0 is not allowed.");
          return;
        }

        result = +this.prevOperand / +this.currentOperand;
        break;
      default:
        console.log("Unknown operation");
    }

    this.currentOperand = Number.isInteger(result) ? result.toString() : result.toFixed(3).toString();
    this.operator = "";
    this.prevOperand = "";
  }

  updateDisplay() {
    if (!this.prevOperand) {
      lowerDisplay.textContent = this.currentOperand + this.operator;
    } else {
      lowerDisplay.textContent = this.prevOperand + this.operator + this.currentOperand;
    }

    console.log("prevOperand: ", this.prevOperand);
    console.log("operator: ", this.operator);
    console.log("current operand: ", this.currentOperand);
  }
}

let calculator = new Calculator();
