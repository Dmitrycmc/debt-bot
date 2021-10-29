if (!process.env.DB_PASSWORD) {
    require('dotenv').config({path: '../.env'});
}

const {BOT_TOKEN, CHAT_ID} = process.env;

const got = require('got');

const send = (text) => {
    got.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        searchParams: {
            parse_mode: 'Markdown',
            chat_id: CHAT_ID,
            text,
            disable_web_page_preview: true,
            disable_notification: true
        }
    })
};

module.exports = {
    send
};
