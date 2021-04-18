const sceduleController = require('../../../../controllers/scedule.controller');
const {
  formatSubgroupForKeyboard,
} = require('../../../../helpers/formatSubgroupForKeyboard');
const {
  formatBackButtonKeyboard,
} = require('../../../../helpers/formatBackButtonKeyboard');
const parseScedule = require('../../../../parsers/scedule.parser');
const { types } = require('../../../../consts/types.consts');
const groupController = require('../../../../controllers/group.controller');

const groupStep = async (chatId, bot, messageToEdit, selectedItem) => {
  let scedule = await sceduleController.getAllScedules({
    group: selectedItem.id,
  });
  const group = await groupController.getGroupById(selectedItem.id);
  if (!scedule.length) {
    const sceduleToAdd = await parseScedule(selectedItem.id);
    scedule = await sceduleController.addScedule({
      week: sceduleToAdd,
      group: selectedItem.id,
    });
  }
  const keyboard = formatSubgroupForKeyboard(selectedItem);
  keyboard.push(
    formatBackButtonKeyboard(types.institute, group.institute, group.course)
  );
  await bot.editMessageText('Виберіть підгрупу', {
    chat_id: chatId,
    message_id: messageToEdit,
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
};

module.exports = {
  groupStep,
};
