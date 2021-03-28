const instituteController = require('../controllers/institute.controller');
const cathedraController = require('../controllers/cathedra.controller');
const groupController = require('../controllers/group.controller');
const formatDataForKeyboard = require('../helpers/formatDataForKeyboard');
const sceduleController = require('../controllers/scedule.controller');
const {
  formatDaysForKeyboard,
  days,
} = require('../helpers/formatDaysForKeyboard');
const getTypeOfWeek = require('../helpers/getTypeOfWeek');
const formatSceduleForСouple = require('../helpers/formatSceduleForСouple');

const sceduleQuery = (bot) => async (query) => {
  const chatId = query.message.chat.id;
  console.log(chatId);
  const selectedItem = query.data;
  const possibleSceduleId = selectedItem.split(' ').pop();
  const possibleSceduleDay = selectedItem.split(' ')[0];
  if (await instituteController.getInstituteById(selectedItem)) {
    const cathedras = await cathedraController.getAllCathedras({
      institute: selectedItem,
    });
    cathedras.length
      ? bot.sendMessage(chatId, 'Вибери із списку свою кафедру', {
          reply_markup: {
            inline_keyboard: formatDataForKeyboard(cathedras),
          },
        })
      : bot.sendMessage(chatId, 'Для вибраного інституту поки немає кафедри');
  } else if (await cathedraController.getCathedraById(selectedItem)) {
    const groups = await groupController.getAllGroups({
      cathedra: selectedItem,
    });
    groups.length
      ? bot.sendMessage(chatId, 'Вибери із списку свою групу', {
          reply_markup: {
            inline_keyboard: formatDataForKeyboard(groups),
          },
        })
      : bot.sendMessage(chatId, 'Для вибраної кафедри поки немає групи');
  } else if (await groupController.getGroupById(selectedItem)) {
    const scedule = await sceduleController.getAllScedules({
      group: selectedItem,
    });

    await bot.sendMessage(chatId, 'Виберіть день тижня для групи', {
      reply_markup: { inline_keyboard: formatDaysForKeyboard(scedule[0]._id) },
    });
  } else if (
    (await sceduleController.getSceduleById(possibleSceduleId)) &&
    Object.keys(days).includes(possibleSceduleDay)
  ) {
    const scedule = await sceduleController.getSceduleById(possibleSceduleId);

    const sceduleMarkdown = `<b>Ваш розклад:</b>\n\n${scedule.week[
      possibleSceduleDay
    ][getTypeOfWeek]
      .map((couple) => formatSceduleForСouple(couple))
      .join('\n--------------\n')}`;
    sceduleMarkdown
      ? bot.sendMessage(chatId, sceduleMarkdown, { parse_mode: 'html' })
      : bot.sendMessage(chatId, 'Для вибраного дня розкладу немає');
  }
};

module.exports = {
  sceduleQuery,
};
