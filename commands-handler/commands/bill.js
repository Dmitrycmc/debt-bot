const mongoProvider = require('../../providers/mongo');

const {moneyFormatting, renderTable} = require('../../utils/formatting');

const bill = async ({chatId}) => {
    const data = await mongoProvider.getAll({chatId});
    return renderTable(
        ['From', 'To', 'Amount', 'Description'],
        data.map(r => [r.from, r.to, moneyFormatting(r.amount), r.description])
    );
};

module.exports = bill;