const axios = require('axios');
const { schedule } = require('node-cron');
const cronDate = require('../helpers/cronDate');

const rememberAboutHealsCheck = (requestUri) => {
  schedule(cronDate.everyNMinutes(30), async () => {
    console.log('heals check started');
    try {
      await axios.post(requestUri + '/heals-check', {});
    } catch (e) {
      console.error(e);
    }
  });
};

module.exports = {
  rememberAboutHealsCheck,
};
