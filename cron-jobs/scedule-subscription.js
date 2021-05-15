const { schedule } = require('node-cron');
const cronDate = require('../helpers/cronDate');
const userController = require('../controllers/user.controller');
const { days } = require('../helpers/formatDaysForKeyboard');
const { sendSceduleForUsers } = require('../helpers/sendSceduleForUsers');
const logger = require('../logger');

const sceduleCallback = (bot) => async () => {
  logger.info('Job started for couple ');
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
  sendSceduleForUsers(users, weekday, bot);
};

const rememberAboutUserSubscription = (_, bot) => {
  try {
    schedule(cronDate.everyDayAt(8, 25), sceduleCallback(bot));
    schedule(cronDate.everyDayAt(8, 30), sceduleCallback(bot));
    schedule(cronDate.everyDayAt(10, 15), sceduleCallback(bot));
    schedule(cronDate.everyDayAt(10, 20), sceduleCallback(bot));
    schedule(cronDate.everyDayAt(12, 05), sceduleCallback(bot));
    schedule(cronDate.everyDayAt(12, 10), sceduleCallback(bot));
    schedule(cronDate.everyDayAt(14, 10), sceduleCallback(bot));
    schedule(cronDate.everyDayAt(14, 15), sceduleCallback(bot));
    schedule(cronDate.everyDayAt(15, 55), sceduleCallback(bot));
    schedule(cronDate.everyDayAt(16, 00), sceduleCallback(bot));
    schedule(cronDate.everyDayAt(17, 40), sceduleCallback(bot));
    schedule(cronDate.everyDayAt(17, 45), sceduleCallback(bot));
  } catch (e) {
    logger.error(e);
  }
};

module.exports = {
  rememberAboutUserSubscription,
};
