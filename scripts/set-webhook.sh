BOT_TOKEN="$( node -p -e "require('dotenv').config({path: '../.env'}).parsed.BOT_TOKEN")"
APP_URL="$( node -p -e "require('dotenv').config({path: '../.env'}).parsed.APP_URL")"
WEBHOOK_PATH="$( node -p -e "require('dotenv').config({path: '../.env'}).parsed.WEBHOOK_PATH")"

curl "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${APP_URL}${WEBHOOK_PATH}"