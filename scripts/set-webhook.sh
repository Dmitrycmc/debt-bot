BOT_TOKEN="$(node -p -e "require('dotenv').config({path: '../.env'}).parsed.BOT_TOKEN")"
APP_URL="$(node -p -e "require('dotenv').config({path: '../.env'}).parsed.APP_URL")"
WEBHOOK_PATH="$(node -p -e "require('dotenv').config({path: '../.env'}).parsed.WEBHOOK_PATH")"
WEBHOOK_TOKEN="$(node -p -e "require('dotenv').config({path: '../.env'}).parsed.WEBHOOK_TOKEN")"

URL="$(node -p -e "encodeURIComponent('${APP_URL}${WEBHOOK_PATH}?token=${WEBHOOK_TOKEN}')")"

curl "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${URL}"