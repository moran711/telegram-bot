const axios = require('axios');
const cheerio = require('cheerio');
const groupController = require('../controllers/group.controller');
const logger = require('../logger');
const { parseCouple } = require('./couple.parser');

const daysUaToUs = {
  Пн: 'mon',
  Вт: 'tue',
  Ср: 'wed',
  Чт: 'thu',
  Пт: 'fri',
};

const parseScedule = async (groupId) => {
  const group = await groupController.getGroupById(groupId, true);
  const scedule = await axios
    .get(
      encodeURI(
        `https://student.lpnu.ua/students_schedule?departmentparent_abbrname_selective=${group.institute.value}&studygroup_abbrname_selective=${group.value}&semestrduration=1`
      )
    )
    .then((res) => res.data)
    .then((html) => {
      const $ = cheerio.load(html);
      const result = {};
      $('.view-content .view-grouping')
        .map(function (el) {
          const day = $(this).children('.view-grouping-header').text();
          result[daysUaToUs[day]] = {
            denominator: {
              subgroup1: [],
              subgroup2: [],
              general: [],
            },
            numerator: {
              subgroup1: [],
              subgroup2: [],
              general: [],
            },
          };
          const couples = $(this)
            .children('.view-grouping-content')
            .children('h3')
            .map(function (el) {
              return $(this).text();
            })
            .get();
          $(this)
            .children('.view-grouping-content')
            .children('.stud_schedule')
            .map(function (index) {
              const denom = $(this).children('#group_znam');
              const numer = $(this).children('#group_chys');
              const generalDenNum = $(this).children('#group_full');
              const subgroup1 = $(this).children('#sub_1_full');
              const subgroup2 = $(this).children('#sub_1_full');
              const subgroup2Denom = $(this).children('#sub_2_znam');
              const subgroup1Denom = $(this).children('#sub_1_znam');
              const subgroup1Num = $(this).children('#sub_1_chys');
              const subgroup2Num = $(this).children('#sub_2_chys');
              denom.length
                ? result[daysUaToUs[day]].denominator.general.push(
                    parseCouple($, denom, couples[index])
                  )
                : null;
              numer.length
                ? result[daysUaToUs[day]].numerator.general.push(
                    parseCouple($, numer, couples[index])
                  )
                : null;
              generalDenNum.length
                ? result[daysUaToUs[day]].numerator.general.push(
                    parseCouple($, generalDenNum, couples[index])
                  ) &&
                  result[daysUaToUs[day]].denominator.general.push(
                    parseCouple($, generalDenNum, couples[index])
                  )
                : null;
              subgroup1.length
                ? result[daysUaToUs[day]].numerator.subgroup1.push(
                    parseCouple($, subgroup1, couples[index])
                  ) &&
                  result[daysUaToUs[day]].denominator.subgroup1.push(
                    parseCouple($, subgroup1, couples[index])
                  )
                : null;
              subgroup2.length
                ? result[daysUaToUs[day]].numerator.subgroup2.push(
                    parseCouple($, subgroup2, couples[index])
                  ) &&
                  result[daysUaToUs[day]].denominator.subgroup2.push(
                    parseCouple($, subgroup2, couples[index])
                  )
                : null;
              subgroup1Denom.length
                ? result[daysUaToUs[day]].denominator.subgroup1.push(
                    parseCouple($, subgroup1Denom, couples[index])
                  )
                : null;
              subgroup2Denom.length
                ? result[daysUaToUs[day]].denominator.subgroup2.push(
                    parseCouple($, subgroup2Denom, couples[index])
                  )
                : null;
              subgroup1Num.length
                ? result[daysUaToUs[day]].numerator.subgroup1.push(
                    parseCouple($, subgroup1Num, couples[index])
                  )
                : null;
              subgroup2Num.length
                ? result[daysUaToUs[day]].numerator.subgroup2.push(
                    parseCouple($, subgroup2Num, couples[index])
                  )
                : null;
            });
        })
        .get();

      return result;
    })
    .catch((e) => logger.error(e));
  return scedule;
};

module.exports = parseScedule;
