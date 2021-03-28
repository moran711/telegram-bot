const { commands } = require('../../consts/commands.consts');
const userController = require('../../controllers/user.controller');
const {
  getUserDataFromMessage,
} = require('../../helpers/getUserDataFromMessage');

const startCommandCallback = (bot) => async (message) => {
  const chatId = message.chat.id;
  if (await userController.isUserExist(chatId)) {
    bot.sendMessage(chatId, 'Ви уже ввели цю команду.');
    return;
  }
  const user = getUserDataFromMessage(message);
  await userController.addUser(user);
  bot.sendMessage(
    chatId,
    `Привіт! Введи одну із команд для отримання інформації:\n${Object.values(
      commands
    )
      .filter((el) => el !== commands.start)
      .map((el) => '/' + el)
      .join('\n')}`
  );
};

module.exports = {
  startCommandCallback,
};
