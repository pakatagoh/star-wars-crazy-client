export const getRandomNumberFromRange = (rangeLower, rangeUpper) => {
  if (rangeLower === rangeUpper) return rangeLower;
  if (rangeUpper - rangeLower === 1) {
    const temp = [rangeLower, rangeUpper];
    return temp[Math.round(Math.random())];
  }
  return Math.floor(Math.random() * rangeUpper) + rangeLower;
};
