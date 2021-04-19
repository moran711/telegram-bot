class CronDate {
  everyNMinutes(n) {
    return `*/${n} * * * *`;
  }
  everyDayAt(hour, minute) {
    return `${minute} ${hour} * * *`;
  }
}

module.exports = new CronDate();
