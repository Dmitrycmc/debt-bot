const mongoProvider = require('../../providers/mongo');

const register = async ({chatId, userId, username, args}) => {
    await mongoProvider.register({
        chatId,
        userId,
        login: username,
        name: args[0],
        aliases: args
    });

    return `Вы зарегистрированы, как ${users[0].name} (${users.map(u => u.alias).join(', ')})`;
};

module.exports = register;