const telegramProvider = require('../providers/telegram');

const handleCommand = async ({text, userId, username, firstname, lastname, chatId}) => {
    let [command, ...args] = text.split(' ');
    command = command.split(/[\/@]/)[1];

    const commandHandler = require(`./commands/${command}`);

    await telegramProvider.send({text: await commandHandler({
            text,
            userId,
            username,
            firstname,
            lastname,
            chatId,
            args
        }), chatId});
};

module.exports = handleCommand;
