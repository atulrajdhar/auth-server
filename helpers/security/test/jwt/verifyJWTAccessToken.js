import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import JWT from 'jsonwebtoken';
import ms from 'ms';
import verifyJWTAccessToken from '../../src/jwt/verifyJWTAccessToken';

chai.use(chaiAsPromised);

chai.should();

describe('verifyJWTAccessToken', () => {
    it('should not accept token to be null or an empty string', async () => {
        await expect(
            verifyJWTAccessToken(null, "secret")
        ).to.be.rejectedWith(Error);
        await expect(
            verifyJWTAccessToken("", "secret")
        ).to.be.rejectedWith(Error);
    });

    it('should not accept secret to be null or an empty string', async () => {
        await expect(
            verifyJWTAccessToken("token", null)
        ).to.be.rejectedWith(Error);
        await expect(
            verifyJWTAccessToken("token", "")
        ).to.be.rejectedWith(Error);
    });
    
    it('should reject with error when secret do not match', async () => {
        const payload = {};
        let secret = 'secret';
        const options = {
            'expiresIn': '1h',
            'issuer': 'amazon-clone.in'
        };
        const token = JWT.sign(payload, secret, options);        
        secret = 'new secret';
        await expect(verifyJWTAccessToken(token, secret)
        ).to.be.rejectedWith(Error);
    });    

    it('should verify jwt token and return a payload', async () => {
        const payload = {};
        const secret = 'secret';
        const options = {
            'expiresIn': '1h',
            'issuer': 'amazon-clone.in'
        };        
        const exp = Math.floor((Date.now() + ms(options.expiresIn)) / 1000);
        const token = JWT.sign(payload, secret, options);
        const result = await verifyJWTAccessToken(token, secret);
        result.should.be.a('object');
        result.should.have.property('iat');
        result.should.have.property('exp').eq(exp);
        result.should.have.property('iss').eq(options.issuer);
    });

});