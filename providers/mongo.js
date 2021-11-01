const { MongoClient } = require('mongodb');

const clusterName = 'cluster0';
const dbName = process.env.NODE_ENV === 'dev' ? 'testing' : 'production';
const dbUser = 'admin';
const dbPassword = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterName}.v8w4a.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const action = async (callback) => {
  let client;
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("debts");
    return await callback(collection);
  } catch (e) {
    console.log('Error: ', e);
  } finally {
    client.close()
  }
};

const insert = ({from, to, amount, description}) => {
  const dateTime = (new Date()).toISOString();
  return action(collection => collection.insertOne({from, to, amount, description, dateTime}));
};

const getAll = () => {
  return action(collection => new Promise(res => {
    collection.find().toArray((err, result) => res(result));
  }));
};

const clearAll = () => {
  return action(collection => collection.deleteMany({}));
};

module.exports = {
  insert,
  getAll,
  clearAll
};