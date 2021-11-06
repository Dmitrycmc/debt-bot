import {commonPrefixLength} from './string';

describe('commonPrefixLength', () => {
    test('commonPrefixLength("1234567", "12") = 2', () => {
        expect(commonPrefixLength('1234567', '12')).toEqual(2);
        expect(commonPrefixLength( '12', '1234567')).toEqual(2);
    });

    test('commonPrefixLength("1234567", "123000") = 2', () => {
        expect(commonPrefixLength('1234567', '123000')).toEqual(3);
        expect(commonPrefixLength( '123000', '1234567')).toEqual(3);
    });

    test('commonPrefixLength("1234567", "") = 0', () => {
        expect(commonPrefixLength('1234567', '')).toEqual(0);
        expect(commonPrefixLength( '', '1234567')).toEqual(0);
    });

    test('commonPrefixLength("1234567", "1234567") = 7', () => {
        expect(commonPrefixLength('1234567', '1234567')).toEqual(7);
    });

    test('commonPrefixLength("") = 0', () => {
        expect(commonPrefixLength('', '1234567')).toEqual(0);
    });

    test('commonPrefixLength("abcde", "abCD") = 4', () => {
        expect(commonPrefixLength('abcde', 'abCD')).toEqual(4);
    });

    test('commonPrefixLength("abcde", "abCD", true) = 2', () => {
        expect(commonPrefixLength('abcde', 'abCD', true)).toEqual(2);
    });
});