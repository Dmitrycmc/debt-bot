require('dotenv').config({path: '../.env'});
const got = require('got');

const {BOT_TOKEN, CHAT_ID, APP_URL, WEBHOOK_TOKEN, WEBHOOK_PATH} = process.env;

const send = async ({text, chatId}) => {
    await got.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        searchParams: {
            parse_mode: 'Markdown',
            chat_id: chatId || CHAT_ID,
            text,
            disable_web_page_preview: true,
            disable_notification: !chatId
        }
    })
};

const setWebhook = async () => {
    await got.get(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
        searchParams: {
            url: `${APP_URL}${WEBHOOK_PATH}?token=${WEBHOOK_TOKEN}`
        }
    });
    console.log("Webhook set!");
}

module.exports = {
    send,
    setWebhook
};
