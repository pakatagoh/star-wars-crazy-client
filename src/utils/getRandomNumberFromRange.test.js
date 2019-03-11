import { isNumber } from 'lodash';
import { getRandomNumberFromRange } from './getRandomNumberFromRange';

describe('getRandomNumberFromRange function', () => {
  test('should return a number', () => {
    const sampleRangLower = 1;
    const sampleRangeUpper = 10;

    const actual = getRandomNumberFromRange(sampleRangLower, sampleRangeUpper);
    expect(isNumber(actual)).toEqual(true);
  });

  test('should return 3 if upper and lower range numbers are 3', () => {
    const sampleRangLower = 3;
    const sampleRangeUpper = 3;

    const actual = getRandomNumberFromRange(sampleRangLower, sampleRangeUpper);
    expect(actual).toEqual(3);
  });

  test('should return 1 or 2 if upper and lower range numbers are 2 and 1 respectively', () => {
    const sampleRangLower = 1;
    const sampleRangeUpper = 2;

    const actual = getRandomNumberFromRange(sampleRangLower, sampleRangeUpper);
    expect(actual).toBeGreaterThanOrEqual(sampleRangLower);

    expect(actual).toBeLessThanOrEqual(sampleRangeUpper);
  });

  test('should return 0 or 1 if upper and lower range numbers are 1 and 0 respectively', () => {
    const sampleRangLower = 0;
    const sampleRangeUpper = 1;

    const actual = getRandomNumberFromRange(sampleRangLower, sampleRangeUpper);
    expect(actual).toBeGreaterThanOrEqual(sampleRangLower);

    expect(actual).toBeLessThanOrEqual(sampleRangeUpper);
  });

  test('should return 0,1 or 2 if upper and lower range numbers are 2 and 0 respectively', () => {
    const sampleRangLower = 0;
    const sampleRangeUpper = 2;

    const actual = getRandomNumberFromRange(sampleRangLower, sampleRangeUpper);
    expect(actual).toBeGreaterThanOrEqual(sampleRangLower);

    expect(actual).toBeLessThanOrEqual(sampleRangeUpper);
  });
});
