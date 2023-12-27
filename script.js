let upperDisplay = document.querySelector("[data-upper-display]");
let lowerDisplay = document.querySelector("[data-lower-display]");
const allClearButton = document.querySelector("[data-all-clear-button]");
const clearButton = document.querySelector("[data-clear-button]");
const equalsButton = document.querySelector("[data-equals-button]");
const numberButtons = document.querySelectorAll("[data-number-button]");
const operationButtons = document.querySelectorAll("[data-operation-button]");

// TODO Implement E notation for long integers
class Calculator {
  constructor() {
    this.clear();
    this.setup();
  }

  clear() {
    this.prevOperand = "";
    this.currentOperand = "";
    this.operator = "";
    this.computationHistory = "";
  }

  setup() {
    numberButtons.forEach(numberButton => {
      numberButton.addEventListener("click", event => {
        const numberInput = event.target.textContent;

        if (this.currentOperand.includes(".") && !this.operator && numberInput === ".") {
          console.log("Illegal operation");
          return;
        }

        if (this.operator && !this.prevOperand) {
          this.prevOperand = this.currentOperand;
          this.currentOperand = "";
        }

        if (!this.currentOperand && numberInput == "." || this.operator && !this.prevOperand) {
          this.currentOperand = "0.";
        } else {
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
        // If current operand ends in comma, remove comma
        if (this.currentOperand.indexOf(".") === this.currentOperand.length - 1) {
          this.currentOperand = this.currentOperand.slice(0, -1);
        }

        // Operation chaining: If there is a full operation and another operand is clicked, compute the previous values, then reset operator.
        if (this.prevOperand && this.operator && this.currentOperand) {
          this.compute();
        }
        
        this.operator = event.target.textContent;
        this.updateDisplay();
      });
    });

    equalsButton.addEventListener("click", event => {
      // If current operand ends in comma, remove comma
      if (this.currentOperand.indexOf(".") === this.currentOperand.length - 1) {
        this.currentOperand = this.currentOperand.slice(0, -1);
      }

      if (this.prevOperand && this.operator && this.currentOperand) {
        this.compute();
      } else {
        console.log("Illegal operation.");
        return;
      }

      this.updateDisplay();
    });

    allClearButton.addEventListener("click", () => {
      this.clear();
      this.updateDisplay();
    });

    clearButton.addEventListener("click", () => {
      if (!this.prevOperand) { 
        if (this.operator) {
          this.operator = "";
        } else {
          this.currentOperand = this.currentOperand.slice(0, -1);
        }
      } else {
        this.currentOperand = this.currentOperand.slice(0, -1);
        if (!this.currentOperand) {
          this.currentOperand = this.prevOperand;
          this.prevOperand = "";
        }
      }

      this.updateDisplay();
    });

  }

  compute() {
    this.computationHistory = `${this.prevOperand}${this.operator}${this.currentOperand}`;

    switch (this.operator) {
      case "+":
        this.currentOperand = +this.prevOperand + +this.currentOperand;
        break;
      case "-":
        this.currentOperand = +this.prevOperand - +this.currentOperand;
        break;
      case "*":
        this.currentOperand = +this.prevOperand * +this.currentOperand;
        break;
      case "÷":
        if (this.currentOperand === "0") {
          console.log("Division by 0 is not allowed.");
          return;
        }

        this.currentOperand = +this.prevOperand / +this.currentOperand;
        break;
      default:
        console.log("Unknown operation");
        this.computationHistory = "Error";
    }

    this.currentOperand = Number.isInteger(this.currentOperand) ? this.currentOperand.toString() : this.getFloat(this.currentOperand);
    this.prevOperand = "";
    this.operator = "";
  }
  
  getFloat(float) {
    if (float.toString().includes("e")) {
      return float;
    }
    
    // In case of floating point number, get correct number. Only if more than 5 post 0 digits, cut it off.
    let formattedFloat = parseFloat(float);
    formattedFloat = formattedFloat.toString().split(".")[1].length > 5 ? formattedFloat.toFixed(5).toString() : formattedFloat.toString();
    return formattedFloat;
  }

  updateDisplay() {
    if (!this.prevOperand) {
      lowerDisplay.textContent = this.currentOperand + this.operator;
    } else {
      lowerDisplay.textContent = this.prevOperand + this.operator + this.currentOperand;
    }

    upperDisplay.textContent = this.computationHistory;

    console.log("computation history: ", this.computationHistory);
    console.log("prevOperand: ", this.prevOperand);
    console.log("operator: ", this.operator);
    console.log("current operand: ", this.currentOperand);
  }
}

let calculator = new Calculator();