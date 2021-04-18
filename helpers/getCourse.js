const getCourse = (group) => {
  const groupName = group.split('-')[0];
  const groupNumber = group.split('-')[1];
  const upperCaseCount = groupName
    .split('')
    .filter((el) => el === el.toUpperCase());
  if (upperCaseCount.length === 2) {
    return Number(groupNumber.split('')[0]);
  } else if (upperCaseCount.length > 2) {
    return 4 + Number(groupNumber.split('')[0]);
  }
};

module.exports = {
  getCourse,
};
