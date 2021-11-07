const mongoProvider = require('../../providers/mongo');
const {isNumber} = require('../../utils/number');
const {findUserByString, findUserById} = require('../../helper/users');
const {moneyFormatting} = require('../../utils/formatting');
const {renderTable} = require('../../helper/render-table');

const add = async ({args, userId, chatId}) => {
    const users = await mongoProvider.getUsers({chatId});

    let fromIds, toId, all = false;
    try {
        if (args[1].toLowerCase() === 'мне') {
            if (!users.some(u => u.userId === userId)) {
                throw new Error('Вы еще не зарегистрированы');
            }
            toId = userId;
        } else {
            toId = findUserByString(args[1], users)?.userId;
        }

        if (args[0].toLowerCase() === 'все') {
            const userIds = new Set(users.map(u => u.userId));
            userIds.delete(toId);
            fromIds = Array.from(userIds);
            all = true;
        } else if (args[0].toLowerCase() === 'я') {
            if (!users.some(u => u.userId === userId)) {
                throw new Error('Вы еще не зарегистрированы');
            }
            fromIds = [userId];
        } else {
            fromIds = [findUserByString(args[0], users)?.userId];
        }
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

    return await Promise.all(fromIds.map(fromId => mongoProvider.insert({
        from: fromId,
        to: toId,
        amount: Math.round(args[2].replace(',', '.') * 100 / (fromIds.length + (all ? 1 : 0))),
        description: args.slice(3).join(' '),
        chatId
    })))
        .then(data => mongoProvider.getById({id: {$in: data.map(r => r.insertedId)}}))
        .then(data => renderTable(
            ['Кто', 'Кому', 'Сколько', 'За что'],
            data.map(row => [findUserById(row.from, users).name, findUserById(row.to, users).name, moneyFormatting(row.amount), row.description])
        ));
};

module.exports = add;