const mongoProvider = require('../../providers/mongo');

const register = async ({chatId, userId, username, args}) => {
    await mongoProvider.register({chatId, userId, username, aliases: args.map(a => a.toLowerCase())});

    return 'Success';
};

module.exports = register;