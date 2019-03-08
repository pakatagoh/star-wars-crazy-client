export const getRandomNumberSet = (setLength, rangeLower, rangeUpper) => {
  const result = [];
  while (result.length < setLength) {
    const r = Math.floor(Math.random() * rangeUpper) + rangeLower;
    if (result.indexOf(r) === -1) result.push(r);
  }
  return result;
};
