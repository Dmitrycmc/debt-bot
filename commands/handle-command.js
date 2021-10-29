const telegramProvider = require('../providers/telegram');

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


    await telegramProvider.send(command, chatId);
};

module.exports = handleCommand;