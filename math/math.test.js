const {
  addition,
  subtraction,
  multiplication,
  division,
  squareRoot,
  maxNumber,
} = require("./math");

describe("Math operations", () => {
  test("test addition", () => {
    expect(addition(1, 4)).toBe(5);
  });

  test("test subtraction", () => {
    expect(subtraction(3, 2)).toBe(1);
  });

  test("test multiplication", () => {
    expect(multiplication(2, 3)).toBe(6);
  });

  test("test division", () => {
    expect(division(6, 2)).toBe(3);
  });
  test("test division by zero", () => {
    expect(() => {
      division(6, 0);
    }).toThrow("Division by zero is not allowed");
  });
});

describe("Advanced Math operations", () => {
  test("test square root", () => {
    expect(squareRoot(4)).toBe(2);
  });
  test("test square root of negative number", () => {
    expect(() => {
      squareRoot(-4);
    }).toThrow("Square root of negative number is not allowed");
  });
  test("test max number", () => {
    expect(maxNumber(1, 3)).toBe(3);
  });
});
