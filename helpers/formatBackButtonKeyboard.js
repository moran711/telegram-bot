const formatBackButtonKeyboard = (type, id = null, value) => [
  {
    text: '◀️Назад',
    callback_data: JSON.stringify({
      type,
      id,
      value,
    }),
  },
];

module.exports = {
  formatBackButtonKeyboard,
};
