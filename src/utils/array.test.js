const {range} = require('./array');

describe('range', () => {
    test('range(0) = []', () => {
        expect(range(0)).toEqual([]);
    });

    test('range(1) = [0]', () => {
        expect(range(1)).toEqual([0]);
    });

    test('range(3) = [0, 1, 2]', () => {
        expect(range(3)).toEqual([0, 1, 2]);
    });
})