require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const connectDB = require("./connectDB");
const cathedraController = require("./controllers/cathedra.controller");
const groupController = require("./controllers/group.controller");
const instituteController = require("./controllers/institute.controller");
const formatDataForKeyboard = require("./helpers/formatDataForKeyboard");
const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello man!')
})
 
app.listen(process.env.PORT);

connectDB();

const token = process.env.BOT_TOKEN;

const port = process.env.PORT || 8443;
const host =
  process.env.NODE_ENV === "production" ? process.env.HOST : "http://localhost";

const botOptions = {
  polling: process.env.NODE_ENV === "production",
  webHook: {
    port: process.env.NODE_ENV === "production" ? port : null,
    host: process.env.NODE_ENV === "production" ? host : null,
  },
};

const bot = new TelegramBot(token, botOptions);

if (process.env.NODE_ENV === "production")
  bot.setWebHook(`${host}:${port}/bot${token}`);

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  console.log(chatId);
  const selectedItem = query.data;
  if (await instituteController.getInstituteById(selectedItem)) {
    const cathedras = await cathedraController.getAllCathedras({
      institute: selectedItem,
    });
    cathedras.length
      ? bot.sendMessage(chatId, "Вибери із списку свою кафедру", {
          reply_markup: {
            inline_keyboard: formatDataForKeyboard(cathedras),
          },
        })
      : bot.sendMessage(chatId, "Для вибраного інституту поки немає кафедри");
  } else if (await cathedraController.getCathedraById(selectedItem)) {
    const groups = await groupController.getAllGroups({
      cathedra: selectedItem,
    });
    groups.length
      ? bot.sendMessage(chatId, "Вибери із списку свою групу", {
          reply_markup: {
            inline_keyboard: formatDataForKeyboard(groups),
          },
        })
      : bot.sendMessage(chatId, "Для вибраної кафедри поки немає групи");
  } else if (await groupController.getGroupById(selectedItem)) {
    bot.sendMessage(chatId, "Розкладу для групи поки немає");
  }
});

bot.onText(/\/get_scedule/, async (msg) => {
  const chatId = msg.chat.id;
  const institutes = await instituteController.getAllInstitutes();
  institutes.length
    ? bot.sendMessage(chatId, "Вибери із списку свій інститут", {
        reply_markup: {
          inline_keyboard: formatDataForKeyboard(institutes),
        },
      })
    : bot.sendMessage(chatId, "Інститутів поки немає");
});

bot.on("polling_error", (err) => console.log(err));
