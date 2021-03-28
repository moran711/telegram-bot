const { types } = require("../consts/types.consts");

const days = {
  mon: 'Понеділок',
  tue: 'Вівторок',
  wed: 'Середа',
  thu: 'Четвер',
  fri: 'Пятниця',
};

const formatDaysForKeyboard = (sceduleId, subgroup) => {
  return Object.keys(days).map((day) => [
    {
      text: days[day],
      callback_data: JSON.stringify({type: types.daysForScedule, id:  sceduleId, value: `${day} ${subgroup}`}),
    },
  ]);
};

module.exports = { formatDaysForKeyboard, days };
