const { types } = require('../consts/types.consts');
const { sliceArray } = require('./sliceArray');

const days = {
  mon: 'Пн',
  tue: 'Вт',
  wed: 'Ср',
  thu: 'Чт',
  fri: 'Пт',
};

const formatDaysForKeyboard = (groupId, selectedDay, subgroup, size) => {
  return sliceArray(
    Object.keys(days).map((day) => ({
      text: selectedDay === day ? `▶️ ${days[day]}` : days[day],
      callback_data: JSON.stringify({
        type: types.subgroup,
        id: groupId,
        value: `${day} ${subgroup}`,
      }),
    })),
    size
  );
};

module.exports = { formatDaysForKeyboard, days };
