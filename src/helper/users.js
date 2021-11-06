const {commonPrefixLength} = require('../utils/string');

const findUserByString = (str, users) => {
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

const findUserById = (id, users) => users.find(u => u.userId === Number(id));

module.exports = {
    findUserByString,
    findUserById
};