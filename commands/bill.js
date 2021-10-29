const mongoProvider = require('../providers/mongo');

const bill = async () => {
    const a = await mongoProvider.getAll();

    return a.map(r => `${r.from}${r.to}${r.amount}${r.description}`).join();
};

module.exports = bill;