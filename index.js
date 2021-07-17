const Bot = require('node-telegram-bot-api')
const summary = require('./summary')

const token = "1112399362:AAHmClDkBQBdvIkyBFpgsUFG3s7tkMKQMf4"

const bot = new Bot(token, {polling: true})

const roundMatch = (max, min) => {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

const hours = 3

// bot.onText(/\/data/, function onLoveText(msg) {
//     const opts = {
//       reply_to_message_id: msg.message_id,
//       reply_markup: JSON.stringify({
//         keyboard: [
//           ['1'],['2'],
//           ['3'],
//         ]
//       })
//     };
//     bot.sendMessage(msg.chat.id, 'Do you love me?', opts);
// });

bot.on('message', msg => {
    const { id, first_name: userName } = msg.chat
    
    if(/start/gi.test(msg.text)) {
        bot.sendMessage(id, `Добро пожаловать ${userName}! Сообщения будут каждые ${hours} часа`)
        bot.sendMessage(id, `Бот запущен...`)
        setInterval(() => {
            bot.sendMessage(id, summary[roundMatch(summary.length - 1, 0)])
        }, (1000 * 60 * 60) * hours)
    }   
    else if(/черный/gi.test(msg.text)) {
        bot.sendSticker(id, 'CAACAgIAAxkBAAECl0tg8pGndFDpxClqPUXr9D5Iz-GOZwACuAADHEwXNf-uzxqylPi2IAQ')
    }
    else {
        bot.sendMessage(id, 'Извините такой команды не существует...')
    }
})
