require('babel-polyfill');
const getBcryptHash = require('./dist/bcrypt/getBcryptHash').default;
const compareBcryptHash = require('./dist/bcrypt/compareBcryptHash').default;
const generateJWTAccessToken = require('./dist/jwt/generateJWTAccessToken').default;
const verifyJWTAccessToken = require('./dist/jwt/verifyJWTAccessToken').default;

module.exports = {
    getBcryptHash,
    compareBcryptHash,
    generateJWTAccessToken,
    verifyJWTAccessToken
};