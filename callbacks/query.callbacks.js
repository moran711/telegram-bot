const { types } = require('../consts/types.consts');
const { initialStep } = require('./commands/scedule/steps/initial.step');
const {
  subscriptionStep,
} = require('./commands/scedule/steps/subscription.step');
const { subgroupStep } = require('./commands/scedule/steps/subgroup.step');
const { groupStep } = require('./commands/scedule/steps/group.step');
const { instituteStep } = require('./commands/scedule/steps/institute.step');
const { courseStep } = require('./commands/scedule/steps/course.step');

const sceduleQuery = (bot) => async (query) => {
  const chatId = query.message.chat.id;
  const messageToEdit = query.message.message_id;
  const selectedItem = JSON.parse(query.data);
  if (selectedItem.type === types.initial) {
    initialStep(chatId, null, bot, messageToEdit);
    return;
  } else if (selectedItem.type === types.institute) {
    instituteStep(chatId, bot, messageToEdit, selectedItem);
    return;
  } else if (selectedItem.type === types.course) {
    courseStep(chatId, bot, messageToEdit, selectedItem);
    return;
  } else if (selectedItem.type === types.group) {
    groupStep(chatId, bot, messageToEdit, selectedItem);
    return;
  } else if (selectedItem.type === types.subgroup) {
    subgroupStep(chatId, bot, messageToEdit, selectedItem);
    return;
  } else if (selectedItem.type === types.subscription) {
    subscriptionStep(chatId, bot, selectedItem, query);
    return;
  }
  return;
};

module.exports = {
  sceduleQuery,
};
