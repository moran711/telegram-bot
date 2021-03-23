
const mongoose = require('mongoose');

const cathedraSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  value: String,
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
  }
});

module.exports = mongoose.model('Cathedra', cathedraSchema);