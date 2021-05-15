const { types } = require('../consts/types.consts');
const sceduleController = require('../controllers/scedule.controller');
const getTypeOfWeek = require('../helpers/getTypeOfWeek');
const getСoupleMarkdown = require('../helpers/getСoupleMarkdown');

const sendSceduleForUsers = (users, weekday, bot) => {
  users.map((user) => {
    user.subscriptions
      .filter((subscription) => subscription.type === types.scedule)
      .map(async (subscription) => {
        const scedule = await sceduleController.getSceduleById(subscription.id);
        const typeOfWeek = getTypeOfWeek();
        const subgroup = subscription.subgroup;
        const currentScedule = scedule.week[weekday][typeOfWeek];
        const generalCouple = currentScedule.general.find(
          (couple) => couple.couple === coupleNum
        );
        const coupleForSubgroup = currentScedule[`subgroup${subgroup}`].find(
          (couple) => couple.couple === coupleNum
        );
        if (generalCouple) {
          bot.sendMessage(
            user.chatId,
            `Ваша пара:\n${getСoupleMarkdown(generalCouple)}`,
            {
              parse_mode: 'html',
            }
          );
          return;
        } else if (coupleForSubgroup) {
          bot.sendMessage(
            user.chatId,
            `Ваша пара:\n${getСoupleMarkdown(coupleForSubgroup)}`,
            {
              parse_mode: 'html',
            }
          );
          return;
        }
        return;
      });
  });
};

module.exports = {
  sendSceduleForUsers,
};
