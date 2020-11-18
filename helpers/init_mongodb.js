const dotenv = require('dotenv');
require('dotenv-expand')(dotenv.config());

const mongoose = require('mongoose');

function init_mongodb () {            

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

    return new Promise ((resolve, reject) => {
        mongoose.connect(process.env.DB_URI, {
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

function close () {
    return mongoose.disconnect();
}

module.exports = { init_mongodb, close };