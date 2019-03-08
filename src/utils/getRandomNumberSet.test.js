import { getRandomNumberSet } from './getRandomNumberSet';

describe('getRandomNumberSet', () => {
  test('should return a set with length of 3', () => {
    const sampleSetLength = 3;
    const sampleRangeLower = 1;
    const sampleRangeUpper = 10;

    expect(getRandomNumberSet(sampleSetLength, sampleRangeLower, sampleRangeUpper).length).toEqual(3);
  });

  test('should return a set with length of 3 with numbers within 1 and 10 inclusive', () => {
    const sampleSetLength = 3;
    const sampleRangeLower = 1;
    const sampleRangeUpper = 10;

    expect(getRandomNumberSet(sampleSetLength, sampleRangeLower, sampleRangeUpper).length).toEqual(3);

    expect(getRandomNumberSet(sampleSetLength, sampleRangeLower, sampleRangeUpper)[0]).toBeGreaterThanOrEqual(
      sampleRangeLower
    );
    expect(getRandomNumberSet(sampleSetLength, sampleRangeLower, sampleRangeUpper)[0]).toBeLessThanOrEqual(
      sampleRangeUpper
    );

    expect(getRandomNumberSet(sampleSetLength, sampleRangeLower, sampleRangeUpper)[1]).toBeLessThanOrEqual(
      sampleRangeUpper
    );
    expect(getRandomNumberSet(sampleSetLength, sampleRangeLower, sampleRangeUpper)[1]).toBeGreaterThanOrEqual(
      sampleRangeLower
    );

    expect(getRandomNumberSet(sampleSetLength, sampleRangeLower, sampleRangeUpper)[2]).toBeLessThanOrEqual(
      sampleRangeUpper
    );
    expect(getRandomNumberSet(sampleSetLength, sampleRangeLower, sampleRangeUpper)[2]).toBeGreaterThanOrEqual(
      sampleRangeLower
    );
  });
});
