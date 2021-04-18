const groupController = require('../../../../controllers/group.controller');
const formatDataForKeyboard = require('../../../../helpers/formatDataForKeyboard');
const {
  formatBackButtonKeyboard,
} = require('../../../../helpers/formatBackButtonKeyboard');
const { types } = require('../../../../consts/types.consts');

const instituteStep = async (chatId, bot, messageToEdit, selectedItem) => {
  const groups = await groupController.getAllGroups({
    institute: selectedItem.id,
    course: selectedItem.value,
  });
  if (groups.length) {
    const keyboard = formatDataForKeyboard(groups, types.group, 4);
    keyboard.push(formatBackButtonKeyboard(types.course, selectedItem.id));
    bot.editMessageText('Вибери із списку свою групу', {
      chat_id: chatId,
      message_id: messageToEdit,
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
    return;
  }

  bot.editMessageText('Для вибраного курсу поки немає груп', {
    chat_id: chatId,
    message_id: messageToEdit,
  });
};

module.exports = {
  instituteStep,
};
