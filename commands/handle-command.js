const telegramProvider = require('../providers/telegram');

const bill = require('./bill');

const handleCommand = async ({text, username, firstname, lastname, chatId}) => {
    let [command, ...args] = text.split(' ');
    command = command.split(/[\/@]/)[1];

    console.log({
        text,
        username,
        firstname,
        lastname,
        chatId,
        command,
        args
    });

    if (command === 'bill') {
        await telegramProvider.send({text: await bill(), chatId});
    }
};

module.exports = handleCommand;