const mongoProvider = require('../providers/mongo');

const {moneyFormatting, renderTable} = require('../utils/formatting');

const bill = async () => {
    const a = await mongoProvider.getAll();
    return renderTable(['From', 'To', 'Amount', 'Description'], a.map(r => [r.from, r.to, moneyFormatting(r.amount), r.description]));
};

module.exports = bill;