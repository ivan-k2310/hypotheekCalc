const { calculateMaxHypotheek } = require("../../app");

test("calculateMaxHypotheek should calculate the maximum mortgage correctly without studieschuld in 10 termijnen", () => {
  const result = calculateMaxHypotheek(80000, false, 10);
  expect(result).toBe(351900);
});

test("calculateMaxHypotheek should calculate the maximum mortgage correctly with studieschuld in 1 termijn", () => {
  const result = calculateMaxHypotheek(80000, true, 1);
  expect(result).toBe(260100);
});

test("calculateMaxHypotheek should calculate the maximum mortgage correctly with studieschuld in 5 termijnen", () => {
  const result = calculateMaxHypotheek(80000, true, 5);
  expect(result).toBe(262650);
});

test("calculateMaxHypotheek should calculate the maximum mortgage correctly with studieschuld in 10 termijnen", () => {
  const result = calculateMaxHypotheek(80000, true, 20);
  expect(result).toBe(266475);
});

test("calculateMaxHypotheek should calculate the maximum mortgage correctly with studieschuld in 20 termijnen", () => {
  const result = calculateMaxHypotheek(80000, true, 30);
  expect(result).toBe(267750);
});
