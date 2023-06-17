const createError = require('http-errors');
const { generateJWTAccessToken, verifyJWTAccessToken } = require('security');
const { JWTExpiresInStringToSeconds } = require('utils');
const client = require('./init_redis');

module.exports = {
    signAccessToken: (userId) => {
        if(!userId) {
            throw new Error("userId should not be empty");
        }
        const payload = {};
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: process.env.TOKEN_EXPIRATION_TIME,
            issuer: process.env.TOKEN_ISSUER,
            audience: userId
        };
        
        return generateJWTAccessToken(payload, secret, options);        
    },

    verifyAccessToken: (req, res, next) => {
        if(!req.headers['authorization'])
            return next(createError.Unauthorized());
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];
        
        verifyJWTAccessToken (token, process.env.ACCESS_TOKEN_SECRET)
        .then(result => {
            req.payload = result;
            return next();
        })
        .catch(error => {
            const message = error.name === 'JsonWebTokenError' ? 'Unauthorized' : error.message;
            return next(createError.Unauthorized(message));
        })
    },

    signRefreshToken: (userId) => {
        if(!userId) {
            throw new Error("userId should not be empty");
        }
        const payload = {};
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
            issuer: process.env.TOKEN_ISSUER,
            audience: userId
        };        
        
        return generateJWTAccessToken(payload, secret, options)
        .then(async token => {
            let duration = JWTExpiresInStringToSeconds(process.env.REFRESH_TOKEN_EXPIRATION_TIME);            
            await client.setEx(userId, duration, token);
            return token;            
        })
        .catch(err => {            
            throw err;            
        });
    },

    verifyRefreshToken: (refreshToken) => {        
        return verifyJWTAccessToken (refreshToken, process.env.REFRESH_TOKEN_SECRET)
        .then(async payload => {
            const userId = payload.aud;
            const result = await client.GET(userId);            
            if(refreshToken === result)
                return userId;
            throw createError.Unauthorized();
        })
        .catch(error => {throw createError.Unauthorized();});        
    }
};