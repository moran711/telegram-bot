const parseGroups = require('./group.parser');
const parseInstitutes = require('./institute.parser');

const getSceduleData = async () => {
  await parseInstitutes();
  setTimeout(async () => {
    await parseGroups();
  }, 5000);
};

module.exports = getSceduleData;
