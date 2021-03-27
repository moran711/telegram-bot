const getTypeOfWeek = () => {
  const currentDate = Date.now();
  const dateOfDenom = 1615154400000;
  return Math.floor(
    parseInt((currentDate - dateOfDenom) / (24 * 3600 * 1000 * 7))
  ) % 2
    ? 'numerator'
    : 'denominator';
};

module.exports = getTypeOfWeek();
