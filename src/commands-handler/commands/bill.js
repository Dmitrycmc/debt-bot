const mongoProvider = require('../../providers/mongo');
const {moneyFormatting} = require('../../utils/formatting');
const {renderTable} = require('../../helper/render-table');
const {findUserById} = require('../../helper/users');

const bill = async ({chatId, args}) => {
    const data = await mongoProvider.getAll({chatId});
    let slicedData = [];
    const users = await mongoProvider.getUsers({chatId});

    const summary = data.reduce((acc, {from, to, amount}) => {
        acc[from] = (acc[from] || 0) - amount;
        acc[to] = (acc[to] || 0) + amount;

        return acc;
    }, {});

    if (args[1] !== undefined) {
        console.log(args);
        console.log(Number.isInteger(Number(args[0])) && Number.isInteger(Number(args[1])));
        console.log(args[0]);
        console.log(args[1]);
        console.log(data);
        console.log(data.slice(args[0], args[1]));
        if (Number.isInteger(Number(args[0])) && Number.isInteger(Number(args[1]))) {
            slicedData = data.slice(args[0], args[1]);
        }
    } else {
        if (Number.isInteger(Number(args[0]))) {
            const limit = args[0] || 50;
            slicedData = data.slice(-limit);
        }
    }

    return renderTable(
        ['Кто', 'Кому', 'Сколько', 'За что'],
        slicedData.map(r => [findUserById(r.from, users).name, findUserById(r.to, users).name, moneyFormatting(r.amount), r.description])
    )
        + '\n\n' +
    renderTable(
        null,
        Object.entries(summary)
            .map(([uid, amount]) => ({uid, amount}))
            .sort((a, z) => z.amount - a.amount)
            .map(({uid, amount}) => [findUserById(uid, users).name, moneyFormatting(amount)])
    );
};

module.exports = bill;