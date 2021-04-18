const { types } = require('../consts/types.consts');
const { sliceArray } = require('./sliceArray');

const courses = [1, 2, 3, 4, 5, 6];

const formatCourseKeyboard = (instituteId) => {
  return sliceArray(
    courses.map((course) => ({
      text: course,
      callback_data: JSON.stringify({
        type: types.institute,
        id: instituteId,
        value: course,
      }),
    })),
    3
  );
};

module.exports = { formatCourseKeyboard, courses };
