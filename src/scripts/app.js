// File: /calculadora/calculadora/src/scripts/app.js

let display = document.getElementById("display");
let buttons = Array.from(document.getElementsByClassName("button"));
let currentInput = "";
let previousInput = "";
let operation = null;

buttons.map(button => {
  button.addEventListener("click", (e) => {
    let value = e.target.getAttribute("data-value");

    if (value === "C") {
      currentInput = "";
      previousInput = "";
      operation = null;
      display.innerText = "0";
    } else if (value === "=") {
      if (operation && currentInput !== "" && previousInput !== "") {
        currentInput = calculate(previousInput, currentInput, operation);
        display.innerText = currentInput;
        previousInput = "";
        operation = null;
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (currentInput !== "") {
        if (previousInput !== "") {
          previousInput = calculate(previousInput, currentInput, operation);
        } else {
          previousInput = currentInput;
        }
        currentInput = "";
        operation = value;
      }
    } else {
      currentInput += value;
    }

    // Mostrar la operación en curso en el display
    if (operation) {
      display.innerText = `${previousInput} ${operation} ${currentInput}`;
    } else {
      display.innerText = currentInput || "0";
    }
  });
});

function calculate(a, b, operation) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operation) {
    case "+":
      return (a + b).toString();
    case "-":
      return (a - b).toString();
    case "*":
      return (a * b).toString();
    case "/":
      return (a / b).toString();
    default:
      return b;
  }
}