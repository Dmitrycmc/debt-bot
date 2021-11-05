const mongoProvider = require('../../providers/mongo');

const register = async ({chatId, userId, username, args}) => {
    const users = await mongoProvider.getUsers({chatId, userId});

    if (users.length) {
        return `⚠️ Вы уже зарегистрированы, как ${users[0].name} (${users.map(u => u.alias).join(', ')})`;
    }

    const aliases = Array.from(new Set(args));

    await mongoProvider.register({
        chatId,
        userId,
        login: username,
        name: args[0],
        aliases
    });

    return `✅ Вы зарегистрированы, как ${args[0]} (${aliases.join(', ')})`;
};

module.exports = register;