import {range} from './array';

export const prefix = (str = '', length: number, symbol = ' '): string => {
    return range(length - str.toString().length).map(() => symbol).join('') + str;
};

export const moneyFormatting = (amount: number): string => {
    if (amount < 0) {
        return '-' + moneyFormatting(-amount);
    }

    let result = String(Math.floor(amount / 100));
    if (amount % 100) {
        result +=`.${prefix(String(amount % 100), 2, '0')}`;
    }
    result += ' ₽';
    return result;
};