const mongoProvider = require('../../providers/mongo');

const register = async ({chatId, userId, username, args}) => {
    await mongoProvider.register({
        chatId,
        userId,
        login: username,
        name: args[0],
        aliases: args
    });

    return 'Success';
};

module.exports = register;