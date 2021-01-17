process.env.NODE_ENV = 'test';

require('dotenv').config();

const chai = require('chai');
const expect = chai.expect;
const { verifyJWTAccessToken } = require('security');
const { signAccessToken } = require('../../../helpers/jwt_helper');

chai.should();

describe('signJWTAccessToken', () => {
    it('should not accept userId to be null or an empty string', async () => {
        await expect( () =>
            signAccessToken(null)
        ).to.throw(Error);
        await expect(() =>
            signAccessToken("")
        ).to.throw(Error);
    });

    it('should return a jwt token', async () => {
        const userId = "1234";
        const token = await signAccessToken(userId);
        const result = await verifyJWTAccessToken(token, process.env.ACCESS_TOKEN_SECRET);
        result.should.be.a('object');
        result.should.have.property('iat');
        result.should.have.property('exp');
        result.should.have.property('iss');
        result.should.have.property('aud').eq(userId);
    });

});