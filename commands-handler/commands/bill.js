const mongoProvider = require('../../providers/mongo');
const {moneyFormatting, renderTable} = require('../../utils/formatting');
const {findUserById} = require('../../helper/users');

const bill = async ({chatId}) => {
    const data = await mongoProvider.getAll({chatId});
    const users = await mongoProvider.getUsers({chatId});

    const summary = data.reduce((acc, {from, to, amount}) => {
        acc[from] = (acc[from] || 0) - amount;
        acc[to] = (acc[to] || 0) + amount;

        return acc;
    }, {});

    return renderTable(
        ['From', 'To', 'Amount', 'Description'],
        data.map(r => [findUserById(r.from, users).username, findUserById(r.to, users).username, moneyFormatting(r.amount), r.description])
    )
        + "\n\n" +
    renderTable(
        Object.keys(summary).map(uid => findUserById(uid, users).username),
        [Object.values(summary).map(moneyFormatting)]
    );
};

module.exports = bill;