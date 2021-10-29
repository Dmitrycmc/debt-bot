const path = require("path");
const fs = require("fs");

var express = require('express');
var router = express.Router();

const commandsPath = path.join(__dirname, "..", "commands");

fs.readdirSync(commandsPath).forEach((fileName) => {
    const commandName = fileName.split('.')[0];
    const handler = require(path.join(commandsPath, fileName));
    router.post(`/commands/${commandName}`, async (req, res) => {
        const result = await handler({...req.body, ...req.query});
        res.send(result);
    });
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