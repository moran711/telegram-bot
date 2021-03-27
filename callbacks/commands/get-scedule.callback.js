const instituteController = require('../../controllers/institute.controller');
const formatDataForKeyboard = require('../../helpers/formatDataForKeyboard');

const getSceduleCallback = (bot) => (async (msg) => {
  const chatId = msg.chat.id;
  const institutes = await instituteController.getAllInstitutes();
  institutes.length
    ? bot.sendMessage(chatId, "Вибери із списку свій інститут", {
        reply_markup: {
          inline_keyboard: formatDataForKeyboard(institutes),
        },
      })
    : bot.sendMessage(chatId, "Інститутів поки немає");
})

module.exports = {
  getSceduleCallback
}