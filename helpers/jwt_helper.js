const { generateJWTAccessToken } = require('security');

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
    }
};