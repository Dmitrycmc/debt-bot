var handleCommand = require('../commands-handler/handle-command');
const telegramProvider = require('../providers/telegram');

const webhook = async (req, res, next) => {
  console.log("Webhook body: ");
  console.log(req.body);

  if (req.query.token !== process.env.WEBHOOK_TOKEN) {
    telegramProvider.send({text: "Invalid webhook token"});
    console.log("Invalid webhook token");
    res.status(403).end();
    return;
  }

  if (req.body.my_chat_member) {
    if (req.body.my_chat_member.new_chat_member.status === 'member') {
      telegramProvider.send({
        chatId: req.body.my_chat_member.chat.id, text: `Привет! 😼
Теперь я буду заниматься ведением ваших долгов 👊
Каждый из вас должен со своего аккаунта пройти регистрацию с помощью команды <code>/register</code>
Через пробел укажите список имен, как к вам можно обращаться, я буду обращаться к вам по первому из них.
  
Пример:
<code>/register Бот робот коллектор</code>`
      });
    }
    res.status(200).end();
    return;
  }

  const message = req.body.message;

  if (!message ||
      !message.text ||
      !message.entities ||
      message.entities.filter(e => e.type === 'bot_command').length !== 1) {
    telegramProvider.send({text: `Skipped: ${JSON.stringify(req.body)}`});
    res.status(200).end();
    return;
  }

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
};

module.exports = webhook;