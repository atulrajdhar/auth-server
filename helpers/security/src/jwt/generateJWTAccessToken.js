import JWT from 'jsonwebtoken';
import createError from 'http-errors';

export default async (payload, secret, options) => {
    if (!secret) {
        throw new Error('secret should not be empty');
    }

    if ((!payload || Object.keys(payload).length === 0) &&
        (!options || Object.keys(options).length === 0)) {
        throw new Error('either payload or options should be specified');
    }   

    return new Promise ((resolve, reject) => {
            JWT.sign(payload, secret, options, (err, token) => {
            if(err) {
                console.log(err.message)
                reject(createError.InternalServerError())
            }
            resolve(token);
        });
    });
}