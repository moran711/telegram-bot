const mongoose = require('mongoose');
const Couple = require('./couple.model').schema;

const sceduleSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  week: {
    mon: { denominator: [Couple], numerator: [Couple] },
    tue: { denominator: [Couple], numerator: [Couple] },
    wed: { denominator: [Couple], numerator: [Couple] },
    thu: { denominator: [Couple], numerator: [Couple] },
    fri: { denominator: [Couple], numerator: [Couple] },
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    require: true,
  },
});

module.exports = mongoose.model('Scedule', sceduleSchema);
