let screen = document.getElementById('screen');
let memory = null;
let op = null;
let resetScreen = false;  // Add this flag

function c(input) {
  if (input === 'C') {
    screen.textContent = '0';
    memory = null;
    op = null;
    resetScreen = false;
  } 
  else if (input === '=') {
    if (memory !== null && op) {
      let a = parseFloat(memory);
      let b = parseFloat(screen.textContent);
      let result;
      if (op === '+') result = a + b;
      if (op === '-') result = a - b;
      if (op === '*') result = a * b;
      if (op === '/') result = b !== 0 ? a / b : 'Error';
      screen.textContent = result;
      memory = null;
      op = null;
      resetScreen = true;  // Next number should clear screen
    }
  }
  else if (['+', '-', '*', '/'].includes(input)) {
    if (memory === null) {
      memory = screen.textContent;
    } else if (op) {
      // Calculate if there's already an operation pending
      c('=');
      memory = screen.textContent;
    }
    op = input;
    resetScreen = true;  // Next number should clear screen
  }
  else {
    // Number or decimal
    if (screen.textContent === '0' || resetScreen) {
      screen.textContent = input;
      resetScreen = false;
    } else {
      screen.textContent += input;
    }
  }
}