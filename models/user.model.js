const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  subscriptions: [String],
  chatId: String
});

module.exports = mongoose.model('User', userSchema);