const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  value: { require: true, type: String },
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
    require: true,
  },
  course: { require: true, type: Number },
});

module.exports = mongoose.model('Group', groupSchema);
