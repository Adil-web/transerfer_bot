const http = require('http')
const Bot = require('node-telegram-bot-api')
const {summary, allPrinciples} = require('./summary')

const token = "1112399362:AAHmClDkBQBdvIkyBFpgsUFG3s7tkMKQMf4"

const bot = new Bot(token, {polling: true})

const roundMatch = (max, min) => {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

const hours = 3

const principles = [
    ['1. «Мир, как зеркало, отражает ваше отношение к нему»'],
    ['2. «Отражение формируется в единстве души и разума»'],
    ['3. «Дуальное зеркало реагирует с задержкой»'],
    ['4. «Зеркало просто констатирует содержание отношения, игнорируя его направленность»'],
    ['5. «Внимание должно быть зафиксировано на конечной цели, как будто она уже достигнута»'],
    ['6. «Отпустить свою хватку и позволить миру двигаться по течению вариантов»'],
    ['7. «Всякое отражение воспринимать как позитивное»']]

http.createServer((request, response) => {
    console.log('request starting for ');
    console.log(request);
    bot.onText(/\/start/, function onStartText(msg) {
        const { id, first_name: userName } = msg.chat
        const opts = {
          reply_to_message_id: msg.message_id,
          reply_markup: JSON.stringify({
            keyboard: principles
          })
        };
        bot.sendMessage(id, 'ПРИНЦИПЫ ТРАНСЕРФИНГА РЕАЛЬНОСТИ', opts);
        bot.sendMessage(id, `Добро пожаловать ${userName}!`)
        setInterval(() => {
            bot.sendMessage(id, summary[roundMatch(summary.length - 1, 0)])
        }, (1000 * 60 * 60) * hours)
    });
    
    bot.on('message', msg => {
        const { id } = msg.chat
        if(/test/gi.test(msg.text)) {
            setInterval(() => {
                bot.sendMessage(id, summary[roundMatch(summary.length - 1, 0)])
            }, (1000 * 60 * 60) * hours)
        }
        if(/start/gi.test(msg.text)) {
            fetch('https://transerfer.herokuapp.com/')
                .then(response => response.json())
                .then(json => console.log(json))
            return
        }
        switch (msg.text) {
            case '1. «Мир, как зеркало, отражает ваше отношение к нему»':
                bot.sendMessage(id, allPrinciples[0])
                break;
            case principles[1][0]:
                bot.sendMessage(id, allPrinciples[1])
                break
            case principles[2][0]:
                bot.sendMessage(id, allPrinciples[2])
                break
            case principles[3][0]:
                bot.sendMessage(id, allPrinciples[3])
                break
            case principles[4][0]:
                bot.sendMessage(id, allPrinciples[4])
                break
            case principles[5][0]:
                bot.sendMessage(id, allPrinciples[5])
                break
            case principles[6][0]:
                bot.sendMessage(id, allPrinciples[6])
                break
            case 'черный': 
                break
                default:
                    bot.sendMessage(id, 'Извините такой команды не существует...')
                    bot.sendMessage(id, msg.text)
                    break;
            }
            if(/черный/gi.test(msg.text)) {
                bot.sendSticker(id, 'CAACAgIAAxkBAAECl0tg8pGndFDpxClqPUXr9D5Iz-GOZwACuAADHEwXNf-uzxqylPi2IAQ')
                return
            }
    })
}).listen(process.env.PORT || 5000)

console.log('Server running at http://127.0.0.1:5000/');
//     bot.onText(/\/start/, function onStartText(msg) {
//         const { id, first_name: userName } = msg.chat
//         const opts = {
//           reply_to_message_id: msg.message_id,
//           reply_markup: JSON.stringify({
//             keyboard: principles
//           })
//         };
//         bot.sendMessage(id, 'ПРИНЦИПЫ ТРАНСЕРФИНГА РЕАЛЬНОСТИ', opts);
//         bot.sendMessage(id, `Добро пожаловать ${userName}!`)
//         setInterval(() => {
//             bot.sendMessage(id, summary[roundMatch(summary.length - 1, 0)])
//         }, (1000 * 60 * 60) * hours)
//     });
    
//     bot.on('message', msg => {
//         const { id } = msg.chat
//         if(/test/gi.test(msg.text)) {
//             setInterval(() => {
//                 bot.sendMessage(id, summary[roundMatch(summary.length - 1, 0)])
//             }, (1000 * 60 * 60) * hours)
//         }
//         if(/start/gi.test(msg.text)) {
//             return
//         }
//         switch (msg.text) {
//             case '1. «Мир, как зеркало, отражает ваше отношение к нему»':
//                 bot.sendMessage(id, allPrinciples[0])
//                 break;
//             case principles[1][0]:
//                 bot.sendMessage(id, allPrinciples[1])
//                 break
//             case principles[2][0]:
//                 bot.sendMessage(id, allPrinciples[2])
//                 break
//             case principles[3][0]:
//                 bot.sendMessage(id, allPrinciples[3])
//                 break
//             case principles[4][0]:
//                 bot.sendMessage(id, allPrinciples[4])
//                 break
//             case principles[5][0]:
//                 bot.sendMessage(id, allPrinciples[5])
//                 break
//             case principles[6][0]:
//                 bot.sendMessage(id, allPrinciples[6])
//                 break
//             case 'черный': 
//                 break
//                 default:
//                     bot.sendMessage(id, 'Извините такой команды не существует...')
//                     bot.sendMessage(id, msg.text)
//                     break;
//             }
//             if(/черный/gi.test(msg.text)) {
//                 bot.sendSticker(id, 'CAACAgIAAxkBAAECl0tg8pGndFDpxClqPUXr9D5Iz-GOZwACuAADHEwXNf-uzxqylPi2IAQ')
//                 return
//             }
//     })
