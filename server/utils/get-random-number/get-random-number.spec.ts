import { functionImportTest } from '@infrastructure/jest';

import { getRandomNumber } from './get-random-number.function';

describe('getRandomNumber function', () => {
  functionImportTest(getRandomNumber);

  it('should return by default 0 or 1', () => {
    const expectedValues = [0, 1];
    const generatedValue = getRandomNumber();

    expect(expectedValues).toContain(generatedValue);
  });

  it('should return a number between 0 and 10', () => {
    const expectedValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const generatedValue = getRandomNumber(0, 10);

    expect(expectedValues).toContain(generatedValue);
  });

  it('should return a number between 10 and 20', () => {
    const expectedValues = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const generatedValue = getRandomNumber(10, 20);

    expect(expectedValues).toContain(generatedValue);
  });

  it('should return a number between 30 and 20', () => {
    const expectedValues = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    const generatedValue = getRandomNumber(30, 20);

    expect(expectedValues).toContain(generatedValue);
  });
});
