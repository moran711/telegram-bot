const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  value: String,
  cathedra: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cathedra',
  }
});

module.exports = mongoose.model('Group', groupSchema);