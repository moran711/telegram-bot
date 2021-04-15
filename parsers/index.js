const parseGroups = require('./group.parser');
const parseInstitutes = require('./institute.parser');
const parseScedule = require('./scedule.parser');

const getSceduleData = async () => {
  await parseInstitutes();
  setTimeout(async () => {
    await parseGroups();
  }, 5000);

  setTimeout(async () => {
    await parseScedule();
  }, 100000);
};

module.exports = getSceduleData;
