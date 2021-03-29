const mongoose = require('mongoose');
const Subscription = require('./subscription.model').schema;

const userSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  subscriptions: [Subscription],
  chatId: { require: true, type: String },
  name: { require: true, type: String },
  username: { require: true, type: String },
});

module.exports = mongoose.model('User', userSchema);
