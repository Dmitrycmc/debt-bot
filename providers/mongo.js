const { MongoClient } = require('mongodb');

const clusterName = 'cluster0';
const dbName = 'Cluster0'; /// ???
const username = 'debt-admin';
const password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@${clusterName}.3njus.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const action = async (callback) => {
  let client;
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    await client.connect();
    const db = client.db("debt-db");
    const collection = db.collection("debts0");
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