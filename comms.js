const config = require('./config.json'); // connection file with setting and information
const { Client, Intents } = require('discord.js');
const prefix = config.prefix; // prefix with discord
const versions = config.versions; // version with discrod bot command 
// command for discord message //

function test(robot, mess, args) {
    mess.channel.send('Да я работаю, что-то не так?');
    
}

function hello(robot, mess, args ) {
    mess.reply("Привет!")
}
function OrelAndReshka(robot, mess, args) {
    mess.channel.send('Монета подбрасывается...')

    var random = Math.floor(Math.random() * 3) ; // Объявление переменной random - она вычисляет случайное число от 1 до 2
    
    if (random === 1) { // Если вычислено число 1, то выпадает орёл.
        mess.channel.send(':full_moon: Орёл!')
    } else if (random === 2) { // Если вычислено число 2, то выпадает решка.
        mess.channel.send(':new_moon: Решка!')
    }
}

function spam(robot, mess, args) {
    for(let i = 0; i < 100; i++) {
       mess.channel.send('А мне все равно, я спамер!');
    }
    
}

function deletemessage(robot, mess, args) {
    const arggs = mess.content.split(' ').slice(1); // Все аргументы за именем команды с префиксом
const amount = arggs.join(' '); // Количество сообщений, которые должны быть удалены
if (!amount) return mess.channel.send('Вы не указали, сколько сообщений нужно удалить!'); // Проверка, задан ли параметр количества
if (isNaN(amount)) return mess.channel.send('Это не число!'); // Проверка, является ли числом ввод пользователя 

if (amount > 100) return mess.channel.send('Вы не можете удалить 100 сообщений за раз'); // Проверка, является ли ввод пользователя числом больше 100
if (amount < 1) return mess.channel.send('Вы должны ввести число больше чем 1'); // Проверка, является ли ввод пользователя числом меньше 1

async function delete_messages() { // Объявление асинхронной функции

    await mess.channel.messages.fetch({
        limit: amount
    }).then(messages => {
        mess.channel.bulkDelete(messages)
        mess.channel.send(`Удалено ${amount} сообщений!`)
    })
};
delete_messages(); // Вызов асинхронной функции
}
// list command for discord message //

var comms_list = [
    {
    name: "test",
    out: test,
    about: "Тестовая команда"
    },
    {
        name: "hello",
        out: hello,
        about: "Команда для приветствия!"
    },
    {
        name: "game",
        out: OrelAndReshka,
        about: "Игра - орел и решка"
    },
    {
        name: "spam",
        out: spam,
        about: "SPAM SPAM EEEEEE"
    },
    {
        name: "delete",
        out: deletemessage,
        about: "Удаляет n число сообщений"
    }
];

// Name - the name of the command to which the bot will respond
// out - function name with command
// about - command description

module.exports.comms = comms_list;