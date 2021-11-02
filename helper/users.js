
const findUserByString = (str, users) => users.find(u => str.toLowerCase().startsWith(u.alias));

const findUserById = (id, users) => users.find(u => u.userId === Number(id));

module.exports = {
    findUserByString,
    findUserById
};