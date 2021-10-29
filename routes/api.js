var express = require('express');
var router = express.Router();

const {getAll, insert} = require('../providers/mongo');


const all = async (req, res) => {
  res.json(await getAll());
};

const webhook = async (req, res) => {
  res.json(req.body);
};

router.get('/all', all);
router.post('/webhook', webhook);

module.exports = router;