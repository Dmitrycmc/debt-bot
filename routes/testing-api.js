const path = require("path");
const fs = require("fs");

var express = require('express');
var router = express.Router();

var handleCommand = require('../commands-handler/handle-command');

router.post(`/command`, async (req, res) => {
    await handleCommand({...req.body, ...req.query});
    res.end();
});

const providersPath = path.join(__dirname, "..", "providers");

fs.readdirSync(providersPath).forEach((fileName) => {
    const providerName = fileName.split('.')[0];
    const provider = require(path.join(providersPath, fileName));
    Object.entries(provider).forEach(([methodName, methodHandler]) => {
        router.post(`/providers/${providerName}/${methodName}`, async (req, res) => {
            const result = await methodHandler({...req.body, ...req.query});
            res.send(result);
        });
    });
});

module.exports = router;