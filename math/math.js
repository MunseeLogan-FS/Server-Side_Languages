const addition = (a, b) => {
  return a + b;
};
const subtraction = (a, b) => {
  return a - b;
};
const multiplication = (a, b) => {
  return a * b;
};
const division = (a, b) => {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
};
const squareRoot = (a) => {
  if (a < 0) {
    throw new Error("Square root of negative number is not allowed");
  }
  return Math.sqrt(a);
};

const maxNumber = (a, b) => {
  return Math.max(a, b);
};

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  squareRoot,
  maxNumber,
};
