require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const connectDB = require('./connectDB');
const bodyParser = require('body-parser');
const { sceduleQuery } = require('./callbacks/query.callbacks');
const {
  getSceduleCommandCallback,
} = require('./callbacks/commands/get-scedule.callback');
const { startCommandCallback } = require('./callbacks/commands/start.callback');
const { cronJobs } = require('./cron-jobs');
const getSceduleData = require('./parsers');
const app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello man!');
});

const token = process.env.BOT_TOKEN;
const port = process.env.PORT || 8443;

const requestUri =
  process.env.NODE_ENV === 'production'
    ? process.env.HEROKU_URL.substring(0, process.env.HEROKU_URL.length - 1)
    : `http://localhost:${port}`;

const botOptions = {
  polling: process.env.NODE_ENV !== 'production',
};

app.listen(port, async () => {
  await connectDB();
  // await getSceduleData();
  console.log(`server listen on port ${port}`);
});

const bot = new TelegramBot(token, botOptions);

app.post('/' + bot.token, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.post('/heals-check', function (req, res) {
  res.status(200);
  res.send('Hello man!');
  console.log('heals check finished!');
});

if (process.env.NODE_ENV === 'production')
  bot.setWebHook(process.env.HEROKU_URL + bot.token);

bot.on('callback_query', sceduleQuery(bot));

bot.onText(/\/get_scedule/, getSceduleCommandCallback(bot));

bot.on('polling_error', (err) => console.log(err));

bot.onText(/\/start/, startCommandCallback(bot));

cronJobs.forEach((job) => job(requestUri));
