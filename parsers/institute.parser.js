const axios = require('axios');
const cheerio = require('cheerio');
const instituteController = require('../controllers/institute.controller');

const parseInstitutes = async () => {
  const institutes = await axios
    .get('https://student.lpnu.ua/students_schedule')
    .then((res) => res.data)
    .then((html) => {
      const $ = cheerio.load(html);
      return $('#edit-departmentparent-abbrname-selective option')
        .map(function (el) {
          return $(this).text();
        })
        .get()
        .filter((el) => el !== '- Усі -');
    });
  await instituteController.addInstitutes(institutes);
};

module.exports = parseInstitutes;
