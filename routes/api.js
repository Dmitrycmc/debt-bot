var express = require('express');
var router = express.Router();

const mongoProvider = require('../providers/mongo');
const telegramProvider = require('../providers/telegram');


const all = async (req, res) => {
  res.json(await mongoProvider.getAll());
};

const webhook = async (req, res) => {
  telegramProvider.send(JSON.stringify(req.body));
  res.status(200).end();
};

router.get('/all', all);
router.post('/webhook', webhook);
router.get('/webhook', webhook);

module.exports = router;