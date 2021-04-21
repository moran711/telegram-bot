class CronDate {
  everyNMinutes(n) {
    return `*/${n} * * * *`;
  }
  everyDayAt(hour, minute) {
    console.log(`created date for ${hour}:${minute}`);
    return `${minute} ${hour} * * *`;
  }
}

module.exports = new CronDate();
