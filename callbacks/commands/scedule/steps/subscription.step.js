const { types } = require('../../../../consts/types.consts');
const userController = require('../../../../controllers/user.controller');

const subscriptionStep = async (chatId, bot, selectedItem, query) => {
  const subscription = { id: selectedItem.id };
  if (selectedItem.value.split(' ')[0] === types.scedule) {
    subscription.type = selectedItem.value.split(' ')[0];
    subscription.subgroup = selectedItem.value.split(' ')[1];
  }
  if (await userController.checkIfUserHaveSubs(chatId, subscription.id)) {
    bot.sendMessage(chatId, 'Ви уже підписані)');
    return;
  }

  await userController.addSubscriptionForUser(
    query.message,
    subscription,
    query
  );
  bot.sendMessage(chatId, 'Ви успішно підписались на push-сповіщення');
  return;
};

module.exports = {
  subscriptionStep,
};
