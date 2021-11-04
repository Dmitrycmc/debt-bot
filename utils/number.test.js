const {isNumber} = require('./number');

describe('isNumber', () => {
    test('isNumber(0)', () => {
        expect(isNumber(0)).toEqual(true);
    });

    test('isNumber(1)', () => {
        expect(isNumber(1)).toEqual(true);
    });

    test('isNumber(-3.4)', () => {
        expect(isNumber(-3.4)).toEqual(true);
    });

    test('isNumber(Infinity)', () => {
        expect(isNumber(Infinity)).toEqual(false);
    });

    test('isNumber(NaN)', () => {
        expect(isNumber(NaN)).toEqual(false);
    });

    test('isNumber(3)', () => {
        expect(isNumber("5")).toEqual(false);
    });
})