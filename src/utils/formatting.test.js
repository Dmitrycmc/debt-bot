const {prefix, moneyFormatting, renderTable} = require('./formatting');

describe('prefix', () => {
    test('prefix("text", -2) = "text"', () => {
        expect(prefix("text", -2)).toEqual("text");
    });

    test('prefix("text", 0) = "text"', () => {
        expect(prefix("text", 0)).toEqual("text");
    });

    test('prefix("text", 2) = "text"', () => {
        expect(prefix("text", 2)).toEqual("text");
    });

    test('prefix("text", 4) = "text"', () => {
        expect(prefix("text", 4)).toEqual("text");
    });

    test('prefix("text", 6) = "text"', () => {
        expect(prefix("text", 6)).toEqual("  text");
    });

    test('prefix("text", 8) = "text"', () => {
        expect(prefix("text", 8, '#')).toEqual("####text");
    });
});

describe('moneyFormatting', () => {
    test('moneyFormatting(0) = "0 ₽"', () => {
        expect(moneyFormatting(0)).toEqual("0 ₽");
    });

    test('moneyFormatting(10) = "0.10 ₽"', () => {
        expect(moneyFormatting(10)).toEqual("0.10 ₽");
    });

    test('moneyFormatting(10) = "129.23 ₽"', () => {
        expect(moneyFormatting(12923)).toEqual("129.23 ₽");
    });

    test('moneyFormatting(10) = "129 ₽"', () => {
        expect(moneyFormatting(12900)).toEqual("129 ₽");
    });

    test('moneyFormatting(10) = "-129.23 ₽"', () => {
        expect(moneyFormatting(-12923)).toEqual("-129.23 ₽");
    });
});

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