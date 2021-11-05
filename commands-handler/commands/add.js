const mongoProvider = require('../../providers/mongo');
const {isNumber} = require('../../utils/number');
const {findUserByString, findUserById} = require('../../helper/users');
const {renderTable, moneyFormatting} = require("../../utils/formatting");

const add = async ({args, text, chatId}) => {
    //if (args[3] !== 'за') {
    //    return `Неверный формат:\n🚫 ${text}\n✅ /add Пупа лупе 40 за штаны`
    //}

    const users = await mongoProvider.getUsers({chatId});

    let fromId, toId;
    try {
        fromId = findUserByString(args[0], users)?.userId;
        toId = findUserByString(args[1], users)?.userId;
    } catch (e) {
        return e.message;
    }

    if (args[3] !== 'за') {
        args.splice(3, 0, 'за');
    }

    const amount = args[2].replace(',', '.') * 100;

    if (!isNumber(amount)) {
        return `Неверный формат суммы: ${args[2]}`;
    }

    const insertedId = await mongoProvider.insert({
        from: fromId,
        to: toId,
        amount: args[2].replace(',', '.') * 100,
        description: args.slice(3).join(' '),
        chatId
    });

    const data = await mongoProvider.getById({id: insertedId.insertedId});

    return renderTable(
        ['Кто', 'Кому', 'Сколько', 'За что'],
        [[findUserById(data[0].from, users).name, findUserById(data[0].to, users).name, moneyFormatting(data[0].amount), data[0].description]]
    )
};

module.exports = add;