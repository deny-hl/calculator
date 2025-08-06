const container = document.getElementById('container');
const buttons = container.querySelectorAll('button');
const displayElement = document.getElementById('display');
const state = {
  previouValue: null,
  currentInput: '0',
  operator: null,
  resultDisplayed: false
}
console.log(state);



buttons.forEach(btn => {
  btn.addEventListener('click', (event) => {
    console.log(event.currentTarget);
    
  })
})

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
  return b === 0 ? 'Error' : b / a;
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

  if (typeof result === 'number') {
    return parseFloat(result.toFixed(10));
  }

  return result;
}

function logState(eventSource) {
  console.log(`${eventSource}`, state);
}

const digitButtons = document.querySelectorAll('[data-digit]');

digitButtons.forEach(btn =>
  btn.addEventListener('click', () => {
    const digit = btn.dataset.digit;

    if (state.resultDisplayed) {
      state.currentInput = digit;
      state.resultDisplayed = false;
    } else {
      state.currentInput =
      state.currentInput === '0' ? digit : state.currentInput + digit;
    }
    displayElement.textContent = state.currentInput;
    logState('digit ${digit}');
  })
)

const dotButton = document.querySelector('[data-key="dot"]');
dotButton.addEventListener('click', () => {
  if (state.resultDisplayed) {
    state.currentInput = '0.';
    state.resultDisplayed = false;
  } else if (!state.currentInput.includes('.')) {
    state.currentInput += '.';
  }
  displayElement.textContent = state.currentInput;
  logState('decimal');
})