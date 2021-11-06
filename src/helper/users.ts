import {commonPrefixLength} from '../utils/string';
import {User} from 'types/user';

export const findUserByString = (str: string, users: User[]): User => {
    const maxCommonPrefixLength = Math.max(0, ...users.map(u => commonPrefixLength(str, u.alias)));

    if (!maxCommonPrefixLength) {
        throw new Error(`Пользователь ${str} не найден`);
    }

    const nearestUsers = users.filter(u => commonPrefixLength(str, u.alias) === maxCommonPrefixLength);

    if (nearestUsers.length > 1) {
        throw new Error(`${str} не определяет пользователя однозначно между ${nearestUsers.map(u => u.alias).join(' / ')}`);
    }

    return nearestUsers[0];
};

export const findUserById = (id: string, users: User[]): User | null => users.find(u => u.userId === Number(id)) || null;
