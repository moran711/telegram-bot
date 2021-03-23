require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const connectDB = require("./connectDB");
const cathedraController = require("./controllers/cathedra.controller");
const groupController = require("./controllers/group.controller");
const instituteController = require("./controllers/institute.controller");
const formatDataForKeyboard = require("./helpers/formatDataForKeyboard");

connectDB();

const token = process.env.BOT_TOKEN;

const port = process.env.PORT || 8443;
const host = process.env.HOST || 'http://localhost';



const bot = new TelegramBot(token, { polling: true, webHook: {port: port, host: host }});

bot.setWebHook(`${host}:${port}/bot${token}`);

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  console.log(chatId);
  const selectedItem = query.data;
  if (await instituteController.getInstituteById(selectedItem)) {
    const cathedras = await cathedraController.getAllCathedras({
      institute: selectedItem,
    });
    bot.sendMessage(chatId, "Вибери із списку свою кафедру", {
      reply_markup: {
        inline_keyboard: formatDataForKeyboard(cathedras),
      },
    });
  } else if (await cathedraController.getCathedraById(selectedItem)) {
    const groups = await groupController.getAllGroups({
      cathedra: selectedItem,
    });
    bot.sendMessage(chatId, "Вибери із списку свою групу", {
      reply_markup: {
        inline_keyboard: formatDataForKeyboard(groups),
      },
    });
  } else if (await groupController.getGroupById(selectedItem)) {
    bot.sendMessage(chatId, "Розкладу для групи поки немає")
  }
});

bot.onText(/\/get_scedule/, async (msg) => {
  const chatId = msg.chat.id;
  const institutes = await instituteController.getAllInstitutes();
  bot.sendMessage(chatId, "Вибери із списку свій інститут", {
    reply_markup: {
      inline_keyboard: formatDataForKeyboard(institutes),
    },
  });
});

bot.on("polling_error", (err) => console.log(err));
