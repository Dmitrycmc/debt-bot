const {range} = require('./array');

const prefix = (str, length, symbol = ' ') => {
    if (!str) {
        return range(length).map(() => symbol).join('');
    }
    return range(length - str.toString().length).map(() => symbol).join('') + str;
};

const moneyFormatting = (amount) => {
    return `${Math.floor(amount / 100)},${prefix(amount % 100, 2, '0')} ₽`
};

const renderTable = (header, rows) => {
    const columnsNumber = Math.max(header.length, ...rows.map(row => row.length));

    const columnLengths = range(columnsNumber).map(i => Math.max(
        header[i]?.toString().length || 0,
        ...rows.map(row => row[i]?.toString().length || 0)
    ));

    const renderRow = (cells, leftDelim, centerDelim, rightDelim) => {
        return leftDelim + range(columnsNumber).map(i => prefix(cells[i], columnLengths[i])).join(centerDelim) + rightDelim;
    };

    return `<pre>${[
        renderRow(header, '|', '|', '|'),
        renderRow(range(columnsNumber).map(i => prefix(null, columnLengths[i], '-')), '|', '+', '|'),
        ...rows.map(row => renderRow(row, '|', '|', '|'))
    ].join('\n')}</pre>`;
};

module.exports = {
    prefix,
    moneyFormatting,
    renderTable
};