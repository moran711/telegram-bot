const groupController = require('../controllers/group.controller');
const formatDataForKeyboard = require('../helpers/formatDataForKeyboard');
const sceduleController = require('../controllers/scedule.controller');
const { formatDaysForKeyboard } = require('../helpers/formatDaysForKeyboard');
const { types } = require('../consts/types.consts');
const { getSceduleMarkdown } = require('../helpers/getSceduleMarkdown');
const {
  formatSubgroupForKeyboard,
} = require('../helpers/formatSubgroupForKeyboard');
const {
  formatSubscriptionKeyboard,
} = require('../helpers/formatSubscriptionKeyboard');
const userController = require('../controllers/user.controller');
const parseScedule = require('../parsers/scedule.parser');

const sceduleQuery = (bot) => async (query) => {
  const chatId = query.message.chat.id;
  const messageToEdit = query.message.message_id;
  const selectedItem = JSON.parse(query.data);
  if (selectedItem.type === types.institute) {
    const groups = await groupController.getAllGroups({
      institute: selectedItem.id,
    });
    groups.length
      ? bot.editMessageText('Вибери із списку свою групу', {
          chat_id: chatId,
          message_id: messageToEdit,
          reply_markup: {
            inline_keyboard: formatDataForKeyboard(groups, types.group, 4),
          },
        })
      : bot.editMessageText('Для вибраної кафедри поки немає групи', {
          chat_id: chatId,
          message_id: messageToEdit,
        });
  } else if (selectedItem.type === types.group) {
    let scedule = await sceduleController.getAllScedules({
      group: selectedItem.id,
    });
    if (!scedule.length) {
      const sceduleToAdd = await parseScedule(selectedItem.id);
      scedule = await sceduleController.addScedule({
        week: sceduleToAdd,
        group: selectedItem.id,
      });
    }
    await bot.editMessageText('Виберіть підгрупу', {
      chat_id: chatId,
      message_id: messageToEdit,
      reply_markup: {
        inline_keyboard: formatSubgroupForKeyboard(selectedItem),
      },
    });
  } else if (selectedItem.type === types.subgroup) {
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
    const keyboardData = formatDaysForKeyboard(
      selectedItem.id,
      day,
      subgroup,
      5
    );

    scedule
      ? await bot.editMessageText(sceduleMarkdown, {
          chat_id: chatId,
          message_id: messageToEdit,
          parse_mode: 'html',
          reply_markup: {
            inline_keyboard: subscription
              ? keyboardData
              : keyboardData.push(subscription),
          },
        })
      : bot.editMessageText('Для вибраної підгрупи поки немає розкладу', {
          chat_id: chatId,
          message_id: messageToEdit,
        });
  } else if (selectedItem.type === types.subscription) {
    const subscription = { id: selectedItem.id, type: selectedItem.value };
    if (await userController.checkIfUserHaveSubs(chatId, subscription.id)) {
      bot.sendMessage(chatId, 'Ви уже підписані)');
      return;
    }

    await userController.addSubscriptionForUser(query.message, subscription);
    bot.sendMessage(chatId, 'Ви успішно підписались на push-сповіщення');
  }
};

module.exports = {
  sceduleQuery,
};
