export const getRandomNumberFromRange = (rangeLower, rangeUpper) => {
  return Math.floor(Math.random() * rangeUpper) + rangeLower;
};
