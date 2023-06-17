require('dotenv').config();

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = class MongoMemoryServerManager {
    constructor() {
        this.db = null;
        this.server = new MongoMemoryServer();
        this.connection = null;
    }

    async start() {
        const url = await this.server.getUri();
        const mongooseOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            dbName: await this.server.getDbName()
        };

        await mongoose.connect(url, mongooseOptions);
        this.connection = mongoose.connection;
        this.db = this.connection.db;        
    }

    async stop () {
        await this.connection.dropDatabase();
        await this.connection.close();
        await this.server.stop();
    }

    async cleanup () {
        const collections = await this.db.listCollections().toArray();
        return Promise.all(
            collections
                .map(({name}) => name)
                .map(collection => this.db.collection(collection).drop())
        );
    }

    async createDocument (collectionName, document) {
        const { ops } = await this.db
                                  .collection(collectionName)
                                  .insertOne(document);
        
        return ops[0];
    }
}