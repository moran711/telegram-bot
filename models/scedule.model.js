const mongoose = require('mongoose');
const Couple = require('./couple.model').schema;

const sceduleSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  week: {
    mon: {
      denominator: {
        subgroup1: [Couple],
        subgroup2: [Couple],
        general: [Couple],
      },
      numerator: {
        subgroup1: [Couple],
        subgroup2: [Couple],
        general: [Couple],
      },
    },
    tue: {
      denominator: {
        subgroup1: [Couple],
        subgroup2: [Couple],
        general: [Couple],
      },
      numerator: {
        subgroup1: [Couple],
        subgroup2: [Couple],
        general: [Couple],
      },
    },
    wed: {
      denominator: {
        subgroup1: [Couple],
        subgroup2: [Couple],
        general: [Couple],
      },
      numerator: {
        subgroup1: [Couple],
        subgroup2: [Couple],
        general: [Couple],
      },
    },
    thu: {
      denominator: {
        subgroup1: [Couple],
        subgroup2: [Couple],
        general: [Couple],
      },
      numerator: {
        subgroup1: [Couple],
        subgroup2: [Couple],
        general: [Couple],
      },
    },
    fri: {
      denominator: {
        subgroup1: [Couple],
        subgroup2: [Couple],
        general: [Couple],
      },
      numerator: {
        subgroup1: [Couple],
        subgroup2: [Couple],
        general: [Couple],
      },
    },
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    require: true,
  },
});

module.exports = mongoose.model('Scedule', sceduleSchema);
