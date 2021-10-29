var express = require('express');
var router = express.Router();

const mongoProvider = require('../providers/mongo');
const telegramProvider = require('../providers/telegram');


const all = async (req, res) => {
  res.json(await mongoProvider.getAll());
};

const webhook = async (req, res) => {
  if (req.query.token !== process.env.WEBHOOK_TOKEN) {
    res.status(403).end();
    return;
  }
  const text = req.body.message.text;
  const username = req.body.message.from.username;
  const firstname = req.body.message.from.firstname;
  const lastname = req.body.message.from.lastname;

  telegramProvider.send(JSON.stringify({
    text,
    username,
    firstname,
    lastname
  }));
  res.status(200).end();
};

router.get('/all', all);
router.post('/webhook', webhook);
router.get('/webhook', webhook);

module.exports = router;