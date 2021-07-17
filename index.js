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
    });
    
    bot.on('message', msg => {
        const { id } = msg.chat
        if(/test/gi.test(msg.text)) {
            setInterval(() => {
                bot.sendMessage(id, summary[roundMatch(summary.length - 1, 0)])
            }, (1000 * 60 * 60) * hours)
        }   
        if(/start/gi.test(msg.text)) {
            return
        }   
        else if(principles[0][0]) {
            bot.sendMessage(id, allPrinciples[0])
        }
        else if(principles[1][0]) {
            bot.sendMessage(id, allPrinciples[1])
        }
        else if(principles[2][0]) {
            bot.sendMessage(id, allPrinciples[2])
        }
        else if(principles[3][0]) {
            bot.sendMessage(id, allPrinciples[3])
        }
        else if(principles[4][0]) {
            bot.sendMessage(id, allPrinciples[4])
        }
        else if(principles[5][0]) {
            bot.sendMessage(id, allPrinciples[5])
        }
        else if(principles[6][0]) {
            bot.sendMessage(id, allPrinciples[6])
        }
        else if(/черный/gi.test(msg.text)) {
            bot.sendSticker(id, 'CAACAgIAAxkBAAECl0tg8pGndFDpxClqPUXr9D5Iz-GOZwACuAADHEwXNf-uzxqylPi2IAQ')
        }
        else {
            bot.sendMessage(id, 'Извините такой команды не существует...')
        }
    })
