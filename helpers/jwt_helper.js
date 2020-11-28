const createError = require('http-errors');

const { generateJWTAccessToken, verifyJWTAccessToken } = require('security');

//const jwt = require('security/dist/jwt/');

module.exports = {
    signAccessToken: (userId) => {
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

        result = verifyJWTAccessToken (token, process.env.ACCESS_TOKEN_SECRET);
        
        if(result.err)
            return next(createError.Unauthorized());
        
        req.payload = result.payload;
        
        next();
    }
};