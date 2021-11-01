const mongoProvider = require('../../providers/mongo');

const add = async ({args, text, chatId}) => {
    if (args[3] !== 'за') {
        return `Неверный формат:\n🚫 ${text}\n✅ /add Пупа лупе 40 за штаны`
    }

    await mongoProvider.insert({
        from: args[0],
        to: args[1],
        amount: args[2],
        description: args[4],
        chatId
    });

    return 'Success';
};

module.exports = add;