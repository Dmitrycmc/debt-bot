const { MongoClient } = require('mongodb');

const clusterName = 'cluster0';
const dbName = process.env.NODE_ENV;
const dbUser = 'admin';
const dbPassword = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterName}.v8w4a.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const action = async (collectionName, callback) => {
    let client;
    try {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        return await callback(collection);
    } catch (e) {
        console.log('Error: ', e);
    } finally {
        client.close();
    }
};

const insert = ({from, to, amount, description, chatId}) => {
    const dateTime = (new Date()).toISOString();
    return action('debts', collection => collection.insertOne({from, to, amount, description, dateTime, chatId}));
};

const getAllNotHidden = ({chatId}) => {
    return action('debts', collection => new Promise(res => {
        collection.find(
            {$or: [{chatId, hidden: {$exists: false}}, {chatId, hidden: false}]}
        ).toArray((err, result) => res(result));
    }));
};

const getAllHidden = ({chatId}) => {
    return action('debts', collection => new Promise(res => {
        collection.find(
            {chatId, hidden: {$exists: true}}
        ).toArray((err, result) => res(result));
    }));
};

const getById = ({id}) => {
    return action('debts', collection => new Promise(res => {
        collection.find({_id: id}).toArray((err, result) => res(result));
    }));
};

const clearAll = () => {
    return action('debts', collection => collection.deleteMany({}));
};

const hide = ({ids}) => {
    return action('debts', collection => collection.findOneAndUpdate({_id: {$in: ids}}, {$set: {hidden: true}}));
};

const register = ({userId, chatId, login, name, aliases}) => {
    return action('users', collection => collection.insertMany(aliases.map(alias => ({userId, chatId, login, name, alias}))));
};

const getUsers = (conditions) => {
    return action('users', collection => new Promise(res => {
        collection.find(conditions).toArray((err, result) => res(result));
    }));
};

module.exports = {
    insert,
    getAllNotHidden,
    getAllHidden,
    clearAll,
    register,
    hide,
    getUsers,
    getById
};