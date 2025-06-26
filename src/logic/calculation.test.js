import Calculation from "./calculation";

test('single operator - should not be equal to 4359.0908 and should\'nt return', async () => {
  let calculation = new Calculation('42342.54-543.7896');

  expect(calculation.calculate()).not.toEqual(4359.0908);
  expect(calculation.calculate()).not.toBe(false);
})

test('single operator - should return 10.51', function() {
  let calculation = new Calculation('4.01+6.50');

  expect(calculation.calculate()).toEqual(10.51);
});

test('single operator - should return 149991', function () {
  let calculation = new Calculation('150000.5-9.5');

  expect(calculation.calculate()).toEqual(149991);
});

// This test case uses an invalid expected value. The actual result of 47.5 * 23.1 is 1,097.25.
// You can verify this using a calculator — the test should expect the correct result.
test('single operator - should return 3407.25', function () {
  let calculation = new Calculation('47.5*23.1');

  expect(calculation.calculate()).toEqual(1097.25);
});

test('single operator - should return 2157.1', function () {
  let calculation = new Calculation('4314.2/2');

  expect(calculation.calculate()).toEqual(2157.1);
});

test('multiple operators - should return 12521', function () {
  let calculation = new Calculation('150000/12-3+6*4');

  expect(calculation.calculate()).toEqual(12521);
});

test('multiple operators - should return 2907.25', function () {
  let calculation = new Calculation('147.5*23.1-500');

  expect(calculation.calculate()).toEqual(2907.25);
});

test('multiple operators - should return 2158.1', function () {
  let calculation = new Calculation('1+4314.2/2');

  expect(calculation.calculate()).toEqual(2158.1);
});

test('mixed operators with brackets - should return -11', function () {
  let calculation = new Calculation('2+2+2-10/2-(6+6)');

  expect(calculation.calculate()).toEqual(-11);
});

test('mixed operators with brackets - should return return -24', function () {
  let calculation = new Calculation('2 + 2 + 2 - 10 / 2 - (6 + 6) - (9 * 2) + 5');

  expect(calculation.calculate()).toEqual(-24);
});

test('mixed operators with brackets - should return 14', function () {
  let calculation = new Calculation('10 / 2 + 3 * (4 - 1)');

  expect(calculation.calculate()).toEqual(14);
});
