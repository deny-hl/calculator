// Main script for calculator functionality
// Implements basic math operations, chained calculations, keyboard and UI support, error handling, and UI updates

const calculator = document.getElementById('calculator');
const display = document.getElementById('display')

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b === 0 ? 'Error' : a / b;
}

function operate(operator, a, b) {
  const x = parseFloat(a);
  const y = parseFloat(b);

  let result;
  switch(operator) {
    case '+':
      result = add(x, y);
      break;
    case '-':
      result = subtract(x, y);
      break;
    case '*':
      result = multiply(x, y);
      break;
    case '/':
      result = divide(x, y);
      break;
  }

  if (typeof result === 'number' && !Number.isInteger(result)) {
    return Math.round(result * 100000000) / 100000000;
  }

  return result;
}

//variables to store state
let displayValue = '0';
let firstNumber = null;
let operator = null;
let waitingForOperand = false;
let showingOperator = false;

//function to update display
function updateDisplay() {
  display.textContent = displayValue;
}

function showOperatorOnDisplay(op) {
  const operatorSymbols = {
    '+': '+',
    '-' : '-',
    '*' : '*',
    '/' : '/'
  };

  const currentValue = displayValue;

  displayValue = operatorSymbols[op] || op;
  showingOperator = true;
  updateDisplay();

  setTimeout(() => {
    if (showingOperator) {
      displayValue = firstNumber !== null ? String(firstNumber) : currentValue;
      showingOperator = false;
      updateDisplay();

    }
  }, 3000);
}

function inputDigit(digit) {
  if (waitingForOperand || showingOperator) {
    displayValue = digit;
    waitingForOperand = false;
    showingOperator = false;
  } else {
    displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  updateDisplay();
}

//decimal point functionality
function inputDecimal() {
  if (waitingForOperand) {
    displayValue = '0.';
    waitingForOperand = false;
    showingOperator = false;
  } else if (displayValue.indexOf('.') === -1) {
    displayValue += '.';
  }
  updateDisplay();
}

//backspace functionality
function backspace() {
  if (showingOperator) {
    displayValue = firstNumber !== null ? String(firstNumber) : '0';
    showingOperator = false;
  } else if (displayValue.length > 1){
    displayValue = displayValue.slice(0, -1);
  } else {
    displayValue = '0';
  }
  updateDisplay();
}

//clear function
function clear() {
  displayValue = '0';
  firstNumber = null;
  operator = null;
  waitingForOperand = false;
  showingOperator = false;
  updateDisplay();
}

//operation logic
function inputOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);

  if (firstNumber !== null && operator && !waitingForOperand && !showingOperator) {
    const result = operate(operator, firstNumber, inputValue);

    //division by zero
    if (typeof result === 'string') {
      displayValue = result;
      firstNumber = null;
      operator = null;
      waitingForOperand = true;
      showingOperator = false;
      updateDisplay();
      return;
    }
    firstNumber = result;
    displayValue = String(result);
    updateDisplay();

  } else if (firstNumber === null && !isNaN(inputValue)) {
    firstNumber = inputValue;
  }

  waitingForOperand = true;
  operator = nextOperator;
  showOperatorOnDisplay(nextOperator);
}

function calculate() {
  if (firstNumber === null || operator === null || waitingForOperand) {
    return;
  }

  const inputValue = parseFloat(displayValue);
  const newValue = operate(operator, firstNumber, inputValue);

  if (typeof newValue === 'string') {
    displayValue = newValue;
    firstNumber = null;
    operator = null;
    waitingForOperand = true;
  } else {
    displayValue = String(newValue);
    firstNumber = null;
    operator = null;
    waitingForOperand = true;
  }
  showingOperator = false;
  updateDisplay();
}
// Enable keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key)) {
    inputDigit(key);
  }

  if (key === '.') {
    inputDecimal();
  }

  if (key === '+' || key === '-' || key === '*' || key === '/') {
    inputOperator(key);
  }

  if (key === 'Enter' || key === '=') {
    e.preventDefault();
    calculate();
  }

  if (key === 'Backspace') {
    e.preventDefault();
    backspace();
  }

  if (key.toLowerCase() === 'c' || key === 'Escape') {
    clear();
  }
});
// Add click event listeners to all buttons
calculator.addEventListener('click', (e) => {
  const target = e.target;

  if (target.matches('button')) {
    if (target.dataset.digit) {
      inputDigit(target.dataset.digit);
    }

    if (target.dataset.operator) {
      inputOperator(target.dataset.operator);
    }

    if (target.dataset.action === 'equals') {
      calculate();
    }

    if (target.dataset.action === 'clear') {
      clear();
    }

    if (target.dataset.action === 'dot') {
      inputDecimal();
    }

    if (target.dataset.action === 'backspace') {
      backspace();
    }
  }
});

updateDisplay();