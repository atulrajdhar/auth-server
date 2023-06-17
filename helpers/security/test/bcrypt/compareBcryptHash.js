import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { hash, compare } from 'bcrypt';
import compareBcryptHash from '../../src/bcrypt/compareBcryptHash';

chai.use(chaiAsPromised);

describe('compareBcryptHash', () => {
    it('should fail when string is empty or null', async () => {
        await expect (
            compareBcryptHash (null, "abcdef")
        ).to.be.rejectedWith(Error);
        await expect (
            compareBcryptHash ("", "abcdef")
        ).to.be.rejectedWith(Error);
    });

    it('should fail when hashedString is empty or null', async () => {
        await expect (
            compareBcryptHash ("abcdef", null)
        ).to.be.rejectedWith(Error);
        await expect (
            compareBcryptHash ("abcdef", "")
        ).to.be.rejectedWith(Error);
    });

    it('should not accept a string to be more than 72 bytes', async () => {
        const string = "string with more than 72 bytes is not processed by bcrypt as it has an upper limit of 72 bytes.";
        await expect (
            compareBcryptHash (string, "abcdef")
        ).to.be.rejectedWith(Error);
    });

    it('should fail when string cannot be compared with hashed string', async () => {
        const string = "string";
        const hashedString = await hash("different string", 10);
        
        const result = await compareBcryptHash(string, hashedString);        
        expect(result).to.be.false; 
    });

    it('should compare string with hashed string', async () => {
        const string = "string";
        const hashedString = await hash(string, 10);
        
        const result = await compareBcryptHash(string, hashedString);        
        expect(result).to.be.true; 
    });

});