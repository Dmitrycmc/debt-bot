import {range} from './array';

export const prefix = (str = '', length: number, symbol = ' '): string => {
    return range(length - str.toString().length).map(() => symbol).join('') + str;
};

export const reverseString = (str: string): string => str.split('').reverse().join('');

export const divideByGroup = (str: string, groupLength: number, withEnd = false): string[] => {
    if (withEnd) {
        return divideByGroup(reverseString(str), groupLength).reverse().map(reverseString);
    } else {
        const regex = new RegExp(`(.{${groupLength}})`);
        return str.split(regex).filter(Boolean);
    }
};

export const moneyFormatting = (amount: number): string => {
    if (amount < 0) {
        return '-' + moneyFormatting(-amount);
    }

    let result = divideByGroup(String(Math.floor(amount / 100)), 3, true).join(' ');
    if (amount % 100) {
        result +=`.${prefix(String(Math.round(amount % 100)), 2, '0')}`;
    }
    result += ' ₽';
    return result;
};