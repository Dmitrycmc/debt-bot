const telegramProvider = require('../providers/telegram');

const handleCommand = async ({text, userId, username, firstname, lastname, chatId}) => {
    let [command, ...args] = text.split(' ');
    command = command.split(/[/@]/)[1];

    try {
        const commandHandler = require(`./commands/${command}`);

        await telegramProvider.send({
            text: await commandHandler({
                text,
                userId,
                username,
                firstname,
                lastname,
                chatId,
                args
            }), chatId
        });
    } catch (e) {
        console.error(e);
    }
};

module.exports = handleCommand;
