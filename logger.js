const log4js = require('log4js');
log4js.configure({
  appenders: {
    cheeseLogs: { type: 'file', filename: 'cheese.log' },
    console: { type: 'console' },
  },
  categories: {
    default: { appenders: ['console', 'cheeseLogs'], level: 'trace' },
  },
});

const logger = log4js.getLogger();

module.exports = logger;
