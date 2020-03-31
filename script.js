// Setting up the truths

let prevEntry = 0;
let operator = null;
let currentEntry = 0;
let result = 0;

// Select the elements needed

let display = document.querySelector('#display');
let buttons = document.querySelectorAll('.btn');
let operators = document.querySelectorAll('.operator');
updateScreen(result);

// Function listening for which keys are pressed

buttons.forEach(btn => {
  btn.addEventListener("click", function() {
    let btnClicked = this.innerText;
    // console.log("you clicked: ", btnClicked);
    display.value = btnClicked;

    if (btnClicked === "AC") {
      currentEntry = 0;
      // removeActiveOperator();
    } else if (btnClicked === "+/-" ) {
      currentEntry *= -1;
      // removeActiveOperator();
    } else if (btnClicked === ".") {
      currentEntry += ".";
      // removeActiveOperator();
    } else if (btnClicked === "x") {
      btn.classList.add("active");
      prevEntry = currentEntry;
      operation = "*";
      currentEntry = "";
    } else if (btnClicked === "÷") {
      btn.classList.add("active");
      prevEntry = currentEntry;
      operation = "/";
      currentEntry = "";
    } else if (btnClicked === "+") {
      prevEntry = parseFloat(currentEntry);
      btn.classList.add("active");
      operation = "+";
      currentEntry = "";
    } else if (btnClicked === "-") {
      prevEntry = parseFloat(currentEntry);
      btn.classList.add("active");
      operation = "-";
      currentEntry = "";    
    // ----- CREATE FUNCTION FOR isNumber -----
    } else if (isNumber(btnClicked)) {
      // If 0 is displayed, replace 0 with currentEntry
      // or
      // If result is displayed, reset number
      removeActiveOperator();
      if (currentEntry === 0 || currentEntry === result ) {
        currentEntry = btnClicked;
        // Add to entry if numbers are displayed
      } else {
        currentEntry += btnClicked;
      }
    } else if (isOperator(btnClicked)) {
      prevEntry = currentEntry;
      operation = btnClicked;
      currentEntry = "";
    } else if (btnClicked === "%") {
      currentEntry /= 100;
    } else if (btnClicked === "=") {
      result = operate(prevEntry, operation, currentEntry);
      btn.classList.remove("active");
      operation = null;
      currentEntry = result;
    }
    updateScreen(currentEntry);  
  });
});

// Function to declare what numbers are 

function isNumber(value) {
  return !isNaN(value);
};

// Define the operators 

function isOperator(value) {
  return value === "÷" || value === "+" || value === "x" || value === "-";
};

// Calculating code 

function operate(a, operation, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch(operation) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
  }
};

// Display the results 

function updateScreen(result) {
  let displayValue = result.toString();
  display.value = displayValue.substring(0, 6);
};

function removeActiveOperator() {
  operators.forEach(operator => {
    operator.classList.remove('active');
  })
}