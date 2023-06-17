require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const {verifyAccessToken} = require('./helpers/jwt_helper');
require('./helpers/init_redis');

const auth = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.get('/', verifyAccessToken, async(req, res, next) => {
    res.send('hello from authorization server');
});

app.use('/auth', auth);

app.use(async(req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    // console.error(err);
    res.status(status)
    res.send({
        error: {
            status: status,
            message: status === 500 ? "Internal Server Error" : err.message
        }
    })
});

module.exports = app;