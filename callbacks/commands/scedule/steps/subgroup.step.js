const sceduleController = require('../../../../controllers/scedule.controller');
const { types } = require('../../../../consts/types.consts');
const {
  getSceduleMarkdown,
} = require('../../../../helpers/getSceduleMarkdown');
const {
  formatDaysForKeyboard,
} = require('../../../../helpers/formatDaysForKeyboard');
const {
  formatSubscriptionKeyboard,
} = require('../../../../helpers/formatSubscriptionKeyboard');
const {
  formatBackButtonKeyboard,
} = require('../../../../helpers/formatBackButtonKeyboard');
const groupController = require('../../../../controllers/group.controller');

const subgroupStep = async (chatId, bot, messageToEdit, selectedItem) => {
  const scedule = (
    await sceduleController.getAllScedules({
      group: selectedItem.id,
    })
  )[0];

  const isDefault = !!Number(selectedItem.value);
  const day = isDefault ? 'mon' : selectedItem.value.split(' ')[0];
  const subgroup = isDefault
    ? selectedItem.value
    : selectedItem.value.split(' ')[1];
  const sceduleMarkdown = getSceduleMarkdown(scedule, day, subgroup);

  const subscription = await formatSubscriptionKeyboard(
    types.scedule,
    selectedItem.id,
    chatId
  );
  const keyboardData = formatDaysForKeyboard(selectedItem.id, day, subgroup, 5);
  subscription ? keyboardData.push(subscription) : keyboardData;
  keyboardData.push(formatBackButtonKeyboard(types.group, selectedItem.id));

  scedule
    ? await bot.editMessageText(sceduleMarkdown, {
        chat_id: chatId,
        message_id: messageToEdit,
        parse_mode: 'html',
        reply_markup: {
          inline_keyboard: keyboardData,
        },
      })
    : bot.editMessageText('Для вибраної підгрупи поки немає розкладу', {
        chat_id: chatId,
        message_id: messageToEdit,
      });
};

module.exports = {
  subgroupStep,
};
