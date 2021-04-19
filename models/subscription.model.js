const mongoose = require('mongoose');

const subsSchema = new mongoose.Schema({
  type: { require: true, type: String },
  id: { require: true, type: String },
  subgroup: { type: String },
});

module.exports = mongoose.model('Subscription', subsSchema);
