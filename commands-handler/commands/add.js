const mongoProvider = require('../../providers/mongo');

const {moneyFormatting, renderTable} = require('../../utils/formatting');

const add = async ({args, text}) => {
    if (args[3] !== 'за') {
        return `Неверный формат:\n🚫 ${text}\n✅ /add Пупа лупе 40 за штаны`
    }

    const {insertedId} = await mongoProvider.insert({
        from: args[0],
        to: args[1],
        amount: args[2],
        description: args[4],
    });

    console.log(insertedId);

    return 'Success';
};

module.exports = add;