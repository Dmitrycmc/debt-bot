const mongoProvider = require('../../providers/mongo');
const {moneyFormatting} = require('../../utils/formatting');
const {renderTable} = require('../../helper/render-table');
const {findUserById} = require('../../helper/users');

const bill = async ({chatId, args}) => {
    const [data, users] = await Promise.all([
        mongoProvider.getAllHidden({chatId}),
        mongoProvider.getUsers({chatId})
    ]);

    data.forEach((r, i) => {
        r.index = data.length - i;
    });

    let slicedData;

    if (args[1] !== undefined) {
        slicedData = data.slice(args[0], args[1]);
    } else {
        const limit = args[0] || 15;
        slicedData = data.slice(-limit);
    }

    return renderTable(
        ['#', 'Кто', 'Кому', 'Сколько', 'За что'],
        slicedData.map(r => [r.index, findUserById(r.from, users).name, findUserById(r.to, users).name, moneyFormatting(r.amount), r.description])
    );
};

module.exports = bill;