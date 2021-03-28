const getTimeFromCouple = require('./getTimeFromCouple');

const formatSceduleForСouple = (scedule) => {
  return `Пара: <i>${scedule.couple}</i>\nВикладач: <i>${
    scedule.teacher
  }</i>\nПредмет: <i>${scedule.subject}</i>\nЧас: <i>${getTimeFromCouple(
    scedule.couple
  )}</i>\n\n<a href="${scedule.uri}">посилання</a>`;
};

module.exports = formatSceduleForСouple;
