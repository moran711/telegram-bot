const { initialStep } = require('./steps/initial.step');

const getSceduleCommandCallback = (bot) => async (msg) => {
  const chatId = msg.chat.id;
  await initialStep(chatId, msg, bot);
};

module.exports = {
  getSceduleCommandCallback,
};
