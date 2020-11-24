const dotenv = require('dotenv');
require('dotenv-expand')(dotenv.config());

const mongoose = require('mongoose');

const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

async function init_mongodb () {            

    mongoose.connection.on('connected', () => {
        console.log('mongoose connected to db');
    });    

    mongoose.connection.on('disconnected', () =>{
        console.log('mongoose connection is disconnected.');
    });

    process.on('SIGINT', async() => {
        await mongoose.connection.close();
        process.exit(0);
    });


    let url = process.env.DB_URI;    
    if(process.env.NODE_ENV === "test") {
        mongoServer = new MongoMemoryServer();
        url = await mongoServer.getUri();        
    }
    return new Promise ((resolve, reject) => {
        mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
        })
        .then((res, err) => {
            if(err) return reject(err);
            console.log('mongodb connected');
            resolve();
        })
        .catch((err) => console.log(err.message));
    });
}

async function close () {
    if(process.env.DB_URI === "test") {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    }
    else {
        await mongoose.connection.close();
    }
    return await mongoose.disconnect();
}

async function cleanup () {
    if(process.env.DB_URI === "test") {
        const collections = await mongoose.connection.collections;
            return Promise.all(
                collections
                    .map(({name}) => name)
                    .map(collection => mongoose.connection.collection(collection).drop())
            );
        }
}

module.exports = { init_mongodb, close, cleanup };