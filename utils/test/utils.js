const chai = require('chai');
const expect = chai.expect;

const { JWTExpiresInStringToSeconds } = require('../src/utils');

// chai.use(chaiAsPromised);

//chai.should();

describe('JWTExpiresInStringToSeconds', () => {
    it('should fail when input is null or empty string', async () => {
        await expect( () =>
            JWTExpiresInStringToSeconds(null)
        ).to.throw(Error);
        await expect(() =>
            JWTExpiresInStringToSeconds("")
        ).to.throw(Error);
    });

    it('should provide seconds as it is', async () => {
        let expiresIn = [
            { "1": "1" },
            { "2s": "2" },
            { "3S": "3" },
            { "20s": "20" },
            { "30s": "30" },
            { "60s": "60" },
            { "100s": "100" },
            { "1000s": "1000" }
        ];
        expiresIn.forEach((expireIn) => {
                expect(
                    JWTExpiresInStringToSeconds(Object.keys(expireIn)[0])
                ).to.equal(Object.values(expireIn)[0]);
            }            
        );
    });

    it('should convert milliseconds to seconds', async () => {
        let expiresIn = [
            { "1ms": "0.001" },
            { "2ms": "0.002" },
            { "3MS": "0.003" },
            { "20ms": "0.02" },
            { "30ms": "0.03" },
            { "60ms": "0.06" },
            { "100ms": "0.1" },
            { "1000MS": "1" }
        ];
        expiresIn.forEach((expireIn) => {
                expect(
                    JWTExpiresInStringToSeconds(Object.keys(expireIn)[0])
                ).to.equal(Object.values(expireIn)[0]);
            }            
        );
    });

    it('should convert minutes to seconds', async () => {
        let expiresIn = [
            { "1m": "60" },
            { "2m": "120" },
            { "3M": "180" },
            { "20m": "1200" },
            { "30m": "1800" },
            { "60m": "3600" },
            { "100m": "6000" },
            { "1000M": "60000" }
        ];
        expiresIn.forEach((expireIn) => {
                expect(
                    JWTExpiresInStringToSeconds(Object.keys(expireIn)[0])
                ).to.equal(Object.values(expireIn)[0]);
            }            
        );
    });
    
    it('should convert hours to seconds', async () => {
        let expiresIn = [
            { "1h": "3600" },
            { "2h": "7200" },
            { "3H": "10800" },
            { "20h": "72000" },
            { "30h": "108000" },
            { "60h": "216000" },
            { "100h": "360000" },
            { "1000H": "3600000" }
        ];
        expiresIn.forEach((expireIn) => {
                expect(
                    JWTExpiresInStringToSeconds(Object.keys(expireIn)[0])
                ).to.equal(Object.values(expireIn)[0]);
            }            
        );
    });

    it('should convert days to seconds', async () => {
        let expiresIn = [
            { "1d": "86400" },
            { "2d": "172800" },
            { "3D": "259200" },
            { "20d": "1728000" },
            { "30d": "2592000" },
            { "60d": "5184000" },
            { "100d": "8640000" },
            { "1000D": "86400000" }
        ];
        expiresIn.forEach((expireIn) => {
                expect(
                    JWTExpiresInStringToSeconds(Object.keys(expireIn)[0])
                ).to.equal(Object.values(expireIn)[0]);
            }            
        );
    });

    it('should convert years to seconds', async () => {
        // consider each year to be of 365 days
        let expiresIn = [
            { "1y": "31536000" },
            { "2y": "63072000" },
            { "3Y": "94608000" },
            { "20y": "630720000" }            
        ];
        expiresIn.forEach((expireIn) => {
                expect(
                    JWTExpiresInStringToSeconds(Object.keys(expireIn)[0])
                ).to.equal(Object.values(expireIn)[0]);
            }            
        );
    });
});