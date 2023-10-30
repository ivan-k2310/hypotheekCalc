const { MaxHypotheek } = require("../../app");

let originalConsoleLog;

beforeAll(() => {
  originalConsoleLog = console.log;
  console.log = jest.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
});

test("MaxHypotheek should calculate and log the maximum mortgage correctly", () => {
  const result = MaxHypotheek(50000, 30000, false, 10);
  expect(result).toBe(351900);
  expect(console.log).toHaveBeenCalledWith("Je maximale hypotheek is 351900");
});
test("MaxHypotheek should calculate and log the maximum mortgage correctly (Case 1)", () => {
  const result = MaxHypotheek(60000, 40000, false, 20);
  expect(result).toBe(444125);
  expect(console.log).toHaveBeenCalledWith("Je maximale hypotheek is 444125");
});

test("MaxHypotheek should calculate and log the maximum mortgage correctly (Case 2)", () => {
  const result = MaxHypotheek(70000, 50000, true, 30);
  expect(result).toBe(401625);
  expect(console.log).toHaveBeenCalledWith("Je maximale hypotheek is 401625");
});
