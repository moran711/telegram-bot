const {
  formatBackButtonKeyboard,
} = require('../../../../helpers/formatBackButtonKeyboard');
const {
  formatCourseKeyboard,
} = require('../../../../helpers/formatCourseKeyboard');
const { types } = require('../../../../consts/types.consts');

const courseStep = async (chatId, bot, messageToEdit, selectedItem) => {
  const keyboard = formatCourseKeyboard(selectedItem.id);
  keyboard.push(formatBackButtonKeyboard(types.initial));
  await bot.editMessageText('Виберіть курс', {
    chat_id: chatId,
    message_id: messageToEdit,
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
};

module.exports = {
  courseStep,
};
