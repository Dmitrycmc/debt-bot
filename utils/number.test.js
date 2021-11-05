const {isNumber} = require('./number');

describe('isNumber', () => {
    test('isNumber(0) = true', () => {
        expect(isNumber(0)).toEqual(true);
    });

    test('isNumber(1) = true', () => {
        expect(isNumber(1)).toEqual(true);
    });

    test('isNumber(-3.4) = true', () => {
        expect(isNumber(-3.4)).toEqual(true);
    });

    test('isNumber(Infinity) = false', () => {
        expect(isNumber(Infinity)).toEqual(false);
    });

    test('isNumber(NaN) = false', () => {
        expect(isNumber(NaN)).toEqual(false);
    });

    test('isNumber(3) = false', () => {
        expect(isNumber("5")).toEqual(false);
    });
})