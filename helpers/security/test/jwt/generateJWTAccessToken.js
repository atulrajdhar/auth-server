import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import JWT from 'jsonwebtoken';
import createError from 'http-errors';
import ms from 'ms';
import generateJWTAccessToken from '../../src/jwt/generateJWTAccessToken';

chai.use(chaiAsPromised);

chai.should();

describe('generateJWTAccessToken', () => {
    it('should not accept secret to be null or an empty string', async () => {
        await expect(
            generateJWTAccessToken({'key':'value'}, null, {'key':'value'})
        ).to.be.rejectedWith(Error);
        await expect(
            generateJWTAccessToken({'key':'value'}, "", {'key':'value'})
        ).to.be.rejectedWith(Error);
    });

    it('should fail when both payload and options are either null or empty', async () => {
        await expect(
            generateJWTAccessToken(null, 'secret', null)
        ).to.be.rejectedWith(Error);
        await expect(
            generateJWTAccessToken(null, 'secret', {})
        ).to.be.rejectedWith(Error);
        await expect(
            generateJWTAccessToken({}, 'secret', null)
        ).to.be.rejectedWith(Error);
        await expect(
            generateJWTAccessToken({}, 'secret', {})
        ).to.be.rejectedWith(Error);
    });   

    // it('should fail when callback is not provided');

    // it('should fail when token expiration is not specified');

    // it('should fail when audience is not specified');

    it('should reject with internal server error', async () => {
        const payload = {
            'iss': 'amazon-clone.in'
        };
        const secret = 'secret';
        const options = {
            'expiresIn': '1h',
            'issuer': 'amazon-clone.in'
        };        
        await expect(
            generateJWTAccessToken(payload, secret, options)
        ).to.be.rejectedWith(createError.InternalServerError);
    });    

    it('should return a jwt token', async () => {
        const payload = {};
        const secret = 'secret';
        const options = {
            'expiresIn': '1h',
            'issuer': 'amazon-clone.in'
        };        
        const exp = Math.floor((Date.now() + ms(options.expiresIn)) / 1000);
        const token = await generateJWTAccessToken(payload, secret, options);
        const result = JWT.verify(token, secret);
        result.should.be.a('object');
        result.should.have.property('iat');
        result.should.have.property('exp').eq(exp);
        result.should.have.property('iss').eq(options.issuer);
    });

});