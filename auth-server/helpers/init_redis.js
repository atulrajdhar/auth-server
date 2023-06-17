const redis = require('redis');

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

client.connect();

client.on('connect', () => {
    console.log("client connected to redis");
});

client.on('ready', () => {
    console.log("client connected to redis and ready to use");
});

client.on('error', (err) => {
    console.log(err.message);
});

client.on('end', () => {
    console.log("client disconnected from redis");
});

process.on('SIGINT', () => {    
    client.quit();
});

module.exports = client;