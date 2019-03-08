export const getRandomNumberFromRange = (rangeLower, rangeUpper) => {
  if (rangeLower === rangeUpper) return rangeLower;
  return Math.floor(Math.random() * rangeUpper) + rangeLower;
};
