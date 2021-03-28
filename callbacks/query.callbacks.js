const cathedraController = require('../controllers/cathedra.controller');
const groupController = require('../controllers/group.controller');
const formatDataForKeyboard = require('../helpers/formatDataForKeyboard');
const sceduleController = require('../controllers/scedule.controller');
const { formatDaysForKeyboard } = require('../helpers/formatDaysForKeyboard');
const { types } = require('../consts/types.consts');
const { getSceduleMarkdown } = require('../helpers/getSceduleMarkdown');
const {
  formatSubgroupForKeyboard,
} = require('../helpers/formatSubgroupForKeyboard');

const sceduleQuery = (bot) => async (query) => {
  const chatId = query.message.chat.id;
  console.log(chatId);
  const selectedItem = JSON.parse(query.data);
  if (selectedItem.type === types.institute) {
    const cathedras = await cathedraController.getAllCathedras({
      institute: selectedItem.id,
    });
    cathedras.length
      ? bot.sendMessage(chatId, 'Вибери із списку свою кафедру', {
          reply_markup: {
            inline_keyboard: formatDataForKeyboard(cathedras, types.cathedra),
          },
        })
      : bot.sendMessage(chatId, 'Для вибраного інституту поки немає кафедри');
  } else if (selectedItem.type === types.cathedra) {
    const groups = await groupController.getAllGroups({
      cathedra: selectedItem.id,
    });
    groups.length
      ? bot.sendMessage(chatId, 'Вибери із списку свою групу', {
          reply_markup: {
            inline_keyboard: formatDataForKeyboard(groups, types.group),
          },
        })
      : bot.sendMessage(chatId, 'Для вибраної кафедри поки немає групи');
  } else if (selectedItem.type === types.group) {
    await bot.sendMessage(chatId, 'Виберіть підгрупу', {
      reply_markup: {
        inline_keyboard: formatSubgroupForKeyboard(selectedItem),
      },
    });
  } else if (selectedItem.type === types.subgroup) {
    const scedule = await sceduleController.getAllScedules({
      group: selectedItem.id,
    });

    scedule.length
      ? await bot.sendMessage(chatId, 'Виберіть день тижня для групи', {
          reply_markup: {
            inline_keyboard: formatDaysForKeyboard(
              scedule[0]._id,
              selectedItem.value
            ),
          },
        })
      : bot.sendMessage(chatId, 'Для вибраної підгрупи поки немає розкладу');
  } else if (selectedItem.type === types.daysForScedule) {
    const scedule = await sceduleController.getSceduleById(selectedItem.id);
    const day = selectedItem.value.split(' ')[0];
    const subgroup = selectedItem.value.split(' ')[1];
    const sceduleMarkdown = getSceduleMarkdown(
      scedule,
      day,
      subgroup
    );
    bot.sendMessage(chatId, sceduleMarkdown, { parse_mode: 'html' });
  }
};

module.exports = {
  sceduleQuery,
};
