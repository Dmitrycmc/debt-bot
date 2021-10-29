var handleCommand = require('../commands/handle-command');
const telegramProvider = require('../providers/telegram');

const webhook = async (req, res) => {
  console.log("Webhook body: ");
  console.log(req.body);
  if (req.query.token !== process.env.WEBHOOK_TOKEN) {
    telegramProvider.send({text: "Invalid webhook token"});
    console.log("Invalid webhook token");
    res.status(403).end();
  } else if (
      !req.body.message ||
      !req.body.message.text ||
      !req.body.message.entities ||
      req.body.message.entities.filter(e => e.type === 'bot_command').length !== 1
  ) {
    telegramProvider.send({text: `Skipped: ${JSON.stringify(req.body)}`});
    res.status(200).end();
  } else  {
    const text = req.body.message.text;
    const username = req.body.message.from.username;
    const firstname = req.body.message.from.first_name;
    const lastname = req.body.message.from.last_name;
    const chatId = req.body.message.chat.id;

    await handleCommand({text, username, firstname, lastname, chatId});
    res.status(200).end();
  }
};

module.exports = webhook;