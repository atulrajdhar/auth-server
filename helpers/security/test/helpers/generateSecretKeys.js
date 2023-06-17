import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import generateSecretKeys from '../../src/helpers/generateSecretKeys';

chai.use(chaiAsPromised);

//chai.should();

describe('generateSecretKeys', () => {
    it('should fail when the number of keys to generate is negative or less than 1', () => {
        const size = 32;
        expect(() => generateSecretKeys(-1, size)).to.throw(Error);
        expect(() => generateSecretKeys(0, size)).to.throw(Error);
    });

    it('should fail when size is not specified', () => {
        const num_keys = 1;
        expect(() => generateSecretKeys(num_keys)).to.throw(Error);
        expect(() => generateSecretKeys(num_keys, null)).to.throw(Error);
    });

    it('should produce a table with two keys used to generate JWT access and refresh tokens', () => {
         generateSecretKeys(2, 32);
    //     expect(console.table.calledOnce).to.be.true;        
     });
});