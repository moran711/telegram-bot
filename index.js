require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const connectDB = require("./connectDB");
const cathedraController = require("./controllers/cathedra.controller");
const groupController = require("./controllers/group.controller");
const instituteController = require("./controllers/institute.controller");
const formatDataForKeyboard = require("./helpers/formatDataForKeyboard");
const express = require("express");
// const sceduleConsroller = require("./controllers/scedule.consroller");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello man!");
});

connectDB();
const token = process.env.BOT_TOKEN;

const port = process.env.PORT || 8443;
const host =
  process.env.NODE_ENV === "production" ? process.env.HOST : "http://localhost";

  app.listen(port, () => {
    console.log(`server listen on port ${port}`);
  });

const botOptions = {
  polling: process.env.NODE_ENV !== "production"
};
const bot = new TelegramBot(token, botOptions);

if (process.env.NODE_ENV === "production")
  bot.setWebHook(`${host.substring(0, host.length - 1)}:${port}/bot${token}`);

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
    const scedule = await sceduleConsroller.getAllScedules({
      group: selectedItem,
    });

    scedule.length
      ? scedule[0].forWeek.map((el) =>
          bot.sendMessage(
            chatId,
            `
    Ваш викладач: ${el.teacher}
    Ваш предмет: ${el.subject}
    Номер пари: ${el.number}
  `,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Посилання на пару",
                      url: el.uri,
                    },
                  ],
                ],
              },
            }
          )
        )
      : bot.sendMessage(chatId, "Розкладу для групи поки немає");
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

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, JSON.stringify(msg));
});

bot.on("polling_error", (err) => console.log(err));
