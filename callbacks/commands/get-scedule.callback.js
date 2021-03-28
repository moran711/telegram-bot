const { types } = require('../../consts/types.consts');
const instituteController = require('../../controllers/institute.controller');
const userController = require('../../controllers/user.controller');
const formatDataForKeyboard = require('../../helpers/formatDataForKeyboard');
const {
  getUserDataFromMessage,
} = require('../../helpers/getUserDataFromMessage');

const getSceduleCommandCallback = (bot) => async (msg) => {
  const chatId = msg.chat.id;
  if (!(await userController.isUserExist(chatId))) {
    const user = getUserDataFromMessage(msg);
    await userController.addUser(user);
  }
  const institutes = await instituteController.getAllInstitutes();
  institutes.length
    ? bot.sendMessage(chatId, 'Вибери із списку свій інститут', {
        reply_markup: {
          inline_keyboard: formatDataForKeyboard(institutes, types.institute),
        },
      })
    : bot.sendMessage(chatId, 'Інститутів поки немає');
};

module.exports = {
  getSceduleCommandCallback,
};
