var handleCommand = require('../commands-handler/handle-command');
const telegramProvider = require('../providers/telegram');

const webhook = async (req, res, next) => {
  console.log("Webhook body: ");
  console.log(req.body);
  const message = req.body.message;

  if (req.query.token !== process.env.WEBHOOK_TOKEN) {
    telegramProvider.send({text: "Invalid webhook token"});
    console.log("Invalid webhook token");
    res.status(403).end();
  } else if (
      !message ||
      !message.text ||
      !message.entities ||
      message.entities.filter(e => e.type === 'bot_command').length !== 1
  ) {
    telegramProvider.send({text: `Skipped: ${JSON.stringify(req.body)}`});
    res.status(200).end();
  } else  {
    try {
      await handleCommand({
        text: message.text,
        userId: message.from.id,
        username: message.from.username,
        firstname: message.from.first_name,
        lastname: message.from.last_name,
        chatId: message.chat.id
      });
    } catch (e) {
      next(e);
    }
    res.status(200).end();
  }
};

module.exports = webhook;