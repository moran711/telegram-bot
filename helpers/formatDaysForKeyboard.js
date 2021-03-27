const days = {
  mon: 'Понеділок',
  tue: 'Вівторок',
  wed: 'Середа',
  thu: 'Четвер',
  fri: 'Пятниця',
};

const formatDaysForKeyboard = (sceduleId) => {
  return Object.keys(days).map((day) => [
    {
      text: days[day],
      callback_data: `${day} ${sceduleId}`,
    },
  ]);
};

module.exports = { formatDaysForKeyboard, days };
