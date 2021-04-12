const { sliceArray } = require('./sliceArray');

const formatDataForKeyboard = (data, type, size) => {
  return sliceArray(
    data?.map((el) => ({
      text: el.value,
      callback_data: JSON.stringify({ type, id: el._id }),
    })),
    size
  );
};

module.exports = formatDataForKeyboard;
