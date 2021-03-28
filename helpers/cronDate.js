class CronDate {
  everyNMinutes(n) {
    return `*/${n} * * * *`
  }
}

module.exports = new CronDate();