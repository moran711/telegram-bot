const formatSceduleForСouple = require('./formatSceduleForСouple');
const { subgroups } = require('./formatSubgroupForKeyboard');
const getTypeOfWeek = require('./getTypeOfWeek');

const getSceduleMarkdown = (scedule, day, subgroup) => {
  const allSceduleForDay = scedule.week[day][getTypeOfWeek()];
  const sceduleForSubgroup = [
    ...allSceduleForDay.general,
    ...allSceduleForDay[subgroups[subgroup]],
  ].sort((a, b) => a.couple - b.couple);
  return sceduleForSubgroup.length
    ? `<b>Ваш розклад:</b>\n\n${sceduleForSubgroup
        .map((couple) => formatSceduleForСouple(couple))
        .join('\n--------------\n')}`
    : 'Для вибраного дня розкладу немає';
};

module.exports = {
  getSceduleMarkdown,
};
