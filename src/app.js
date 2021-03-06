require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var webhookRouter = require('./routes/webhook');
var testingApiRouter = require('./routes/testing-api');
var telegramProvider = require('./providers/telegram');

telegramProvider.setWebhook();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/webhook', webhookRouter);
if (process.env.NODE_ENV === 'testing') {
    app.use('/testing-api', testingApiRouter);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    console.log('Error: ', err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).end();
});

module.exports = app;
