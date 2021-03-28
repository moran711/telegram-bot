const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  subscriptions: [{ require: true, type: String }],
  chatId: { require: true, type: String },
  name: { require: true, type: String },
  username: { require: true, type: String },
});

module.exports = mongoose.model('User', userSchema);
