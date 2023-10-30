const { calculateTotaalInkomen } = require("../../app");

test("calculateTotaalInkomen should calculate the total income correctly", () => {
  const result = calculateTotaalInkomen(50000, 30000);
  expect(result).toBe(80000);
});
