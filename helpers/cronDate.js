const logger = require('../logger');

class CronDate {
  everyNMinutes(n) {
    return `*/${n} * * * *`;
  }
  everyDayAt(hour, minute) {
    logger.info(`created date for ${hour}:${minute}`);
    return `${minute} ${hour} * * *`;
  }
}

module.exports = new CronDate();
