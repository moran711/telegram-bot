const axios = require('axios');
const { schedule } = require('node-cron');

const rememberAboutHealsCheck = (requestUri) => {
  schedule('*/1 * * * *', async () => {
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
