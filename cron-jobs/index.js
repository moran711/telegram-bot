const { rememberAboutHealsCheck } = require('./health-check');

const cronJobs = [rememberAboutHealsCheck];
module.exports = {
  cronJobs,
};
