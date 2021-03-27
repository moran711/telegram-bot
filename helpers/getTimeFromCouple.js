const timeOfCouples = {
  1: '8:30-10:05',
  2: '10:20-11:55',
  3: '12:10-13:45',
  4: '14:15-15:50',
  5: '16:00-17:35',
  6: '17:40-19:15',
  7: '19:20-20:55',
  8: '21:00-22:35'
}

const getTimeFromCouple = (couple) => timeOfCouples[couple]

module.exports = getTimeFromCouple;