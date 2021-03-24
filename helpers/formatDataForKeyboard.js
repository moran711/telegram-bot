const formatDataForKeyboard = (data) => {
  return data?.map((el) => [
    {
      text: el.value,
      callback_data: el._id,
    },
  ]);
};

module.exports = formatDataForKeyboard;
