const instituteController = require('../../../../controllers/institute.controller');
const userController = require('../../../../controllers/user.controller');
const formatDataForKeyboard = require('../../../../helpers/formatDataForKeyboard');
const { types } = require('../../../../consts/types.consts');
const {
  getUserDataFromMessage,
} = require('../../../../helpers/getUserDataFromMessage');
const initialStep = async (chatId, msg, bot, messageToEdit = null) => {
  const institutes = await instituteController.getAllInstitutes();
  const keyboard = formatDataForKeyboard(institutes, types.course, 3);

  if (!messageToEdit) {
    institutes.length
      ? await bot.sendMessage(chatId, 'Вибери із списку свій інститут', {
          reply_markup: {
            inline_keyboard: keyboard,
          },
        })
      : await bot.sendMessage(chatId, 'Інститутів поки немає');
    if (!(await userController.isUserExist(chatId))) {
      const user = getUserDataFromMessage(msg);
      await userController.addUser(user);
    }
    return;
  }

  institutes.length
    ? await bot.editMessageText('Вибери із списку свій інститут', {
        chat_id: chatId,
        message_id: messageToEdit,
        reply_markup: {
          inline_keyboard: keyboard,
        },
      })
    : await bot.editMessageText('Інститутів поки немає', {
        chat_id: chatId,
        message_id: messageToEdit,
      });
};

module.exports = {
  initialStep,
};
