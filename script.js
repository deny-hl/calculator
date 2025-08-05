const container = document.querySelector('#container');
const buttons = container.querySelectorAll('button');
const state = {
  previouValue: null,
  currentInput: '0',
  operator: null,
  resultDisplayed: false
}
console.log(state);


buttons.forEach(btn => {
  btn.addEventListener('click', (event) => {
    console.log('Clicked:', event.currentTarget);
    
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