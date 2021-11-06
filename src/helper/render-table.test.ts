import {renderTable} from "./render-table";

describe('renderTable', () => {
    test('renderTable()', () => {
        expect(renderTable(['Column 1', '', '', ''], [['a'], ['aba', 'aba', ''], ['ababa', 'ababa', '', 'aba']])).toEqual(
            `<pre>|Column 1|     ||   |
|--------+-----++---|
|       a|     ||   |
|     aba|  aba||   |
|   ababa|ababa||aba|</pre>`);
    });

    test('renderTable(null, [])', () => {
        expect(renderTable(null, [['a'], ['aba', 'aba', ''], ['ababa', 'ababa', '', 'aba']])).toEqual(
            `<pre>|    a|     ||   |
|  aba|  aba||   |
|ababa|ababa||aba|</pre>`);
    });

    test('renderTable([])', () => {
        expect(renderTable(['Column 1', '', '', ''])).toEqual(
            `<pre>|Column 1||||
|--------+++|</pre>`);
    });
});