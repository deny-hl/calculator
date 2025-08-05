const container = document.querySelector('#container');
const buttons = container.querySelectorAll('button');

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
}