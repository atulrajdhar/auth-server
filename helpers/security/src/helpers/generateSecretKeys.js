import crypto from 'crypto';

export default (num_keys, size) => {
    if(num_keys < 1) {
        throw new Error('number of keys to generate should at least be 1');
    }

    if(!size) {
        throw new Error('number of bytes to generate should be specified');
    }

    const keys = [];
    let key;
    for (let index = 0; index < num_keys; index++) {
        key = crypto.randomBytes(size).toString('hex');
        keys.push(key);
    }
    console.table(keys);
};