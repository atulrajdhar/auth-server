import JWT from 'jsonwebtoken';
import createError from 'http-errors';

export default async (token, secret) => {
    if (!token) {
        throw new Error('token should not be empty');
    }

    if (!secret) {
        throw new Error('secret should not be empty');
    }   

    return new Promise ((resolve, reject) => {            
            JWT.verify(token, secret, (err, payload) => {
            if(err){                
                console.log(err.message)
                reject(err)
            }            
            resolve(payload);
        });
    });
}