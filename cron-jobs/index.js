const { rememberAboutHealsCheck } = require('./health-check');
const { rememberAboutUserSubscription } = require('./scedule-subscription');

const cronJobs = [rememberAboutHealsCheck, rememberAboutUserSubscription];

module.exports = {
  cronJobs,
};
