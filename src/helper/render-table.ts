import {range} from "../utils/array";
import {prefix} from "../utils/formatting";

type Row = string[];

export const renderTable = (header: Row | null, rows: Row[] = []): string => {
    const columnsNumber = Math.max(header?.length || 0, ...rows.map(row => row.length));

    const columnLengths = range(columnsNumber).map(i => Math.max(
        header?.[i]?.toString().length || 0,
        ...rows.map(row => row[i]?.toString().length || 0)
    ));

    const renderRow = (cells, leftDelim, centerDelim, rightDelim) => {
        return leftDelim + range(columnsNumber).map(i => prefix(cells[i], columnLengths[i])).join(centerDelim) + rightDelim;
    };

    return `<pre>${[
        ...(header ? [
            renderRow(header, '|', '|', '|'),
            renderRow(range(columnsNumber).map(i => prefix('', columnLengths[i], '-')), '|', '+', '|')
        ] : []),
        ...rows.map(row => renderRow(row, '|', '|', '|'))
    ].join('\n')}</pre>`;
};
