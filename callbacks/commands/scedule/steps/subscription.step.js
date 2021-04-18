const userController = require('../../../../controllers/user.controller');

const subscriptionStep = async (chatId, bot, selectedItem, query) => {
  const subscription = { id: selectedItem.id, type: selectedItem.value };
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
