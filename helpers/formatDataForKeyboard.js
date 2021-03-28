const formatDataForKeyboard = (data, type) => {
  return data?.map((el) => [
    {
      text: el.value,
      callback_data: JSON.stringify({ type, id: el._id }),
    },
  ]);
};

module.exports = formatDataForKeyboard;
