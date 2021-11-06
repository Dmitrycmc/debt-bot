const mongoProvider = require('../../providers/mongo');
const renderTemplate = require('../../helper/render-template/render-template');

const register = async ({chatId, userId, username, args}) => {
    const users = await mongoProvider.getUsers({chatId, userId});

    if (users.length) {
        return renderTemplate('registered-failed', {
            name: users[0].name,
            aliases: users.map(u => u.alias).join(', ')
        });
    }

    const aliases = Array.from(new Set(args));

    await mongoProvider.register({
        chatId,
        userId,
        login: username,
        name: args[0],
        aliases
    });

    return renderTemplate('registered-successfully', {
        name: args[0],
        aliases: aliases.join(', ')
    });
};

module.exports = register;