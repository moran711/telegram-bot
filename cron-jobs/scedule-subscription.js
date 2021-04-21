const { schedule } = require('node-cron');
const cronDate = require('../helpers/cronDate');
const { timeOfCouples } = require('../helpers/getTimeFromCouple');
const userController = require('../controllers/user.controller');
const { types } = require('../consts/types.consts');
const sceduleController = require('../controllers/scedule.controller');
const getTypeOfWeek = require('../helpers/getTypeOfWeek');
const { days } = require('../helpers/formatDaysForKeyboard');
const getСoupleMarkdown = require('../helpers/getСoupleMarkdown');

const rememberAboutUserSubscription = (_, bot) => {
  try {
    Object.keys(timeOfCouples).map((coupleNum) => {
      const time = timeOfCouples[coupleNum];
      const startOfCouple = time.split('-')[0];
      const startOfCoupleInHours = startOfCouple.split(':')[0];
      const startOfCoupleInMinutes = startOfCouple.split(':')[1];
      console.log(`Scedule job for ${startOfCouple}`);
      schedule(
        cronDate.everyDayAt(startOfCoupleInHours, startOfCoupleInMinutes),
        async () => {
          console.log('Job started for couple ' + coupleNum);
          const currentDate = new Date();
          const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
            .format(currentDate)
            .toLowerCase();
          const avaiableDays = Object.keys(days);

          if (!avaiableDays.includes(weekday)) {
            return;
          }
          const users = await userController.getAllUsers({
            subscriptions: { $not: { $size: 0 } },
          });
          users.map((user) => {
            user.subscriptions
              .filter((subscription) => subscription.type === types.scedule)
              .map(async (subscription) => {
                const scedule = await sceduleController.getSceduleById(
                  subscription.id
                );
                const typeOfWeek = getTypeOfWeek();
                const subgroup = subscription.subgroup;
                const currentScedule = scedule.week[weekday][typeOfWeek];
                const generalCouple = currentScedule.general.find(
                  (couple) => couple.couple === coupleNum
                );
                const coupleForSubgroup = currentScedule[
                  `subgroup${subgroup}`
                ].find((couple) => couple.couple === coupleNum);
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
        }
      );
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  rememberAboutUserSubscription,
};
