const getUserDataFromMessage = (message) => ({
  chatId: message.from.id,
  name: message.from.first_name,
  username: message.from.username,
});

module.exports = {
  getUserDataFromMessage,
};
