const { types } = require('../consts/types.consts');
const userController = require('../controllers/user.controller');

const formatSubscriptionKeyboard = async (type, subId, chatId) => {
  let keyboard;
  (await userController.checkIfUserHaveSubs(chatId, subId))
    ? null
    : (keyboard = [
        {
          text: 'Підписатись на push-сповіщення',
          callback_data: JSON.stringify({
            type: types.subscription,
            value: type,
            id: subId,
          }),
        },
      ]);
  return keyboard.length ? keyboard : null;
};

module.exports = {
  formatSubscriptionKeyboard,
};
