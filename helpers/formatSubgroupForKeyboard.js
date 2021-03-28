const { types } = require('../consts/types.consts');

const subgroups = {
  1: 'subgroup1',
  2: 'subgroup2',
};

const formatSubgroupForKeyboard = (selectedItem) => {
  return Object.keys(subgroups).map((subgroup) => [
    {
      text: `Підгрупа ${subgroup}`,
      callback_data: JSON.stringify({
        type: types.subgroup,
        value: subgroup,
        id: selectedItem.id,
      }),
    },
  ]);
};

module.exports = {
  formatSubgroupForKeyboard,
  subgroups,
};
