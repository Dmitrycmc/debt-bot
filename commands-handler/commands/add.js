const mongoProvider = require('../../providers/mongo');
const {isNumber} = require('../../utils/number');
const {findUserByString, findUserById} = require('../../helper/users');
const {renderTable, moneyFormatting} = require("../../utils/formatting");

const add = async ({args, text, chatId}) => {
    //if (args[3] !== 'за') {
    //    return `Неверный формат:\n🚫 ${text}\n✅ /add Пупа лупе 40 за штаны`
    //}

    const users = await mongoProvider.getUsers({chatId});

    const fromId = findUserByString(args[0], users)?.userId;
    const toId = findUserByString(args[1], users)?.userId;

    if (!fromId || !toId) {
        if (!fromId) {
            return 'Not found: ' + args[0];
        }
        if (!toId) {
            return 'Not found: ' + args[1];
        }
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
        ['From', 'To', 'Amount', 'Description'],
        data.map(r => [findUserById(r.from, users).username, findUserById(r.to, users).username, moneyFormatting(r.amount), r.description])
    )
};

module.exports = add;