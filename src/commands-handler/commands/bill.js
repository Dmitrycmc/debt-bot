const mongoProvider = require('../../providers/mongo');
const {moneyFormatting} = require('../../utils/formatting');
const {renderTable} = require('../../helper/render-table');
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
        ['Кто', 'Кому', 'Сколько', 'За что'],
        data.map(r => [findUserById(r.from, users).name, findUserById(r.to, users).name, moneyFormatting(r.amount), r.description])
    )
        + '\n\n' +
    renderTable(
        Object.keys(summary).map(uid => findUserById(uid, users).name),
        [Object.values(summary).map(moneyFormatting)]
    );
};

module.exports = bill;