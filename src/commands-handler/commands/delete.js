const mongoProvider = require('../../providers/mongo');
const {renderTable} = require("../../helper/render-table");
const {findUserById} = require("../../helper/users");
const {moneyFormatting} = require("../../utils/formatting");

const remove = async ({chatId, args}) => {
    const [data, users] = await Promise.all([
        mongoProvider.getAllNotHidden({chatId}),
        mongoProvider.getUsers({chatId})
    ]);

    data.reverse();

    const items = args.map(i => ({
        ...data[i - 1],
        index: i
    })).filter(Boolean);

    if (items.length) {
        await mongoProvider.hide({ids: items.map(i => i._id)});
        return 'Удалено:\n' + renderTable(
            ['#', 'Кто', 'Кому', 'Сколько', 'За что'],
            items.map(r => [r.index, findUserById(r.from, users).name, findUserById(r.to, users).name, moneyFormatting(r.amount), r.description])
        )
    }
    return 'Не найдено';
};

module.exports = remove;