const axios = require('axios');
const cheerio = require('cheerio');
const groupController = require('../controllers/group.controller');
const instituteController = require('../controllers/institute.controller');

const parseGroups = async () => {
  const institutes = await instituteController.getAllInstitutes();

  await institutes.map(async (institute) => {
    const groups = await axios
      .get(
        encodeURI(
          `https://student.lpnu.ua/students_schedule?departmentparent_abbrname_selective=${institute.value}&studygroup_abbrname_selective=All&semestrduration=All`
        )
      )
      .then((res) => res.data)
      .then((html) => {
        const $ = cheerio.load(html);
        return $('#edit-studygroup-abbrname-selective option')
          .map(function (el) {
            return $(this).text();
          })
          .get()
          .filter((el) => el !== '- Усі -')
          .sort();
      });
    await groupController.addGroups(groups, institute._id);
  });
};

module.exports = parseGroups;
